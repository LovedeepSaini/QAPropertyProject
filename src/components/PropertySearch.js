import { useEffect, useState } from "react";

import Property from "./Property";
import { Card, Row, Col, Button } from "react-bootstrap";
//import {  Link, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import Button from 'react-bootstrap/Button';
import { faPoundSign, faSearch, faBed, faBath , faTree, faMapMarkerAlt, faCheck} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function PropertySearch(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [result, setResult] = useState([]);
  let [editPropertyDetails, setEditPropertyDetails] = useState([]);

  const searchHandler = (searchCriteria) => {
    setResult(
      result.filter(
        (property) =>
          (searchCriteria.type === "ANY" ||
            property.type === searchCriteria.type) &&
          Number(property.bedroom) >= Number(searchCriteria.bedroom) &&
          Number(property.bathroom) >= Number(searchCriteria.bathroom) &&
          Number(property.garden) >= Number(searchCriteria.garden) &&
          (Number(searchCriteria.price) === 0 ||
            Number(property.price) <= Number(searchCriteria.price))
      )
    );
  };

  useEffect(() => {
    fetch("http://localhost:3001/property")
      // get the JSON content from the response
      .then((response) => {
        if (!response.ok) {
          alert("An error has occurred.  Unable to load Properties data");
          throw response.status;
        } else return response.json();
      })
      .then((result) => {
        setResult(result);

        // console.log(JSON.stringify(properties, null, 2));
      })
      .catch((error) => {
        window.alert("An error has occurred");
      });
  }, []);

  const updateProperties = () => {
    fetch("http://localhost:3001/property")
      // get the JSON content from the response
      .then((response) => {
        if (!response.ok) {
          alert("An error has occurred.  Unable to load Properties data");
          throw response.status;
        } else return response.json();
      })
      .then((result) => {
        setResult(result);

        // console.log(JSON.stringify(properties, null, 2));
      })
      .catch((error) => {
        window.alert("An error has occurred");
      });
  };
  const filterStatus = (status, id) => {
    fetch(`http://localhost:3001/property/${id}`, {
      method: "PATCH",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ status: status }),
    });
    updateProperties();
  };
  const handleEdit = (data) => {
    setShow(!show);
    setEditPropertyDetails(data);
  };
  console.log(editPropertyDetails);

  const updateEditProperties = () => {
    let property = {
      price: document.getElementById("price1").value,

      bedroom: document.getElementById("bedroom1").value,
      bathroom: document.getElementById("bathroom1").value,
      garden: document.getElementById("garden1").value,

      address: document.getElementById("address1").value,

      postcode: document.getElementById("postcode1").value,

      type: document.getElementById("type1").value,
    };
    console.log(property);
    fetch(`http://localhost:3001/property/${editPropertyDetails.id}`, {
      method: "PATCH",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(property),
    });
    setShow(!show);
    updateProperties();
  };

  return (
    <div className="container">
      <Property
        searchHandler={searchHandler}
        updateProperties={updateProperties}
        setResult={setResult}
      />

      <div className="container-fluid">
        {/* Bootstrap modal to add new Seller */}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Property</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <br />
            <Form>
              <Form.Group className="mb-3" controlId="price1">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  id="price1"
                  type="text"
                  placeholder="Price"
                  defaultValue={editPropertyDetails.price}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="bedroom1">
                <Form.Label>Bedroom</Form.Label>
                <Form.Control
                  id="bedroom1"
                  type="number"
                  placeholder="Bedroom"
                  defaultValue={editPropertyDetails.bedroom}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="bathroom1">
                <Form.Label>Bathroom</Form.Label>
                <Form.Control
                  id="bathroom1"
                  type="number"
                  placeholder="Bathroom"
                  defaultValue={editPropertyDetails.bathroom}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="garden1">
                <Form.Label>Garden</Form.Label>
                <Form.Control
                  id="garden1"
                  type="number"
                  placeholder="Garden"
                  defaultValue={editPropertyDetails.garden}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="address1">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  id="address1"
                  type="text"
                  placeholder="Address"
                  defaultValue={editPropertyDetails.address}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="postcode1">
                <Form.Label>PostCode</Form.Label>
                <Form.Control
                  id="postcode1"
                  type="text"
                  placeholder="post code"
                  defaultValue={editPropertyDetails.postcode}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="type1">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  id="type1"
                  type="text"
                  placeholder="type"
                  defaultValue={editPropertyDetails.type}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={() => updateEditProperties()}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Row className="pt-4">
        {result.map((property) => (
          <Col key={property.id} className="pb-4" sm={6}>
            <Card className="">
              <Card.Body className="div1">
                <Card.Title className="title">
                  <img
                    alt="Img"
                    className="img-fluid object-cover"
                    src={property.image.url}
                  />
                </Card.Title>
                <Card.Text className="body1">
                  <>
                  <b> {property.type}</b> &nbsp;&nbsp; <b>{property.status}</b> 
                    
                    <br></br>
                    <b> <FontAwesomeIcon icon={faPoundSign} color="orange" /> </b> {property.price}
                   &nbsp;&nbsp;
                    <b> <FontAwesomeIcon icon={faBed} color="purple" /> </b> {property.bedroom}
                    <br></br>
                    <b> <FontAwesomeIcon icon={faBath} color="blue" /></b> {property.bathroom}
                    &nbsp;&nbsp;
                    <b> <FontAwesomeIcon icon={faTree} color="green"/> </b> {property.garden}
                    <br></br>
                    <b><FontAwesomeIcon icon={faMapMarkerAlt}  color ="red"/> </b> {property.address},
                    &nbsp;{property.postcode}
                    <br></br>
                    
                    <b>SellerID: </b> {property.sellerID}
                    <br></br>
                    
                   
                    <br></br>
                    {property.status === "FOR SALE" && (
                      <div className="block  ">
                        <Button
                          className="w-100 mb-4"
                          variant="success"
                          onClick={() => filterStatus("SOLD", property.id)}
                        >
                          Change to sold
                        </Button>

                        <Button
                          className="w-100"
                          variant="warning"
                          onClick={() => filterStatus("WITHDRAW", property.id)}
                        >
                          Withdraw
                        </Button>
                      </div>
                    )}
                    {property.status === "WITHDRAW" ||
                    property.status === "SOLD" ? (
                      <>
                        <Button
                          className="w-100"
                          variant="success"
                          onClick={() => filterStatus("FOR SALE", property.id)}
                        >
                          ReSubmit
                        </Button>
                      </>
                    ) : (
                      ""
                    )}
                    <Button
                      className="primary w-100 mt-4"
                      onClick={() => handleEdit(property)}
                    >
                      Edit
                    </Button>
                  </>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <br />
      <br />
    </div>
  );
}
export default PropertySearch;
