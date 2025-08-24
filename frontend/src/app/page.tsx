'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Bando {
  id: number;
  title: string;
  issuingBody: string;
  deadlineDate: string;
  status: string;
  fundingType: string[];
  fundingMax: number;
  summaryText: string;
}

export default function Home() {
  const [bandi, setBandi] = useState<Bando[]>([]);
  const [filters, setFilters] = useState({
    status: '',
    region: '',
    fundingType: ''
  });

  // Mock data for demonstration
  const mockBandi: Bando[] = [
    {
      id: 1,
      title: 'Smart&Start Italia',
      issuingBody: 'Invitalia',
      deadlineDate: '2023-12-31',
      status: 'OPEN',
      fundingType: ['Contributo a fondo perduto'],
      fundingMax: 250000,
      summaryText: 'Finanziamento a fondo perduto per startup innovative e PMI giovani per lo sviluppo di progetti di ricerca e sviluppo.'
    },
    {
      id: 2,
      title: 'Fondo per lo Sviluppo e l\'Innovazione delle Imprese Turistiche',
      issuingBody: 'Regione Lombardia',
      deadlineDate: '2023-10-31',
      status: 'CLOSING_SOON',
      fundingType: ['Finanziamento a tasso zero'],
      fundingMax: 100000,
      summaryText: 'Sostegno alle imprese turistiche lombarde per investimenti in innovazione e digitalizzazione.'
    }
  ];

  useEffect(() => {
    // In a real application, this would fetch from the API
    setBandi(mockBandi);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredBandi = bandi.filter(bando => {
    if (filters.status && bando.status !== filters.status) return false;
    if (filters.region && !bando.issuingBody.toLowerCase().includes(filters.region.toLowerCase())) return false;
    if (filters.fundingType && !bando.fundingType.some(type => type.toLowerCase().includes(filters.fundingType.toLowerCase()))) return false;
    return true;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-green-100 text-green-800';
      case 'CLOSING_SOON': return 'bg-yellow-100 text-yellow-800';
      case 'CLOSED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className=\"min-h-screen bg-gray-50\">
      <header className=\"bg-white shadow\">
        <div className=\"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8\">
          <h1 className=\"text-3xl font-bold text-gray-900\">Bandi Aggregator</h1>
          <p className=\"mt-2 text-gray-600\">
            La fonte unica e open-source per tutte le opportunità di finanziamento pubblico per le startup italiane.
          </p>
        </div>
      </header>

      <main className=\"max-w-7xl mx-auto py-6 sm:px-6 lg:px-8\">
        <div className=\"px-4 py-6 sm:px-0\">
          {/* Filters */}
          <div className=\"bg-white shadow rounded-lg p-6 mb-6\">
            <h2 className=\"text-xl font-semibold text-gray-800 mb-4\">Filtri</h2>
            <div className=\"grid grid-cols-1 md:grid-cols-3 gap-4\">
              <div>
                <label htmlFor=\"status\" className=\"block text-sm font-medium text-gray-700 mb-1\">
                  Stato
                </label>
                <select
                  id=\"status\"
                  name=\"status\"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className=\"block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm\"
                >
                  <option value=\"\">Tutti gli stati</option>
                  <option value=\"OPEN\">Aperti</option>
                  <option value=\"CLOSING_SOON\">In chiusura</option>
                  <option value=\"CLOSED\">Chiusi</option>
                </select>
              </div>
              <div>
                <label htmlFor=\"region\" className=\"block text-sm font-medium text-gray-700 mb-1\">
                  Regione
                </label>
                <input
                  type=\"text\"
                  id=\"region\"
                  name=\"region\"
                  placeholder=\"Es. Lombardia\"
                  value={filters.region}
                  onChange={handleFilterChange}
                  className=\"block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm\"
                />
              </div>
              <div>
                <label htmlFor=\"fundingType\" className=\"block text-sm font-medium text-gray-700 mb-1\">
                  Tipo di finanziamento
                </label>
                <input
                  type=\"text\"
                  id=\"fundingType\"
                  name=\"fundingType\"
                  placeholder=\"Es. Contributo\"
                  value={filters.fundingType}
                  onChange={handleFilterChange}
                  className=\"block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm\"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <h2 className=\"text-2xl font-bold text-gray-800 mb-4\">Bandi disponibili</h2>
            {filteredBandi.length === 0 ? (
              <p className=\"text-gray-600\">Nessun bando trovato con i filtri selezionati.</p>
            ) : (
              <div className=\"grid grid-cols-1 gap-6\">
                {filteredBandi.map(bando => (
                  <div key={bando.id} className=\"bg-white shadow rounded-lg overflow-hidden\">
                    <div className=\"p-6\">
                      <div className=\"flex justify-between items-start\">
                        <div>
                          <h3 className=\"text-xl font-semibold text-gray-800 mb-2\">
                            <Link href={`/bando/${bando.id}`} className=\"text-indigo-600 hover:text-indigo-800\">
                              {bando.title}
                            </Link>
                          </h3>
                          <p className=\"text-gray-600 mb-4\">{bando.issuingBody}</p>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusVariant(bando.status)}`}>
                          {bando.status === 'CLOSING_SOON' ? 'In chiusura' : bando.status}
                        </span>
                      </div>
                      <p className=\"text-gray-700 mb-4\">{bando.summaryText}</p>
                      <div className=\"flex justify-between items-center\">
                        <span className=\"text-gray-600\">
                          Scadenza: {bando.deadlineDate}
                        </span>
                        <div>
                          {bando.fundingType.map((type, index) => (
                            <span key={index} className=\"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mr-2\">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}