const express = require('express');
const router = express.Router();

let nekretnine = [];
let nekretninaId = 1;

router.get('/', (req, res) => {
  res.json(nekretnine);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send('ID mora biti broj.');

  const nekretnina = nekretnine.find(n => n.id === id);
  if (!nekretnina) return res.status(404).send('Nekretnina nije pronađena.');

  res.json(nekretnina);
});

router.post('/', (req, res) => {
  const { naziv, opis, cijena, lokacija, brojSoba, povrsina } = req.body;

  if (!naziv || !opis || cijena == null || !lokacija || brojSoba == null || povrsina == null) {
    return res.status(400).send('Nedostaju podaci.');
  }
  if (cijena < 0 || brojSoba < 0 || povrsina < 0) {
    return res.status(400).send('Cijena, broj soba i površina moraju biti pozitivni.');
  }

  const novaNekretnina = {
    id: nekretninaId++,
    naziv,
    opis,
    cijena,
    lokacija,
    brojSoba,
    povrsina,
  };

  nekretnine.push(novaNekretnina);
  res.status(201).json(novaNekretnina);
});
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send('ID mora biti broj.');

  const { naziv, opis, cijena, lokacija, brojSoba, povrsina } = req.body;
  if (!naziv || !opis || cijena == null || !lokacija || brojSoba == null || povrsina == null) {
    return res.status(400).send('Nedostaju podaci.');
  }
  if (cijena < 0 || brojSoba < 0 || povrsina < 0) {
    return res.status(400).send('Cijena, broj soba i površina moraju biti pozitivni.');
  }

  const nekretnina = nekretnine.find(n => n.id === id);
  if (!nekretnina) return res.status(404).send('Nekretnina nije pronađena.');

  nekretnina.naziv = naziv;
  nekretnina.opis = opis;
  nekretnina.cijena = cijena;
  nekretnina.lokacija = lokacija;
  nekretnina.brojSoba = brojSoba;
  nekretnina.povrsina = povrsina;

  res.json(nekretnina);
});
router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send('ID mora biti broj.');

  const nekretnina = nekretnine.find(n => n.id === id);
  if (!nekretnina) return res.status(404).send('Nekretnina nije pronađena.');

  const { naziv, opis, cijena, lokacija, brojSoba, povrsina } = req.body;

  if (naziv) nekretnina.naziv = naziv;
  if (opis) nekretnina.opis = opis;
  if (cijena != null && cijena >= 0) nekretnina.cijena = cijena;
  if (lokacija) nekretnina.lokacija = lokacija;
  if (brojSoba != null && brojSoba >= 0) nekretnina.brojSoba = brojSoba;
  if (povrsina != null && povrsina >= 0) nekretnina.povrsina = povrsina;

  res.json(nekretnina);
});
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send('ID mora biti broj.');

  const index = nekretnine.findIndex(n => n.id === id);
  if (index === -1) return res.status(404).send('Nekretnina nije pronađena.');

  nekretnine.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
