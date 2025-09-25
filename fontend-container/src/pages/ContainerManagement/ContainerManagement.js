import React, { useState } from "react";
import {
  Truck,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

export default function ContainerManagement({
  containers,
  onCreateContainer,
  onUpdateContainer,
  onDeleteContainer,
  currentUser,
  theme,
}) {
  const isDark = theme === "dark";
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingContainer, setEditingContainer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedContainer, setSelectedContainer] = useState(null);

  const canEdit =
    currentUser && (currentUser.role === "admin" || currentUser.role === "manager");

  const [formData, setFormData] = useState({
    code: "",
    type: "20ft Standard",
    status: "in_transit",
    warehouseId: "1",
    notes: "",
    location: "",
    weight: 0,
    dimensions: { length: 6, width: 2.4, height: 2.6 },
  });

  const resetForm = () => {
    setFormData({
      code: "",
      type: "20ft Standard",
      status: "in_transit",
      warehouseId: "1",
      notes: "",
      location: "",
      weight: 0,
      dimensions: { length: 6, width: 2.4, height: 2.6 },
    });
    setShowCreateForm(false);
    setEditingContainer(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingContainer) {
      onUpdateContainer(editingContainer.id, {
        ...formData,
        lastUpdatedBy: currentUser.username,
      });
    } else {
      onCreateContainer({
        ...formData,
        lastUpdatedBy: currentUser.username,
      });
    }

    resetForm();
  };

  const handleEdit = (container) => {
    if (!canEdit) return;

    setFormData({
      code: container.code,
      type: container.type,
      status: container.status,
      warehouseId: container.warehouseId,
      notes: container.notes,
      location: container.location,
      weight: container.weight,
      dimensions: container.dimensions,
    });
    setEditingContainer(container);
    setShowCreateForm(true);
  };

  const handleStatusUpdate = (containerId, newStatus) => {
    if (!canEdit) return;
    onUpdateContainer(containerId, {
      status: newStatus,
      lastUpdatedBy: currentUser.username,
    });
  };

  const filteredContainers = containers.filter((container) => {
    const matchesSearch =
      container.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      container.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      container.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || container.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusInfo = (status) => {
    const statusMap = {
      in_transit: {
        label: "Đang vận chuyển",
        icon: Truck,
        color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      },
      arrived: {
        label: "Đã cập bến",
        icon: CheckCircle,
        color: "bg-green-100 text-green-700 border-green-200",
      },
      incident: {
        label: "Gặp sự cố",
        icon: AlertTriangle,
        color: "bg-red-100 text-red-700 border-red-200",
      },
      returning: {
        label: "Đang quay lại kho",
        icon: RotateCcw,
        color: "bg-blue-100 text-blue-700 border-blue-200",
      },
    };
    return statusMap[status];
  };

  const StatusButton = ({ status, containerId }) => {
    const statusInfo = getStatusInfo(status);
    const Icon = statusInfo.icon;

    if (!canEdit) {
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusInfo.color}`}
        >
          <Icon className="h-3 w-3 mr-1" />
          {statusInfo.label}
        </span>
      );
    }

    const statusOptions = ["in_transit", "arrived", "incident", "returning"];

    return (
      <select
        value={status}
        onChange={(e) => handleStatusUpdate(containerId, e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {statusOptions.map((option) => {
          const info = getStatusInfo(option);
          return (
            <option key={option} value={option}>
              {info.label}
            </option>
          );
        })}
      </select>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Quản lý Container</h2>
      {filteredContainers.map((c) => (
        <div key={c.id} className="border p-2 mb-2 rounded">
          <div className="font-medium">{c.code}</div>
          <StatusButton status={c.status} containerId={c.id} />
          {canEdit && (
            <button
              onClick={() => handleEdit(c)}
              className="ml-2 text-blue-600"
            >
              Edit
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
