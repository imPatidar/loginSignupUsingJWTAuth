const express = require('express');
const router = express.Router();
/*** apis***/

router.get('/all', (req, res) => {
    console.log(req.body.User)
    res.status(200).json(req.body)
});


module.exports = router;