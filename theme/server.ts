// server.js (JavaScript example)
const express = require('express');
const { createServer } = require('http');
const next = require('next');
const  { Request, Response } = require('express')


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Host & Port from environment or defaults
 const HOST ="lp06.corp.itroteam.com"
// const HOST = "localhost";
const PORT = parseInt(process.env.PORT || '0', 10) || 4000;

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



// import express, { Request, Response } from 'express';
// // @ts-ignore
// import { createServer } from 'http';
// import next from 'next';
//
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();
//
// // Host & Port from environment or defaults
// const HOST:string = "lp06.corp.itroteam.com";
// const PORT:number = parseInt(process.env.PORT || '0', 10) || 4000;
// declare function createServer(handler: (req: any, res: any) => void): {
//     listen(port: number, hostname: string, callback?: (err?: any) => void): void;
// };
// app.prepare().then(() => {
//     const server = express();
//
//     // Let Next.js handle everything else
//     server.all('*', (req: Request, res: Response) => {
//         return handle(req, res);
//     });
//
//     createServer(server).listen(PORT, HOST, (err: any) => {
//         if (err) throw err;
//         console.log(`> Custom server ready on http://${HOST}:${PORT}`);
//     });
// });



// const express = require('express');
// const { createServer } = require('http');
// const next = require('next');
//
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();
//
// // Host & Port from environment or defaults
// const HOST = "lp06.corp.itroteam.com"; // Hostname as a string
// const PORT = parseInt(process.env.PORT || '0', 10) || 4000;
//
// // Custom createServer declaration (optional for TypeScript, included for clarity)
// function customCreateServer(handler) {
//     return createServer(handler);
// }
//
// app.prepare().then(() => {
//     const server = express();
//
//     // Let Next.js handle everything else
//     server.all('*', (req, res) => {
//         return handle(req, res);
//     });
//
//     // Start the server
//     customCreateServer(server).listen(PORT, HOST, (err) => {
//         if (err) {
//             console.error(err);
//             throw err;
//         }
//         console.log(`> Custom server ready on http://${HOST}:${PORT}`);
//     });
// });
