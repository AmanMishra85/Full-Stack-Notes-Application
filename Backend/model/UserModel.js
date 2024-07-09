import mongoose, { Schema, Types } from "mongoose";
let profile_imgs_name_list = [
  "Garfield",
  "Tinkerbell",
  "Annie",
  "Loki",
  "Cleo",
  "Angel",
  "Bob",
  "Mia",
  "Coco",
  "Gracie",
  "Bear",
  "Bella",
  "Abby",
  "Harley",
  "Cali",
  "Leo",
  "Luna",
  "Jack",
  "Felix",
  "Kiki",
];
let profile_imgs_collections_list = [
  "adventurer-neutral",
  "fun-emoji",
  "bottts",
  "avataaars",
  "micah",
];

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userImg: {
    type: String,
    default: () => {
      return `https://api.dicebear.com/6.x/${
        profile_imgs_collections_list[
          Math.floor(Math.random() * profile_imgs_collections_list.length)
        ]
      }/svg?seed=${
        profile_imgs_name_list[
          Math.floor(Math.random() * profile_imgs_name_list.length)
        ]
      }`;
    },
  },
  totalNotes: {
    type: Number,
    default: 0,
  },
  google_auth: {
    type: Boolean,
    default: false,
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "notes",
      default: [],
    },
  ],
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
