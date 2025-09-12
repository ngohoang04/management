export function mockInventory() {
  return [
    {
      id: "C001",
      containerNo: "CNUU1234567",
      type: "20FT",
      status: "AVAILABLE",
      location: "Yard A",
      contents: "Electronics",
      weightKg: 12000,
    },
    {
      id: "C002",
      containerNo: "MSKU7654321",
      type: "40FT",
      status: "IN-USE",
      location: "On Truck",
      contents: "Furniture",
      weightKg: 22000,
    },
    {
      id: "C003",
      containerNo: "OOLU5550001",
      type: "20FT",
      status: "AVAILABLE",
      location: "Yard B",
      contents: "Clothing",
      weightKg: 8000,
    },
  ];
}