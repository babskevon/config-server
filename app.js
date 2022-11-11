const express = require('express');
const bodyParser = require("body-parser");
var path = require('path');
const cors = require('cors');


const port = 3000;
const dbConnect = require('./app/config/dbConnect');
const app = express();
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '')))

app.use(bodyParser.urlencoded({
    extended: true
}));

//Set Database Connections
app.use(dbConnect);

// enable CORS
app.use(cors());


require("./app/routes/config-server.routes.js")(app);
app.get('/', (req, res) => {
  res.send('Config-server running!');
});

app.listen(port,'0.0.0.0', () => {
  console.log(`Example app listening at http://0.0.0.0:${port}`);
});