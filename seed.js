var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('forum.db')

db.run('INSERT INTO users (name,password,image) VALUES (?,?,?)', 'anthony', 'hats', 'http://vignette4.wikia.nocookie.net/zimwiki/images/e/ed/Stub_Zim.png',
function(err){
  if(err){
    throw err
  }
})

db.run('INSERT INTO threads (tUsername,insult,tVotes,tShow,story) VALUES (?,?,?,?,?)', 'anthony', 'YOUR MOM IS SO HOT FOR ME', 8, 1,'in jungle gym today, the mean kid said that mean thing to me',
function(err){
  if(err){
    throw err
  }
})

db.run('INSERT INTO comments (cUsername,thread_id,comeback, cVotes, cShow) VALUES (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?)',
  'anthony', 1, '1 iso funni', 3, 1,
  'anthony', 1, '2 iso funni', 3, 0,
  'anthony', 1, '3 iso funni', 3, 0,
  'anthony', 1, '4 iso funni', 3, 1,
  'anthony', 1, '5 iso funni', 3, 1,
function(err){
  if(err){
    throw err
  }
})

db.run('INSERT INTO subcomments (sUsername,thread_id,comment_id, subcomment, sVotes, sShow) VALUES (?,?,?,?,?,?)', 'anthony', 1, 1, 'no im not....', 3,1,
function(err){
  if(err){
    throw err
  }
})
