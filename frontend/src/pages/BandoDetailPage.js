import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

const BandoDetailPage = () => {
  const { id } = useParams();
  const [bando, setBando] = useState(null);

  // Mock data for demonstration
  const mockBando = {
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
  }, [id]);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'OPEN': return 'success';
      case 'CLOSING_SOON': return 'warning';
      case 'CLOSED': return 'secondary';
      default: return 'primary';
    }
  };

  if (!bando) {
    return (
      <Container className="my-4">
        <Row>
          <Col>
            <p>Caricamento...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row className="mb-3">
        <Col>
          <Link to="/">&larr; Torna alla lista</Link>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{bando.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {bando.issuingBody}
              </Card.Subtitle>

              <div className="mb-3">
                <Badge bg={getStatusVariant(bando.status)}>
                  {bando.status === 'CLOSING_SOON' ? 'In chiusura' : bando.status}
                </Badge>
                <span className="ms-2">
                  Scadenza: {bando.deadlineDate}
                </span>
              </div>

              <div className="mb-3">
                <h5>Tipologia di finanziamento</h5>
                {bando.fundingType.map((type, index) => (
                  <Badge key={index} bg="info" className="me-1">
                    {type}
                  </Badge>
                ))}
              </div>

              <div className="mb-3">
                <h5>Importo</h5>
                <p>
                  {bando.fundingMin ? `Da €${bando.fundingMin.toLocaleString()}` : ''}
                  {bando.fundingMin && bando.fundingMax ? ' a ' : ''}
                  {bando.fundingMax ? `€${bando.fundingMax.toLocaleString()}` : ''}
                </p>
              </div>

              <div className="mb-3">
                <h5>Descrizione</h5>
                <p>{bando.summaryText}</p>
              </div>

              <div className="mb-3">
                <h5>Requisiti di ammissibilità</h5>
                <ul>
                  {bando.eligibilityCriteria.map((criteria, index) => (
                    <li key={index}>{criteria}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <h5>Spese ammissibili</h5>
                <ul>
                  {bando.eligibleExpenses.map((expense, index) => (
                    <li key={index}>{expense}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <h5>Link al bando</h5>
                <a href={bando.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {bando.sourceUrl}
                </a>
              </div>

              <div className="mb-3">
                <h5>Date importanti</h5>
                <p>
                  Pubblicazione: {bando.publicationDate}<br />
                  Scadenza: {bando.deadlineDate}
                </p>
              </div>

              <Button variant="primary" href={bando.sourceUrl} target="_blank">
                Vai al bando originale
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BandoDetailPage;