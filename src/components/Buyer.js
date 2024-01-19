import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Card, Row, Col } from "react-bootstrap";

function Buyers() {
  //states defined for bootstrap modals
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate= useNavigate();
  const [show1, setShow1] = useState(false);
  const [buyerToDeleteId, setBuyerToDeleteId] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = (id) => {
    setBuyerToDeleteId(id);
    setShow1(true);
  };

  // useParams defined to delete by id
  const { id } = useParams();
  //states used for create and delete requests
  let [buyer, setBuyers] = useState([]);
  let [editBuyerDetails, setEditBuyerDetails] = useState([]);

  //Get Sellers
  useEffect(() => {
    fetch("http://localhost:3001/buyer", {
      method: "GET",
    }).then((response) => {
      response.json().then((data) => {
        setBuyers(data);
      });
    });
  }, []);

  //Add Sellers

  const getUpdatedData = () => {
    fetch("http://localhost:3001/buyer", {
      method: "GET",
    }).then((response) => {
      response.json().then((data) => {
        setBuyers(data);
      });
    });
  };
  let saveData = () => {
    try {
      if (editBuyerDetails.length === 0) {
        let check = buyer.filter(
          (s) =>
            s.firstName === document.getElementById("fname").value &&
            s.surname === document.getElementById("sname").value
        );
        if (check.length > 0) {
          alert("Buyer already exists");
        } else {
          let buyer = {
            firstName: document.getElementById("fname").value,

            surname: document.getElementById("sname").value,

            address: document.getElementById("address").value,

            postcode: document.getElementById("postcode").value,

            phone: document.getElementById("phone").value,
          };

          fetch("http://localhost:3001/buyer", {
            method: "POST",

            headers: { "Content-Type": "application/json" },

            body: JSON.stringify(buyer),
          });
          setShow(!show);
          getUpdatedData();
        }
      } else {
        updateBuyer();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = (data) => {
    setShow(!show);
    setEditBuyerDetails(data);
  };

  const updateBuyer = () => {
    let buyerData = {
      firstName: document.getElementById("fname").value,

      surname: document.getElementById("sname").value,

      address: document.getElementById("address").value,

      postcode: document.getElementById("postcode").value,

      phone: document.getElementById("phone").value,
    };

    fetch(`http://localhost:3001/buyer/${editBuyerDetails.id}`, {
      method: "PATCH",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(buyerData),
    });
    setShow(!show);
    getUpdatedData();
    navigate(0);
  };

  function deleteBuyer() {
    fetch(`http://localhost:3001/buyer/${buyerToDeleteId}`, {
      method: "Delete",
    }).then((response) => {
      setShow1(!show1);
      alert("DELETED");
      getUpdatedData();
      console.log(response);
    });
  }

  return (
    <>
      <br />
      <br />
      <div className="button-container">
        <Link to={"/buyer"} className="text-decoration-none">
          {/* Bootstrap modal to add new Buyer */}
          <button className="btn-primary btnSize" onClick={handleShow}>
            <FontAwesomeIcon icon={faUserPlus} size="2x" />
          </button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> Buyer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="fname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    id="fname"
                    type="text"
                    placeholder="Enter  First Name"
                    defaultValue={editBuyerDetails.firstName ? editBuyerDetails.firstName : ""}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="sname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    id="sname"
                    type="text"
                    placeholder="Enter Last Name"
                    defaultValue={editBuyerDetails.surname}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    id="address"
                    type="text"
                    placeholder="Address"
                    defaultValue={editBuyerDetails.address}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="postcode">
                  <Form.Label>PostCode</Form.Label>
                  <Form.Control
                    id="postcode"
                    type="text"
                    placeholder="post code"
                    defaultValue={editBuyerDetails.postcode}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    id="phone"
                    type="number"
                    placeholder="phone"
                    defaultValue={editBuyerDetails.phone}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={saveData}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </Link>
      </div>
      <br />
      <Row>
        {buyer.map((buy) => (
          <Col key={buy.id} sm={4}>
            <Card className="card1" >
              <Card.Header>
                <Card.Title className="title">
                  {" "}
                  <FontAwesomeIcon icon={faUserCircle} size="2xl" color="#44465d"/> {buy.firstName}{" "}
                  {buy.surname}
                </Card.Title>
                </Card.Header>
                <Card.Body >
                <Card.Text className="body1">
                  <Link
                    to={`/buyer/${buy.id}`}
                    className="text-decoration-none seller-card-text-color"
                  >
                    <b>FirstName : </b> {buy.firstName}
                    <br></br>
                    <b>LastName : </b> {buy.surname}
                    <br></br>
                    <b>Address : </b> {buy.address}
                    <br></br>
                    <b>Post Code : </b> {buy.postcode}
                    <br></br>
                    <b>Phone : </b> {buy.phone}
                  </Link>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <Button variant="primary" onClick={() => handleEdit(buy)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                &nbsp;
                <Button variant="danger" onClick={() => handleShow1(buy.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
                </Card.Footer>
              
            </Card>
          </Col>
        ))}
      </Row>
      <br />
      <br />

      {show1 && (
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Buyer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Warning:Buyer with id {buyerToDeleteId} will be deleted
            permanently.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Cancel
            </Button>
            <Button id="SaveChanges" variant="danger" onClick={deleteBuyer}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
export default Buyers;
