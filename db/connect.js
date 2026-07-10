const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI)
    const conn = await mongoose.connect(process.env.MONGODB_URI, {dbName: "AlrehmatGlass"});
    console.log(
      `MongoDB Connected: ${conn.connection.host}`,
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
