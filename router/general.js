const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    // If provide username and password
    if(username && password) {
        // If not duplicate username
        if (isValid(username)) {
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login ^^"})
        } else {
            return res.status(404).json({message: "User already exist!"});
        }
    } else {
        return res.status(404).json({message: "Please provide username and password"});
    }
    
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    setTimeout(() => {
        return res.send(JSON.stringify(books));
    }, 1000);    
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    setTimeout(() => {
        return res.send(books[isbn]);
    }, 500);    
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const filtered_books = Object.values(books).filter(item => item.author === author)
    setTimeout(() => {        
        return res.send(filtered_books);
    }, 300);
    
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const filtered_books = Object.values(books).filter(item => item.title === title);
    setTimeout(() => {
        return res.send(filtered_books);
    }, 300);    
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    return res.send(books[isbn]);
});

module.exports.general = public_users;
