const express = require('express');
const router = express.Router();
let ponude = [];
let ponudaId = 1;
let nekretnine = require('./nekretnine').nekretnine; 

router.post('/', (req, res) => {
  const { idNekretnine, imeKupca, prezimeKupca, ponudjenaCijena, telefon } = req.body;

  if (!idNekretnine || !imeKupca || !prezimeKupca || ponudjenaCijena == null || !telefon) {
    return res.status(400).send('Nedostaju podaci.');
  }
  if (ponudjenaCijena < 0) {
    return res.status(400).send('Ponuđena cijena mora biti pozitivna.');
  }

  const nekretnina = nekretnine.find(n => n.id === idNekretnine);
  if (!nekretnina) {
    return res.status(404).send('Nekretnina nije pronađena.');
  }

  const novaPonuda = {
    id: ponudaId++,
    idNekretnine,
    imeKupca,
    prezimeKupca,
    ponudjenaCijena,
    telefon,
  };

  ponude.push(novaPonuda);
  res.status(201).json(novaPonuda);
});

module.exports = router;
