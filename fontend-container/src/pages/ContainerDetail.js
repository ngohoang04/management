import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchInventoryItem } from "../services/api";
import Loader from "../components/Loader";

export default function ContainerDetail() {
  const { id } = useParams();
  const [container, setContainer] = useState(null);

  useEffect(() => {
    fetchInventoryItem(id).then(setContainer);
  }, [id]);

  if (!container) return <Loader />;

  return (
    <div>
      <h2 className="text-xl font-bold">Container Detail</h2>
      <p>
        <b>ID:</b> {container.id}
      </p>
      <p>
        <b>Number:</b> {container.containerNo}
      </p>
      <p>
        <b>Type:</b> {container.type}
      </p>
      <p>
        <b>Status:</b> {container.status}
      </p>
      <p>
        <b>Location:</b> {container.location}
      </p>
      <p>
        <b>Contents:</b> {container.contents}
      </p>
      <p>
        <b>Weight:</b> {container.weightKg} kg
      </p>
    </div>
  );
}
