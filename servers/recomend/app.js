const app = require('./config/app-config');


function callback(res,data){
  res.json(data);
}

app.use('/',require('./routers/recomend-router'));


app.use(function(req, res, next) {
  res.status(404).send("<h1>Nada para ver aqui</h1>");
});
