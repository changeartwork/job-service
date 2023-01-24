require('dotenv').config();
const express = require('express');
const path = require('path');
const jobRoute = require('./routes/job');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./spec/swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/spec/swagger.css"), 'utf8');
const cors = require('cors');
require('./config/db');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/v1/api/job',jobRoute);
app.use(cors());
app.use('/v1/api/job/spec', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

app.listen(`${process.env.APP_PORT}`, () => {
  console.log('job-service started on port '+ `${process.env.APP_PORT}`);
});
