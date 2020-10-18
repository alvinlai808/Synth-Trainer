import React, { useState, useRef, useEffect } from "react";
import * as Tone from 'tone'
import {
  Button, 
  Card,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import Knob from "react-simple-knob";


const Sandbox = () => {
  const [waveform, setWaveform] = useState("sawtooth")
  const [attackValue, setAttackValue] = useState(0.01);
  const [decayValue, setDecayValue] = useState(1.0);
  const [sustainValue, setSustainValue] = useState(1.0);
  const [releaseValue, setReleaseValue] = useState(1.0);


  const playTone = () => {
    const synth = new Tone.MonoSynth({
      oscillator: {
        type: waveform
      },
      envelope: {
        attack: attackValue,
        decay: decayValue,
        sustain: sustainValue,
        release: releaseValue
      }
    }).toDestination();
    synth.triggerAttackRelease("C4", "2n");
  }

  const buttonClickHandler = (event) => {
    const { name } = event.currentTarget;
    if (name === "squareButton") {
      setWaveform("square");
    }    
    if (name === "sawtoothButton") {
      setWaveform("sawtooth");
    }
  }

  const style = {
    margin: "0.05%",
    height: "65px",
    fontFamily: "Arial",
    color: "black" // Sets font color of value and knob name
  };

  return (
    <div className="col-sm-12 my-auto">
      <h1 className="text-3xl mb-2 text-center font-bold">Sandbox</h1>
      <Card id="sandbox-card" className="text-center w-center">
        <Card.Title id="sandbox-label">*Insert Synth Type*</Card.Title>
        <Form>
          <Button onClick={(event) => {playTone();}}>Hello, Tone!</Button>
          <Button name="squareButton" onClick={(event) => buttonClickHandler(event)}>Square</Button>
          <Button name="sawtoothButton" onClick={(event) => buttonClickHandler(event)}>Saw</Button>
        </Form>
      </Card>
      <Card id="envelope-card" className="text-center w-center">
        <Card.Title id="envelope-lable">Amplitude Envelope</Card.Title>
        <Form>
          <Knob
            name="Volume"
            unit="dB"
            defaultPercentage={0.7}
            onChange={console.log}
            bg="gray"
            fg="white"
            mouseSpeed={5}
            transform={p => parseInt(p * 50, 10) - 50}
            style={style} 
          />
          <Knob
            name="Attack"
            unit="ms"
            defaultPercentage={0.7}
            onChange={console.log}
            bg="gray"
            fg="white"
            mouseSpeed={5}
            transform={p => parseInt(p * 50, 10) - 50}
            style={style} 
          />
          <Knob
            name="Decay"
            unit="ms"
            defaultPercentage={0.7}
            onChange={console.log}
            bg="gray"
            fg="white"
            mouseSpeed={5}
            transform={p => parseInt(p * 50, 10) - 50}
            style={style} 
          />
          <Knob
            name="Sustain"
            unit="ms"
            defaultPercentage={0.7}
            onChange={console.log}
            bg="gray"
            fg="white"
            mouseSpeed={5}
            transform={p => parseInt(p * 50, 10) - 50}
            style={style} 
          />
          <Knob
            name="Release"
            unit="ms"
            defaultPercentage={0.7}
            onChange={console.log}
            bg="gray"
            fg="white"
            mouseSpeed={5}
            transform={p => parseInt(p * 50, 10) - 50}
            style={style} 
          />
        </Form>
      </Card>
    </div>
  );
}
export default Sandbox;
