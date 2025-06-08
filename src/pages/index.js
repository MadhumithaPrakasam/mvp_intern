import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to MedTrack</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Full page background with overlay */}
      <div
        className="bg-cover bg-center min-h-screen bg-fixed"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        {/* Header */}
        <header className="bg-teal-600 text-white text-center py-6 text-3xl font-bold shadow-md">
          MedTrack System
        </header>

        {/* Main Content */}
        <section className="flex flex-col md:flex-row justify-center items-start gap-10 p-10">
          {/* Welcome Info */}
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl max-w-xl w-full">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">
              Welcome to MedTrack
            </h2>
            <p className="text-gray-800 mb-4">
              MedTrack is a smart healthcare inventory and staff monitoring platform.
              It helps hospitals manage:
            </p>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              <li>✔️ Medicines availability and usage tracking</li>
              <li>✔️ Medical equipment inventory</li>
              <li>✔️ Doctor, nurse, and labour department details</li>
              <li>✔️ Automatic alerts for low stock levels</li>
            </ul>
          </div>

          {/* Login Form */}
          <div className="bg-white bg-opacity-95 p-8 rounded-lg shadow-xl w-full max-w-sm">
            <h2 className="text-2xl font-semibold text-teal-700 mb-6 text-center">
              Login to Continue
            </h2>
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
                className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="w-full bg-teal-600 text-white font-bold py-2 rounded hover:bg-teal-700 transition"
              >
                Login
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-teal-600 text-white text-center py-4 mt-10">
          &copy; {new Date().getFullYear()} MedTrack | Smart Healthcare Monitoring System
        </footer>
      </div>
    </>
  );
}
