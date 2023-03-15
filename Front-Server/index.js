import { randomInt } from 'crypto';
import express, { json } from 'express';
import path from 'path';
import cors from 'cors';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


// Route definitions
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'/public/landingpage/index.html'));
});
app.post('/',(req,res)=>{
  res.redirect(`/draw?=${handleId(req.body.id)}`)
  // res.send(JSON.stringify({id:`/draw?=${handleId(req.body.id)}`}));  
});

app.get('/draw', (req, res) => {
  console.log(req.params);
  res.sendFile(path.join(__dirname,'/public/canvas/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


function generateRandomString() {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i <= 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

function isAlphaNumeric(str) {
  return /^[a-z0-9]+$/i.test(str);
};

function handleId(id){
  if (isAlphaNumeric(id)&& id.length<=10){
    return id.toLowerCase();
  }
  else{
    return generateRandomString();
  }
};