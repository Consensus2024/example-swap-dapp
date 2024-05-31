const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// let charities = [
//   { name: 'Charity A', address: 'GABC...ABC' },
//   { name: 'Charity B', address: 'GBCA...CBA' },
// ];
const charities =  [
  {
      address: "GABC1234ABC1234ABC1234ABC1234ABC1234ABC1234ABC1234ABC1234",
      amount: 0,
      name: "St. Jude's Children's Hospital",
      description: "St. Jude's Children's Hospital is a pediatric treatment and research facility focused on children's catastrophic diseases."
  },
  {
      address: "GDEF5678DEF5678DEF5678DEF5678DEF5678DEF5678DEF5678DEF5678",
      amount: 0,
      name: "American Red Cross",
      description: "American Red Cross is a humanitarian organization that provides emergency assistance, disaster relief, and education."
  },
  {
      address: "GHIJ9012HIJ9012HIJ9012HIJ9012HIJ9012HIJ9012HIJ9012HIJ9012",
      amount: 0,
      name: "World Wildlife Fund",
      description: "World Wildlife Fund is an international non-governmental organization founded in 1961, working in the field of the wilderness preservation, and the reduction of human impact on the environment."
  },
  {
      address: "GKL3456KL3456KL3456KL3456KL3456KL3456KL3456KL3456KL3456",
      amount: 0,
      name: "Doctors Without Borders",
      description: "Doctors Without Borders is an international humanitarian medical non-governmental organisation of French origin best known for its projects in conflict zones and in countries affected by endemic diseases."
  },
  {
      address: "GHIJ9012HIJ9012HIJ9012HIJ9012HIJ9012HIJ9012HIJ9012HIJ9012",
      amount: 0,
      name: "Stellar Development Foundation",
      description: "The Stellar Development Foundation is a non-profit organization that supports the development and growth of the Stellar network, a decentralized blockchain that connects financial systems."
  },
  {
      address: "GHIJ9012HIJ9012HIJ9012HIJ9012HIJ9012HIJ9012HIJ9012HIJ9012",
      amount: 0,
      name: "International Rescue Committee",
      description: "The International Rescue Committee responds to the world’s worst humanitarian crises and helps people to survive and rebuild their lives."
  }
]
// Endpoint to get the list of charities
app.get('/charities', (req, res) => {
  res.json(charities);
  console.log('Charities list sent', ...charities);
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
