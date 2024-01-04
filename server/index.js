const express = require('express');
const app = express();
const path = require('path');
const {client, seed} = require('./db')
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(express.json())
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../public/index.html'))); 

app.use('/api', require('./api'))


const init = async()=> {

  await client.connect()
  console.log('connected to db')

  await seed()

  const port = process.env.PORT || 5432;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
  });
};

init();
