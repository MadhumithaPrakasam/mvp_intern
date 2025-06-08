import Head from "next/head";
import Image from "next/image";

export default function Home() {
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
        <header className="bg-teal-600 text-white text-center py-6 text-2xl font-bold">
          MedTrack System
        </header>

        {/* Welcome & Login Section */}
        <section className="flex flex-wrap justify-center items-start p-10 gap-10">
          {/* Info Box */}
          <div className="bg-white bg-opacity-90 p-8 rounded-lg max-w-lg shadow-lg">
            <h2 className="text-teal-600 text-2xl font-semibold mb-3">
              Welcome to MedTrack
            </h2>
            <p className="mb-4">
              MedTrack is your all-in-one hospital inventory and staff
              management system. It helps monitor:
            </p>
            <ul className="list-none space-y-2 text-[16px]">
              <li>✔️ Availability of Medicines and Medical Equipment</li>
              <li>✔️ Department-wise Doctor and Nurse Information</li>
              <li>✔️ Working Lab Staff and Medical Resources</li>
              <li>✔️ Automatic Alerts for Low Stock and Expiry</li>
            </ul>
          </div>

          {/* Login Box */}
          <div className="bg-white bg-opacity-95 p-8 rounded-lg w-[300px] shadow-lg text-center">
            <h2 className="text-teal-600 text-2xl font-semibold mb-5">
              Login to Continue
            </h2>
            <form action="/role.html" method="GET">
              <input
                type="text"
                placeholder="Username"
                required
                className="w-full p-2 mb-4 rounded border border-gray-300"
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full p-2 mb-4 rounded border border-gray-300"
              />
              <button
                type="submit"
                className="w-full bg-teal-600 text-white font-bold py-2 rounded hover:bg-[#006d6d] transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-teal-600 text-white text-center py-4 mt-10">
          &copy; 2025 MedTrack | Smart Healthcare Supply & Staff Monitoring System
        </footer>
      </div>
    </>
  );
}
