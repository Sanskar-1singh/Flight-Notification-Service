const nodemailer=require('nodemailer');

const mailsender=nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:'mailerservice812@gmail.com',
        pass:'nihi eklu wlat hcyj'
    }
});

module.exports=mailsender;