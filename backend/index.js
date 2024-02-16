
import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import  MongoDBStore  from "connect-mongodb-session";
import contactFormRouter from "./routes/contactFormRoutes.js";
import invoiceRouter from "./routes/invoiceRoutes.js";
import clientRouter from "./routes/clientRoutes.js";
import supportRouter from "./routes/supportRoutes.js";
import ProjectOrderRouter from "./routes/ProjectOrderRoutes.js";
import projectsRouter from "./routes/projectsRoutes.js";



dotenv.config();
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
 

app.use(cors({
  credentials:true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin:['http://localhost:5173']
}
));

app.use(express.json({ limit: "50mb" }));



const MongoDBStoreSession = MongoDBStore(session);

const store = new MongoDBStoreSession({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});

app.use(session({
  secret: process.env.SESSSION_SECRET,
  resave:false,
  saveUninitialized: true,
  store:store,
  cookie:{
    secure: 'auto',
    maxAge:1000 * 60 * 60 * 24,
  }
}));

// app.use(express.static('dist'));
// app.get('*',(req,res)=>{
//   res.sendFile(path.join(__dirname,'dist/index.html'))
// });


app.use("/api/user",userRouter);
app.use("/api/contactForms",contactFormRouter)
app.use("/api/invoices",invoiceRouter);
app.use("/api/clients",clientRouter);
app.use("/api/support",supportRouter);
app.use('/api/ProjectOrder', ProjectOrderRouter);
app.use('/api/projects', projectsRouter);



mongoose
.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Database Connected");
    app.listen(process.env.PORT,console.log(`Server is running on http://localhost:${process.env.PORT}`))
})
.catch((error)=>{
    console.log(error)
});


