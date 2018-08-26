const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const utils = require('utility');
const userRouter = require('./user');
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

app.listen(8093, () => {
	console.log('the server start on 8093');
})