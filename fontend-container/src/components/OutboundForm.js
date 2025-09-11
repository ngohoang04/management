import React, { useState } from "react";

export default function OutboundForm({ onSubmit }) {
  const [containerId, setContainerId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!containerId) {
      alert("Container ID required");
      return;
    }
    onSubmit({ id: containerId });
    setContainerId("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        placeholder="Container ID"
        value={containerId}
        onChange={(e) => setContainerId(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
        Send Outbound
      </button>
    </form>
  );
}
