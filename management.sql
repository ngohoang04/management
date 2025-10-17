-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 17, 2025 lúc 03:20 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `management`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cargos`
--

CREATE TABLE `cargos` (
  `id` int(11) NOT NULL,
  `container_id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `weight` decimal(10,0) DEFAULT NULL,
  `volume` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `cargos`
--

INSERT INTO `cargos` (`id`, `container_id`, `description`, `weight`, `volume`, `createdAt`, `updatedAt`) VALUES
(1, 5, '12312', 12, 33, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `containerhistories`
--

CREATE TABLE `containerhistories` (
  `id` int(11) NOT NULL,
  `container_id` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `containers`
--

CREATE TABLE `containers` (
  `id` int(11) NOT NULL,
  `container_code` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `warehouse_id` int(11) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `containers`
--

INSERT INTO `containers` (`id`, `container_code`, `type`, `size`, `status`, `warehouse_id`, `supplier_id`, `customer_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Container04', '11', '13', 'exported', 3, 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Container03', '23', '21', 'exported', 4, 1, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'Container02', '12', '15', 'exported', 3, 1, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'Container01', '45', '56', 'exported', 6, 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `customers`
--

INSERT INTO `customers` (`id`, `name`, `contact_person`, `phone`, `email`, `address`, `user_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Jonh', '323', '0328623316', 'hoangtulanglun2004@gmail.com', 'nghệ an', NULL, '2025-10-17 02:12:38', '2025-10-17 09:47:52'),
(2, 'Hung', 'Hung', '0123456789', 'dzdz@mail.com', '123 van quan ha dong', NULL, '2025-10-17 02:16:18', '2025-10-17 09:47:05'),
(3, 'hoang', 'hoang23', '0123456798', 'hoang@mail.com', 'quoc oai', NULL, '2025-10-17 02:28:34', '2025-10-17 02:28:34'),
(4, 'binit', 'binit', '0131341413', 'hoangv@mail.com', '123 thai binh', NULL, '2025-10-17 02:29:07', '2025-10-17 09:47:22');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `report_type` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `reports`
--

INSERT INTO `reports` (`id`, `report_type`, `content`, `created_by`, `createdAt`, `updatedAt`) VALUES
(1, 'Báo cáo ngày 14/10/2025', 'báo cáo về quản lý container ', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Báo cáo ngày 15/10/2025', 'báo cáo ', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Báo cáo ngày 17/10/2025', 'Tạm ổn', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('2025093001-create-user.js'),
('2025093002-create-warehouse.js'),
('2025093003-create-supplier.js'),
('2025093004-create-customer.js'),
('2025093005-create-container.js'),
('20250930051create-cargo.js'),
('20250930061-create-report.js'),
('20250930071-create-container-history.js');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `contact_person`, `phone`, `email`, `address`, `user_id`, `createdAt`, `updatedAt`) VALUES
(1, 'bánh kẹo', 'Hoang', '0328623316', 'hoangtulanglun2004@gmail.com', 'Hồ Chí Minh', 1, '2025-10-17 02:12:46', '2025-10-17 09:46:26');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `password_hash`, `full_name`, `email`, `phone`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '$2b$10$ubZQoRRWFvROac9LTadUAOEVboMhlkOcMphzDjq9jxEOA8IlUhKJG', 'hoang', 'hoang@gmail.com', '0328623316', 'admin', '2025-10-17 02:07:14', '2025-10-17 02:11:25'),
(2, 'asdasd', '$2b$10$7p9KwwnjcFD5NXNVVFIf2O57DTtHen7KHyzm0.1ILLZx2FM2mbLKq', 'adsd', 'hoangtulanglun2004@gmail.com', '0328623316', 'Customer', '2025-10-17 02:08:27', '2025-10-17 02:11:16'),
(3, 'sdfsf', '$2b$10$.7yacXMGq/Z2AyIGWBcn1O3Z6xpUH08HI6W/DwjxpWUQd6xUsvrGC', 'Hoang Nguyen', 'helo@gmail.com', '0328623316', 'Supplier', '2025-10-17 02:09:43', '2025-10-17 02:11:19'),
(4, 'Hoàng', '$2b$10$hfEAycADL0aNqZbrTK80B.C63DTEqx9b1DVaxcZoftrGKmrZFEsYS', 'Nguyễn Vũ', 'hoangtulanglung2004@gmail.com', '0328623316', 'customer', '2025-10-17 03:40:50', '2025-10-17 03:42:50'),
(5, 'hoang1@gmail.com', '$2b$10$i3UqrE0q6wT2OHG58QKWRuGl.49H0kioKmDQ9YLCRZCg8Zt6h7VqS', 'haoa', 'admin1@gmail.com', '010-110-', 'customer', '2025-10-17 09:08:08', '2025-10-17 09:08:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `warehouses`
--

CREATE TABLE `warehouses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `current_occupancy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `warehouses`
--

INSERT INTO `warehouses` (`id`, `name`, `location`, `capacity`, `current_occupancy`, `createdAt`, `updatedAt`) VALUES
(1, 'kho 4', 'kim giang', 2, 3, '2025-10-17 02:12:27', '2025-10-17 09:45:02'),
(3, 'Kho 1', '123 dong ngac', 40, 31, '2025-10-17 02:36:28', '2025-10-17 09:43:39'),
(4, 'kho 2', '123 dong ngac', 40, 31, '2025-10-17 03:42:12', '2025-10-17 09:43:51'),
(6, 'kho 3', 'kim giang', 34, 33, '2025-10-17 09:12:34', '2025-10-17 09:44:51');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `container_id` (`container_id`);

--
-- Chỉ mục cho bảng `containerhistories`
--
ALTER TABLE `containerhistories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `container_id` (`container_id`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Chỉ mục cho bảng `containers`
--
ALTER TABLE `containers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `warehouse_id` (`warehouse_id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Chỉ mục cho bảng `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Chỉ mục cho bảng `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `warehouses`
--
ALTER TABLE `warehouses`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `cargos`
--
ALTER TABLE `cargos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `containerhistories`
--
ALTER TABLE `containerhistories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `containers`
--
ALTER TABLE `containers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `warehouses`
--
ALTER TABLE `warehouses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cargos`
--
ALTER TABLE `cargos`
  ADD CONSTRAINT `cargos_ibfk_1` FOREIGN KEY (`container_id`) REFERENCES `containers` (`id`);

--
-- Các ràng buộc cho bảng `containerhistories`
--
ALTER TABLE `containerhistories`
  ADD CONSTRAINT `containerhistories_ibfk_1` FOREIGN KEY (`container_id`) REFERENCES `containers` (`id`),
  ADD CONSTRAINT `containerhistories_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `containers`
--
ALTER TABLE `containers`
  ADD CONSTRAINT `containers_ibfk_1` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `containers_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `containers_ibfk_3` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `suppliers`
--
ALTER TABLE `suppliers`
  ADD CONSTRAINT `suppliers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
