import express from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js"
import { Book } from "./modules/bookModel.js";
import { PORT, URL } from "./config.js";
import cors from "cors"

const app = express();

app.use(express.json());

app.use(cors());

// app.use(
//     cors({
//         origin: "http//:localhost:5555",
//         methods: ["PUT",'GET','POST','DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/', (request, response) => {
    console.log('GET / called');
    return response.status(234).send('Mern Stack 200');
});

app.use('/books',booksRoute);

mongoose
    .connect(URL)
    .then(() => {
        console.log("DB connected");
        app.listen(PORT, () => {
            console.log(`App is listening on PORT: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
