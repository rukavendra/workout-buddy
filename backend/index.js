const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const app = express()

var allowedOrigins = ['http://localhost:3000', 
                      'https://workout-buddy-sand.vercel.app', 
                      'https://workout-buddy-app-tau.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                      'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.options('*', cors()) // include before other routes

// rest of your code


app.use(express.json())

// app.use('/', (req,res)=>res.send("Welcome to Workout Buddy"))

app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

// route
app.use('/workouts',workoutRoutes)
app.use('/user',userRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB Access granted"))
.catch(err=>console.log(err))


app.listen(process.env.PORT,()=>console.log("Server running at port ", process.env.PORT))