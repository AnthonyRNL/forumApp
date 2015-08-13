var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('forum.db')

db.run('INSERT INTO users (name,password,image) VALUES (?,?,?)', 'anthony', 'hats', 'http://vignette4.wikia.nocookie.net/zimwiki/images/e/ed/Stub_Zim.png',
function(err){
  if(err){
    throw err
  }
})

db.run('INSERT INTO threads (user_id,insult,votes) VALUES (?,?,?)', 1, 'YOUR MOM IS SO HOT FOR ME', 8,
function(err){
  if(err){
    throw err
  }
})

db.run('INSERT INTO comments (user_id,thread_id,comeback, votes) VALUES (?,?,?,?), (?,?,?,?), (?,?,?,?), (?,?,?,?), (?,?,?,?)',
  1, 1, '1 iso funni', 3,
  1, 1, '2 iso funni', 3,
  1, 1, '3 iso funni', 3,
  1, 1, '4 iso funni', 3,
  1, 1, '5 iso funni', 3,
function(err){
  if(err){
    throw err
  }
})

db.run('INSERT INTO subcomments (user_id,thread_id,comment_id, subcomment, votes) VALUES (?,?,?,?,?)', 1, 1, 1, 'no im not....', 3,
function(err){
  if(err){
    throw err
  }
})
