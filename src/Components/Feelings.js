import React, { useState } from "react";
import "../stylesheets/homeScreen.css";
import Modal from "./Modal"

export default function Product(props) {
  const [show, setShow] = useState(false);

  const showDetails = () => {
    setShow(!show);
  };

  return (
    <div className="card">
      <img className="crop" src={props.product.image} />
      <div className="card-container">
        <h4 className="gradient">
          <b>{props.product.name}</b>
        </h4>
        <p>{props.product.location}</p>
        <button onClick={() => showDetails()} className="ui mini button">
          More Info
        </button>
        <button onClick={() => props.removeItem()} className="ui negative button mini">
          Delete
        </button>
        {show && <Modal details={props.product} action={showDetails}/>}
      </div>
    </div>
  );
}
