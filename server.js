const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const port = 5000


mongoose.connect('mongodb://localhost/mydatabase',{
    usenewurlparse:true,
    useunifiedtopology:true
})
const db= mongoose.connection;
db.on("error",console.log.bind(console,"mongodb error connection:"))
db.once("open", () => {
    console.log("connect to mongodb successfully")
})

let books = []
// Create a Book
app.post('/books',(req,res) =>{
    const { title, author } = req.body
    if(!tittle || !author){
        return res.status(400).send("missing title or author")
    }
    const newBook = {id: books.length +1,tttle,author}
    books.push(newBooks)
    res.status(201).send(newBook)
});

// Get All Books
app.get('/books',(req,res) =>
{
    res.json(books)
})

// Get a Single Book
app.get('/books/:id',(req,res) =>
    {
        const book = books.find(b => b.id === parseInt(req.params.id))
        if(!book){
            return res.status(404).send('book not found')
        }
        res.json(book)
    });

    // Update a Book
    app.put('/books/:id', (req, res) => {
        const book = books.find(b => b.id === parseInt(req.params.id))
        if (!book) {
          return res.status(404).send('Book not found')
        }
      
        const { title, author } = req.body
        book.title = title || book.title
        book.author = author || book.author
      
        res.send(book)
      });


//Delete a book
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) {
      return res.status(404).send('Book not found');
    }
  
    books.splice(bookIndex, 1);
    res.status(204).send();
  });

app.use(express.json())

app.get ('/',(req,res) =>{
    res.send('hello world')
})

app.listen (port,() =>{
    console.log(`srever is localhost:${port}`)
})