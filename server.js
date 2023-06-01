const express = require ('express');
const env = require ('./utils/utilsEnv');
const cors = require ('cors');

const app = express();

const corsOptions = {
    credentials:true, 
    origin:['http://localhost:8000'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/authRoutes')(app);

app.all('*', (req, res) => {
    res.status(404).send({
      error: true,
      message: `Cannot ${req.method} ${req.originalUrl}`,
    });
});

app.listen(3000, () => console.log('Server running at port 3000'));