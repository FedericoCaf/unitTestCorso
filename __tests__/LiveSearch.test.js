import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LiveSearch from '../components/LiveSearch';

const sampleData = ['Arancia', 'Mango', 'Pistacchio', 'Mirtillo', 'Ciliegia', 'Cocco', 'Ananas'];

describe('LiveSearch Component', () => {
    xtest('Mostra tutti gli elementi all\'avvio', () => {
        render(<LiveSearch data={sampleData} />);
        // Verifica che vengano mostrati i primi 5 elementi in ordine alfabetico
        const expectedItems = ['Arancia', 'Ciliegia', 'Cocco', 'Mango', 'Mirtillo'];
        expectedItems.forEach(item => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });
    
    xtest('Aggiorna dinamicamente i risultati', () => {
        render(<LiveSearch data={sampleData} />);
        fireEvent.change(screen.getByPlaceholderText('Digita per cercare...'), { target: { value: 'C' } });
        expect(screen.getByText('Ciliegia')).toBeInTheDocument();
        expect(screen.getByText('Cocco')).toBeInTheDocument();
    });

    xtest('Mostra messaggio quando non ci sono risultati', () => {
        render(<LiveSearch data={sampleData} />);
        fireEvent.change(screen.getByPlaceholderText('Digita per cercare...'), { target: { value: 'xyz' } });
        expect(screen.getByText('Nessuna corrispondenza trovata')).toBeInTheDocument();
    });

    xtest('Mostra al massimo 5 risultati', () => {
        render(<LiveSearch data={sampleData} />);
        fireEvent.change(screen.getByPlaceholderText('Digita per cercare...'), { target: { value: 'a' } });
        const items = screen.getAllByRole('listitem');
        console.log("Risultati trovati:", items.map(item => item.textContent));
        expect(items).toHaveLength(5);
    });
    

    xtest('Pulsante Cancella pulisce il campo di input', () => {
        render(<LiveSearch data={sampleData} />);
        const input = screen.getByPlaceholderText('Digita per cercare...');
        fireEvent.change(input, { target: { value: 'M' } });
        fireEvent.click(screen.getByText('Cancella'));
        expect(input.value).toBe('');
    });
});
