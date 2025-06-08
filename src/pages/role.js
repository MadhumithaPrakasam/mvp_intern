import { useState, useEffect } from "react";
import Head from "next/head";

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
    const allHidden = {
      adminOptions: false,
      doctorView: false,
      staffOptions: false,
      staffView: false,
      usageForm: false,
      medicineForm: false,
      equipmentForm: false,
      labourForm: false,
    };

    if (role === "admin") allHidden.adminOptions = true;
    if (role === "doctor") allHidden.doctorView = true;
    if (role === "staff") allHidden.staffOptions = true;

    setVisible(allHidden);
  };

  const toggleSection = (id) => {
    setVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
      form.onsubmit = (e) => {
        e.preventDefault();
        form.reset();
      };
    });
  }, []);

  return (
    <>
      <Head>
        <title>Role Selection - MedTrack</title>
      </Head>

      <div
        className="min-h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/roleimg.jpg')" }}
      >
        <div className="bg-teal-600 text-white text-center py-6 text-2xl font-bold">
          MedTrack Role Selection
        </div>

        <div className="flex flex-col items-center p-8 space-y-6">
          {/* Role Buttons */}
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg text-center w-full max-w-xl">
            <h2 className="text-xl font-semibold mb-4">Select Your Role</h2>
            <button onClick={() => showRole("admin")} className="btn">
              Admin
            </button>
            <button onClick={() => showRole("doctor")} className="btn">
              Doctor
            </button>
            <button onClick={() => showRole("staff")} className="btn">
              Staff
            </button>
          </div>

          {/* Admin Options */}
          {visible.adminOptions && (
            <div className="card">
              <h2>Admin Dashboard</h2>
              <button onClick={() => toggleSection("medicineForm")}>
                ➕ Add Medicine
              </button>
              <button onClick={() => toggleSection("equipmentForm")}>
                ➕ Add Equipment
              </button>
              <button onClick={() => toggleSection("labourForm")}>
                ➕ Add Labour
              </button>
            </div>
          )}

          {/* Admin Forms */}
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

          {/* Doctor View */}
          {visible.doctorView && (
            <Card title="Doctor Dashboard">
              <h3 className="font-semibold">📦 Medicine Availability</h3>
              <ul className="list-disc ml-6 mb-2">
                <li>Paracetamol - 200 units</li>
                <li>Amoxicillin - 150 units</li>
                <li>Cough Syrup - 50 bottles</li>
              </ul>
              <h3 className="font-semibold">🔧 Equipment Availability</h3>
              <ul className="list-disc ml-6">
                <li>Thermometers - 25</li>
                <li>BP Machines - 10</li>
                <li>Stethoscopes - 40</li>
              </ul>
            </Card>
          )}

          {/* Staff Options */}
          {visible.staffOptions && (
            <div className="card">
              <h2>Staff Dashboard</h2>
              <button onClick={() => toggleSection("staffView")}>
                👁️ View Details
              </button>
              <button onClick={() => toggleSection("usageForm")}>
                📝 Submit Medicine Usage
              </button>
            </div>
          )}

          {/* Staff View */}
          {visible.staffView && (
            <Card title="Staff View">
              <h3>📦 Medicine Availability</h3>
              <ul className="list-disc ml-6 mb-2">
                <li>Paracetamol - 200 units</li>
                <li>Amoxicillin - 150 units</li>
                <li>Cough Syrup - 50 bottles</li>
              </ul>
              <h3>🔧 Equipment Availability</h3>
              <ul className="list-disc ml-6 mb-2">
                <li>Thermometers - 25</li>
                <li>BP Machines - 10</li>
                <li>Stethoscopes - 40</li>
              </ul>
              <h3>👷 Labour Availability</h3>
              <ul className="list-disc ml-6">
                <li>Ravi - Lab Dept, Shift: Morning</li>
                <li>Meena - Cleaning Dept, Shift: Evening</li>
                <li>Arun - Lab Dept, Shift: Night</li>
              </ul>
            </Card>
          )}

          {/* Usage Form */}
          {visible.usageForm && (
            <Card title="Submit Medicine Usage">
              <Form
                fields={[
                  "Medicine Name",
                  "Quantity Used",
                  "Doctor Name",
                  "Used For (e.g., patient ID or ward)",
                ]}
              />
            </Card>
          )}
        </div>
      </div>

      {/* Tailwind button & card style */}
      <style jsx>{`
        .btn {
          padding: 10px 20px;
          margin: 10px;
          font-size: 16px;
          border: none;
          border-radius: 5px;
          background-color: teal;
          color: white;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }
        .btn:hover {
          background-color: #006d6d;
        }
        .card {
          background: white;
          padding: 20px 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          width: 100%;
          text-align: center;
        }
      `}</style>
    </>
  );
}

// Reusable Card component
function Card({ title, children }) {
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

// Reusable Form component
function Form({ fields }) {
  return (
    <form className="text-left">
      {fields.map((field, i) => (
        <input
          key={i}
          type={field.toLowerCase().includes("date") ? "date" : "text"}
          placeholder={field}
          required
          className="w-full p-2 mb-3 border rounded"
        />
      ))}
      <button type="submit" className="btn w-full mt-2">
        Submit
      </button>
    </form>
  );
}
