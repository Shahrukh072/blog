const express = require('express');
const { 
    generateAgoraTokenAdmin, 
} = require('../controller/liveController');
const router = express.Router();

router.post("/generateAgoraTokenAdmin" , generateAgoraTokenAdmin)



module.exports = router;