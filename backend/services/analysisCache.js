const NodeCache = require('node-cache');

const cache = new NodeCache({stdTTL : 6*60*60, checkPeriod : 600})

function makeCacheKey (text)  {
    return text.trim().toLowerCase.replace(/\s+/g," ");
}

function getCachedResult(text){
    return cache.get(makeCacheKey(text)) || null;
}

function setCachedResult(text,result){
    cache.set(makeCacheKey(text),result)
}

module.exports = { getCachedResult, setCachedResult}