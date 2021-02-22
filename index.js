const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const mapItems = require('./mapItems');
const mapDetail = require('./mapDetail');
var cors = require('cors')

var routerItems = express.Router();
const app = express();
const port = 8000;

const apiBase = 'https://api.mercadolibre.com/';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

routerItems.get('/', (req, res) => {
  const query = req.query.q;
  const queryURL = `${apiBase}sites/MLA/search?q=${query}`;
  axios.get(queryURL)
    .then((response) => {
      res.json(mapItems(response.data));
    })
    .catch((error) => {
      res.json(error);
    })
})

routerItems.get('/:id', (req, res) => {
  const id = req.params.id;
  const detailsURL = `${apiBase}/items/${id}`;
  const descriptionURL = `${apiBase}/items/${id}/description`;
  const requests = [axios.get(detailsURL), axios.get(descriptionURL)];

  Promise.all(requests)
    .then(responses => {
      res.json(mapDetail(responses));
    })
    .catch((error) => {
      res.json(error);
    })
})

app.use('/api/items', routerItems);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})