const express = require('express');
const cors = require('cors');

const router = require('./router.js');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(router);


const PORT = 3001;

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON ${PORT}`);
});


module.exports = app;