const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;
// "mongodb+srv://adityapanda15:adityapanda15@cluster0.b3i1nh0.mongodb.net/construction-management?retryWrites=true&w=majority";

// mongoose.connect(URI);

const connectDb = async () => {
  try {
    await mongoose.connect(URI);

    console.log("connection successful to DB");
  } catch (error) {
    console.error("database connection failed");

    process.exit(0);
  }
};

module.exports = connectDb;
