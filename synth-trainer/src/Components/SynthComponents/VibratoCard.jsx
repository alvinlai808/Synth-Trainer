import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

const VibratoCard = ({ vibratoHandler }) => {
  return (
    <Card id="chorus-card" className="text-center" bg="info">
      <Card.Title id="chorus-label" />
      <Form>
        <Button name="vibrato" onClick={(event) => vibratoHandler(event)}>
          Vibrato
        </Button>
      </Form>
    </Card>
  );
};

export default VibratoCard;
