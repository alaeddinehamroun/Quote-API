const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));



//GET /api/quotes/random

app.get('/api/quotes/random', (req, res, next) => {
    randomQuote = getRandomElement(quotes)
    toSendQuote ={
        quote: randomQuote
    }
    res.status(200).send(toSendQuote)
})
//GET /api/quotes
app.get('/api/quotes', (req, res, next) => {
    person= req.query.person
    if(person === undefined){
        toSendQuotes = {
            quotes: quotes
        }
    }
    else if(person !== undefined){
        filteredQuotes =[]
        quotes.forEach(quote => {
            if(quote['person'] === person)
                filteredQuotes.push(quote)
        });
        toSendQuotes = {
            quotes : filteredQuotes
        }
    }
    res.status(200).send(toSendQuotes)
})

// POST /api/quotes
app.post('/api/quotes', (req, res, next) => {
    newQuote = req.query
    if(newQuote.quote && newQuote.person){
        toSendQuote = {
            quote : newQuote
        }
        res.send(toSendQuote)
    } else
        res.status(400).send('error')
})
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})