import NotesModel from "../model/NotesModel.js";
import UserModel from "../model/UserModel.js";

const UpdateNotes = async(req,res)=>{
    try{
        const notesId = req.params.id;
        const notes = req.body;
        const {id} = req.user;

        // console.log(req.body)
        const newNotes = {
            title:notes.title,
            content:notes.content,
            date:new Date()
        }

        if(!id){
            return res.status(406).json({Success:false})
        }

        const updateNotes = await NotesModel.findByIdAndUpdate(
            notesId,
            newNotes,
            {new:true}
        ) 
        const allNotes = await UserModel.findById(id).populate({
            path:'notes',
            options:{
                sort:{date:-1}
            }
        })
        // console.log(allNotes.notes[0])
        res.status(200).json(allNotes.notes)
    }
    catch(error){
        res.status(405).json({Error:error.message})
    }
}

export default UpdateNotes;