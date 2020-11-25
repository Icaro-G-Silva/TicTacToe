const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
require('dotenv').config()

const cache = require('./utils/cache')
const user = require('./utils/userDataManipulation')

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', socket => {
    console.log(`New Connection: ${socket.id}`)

    socket.on('newUser', async (userName, serverName) => await cache.set(socket.id, `${userName}:${serverName}`))

    socket.on('moveToServer', async serverName => {
        if(await user.getServer(socket.id) !== null) {
            socket.join(serverName)
            socket.to(serverName).emit('alert', `${await user.getName(socket.id)} entrou na partida`)
        }
        else io.to(socket.id).emit('alert', 'Servidor inexistente!')
    })

    socket.on('disconnect', async () => {
        socket.to(await user.getServer(socket.id)).emit('serverDown', `${await user.getName(socket.id)} saiu da partida`)
        await cache.del(socket.id)
    })
})

server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => console.log(`Server running on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`))
