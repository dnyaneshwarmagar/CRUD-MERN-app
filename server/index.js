const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const Food = require("./models/Food")
const cors = require("cors");
app.use(cors())

app.post("/insert", async (req, res) => {
    try {
        const item = req.body;
        const newItem = new Food(item);
        await newItem.save();
        res.json(item)

    } catch (err) {
        res.json(err)
    }
})

app.get("/read", async (req, res) => {
    try {
        const data = await Food.find({});
        res.send(data)
    } catch (err) {
        res.json(err)
    }
})

app.patch("/update", async (req, res) => {
    try {
        const newFoodName = req.body.newFood;
        const id = req.body.id;

        const nf = await Food.findByIdAndUpdate(id, req.body, { new: true }).lean().exec();

        return res.send(nf)

    } catch (err) {
        res.json(err)
    }
})
app.delete(`/delete/:id`, async (req, res) => {
    try {
        const f = await Food.findByIdAndDelete(req.params.id).lean().exec();
        return res.send(f)
    } catch (err) {
        console.log(err)
    }
})
app.listen(8080, () => {
    try {
        mongoose.connect("mongodb+srv://dnyaneshm:magar123@cluster0.zt3jhwa.mongodb.net/food?retryWrites=true&w=majority")
        console.log("listening on port 8080!!")
    } catch (err) {
        console.log(err)
    }
})