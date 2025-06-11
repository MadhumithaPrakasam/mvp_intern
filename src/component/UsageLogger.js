import { useState, useEffect } from "react";

export default function UsageLogger() {
  const [usageList, setUsageList] = useState([]);
  const [form, setForm] = useState({
    medicine: "",
    quantity: "",
    doctor: "",
    usedFor: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsageList((prev) => [
      ...prev,
      { ...form, timestamp: new Date().toLocaleTimeString() },
    ]);
    setForm({ medicine: "", quantity: "", doctor: "", usedFor: "" });
  };

  useEffect(() => {
    console.log("Usage updated:", usageList);
  }, [usageList]);

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h3 className="mb-2 font-bold">Submit Medicine Usage</h3>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          value={form.medicine}
          onChange={(e) => setForm({ ...form, medicine: e.target.value })}
          placeholder="Medicine Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          placeholder="Quantity Used"
          required
          className="w-full p-2 border rounded"
        />
        <input
          value={form.doctor}
          onChange={(e) => setForm({ ...form, doctor: e.target.value })}
          placeholder="Doctor Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          value={form.usedFor}
          onChange={(e) => setForm({ ...form, usedFor: e.target.value })}
          placeholder="Used For (e.g., Patient ID or Ward)"
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-teal-600 text-white font-semibold rounded hover:bg-teal-700"
        >
          Log Usage
        </button>
      </form>

      {usageList.length > 0 && (
        <ul className="mt-4 space-y-1 text-sm">
          {usageList.map((u, i) => (
            <li key={i}>
              [{u.timestamp}] {u.quantity} × {u.medicine} used by Dr. {u.doctor} for {u.usedFor}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
