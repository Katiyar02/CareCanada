import { useState, useEffect } from "react";
import axios from "axios";

export default function FirstAid() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);
    const [previousResponses, setPreviousResponses] = useState([]);

    // 🔹 Fetch previous responses from MySQL
    useEffect(() => {
        async function fetchResponses() {
            try {
                const res = await axios.get("http://localhost:5000/api/firstaid");
                setPreviousResponses(res.data);
            } catch (error) {
                console.error("Error fetching responses:", error);
            }
        }
        fetchResponses();
    }, []);

    // 🔹 Handle AI Search
    const handleSearch = async () => {
        if (!query.trim()) {
            setError("Please enter a valid first aid topic.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const response = await axios.post("http://localhost:5000/api/firstaid", { query });

            setResult(response.data);
        } catch (error) {
            setError("AI could not generate a response. Try another topic.");
        }

        setLoading(false);
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">First Aid Assistance</h2>

            {/* Search Input */}
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Enter first aid topic (e.g., CPR, burns, choking)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-2 border rounded w-full"
                />
                <button onClick={handleSearch} disabled={loading} className="p-2 bg-blue-500 text-white rounded">
                    {loading ? "Analyzing..." : "Get First Aid Info"}
                </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* Display AI Response */}
            {result && (
                <div className="mt-6 p-4 border rounded-lg bg-white shadow">
                    <h3 className="text-xl font-semibold">First Aid Guide for: {result.query}</h3>
                    <p className="mt-2">{result.ai_response}</p>

                    {/* YouTube Video Recommendations */}
                    <h4 className="mt-4 text-lg font-semibold">Recommended Videos</h4>
                    <ul className="mt-2">
                        {result.recommended_videos.map((video, index) => (
                            <li key={index}>
                                <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                    {video.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
