import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'
import warningIcon from '../../assets/images/icons/warning.svg'
import proffyAPI from '../../services/proffyAPI'

import './styles.css'


function TeacherForm() {
	
	const history = useHistory()

	// setScheduleItems is not a function that will be called by me.
	// (1): the 'Novo Horário' button will call addNewScheduleItem, that in turn will call setScheduleItems.
	// (2): React will pass the result of setScheduleItems to the state var scheduleItems.
	// (3): scheduleItem field 'week_day' or 'from' or  'to' onChange will call updateScheduleItemValue,
	//		that will update one field of one array item of the state var scheduleItems.

	// (2)
	const [scheduleItems, setScheduleItems] = useState([
		{week_day: '', from:'', to:''}
  	])

  	// (1)
  	function addNewScheduleItem() {
  		setScheduleItems([
  			...scheduleItems,
  			{week_day:'', from:'', to:''},
  		])
  	}

  	// (3)
  	function updateScheduleItemValue(pos: number, field: string, value: string) {
  		const newArray = scheduleItems.map((scheduleItem, index) => {
  			if (pos === index) {
  				return {...scheduleItem, [field]: value}
  			}
  			return scheduleItem
  		})
  		//console.log(newArray)
  		setScheduleItems(newArray)
  	}

  	const [name, setName] = useState('')
  	const [avatar, setAvatar] = useState('')
  	const [whatsapp, setWhatsapp] = useState('')
  	const [bio, setBio] = useState('')
  	const [subject, setSubject] = useState('')
  	const [cost, setCost] = useState('')


  	//function handleCreateClass() {	
  	//button type="submit" will submit form, that will call form.onSubmit, and will reload the page
  	function handleCreateClass(e: FormEvent) {
  		e.preventDefault()		//prevent page reloading
  		//console.log({name, avatar, whatsapp, bio, subject, cost, scheduleItems})
  		const newClass = {
	  		name,
	  		avatar,
	  		whatsapp,
	  		bio,
	  		subject,
	  		cost: Number(cost),
	  		schedule: scheduleItems
	  	}
	  	proffyAPI.post('classes', newClass)
	  	.then(() => {
	  		alert('Cadastro realizado!')
	  		history.push('/')
	  	})
	  	.catch(() => {alert('Erro!')})
  	}



	return (
	    <div id="page-teacher-form" className="container">
	    	
	    	<PageHeader 
	    		title="Que incrível que você quer dar aulas!"
	    		description="O primeiro passo é preencher o formulário de inscrição:"
	    	/>

	    	<main>
		    	<form onSubmit={handleCreateClass}>
		    		<fieldset>
		    			<legend>Seus Dados</legend>
		    			<Input 
		    				name="name" 
		    				label="Nome" 
		    				value={name} 
		    				onChange={(e) => setName(e.target.value)}
		    			/>
		    			<Input 
		    				name="avatar" 
		    				label="Avatar" 
		    				value={avatar} 
		    				onChange={(e) => setAvatar(e.target.value)}
		    			/>
		    			<Input 
		    				name="whatsapp" 
		    				label="Whatsapp" 
		    				value={whatsapp} 
		    				onChange={(e) => setWhatsapp(e.target.value)}
		    			/>
		    			<Textarea 
		    				name="bio" 
		    				label="Biografia" 
		    				value={bio} 
		    				onChange={(e) => setBio(e.target.value)}
		    			/>
		    		</fieldset>

		    		<fieldset>
		    			<legend>Sobre a aula</legend>
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
		    			<Input 
		    				name="cost" 
		    				label="Custo da hora por aula"
		    				value={cost}
		    				onChange={(e) => setCost(e.target.value)}
		    			/>
		    		</fieldset>

		    		<fieldset>
		    			<legend>
		    				Horários disponíveis
		    				<button 
		    					type="button" 
		    					onClick={addNewScheduleItem}>
		    					+ Novo horário
		    				</button>
		    			</legend>
		    			{scheduleItems.map((scheduleItem, index) => {
		    				return (
		    					<div 
		    						key={index} 
		    						className="schedule-item">
					    			<Select 
					    				name="week_day"
					    				label="Dia da semana:"
					    				options = {[
					    					{value: '0', label:'Domingo'},
					    					{value: '1', label:'Segunda'},
					    					{value: '2', label:'Terça'},
					    					{value: '3', label:'Quarta'},
					    					{value: '4', label:'Quinta'},
					    					{value: '5', label:'Sexta'},
					    					{value: '6', label:'Sábado'},
					    				]}
					    				value={scheduleItem.week_day}
					    				onChange={(e) => updateScheduleItemValue(index, "week_day", e.target.value)}
					    			/>
					    			<Input 
					    				name="from" 
					    				label="Das" 
					    				type="time"
										value={scheduleItem.from}
					    				onChange={(e) => updateScheduleItemValue(index, "from", e.target.value)}
					    			/>
					    			<Input 
					    				name="to" 
					    				label="até as" 
					    				type="time"
					    				value={scheduleItem.to}
					    				onChange={(e) => updateScheduleItemValue(index, "to", e.target.value)}
					    			/>
					    		</div>
		    				)
		    			})}
		    		</fieldset>

		    		<footer>
		    			<p>
		    				<img src={warningIcon} alt="Aviso Importante"/>
		    				Importante!<br/>
		    				Preencha todos os dados
		    			</p>
		    			<button type="submit">Salvar cadastro</button>
		    		</footer>
	    		</form>
	    	</main>
	    </div>
  	)
}

export default TeacherForm;
