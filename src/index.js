const express=require('express');
const app=express();

const {PORT}=require('./config/serverConfig')
 startServer=async ()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on port:${PORT}`);
    })
}

startServer();