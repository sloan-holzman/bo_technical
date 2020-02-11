const express = require('express');
const cors = require('cors');
const app = express();
const port = 3030;
const fetchMostRecentBlocks = require('./fetch-most-recent-blocks');
app.use(cors({
    origin: '*',
    allowedHeaders: '*'
}));

app.options('*', cors())

app.get('/fetchMostRecent', (req, res) => {
    const numBlocks = req.query.numBlocks || 10;
    fetchMostRecentBlocks(numBlocks)
        .then(blocks => {
            res.status(200).send(blocks);
        }).catch(err => {
            console.error(err);
            res.status(401).send('Error fetching blocks');
        });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
