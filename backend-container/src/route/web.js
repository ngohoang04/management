const express = require("express");
const router = express.Router();

const UserControllers = require("../Controllers/UsersControllers.js");
const ContainerControllers = require("../Controllers/ContainerControllers.js");
const CustomerController = require("../Controllers/CustomerController.js");
const { verifyToken } = require("../utils/jwt.js");
const LocationController = require("../Controllers/LocationController.js");

router.post("/auth/register", UserControllers.register);
router.post("/auth/login", UserControllers.login);

// User routes
router.get("/users", verifyToken, UserControllers.getUsers);
router.post("/users", UserControllers.insertUser);
router.put("/users/:id", UserControllers.updateUser);
router.delete("/users/:id", UserControllers.deleteUser);
router.get("/users/:id", UserControllers.getUserById);

// Container routes
router.get("/containers", verifyToken, ContainerControllers.getContainers);
router.post("/containers", verifyToken, ContainerControllers.insertContainer);
router.put("/containers/:id", verifyToken, ContainerControllers.updateContainer);
router.delete("/containers/:id", verifyToken, ContainerControllers.deleteContainer);
router.get("/containers/:id", verifyToken, ContainerControllers.getContainerById);

// Customer routes
router.get("/customers", CustomerController.getCustomers);
router.get("/customers/:id", CustomerController.getCustomerById);
router.post("/customers", CustomerController.createCustomer);
router.put("/customers/:id", CustomerController.updateCustomer);
router.delete("/customers/:id", CustomerController.deleteCustomer);

// Location routes

router.get("/locations", LocationController.getLocations);
router.get("/locations/:id", LocationController.getLocationById);
router.post("/locations", LocationController.createLocation);
router.put("/locations/:id", LocationController.updateLocation);
router.delete("/locations/:id", LocationController.deleteLocation);

module.exports = router;

