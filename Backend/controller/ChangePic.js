import UserModel from "../model/UserModel.js";

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

const findPics = () => {
  return `https://api.dicebear.com/6.x/${
    profile_imgs_collections_list[
      Math.floor(Math.random() * profile_imgs_collections_list.length)
    ]
  }/svg?seed=${
    profile_imgs_name_list[
      Math.floor(Math.random() * profile_imgs_name_list.length)
    ]
  }`;
};

const ChangePic = async (req, res) => {
  try {
    const { id } = req.user;
    const image = findPics();
    // console.log(image)
    const response = await UserModel.findByIdAndUpdate(id,{userImg:image},{new:true});
    console.log(response)
    res.status(200).json({userImg:response.userImg})
  } catch (error) {}
};

export default ChangePic;
