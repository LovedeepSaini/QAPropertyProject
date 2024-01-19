import Form from "react-bootstrap/Form";
import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faSearch,
  faCheckCircle,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

const Property = ({ searchHandler, updateProperties }) => {
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const refType = useRef();
  const refAddress = useRef();
  const refBedroom = useRef();
  const refBathroom = useRef();
  const refGarden = useRef();
  const refPrice = useRef();
  const refStatus = useRef();
  const refPostcode = useRef();

  const findProperties = () => {
    searchHandler({
      type: refType.current.value,
      bedroom: refBedroom.current.value,
      bathroom: refBathroom.current.value,
      garden: refGarden.current.value,
      price: refPrice.current.value,
      
    });
  };

  const reset = () => {
    refType.current.value = "ANY";
    refBedroom.current.value = 0;
    refBathroom.current.value = 0;
    refGarden.current.value = 0;
    refPrice.current.value = 0;
    updateProperties();
  };

  return (
    <>
      <br></br>
      <h3 className="heading">Property Search and Bookings</h3>
      <br></br>
      <div className="align1">
       <b>Type </b> &nbsp;
        <Form.Select
          id="type"
          className="searchBar"
          ref={refType}
          aria-label=""
        >
          <option value="ANY">Any</option>
          <option value="DETACHED">Detached</option>
          <option value="SEMI">Semi</option>
          <option value="APARTMENT">Apartment</option>
        </Form.Select>
       <b>Price</b> &nbsp;
        <Form.Select
          id="price"
          className="searchBar"
          ref={refPrice}
          aria-label=""
        >
          <option value="0">Any</option>
          <option value="50000"> Up to 50000</option>
          <option value="100000">Up to 100000</option>
          <option value="200000">Up to 200000</option>
          <option value="300000">Up to 300000</option>
          <option value="400000"> up to 400000</option>
        </Form.Select>
        <b>Bedroom</b>&nbsp;
        <Form.Select
          id="bedroom"
          className="searchBar"
          ref={refBedroom}
          aria-label=""
        >
          <option value="0">Any</option>
          <option value="1">Mininmum One</option>
          <option value="2"> Minimum Two</option>
          <option value="3">Minimum Three</option>
          <option value="3">Minimum Four</option>
          <option value="3">Minimum Five</option>
        </Form.Select>
       <b> Bathrooms</b>&nbsp; 
        <Form.Select
          id="bathroom"
          className="searchBar"
          ref={refBathroom}
          aria-label=""
        >
          <option value="0">Any</option>
          <option value="1">Mininmum One</option>
          <option value="2"> Minimum Two</option>
          <option value="3">Minimum Three</option>
        </Form.Select>
        <b>Garden</b>&nbsp;
        <Form.Select
          id="garden"
          className="searchBar"
          ref={refGarden}
          aria-label=""
        >
          <option value="0">Any</option>
          <option value="1">Yes</option>
          <option value="2">No</option>
        </Form.Select>
      </div>{" "}
      <br />
      <div className="button-container">
        <button
          type="button"
          className="btn-primary btnSize center"
          onClick={() => findProperties()}
        >
          <FontAwesomeIcon icon={faSearch} size="2x" />
        </button>
        <button className="btn-primary btnSize center" onClick={reset}>
          <FontAwesomeIcon icon={faCheckCircle}  size= "2x"/>
        </button>
      
      </div>
    </>
  );
};
export default Property;
