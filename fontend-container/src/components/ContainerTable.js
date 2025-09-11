import React from "react";
import { Link } from "react-router-dom";

export default function ContainerTable({ containers }) {
  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th>ID</th>
          <th>Container No</th>
          <th>Type</th>
          <th>Status</th>
          <th>Location</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {containers.map((c) => (
          <tr key={c.id} className="text-center border-b">
            <td>{c.id}</td>
            <td>{c.containerNo}</td>
            <td>{c.type}</td>
            <td>{c.status}</td>
            <td>{c.location}</td>
            <td>
              <Link to={`/inventory/${c.id}`} className="text-blue-600">
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
