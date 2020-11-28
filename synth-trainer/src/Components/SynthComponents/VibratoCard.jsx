import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

const VibratoCard = ({ vibratoHandler }) => {
  const [vibratoColor, setVibratoColor] = useState("blue")
  
  const handlebuttonclick = (event) => {
    const { style } = event.currentTarget
    if(style.backgroundColor === vibratoColor){
      setVibratoColor("red")
    }
    if(style.backgroundColor === "red"){
      setVibratoColor("blue")
    }

  };

  return (
    <Card id="chorus-card" className="text-center" bg="info">
      <Card.Title id="chorus-label" />
      <Form>
        <Button 
          style={{backgroundColor:vibratoColor}}
          name="vibrato" 
          onClick={(event) => {vibratoHandler(event); handlebuttonclick(event)}}>
          Vibrato
        </Button>
      </Form>
    </Card>
  );
};

export default VibratoCard;
