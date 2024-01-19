import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import GetSellers from "./GetSellers";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";

function SellerDetails() {
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const navigate = useNavigate();

  const { id } = useParams();
  const [result, setResult] = useState([]);
  let [seller, setSeller] = useState([]);

  const refType = useRef();
  const refAddress = useRef();
  const refBedroom = useRef();
  const refBathroom = useRef();
  const refGarden = useRef();
  const refPrice = useRef();
  const refPostcode = useRef();

  const images = [
    {
      id: 1,
      url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      url: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 3,
      url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 4,
      url: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 5,
      url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 6,
      url: "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 7,
      url: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 8,
      url: "https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 9,
      url: "https://images.pexels.com/photos/11018238/pexels-photo-11018238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 10,
      url: "https://images.pexels.com/photos/3958954/pexels-photo-3958954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 11,
      url: "https://images.pexels.com/photos/3935320/pexels-photo-3935320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 12,
      url: "https://images.pexels.com/photos/1105754/pexels-photo-1105754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];
  let createProperty = () => {
    try {
      let property = {
        address: refAddress.current.value,
        postcode: refPostcode.current.value,
        price: refPrice.current.value,
        bedroom: refBedroom.current.value,
        bathroom: refBathroom.current.value,
        garden: refGarden.current.value,
        type: refType.current.value,
        status: "FOR SALE",
        sellerID: id,
        image: images[Math.floor(Math.random() * images.length)],
      };

      fetch(`http://localhost:3001/property`, {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(property),
      });
      setShow2(!show2);
      navigate("/property");
      updateProperties();
    } catch (e) {
      console.log(e);
    }
  };
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
  useEffect(() => {
    fetch(`http://localhost:3001/seller/${id}`, {
      method: "GET",
    }).then((response) => {
      response.json().then((data) => {
        setSeller(data);
      });
    });
  }, []);
  console.log(seller);

  return (
    <>
      <div className="container mt-4">
        <Card className="card1 my-4">
          <Card.Body className="div1">
            <Card.Title className="h2">
              {" "}
              <img
                alt="Img"
                className="img-fluid object-cover"
                src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
              {seller.firstName} {seller.surname}
            </Card.Title>
            <Card.Text className="body1">
              <>
                <b>FirstName : </b> {seller.firstName}
                <br></br>
                <b>LastName : </b> {seller.surname}
                <br></br>
                <b>Address : </b> {seller.address}
                <br></br>
                <b>Post Code : </b> {seller.postcode}
                <br></br>
                <b>Phone : </b> {seller.phone}
              </>
            </Card.Text>
          </Card.Body>
        </Card>

        <Button className="mb-4 btn-primary w-100 text-center" onClick={handleShow2}>
          {/* <FontAwesomeIcon icon={faHome} size="2x" /> */}
          Add new property
        </Button>
      </div>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Add Property </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                id="price"
                type="text"
                placeholder="Price"
                ref={refPrice}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bedroom">
              <Form.Label>Bedroome</Form.Label>
              <Form.Control
                id="bedroom"
                type="number"
                placeholder="Bedroom"
                ref={refBedroom}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bathroom">
              <Form.Label>Bathroom</Form.Label>
              <Form.Control
                id="bathroom"
                type="number"
                placeholder="Bathroom"
                ref={refBathroom}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="garden">
              <Form.Label>Garden</Form.Label>
              <Form.Control
                id="garden"
                type="number"
                placeholder="Garden"
                ref={refGarden}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                id="address"
                type="text"
                placeholder="Address"
                ref={refAddress}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postcode">
              <Form.Label>PostCode</Form.Label>
              <Form.Control
                id="postcode"
                type="text"
                placeholder="post code"
                ref={refPostcode}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                id="type"
                type="text"
                placeholder="type"
                ref={refType}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={createProperty}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default SellerDetails;
