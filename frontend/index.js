const express = require("express");

const axios = require('axios');
const uploadOnMemory = require("./uploadOnMemory");
const cloudinary = require("./cloudinary");
const app = express();
app.use(express.static("./public"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 2000;

//get all
app.get('/', async (req, res) => {
    try {
        const car = await axios.get('http://localhost:1001/api/v1/cars');
        console.log('cars',car)
        res.render('list-cars', car.data)
    } catch (err) {
        console.log('err', err)
        res.status(500).json(err)      
    }
})

//get specific
app.get('/size', async (req, res) => {
    try {
        const id = req.query.size;
        console.log(id)
        const cars = await axios.get(`http://localhost:1000/size/${id}`);
        res.render('list-cars', cars.data)
    } catch (err) {
        res.status(500).json(err)
    }
})

//get car-add.ejs
app.get('/car-add', (req, res) => {
    res.render('car-add')
})
// add cars
app.post(
    "/car-add",
    uploadOnMemory.single("image"),
    (req, res) => {
        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;

        cloudinary.uploader.upload(file, { folder: 'test' }, async function (err, result) {
            if (!!err) {
                console.log(err);
                return res.status(400).json({
                    message: "Gagal upload file!",
                });
            }

            const body = req.body;
            body.image = result.url;
            console.log(body)
            try {
                const cars = await axios.post('http://localhost:1000//api/v1/cars-addd', body);
                console.log(cars);
                return res.redirect("/")
            } catch (err) {
                console.log(err);
                return res.status(500).json(err)
            }
        });
    }
);

//get car-update by specific id
app.get('/car-update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const cars = await axios.get(`http://localhost:1000/cars/${id}`);
        res.render('car-updated', cars.data)
    } catch (err) {
        res.status(500).json(err)
    }
})
// update cars 
app.post(
    "/car-update/:id",
    uploadOnMemory.single("image"),
    (req, res) => {
        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;

        cloudinary.uploader.upload(file, { folder: 'test' }, async function (err, result) {
            if (!!err) {
                console.log(err);
                return res.status(400).json({
                    message: "Gagal upload file!",
                });
            }

            const id = req.params.id;
            const body = req.body;
            body.image = result.url;
            try {
                const cars = await axios.put(`http://localhost:1000/cars/${id}`, body);
                return res.redirect("/")
            } catch (err) {
                return res.status(500).json(err)
            }
        });
    }
);

//delete cars
app.get('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const cars = await axios.delete(`http://localhost:1000/delete/${id}`);
        res.redirect("/")
    } catch (err) {
        res.status(500).json(err)
    }
})

app.listen(PORT, () => {
    console.log(`Express nyala di http://localhost:${PORT}`);
});
