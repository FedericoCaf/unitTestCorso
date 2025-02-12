export const searchFilter = (data, query, maxItems = 10) => {
    return data
        .filter(item => item.toLowerCase().includes(query.toLowerCase())) // Controlla se contiene la query
        .sort((a, b) => a.localeCompare(b)) // Ordina alfabeticamente
        .slice(0, maxItems); // Limita ai primi maxItems risultati
};





