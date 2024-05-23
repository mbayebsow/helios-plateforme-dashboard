const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const jwtCheck = require("./middleware/verifyAuth");
const credentials = require("./middleware/credentials");
const PORT = process.env.PORT || 3500;

// Connextion a la base de donnee
const db = require("./config/db");

// Importation des routes
const employeeRoutes = require("./routes/employee.route");
const catalogueRoutes = require("./routes/catalogue.route");
const contractRoutes = require("./routes/contract.route");
const estimateRoutes = require("./routes/estimate.route");
const invoiceRoutes = require("./routes/invoice.route");
const transactionRoutes = require("./routes/transaction.route");
const projectRoutes = require("./routes/project.route");
const taskRoutes = require("./routes/task.route");
const teamRoutes = require("./routes/team.route");
const userDetailsRoutes = require("./routes/userDetails.route");

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//TokenCheck
app.use(jwtCheck);

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// Utilisation des routes pour les ressources
app.use("/", require("./routes/root"));
app.use("/employees", employeeRoutes);
app.use("/catalogues", catalogueRoutes);
app.use("/contracts", contractRoutes);
app.use("/estimates", estimateRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/transactions", transactionRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/teams", teamRoutes);
app.use("/user-details", userDetailsRoutes);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
