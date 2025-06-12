import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const toggleFeedbackForm = () => setShowFeedback(!showFeedback);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback!");
    e.target.reset();
    setShowFeedback(false);
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGeminiSubmit = async (e) => {
    e.preventDefault();
    setResponse("Thinking...");
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      setResponse("Error: " + (err.response?.data?.error || "Something went wrong"));
    }
  };

  return (
    <>
      <Head>
        <title>Welcome to MedTrack</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div
        className="bg-cover bg-center min-h-screen bg-fixed"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        {/* Header */}
        <header className="bg-teal-600 text-white text-center py-6 text-3xl font-bold shadow-md flex justify-center items-center gap-4">
          <img src="/medtrack.jpg" alt="MedTrack Logo" className="h-12 rounded" />
          MedTrack System
        </header>

        {/* Navigation */}
        <nav className="bg-teal-900 text-white flex justify-center gap-8 py-3 text-lg font-semibold shadow">
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">
            Home
          </a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToAbout(); }} className="hover:underline">
            About Us
          </a>
          <button onClick={toggleFeedbackForm} className="hover:underline">
            Feedback
          </button>
        </nav>

        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row justify-center items-start gap-10 p-10">
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl max-w-xl w-full">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">Welcome to MedTrack</h2>
            <p className="text-gray-800 mb-4">
              MedTrack is your all-in-one hospital inventory and staff management system. It helps monitor:
            </p>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              <li>✔️ Availability of Medicines and Medical Equipment</li>
              <li>✔️ Department-wise Doctor and Nurse Information</li>
              <li>✔️ Working Lab Staff and Medical Resources</li>
              <li>✔️ Automatic Alerts for Low Stock and Expiry</li>
            </ul>
          </div>

          <div className="bg-white bg-opacity-95 p-8 rounded-lg shadow-xl w-full max-w-sm">
            <h2 className="text-2xl font-semibold text-teal-700 mb-6 text-center">Login to Continue</h2>
            <form action="/role" method="GET">
              <input
                type="text"
                placeholder="Username"
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full p-3 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <div className="text-right text-sm mb-4">
                <a href="#" className="text-teal-700 hover:underline">Forgot Password?</a>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white font-bold py-2 rounded hover:bg-teal-700 transition"
              >
                Login
              </button>
            </form>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="p-10">
          <div className="max-w-4xl mx-auto bg-white bg-opacity-90 p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">About Us</h2>
            <p className="text-gray-800 mb-4">
              MedTrack is developed to streamline operations by providing real-time visibility into medicine availability, staff details, and equipment status.
            </p>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              <li>📊 Tracking medicine usage and stock levels</li>
              <li>👩‍⚕️ Monitoring doctor, nurse, and staff assignments</li>
              <li>🔔 Sending alerts for expiring or low-stock items</li>
              <li>🛠️ Managing equipment and lab resource details</li>
            </ul>
            <p className="mt-4 text-gray-800">
              With a user-friendly design and robust backend, MedTrack empowers healthcare providers to focus more on patient care and less on administrative work.
            </p>
          </div>
        </section>

        {showFeedback && (
          <div className="max-w-xl mx-auto bg-white bg-opacity-95 p-8 rounded-lg shadow-xl mb-10">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4 text-center">Submit Your Feedback</h2>
            <form onSubmit={handleFeedbackSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded"
              />
              <textarea
                rows="5"
                placeholder="Your Feedback..."
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white font-bold py-2 rounded hover:bg-teal-700 transition"
              >
                Send Feedback
              </button>
            </form>
          </div>
        )}

        {/* Gemini Chat Box */}
        <div className="max-w-3xl mx-auto my-10 p-6 bg-white bg-opacity-95 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-teal-700 mb-4">Ask MedTrack Assistant </h2>
          <form onSubmit={handleGeminiSubmit}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about MedTrack..."
              className="w-full p-3 mb-3 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 font-bold rounded hover:bg-teal-700 transition"
            >
              Get Answer
            </button>
          </form>
          <div className="mt-4 text-gray-800 whitespace-pre-wrap">
            {response && <p>{response}</p>}
          </div>
        </div>

        <footer className="bg-teal-600 text-white text-center py-4">
          &copy; {new Date().getFullYear()} MedTrack | Smart Healthcare Supply & Staff Monitoring System
        </footer>
      </div>
    </>
  );
}
