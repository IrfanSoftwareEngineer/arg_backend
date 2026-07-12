const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDB = async () => {
  //Function ke andar
  // try block ka use kiya gaya
  // hai taaki connection ke dauran agar
  // koi error aaye to program crash
  // na ho aur usse properly handle
  // kiya ja sake. 
  try {
    //Sabse pehle console.log(process.env.MONGODB_URI)
    // ke through .env file me store
    // MongoDB connection string ko console par
    // print kiya jata hai,
    console.log(process.env.MONGODB_URI)
    // jisse developer
    // verify kar sakta hai ki environment
    // variable sahi tarah load hua hai
    // ya nahi.


    //Iske baad mongoose.connect(process.env.MONGODB_URI,
    // { dbName: "AlrehmatGlass" }) call hota hai,
    // jo di gayi connection string ki
    // help se MongoDB server se connect hota hai
    const conn = await mongoose.connect(process.env.MONGODB_URI, { dbName: "AlrehmatGlass" });

    //  aur dbName option batata
    // hai ki application ko "AlrehmatGlass" database
    // ke saath kaam karna hai. Kyunki
    // database se connection establish hone me
    // kuch time lag sakta hai, isliye
    // await keyword ka use kiya gaya
    // hai, jo execution ko tab tak
    // rok kar rakhta hai jab tak
    // connection successfully complete na ho jaye.


// Connection successful hone ke baad mongoose
// ek connection object return karta hai,
// jo conn variable me store ho jata
// hai. Iske baad conn.connection.host ke
// through connected MongoDB server ka host
// name console me print kiya jata
// hai, jisse confirm ho jata hai
// ki application successfully database se connect
// ho chuki hai. Agar connection ke
// dauran kisi bhi tarah ka error
// aa jaye, jaise incorrect connection string,
// internet problem, authentication failure ya MongoDB
// server unavailable hona, to execution catch
// block me chala jata hai.

    console.log(
      `MongoDB Connected: ${conn.connection.host}`,);
    console.log(
      `MongoDB Connected: ${conn.connection.name}`,);
    console.log(
      `MongoDB Connected: ${conn.connection.port}`,);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
