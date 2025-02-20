const express = require('express');
const PORT = 8000

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

console.log('Hello World!');