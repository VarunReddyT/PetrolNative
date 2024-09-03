    const express = require('express');
    const mongoose = require('mongoose');
    const app = express();
    const cors = require('cors');
    const schema = require('./schema');
    const dotenv = require('dotenv');
    const bodyParser = require('body-parser');

    dotenv.config();

    const PORT = 4000;

    app.use(cors());
    app.use(bodyParser.json());
    app.use(express.json());

    const mongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        serverSelectionTimeoutMS: 5000, 
    };

    mongoose.set('debug', true);
    mongoose.connect('mongodb+srv://Tvarun2014:varunreddy2014@cluster0.cc98p65.mongodb.net/petrol?retryWrites=true&w=majority&appName=Cluster0',mongoOptions)
        .then(() => {
        console.log('Successfully connected to MongoDB Atlas');
    }).catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });

    app.get('/', (req, res) => {
        res.send("Hello World");
    });

    app.post('/petrol', async (req, res) => {
        const { reading, price, date } = req.body;

        const data = new schema({
            reading: reading,
            price: price,
            date: date
        });

        try{
            await data.save();
            console.log("Data saved");
            res.status(201).send("Data Saved");
        }
        catch(err){
            console.log(err);
            res.status(500).send("Failed to save data");
        }
    }
    );

    app.get('/records', async (req, res) => {
        try{
            const data = await schema.find().sort({ date: -1 });
            res.status(200).send(data);
        }
        catch(err){
            console.log(err);
            res.status(500).send("Failed to get data");
        }
    }
    );

    app.delete('/records/:id', async (req, res) => {
        const id = req.params.id;
    
        try {
            await schema.findByIdAndDelete(id);
            res.status(200).send("Record deleted successfully");
        } catch (err) {
            console.log(err);
            res.status(500).send("Failed to delete record");
        }
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        }
    );