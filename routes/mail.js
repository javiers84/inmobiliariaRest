const { Router } = require('express');
// const { email } = require('../config/mail');
const email = require('../config/mail');

const router = Router();

// router.post('/enviar',
//     email.sendMail()
// );

router.post('/enviar', (req, res) => {
    email(req.body);
    res.status(200);
});

module.exports = router;