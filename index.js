const express = require("express");
const app = express();
const datastore = require("nedb");
const mailer = require("nodemailer");
require('dotenv').config()

let database = new datastore('./.data/database.db');

database.loadDatabase();

const url = 'http://localhost:3001'

app.listen(process.env.port, () => console.log(`live at ${url}`));
app.use(express.static("public"));
app.use(express.json({ }));

app.get('/api',(req, res) =>{
  database.find({},(err, data) =>{
    if(err){
      console.log(err);
      return;
    }
      res.send(data);
  });
})

app.post('/api', (req, res) => {
    const timestamp = Date.now();
    const ret = req.body;
    ret.timestamp = timestamp;
  database.insert(ret);
  res.send({ status:"success",
    body:ret
});
});

app.post("/mailapi", (req, res)=>{
  let transporter = mailer.createTransport({
    service:'yahoo',
    auth: {
      user:process.env.testMail,
      pass:process.env.pass
    }
  });

  const acknowledgements = "Dear Visitor, Thank you for reaching out to me I will get back to you as soon as possible.\n P.S. this a computer generated message please dont reply"

  const visitoroptions = {
    from:process.env.testMail,
    to:req.body.mail,
    subject:req.body.sub,
    html:acknowledgements
  }

  const myoptions = {
    from:process.env.testMail,
    to:process.env.myMail,
    subject:req.body.sub,
    html:req.body.body
  }

  console.log(visitoroptions);

  

  transporter.sendMail(myoptions,(err,info)=>{
    if(err){
      console.log(err);
      res.json({ status : 123})
    }else{
      console.log("Got mail");
      transporter.sendMail(visitoroptions,(err,info)=>{
        if(err){
          console.log(err);
          res.json({ status : 123})
        }else{
          console.log("Acknowledgements sent!!");
          res.json({ status : 200})
        }
      })
    }
  })

})
