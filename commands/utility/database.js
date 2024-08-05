const redis = require('redis');

const redisClient = redis.createClient(6279,'127.0.0.1');

async function init(){
    redisClient.on('error', (err)=>{
        console.log('Error occured while connecting or accessing redis server');
    });
    await redisClient.connect();
}

async function store(object){
    await init();
    const objectString = JSON.stringify(object);
    await redisClient.rPush(object.user, objectString, (err, reply) => {
        if(err) {
            console.error(err);
        }
        else {
            console.log('Object stored.');
        }
    });
    await redisClient.quit();
}

async function getByUsername(username){
    await init();
    await redisClient.lRange(username, 0, -1, (err, replies) => {
        if(err) {
            console.log(err);
            return [];
        }
        else {
            const objects = replies.map(reply => JSON.parse(reply));
            return objects;
        }
    });
    await redisClient.quit();
}

module.exports = { store, getByUsername };