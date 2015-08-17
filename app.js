var express = require('express')
var app = express()
var ejs = require('ejs')
var bodyParser = require('body-parser')
var urlencodedBodyParser = bodyParser.urlencoded({extended:false})
var methodOverride = require('method-override')
var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('forum.db')
var cookieParser = require('cookie-parser')
var request = require('request')



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
  var user = req.cookies.username
  db.all('SELECT * FROM threads WHERE tShow=1 ORDER BY tVotes DESC', function(err,rows){
    console.log(req.cookies)

    db.all('SELECT * FROM comments WHERE cShow=1 ORDER BY cVotes DESC', function(cerr,crows){
      res.render('index.ejs', {insult:rows, comment:crows, user:user})

    })
  })

})

app.get('/thread/new', function(req,res){
  res.render('newThread.ejs')
})

app.get('/thread/post/:id', function(req,res){
  var thread_id = req.params.id
  var user = req.cookies.username
  console.log(user)
  console.log(thread_id)
  db.get('SELECT * FROM threads WHERE thread_id=?', thread_id, function(err,rows){
    db.all('SELECT * FROM comments INNER JOIN threads ON comments.thread_id=threads.thread_id WHERE comments.cShow=1 AND comments.thread_id=? ORDER BY comments.cVotes DESC', thread_id, function(err,cRows){
      console.log(cRows)
      console.log(rows)
      res.render('deetzThread.ejs',{rows:rows, comments:cRows, user:user})
    })
  })
})

app.put('/thread/post/up/:id', function(req,res){
  var thread_id = req.params.id
  db.run('UPDATE threads SET tVotes=tVotes+1 WHERE thread_id=?', thread_id, function(err,rows){
    if(err){
      throw err
    }
  })
  res.redirect('/thread/post/' + thread_id)
})

app.put('/thread/post/down/:id', function(req,res){
  var thread_id = req.params.id
  db.run('UPDATE threads SET tVotes=tVotes-1 WHERE thread_id=?', thread_id, function(err,rows){
    if(err){
      throw err
    }
  })
  res.redirect('/thread/post/' + thread_id)
})

app.put('/thread/comment/up/:tid/:cid', function(req,res){
  var comment_id = req.params.cid
  var thread_id = req.params.tid
  db.run('UPDATE comments SET cVotes=cVotes+1 WHERE comment_id=?', comment_id, function(err,rows){
    if(err){
      throw err
    }
  })
  res.redirect('/thread/post/' + thread_id)
})

app.put('/thread/comment/down/:tid/:cid', function(req,res){
  var comment_id = req.params.cid
  var thread_id = req.params.tid
  db.run('UPDATE comments SET cVotes=cVotes-1 WHERE comment_id=?', comment_id, function(err,rows){
    if(err){
      throw err
    }
  })
  res.redirect('/thread/post/' + thread_id)
})

app.put('/thread/post/:thread_id/:comment_id', function(req,res){
  var thread_id = req.params.thread_id
  var comment_id = req.params.comment_id
  db.run('UPDATE comments SET comeback=? WHERE comment_id=? AND cUsername=?', req.body.commentEdit, comment_id, req.cookies.username, function(err){
    if(err){
      throw err
    }
  })
  res.redirect('/thread/post/' + thread_id)
})

app.delete('/thread/post/:thread_id/:comment_id', function(req,res){
  var thread_id = req.params.thread_id
  var comment_id = req.params.comment_id
  db.run('UPDATE comments SET cShow=0 WHERE comment_id=? AND cUsername=?', comment_id, req.cookies.username, function(err){
    if(err){
      throw err
    }
  })
  res.redirect('/thread/post/' + thread_id)
})

app.get('/thread/post/:thread_id/add', function(req,res){
  var thread_id = req.params.thread_id
  db.get('SELECT * FROM threads WHERE threads.tShow=1 AND threads.thread_id=?', thread_id, function(err,rows){
    console.log(rows)
    res.render('newComment.ejs', {thread:rows})
  })
})

app.post('/thread/post/:thread_id/add', function(req,res){
  var thread_id = req.params.thread_id
  console.log(thread_id)
  var comeback = req.body.comment
  db.run('INSERT INTO comments(comeback, cUsername, thread_id, cShow, cVotes) VALUES (?,?,?,?,?)',
  comeback, req.cookies.username, thread_id, 1, 0,
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

app.post('/register', function(req,res){
  console.log(req.body)
  db.run('INSERT INTO users(name,password) VALUES (?,?)', req.body.username, req.body.password,
  function(err){
    if(err){
      throw err
    }
  })
  res.redirect('/register/thanks')
})

app.get('/register/thanks', function(req,res){
  res.render('thanks.ejs')
})

app.post('/login', function(req,res){
  var username = req.body.username
  var password = req.body.password
  db.get('SELECT * FROM users WHERE name=?', username, function(err,rows){
    if(rows && password === rows.password){
      console.log("logged in!")
      username = rows.name
      res.redirect('/index')
    } else {
      console.log("please register")
      res.redirect('/register')
    }
  })
})

app.get('/thread/post/:thread_id/:comment_id', function(req,res){
  var thread_id = req.params.thread_id
  var comment_id = req.params.comment_id
  db.get('SELECT * FROM comments WHERE comment_id=? AND thread_id=?', comment_id, thread_id, function(err,row){

    res.render('editDelComment.ejs', {thread_id:thread_id,comment_id:comment_id,comment:row})
  })
})

app.post('/thread/new', function(req,res){
  db.run('INSERT INTO threads(insult, tUsername, tVotes, tShow, story) VALUES (?,?,?,?,?)', req.body.insult, req.cookies.username,0,1,req.body.story,
  function(err){
    if(err){
      throw err
    }
  })
  res.redirect('/index')
})

// app.post('/thread/random', function(req,res){
//   db.all('SELECT * FROM insults', function(err,rows){
//     var rand = Math.ceil(Math.random()*rows.length)
//     db.run('INSERT INTO threads(insult, tUsername, tVotes, tShow, story) VALUES (?,?,?,?,?)', rows[rand].burn, req.cookies.username,0,1,"this was a random input",
//     function(err){
//       if(err){
//         throw err
//       }
//     })
//   })
//   res.redirect('/index')
// })
app.post('/thread/random', function(req,res){
  request("http://pleaseinsult.me/api?severity=random", function(err,ress,body){
    if(!err && ress.statusCode == 200){
      var data = JSON.parse(body)
      db.run('INSERT INTO threads(insult, tUsername, tVotes, tShow, story) VALUES (?,?,?,?,?)', data.insult, req.cookies.username,0,1,"this was a random input",
      function(err){
        if(err){
          throw err
        } else {
          res.redirect('/index')
        }
      })
    }
  })
})

app.delete('/thread/delete/:thread_id', function(req,res){
  var thread_id = req.params.thread_id
  db.run('UPDATE threads SET tShow=0 WHERE thread_id=? AND tUsername=?', thread_id, req.cookies.username, function(err){
    if(err){
      throw err
    }
  })
  res.redirect('/index')
})




app.listen(3000, function(){
  console.log("hey, i'm listening...")
})
