const sock  =  new WebSocket('ws://localhost:3000');
sock.onmessage = (e) =>{
    console.log(e);
}