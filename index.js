require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
// const bodyParser = require("body-parser"); line body-parser package ko current file me import karti hai.
// body-parser middleware client se aane wale request data ko read aur process karne me madad karta hai.
// Jab frontend form ya JSON data bhejta hai tab body-parser us data ko parse karta hai.
// Parse karne ke baad request ka data req.body ke andar available ho jata hai.
// require("dotenv").config(); line dotenv package ko load karke .env file ko read karti hai.
// .env file ke andar database URL, API keys aur secret values securely store ki jaati hain.
// config() method environment variables ko process.env object ke andar load kar deta hai.
// Iske baad process.env.MONGODB_URI ya process.env.PORT ko application me use kiya ja sakta hai.
// const mongoose = require("mongoose"); line Mongoose library ko current file me import karti hai.
// Mongoose Node.js aur MongoDB ke beech communication karne ka kaam karti hai.
// Isi library ki madad se database connection, schema aur models create kiye jaate hain.
// Mongoose ke through data ko save, read, update aur delete karna bahut aasaan ho jata hai.
// Yeh teeno lines application ke shuru hone par zaroori packages ko load karke backend ko kaam karne ke liye ready karti hain.
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
// const connectDb = require("./db/connect.js"); line doosri file ka code current file me import karti hai.
// require() Node.js ka built-in function hai jo kisi bhi module ya file ko load karta hai.
// "./db/connect.js" path batata hai ki connect.js file db folder ke andar maujood hai.
// connect.js file ke andar database connection banane wala function likha hua hota hai.
// require() us file ko execute karta hai aur uska exported data return karta hai.
// Jo value connect.js se export hoti hai woh connectDb variable me store ho jaati hai.
// Ab current file connectDb function ko directly call karke database se connect ho sakti hai.
// Agar require() ka use na karein to doosri file ka function yahan available nahi hoga.
// Is tarah code alag-alag files me divide rehta hai aur project manage karna aasaan ho jata hai.
// require() ki wajah se code reusable banta hai aur baar-baar same code likhne ki zarurat nahi padti.

const connectDb = require("./db/connect.js");

const sendEmail = require("./sendModel/sendEmail.js"); // Adjust the path as needed
const sendSms = require("./sendModel/sendSms.js"); // Adjust the path as needed

const ContactModel = require("./models/contactModel");
const CareerModel = require("./models/CareerModel");
const SignUpModel = require("./models/SignUpModel.js");

// const port = 3004; line ke through server ke chalne ka port number 3004 set kiya gaya hai.
// Port ko aap application ke gate ki tarah samajh sakte hain jahan se requests andar aati hain.
// Jab browser ya frontend backend se connect hota hai to isi port ka use karta hai.
// const app = express(); line Express framework ka ek application object create karti hai.
// Yeh app object poore backend ka main controller hota hai jo sabhi requests ko manage karta hai.
// Isi app object ki help se routes, middleware aur server ki settings configure ki jaati hain.
// app.use(express.json()); middleware incoming JSON data ko automatically JavaScript object me convert karta hai.
// Jab frontend POST, PUT ya PATCH request me JSON data bhejta hai tab yeh middleware usse read karta hai.
// Is middleware ke bina req.body undefined milega aur bheja gaya data access nahi ho paayega.
// Isliye express.json() ka use almost har Express application me sabse pehle kiya jata hai.

const port = 3004;
const app = express();
app.use(express.json());

// app.use(cors({...})) middleware ka use kiya gaya hai taaki browser ki CORS policy handle ho sake.
// CORS ka full form Cross-Origin Resource Sharing hota hai jo browser ki security feature hai.
// Jab frontend aur backend alag domain ya alag port par hote hain tab browser request block kar deta hai.
// CORS middleware browser ko batata hai ki kaun si websites backend ko request bhej sakti hain.
// origin property ke andar allowed frontend URLs ki ek list di gayi hai.
// "frontend-link" application ka live production frontend URL hai jo request bhej sakta hai.
// "local frontend link" developer ke local computer par chalne wale React frontend ka address hai.
// Iska matlab development aur production dono environments se requests allow ki ja rahi hain.
// Agar request kisi aur website ya unknown domain se aayegi to browser usse automatically block kar dega.
// credentials: true ka use cookies, session aur authentication tokens ko request ke saath bhejne ke liye kiya gaya hai.
// Is setting ki wajah se login information aur user session backend tak safely pahunch paate hain.
// Agar credentials true na ho to browser cookies aur authentication details send nahi karega.
// Yeh poori configuration application ko secure banati hai aur sirf trusted frontend applications ko access deti hai.
// Is tarah backend unauthorized websites ki requests ko reject karta hai aur user data ko safe rakhta hai.

app.use(cors({
  origin: [
    "https://alrehmatglass.vercel.app",
    "http://localhost:3000",
  ],
  credentials: true,
}));

// connectDb(); line database connection function ko execute karne ke liye likhi gayi hai.
// Yeh function server start hote hi MongoDB se connection establish kar deta hai.
// Isse index.js me isliye call kiya jata hai kyunki yahi application ka entry point hota hai.
// Jab Node.js application start hoti hai to sabse pehle index.js file execute hoti hai.
// Is wajah se database connection bhi sabse pehle banana zaroori hota hai.
// Database connect hone ke baad hi application database par operations kar sakti hai.
// Agar yeh function call na kiya jaye to MongoDB se connection kabhi establish nahi hoga.
// Connection ke bina Mongoose ke find(), save() aur update() jaise methods fail ho jayenge.
// connectDb() ko technically kisi aur file se bhi call kiya ja sakta hai.
// Lekin best practice yahi hai ki ise index.js ya server.js me hi call kiya jaye.
// Iska reason yeh hai ki poori application ek hi baar database se connect hoti hai.
// Agar har route ya controller me connectDb() call karenge to unnecessary connections ban sakte hain.
// Isse performance par bura effect pad sakta hai aur code bhi manage karna mushkil ho jayega.
// Isliye application ke start hote hi ek baar connectDb() call karna sabse sahi approach mana jata hai.
connectDb();

// app.post("/Support", ...) line ek POST API route create karti hai jo support form ka data receive karti hai.
// Jab frontend "/Support" URL par POST request bhejta hai tab yeh route automatically execute ho jata hai.
// request parameter ke andar client se aaya hua poora request data store hota hai.
// response parameter ka use client ko result ya response wapas bhejne ke liye kiya jata hai.
// ContactModel.create(request.body) request ke body me aaye data ko MongoDB me save karta hai.
// request.body ke andar frontend se bheja gaya form data JSON object ke roop me hota hai.
// ContactModel Mongoose model hai jo Contact collection ke saath directly connected hota hai.
// create() method naya document bana kar database collection me insert kar deta hai.
// Agar data successfully save ho jata hai to .then() block execute hota hai.
// .then() ke andar newDataBinded parameter newly inserted document ko receive karta hai.
// response.json(newDataBinded) saved data ko JSON format me frontend ko wapas bhej deta hai.
// Frontend is response ko receive karke success message ya further processing kar sakta hai.
// Agar data save karte waqt kisi bhi tarah ka error aa jaye to .catch() block execute hota hai.
// console.log() error ko server console me print karta hai taaki developer problem samajh sake.
// response.status(500).json(err) client ko Internal Server Error ke saath error details bhejta hai.
// Is poore route ka kaam support form ka data receive karna, database me save karna aur response return karna hai.
app.post("/Support", (request, response) => {
  ContactModel.create(request.body)
    .then((newDataBinded) => {
      response.json(newDataBinded);
    })
    .catch((err) => {
      console.log("Error in /Support POST: ", err);
      response.status(500).json(err);
    });
});

app.post("/SignUpPage", (request, response) => {
  SignUpModel.create(request.body)
    .then((newDataBinded) => {
      response.json(newDataBinded);
    })
    .catch((err) => {
      console.log("Error in /SignUpPage POST: ", err);
      response.status(500).json(err);
    });
});

app.post("/LogInPage", async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await SignUpModel.find({ email, password });

    console.log("user found", user)
    response.json(user)


  } catch (err) {
    console.log("Error in /LogInPage POST: ", err);
    response.status(500).json(err);
  }
});

app.post("/Career", async (request, response) => {
  try {
    // const newData = await CareerModel.create(request.body);
    // console.log("New career data: ", newData);

    const newData = request.body;

    const career = await CareerModel.create(newData)

    if (!career) {
      return response.status(400).json({ message: "Error while storing data!", success: false })
    }

// const { name, mobile, email, location, course } = newData; line object destructuring ka use karti hai.
// Object destructuring ka matlab object ke values ko alag-alag variables me nikalna hota hai.
// newData ek object hai jisme form se aaya hua poora user data store hota hai.
// Is object ke andar name, mobile, email, location aur course jaise fields maujood hote hain.
// Yeh line in sabhi fields ko ek hi statement me alag variables bana deti hai.
// Iske baad name likhne se newData.name automatically access ho jata hai.
// Isi tarah mobile likhne se newData.mobile aur email likhne se newData.email mil jata hai.
// Agar destructuring na karein to har jagah newData.name aur newData.mobile likhna padega.
// Destructuring ki wajah se code chhota, readable aur maintain karna bahut aasaan ho jata hai.

    const { name, mobile, email, location, course } = newData;
    const subject = "New Job Application Received - Al Rehmat Glass Pvt. Ltd.";
    const text = `Name: ${name}\nMobile No:${mobile}\nEmail: ${email}\nLocation: ${location}\nApplied for: ${course}`;

    try {
      await sendEmail("irfanullah1782@gmail.com", subject, text);
    } catch (emailError) {
      console.error("Error sending email: ", emailError);
    }

    const smsBody = `New Job Application Received - Al Rehmat Glass Pvt. Ltd.\n
    Name: ${name} 
    Mobile Number : ${mobile}
    Email: ${email}
    Current Location : ${location}
     Applied for: ${course}
    `;
    try {
      await sendSms(process.env.OWNER_PHONE_NUMBER, smsBody);
    } catch (smsError) {
      console.error("Error sending SMS: ", smsError);
    }


    response.json(newData);
  } catch (error) {
    console.error("Error in /Career POST: ", error);
    response.status(500).send("Internal Server Error");
  }
});


app.get("/Support", async (req, res) => {
  try {
    const items = await ContactModel.find();
    res.json(items);
  } catch (err) {
    console.error("Error in /Support GET: ", err);
    res.status(500).send(err);
  }
});

app.get("/SignUpPage", async (req, res) => {
  try {
    const items = await SignUpModel.find();
    // console.log("Items fetched from database:", items);

    if (Array.isArray(items)) {
      res.json(items);
    } else {
      res.status(500).json({ error: "Fetched items are not an array" });
    }
  } catch (err) {
    console.error("Error in /SignUpPage GET: ", err);
    res.status(500).send(err);
  }
});

// Flow: Frontend se GET "/Career" request aati hai → ye route execute hota hai 
// → CareerModel.find() MongoDB se saara data fetch karta hai
//  → data 'items' me store hota hai → 
// res.json(items) data ko JSON format me frontend ko bhejta hai
//  → frontend me ye response.data ke roop me receive hota hai 
// → setEntries(response.data) state update karta hai
//  aur latest data UI me show ho jata hai.

app.get("/Career", async (req, res) => {
  try {
    const items = await CareerModel.find();
    console.log(items)
    res.json(items);
  } catch (err) {
    console.error("Error in /Career GET: ", err);
    res.status(500).send(err);
  }
});

app.get("/", async (req, res) => {
  try {
    res.status(200).send("Backend is running");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});