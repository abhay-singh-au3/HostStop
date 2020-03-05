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
app.post("/uploadPlace", withAuth, routes.uploadPlace);
app.get("/text", withAuth, (req, res) => {
  res.sendStatus(200);
});
app.post("/uploadExp", withAuth, routes.uploadExp);
app.put("/editProfile", withAuth, routes.editProfile);
app.get("/viewHosted/place", withAuth, routes.viewHostedPlace);
app.get("/viewHosted/exp", withAuth, routes.viewHostedExp);

app.get("/searchPlaces/:searchDetail", withAuth, routes.searchPlaces);
app.get("/searchExp/:searchDetail", withAuth, routes.searchExp);
app.get("/place/:id", withAuth, routes.place)
app.get("/exp/:id", withAuth, routes.exp)
app.post("/book/places", withAuth, routes.bookPlace);
app.post("/book/exp", withAuth, routes.bookExperience);
app.listen(PORT, () => console.log("Server running at Port:", PORT));
