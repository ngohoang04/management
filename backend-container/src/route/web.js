const express = require("express");
const router = express.Router();

const UserControllers = require("../Controllers/UsersControllers.js");
const ContainerControllers = require("../Controllers/ContainerControllers.js");
const CustomerController = require("../Controllers/CustomerController.js");
const LocationController = require("../Controllers/LocationController.js");
const MovementControllers = require("../Controllers/MovementControllers.js");
const BookingController = require("../Controllers/BookingControllers.js");
const { verifyToken } = require("../utils/jwt.js");

// Auth routes
router.post("/auth/register", UserControllers.register);
router.post("/auth/login", UserControllers.login);

// User routes
router.get("/users", verifyToken, UserControllers.getUsers);
router.get("/users/:id", verifyToken, UserControllers.getUserById);
router.put("/users/:id", verifyToken, UserControllers.updateUser);
router.delete("/users/:id", verifyToken, UserControllers.deleteUser);

// Container routes
router.get("/containers", verifyToken, ContainerControllers.getContainers);
router.post("/containers", verifyToken, ContainerControllers.insertContainer);
router.put("/containers/:id", verifyToken, ContainerControllers.updateContainer);
router.delete("/containers/:id", verifyToken, ContainerControllers.deleteContainer);
router.get("/containers/:id", verifyToken, ContainerControllers.getContainerById);

// Customer routes
router.get("/customers", verifyToken, CustomerController.getCustomers);
router.get("/customers/:id", verifyToken, CustomerController.getCustomerById);
router.post("/customers", verifyToken, CustomerController.createCustomer);
router.put("/customers/:id", verifyToken, CustomerController.updateCustomer);
router.delete("/customers/:id", verifyToken, CustomerController.deleteCustomer);

// Location routes
router.get("/locations", verifyToken, LocationController.getLocations);
router.get("/locations/:id", verifyToken, LocationController.getLocationById);
router.post("/locations", verifyToken, LocationController.createLocation);
router.put("/locations/:id", verifyToken, LocationController.updateLocation);
router.delete("/locations/:id", verifyToken, LocationController.deleteLocation);

// Movement routes
router.get("/movements", verifyToken, MovementControllers.getMovements);
router.post("/movements", verifyToken, MovementControllers.createMovement);
router.get("/movements/:id", verifyToken, MovementControllers.getMovementById);
router.put("/movements/:id", verifyToken, MovementControllers.updateMovement);
router.delete("/movements/:id", verifyToken, MovementControllers.deleteMovement);

// Booking routes
router.get("/bookings", verifyToken, BookingController.getBookings);
router.post("/bookings", verifyToken, BookingController.createBooking);
router.get("/bookings/:id", verifyToken, BookingController.getBookingById);
router.put("/bookings/:id", verifyToken, BookingController.updateBooking);
router.delete("/bookings/:id", verifyToken, BookingController.deleteBooking);

module.exports = router;
