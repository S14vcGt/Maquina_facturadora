const express = require("express");

const app = express();

app.use(express.text())
app.post('/user',(req, res)=>{
    console.log(req.body)
    res.send('Nuevo usuario creado')
});

app.listen(3000);
