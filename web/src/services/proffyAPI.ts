import axios from 'axios'

const proffyAPI = axios.create({
	baseURL: 'http://localhost:3333',	
})

export default proffyAPI