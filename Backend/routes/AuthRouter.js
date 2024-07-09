import express from 'express';
import Register  from '../controller/Register.js'
import Login from '../controller/Login.js';
import GoogleAuthentication from '../controller/GoogleAuthentication.js';
const app = express();
const router = express.Router();


router.route('/')
    .get((req,res)=>{
        res.send("<h2>Hi Sir, what is your future Moal</h2>");
    })

router.post('/signup',Register);
router.post('/signin',Login);
router.post('/google-auth',GoogleAuthentication)

export default router;