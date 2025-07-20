const express=require('express');
const router=express.Router();
const usersController=require('../controllers/users_controller');
const passport = require('passport');


router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
 
router.post('/create',usersController.create);
//use passport as middleware to authenticatex
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),usersController.createSession);

router.post('/sign-out',usersController.destroySession);

module.exports=router;