import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [bandi, setBandi] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    region: '',
    fundingType: ''
  });

  // Mock data for demonstration
  const mockBandi = [
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

  const handleFilterChange = (e) => {
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

  const getStatusVariant = (status) => {
    switch (status) {
      case 'OPEN': return 'success';
      case 'CLOSING_SOON': return 'warning';
      case 'CLOSED': return 'secondary';
      default: return 'primary';
    }
  };

  return (
    <Container className=\"my-4\">
      <Row>
        <Col>
          <h1 className=\"mb-4\">Bandi Aggregator</h1>
          <p className=\"lead\">
            La fonte unica e open-source per tutte le opportunità di finanziamento pubblico per le startup italiane.
          </p>
        </Col>
      </Row>

      <Row className=\"mb-4\">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Filtri</Card.Title>
              <Form>
                <Row>
                  <Col md={4}>
                    <Form.Group className=\"mb-3\">
                      <Form.Label>Stato</Form.Label>
                      <Form.Select 
                        name=\"status\" 
                        value={filters.status} 
                        onChange={handleFilterChange}
                      >
                        <option value=\"\">Tutti gli stati</option>
                        <option value=\"OPEN\">Aperti</option>
                        <option value=\"CLOSING_SOON\">In chiusura</option>
                        <option value=\"CLOSED\">Chiusi</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className=\"mb-3\">
                      <Form.Label>Regione</Form.Label>
                      <Form.Control 
                        type=\"text\" 
                        name=\"region\" 
                        placeholder=\"Es. Lombardia\" 
                        value={filters.region} 
                        onChange={handleFilterChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className=\"mb-3\">
                      <Form.Label>Tipo di finanziamento</Form.Label>
                      <Form.Control 
                        type=\"text\" 
                        name=\"fundingType\" 
                        placeholder=\"Es. Contributo\" 
                        value={filters.fundingType} 
                        onChange={handleFilterChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Bandi disponibili</h2>
          {filteredBandi.length === 0 ? (
            <p>Nessun bando trovato con i filtri selezionati.</p>
          ) : (
            filteredBandi.map(bando => (
              <Card key={bando.id} className=\"mb-3\">
                <Card.Body>
                  <Card.Title>
                    <Link to={`/bando/${bando.id}`} className=\"text-decoration-none\">
                      {bando.title}
                    </Link>
                  </Card.Title>
                  <Card.Subtitle className=\"mb-2 text-muted\">
                    {bando.issuingBody}
                  </Card.Subtitle>
                  <Card.Text>
                    {bando.summaryText}
                  </Card.Text>
                  <div className=\"d-flex justify-content-between align-items-center\">
                    <div>
                      <Badge bg={getStatusVariant(bando.status)}>
                        {bando.status === 'CLOSING_SOON' ? 'In chiusura' : bando.status}
                      </Badge>
                      <span className=\"ms-2\">
                        Scadenza: {bando.deadlineDate}
                      </span>
                    </div>
                    <div>
                      {bando.fundingType.map((type, index) => (
                        <Badge key={index} bg=\"info\" className=\"me-1\">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;