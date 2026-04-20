
import React from 'react';
import { Container, Row, Col, Card, CardBody, CardImg, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const DEMO_PRODUCTS = [
  {
    id: 1,
    name: 'Vestido Midi Floral Rosa',
    price: 189.90,
    imageUrl: 'https://images.unsplash.com/photo-1572804013307-a9a111d72f8b?auto=format&fit=crop&w=500&q=80',
    sizes: ['P', 'M', 'G'],
    colors: ['Rosa', 'Branco']
  },
  {
    id: 2,
    name: 'Blusa de Seda Elegante',
    price: 129.90,
    imageUrl: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=500&q=80',
    sizes: ['P', 'M'],
    colors: ['Branco', 'Nude']
  },
  {
    id: 3,
    name: 'Conjunto Alfaiataria Bella',
    price: 259.90,
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=500&q=80',
    sizes: ['M', 'G'],
    colors: ['Rosa Choque', 'Preto']
  },
  {
    id: 4,
    name: 'Saia Plissada Romântica',
    price: 149.90,
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=500&q=80',
    sizes: ['P', 'M', 'G'],
    colors: ['Rosa Pastel']
  }
];

const DemoPage = () => {
  return (
    <div className="demo-page py-5">
      <Container>
        <div className="text-center mb-5">
          <img src="/images/logo.png" alt="Bella Anac" style={{ maxHeight: '120px', marginBottom: '20px' }} />
          <h2 className="display-4" style={{ color: '#ff3860', fontWeight: 'bold' }}>Vitrine Bella Anac</h2>
          <p className="lead text-muted">Proporcionando autoestima e confiança com looks autênticos! 🤍</p>
        </div>

        <Row>
          {DEMO_PRODUCTS.map(product => (
            <Col key={product.id} xs="12" sm="6" lg="3" className="mb-4">
              <Card className="h-100 border-0 shadow-sm product-card">
                <div className="position-relative overflow-hidden">
                  <CardImg
                    top
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ height: '350px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                  />
                  <div className="product-overlay d-flex align-items-center justify-content-center">
                    <Button color="light" className="rounded-pill px-4 py-2">Ver Detalhes</Button>
                  </div>
                </div>
                <CardBody className="text-center">
                  <CardTitle tag="h5" className="mb-2" style={{ fontSize: '1.1rem', fontWeight: '600' }}>{product.name}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-3 text-primary" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    R$ {product.price.toFixed(2)}
                  </CardSubtitle>
                  <div className="mb-3">
                    <small className="text-muted d-block mb-1">Tamanhos: {product.sizes.join(', ')}</small>
                    <div className="d-flex justify-content-center gap-1">
                      {product.colors.map(color => (
                        <span key={color} className="badge badge-light border mx-1">{color}</span>
                      ))}
                    </div>
                  </div>
                  <Button 
                    block 
                    style={{ backgroundColor: '#ff3860', borderColor: '#ff3860', borderRadius: '50px' }}
                    className="text-uppercase font-weight-bold py-2"
                  >
                    Adicionar à Sacola
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-5 p-4 bg-light rounded shadow-sm">
          <h4>Gostou de algum look?</h4>
          <p>Fale diretamente com a gente no WhatsApp para garantir o seu!</p>
          <a 
            href="https://wa.me/c/556293256677" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-success btn-lg rounded-pill px-5"
            style={{ backgroundColor: '#25d366', border: 'none' }}
          >
            <i className="fa fa-whatsapp mr-2"></i> Abrir Catálogo
          </a>
        </div>
      </Container>
    </div>
  );
};

export default DemoPage;
