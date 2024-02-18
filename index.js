import express from "express";
import axios from "axios";

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

app.use(express.static("public"));

const apiKey = process.env.API_KEY;

app.get("/", async (req, res) => {
    try {
    const response = await axios.get(`https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=1`);
    console.log(response.data.text);

    const image = await axios.get(`https://api.thecatapi.com/v1/images/search?api_key=${apiKey}`);
    console.log(image.data[0].url);

      res.render("index.ejs", { text: response.data.text, image: image.data[0].url });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});