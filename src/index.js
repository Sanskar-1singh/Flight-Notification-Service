const express = require('express');
const {EmailService}=require('./services')
const amqplib=require('amqplib');

async function connectQueue(){
    try {
        const connection=await amqplib.connect("amqp://localhost");
        const channel=await connection.createChannel();
    
        await channel.assertQueue("noti-queue");
         channel.consume("noti-queue",async (data)=>{
            
            const object=JSON.parse(`${Buffer.from(data.content)}`);
            console.log(object);
           await EmailService.sendEmail('mailservice812@gmail.com',object.recepientEmail,object.subject,object.text);
            channel.ack(data);//always acknowldege data not object because we are consuming data not object>>
         })
    } catch (error) {
         console.log(error);
    }
}

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
   await connectQueue();
    // try {
    //     const response=await mailsender.sendMail({
    //         from:ServerConfig.GMAIL_EMAIL,
    //         to:'sanskarsingh812@gmail.com',
    //        subject:'testing purpose 02',
    //          text:'yes it is working now'
    //     });
    //     console.log(response);
    // } catch (error) {
    //      console.log(error);
    // }
   
});

//nihi eklu wlat hcyj