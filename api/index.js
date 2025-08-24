const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store (will be replaced with PostgreSQL)
let bandiData = [
  {
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
    eligibilityCriteria: ['Essere una startup innovativa', 'Avere un progetto di ricerca e sviluppo'],
    eligibleExpenses: ['Acquisto attrezzature', 'Personale dedicato al progetto', 'Costi di ricerca'],
    geography: { region: 'Nazionale' }
  },
  {
    id: 2,
    title: 'Fondo per lo Sviluppo e l\'Innovazione delle Imprese Turistiche',
    issuingBody: 'Regione Lombardia',
    sourceUrl: 'https://bandi.regione.lombardia.it',
    publicationDate: '2023-03-20',
    deadlineDate: '2023-10-31',
    status: 'CLOSING_SOON',
    fundingType: ['Finanziamento a tasso zero'],
    fundingMin: 5000,
    fundingMax: 100000,
    summaryText: 'Sostegno alle imprese turistiche lombarde per investimenti in innovazione e digitalizzazione.',
    eligibilityCriteria: ['Essere un\'impresa turistica registrata in Lombardia', 'Presentare un progetto di digitalizzazione'],
    eligibleExpenses: ['Software e tecnologie digitali', 'Formazione del personale', 'Marketing digitale'],
    geography: { region: 'Lombardia' }
  }
];

// Routes
app.get('/api/bandi', (req, res) => {
  // Simple filtering based on query parameters
  let filteredBandi = bandiData;
  
  // Filter by status
  if (req.query.status) {
    filteredBandi = filteredBandi.filter(bando => bando.status === req.query.status);
  }
  
  // Filter by region
  if (req.query.region) {
    filteredBandi = filteredBandi.filter(bando => 
      bando.geography.region.toLowerCase().includes(req.query.region.toLowerCase())
    );
  }
  
  // Filter by funding type
  if (req.query.fundingType) {
    filteredBandi = filteredBandi.filter(bando => 
      bando.fundingType.some(type => 
        type.toLowerCase().includes(req.query.fundingType.toLowerCase())
      )
    );
  }
  
  res.json(filteredBandi);
});

app.get('/api/bandi/:id', (req, res) => {
  const bando = bandiData.find(b => b.id == req.params.id);
  if (!bando) {
    return res.status(404).json({ error: 'Bando not found' });
  }
  res.json(bando);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Bandi Aggregator API server running on port ${PORT}`);
});