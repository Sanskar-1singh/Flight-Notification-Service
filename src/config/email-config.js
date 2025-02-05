const nodemailer=require('nodemailer');

const {ServerConfig}=require('../config/index');

const mailsender=nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:ServerConfig.GMAIL_EMAIL,
        pass:ServerConfig.GMAIL_PASSWORD
    }
});

module.exports=mailsender;