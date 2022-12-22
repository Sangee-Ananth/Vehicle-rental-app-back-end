const express = require('express')
const rateLimit = require("express-rate-limit")
const mongodbConnect = require('./config/db');
const users = require("./routes/userRoutes")
const cors = require('cors')
mongodbConnect();


const app = express();
app.use(express.json());
app.use(cors());
app.use(users);

app.use(
	rateLimit({
	  windowMs:  60 * 60 * 1000, // 1 hour duration in milliseconds
	max: 2000,
	message: "You exceeded 200 requests in 1 hour limit!",
	headers: true,
	})
);


/*
Concise output colored by response status for development use. 
The :status token will be colored 
green for success codes,
red for server error codes, 
yellow for client error codes, 

and uncolored for information codes.
*/
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
// console.log("server");

//Port Declaring
const PORT = process.env.PORT || 5005;
app.listen(
	PORT,
	console.log(
		` Servever Listening to ${process.env.NODE_ENV} mode on port ${PORT} `
	)
);