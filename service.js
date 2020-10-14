fetch = require("node-fetch");

const bitcoinService = () => {
    apiUrl = 'https://api.coindesk.com/v1/bpi/currentprice.json';
    return fetch(apiUrl).then( res => res.json());
}

module.exports = bitcoinService;