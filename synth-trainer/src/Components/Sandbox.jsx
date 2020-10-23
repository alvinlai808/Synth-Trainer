import React, { useState, useRef, useEffect } from "react";
import * as Tone from 'tone'
import {
  Button, 
  Card,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { Knob } from "react-rotary-knob";


const Sandbox = () => {
  const [waveform, setWaveform] = useState("sawtooth")
  let attackValue = 0.01;
  let decayValue = 1.0;
  let sustainValue = 1.0;
  let releaseValue = 1.0;

  //This is how we'd do it with hooks, but it seems like using 
  //hooks inside of class components is not great practice and
  //requires a work-around using HOC wrappers. I spent a LOT
  //of time trying to get that to work with no luck...
  //give it a shot if you want, I can try helping if needed -Andrey
  // const [attackValue, setAttackValue] = useState(0.01);
  // const [decayValue, setDecayValue] = useState(1.0);
  // const [sustainValue, setSustainValue] = useState(1.0);
  // const [releaseValue, setReleaseValue] = useState(1.0);

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

  function knobHandler() {
    const { name, value } = this
    if (name === "Attack") {
      attackValue = value/1000
    }
    if (name === "Decay") {
      decayValue = value/1000
    }
    if (name === "Sustain") {
      sustainValue = value/1000
    }
    if (name === "Release") {
      releaseValue = value/1000
    }
  }

  class LimitedKnob extends React.Component {
    constructor() {
      super();
      this.state = {
        value: 0
      };
      this.handleOnChange = this.handleOnChange.bind(this);
    }
  
    handleOnChange(val) {
      //ignore change if distance is greater than defined
      //here we use a distance of 200 because our max value is 1000
      //change if needed
      const maxDistance = 200;
      let distance = Math.abs(val - this.state.value);
      if (distance > maxDistance) {
        return;
      } else {
        this.setState({ value: val });
      }
      
    }
    render() {
      let { value, ...rest } = this.props;
      return (
        <div>
          {this.state.value.toFixed(0)} ms
          <div>
            <Knob value={this.state.value} onChange={this.handleOnChange} {...rest} />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="col-sm-12 my-auto">
      <h1 className="text-3xl mb-2 text-center font-bold">Sandbox</h1>
      <Card id="sandbox-card" className="text-center w-center" bg="light">
        <Card.Title id="sandbox-label">*Insert Synth Type*</Card.Title>
        <Form>
          <Button onClick={(event) => {playTone();}}>Hello, Tone!</Button>
          <Button name="squareButton" onClick={(event) => buttonClickHandler(event)}>Square</Button>
          <Button name="sawtoothButton" onClick={(event) => buttonClickHandler(event)}>Saw</Button>
        </Form>
      </Card>
      <div class="mx-auto" style={{width: "290px"}}>
      <Card id="envelope-card" className="text-center w-center" bg="info" style={{ width: '18rem' }}>
        <Card.Title id="envelope-label">ADSR Envelope</Card.Title>
        <Form>
          <div class="row">
            <div class="col">
            <h3 className="text-3xl mb-2 text-center font-bold">Attack</h3>
            <LimitedKnob
              name="Attack"
              value={100}
              style={{ display: "inline-block" }}
              min={0}
              max={1000}
              unlockDistance={0}
              preciseMode={false}
              onEnd={knobHandler}
              width={200}
              height={200}
            />
            </div>
            <div class="col">
            <h3 className="text-3xl mb-2 text-center font-bold">Decay</h3>
            <LimitedKnob
              name="Decay"
              value={100}
              style={{ display: "inline-block" }}
              min={0}
              max={1000}
              unlockDistance={0}
              preciseMode={false}
              onEnd={knobHandler}
              width={200}
              height={200}
            />
            </div>
            <div class="col">
            <h3 className="text-3xl mb-2 text-center font-bold">Sustain</h3>
            <LimitedKnob
              name="Sustain"
              value={100}
              style={{ display: "inline-block" }}
              min={0}
              max={1000}
              unlockDistance={0}
              preciseMode={false}
              onEnd={knobHandler}
              width={200}
              height={200}
            />
            </div>
            <div class="col">
            <h3 className="text-3xl mb-2 text-center font-bold">Release</h3>
            <LimitedKnob
              name="Release"
              value={100}
              style={{ display: "inline-block" }}
              min={0}
              max={1000}
              unlockDistance={0}
              preciseMode={false}
              onEnd={knobHandler}
              width={200}
              height={200}
            />
            </div>
          </div>
        </Form>
      </Card>
      </div>
    </div>
  );
}
export default Sandbox;
