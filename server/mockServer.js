const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let charities = [
  { name: 'Charity A', address: 'GABC...ABC' },
  { name: 'Charity B', address: 'GBCA...CBA' },
];

// Endpoint to get the list of charities
app.get('/charities', (req, res) => {
  res.json(charities);
  console.log('Charities list sent');
});

// Endpoint to handle USDC swap and donation
app.post('/swap', (req, res) => {
  const { chain, address, roundUp, selectedCharity, amount } = req.body;
 
  // Simulate the USDC swap
  console.log(`Swapping USDC to ${chain === 'stellar' ? 'Stellar' : 'Ethereum'} address: ${address}`);
  
  if (roundUp && selectedCharity) {
    console.log(`Rounding up and donating to ${selectedCharity}`);
  }

  res.json({ success: true, message: 'Swap complete' });
});

app.listen(port, () => {
  console.log(`Mock server listening at http://localhost:${port}`);
});
