import { useEffect, useState } from "react";
import { useParams, Link, useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Card, Row, Col } from "react-bootstrap";

function GetSellers() {
  //states defined for bootstrap modals
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate= useNavigate();
  const [show1, setShow1] = useState(false);
  const [sellerToDeleteId, setSellerToDeleteId] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = (id) => {
    setSellerToDeleteId(id);
    setShow1(true);
  };

  // useParams defined to delete by id
  const { id } = useParams();
  //states used for create and delete requests
 
  let [editSellerDetails, setEditSellerDetails] = useState([]);
  let [seller, setSellers] = useState([]);
  //Get Sellers
  useEffect(() => {
    fetch("https://localhost:7203/seller", {
      mode: 'cors',
      method: "GET",
    }).then((response) => {
      response.json().then((data) => {
        setSellers(data);
      });
    });
  }, []);

  //Add Sellers

  const getUpdatedData = () => {
    fetch("https://localhost:7203/seller", {
      mode: 'cors',
      method: "GET",
    }).then((response) => {
      response.json().then((data) => {
        setSellers(data);
      });
    });
  };

  //filter seller by first and last name

  let saveData = () => {
    try {
      if (editSellerDetails.length === 0) {
        let check = seller.filter(
          (s) =>
            s.firstName === document.getElementById("fname").value &&
            s.surname === document.getElementById("sname").value
        );

        if (check.length > 0) {
          alert("Seller already exists");
        } else {
          let seller = {
            firstName: document.getElementById("fname").value,

            surname: document.getElementById("sname").value,

            address: document.getElementById("address").value,

            postcode: document.getElementById("postcode").value,

            phone: document.getElementById("phone").value,
          };

          fetch("https://localhost:7203/seller", {
            mode: 'cors',
            method: "POST",

            headers: { "Content-Type": "application/json" },

            body: JSON.stringify(seller),
          });
          setShow(!show);
          getUpdatedData();
        }
      } else {
        updateSeller();
      }
    } catch (e) {
      console.log(e);
    }
  };

  function deleteSellers() {
    fetch(`https://localhost:7203/seller/${sellerToDeleteId}`, {
      mode: 'cors',
      method: "Delete",
    }).then((response) => {
      setShow1(!show1);
      alert("DELETED");
      getUpdatedData();
      console.log(response);
    });
  }

  const handleEdit = (data) => {
    setShow(!show);
    setEditSellerDetails(data);
  };

  const updateSeller = () => {
    let seller = {
      firstName: document.getElementById("fname").value,

      surname: document.getElementById("sname").value,

      address: document.getElementById("address").value,

      postcode: document.getElementById("postcode").value,

      phone: document.getElementById("phone").value,
    };

    fetch(`https://localhost:7203/seller/${editSellerDetails.id}`, {
      mode: 'cors',
      method: "PATCH",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(seller),
    });
    setShow(!show);
    getUpdatedData();
    navigate(0);
  };

  console.log(editSellerDetails);

  return (
    <>
      <br />
      <br />
      <div className="button-container">
        <Link to={"/seller"} className="text-decoration-none">
          {/* Bootstrap modal to add new Seller */}
          <button className="btn-primary btnSize" onClick={handleShow}>
            <FontAwesomeIcon icon={faUserPlus} size="2x" />
          </button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Seller</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <br />
              <Form>
                <Form.Group className="mb-3" controlId="fname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    id="fname"
                    type="text"
                    placeholder="Enter  First Name"
                    defaultValue={editSellerDetails.firstName}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="sname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    id="sname"
                    type="text"
                    placeholder="Enter Last Name"
                    defaultValue={editSellerDetails.surname}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    id="address"
                    type="text"
                    placeholder="Address"
                    defaultValue={editSellerDetails.address}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="postcode">
                  <Form.Label>PostCode</Form.Label>
                  <Form.Control
                    id="postcode"
                    type="text"
                    placeholder="post code"
                    defaultValue={editSellerDetails.postcode}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    id="phone"
                    type="number"
                    placeholder="phone"
                    defaultValue={editSellerDetails.phone}
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
        {seller.map((sell) => (
          <Col key={sell.id} sm={4}>
            <Card className="card1" >
              <Card.Header >
                <Card.Title className="title1 ">
                  {" "}
                  <FontAwesomeIcon icon={faUserCircle} size="2xl" color="#44465d" /> {sell.firstName}{" "}
                  {sell.surname}
                </Card.Title>
                </Card.Header>
                <Card.Body >
                <Card.Text className="body1 ">
                  <Link
                    to={`/seller/${sell.id}`}
                    className="text-decoration-none seller-card-text-color"
                  >
                    <b>FirstName : </b> {sell.firstName}
                    <br></br>
                    <b>LastName : </b> {sell.surname}
                    <br></br>
                    <b>Address : </b> {sell.address}
                    <br></br>
                    <b>Post Code : </b> {sell.postcode}
                    <br></br>
                    <b>Phone : </b> {sell.phone}
                  </Link>
                </Card.Text>
                </Card.Body>
              <Card.Footer>
                <Button variant="primary" onClick={() => handleEdit(sell)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                &nbsp;
                <Button variant="danger" onClick={() => handleShow1(sell.id)}>
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
            <Modal.Title>Delete Sellers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Warning:Seller with id {sellerToDeleteId} will be deleted
            permanently
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Cancel
            </Button>
            <Button id="SaveChanges" variant="danger" onClick={deleteSellers}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
export default GetSellers;
