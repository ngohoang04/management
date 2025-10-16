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
router.get("/users", UserControllers.getAllUsers);        // Lấy danh sách user
router.get("/users/:id", UserControllers.getUserById);     // Lấy 1 user theo id
router.put("/users/:id", UserControllers.updateUser);      // Cập nhật user
router.delete("/users/:id", UserControllers.deleteUser);   // Xóa user
router.put("/users/:id/change-password", UserControllers.changePassword); // Đổi mật khẩu user

// Container routes
router.get("/containers", ContainerControllers.getContainers);
router.post("/containers", ContainerControllers.insertContainer);
router.put("/containers/:id", ContainerControllers.updateContainer);
router.delete("/containers/:id", ContainerControllers.deleteContainer);
router.get("/containers/:id", ContainerControllers.getContainerById);
router.get("/containers/count", ContainerControllers.countByWarehouse);
router.get("/containers/count-by-type", ContainerControllers.countByType);
router.get("/containers/count-by-status", ContainerControllers.countByStatus);
router.get("/containers/count-by-warehouse", ContainerControllers.countByWarehouse);
router.get("/containers/count-by-supplier", ContainerControllers.countBySupplier);
router.get("/containers/count-by-customer", ContainerControllers.countByCustomer);

// Customer routes
router.get("/customers", CustomerController.getCustomers);
router.get("/customers/:id", CustomerController.getCustomerById);
router.post("/customers", CustomerController.createCustomer);
router.put("/customers/:id", CustomerController.updateCustomer);
router.delete("/customers/:id", CustomerController.deleteCustomer);

// Cargo routes
router.get("/cargoes", CargoControllers.getCargos);
router.get("/cargoes/:id", CargoControllers.getCargoById);
router.post("/cargoes", CargoControllers.createCargo);
router.put("/cargoes/:id", CargoControllers.updateCargo);
router.delete("/cargoes/:id", CargoControllers.deleteCargo);

// Report routes
router.get("/reports", ReportControllers.getReports);
router.get("/reports/:id", ReportControllers.getReportById);
router.post("/reports", ReportControllers.createReport);
router.put("/reports/:id", ReportControllers.updateReport);
router.get("/reports/export", ReportControllers.exportReportsToExcel);
router.delete("/reports/:id", ReportControllers.deleteReport);

// Container History routes
router.get("/container-histories", ContainerHistoryControllers.getContainerHistories);
router.get("/container-histories/:id", ContainerHistoryControllers.getContainerHistoryById);
router.post("/container-histories", ContainerHistoryControllers.createContainerHistory);
router.put("/container-histories/:id", ContainerHistoryControllers.updateContainerHistory);
router.delete("/container-histories/:id", ContainerHistoryControllers.deleteContainerHistory);

// Warehouse routes
router.get("/warehouses", WarehouseControllers.getWarehouses);
router.get("/warehouses/:id", WarehouseControllers.getWarehouseById);
router.post("/warehouses", WarehouseControllers.createWarehouse);
router.put("/warehouses/:id", WarehouseControllers.updateWarehouse);
router.delete("/warehouses/:id", WarehouseControllers.deleteWarehouse);

// Supplier routes
router.get("/suppliers", SupplierControllers.getSuppliers);
router.get("/suppliers/:id", SupplierControllers.getSupplierById);
router.post("/suppliers", SupplierControllers.createSupplier);
router.put("/suppliers/:id", SupplierControllers.updateSupplier);
router.delete("/suppliers/:id", SupplierControllers.deleteSupplier);



module.exports = router;
