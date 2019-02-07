const express = require('express');
const { hackerNews, medium, reddit } = require('./articles.json');

const app = express();

const delay = 2000;

app.get('/api/hacker-news', (req, res) => {
  setTimeout(() => {
    res.status(200).send(hackerNews);
  }, delay)
})
app.get('/api/medium', (req, res) => {
  setTimeout(() => {
    res.status(200).send(medium);
  }, delay)
})
app.get('/api/reddit', (req, res) => {
  setTimeout(() => {
    res.status(200).send(reddit);
  }, delay)
})

const port = 4000;
app.listen(port, () => console.log(`Listening on port: ${port}`))