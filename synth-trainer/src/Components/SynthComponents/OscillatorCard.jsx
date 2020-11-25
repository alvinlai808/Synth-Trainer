import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

const OscillatorCard = ({
  oscillatorTitle,
  oscillatorID,
  oscillatorHandler,
}) => {
  return (
    <Card id="oscillator-card" className="text-center" bg="info">
      <Card.Title id="oscillator-label">{oscillatorTitle}</Card.Title>
      <Form>
        <Button
          name="square"
          onClick={(event) => oscillatorHandler(event, oscillatorID)}
        >
          Square
        </Button>
        <Button
          name="sawtooth"
          onClick={(event) => oscillatorHandler(event, oscillatorID)}
        >
          Saw
        </Button>
        <Button
          name="sine"
          onClick={(event) => oscillatorHandler(event, oscillatorID)}
        >
          Sine
        </Button>
      </Form>
    </Card>
  );
};

export default OscillatorCard;
