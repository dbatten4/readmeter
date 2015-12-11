module.exports = function(app) {

  app.get('/', function(request, response) {
    response.render('public/index.html');
  });

  app.get('/token.js', function(request, response) {
    response.send("var gitAccessToken='"+process.env.GIT_ACCESS_TOKEN+"'");
  });

};
