const express = require("express");
const router = express.Router();

const UserControllers = require("../Controllers/UsersControllers.js");
const ContainerControllers = require("../Controllers/ContainerControllers.js");
const AuthControllers = require("../Controllers/AuthControllers.js");
const CargoControllers = require("../Controllers/CargoControllets.js");
const ReportControllers = require("../Controllers/ReportControllers.js");
const ContainerHistoryControllers = require("../Controllers/ContainerHistoryController.js");
const WarehouseControllers = require("../Controllers/WarehouseController.js");
const SupplierControllers = require("../Controllers/SupplierController.js");
const CustomerController = require("../Controllers/CustomerController.js")
const { verifyToken } = require("../utils/jwt.js");

// Auth routes
router.post("/auth/register", AuthControllers.register);
router.post("/auth/login", AuthControllers.login);

// User routes
router.get("/users", verifyToken, UserControllers.getAllUsers);        // Lấy danh sách user
router.get("/users/:id", verifyToken, UserControllers.getUserById);     // Lấy 1 user theo id
router.post("/users", verifyToken, UserControllers.createUser);        // Tạo user mới
router.put("/users/:id", verifyToken, UserControllers.updateUser);      // Cập nhật user
router.delete("/users/:id", verifyToken, UserControllers.deleteUser);   // Xóa user

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

// Cargo routes
router.get("/cargoes", verifyToken, CargoControllers.getCargos);
router.get("/cargoes/:id", verifyToken, CargoControllers.getCargoById);
router.post("/cargoes", verifyToken, CargoControllers.createCargo);
router.put("/cargoes/:id", verifyToken, CargoControllers.updateCargo);
router.delete("/cargoes/:id", verifyToken, CargoControllers.deleteCargo);

// Report routes


// Container History routes
router.get("/container-histories", verifyToken, ContainerHistoryControllers.getContainerHistories);
router.get("/container-histories/:id", verifyToken, ContainerHistoryControllers.getContainerHistoryById);
router.post("/container-histories", verifyToken, ContainerHistoryControllers.createContainerHistory);
router.put("/container-histories/:id", verifyToken, ContainerHistoryControllers.updateContainerHistory);
router.delete("/container-histories/:id", verifyToken, ContainerHistoryControllers.deleteContainerHistory);

// Warehouse routes
router.get("/warehouses", verifyToken, WarehouseControllers.getWarehouses);
router.get("/warehouses/:id", verifyToken, WarehouseControllers.getWarehouseById);
router.post("/warehouses", verifyToken, WarehouseControllers.createWarehouse);
router.put("/warehouses/:id", verifyToken, WarehouseControllers.updateWarehouse);
router.delete("/warehouses/:id", verifyToken, WarehouseControllers.deleteWarehouse);

// Supplier routes
router.get("/suppliers", verifyToken, SupplierControllers.getSuppliers);
router.get("/suppliers/:id", verifyToken, SupplierControllers.getSupplierById);
router.post("/suppliers", verifyToken, SupplierControllers.createSupplier);
router.put("/suppliers/:id", verifyToken, SupplierControllers.updateSupplier);
router.delete("/suppliers/:id", verifyToken, SupplierControllers.deleteSupplier);



module.exports = router;
