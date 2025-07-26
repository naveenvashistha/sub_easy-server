import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import axios from 'axios';

dotenv.config();
const app = express();

app.set('trust proxy', 1);

app.use(cors(
  {
    origin: 'http://localhost:3000'  // Allow all origins
  }
));


app.use(express.urlencoded());
app.use(express.json());

app.post('/searchIMDB', async (req, res) => {
  try {
    const { name, year, language } = req.body;
    const apiKey = process.env.OMDB_API_KEY;
    const url = `http://www.omdbapi.com/?t=${name}&y=${year}&apikey=${process.env.API_KEY}`;
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    res.status(500).send();
  }
});


app.listen(process.env.PORT || 5000, () => {
    console.log("app is running");
  });