const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();

app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text
});
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
  var now =new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err)
    {
    console.log("Get a error");
  }
});
  next();
});
app.use((req,res,next)=>{
res.render('maintenance.hbs');
});
app.get('/',(req,res)=>{
  // res.send("<h1 style='color:blue;'>Hello Express!<h1>");
  // res.send({
  //   name:"Akram",
  //   likes:['Dilkhush','FullFun','Chai','ChickenRoll','CarrotKaHalwa'],
  //   village:'Ranasar'
  // });
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'Padharo Mhaari Website'
  });
});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:"About Page"
  });
});
app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:"Unable to handle the request"
  });
});
app.listen(3000,()=>{console.log("Server is up on port 3000");});
