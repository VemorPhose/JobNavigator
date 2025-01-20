import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const text = location.state?.text;

  // Redirect if no text data
  if (!text) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow p-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-xl">No resume text found.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go Back
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Converted Resume Text</h1>
          <div className="bg-white p-6 rounded-lg shadow whitespace-pre-wrap">
            {text}
          </div>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Convert Another Resume
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Results;