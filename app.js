var express = require('express')
var app = express()
var ejs = require('ejs')
var bodyParser = require('body-parser')
var urlencodedBodyParser = bodyParser.urlencoded({extended:false})
var methodOverride = require('method-override')
var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('forum.db')
var cookieParser = require('cookie-parser')

app.use(urlencodedBodyParser)
app.use(methodOverride('_method'))
app.use(cookieParser())
app.set('view-engine', 'ejs')

app.use(express.static('public'))

app.get('/', function(req,res){
  res.redirect('/login')
})
app.get('/login', function(req,res){
  res.render('login.ejs')
})

app.get('/index', function(req,res){
  db.all('SELECT * FROM threads', function(err,rows){
    console.log("hii")

    db.all('SELECT * FROM comments', function(cerr,crows){
      res.render('index.ejs', {insult:rows, comment:crows})

    })
  })

})

app.get('/thread/new', function(req,res){
  res.render('newThread.ejs')
})

app.get('/thread/post/:id', function(req,res){
  var thread_id = req.params.id
  var user = req.cookies.username
  console.log(thread_id)
  db.get('SELECT * FROM threads WHERE id=?', thread_id, function(err,rows){
    db.all('SELECT * FROM comments INNER JOIN threads ON comments.thread_id=threads.id WHERE comments.thread_id=?', thread_id, function(err,cRows){
      res.render('deetzThread.ejs',{rows:rows, comments:cRows, user:user})
    })
  })
})

app.put('/thread/post/:id', function(req,res){
  var thread_id = req.params.id
  db.run('UPDATE threads SET votes=votes+1 WHERE id=?', thread_id, function(err,rows){
    if(err){
      throw err
    }
  })
  res.redirect('/thread/post/' + thread_id)
})

app.put('/thread/post/down/:id', function(req,res){
  var thread_id = req.params.id
  db.run('UPDATE threads SET votes=votes-1 WHERE id=?', thread_id, function(err,rows){
    if(err){
      throw err
    }
  })
  res.redirect('/thread/post/' + thread_id)
})

app.get('/thread/post/:thread_id/add', function(req,res){
  var thread_id = req.params.thread_id
  db.get('SELECT * FROM threads WHERE threads.id=?', thread_id, function(err,rows){
    console.log(thread_id)
    res.render('newComment.ejs', {thread:rows})
  })
})

app.post('/thread/post/:thread_id/add', function(req,res){
  var thread_id = req.params.thread_id
  var comeback = req.body.comment
  db.run('INSERT INTO comments(comeback, user_id, thread_id) VALUES (?,?,?)',
  comeback,req.cookies.username, thread_id,
  function(err){
    if(err){
      throw err
    } else {
      res.redirect('/thread/post/' + thread_id)
    }
  })
})


app.get('/register', function(req,res){
  res.render('register.ejs')
})
//do this for inserting new registrations into db
// app.post(register, function(req,res){
//   db.run('INSERT INTO users(name,password) VALUES (?,?)')
// })

app.post('/login', function(req,res){
  var username = req.body.username
  var password = req.body.password
  db.get('SELECT * FROM users', function(err,rows){
    if(username === rows.name && password === rows.password){
      console.log("logged in!")
      username = rows.name
      res.redirect('/index')
    } else {
      console.log("please register")
      res.redirect('/register')
    }
  })
})

app.post('/thread/new', function(req,res){
  db.run('INSERT INTO threads(insult, username, votes) VALUES (?,?,?)', req.body.newThread, "blank for now",0,
  function(err){
    if(err){
      throw err
    }
  })
  res.redirect('/index')
})



app.listen(3000, function(){
  console.log("hey, i'm listening...")
})
