const userRouter = require('./routers/user/user-router');

const app = require('./config/app-config');
require('./config/db-config');


app.use('/user',userRouter);





