require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require('./database/connect');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

const errorMiddleware = require('./middlewares/error-handler');
const notFoundMiddleware = require('./middlewares/not-found');

//routes

app.get('/', (req, res) => {
  res.status(200).send('Notes API');
});

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running at port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
