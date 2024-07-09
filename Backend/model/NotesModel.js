import mongoose, { Schema, Types } from "mongoose";

const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        default:"UnTitled Notes"
    },
    content:{
        type:String,
        default:''
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const NotesModel = mongoose.model('notes',notesSchema);

export default NotesModel;