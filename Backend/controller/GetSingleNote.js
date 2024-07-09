import NotesModel from "../model/NotesModel.js";

const getSingleNotes = async(req,res)=>{
    try{
        const id = req.params.id;
        const response = await NotesModel.findById(id);
        // console.log(response)
        res.status(200).json(response)
    }
    catch(error){
        res.status(420).json({Error:error.message})
    }
}
export default getSingleNotes;