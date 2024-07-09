import NotesModel from "../model/NotesModel.js";
import UserModel from "../model/UserModel.js";

const CreateNotes = async (req, res) => {
  try {
    const { id } = req.user;
    const { title, content } = req.body;

    const Note = new NotesModel({
      title: title,
      content: content,
      author: id,
      date: new Date(),
    });

    const response = await Note.save();
    const user = await UserModel.findById(id);
    user.notes.push(response._id);
    await user.save();
    const allNotes = await user.populate({
      path: "notes",
      options: {
        sort: { date: -1 },
      },
    });
    console.log(allNotes.notes[0]);
    res.status(200).json(allNotes.notes);
  } catch (err) {
    res.status(405).json({ Error: err.message });
  }
};

export default CreateNotes;
