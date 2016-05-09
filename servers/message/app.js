require('./config/db-config');
const app = require('./config/app-config');

const Message = require('./routers/message-router');

app.use('/message', Message);

app.use(function(req, res, next) {
  res.status(404).send("<h1>Nada para ver aqui</h1>");
});