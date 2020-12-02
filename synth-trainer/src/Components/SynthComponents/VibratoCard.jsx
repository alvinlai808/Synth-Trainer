import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

const VibratoCard = ({ vibratoHandler }) => {
  const [vibratoColor, setVibratoColor] = useState("dimgray")
  
  const handlebuttonclick = (event) => {
    const { style } = event.currentTarget
    if(style.backgroundColor === vibratoColor){
      setVibratoColor("black")
    }
    if(style.backgroundColor === "black"){
      setVibratoColor("dimgray")
    }

  };

  return (
    <Card id="chorus-card" className="text-center" bg="light">
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
