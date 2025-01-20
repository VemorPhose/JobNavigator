import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [text, setText] = useState(location.state?.text);
  const [recommendations, setRecommendations] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRecommendations = async () => {
      if (!text || recommendations) return;
      
      setIsLoading(true);
      try {
        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ resumeText: text })
        });
        
        if (!response.ok) throw new Error('Failed to get recommendations');
        
        const data = await response.json();
        setRecommendations(data.recommendations);
        setText(data.recommendations); // Replace text with recommendations
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getRecommendations();
  }, [text, recommendations]);

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