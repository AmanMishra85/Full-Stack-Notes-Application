import express from 'express';
import cors from 'cors';
import ConnectionDone from './db/ConnectToDb.js';
import AuthRouter from './routes/AuthRouter.js';
import NotesRouter from './routes/NotesRouter.js';
import 'dotenv/config';
const app = express();
import bodyParser from 'body-parser';
import UserRouter from './routes/UserRoutes.js';


app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api/auth',AuthRouter);
app.use('/api/notes',NotesRouter);
app.use('/api/user',UserRouter)

app.get('/',(req,res)=>{
    res.send("<h2>Hello sir this is sample backend endpoints</h2>")
})

// app.get('/',async(req,res)=>{
//     try{
//        const response = await NotesModel.deleteMany({});
//        console.log(response)
//     }
//     catch(err){
//         console.log(err)
//     }
// })

const start = async()=>{
    try{
        await ConnectionDone(process.env.CONNECTION_STRING);
        app.listen(3000,()=>{
            console.log("Server is listen at port: 3000");
        })
    }
    catch(err){
        console.log("Error Occured during start the project!")
    }
}

start();