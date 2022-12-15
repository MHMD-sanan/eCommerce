const nodemailer=require('nodemailer');

module.exports={
  mailTransporter:nodemailer.createTransport({
    service:'gmail',
    auth:{
      user: 'muhammedsanan14@gmail.com',
      pass: 'gevzigfkuqjowdcp'
    },
  }),
  OTP:`${Math.floor(1000+Math.random()*9000)}`,
}