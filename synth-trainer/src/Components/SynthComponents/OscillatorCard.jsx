import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

const OscillatorCard = ({
  waveform,
  oscillatorTitle,
  oscillatorID,
  oscillatorHandler,
}) => {
  const [sawtoothColor, setSawtoothColor] = useState("red")
  const [squareColor, setSquareColor] = useState("blue")
  const [sineColor, setSineColor] = useState("blue")

  

  const handlebuttonclick = (event) => {
    const { style, name } = event.currentTarget
    if(name === "square" && style.backgroundColor === squareColor){
      setSquareColor("red")
      setSawtoothColor("blue")
      setSineColor("blue")
    }
    if(name === "sawtooth" && style.backgroundColor === sawtoothColor){
      setSquareColor("blue")
      setSawtoothColor("red")
      setSineColor("blue")
    }
    if(name === "sine" && style.backgroundColor === sineColor){
      setSquareColor("blue")
      setSawtoothColor("blue")
      setSineColor("red")
    }
  };
  return (
    <Card id="oscillator-card" className="text-center" bg="info">
      <Card.Title id="oscillator-label">{oscillatorTitle}</Card.Title>
      <Form>
        <Button
          variant={waveform === "sine" ? "success" : "primary"}
          style={{backgroundColor:squareColor}}
          name="square"
          onClick={(event) => {oscillatorHandler(event, oscillatorID); handlebuttonclick(event)}}
        >
          Square
        </Button>
        <Button
          variant={waveform === "sine" ? "success" : "primary"}
          style={{backgroundColor:sawtoothColor}}
          name="sawtooth"
          onClick={(event) => {oscillatorHandler(event, oscillatorID); handlebuttonclick(event)}}
        >
          Saw
        </Button>
        <Button
          variant={waveform === "sine" ? "success" : "primary"}
          style={{backgroundColor:sineColor}}
          name="sine"
          onClick={(event) => {oscillatorHandler(event, oscillatorID); handlebuttonclick(event)}}
        >
          Sine
        </Button>
      </Form>
    </Card>
  );
};

export default OscillatorCard;

//variant={waveform === "sine" ? "success" : "primary"}
