import {Request, Response} from 'express'
import db from '../database/connection'
import convertHourToMinutes from '../utils/convertHourToMinutes'

interface ScheduleItem {
	week_day: number;
	from: string;
	to: string;
}

class ClassesController {

	async index(request: Request, response: Response) {
		const filters = request.query
		//console.log(request.query)

		if (!filters.week_day || !filters.subject || !filters.time) {
			return response.status(400).json({
				error: 'Missing filters to search classes'
			})
		}

		const week_day = Number(filters.week_day as string)		// 0: Sunday, 1: Monday, ...
		const subject = filters.subject as string				// "Eng. Elétrica"
		const time = filters.time as string						// "20:00"
		const timeInMinutes = convertHourToMinutes(time)		// 20 h * 60 min/h = 1200 min
		console.log(week_day, subject, time, timeInMinutes)
		const classes = await db('classes')
								.whereExists(function() {
									this.select('class_schedule.*')
									.from('class_schedule')
									.whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
									.whereRaw('`class_schedule`.`week_day` = ??', [week_day])
									.whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
									.whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])									
								})
								.where('classes.subject', '=', subject)
								.join('users', 'classes.user_id', '=', 'users.id')
								.select(['classes.*', 'users.*'])
		return response.status(201).json(classes)
	}
		
	async create(request: Request, response: Response) {

		const {
			name,
			avatar,
			whatsapp,
			bio,
			subject,
			cost,
			schedule
		} = request.body
		//console.log(request.body)

		//Ensure all transactions will run, or neither
		const trx = await db.transaction()

		try {

			//insert @ table 'users'
			const insertedUsersIds = await trx('users').insert({
				name,
				avatar,
				whatsapp,
				bio,
			})

			//insert @ table 'classes'
			const user_id = insertedUsersIds[0]
			const insertedClassesIds = await trx('classes').insert({
				subject,
				cost,
				user_id,
			})

			//insert @ table 'class_schedule'
			//	"schedule": [{"week_day": 1, "from": "8:00", "to": "9:00"}, {}, ...]
			//  will save string "8:00" like int 480 (minutes), for the filter functionality
			const class_id = insertedClassesIds[0]
			const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
				return {
					week_day: scheduleItem.week_day,
					from: convertHourToMinutes(scheduleItem.from),
					to: convertHourToMinutes(scheduleItem.to),
					class_id,
				}
			})
			await trx('class_schedule').insert(classSchedule)

			await trx.commit()
				
			return response.status(201).send()

		} catch (err) {
			await trx.rollback()

			return response.status(400).json({
				error: 'Unexpected error while creating new class'
			})
		}
	}
}

export default ClassesController
