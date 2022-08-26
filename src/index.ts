/**
 * Required External Modules
 */

 import * as dotenv from "dotenv";
 import express from "express";
 import cors from "cors";
 import helmet from "helmet";
 import apiRoutes from './routes/apiRoutes'
 import { connect } from './configs/database';
 const { createProxyMiddleware } = require('http-proxy-middleware');
 const bodyParser = require('body-parser');
 const path = require("path");

 dotenv.config();

 connect();

 /**
 * App Variables
 */

if (!process.env.PORT) {
    process.exit(1);
 }
 
 const PORT: number = parseInt(process.env.PORT as string, 10);
 
 const app = express();

 /**
 *  App Configuration
 */
  app.use( bodyParser.json() );       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.static('public')); 
  app.use('/images', express.static('images'));
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

/**
 * Router
 */
 app.use("/api", apiRoutes);

 app.all('*', (req, res) => {
  res.status(404).send('<h1>404! Page not found</h1>');
});

app.use('/api/', createProxyMiddleware({
  target: process.env.URL_API,
  changeOrigin: true,
}))

/**
 * Server Activation
 */

 app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });