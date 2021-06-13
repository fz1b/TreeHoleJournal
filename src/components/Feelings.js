import React, { useState } from "react";
import Modal from "./Modal";
import styled from "styled-components";

export default function Product(props) {
  const [show, setShow] = useState(false);

  const showDetails = () => {
    setShow(!show);
  };

  const Image = styled.img`
    width: 100%;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  `;

  const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    -webkit-transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
    border-radius: 10px;
    position: relative;
    margin: 20px;
    min-height: 120px;
    max-width: 400px;
    float: left;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue";
    -webkit-font-smoothing: antialiased;

    :hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
  `;

  const EntryTitle = styled.h4`
    margin-top: 5px;
    font-size: 1.3em;
    font-weight: 600;
    color: #1d1d1f;
  `;

  const CardContainer = styled.div`
    padding: 10px 16px;
    text-align: left;
  `;

  const Weather = styled.p`
    font-size: 13px;
    font-weight: 300;
    color: #1d1d1f;
  `;

  return (
    <Card>
      <Image src={props.feelings.image} />
      <CardContainer>
        <EntryTitle>{props.feelings.name}</EntryTitle>
        <Weather>{props.feelings.weather}</Weather>
        <button onClick={() => showDetails()} className="ui mini button">
          More Info
        </button>
        <button
          onClick={() => props.removeItem()}
          className="ui negative button mini"
        >
          Delete
        </button>
        {show && <Modal details={props.feelings} action={showDetails} />}
      </CardContainer>
    </Card>
  );
}
