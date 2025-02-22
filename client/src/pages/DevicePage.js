import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row ,Image,Card} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import {useParams} from 'react-router-dom'
import {fetchOneDevice} from "../http/deviceAPI";

const DevicePage = () => {
 // const device = {id:1, name: '17 pro', price:'', rating:'0', image : 'D:\\_Desktop\\JS\\Practise8 Store\\server\\static\\iphobe.jpg'};
 // const description = [{id:1, title:'23423',description:'11231'}];

 const [device, setDevice] = useState({info: []})
 console.log("-----------------DevicePage----------------")
 console.dir(device)
 const {id} = useParams()
 useEffect(() => {
     fetchOneDevice(id).then(data => setDevice(data))
 }, [])

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={process.env.REACT_APP_API_URL + '/' +  device.img} />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center "
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: "cover",
                fontSize: 64,
              }}>
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
            <Card className="d-flex flex-column align-items-center justify-content-around"
            style={{width:300, height:300,fontSize:32,border:'5px solid lightgrey'}}>
                <h3> From : {device.price} $</h3>
                <Button variant={"outline-dark"}>
                    Add to cart
                </Button>
            </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Product Description</h1>
        {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
        {/*{description.map((info,index)=><Row key={info.id} 
        style={{background: index % 2 === 0 ? 'lightgrey' : 'transparent',padding: 10}}>{info.title}: {info.description}</Row>)*/}
      </Row>
    </Container>
  );
};

export default DevicePage;
