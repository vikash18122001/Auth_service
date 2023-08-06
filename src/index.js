const express=require('express');
const app=express();
const apiRoutes=require('./routes/index');
const bodyParser=require('body-parser');
const db=require('./models/index')


const {PORT}=require('./config/serverConfig')
 startServer=async ()=>{
    
  
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);
    app.listen(PORT,()=>{
        console.log(`server is running on port:${PORT}`);
        if(process.env.SYNC_DB){
            db.sequelize.sync({alter:true});
        }
    })
}

startServer();