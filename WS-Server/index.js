import { WebSocketServer } from 'ws';
import fs from 'fs';
const wss = new WebSocketServer({ port: 8080 });

var id_clients = {
};

async function readWriteJson(d_in,id) {
  var obj;
  try {
    const readFile = await fs.promises.readFile('./data/data.json');
    const myObject = await JSON.parse(readFile);
    if (myObject[id]){
      obj = await {...myObject,[id]:{"data":{...myObject[id].data,...d_in}}};
    }
    else{
      obj = await {...myObject,[id]:{"data":{...d_in}}};
    }

    await fs.promises.writeFile('./data/data.json', JSON.stringify(obj));
  } catch (error) {
    console.error(error);
  }
}

wss.on('connection', async (ws, req)=>{
    const url = await req.url;
    const id = await url.substring(9,15);
    if(id_clients[id]){
      await id_clients[id].push(ws);
      let temp = await new Set(id_clients[id]);
      id_clients[id] = await[...temp]
      const readFile = await fs.promises.readFile('./data/data.json');
      const myObject = await JSON.parse(readFile);
      ws.send(JSON.stringify(myObject[id].data))
    }
    else{
      id_clients = await {...id_clients, [id]:[ws]};
    }
    ws.on('message', async message=>{
        try {
          const data = await  JSON.parse(message);
          await readWriteJson(data, id);
          const readFile = await fs.promises.readFile('./data/data.json');
          const myObject = await JSON.parse(readFile);
          id_clients[id].forEach(client => {
            if (ws != client){
              client.send(JSON.stringify(myObject[id].data))
            }
          });
        }
        catch (e) {
            console.log(e);
        }
    });
    ws.on("close", () => {
      const index = id_clients[id].indexOf(ws);
      if (index > -1) {
        id_clients[id].splice(index, 1);
      }
    });
    console.log(id_clients[id].length);
});