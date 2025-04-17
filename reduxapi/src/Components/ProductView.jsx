/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";

const ProductView = () => {

    const [productData, setProductData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(2);
    let [pages, setPages] = useState([])

    useEffect(() => {
        getProduct();
    }, [setProductData, currentPage]);

    let getProduct = async () => {
        let fetchData = await fetch("http://localhost:3000/products");
        let data = await fetchData.json();
        let length = Math.ceil(data.length / perPage);
        let page = [];
        for (var i = 1; i <= length; i++) {
            page.push(i);
        }
        setPages([...page])
        const lastIndex = currentPage * perPage;
        const firstIndex = lastIndex - perPage;
        let newData = data.slice(firstIndex, lastIndex);
        setProductData(newData);
    };

    const onpagechange = (e,v)=>{
        e.preventDefault();
        console.log(v);
        setCurrentPage(v);
    }



    let handleDelete = async (id) => {
        await fetch(`http://localhost:3000/products/${id}`, {
            method: "DELETE",
        });
        getProduct();
    };

    return (
        <Table striped bordered hover className='w-50 mx-auto'>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {productData.map((prod, i) => {

                })}
                {productData.map((prod, i) => (
                    <tr key={i}>
                        <td><img src={prod.image} height="60px" width="60px" alt="" /></td>
                        <td>{prod.title}</td>
                        <td>{prod.description}</td>
                        <td>{prod.price}</td>
                        <td>{prod.category}</td>
                        <td>
                            <Button
                                variant="danger"
                                onClick={() => handleDelete(prod.id)}
                                className="mb-2"
                            > Delete
                            </Button>
                            <Link to={`/updateProduct/${prod.id}`}>
                                <Button variant="primary" className="ms-2"> Edit
                                </Button>
                            </Link>
                        </td>
                    </tr>
                ))}



            </tbody>
            {pages.map((v,i)=>(
                <Button key={i} onClick={(e)=>onpagechange(e,v)}>{v}</Button>
            ))}
            
            
        </Table>
    )
}

export default ProductView




