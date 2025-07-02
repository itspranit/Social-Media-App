const express=require('express');
const router=express.Router();
const usersController=require('../controllers/users_controller');

router.get('/profile',passport.checkAuthentication,usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIp);
 
router.post('/create',usersController.create);
//use passport as middleware to authenticatex
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),usersController.create);

router.post('/sign-out',usersController.destroySession);

module.exports=router;