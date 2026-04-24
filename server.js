
const express=require('express'),sqlite3=require('sqlite3').verbose();
const app=express(),db=new sqlite3.Database('./signin.db');
app.use(express.json());app.use(express.static('public'));
db.run("CREATE TABLE IF NOT EXISTS logs(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,trade TEXT,date TEXT,time TEXT,action TEXT)");
app.post('/api/sign',(req,res)=>{let b=req.body;db.run("INSERT INTO logs(name,trade,date,time,action) VALUES(?,?,?,?,?)",[b.name,b.trade,b.date,new Date().toLocaleTimeString(),b.action],()=>res.json({ok:true}))});
app.get('/api/logs',(req,res)=>db.all("SELECT * FROM logs ORDER BY id DESC",(e,r)=>res.json(r||[])));
app.listen(process.env.PORT||3000);
