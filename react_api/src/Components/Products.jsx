import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Products = () => {

    const [allProducts,setAllProducts]=useState([]);

    useEffect(async()=>{
        const getData = async()=>{
            let allData = await fetch("http://localhost:3000/product");
        let data = await allData.json();
        console.log(data)
        }
        getData();
        
    },[setAllProducts])

  return (
    <Container>
      <Row>
        <Col>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Products