import express from 'express';
import GetAllNotes from '../controller/GetAllNotes.js';
import AuthMiddleWare from '../middleware/AuthMiddleWare.js';
import CreateNotes from '../controller/CreateNotes.js';
import DeleteNotes from '../controller/DeleteNotes.js';
import UpdateNotes from '../controller/UpdateNotes.js';
import getSingleNotes from '../controller/GetSingleNote.js';

const NotesRouter = express.Router();

NotesRouter.get('/getAllNotes',AuthMiddleWare,GetAllNotes)
NotesRouter.post('/createNotes',AuthMiddleWare,CreateNotes)
NotesRouter.delete('/deleteNotes/:id',AuthMiddleWare,DeleteNotes)
NotesRouter.put('/updateNotes/:id',AuthMiddleWare,UpdateNotes)
NotesRouter.get('/getSingleNotes/:id',AuthMiddleWare,getSingleNotes)

export default NotesRouter;
