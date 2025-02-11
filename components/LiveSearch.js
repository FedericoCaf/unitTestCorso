import React, { useState } from 'react';
import { searchFilter } from '../utils/searchFilter';

const LiveSearch = ({ data }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setLoading(true);
        setQuery(e.target.value);
        setTimeout(() => setLoading(false), 300);
    };

    const results = searchFilter(data, query, 5);

    return (
        <div className="p-4 max-w-lg mx-auto">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Digita per cercare..."
                className="border p-2 w-full rounded-lg"
            />
            {loading && <p className="text-gray-600">Aggiornamento in corso...</p>}
            <ul className="mt-3">
                {results.length > 0 ? (
                    results.map((item, index) => (
                        <li key={index} className="p-2 border-b">{item}</li>
                    ))
                ) : (
                    <p className="text-red-600 mt-2">Nessuna corrispondenza trovata</p>
                )}
            </ul>
            <button 
                onClick={() => setQuery('')} 
                className="mt-3 bg-green-500 text-white p-2 rounded-lg w-full"
            >
                Cancella
            </button>
        </div>
    );
};

export default LiveSearch;
