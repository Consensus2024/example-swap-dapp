const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Endpoint to receive transaction data
app.post('/api/transaction', (req, res) => {
    const { charitySelected, charityName, amount } = req.body;

    // Calculate rounded-up amount
    const roundedUpAmount = Math.ceil(amount);

    // Log incoming transaction details
    console.log(`Received transaction: 
        Charity Selected: ${charitySelected}, 
        Charity Name: ${charityName}, 
        Amount: ${amount}, 
        Rounded-Up Amount: ${roundedUpAmount}`);

    // Respond with the processed data
    res.json({
        charitySelected,
        charityName,
        roundedUpAmount,
        message: 'Transaction processed successfully'
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
