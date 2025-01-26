import express from "express"
import {Book} from "../modules/bookModel.js"
const router = express.Router();


router.get("/",async (request,response)=>{
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data:books
        });
    }catch(error){
        console.log(error.message);
        return response.status(500).send({message: error.message})
    }
});

router.get("/:id", async (request,response)=>{
    try{
        const { id } = request.params;

        const book = await Book.findById(id);
        return response.status(200).json(book)
    }catch(error){
        console.log(error.message);
        return response.status(500).send({message: error.message})
    }
})

router.put("/:id", async (request,response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({ message: "Send all required fields: title, author, publishYear" });
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(404).json({message: "Book Not Found"});
        }

        return response.status(202).send({message: "Book updated sucessfully"});

    }catch(error){
        console.log(error.message);
        return response.status(500).send({message:error.message})
    }
})

router.delete("/:id",async (request,response)=>{
    try{
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message: "Book Not Found"});
        }
        return response.status(200).send({message: "Book deleted sucessfully"})
    }catch(error){
        console.log(error.message);
        return response.status(500).send({message:error.message})
    }
})

router.post('/', async (request,response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({ message: "Send all required fields: title, author, publishYear" });
        }
        const newbook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        }

        const book = await Book.create(newbook);
        return response.status(202).send(book)

    }catch(error){
        console.log(error.message);
        return response.status(401).send({message: error.message})
    }
})

export default router;