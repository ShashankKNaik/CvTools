const express = require('express')
const spawn= require('child_process').spawn;
const app = express()
const fs = require('fs');

const PORT = process.env.PORT || 3000

app.set('view engine','ejs')

app.use(express.json())
app.use(express.urlencoded({
    extended:false,
    limit:'5mb'
}))

const path=__dirname+'/views'
app.use(express.static(path))
app.get('/',(req,res)=>{
    res.render('index')
})


app.post('/image',(req,res)=>{
    base64 = req.body.base64
    choice = req.body.choice
    selected = req.body.selected
    color = req.body.color
    size = req.body.size
    dimention = req.body.dimention

    store=base64.split(",");

    var dataToSend;
    var name =  Math.random()+Date.now();
    fs.writeFile("./tmp/"+name+".txt", store[1], function(err) {
        if(err) {
            return console.log(err);
        }
    }); 

    let pyfile = 'opencv.py'
    let error = false
    if(choice == '0')
        pyfile = 'dotted.py'

    const python = spawn('python', [pyfile, name, choice, selected, color,size,dimention]);
    
    python.stdout.on('data', function (data) {
        dataToSend = data.toString();
        console.log(dataToSend)
    });
    
    python.stderr.on('data',(err)=>{
        console.log(err.toString())
        error = true
    })
    
    python.on('close', (code) => {
        if(error == false)
            res.send(store[0]+','+dataToSend)
        else
            res.send('error')
    });
})

app.listen(PORT)
