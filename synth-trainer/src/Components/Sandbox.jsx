//We'll probably want to refactor most of this sooner or later
import React, { useState } from "react";
import * as Tone from 'tone'
import { Button, Card, Form } from "react-bootstrap";
import LimitedKnob from "./LimitedKnob"
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import './Keyboard.css';

const Sandbox = () => {
  const [waveform, setWaveform] = useState("sawtooth")
  let attackValue = 0.01;
  let decayValue = 1.0;
  let sustainValue = 1.0;
  let releaseValue = 1.0;

  //This is how we'd do it with hooks, but it seems like using 
  //hooks inside of class components is not great practice and
  //requires a work-around using HOC wrappers -Andrey
  // const [attackValue, setAttackValue] = useState(0.01);
  // const [decayValue, setDecayValue] = useState(1.0);
  // const [sustainValue, setSustainValue] = useState(1.0);
  // const [releaseValue, setReleaseValue] = useState(1.0);

  const playTone = (noteFrequency) => {
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
    synth.triggerAttackRelease(noteFrequency, "2n");
  }

  const buttonClickHandler = (event) => {
    const { name } = event.currentTarget;
    if (name === "squareButton") {
      setWaveform("square");
    }    
    if (name === "sawtoothButton") {
      setWaveform("sawtooth");
    }
    if (name === "sineButton") {
      setWaveform("sine");
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

  //Keyboard Properties:
  //(ugly and needs to be turned into a component) -Andrey
  const keyboardWidth = 1000;
  const firstNote = MidiNumbers.fromNote('c3');
  const lastNote = MidiNumbers.fromNote('f4');
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  return (
    <div className="col-sm-12 my-auto">
      <h1 className="text-3xl mb-2 text-center font-bold">Sandbox</h1>
      <Card id="sandbox-card" className="text-center w-center" bg="light">
        <Card.Title id="sandbox-label">*Insert Synth Type*</Card.Title>
        <Form>
          <Button name="squareButton" onClick={(event) => buttonClickHandler(event)}>Square</Button>
          <Button name="sawtoothButton" onClick={(event) => buttonClickHandler(event)}>Saw</Button>
          <Button name="sineButton" onClick={(event) => buttonClickHandler(event)}>Sine</Button>
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
      </div >
      {/* Still needs to be centered */}
      <Card id="keyboard-card" className="text-center w-center" bg="info" style={{ width: keyboardWidth }}>
        <Card.Title id="envelope-label">Keyboard</Card.Title>
        <Form>
          <Piano className="PianoDarkTheme"
          noteRange={{ first: firstNote, last: lastNote }}
          width={keyboardWidth}
          keyboardShortcuts={keyboardShortcuts}
          playNote={(midiNumber) => {
            playTone(Tone.Midi(midiNumber).toFrequency())
          }}
          stopNote={(midiNumber) => {
            // Function used to stop a note (might be useful for noise gating).
            // Not using it atm, but it has to be defined -Andrey 
          }}
          />
        </Form>
      </Card>
    </div>
  );
}
export default Sandbox;
