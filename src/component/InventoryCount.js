import { useState, useEffect } from "react";

export default function InventoryCount({ medicineName }) {
  const [count, setCount] = useState(null);

  useEffect(() => {
    // Simulate inventory API fetch
    const fetchCount = () => setCount(Math.floor(Math.random() * 300));
    fetchCount();
    const timer = setInterval(fetchCount, 10000);
    return () => clearInterval(timer);
  }, [medicineName]);

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h3>
        {medicineName} Inventory: {count !== null ? count : "Loading…"}
      </h3>
    </div>
  );
}
