'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Bando {
  id: number;
  title: string;
  issuingBody: string;
  sourceUrl: string;
  publicationDate: string;
  deadlineDate: string;
  status: string;
  fundingType: string[];
  fundingMin: number;
  fundingMax: number;
  summaryText: string;
  eligibilityCriteria: string[];
  eligibleExpenses: string[];
  geography: {
    region: string;
  };
}

export default function BandoDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [bando, setBando] = useState<Bando | null>(null);

  // Mock data for demonstration
  const mockBando: Bando = {
    id: 1,
    title: 'Smart&Start Italia',
    issuingBody: 'Invitalia',
    sourceUrl: 'https://www.invitalia.it/sites/it-it/bandi-e-avvisi/Pagine/ElencoBandi.aspx',
    publicationDate: '2023-01-15',
    deadlineDate: '2023-12-31',
    status: 'OPEN',
    fundingType: ['Contributo a fondo perduto'],
    fundingMin: 10000,
    fundingMax: 250000,
    summaryText: 'Finanziamento a fondo perduto per startup innovative e PMI giovani per lo sviluppo di progetti di ricerca e sviluppo.',
    eligibilityCriteria: [
      'Essere una startup innovativa',
      'Avere un progetto di ricerca e sviluppo',
      'Avere meno di 5 anni di attività',
      'Avere un business plan completo'
    ],
    eligibleExpenses: [
      'Acquisto attrezzature',
      'Personale dedicato al progetto',
      'Costi di ricerca',
      'Proprietà intellettuale',
      'Marketing e comunicazione'
    ],
    geography: { region: 'Nazionale' }
  };

  useEffect(() => {
    // In a real application, this would fetch from the API
    setBando(mockBando);
  }, [params.id]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-green-100 text-green-800';
      case 'CLOSING_SOON': return 'bg-yellow-100 text-yellow-800';
      case 'CLOSED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  if (!bando) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Bandi Aggregator</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <p>Caricamento...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Bandi Aggregator</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <Link href="/" className="text-indigo-600 hover:text-indigo-800 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Torna alla lista
            </Link>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{bando.title}</h1>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusVariant(bando.status)}`}>
                  {bando.status === 'CLOSING_SOON' ? 'In chiusura' : bando.status}
                </span>
              </div>

              <p className="text-gray-600 mb-6">{bando.issuingBody}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Tipologia di finanziamento</h2>
                  <div className="flex flex-wrap">
                    {bando.fundingType.map((type, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mr-2 mb-2">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Importo</h2>
                  <p className="text-gray-700">
                    {bando.fundingMin ? `Da €${bando.fundingMin.toLocaleString()}` : ''}
                    {bando.fundingMin && bando.fundingMax ? ' a ' : ''}
                    {bando.fundingMax ? `€${bando.fundingMax.toLocaleString()}` : ''}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Descrizione</h2>
                <p className="text-gray-700">{bando.summaryText}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Requisiti di ammissibilità</h2>
                  <ul className="list-disc pl-5 space-y-1">
                    {bando.eligibilityCriteria.map((criteria, index) => (
                      <li key={index} className="text-gray-700">{criteria}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Spese ammissibili</h2>
                  <ul className="list-disc pl-5 space-y-1">
                    {bando.eligibleExpenses.map((expense, index) => (
                      <li key={index} className="text-gray-700">{expense}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Link al bando</h2>
                <a href={bando.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                  {bando.sourceUrl}
                </a>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Date importanti</h2>
                <p className="text-gray-700">
                  Pubblicazione: {bando.publicationDate}<br />
                  Scadenza: {bando.deadlineDate}
                </p>
              </div>

              <div className="flex">
                <a 
                  href={bando.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Vai al bando originale
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}