// server.js (JavaScript example)
const express = require('express');
const { createServer } = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Host & Port from environment or defaults
// const HOST ="lp06.corp.itroteam.com"
const HOST = "localhost";
const PORT = parseInt(process.env.PORT, 10) || 4000;

app.prepare().then(() => {
    const server = express();

    // Custom route example: server.get('/health', (req, res) => { ... })

    // Let Next.js handle everything else
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    createServer(server).listen(PORT, HOST, (err) => {
        if (err) throw err;
        console.log(`> Custom server ready on http://${HOST}:${PORT}`);
    });
});
