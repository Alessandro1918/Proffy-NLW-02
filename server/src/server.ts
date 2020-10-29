import express from 'express'
//import path from 'path'
import cors from 'cors'		//allows app to use more than one port (3000, 3333)

import routes from './routes'

const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)

//app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))


app.listen(3333)