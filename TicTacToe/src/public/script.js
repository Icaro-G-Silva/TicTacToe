const nameInput = document.getElementById('name')
const socket = io();
var userName

document.getElementById('newServer').addEventListener('click', async () => {
    if(setName()) {
        const serverName = '123' //for now, its static. (Testing purposes)
        await socket.emit('newUser', userName, serverName)
        await socket.emit('moveToServer', serverName)
    }
})

document.getElementById('serverLogin').addEventListener('click', async () => {
    if(setName()) {
        let serverName = prompt('Qual o código da sala?')
        await socket.emit('newUser', userName, serverName)
        await socket.emit('moveToServer', serverName)
    }
})

const setName = () => {
    userName = nameInput.value
    if(!userName.length > 0) {
        alert('Por favor, coloque seu nome')
        nameInput.focus()
        return false
    }
    return true
}

socket.on('alert', msg => alert(msg))

socket.on('serverDown', msg => {
    //Just testing
    alert(msg)
})
