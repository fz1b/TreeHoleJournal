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
      <img className="crop" src={props.feelings.image} />
      <div className="card-container">
        <h4 className="gradient">
          <b>{props.feelings.name}</b>
        </h4>
        <p>{props.feelings.weather}</p>
        <button onClick={() => showDetails()} className="ui mini button">
          More Info
        </button>
        <button onClick={() => props.removeItem()} className="ui negative button mini">
          Delete
        </button>
        {show && <Modal details={props.feelings} action={showDetails}/>}
      </div>
    </div>
  );
}
