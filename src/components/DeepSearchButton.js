import React, { useState } from 'react';
import axios from 'axios';

const DeepSearchButton = ({ onSendMessage }) => {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchSteps, setSearchSteps] = useState([]);

    const handleDeepSearch = async () => {
        if (!query.trim()) return;

        setIsSearching(true);
        setSearchSteps([]);

        try {
            const response = await axios.post('http://localhost:8000/query', { 
                query, 
                deepResearch: true 
            }, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            });

            const { steps, answer } = response.data;

            // Update search steps if available
            if (steps) {
                setSearchSteps(steps);
            }

            // Send the result as a message
            if (onSendMessage) {
                onSendMessage(query, true);
            }
        } catch (error) {
            console.error('Deep search error:', error);
            
            // Send error message
            if (onSendMessage) {
                onSendMessage(`Deep search failed: ${error.message}`, true);
            }
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="deep-search-container">
            <div className="search-input-container">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter your deep search query..."
                    disabled={isSearching}
                />
                <button 
                    onClick={handleDeepSearch} 
                    disabled={isSearching || !query.trim()}
                >
                    {isSearching ? 'Searching...' : 'Deep Search'}
                </button>
            </div>

            {isSearching && (
                <div className="search-steps">
                    <p>Searching for: {query}</p>
                    <div className="loading-spinner">Loading...</div>
                </div>
            )}

            {searchSteps.length > 0 && (
                <div className="search-results">
                    <h3>Search Process</h3>
                    {searchSteps.map((step, index) => (
                        <div key={index} className="search-step">
                            <h4>{step.name || `Step ${index + 1}`}</h4>
                            <p>{step.description || step.results || 'Processing...'}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DeepSearchButton;
