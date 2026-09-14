
const rateLimit = require('express-rate-limit');

exports.generalRateLimit = rateLimit({
    windowMs : 60*1000,
    max : 30,
    standardHeaders : true,
    legacyHeaders : false,
    message:{error:'Too Many Requests. Please Try again after some time.'}
})

exports.analyzeLimiter = rateLimit({
    windowMs : 60*1000,
    max : 5,
    standardHeaders : true,
    legacyHeaders : false,
    message:{error:'Please wait for a while after analysing once'}
})