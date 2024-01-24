const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./controllers/UserRoutes");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3000;

app.get("/healthcheck", (req, res) => {
    res.status(200).json({ msg: "Success" });
})
app.use("/user", userRoutes);

app.listen(PORT, () => {
    console.log("Express started on port: ", PORT);
});
