const express = require('express');
const app = express();
const config = require('./config');

app.use(express.static('./public'));

app.listen(config.port, () => {
    console.log(`Server on port ${config.port} http://${config.host}:${config.port}`);
})