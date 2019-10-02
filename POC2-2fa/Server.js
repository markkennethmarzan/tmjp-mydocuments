var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "testmerightnow1022@gmail.com",
        pass: "createpassword"
    }
});
var rand,mailOptions,host,link;
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
	res.sendfile('index.html');
});

app.get('/send',function(req,res){
    rand=Math.floor((Math.random() * 100000) + 54);
	host=req.get('host');
	console.log(host);
	link="http://"+req.get('host')+"/verify?code="+rand;
	console.log(link)
	mailOptions={
		to : req.query.to,
		subject : "Please confirm your Email account",
		html : `Testing, <br><br> <b>Verification Code: ${rand}</b> <br><br>Please Click on the link to verify your email.<br> <a href="${link}">Click here to verify</a>`
	}
	console.log(mailOptions);
	smtpTransport.sendMail(mailOptions, function(error, response){
   	 if(error){
		console.log(error);
		res.end("error");
	 }else{
		console.log("Message sent: " + response.message);
	res.end("sent");
	}
});
});
// {
// 	req: {
//		headers: {},
// 		query: {
// 			name: 123456
// 		},
// 		body: {
//			data: {
// 				verify: 1234,
// 				email: "sdfghj",
// 				name:
// 			},
//		},
// 		protocol: 
// 	}
// }
// <input id="input-red" name="verify">
app.get('/verify',function(req,res){
console.log(req.protocol+":/"+req.get('host'));
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
	console.log("Successfully Registered into the system");
	console.log(req.query.code);
	if(req.query.code==rand)
	{
		console.log("Successfully Verified");
		res.end("You have successfully registered into the system.Your username/email:"+mailOptions.to);
	}
	else
	{
		console.log("email is not verified");
		res.end("<h1>Failed to register</h1>");
	}
}
else
{
	console.log("No data found");
	res.end("<h1><u>Request is from unknown source</u></h1>");
}
});

/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
	console.log("Express Started on Port 3000");
});
