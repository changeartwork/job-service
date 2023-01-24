const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
