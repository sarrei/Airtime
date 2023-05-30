import React, { useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import './Style.css'

function Editar() {

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        function simulateNetworkRequest() {
          return new Promise((resolve) => setTimeout(resolve, 2000));
        }
    
        if (isLoading) {
          simulateNetworkRequest().then(() => {
            setLoading(false);
          });
        }
      }, [isLoading]);
    
      const handleClick = () => setLoading(true);

  return (
    <div className="editar">
        <Form>
            <h2>Editar Cliente</h2>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nombres</Form.Label>
                <Form.Control type="text" placeholder="Nombres" 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicApellidos">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="text" placeholder="Apellidos" 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasictarjey">
                <Form.Label>Codigo de Tarjeta</Form.Label>
                <Form.Control type="text" placeholder="0000-000-0000" 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="ejemplo@gmail.com" 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDpi">
                <Form.Label>DPI</Form.Label>
                <Form.Control type="text" placeholder="0000000000000" 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicResidencia">
                <Form.Label>Direccion de Residencia</Form.Label>
                <Form.Control type="text" placeholder="zona 1 Guatemala" 
                />
            </Form.Group>
            <Button
                variant="success"
                disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
                >
                {isLoading ? 'Guardando…' : 'Guardar'}
            </Button>
        </Form>
    </div>
  );
}

export default Editar;