const express = require("express");
const router = express.Router();

const UserControllers = require("../Controllers/UsersControllers.js");
const ContainerControllers = require("../Controllers/ContainerControllers.js");
const CustomerController = require("../Controllers/CustomerController.js");
const LocationController = require("../Controllers/LocationController.js");
const MovementControllers = require("../Controllers/MovementControllers.js");
const BookingController = require("../Controllers/BookingController.js");
const { verifyToken } = require("../utils/jwt.js");

router.post("/auth/register", UserControllers.register);
router.post("/auth/login", UserControllers.login);

// User routes
router.get("/users", verifyToken, UserControllers.getUsers);
router.post("/users", UserControllers.insertUser);
router.put("/users/:id", UserControllers.updateUser);
router.delete("/users/:id", UserControllers.deleteUser);
router.get("/users/:id", UserControllers.getUserById);

// User login
router.post("/auth/login", UserControllers.login);

// User registration
router.post("/auth/register", UserControllers.register);

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

// Movement routes
router.get("/movements", MovementControllers.getMovements);
router.post("/movements", MovementControllers.createMovement);
router.get("/movements/:id", MovementControllers.getMovementById);
router.put("/movements/:id", MovementControllers.updateMovement);
router.delete("/movements/:id", MovementControllers.deleteMovement);

// Booking routes
router.get("/bookings", BookingController.getBookings);
router.post("/bookings", BookingController.createBooking);
router.get("/bookings/:id", BookingController.getBookingById);
router.put("/bookings/:id", BookingController.updateBooking);
router.delete("/bookings/:id", BookingController.deleteBooking);

module.exports = router;

