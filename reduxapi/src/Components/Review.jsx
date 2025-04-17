import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import Form from 'react-bootstrap/Form';

import { Button, Col, Container, Row } from "react-bootstrap";

const Review = ({props}) => {

    const [star, setStar] = useState([1, 2, 3, 4, 5]);
    const [activeStar, setActiveStar] = useState(-1);
    const [review, setreview] = useState({});
    const [allReviews,setAllReviews] = useState({});
    const [totalReview,setTotalReview]= useState(0)

    useEffect(()=>{
        getAllReviws();
    },[setAllReviews])

    const getAllReviws = async()=>{
        let allrev = await fetch("http://localhost:3000/reviews/?pid="+props)
        let data = await allrev.json()
        setAllReviews(data)
        console.log(data)
        let sum = 0;
        if(data.length>0){
        data.map((v)=>{
            sum+=v.star;
        })
        setTotalReview(sum/data.length)}
    }

    const onInputChange = (e) => {
        e.preventDefault();
        setreview({ ...review, [e.target.name]: e.target.value });
    }

    const addReview = async (e) => {
        e.preventDefault()
        let obk = {...review,["star"]:activeStar-1,pid:props};
        console.log(obk);

        let addReview = await fetch("http://localhost:3000/reviews",{
            method: "POST",
            body: JSON.stringify(obk)
        })
        if(addReview)
        {
            alert("Review Added");
        }
        else
        {
            alert("Review not added");
        }
        getAllReviws()
    }


    return (
        <>
            <h2 className="mt-3">Rating</h2>
            <form onSubmit={(e)=>addReview(e)}>
            {star.map((v, i) => (
                <FaStar key={i} style={{ color: activeStar > v ? "yellow" : "", fontSize: "2rem" }} onMouseOver={() => setActiveStar(v+1)} />
            ))}
            <Button className="me-3" onClick={() => setActiveStar(-1)}>Reset</Button>
            <Form.Group  className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control name="description" onChange={(e)=>{onInputChange(e)}} as="textarea" rows={3} />
            </Form.Group>
            <Button onClick={(e) => { addReview(e) }} >Submit</Button>
            </form>
            <br />
            <span className='mb-5'>Product Rating:</span>
            {star.map((v, i) => (
                    <FaStar key={i} style={{ color: totalReview >= v ? "yellow" : "", fontSize: "2rem" }} />
                ))}
                <br />
            {allReviews.length > 0 ?
                
            allReviews.map((val,i)=>(
                <div>
                 {star.map((v, i) => (
                    <FaStar key={i} style={{ color: val.star >= v ? "yellow" : "", fontSize: "2rem" }} />
                ))}
                <p>{val.description}</p>
                </div>
            )):"no review"}


        </>
    )
}

export default Review