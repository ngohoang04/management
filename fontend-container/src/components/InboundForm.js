import React, { useState } from "react";

export default function InboundForm({ onSubmit }) {
  const [form, setForm] = useState({
    containerNo: "",
    type: "20FT",
    location: "",
    contents: "",
    weightKg: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.containerNo || !form.location) {
      alert("Container No & Location required");
      return;
    }
    onSubmit(form);
    setForm({
      containerNo: "",
      type: "20FT",
      location: "",
      contents: "",
      weightKg: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        name="containerNo"
        placeholder="Container No"
        value={form.containerNo}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option>20FT</option>
        <option>40FT</option>
      </select>
      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="contents"
        placeholder="Contents"
        value={form.contents}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="weightKg"
        type="number"
        placeholder="Weight (kg)"
        value={form.weightKg}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Inbound
      </button>
    </form>
  );
}
