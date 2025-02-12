import { searchFilter } from '../utils/searchFilter';

describe('searchFilter Utility Function', () => {
    const sampleData = ['Arancia', 'Mango', 'Pistacchio', 'Mirtillo', 'Ciliegia', 'Cocco'];

    test('Filtra i dati in base al testo inserito', () => {
        expect(searchFilter(sampleData, 'M')).toEqual(['Mango', 'Mirtillo']);
    });

    test('Ordina i risultati in ordine alfabetico', () => {
        expect(searchFilter(sampleData, 'M')).toEqual(['Mango', 'Mirtillo']);
    });    

    test('Limita il numero massimo di risultati', () => {
        expect(searchFilter(sampleData, 'o', 2)).toEqual(['Cocco', 'Mango']);
    });

    test('Ritorna un array vuoto se non ci sono corrispondenze', () => {
        expect(searchFilter(sampleData, 'xyz')).toEqual([]);
    });
});
