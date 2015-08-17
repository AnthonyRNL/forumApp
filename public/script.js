$(document).ready(function(){
  console.log("your doc is ready")
})

function log(){
  var username = $('input')[0].value
  var password = $('input')[1].value
  Cookies.set('username',username)

}
$(document).foundation({
    accordion: {
      callback : function (accordion) {
        console.log(accordion);
      }
    }
  });
