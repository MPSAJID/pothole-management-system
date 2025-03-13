const db = require('./config/db');

app.get('/test-db',async (req,res)=>{
    try{
        const result = await db.query('SELECT NOW()');
        res.json(result.rows);
    }catch(err){
        console.log(err);
        res.status(500).send("db error");
    }
});