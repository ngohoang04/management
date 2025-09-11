import React, { useState } from "react";
import { createOutbound } from "../services/api";
import OutboundForm from "../components/OutboundForm";

export default function Outbound() {
  const [records, setRecords] = useState([]);

  const handleOutbound = async (data) => {
    const res = await createOutbound(data);
    if (res.success) setRecords([...records, res.record]);
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Outbound</h2>
      <OutboundForm onSubmit={handleOutbound} />
      <ul className="mt-4 list-disc pl-6">
        {records.map((r) => (
          <li key={r.id}>Container {r.id} sent outbound</li>
        ))}
      </ul>
    </div>
  );
}
