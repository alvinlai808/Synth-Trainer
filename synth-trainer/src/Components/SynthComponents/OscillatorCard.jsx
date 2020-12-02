import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

const OscillatorCard = ({
  //waveform,
  oscillatorTitle,
  oscillatorID,
  oscillatorHandler,
}) => {
  const [sawtoothColor, setSawtoothColor] = useState("black")
  const [squareColor, setSquareColor] = useState("dimgray")
  const [sineColor, setSineColor] = useState("dimgray")
  const [triangleColor, setTriangleColor] = useState("dimgray")

  const handlebuttonclick = (event) => {
    const { style, name } = event.currentTarget
    
    if(name === "square" && style.backgroundColor === squareColor){
      setSquareColor("black")
      setSawtoothColor("dimgray")
      setSineColor("dimgray")
      setTriangleColor("dimgray")
    }
    if(name === "sawtooth" && style.backgroundColor === sawtoothColor){
      setSquareColor("dimgray")
      setSawtoothColor("black")
      setSineColor("dimgray")
      setTriangleColor("dimgray")
    }
    if(name === "sine" && style.backgroundColor === sineColor){
      setSquareColor("dimgray")
      setSawtoothColor("dimgray")
      setSineColor("black")
      setTriangleColor("dimgray")
    }
    if(name === "triangle" && style.backgroundColor === triangleColor){
      setSquareColor("dimgray")
      setSawtoothColor("dimgray")
      setSineColor("dimgray")
      setTriangleColor("black")
    }
  };
  
  return (
    <Card id="oscillator-card" className="text-center" style={{backgroundColor:'white'}}>
      <Card.Title id="oscillator-label">{oscillatorTitle}</Card.Title>
      <Form>
        <Button
          style={{backgroundColor:squareColor}}
          name="square"
          onClick={(event) => {oscillatorHandler(event, oscillatorID); handlebuttonclick(event)}}
        >
          Square
        </Button>
        <Button
          style={{backgroundColor:sawtoothColor}}
          name="sawtooth"
          onClick={(event) => {oscillatorHandler(event, oscillatorID); handlebuttonclick(event)}}
        >
          Saw
        </Button>
        <Button
          style={{backgroundColor:sineColor}}
          name="sine"
          onClick={(event) => {oscillatorHandler(event, oscillatorID); handlebuttonclick(event)}}
        >
          Sine
        </Button>
        <Button
          style={{backgroundColor:triangleColor}}
          name="triangle"
          onClick={(event) => {oscillatorHandler(event, oscillatorID); handlebuttonclick(event)}}
        >
          Triangle
        </Button>
      </Form>
    </Card>
  );
};

export default OscillatorCard;

