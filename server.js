const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const routes = require("./controller/routes");
const cookieParser = require("cookie-parser");
const withAuth = require("./middleware");
const fileupload = require("express-fileupload");

app.use(fileupload({ useTempFiles: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/hostSignup", routes.hostSignup);
app.post("/userSignup", routes.userSignup);
app.post("/hostLogin", routes.hostLogin);
app.post("/userLogin", routes.userLogin);
app.get("/logout", routes.logout);
app.post("/uploadPlace", routes.uploadPlace);
app.get("/text", withAuth, (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => console.log("Server running at Port:", PORT));
