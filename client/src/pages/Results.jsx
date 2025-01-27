import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [text, setText] = useState(location.state?.text);
  const [recommendations, setRecommendations] = useState('');
  const [jobListings, setJobListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRecommendations = async () => {
      if (!text || recommendations) return;
      
      setIsLoading(true);
      try {
        const response = await fetch('api/recommendations', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ resumeText: text })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to get recommendations');
        }
        
        const data = await response.json();
        setRecommendations(data.recommendations);
        setJobListings(data.jobListings || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    getRecommendations();
  }, [text]); // Remove recommendations from dependency array

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#ffffff', color: '#523d35' }}>
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="text-center">Loading recommendations...</div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Recommended Roles</h2>
              <div className="mb-8">
                {recommendations.split(',').map((role, index) => (
                  <span key={index} className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-2 mb-2">
                    {role.trim()}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
              {jobListings.map((roleData, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">{roleData.role}</h3>
                  <div className="grid gap-4">
                    {roleData.listings.map((job, jobIndex) => (
                      <div key={jobIndex} className="border p-4 rounded-lg" style={{ borderColor: '#523d35', backgroundColor: '#efefe9' }}>
                        <h4 className="font-bold">{job.title}</h4>
                        <p className="text-gray-600">{job.company}</p>
                        <p className="text-gray-500">{job.location}</p>
                        <a href={job.link} target="_blank" rel="noopener noreferrer" 
                           className="text-blue-500 hover:underline">
                          View Job
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Results;