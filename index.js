const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// mongoose.connect(process.env["DB_URL"])
mongoose.connect("mongodb+srv://ysonu1071:813208@cluster0.9zlg4.mongodb.net/testdemo?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB connected!"))
    .catch((err) => console.log(err.message))

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },

}, { timestamps: true });

const UserModel = mongoose.model("user", userSchema);

app.post("/user", async (req, res) => {
    console.log("request comming");
    console.log(req.body, 'this is request')

    let userInfo = await UserModel.create({ email: req.body.email });
    return res.status(200).json({ message: userInfo })
})

app.get("/", async (req, res) => {
    try {
        userInfo = await UserModel.find();
        console.log(userInfo,' this is userinfo')
        // return res.status(200).json({ message: "response from server", data: [{ email: "hello" }] })
        return res.status(200).json({message:"response from server", data: userInfo})
    } catch (err) {
        console.log(err, 'this is errror')
        res.status(200).json({ message: "some error" })
    }
})


// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();
// require("./db/ndex")
// const userRoute = require("./routes/userRoute")
// const formRoute = require("./routes/formRoute");


// app.use(cors());
// app.use(express.json());

// app.use("/user", userRoute);
// app.use("/form", formRoute);






app.listen(8000, () => { console.log("Server is running on port 8000") });