import { useState, useEffect } from "react";

export default function InventoryCount({ medicineName }) {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchCount = () => {
      const randomCount = Math.floor(Math.random() * 300);
      console.log(`Inventory for ${medicineName}: ${randomCount}`);
      setCount(randomCount);
    };

    fetchCount(); // initial fetch
    const timer = setInterval(fetchCount, 10000); // refresh every 10s
    return () => clearInterval(timer); // cleanup
  }, [medicineName]);

  return (
    <div className="p-4 bg-white rounded shadow mt-4 border border-teal-400">
      <h3 className="text-lg font-semibold text-teal-800">
        {medicineName} Inventory: {count !== null ? count : "Loading…"}
      </h3>
    </div>
  );
}
