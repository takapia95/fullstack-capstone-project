import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { urlConfig } from '../../config';

function SearchPage() {
    // Task 1: Define state variables for the search query, age range, and search results.
    const [searchQuery, setSearchQuery] = useState('');
    const [ageRange, setAgeRange] = useState([0, 100]); // Example initial range
    const [searchResults, setSearchResults] = useState([]);

    const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['New', 'Like New', 'Older'];

    useEffect(() => {
        // Fetch all products
        const fetchProducts = async () => {
            try {
                let url = `${urlConfig.backendUrl}/api/gifts`;
                console.log(url);
                const response = await fetch(url);
                if (!response.ok) {
                    // Something went wrong
                    throw new Error(`HTTP error; ${response.status}`);
                }
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.log('Fetch error: ' + error.message);
            }
        };

        fetchProducts();
    }, []);

    // Task 2: Fetch search results from the API based on user inputs.
    const handleSearch = async () => {
        try {
            let url = `${urlConfig.backendUrl}/api/gifts?search=${searchQuery}&minAge=${ageRange[0]}&maxAge=${ageRange[1]}`;
            console.log(url);
            const response = await fetch(url);
            if (!response.ok) {
                // Something went wrong
                throw new Error(`HTTP error; ${response.status}`);
            }
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.log('Fetch error: ' + error.message);
        }
    };

    const navigate = useNavigate();

    const goToDetailsPage = (productId) => {
        // Task 6. Enable navigation to the details page of a selected gift.
        navigate(`/details/${productId}`);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="filter-section mb-3 p-3 border rounded">
                        <h5>Filters</h5>
                        <div className="d-flex flex-column">
                            {/* Task 3: Dynamically generate category and condition dropdown options. */}
                            <select className="form-select mb-2">
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            <select className="form-select mb-2">
                                {conditions.map(condition => (
                                    <option key={condition} value={condition}>{condition}</option>
                                ))}
                            </select>
                            {/* Task 4: Implement an age range slider and display the selected value. */}
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={ageRange[0]}
                                onChange={(e) => setAgeRange([e.target.value, ageRange[1]])}
                                className="form-range"
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={ageRange[1]}
                                onChange={(e) => setAgeRange([ageRange[0], e.target.value])}
                                className="form-range"
                            />
                            <div>Selected Age Range: {ageRange[0]} - {ageRange[1]}</div>
                        </div>
                    </div>
                    {/* Task 7: Add text input field for search criteria */}
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-control mb-2"
                    />
                    {/* Task 8: Implement search button with onClick event to trigger search */}
                    <button onClick={handleSearch} className="btn btn-primary">Search</button>
                    {/* Task 5: Display search results and handle empty results with a message */}
                    <div className="mt-3">
                        {searchResults.length > 0 ? (
                            <ul className="list-group">
                                {searchResults.map(result => (
                                    <li key={result.id} className="list-group-item">
                                        <div>{result.name}</div>
                                        <button
                                            onClick={() => goToDetailsPage(result.id)}
                                            className="btn btn-info"
                                        >
                                            View Details
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No results found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
