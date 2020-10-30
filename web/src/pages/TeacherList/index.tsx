import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

import proffyAPI from '../../services/proffyAPI'

import './styles.css'


function TeacherList() {

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    const [teachers, setTeachers] = useState([])


    async function searchTeachers(e: FormEvent) {
        e.preventDefault()
        //console.log({subject, week_day, time})
        const response = await proffyAPI.get('classes', {
            params: {
                subject, week_day, time
            }
        })
        //console.log(response.data)
        setTeachers(response.data)
    }


    return (
        <div id="page-teacher-list" className="container">
        	<PageHeader title="Esses são os Proffys disponíveis:">

                {/* This form is not a prop from PageHeader component; it's a children */}
                {/* PageHeader.tsx, line 32: render children like this:... */}
        		<form id="search-teachers" onSubmit={searchTeachers}>
    				<Select 
        				name="subject" 
        				label="Matéria"
        				options = {[
        					{value: "Eng. Elétrica", label:"Eng. Elétrica"},
        					{value: "Eng. Química", label:"Eng. Química"},
        					{value: "Eng. Civil", label:"Eng. Civil"},
        				]}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
        			/>
        			<Select 
        				name="week_day" 
        				label="Dia da semana:"
        				options = {[
        					{value: "0", label:"Domingo"},
        					{value: "1", label:"Segunda"},
        					{value: "2", label:"Terça"},
        					{value: "3", label:"Quarta"},
        					{value: "4", label:"Quinta"},
        					{value: "5", label:"Sexta"},
        					{value: "6", label:"Sábado"},
        				]}
                        value={week_day}
                        onChange={(e) => setWeekDay(e.target.value)}
        			/>
        			<Input 
                        name="time" 
                        label="Horário"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <button type="submit">Buscar</button>
    	    	</form>
        	</PageHeader>

        	<main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}/>
                })}
        	</main>
        </div>
    )
}

export default TeacherList;
