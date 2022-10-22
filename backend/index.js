const express = require("express");
const {cars} = require('./models');
const app = express();
const PORT = 1000;
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

//add cars
app.post('/cars-addd', (req,res)=>{
    const body = req.body
        console.log(body)

    cars.create(body).then(car => {
        res.status(200).json({data:car})
    }).catch(err =>{
        res.status(500).json(err)
    })
})

//get all cars
app.get('/cars', (req,res)=>{
    cars.findAll().then(car => {
        res.status(200).json({data:car})
    }).catch(err =>{
        res.status(500).json(err)
    })
})

//get specific cars by size
app.get('/size/:size', (req, res) => {
    const id = req.params.size;
    console.log(id)
    cars.findAll({
  where: {
    size: id
  }
}).then(car => {
        res.status(200).json({ data: car })
    }).catch(err => {
        res.status(500).json(err)
    });
})

//get specific cars by id
app.get('/cars/:id', (req, res) => {
    const id = req.params.id;
    cars.findByPk(id).then(car => {
        res.status(200).json({ data: car })
    }).catch(err => {
        res.status(500).json(err)
    });
})

//update cars
app.put('/cars/:id', (req,res)=>{
    const id = req.params.id;
    const body = req.body
    cars.update(body,{where:{'id':id}}).then(car => {
        res.status(200).json({data:car})
    }).catch(err =>{
        res.status(500).json(err)
    })
})

//delete cars
app.delete('/delete/:id', (req,res)=>{
    const id = req.params.id;
    cars.destroy({where:{'id':id}}).then(car => {
        res.status(200).json({data:car})
    }).catch(err =>{
        res.status(500).json(err)
    })
})



app.listen(PORT, () => {
    console.log("Berhasil! Silahkan akses http://localhost:%d", PORT);
});






