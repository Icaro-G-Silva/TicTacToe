const cache = require('../cache')

const getName = async (socketId) => {
    let name = await cache.get(socketId)
    if(name != null) name = (name.split(':'))[0]
    return name
}

const getServer = async (socketId) => {
    let server = await cache.get(socketId)
    if(server != null) server = (server.split(':'))[1]
    return server
}

module.exports = {
    getName,
    getServer
}