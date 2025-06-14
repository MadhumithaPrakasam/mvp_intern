import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import InventoryCount from "@/component/InventoryCount";
import UsageLogger from "@/component/UsageLogger";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

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
    feedbackForm: false,
  });

  const router = useRouter();

  const showRole = (role) => {
    setVisible({
      adminOptions: role === "admin",
      doctorView: role === "doctor",
      staffOptions: role === "staff",
      staffView: false,
      usageForm: false,
      medicineForm: false,
      equipmentForm: false,
      labourForm: false,
      feedbackForm: false,
    });
  };

  const toggleSection = (key) => {
    setVisible((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    document.querySelectorAll("form").forEach((form) => {
      form.onsubmit = (e) => {
        e.preventDefault();
        alert("Form submitted!");
        form.reset();
      };
    });
  }, []);

  return (
    <>
      <Head>
        <title>Role Selection - MedTrack</title>
      </Head>
      <div className="min-h-screen bg-[url('/roleimg.jpg')] bg-cover bg-fixed">
        {/* Navbar */}
        <div className="bg-teal-600 text-white p-5 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/medtrack.jpg" alt="MedTrack Logo" className="h-10" />
            <span className="text-xl font-bold">MedTrack Role Selection</span>
          </div>
          <div className="space-x-3">
            <button
              className="bg-cyan-700 hover:bg-cyan-900 px-4 py-2 rounded"
              onClick={() => router.push("/")}
            >
              🏠 Home
            </button>
            <button
              className="bg-cyan-700 hover:bg-cyan-900 px-4 py-2 rounded"
              onClick={() => toggleSection("feedbackForm")}
            >
              ✉️ Feedback
            </button>
          </div>
        </div>

        {/* Container */}
        <div className="p-8 flex flex-col items-center space-y-6">
          {/* Role Selection */}
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-xl text-center">
            <h2 className="text-xl font-semibold mb-4">Select Your Role</h2>
            <div className="space-x-4">
              <button className="btn" onClick={() => showRole("admin")}>Admin</button>
              <button className="btn" onClick={() => showRole("doctor")}>Doctor</button>
              <button className="btn" onClick={() => showRole("staff")}>Staff</button>
            </div>
          </div>

          {/* Admin Options */}
          {visible.adminOptions && (
            <div className="bg-white rounded-lg shadow p-6 w-full max-w-xl">
              <h2 className="text-lg font-semibold mb-4">Admin Dashboard</h2>
              <button className="btn" onClick={() => toggleSection("medicineForm")}>➕ Add Medicine</button>
              <button className="btn" onClick={() => toggleSection("equipmentForm")}>➕ Add Equipment</button>
              <button className="btn" onClick={() => toggleSection("labourForm")}>➕ Add Labour</button>
            </div>
          )}

          {/* Doctor View */}
          {visible.doctorView && (
            <div className="bg-white rounded-lg shadow p-6 w-full max-w-xl">
              <h2 className="text-lg font-semibold mb-2">Doctor Dashboard</h2>
              <InventoryCount medicineName="Paracetamol" />
              <InventoryCount medicineName="Amoxicillin" />
              <InventoryCount medicineName="Cough Syrup" />
              <h3 className="mt-4 font-semibold">🔧 Equipment Availability</h3>
              <ul className="list-disc pl-5">
                <li>Thermometers - 25</li>
                <li>BP Machines - 10</li>
                <li>Stethoscopes - 40</li>
              </ul>
            </div>
          )}

          {/* Staff Options */}
          {visible.staffOptions && (
            <div className="bg-white rounded-lg shadow p-6 w-full max-w-xl text-center">
              <h2 className="text-lg font-semibold mb-4">Staff Dashboard</h2>
              <button className="btn" onClick={() => toggleSection("staffView")}>👁️ View Details</button>
              <button className="btn" onClick={() => toggleSection("usageForm")}>📝 Submit Medicine Usage</button>
            </div>
          )}

          {/* View Availability (Staff) */}
          {visible.staffView && (
            <div className="bg-white rounded-lg shadow p-6 w-full max-w-xl">
              <h3 className="font-semibold">📦 Medicine Availability</h3>
              <ul className="list-disc pl-5">
                <li>Paracetamol - 200 units</li>
                <li>Amoxicillin - 150 units</li>
                <li>Cough Syrup - 50 bottles</li>
              </ul>
              <h3 className="mt-4 font-semibold">🔧 Equipment Availability</h3>
              <ul className="list-disc pl-5">
                <li>Thermometers - 25</li>
                <li>BP Machines - 10</li>
                <li>Stethoscopes - 40</li>
              </ul>
              <h3 className="mt-4 font-semibold">👷 Labour Availability</h3>
              <ul className="list-disc pl-5">
                <li>Ravi - Lab Dept, Shift: Morning</li>
                <li>Meena - Cleaning Dept, Shift: Evening</li>
                <li>Arun - Lab Dept, Shift: Night</li>
              </ul>
            </div>
          )}

          {/* Usage Logger */}
          {visible.usageForm && <UsageLogger />}

          {/* Medicine Form with Firestore */}
          {visible.medicineForm && (
            <div className="bg-white rounded-lg shadow p-6 w-full max-w-xl">
              <h3 className="font-semibold mb-2">Add New Medicine</h3>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const name = e.target[0].value;
                const batch = e.target[1].value;
                const expiry = e.target[2].value;
                const quantity = parseInt(e.target[3].value);
                try {
                  await addDoc(collection(db, "medicines"), {
                    name,
                    batch,
                    expiry,
                    quantity,
                    createdAt: new Date()
                  });
                  alert("Medicine added successfully!");
                  e.target.reset();
                } catch (error) {
                  alert("Error adding medicine: " + error.message);
                }
              }}>
                <input type="text" placeholder="Medicine Name" required className="input" />
                <input type="text" placeholder="Batch Number" required className="input" />
                <input type="date" required className="input" />
                <input type="number" placeholder="Quantity" required className="input" />
                <button type="submit" className="btn w-full">Add Medicine</button>
              </form>
            </div>
          )}

          {/* Equipment Form */}
          {visible.equipmentForm && (
            <div className="bg-white rounded-lg shadow p-6 w-full max-w-xl">
              <h3 className="font-semibold mb-2">Add Equipment</h3>
              <form>
                <input type="text" placeholder="Equipment Name" required className="input" />
                <input type="text" placeholder="Model Number" required className="input" />
                <input type="date" required className="input" />
                <input type="number" placeholder="Quantity" required className="input" />
                <button type="submit" className="btn w-full">Add Equipment</button>
              </form>
            </div>
          )}

          {/* Labour Form */}
          {visible.labourForm && (
            <div className="bg-white rounded-lg shadow p-6 w-full max-w-xl">
              <h3 className="font-semibold mb-2">Add Labour</h3>
              <form>
                <input type="text" placeholder="Labour Name" required className="input" />
                <input type="text" placeholder="Department" required className="input" />
                <input type="text" placeholder="Shift Time" required className="input" />
                <input type="number" placeholder="Contact Number" required className="input" />
                <button type="submit" className="btn w-full">Add Labour</button>
              </form>
            </div>
          )}

          {/* Feedback Form */}
          {visible.feedbackForm && (
            <div className="bg-white rounded-lg shadow p-6 w-full max-w-xl">
              <h3 className="font-semibold mb-2">Submit Feedback</h3>
              <form>
                <input type="text" placeholder="Your Name" required className="input" />
                <input type="email" placeholder="Your Email" required className="input" />
                <textarea rows="4" placeholder="Your Feedback..." required className="input"></textarea>
                <button type="submit" className="btn w-full">Send Feedback</button>
              </form>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .btn {
          padding: 10px 20px;
          margin: 10px;
          background-color: teal;
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .btn:hover {
          background-color: #006d6d;
        }
        .input {
          display: block;
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
      `}</style>
    </>
  );
}
