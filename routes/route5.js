const express = require('express');
const router  = express.Router();
const swapapi = require('../FusdTousdt');

router.post('/FusdToUsdts', swapapi.FusdToUsdts);
router.post('/claimUsdt', swapapi.claimUsdt);
router.post('/getUsdtamt', swapapi.getUsdtamt);
router.post('/Usdtbalance', swapapi.Usdtbalance);
router.post('/approves', swapapi.approves);
module.exports = router;