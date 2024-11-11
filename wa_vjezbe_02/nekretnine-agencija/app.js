const express = require('express');
const nekretnineRouter = require('./routes/nekretnine');
const ponudeRouter = require('./routes/ponude');

const app = express();
const port = 3000;
app.use(express.json());
app.use('/nekretnine', nekretnineRouter);
app.use('/ponude', ponudeRouter);
app.listen(port, () => {
  console.log(`Poslužitelj radi na http://localhost:${port}`);
});
