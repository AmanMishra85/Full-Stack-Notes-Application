import UserModel from "../model/UserModel.js";


const GetAllNotes = async(req,res)=>{
    try{    
        const {id} = req.user;
        const user = await UserModel.findById(id);
        const allNotes = await user.populate({
            path:'notes',
            options:{
                sort:{date:-1}
            }
        })
        // console.log(allNotes.notes)
        res.status(200).json(allNotes.notes)
    }
    catch(error){
        res.status(409).json({Error:error.messsage})
    }
}

export default GetAllNotes;