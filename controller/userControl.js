let jwt = require('jsonwebtoken');
var config = require('../config/dbconfig');
const User = require('../models/userModel');


var functions = {
	//AddNew
	addNew: async function (req, res, next) {

		const { userName, email, password } = req.body;
			User.findOne({ email: email.toLowerCase() }, (err, data) => {
				// console.log(data);
				if (!data && !err) {
					User.findOne({ userName: userName }, (err, user) => {
						if (err) {
							// console.log(3);
							return res.json({
								success: false,
								msg: err.message
							});
						}
						if (user) {
							return res.json({
								success: false,
								msg: 'User Name Already Taken!',
								
							});
						}
					})
					
					//Check The mail in the dB
					var newUser = User({
						userName: userName,
						password: password,
						email: email.toLowerCase(),
					});
					newUser.save(function (err, newUser) {
						if (err) {
							// console.log(3);
							return res.json({
								success: false,
								msg: err.message,
							});
						} else {
							// console.log(4);
							let { userName, email } = newUser;
							return res.json({
								success: true,
								msg: 'Successfully saved',
								user: { userName, email },
							});
						}
					});
				} else if (data) {
					console.log(data)
					//If the Mail already connected
					return res.json({
						success: false,
						msg: 'Mail Already Conected with an account!',
					});
				} else {
					return res.json({
						success: false,
						msg: err,
					});
				}
			});
	},
	//Authendicate the user--->Login
	authendicate: function (req, res, next) {
		const { email, password } = req.body;
		
		User.findOne(
			{
				email: email,
			},
			function (err, user) {
				if (err) throw err;
				if (!user) {
					res.status(403).send({
						success: false,
						msg: 'Authendication Failed!, User not found',
					});
				} else {
					//Else Compare the password and check whether it's correct
					user.comparePassword(password, function (err, isMatch) {
						if (isMatch && !err) {
							//Creating Jwt token Expire in 2 hour
							jwt.sign(
								{ user },
								config.secret,
								{ expiresIn: '2h' },
								(err, token) => {
									if (err) {
										return res.json({ success: false, msg: err });
									} else {
										// var payload = jwt.decode(token, config.secret);
										return res.json({ success: true, userid: user._id, token: token});
										
									}
								}
							);
						} else {
							return res.json({
								success: false,
								msg: 'Wrong Password!!!',
							});
						}
					});
				}
			}
		);
	},


	//Delete User
	deleteuserByID : async function(req, res, next){
		try{
			User.findByIdAndRemove(req.body.userid)
			return res.json({
				success: true,
				msg: "deleted"
			})

		}catch(err){
			return res.status(403).send({
				success: false,
				msg: err.message,
			});
		}
	},

	//Get the all users
	handleGet: async function (req, res, next) {
		try {
			let allUsers = await User.find().select('-password');
			return res.status(200).json({ allUsers: allUsers });
		} catch (err) {
			if (err) {
				return next(err);
			}
		}
	},
	//Get One User by Id
	handleGetById: async function (req, res, next) {
		// console.log(req);
		try {
			const userById = await User.findById(req.params.id).select('-password');
			if (!userById) {
				return res.status(404).json({ success: false, msg: 'Id not found' });
			}
			return res.status(200).json({ user: userById });
		} catch (err) {
			if (err) {
				return next(err);
			}
		}
	},
	//Update User Name
	handleNameUpdate: async function (req, res, next) {
		// console.log(req.body);
		try {
			let updatedUser = await User
				.findByIdAndUpdate(req.body.userid, {userName: req.body.userName})
				.select('-password');
			return res.status(200).json({ success: true, msg: 'User Name Updated!' });
			//Catch Error
		} catch (err) {
			if (err) {
				return next(err);
			}
		}
	},
	verifyToken: async function (req, res, next) {
		try {
			console.log("reached verify token")
			const bearerHeader = req.headers['authorization'];
			if (typeof bearerHeader !== 'undefined') {
				const bearerToken = bearerHeader.split(' ')[1];
				// console.log(bearerToken);
				jwt.verify(bearerToken, config.secret, (err, authData) => {
					if (err) {
						return res.status(403).json({ msg: 'Authorization failed!', error: err });
					} else {
						req.userName = authData.userName;
						req.email = authData.email;
						req.userid = authData._id
						next();
					}
				});
			} else {
				return res.status(403).json({ msg: 'Authorization Error!',error:'undefiend token' });
			}
		} catch (err) {
			return next(err);
		}
	},

	//Change Password
	changePassword: async function (req, res, next) {
		try {
			newPassword = req.body.newpassword;
			User.findByIdAndUpdate()
		} catch (err) {
			return res.status(500).json({
				success: false,
				msg: err.message
			})
		}
	},
};



module.exports = functions;