const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();
const mailsender=require('./config/email-config');

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());


app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    try {
        const response=await mailsender.sendMail({
            from:ServerConfig.GMAIL_EMAIL,
            to:'sanskarsingh812@gmail.com',
           subject:'testing purpose 02',
             text:'yes it is working now'
        });
        console.log(response);
    } catch (error) {
         console.log(error);
    }
   
});

//nihi eklu wlat hcyj