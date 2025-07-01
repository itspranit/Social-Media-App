const express=require('express');
const router=express.Router();
const usersController=require('../controllers/users_controller');

router.get('/profile',usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIp);

router.post('/create',usersController.create);
router.post('/create-session',usersController.createSession);

router.post('/sign-out',usersController.signOut);


module.exports=router;