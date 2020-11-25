const Redis = require('ioredis')
const client = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    keyPrefix: 'cache:'
})

client.on('error', error => {
    console.error(`Error on cache -> ${error}`)
})

const get = async key => {
    var response = null
    await client.get(key, (err, res) => {
        if(err) console.error(`Error on cache:get -> ${err}`)
        response = res
    })
    return response
}

const set = async (key, value) => {
    await client.set(key, value, err => {
        if(err) {
            console.error(`Error on cache:set -> ${err}`)
            return false
        }
    })
}

const del = async key => await client.del(key)

module.exports = {
    get,
    set,
    del
}
