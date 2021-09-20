import express, { json } from 'express'
import routes from './routes'
import dotenv from 'dotenv'


const app = express();
app.use(express.json());

app.use(routes);

app.listen(process.env.PORT || 3333, ()=>{
    console.log('server started on port 3333')
})