const nodemailer = require('nodemailer');

module.exports = (form) => {

    
    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'mguelpa.clinica.online@gmail.com', // Cambialo por tu email
    //         pass: 'pfximmoassdafbtr' // Cambialo por tu password
    //     }
    // });

    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: "mguelpa.clinica.online@gmail.com",
          pass: "yulstfwmiijnkbzd"
        }
      });
    
    const mailOptions = {
        from: "mguelpa.clinica.online@gmail.com",
        to: form.email,
        subject: form.subject,
        html: `<p> Active su usuario haciendo click <a href="https://mguelpa-lab-iv-tp-clinica.herokuapp.com/patient/${form.uid}/activate">aquí.</a></p>`
    };
    
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}