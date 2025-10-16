// controllers/ReportController.js
import db from "../models/index.js";
import ExcelJS from "exceljs";

// Lấy danh sách báo cáo
export async function getReports(req, res) {
    try {
        const reports = await db.Report.findAll({
            include: [
                { model: db.User, as: "author", attributes: ["id", "username", "email"] }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.status(200).json({ success: true, message: "List of reports", data: reports });
    } catch (error) {
        console.error("Error fetching reports:", error.message);
        res.status(500).json({ success: false, message: "Error fetching reports" });
    }
}

// Lấy chi tiết 1 báo cáo theo ID
export async function getReportById(req, res) {
    try {
        const { id } = req.params;
        const report = await db.Report.findByPk(id, {
            include: [
                { model: db.User, as: "author", attributes: ["id", "username", "email"] }
            ]
        });

        if (!report) {
            return res.status(404).json({ success: false, message: "Report not found" });
        }

        res.status(200).json({ success: true, message: "Report details", data: report });
    } catch (error) {
        console.error("Error fetching report:", error.message);
        res.status(500).json({ success: false, message: "Error fetching report" });
    }
}

// Tạo báo cáo mới
export async function createReport(req, res) {
    try {
        const { report_type, content, created_by } = req.body;

        if (!report_type || !content || !created_by) {
            return res.status(400).json({ success: false, message: "report_type, content, and created_by are required" });
        }

        const report = await db.Report.create({ report_type, content, created_by });

        res.status(201).json({ success: true, message: "Report created", data: report });
    } catch (error) {
        console.error("Error creating report:", error.message);
        res.status(500).json({ success: false, message: "Error creating report" });
    }
}

// Cập nhật báo cáo
export async function updateReport(req, res) {
    try {
        const { id } = req.params;
        const report = await db.Report.findByPk(id);

        if (!report) {
            return res.status(404).json({ success: false, message: "Report not found" });
        }

        const updates = {};
        ["report_type", "content", "created_by"].forEach(field => {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        });

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ success: false, message: "No fields to update" });
        }

        await report.update(updates);
        res.status(200).json({ success: true, message: "Report updated", data: report });
    } catch (error) {
        console.error("Error updating report:", error.message);
        res.status(500).json({ success: false, message: "Error updating report" });
    }
}

// Xóa báo cáo
export async function deleteReport(req, res) {
    try {
        const { id } = req.params;
        const deleted = await db.Report.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Report not found" });
        }

        res.status(200).json({ success: true, message: "Report deleted" });
    } catch (error) {
        console.error("Error deleting report:", error.message);
        res.status(500).json({ success: false, message: "Error deleting report" });
    }
}

export async function exportReportsToExcel(req, res) {
    try {
        const reports = await db.Report.findAll({
            include: [
                { model: db.User, as: "author", attributes: ["username", "email"] }
            ],
            order: [["createdAt", "DESC"]]
        });

        // Tạo workbook và worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Reports");

        // Tạo tiêu đề cột
        worksheet.columns = [
            { header: "ID", key: "id", width: 10 },
            { header: "Loại báo cáo", key: "report_type", width: 20 },
            { header: "Nội dung", key: "content", width: 50 },
            { header: "Tác giả", key: "author", width: 20 },
            { header: "Email", key: "email", width: 25 },
            { header: "Ngày tạo", key: "createdAt", width: 20 },
        ];

        // Ghi dữ liệu vào bảng
        reports.forEach((report) => {
            worksheet.addRow({
                id: report.id,
                report_type: report.report_type,
                content: report.content,
                author: report.author?.username || "N/A",
                email: report.author?.email || "N/A",
                createdAt: new Date(report.createdAt).toLocaleString("vi-VN"),
            });
        });

        // Thiết lập kiểu in đậm cho header
        worksheet.getRow(1).font = { bold: true };

        // Tạo buffer Excel
        const buffer = await workbook.xlsx.writeBuffer();

        // Gửi file về client
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=reports.xlsx"
        );
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.send(buffer);
    } catch (error) {
        console.error("Error exporting reports to Excel:", error.message);
        res.status(500).json({ success: false, message: "Error exporting reports to Excel" });
    }
}
