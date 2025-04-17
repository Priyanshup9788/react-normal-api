/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [newproduct, setNewProduct] = useState({});
  const [category, setCategory] = useState([""]);
  const { id } = useParams();

  let navigate = useNavigate()

  useEffect(() => {
    getCategory();
    getProductData();
  }, []);

  const getProductData = async () => {
    let data = await fetch(`http://localhost:3000/products/${id}`);
    let showData = await data.json();
    setNewProduct(showData);
  };

  const getCategory = async () => {
    let getCategoriesData = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    let categorieData = await getCategoriesData.json();
    setCategory(categorieData);
  };

  const getInput = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newproduct, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/products/${id}`, {
      method: "put",
      body: JSON.stringify(newproduct),
    });
    navigate("/productView");
    
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <div className="p-4 bg-light border rounded shadow">
            <h2 className="mb-4 text-dark text-center">Update Product Details</h2>
            <Form onSubmit={submitData}>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={newproduct.category || ""}
                  onChange={getInput}
                >
                  <option value="">-- Select Category --</option>
                  {category.map((val, i) => (
                    <option key={i} value={val}>
                      {val}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={newproduct.title || ""}
                  onChange={getInput}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={newproduct.price || ""}
                  onChange={getInput}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={newproduct.description || ""}
                  onChange={getInput}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <div className="mb-2">
                  {newproduct.image && (
                    <img
                      src={newproduct.image}
                      alt={newproduct.title}
                      className="img-thumbnail"
                      width="120"
                      height="120"
                    />
                  )}
                </div>
                <Form.Control
                  type="text"
                  name="image"
                  value={newproduct.image || ""}
                  onChange={getInput}
                />
              </Form.Group>

              <div className="text-center">
                <Button type="submit" variant="primary" className="px-4">
                  Update Product
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProduct;
