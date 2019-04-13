const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const clientRouter = require('./routers/clients.router');
const postRouter = require('./routers/posts.router');

const app = express();

const PORT = 3000;

// Parse body to json (aparently in a convinient way)
app.use(bodyParser.json());

/*
Static files server set up
AVERIGUAR QUE HACE Y POR QUE (no entiendo bien) */
app.use(express.static(__dirname + '/client/dist/MatesApp'));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

app.use(clientRouter);
app.use(postRouter);

/*
Ultimo error-handler
Aca se mandan las respuestas con errores */
app.use(function(error, req, res, next){
    console.log(error.stack);

    if (error.customInfo) {
        res.status(error.customInfo.status);
        res.write(error.customInfo.message);
    } else {
        res.status(500);
        res.write('Ha ocurrido un error');
    }

    res.send();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));