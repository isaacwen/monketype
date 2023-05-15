const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB_URI, { useNewUrlParser: true })
  .catch(e => {
    console.error("Connection error", e.message)
  });

module.exports = mongoose.connection;