require('./config/db-config');
const app = require('./config/app-config');

const Router = require('./routers/advert-router');

app.use('/advert', Router);

app.use(function(req, res, next) {
  res.status(404).send("<h1>Nada para ver aqui</h1>");
});
