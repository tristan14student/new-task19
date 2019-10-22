// importing the modules that will be required for this task
// express
const express = require('express')
const app = express();
// fetch
const fetch = require('node-fetch')
// the filehandler
const fs = require('fs')
// the body which will pass the data to the page
const bodyParser = require('body-parser')
// helmut is used to protect code security
const helmet = require('helmet')
// json files where the favourite data will be stored
var favMusic = require('./Musiclike.json')
var favBooks = require('./bookfave.json')

//////////////////////////////////////////////////////////////////

app.use(bodyParser.json())
app.use(express.json())
app.use(helmet())

// the music section
// this is the get request which we will use for the search
app.get('/music', (req, res) => {
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(req.query.search)}&limit=10&entity=song`)
        .then(function(res) {
            return res.json()
        })
        .then(function(info) {
            res.send((info.results))
        })
})

// the post request
// this is where the data that was favourited gets added to the music Json
app.post('/musiclike', (req, res) => {
    favMusic.push(req.body)
    fs.writeFile('musiclike.json', JSON.stringify(favMusic), (err) => {
        if (err) {
            console.log("the file was not added", err)
        } else {
            console.log("your file has been added")
        }
    })
})

// this displays the favourited data from the json file
app.get('/musiclike', (req, res) => {
    fs.readFile('./musiclike.json', (err, info) => {
        if (err) {
            console.log('Does not work')
        } else {
            res.send(favMusic)
        }
    })
})

// this will delete a file added to the favourites
app.delete('/musiclike', (req, res) => {
    console.log('access')
    favMusic = favMusic.filter((i) => {
        return i.id != req.body.deleted
    })
    fs.writeFile('musiclike.json', JSON.stringify(favMusic), (err) => {
        if (err) {
            console.log(" it not working", err)
        } else {
            console.log("It is working")
        }
    })
})
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
// books
// the music section
// this is the get request which we will use for the search
app.get('/book', (req, res) => {
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(req.query.search)}&limit=10&entity=ebook`)
        .then(function(res) {
            return res.json()
        })
        .then(function(info) {
            res.send((info.results))
        })
})

// will add the favourites to the json file
app.post('/favoritesBooks', (req, res) => {
    favBooks.push(req.body)
    fs.writeFile('bookfave.json', JSON.stringify(favBooks), (err) => {
        if (err) {
            console.log("It's not working", err)
        } else {
            console.log("It's working")
        }
    })
})

// will display the contents of the json file on the page
app.get('/favoritesBooks', (req, res) => {
    fs.readFile('./bookfave.json', (err, info) => {
        if (err) {
            console.log('cant read')
        } else {
            res.send(favBooks)
        }
    })
})

// this will delete the file from the json
app.delete('/favoritesBooks', (req, res) => {
    console.log('access')
    favBooks = favBooks.filter((i) => {
        return i.id != req.body.deleted
    })
    fs.writeFile('bookfave.json', JSON.stringify(favBooks), (err) => {
        if (err) {
            console.log("the delete isnt working", err)
        } else {
            console.log("the delete is working")
        }
    })
})






//this is the port which the back end of the code is run on 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Sever is listening on port ${PORT}`)
})

