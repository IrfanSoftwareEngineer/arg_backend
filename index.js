const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const sendEmail = require("./sendModel/sendEmail.js"); // Adjust the path as needed
const sendSms = require("./sendModel/sendSms.js"); // Adjust the path as needed

const ContactModel = require("./models/contactModel");
const CareerModel = require("./models/CareerModel");
const SignUpModel = require("./models/SignUpModel.js");

const port = 3004;
const app = express();
app.use(express.json());

app.use(cors());

app.use(
  cors({
    origin: "https://irfanfoundation.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("mongodb is connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

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

   console.log("user found",user)
      response.json(user) 

      
    }  catch (err) {
    console.log("Error in /LogInPage POST: ", err);
    response.status(500).json(err);
  }
});

app.post("/Career", async (request, response) => {
  try {
    // const newData = await CareerModel.create(request.body);
    // console.log("New career data: ", newData);

    const newData = request.body;

   const career =  await CareerModel.create(newData)

   if(!career){
    return response.status(400).json({message:"Error while storing data!", success: false})
   }


    const { name, mobile, email, location, course } = newData;
    const subject = `New Student Registered Successfully`;
    const text = `Name: ${name}\nMobile No:${mobile}\nEmail: ${email}\nLocation: ${location}\nCourse: ${course}`;

    try {
      await sendEmail("irfanullah2220@gmail.com", subject, text);
    } catch (emailError) {
      console.error("Error sending email: ", emailError);
    }

    const smsBody = `New Student Registered:\n
    Name: ${name} 
    Mobile Number : ${mobile}
    Email: ${email}
    Course: ${course}
    Current Location : ${location}
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

app.get("/", (req, res) => {
  res.send("API Home");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});