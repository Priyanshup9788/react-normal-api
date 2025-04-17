/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

import Review from "./Review";

const ViewProduct = () => {
  const [productData, setProductData] = useState([]);
  
  let { id } = useParams();

  useEffect(() => {

    getProduct();
  }, [setProductData]);

  let getProduct = async () => {
    let data = await fetch(`http://localhost:3000/products/?id=${id}`);
    let showData = await data.json();

    setProductData(showData);
  };

  

  return (
    <div>
      {productData.map((prod) => (
        <>
          <Container>
            <Row className="mt-3">
              <Col>
                <img
                  src={prod.image}
                  alt={prod.title}
                  style={{ width: "200px" }}
                />
              </Col>
              <Col>
                <h2>{prod.title} <></> </h2>
                <span className="fs-5 mb-2">{prod.description}</span>
                <br />
                <span className="fs-4 mt-2">${prod.price}</span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Review props={id}/>
              </Col>
              <Col>
              </Col>
            </Row>
          </Container>
        </>
      ))}
    </div>
  );
};

export default ViewProduct;
