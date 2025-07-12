import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes.js';
import { bootstrap } from './bootStrap.js';
import helmet from 'helmet';
import { errorHandler } from './utils/errorHandler.js';
import fetch, { Headers, Request, Response } from 'node-fetch';
import Blob from 'fetch-blob';

if (typeof globalThis.fetch === 'undefined') globalThis.fetch = fetch;
if (typeof globalThis.Headers === 'undefined') globalThis.Headers = Headers;
if (typeof globalThis.Blob === 'undefined') globalThis.Blob = Blob;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(errorHandler);
app.use(bodyParser.json());
app.use('/', routes);

// Bootstrap preload
bootstrap().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
