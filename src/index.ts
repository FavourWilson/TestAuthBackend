import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import router from 'router'

const app = express()
app.use(cors({
    credentials:true
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)
server.listen(8080, () => {
    console.log(`Server is running`)
})

const MONGO_URL = "mongodb+srv://freecoder:sIXdlefJ7Gn1XzW5@cluster0.pvvqq.mongodb.net/?retryWrites=true&w=majority"
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error",(error:Error)=>console.log(error))

app.use('/',router())



//"@types/json5": "^2.2.0",