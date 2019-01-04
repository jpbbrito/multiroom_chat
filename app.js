const app = require('./config/server.js');


const server = app.listen(80, () => {
    console.log('Servidor Online');
});

const io = require('socket.io').listen(server);

app.set('io',io);

io.on('connection', (socket) => {
    console.log('Usuario conectou');

    socket.on('disconnect', () => {
        console.log("Usuario desconectou");
    });

    socket.on('msgParaServidor', (data) => {
        socket.emit('msgParaCliente', {apelido : data.apelido, mensagem: data.mensagem});
        socket.broadcast.emit('msgParaCliente', {apelido : data.apelido, mensagem: data.mensagem});
        
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
            socket.emit('participanteParaCliente', {apelido : data.apelido});
            socket.broadcast.emit('participanteParaCliente', {apelido : data.apelido});
        }
    });

});