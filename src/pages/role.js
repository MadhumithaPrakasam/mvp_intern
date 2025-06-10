import { useState, useEffect } from "react";
import Head from "next/head";
import InventoryCount from "../components/InventoryCount";
import UsageLogger from "../components/UsageLogger";

export default function RoleSelection() {
  const [visible, setVisible] = useState({
    adminOptions: false,
    doctorView: false,
    staffOptions: false,
    staffView: false,
    usageForm: false,
    medicineForm: false,
    equipmentForm: false,
    labourForm: false,
  });

  const showRole = (role) => {
    const all = {
      adminOptions: role === "admin",
      doctorView: role === "doctor",
      staffOptions: role === "staff",
      staffView: false,
      usageForm: false,
      medicineForm: false,
      equipmentForm: false,
      labourForm: false,
    };
    setVisible(all);
  };

  const toggleSection = (id) =>
    setVisible(prev => ({ ...prev, [id]: !prev[id] }));

  useEffect(() => {
    document.querySelectorAll("form").forEach(form => {
      form.onsubmit = (e) => {
        e.preventDefault();
        form.reset();
      };
    });
  }, []);

  return (
    <>
      <Head><title>Role Selection - MedTrack</title></Head>
      <div
        className="min-h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/roleimg.jpg')" }}
      >
        <div className="bg-teal-600 text-white text-center py-6 text-2xl font-bold">
          MedTrack Role Selection
        </div>
        <div className="flex flex-col items-center p-8 space-y-6">
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg text-center w-full max-w-xl">
            <h2 className="text-xl font-semibold mb-4">Select Your Role</h2>
            <button onClick={() => showRole("admin")} className="btn">Admin</button>
            <button onClick={() => showRole("doctor")} className="btn">Doctor</button>
            <button onClick={() => showRole("staff")} className="btn">Staff</button>
          </div>

          {visible.adminOptions && (
            <Card title="Admin Dashboard">
              <button onClick={() => toggleSection("medicineForm")}>➕ Add Medicine</button>
              <button onClick={() => toggleSection("equipmentForm")}>➕ Add Equipment</button>
              <button onClick={() => toggleSection("labourForm")}>➕ Add Labour</button>
            </Card>
          )}

          {visible.medicineForm && (
            <Card title="Add New Medicine">
              <Form fields={["Medicine Name", "Batch Number", "Date", "Quantity"]} />
            </Card>
          )}

          {visible.equipmentForm && (
            <Card title="Add Medical Equipment">
              <Form fields={["Equipment Name", "Model Number", "Date", "Quantity"]} />
            </Card>
          )}

          {visible.labourForm && (
            <Card title="Add Labour Details">
              <Form fields={["Labour Name", "Department", "Shift Time", "Contact Number"]} />
            </Card>
          )}

          {visible.doctorView && (
            <Card title="Doctor Dashboard">
              <AvailabilityLists />
            </Card>
          )}

          {visible.staffOptions && (
            <Card title="Staff Dashboard">
              <button onClick={() => toggleSection("staffView")}>👁️ View Details</button>
              <button onClick={() => toggleSection("usageForm")}>📝 Submit Medicine Usage</button>
            </Card>
          )}

          {visible.staffView && (
            <Card title="Staff View">
              <AvailabilityLists />
              <InventoryCount medicineName="Paracetamol" />
              <UsageLogger />
            </Card>
          )}

          {visible.usageForm && (
            <Card title="Submit Medicine Usage">
              <Form
                fields={[
                  "Medicine Name", "Quantity Used",
                  "Doctor Name", "Used For (e.g., patient ID or ward)"
                ]}
              />
            </Card>
          )}
        </div>
      </div>

      <style jsx>{/* same CSS as before */}</style>
    </>
  );
}

function Card({ title, children }) {
  return (
    <div className="card mb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Form({ fields }) {
  return (
    <form className="text-left">
      {fields.map((f, i) => (
        <input
          key={i}
          type={f.toLowerCase().includes("date") ? "date" : "text"}
          placeholder={f}
          required
          className="w-full p-2 mb-3 border rounded"
        />
      ))}
      <button type="submit" className="btn w-full mt-2">Submit</button>
    </form>
  );
}

function AvailabilityLists() {
  return (
    <>
      <h3 className="font-semibold">📦 Medicine Availability</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Paracetamol - 200 units</li>
        <li>Amoxicillin - 150 units</li>
        <li>Cough Syrup - 50 bottles</li>
      </ul>
      <h3 className="font-semibold">🔧 Equipment Availability</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Thermometers - 25</li>
        <li>BP Machines - 10</li>
        <li>Stethoscopes - 40</li>
      </ul>
      <h3 className="font-semibold">👷 Labour Availability</h3>
      <ul className="list-disc ml-6">
        <li>Ravi - Lab Dept, Shift: Morning</li>
        <li>Meena - Cleaning Dept, Shift: Evening</li>
        <li>Arun - Lab Dept, Shift: Night</li>
      </ul>
    </>
  );
}
