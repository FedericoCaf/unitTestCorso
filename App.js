import React from 'react';
import LiveSearch from './components/LiveSearch';

const fruits = ['Arancia', 'Mango', 'Pistacchio', 'Mirtillo', 'Ciliegia', 'Cocco', 'Kiwi', 'Melograno', 'Fragola'];

function App() {
    return (
        <div className="App">
            <h1 className="text-center text-2xl font-bold">Ricerca Live</h1>
            <LiveSearch data={fruits} />
        </div>
    );
}

export default App;
