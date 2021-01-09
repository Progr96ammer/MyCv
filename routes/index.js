var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
const { check, validationResult } = require('express-validator');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sendMail', [
  check('name').isLength({ min: 3 }).withMessage('Name Must Be At Least 3 Charecter'),
  check('email').isEmail().withMessage('Email field must be of type email'),
  check('message').isLength({ min: 5 }).withMessage('Message Must Be At Least 5 Charecter'),
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.send({ errors: errors.array() });
  }
  else{
    async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      secure: false, // true for 465, false for other ports
      auth: {
        user: '2a5f0155dfaa0f', // generated ethereal user
        pass: 'f907401f23926c', // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: req.body.name + ' ' + req.body.email, // sender address
      to: "progr96ammer@yahoo.com", // list of receivers
      subject: "CV Message", // Subject line
      text: req.body.message, // plain text body
    });
  }
  main().catch(console.error);
  res.send({response:"success"})
}
});

module.exports = router;
