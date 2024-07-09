import NotesModel from "../model/NotesModel.js";
import UserModel from "../model/UserModel.js";


const DeleteNotes = async(req,res)=>{
    try{
        const {id} = req.user;
        const notesId = req.params.id;

        const DeletedNotes = await NotesModel.findByIdAndDelete(notesId);

        await UserModel.findByIdAndUpdate(DeletedNotes.author,{
            $pull:{notes:notesId}},
            {new:true}
        )
        const allNotes = await UserModel.findById(id).populate({
            path:'notes',
            options:{
                sort:{date:-1}
            }
        })
        console.log(allNotes.notes)
        res.status(200).json(allNotes.notes)
    }
    catch(error){
        res.status(410).json({Error:error.message})
    }
}

export default DeleteNotes;