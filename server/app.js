
const express = require('express');

const app = express();

const port = process.env.PORT || 8000;

app.get('/', (req, res) => res.send('Hello there'))

app.listen(port, () => console.log(`polybase server listening at http://localhost:${port}`))