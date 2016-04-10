const userRouter = require('./routers/user/user-router');

const app = require('./config/app-config');
require('./config/db-config');


app.use('/user',userRouter);

app.use(function(req, res, next) {
  res.status(404).send("<h1>Nada para ver aqui</h1>");
});






