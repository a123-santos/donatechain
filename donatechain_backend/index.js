const express = require('express');
const Web3 = require('web3');
const { address, abi } = require('./constants');

const app = express();
app.use(express.json());

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

app.get('/events', async (req, res) => {
    try {
        const contract = new web3.eth.Contract(abi, address);
        const events = await contract.methods.showEvents().call();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/events', async (req, res) => {
    const { transactionHash } = req.body;
    try {
        const receipt = await web3.eth.getTransactionReceipt(transactionHash);
        if (!receipt) {
            return res.status(400).json({ error: 'Transaction not found' });
        }

        res.json({ success: true, receipt });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/addFund', async (req, res) => {
    const { transactionHash, eventName, amount } = req.body;
    try {
        const receipt = await web3.eth.getTransactionReceipt(transactionHash);
        if (!receipt) {
            return res.status(400).json({ error: 'Transaction not found' });
        }

        // Optional: Verifizieren Sie die Transaktion weiter, speichern Sie Details in der Datenbank etc.
        res.json({ success: true, receipt });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/donors/:address', async (req, res) => {
    const userAddress = req.params.address;
    try {
        const contract = new web3.eth.Contract(abi, address);
        const donations = await contract.methods.showDonor(userAddress).call();
        res.json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Blockchain Service running on port ${PORT}`);
});
