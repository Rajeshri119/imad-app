var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var Pool=require('pg').Pool;

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var articles={
    'article-one':{ title:'Article one I rajeshri nair',
    heading:'Article one',
    date:'August 13',
    content:`  <p>
           This is content of article one.This is content of article one .This is content of article one  .
           This is content of article one  .This is content of article one  .This is content of article one  .
           This is content of article one
        </p>
         <p>
           This is content of article one.This is content of article one .This is content of article one  .
           This is content of article one  .This is content of article one  .This is content of article one  .
           This is content of article one
        </p>
         <p>
           This is content of article one.This is content of article one .This is content of article one  .
           This is content of article one  .This is content of article one  .This is content of article one  .
           This is content of article one
        </p>`},
    'article-two':{title:'Article two I rajeshri nair',
    heading:'Article two',
    date:'August 15',
    content:`  <p>
           This is content of article two</p>`},
    'article-three':{title:'Article three I rajeshri nair',
    heading:'Article three',
    date:'August 18',
    content:`  <p>
           This is content of article three.`}
};

function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
var htmlTemplate=`<html
    <head>
    <title>
        <h1> ${title}</h1>
    </title>
    <meta name="viewport" content="width-device-width,initial-scale-1">
   <link href="/ui/style.css" rel="stylesheet" />
</head>
<body>
    <div class="container">
        <div>
    <a href="/">home</a>
    </div>
    <div>
        <h3>
            ${heading}
        </h3>
    </div>
    <div>
       ${date}
    </div>
    <div>
 ${content}
    </div>
    </div>
</body>
</html>
    `;
    return htmlTemplate;
}
app.get('/:articleName',function(req,res){
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});
var config={
    user:'rajeshri119',
    database:'rajeshri119',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
    
};
var pool=new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test',function(err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringyfy(result));
        }
    });
});
app.get('/article-two',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/article-three',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
