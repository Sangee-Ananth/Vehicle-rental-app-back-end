const express = require('express');
const router = express.Router();
const userControl = require('../controller/userControl');


//Adding New User Or SignUp=>{name, mail, password ,confirmPassword}--> Send mail
router.post('/api/auth/register', userControl.addNew,()=>{
	console.log("testing")
});

//Authendicate the user And send the JWT token =>{req->mail, password}=> res.authToken ->Header.autheriztion
router.post('/api/auth/login', userControl.authendicate);

//Get the All user Info     => All users
router.get('/api/user/alluser', userControl.verifyToken, userControl.handleGet);

//Get one user info by id   => info (mail name)
router.get(
	'/api/user/info/:id',
	userControl.verifyToken,
	userControl.handleGetById
);

//Update user Name by ID req->id
router.put(
	'/api/user/updatename',
	userControl.verifyToken,
	userControl.handleNameUpdate
);


module.exports = router;