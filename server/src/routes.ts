import express from 'express'

import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'

const routes = express.Router()

const classesController = new ClassesController()
const connectionsController = new ConnectionsController()

//nomes de métodos usuais: index, show, create, update, delete

//routes.get('/items', itemsController.index)

//routes.post('/points', pointsController.create)
//routes.get('/points', pointsController.index)
//routes.get('/points/:id', pointsController.show)

routes.get('/test', (request, response) => {
	const users = [
		{name: 'A', age: 1},
		{name: 'B', age: 4}
	]
	return response.json(users)
})
routes.post('/test', (request, response) => {
	return response.json(request.body)
})

routes.get('/classes', classesController.index)
routes.post('/classes', classesController.create)

routes.get('/connections', connectionsController.index)
routes.post('/connections', connectionsController.create)

export default routes