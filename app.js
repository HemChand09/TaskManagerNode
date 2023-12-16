const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const globalErrorHandler = require("./controllers/errorController");
const taskRouter = require('./routes/taskRoutes');
const AppError = require("./utils/appError");
const userRouter = require('./routes/userRoute');

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());

app.use('/api/tasks',taskRouter);
app.use('/api/users' , userRouter);


app.all("*", (req, res, next) => {
  next(new AppError(`Cant Find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
