const express = require("express");
const { connection } = require("./db");
const { userRoute } = require("./routes/user.routes");
const { postRoute } = require("./routes/post.routes");
const cors = require("cors")
const app = express();

app.use(express());
app.use(cors())
app.use(express.json())
app.use("/users",userRoute)
app.use("/posts",postRoute)



app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log("Mongodb atlas is connected ")
        console.log("Server is Conntected")
    }catch(err){
        console.log(err)
    }
})