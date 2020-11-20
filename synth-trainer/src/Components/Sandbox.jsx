import React, { useState } from "react";
import * as Tone from "tone";
import { Button, Card, Form } from "react-bootstrap";
import LimitedKnob from "./LimitedKnob";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import "./Keyboard.css";
import Grid from "@material-ui/core/Grid";
import VolumeControl from "./VolumeControl";

const Sandbox = () => {
  const [mainWaveform, setMainWaveform] = useState("sawtooth");
  const [modulationWaveform, setModulationWaveform] = useState("sawtooth");
  const [volume, setVolume] = useState(100);
  const [attackValue, setAttackValue] = useState(0);
  const [decayValue, setDecayValue] = useState(1.0);
  const [sustainValue, setSustainValue] = useState(1.0);
  const [releaseValue, setReleaseValue] = useState(1.0);

  //Initializing Synth Settings
  const synthSettings = {
    oscillator: {
      type: mainWaveform,
      //count: mainWaveCount
    },
    envelope: {
      attack: attackValue,
      decay: decayValue,
      sustain: sustainValue,
      release: releaseValue,
    },
    modulation: {
      type: modulationWaveform,
    },
    modulationEnvelope: {
      attack: 0.5,
      decay: 0.5,
      sustain: 0.5,
      release: 0.5,
    }, 
    //harmonicity: 10,
    volume: volume - 100,
  }
  //Initializing Synth Object
  const polySynth = new Tone.PolySynth(Tone.AMSynth, synthSettings).toDestination();

  const playTone = (noteFrequency) => {
    polySynth.triggerAttackRelease(noteFrequency, attackValue + 0.01);
  };

  const buttonClickHandler = (event, oscillator) => {
    const { name } = event.currentTarget;
    if (oscillator === 1) {
      setMainWaveform(name)
    } else {
      setModulationWaveform(name)
    }
  };

  function knobHandler() {
    const { name, value } = this;
    if (name === "Attack") {
      setAttackValue(value / 1000);
    }
    if (name === "Decay") {
      setDecayValue(value / 1000);
    }
    if (name === "Sustain") {
      setSustainValue(value / 1000);
    }
    if (name === "Release") {
      setReleaseValue(value / 1000);
    }
  }

  //Keyboard Properties:
  //(ugly and needs to be turned into a component) -Andrey
  const keyboardWidth = 1000;
  const firstNote = MidiNumbers.fromNote("c3");
  const lastNote = MidiNumbers.fromNote("f4");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  return (
    <Grid
      container
      alignItems="center"
      alignContent="center"
      xs={12}
      justify="center"
      spacing={2}
      direction="row"
    >
      <Grid item xs={12}>
        <h1 className="text-3xl text-center font-bold">Sandbox</h1>
      </Grid>
      <Grid item xs={12}>
        <Grid container alignItems="center" alignContent="center">
          <Grid item xs={4}>
            <Card
              id="sandbox-card"
              className="text-center"
              bg="info"
            >
              <Card.Title id="sandbox-label">Main Oscillator</Card.Title>
              <Form>
                <Button
                  name="square"
                  onClick={(event) => buttonClickHandler(event, 1)} 
                >
                  Square
                </Button>
                <Button
                  name="sawtooth"
                  onClick={(event) => buttonClickHandler(event, 1)}
                >
                  Saw
                </Button>
                <Button
                  name="sine"
                  onClick={(event) => buttonClickHandler(event, 1)}
                >
                  Sine
                </Button>
              </Form>
              <Card.Title id="sandbox-label">Modulation Oscillator</Card.Title>
              <Form>
                <Button
                  name="square"
                  onClick={(event) => buttonClickHandler(event, 2)}
                >
                  Square
                </Button>
                <Button
                  name="sawtooth"
                  onClick={(event) => buttonClickHandler(event, 2)}
                >
                  Saw
                </Button>
                <Button
                  name="sine"
                  onClick={(event) => buttonClickHandler(event, 2)}
                >
                  Sine
                </Button>
              </Form>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card
              id="envelope-card"
              className="text-center"
              bg="info"
            >
              <Card.Title id="envelope-label">ADSR Envelope</Card.Title>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <h3 className="text-3xl font-bold">Attack</h3>
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
                </Grid>
                <Grid item xs={6}>
                  <h3 className="text-3xl font-bold">Decay</h3>
                  <LimitedKnob
                    name="Decay"
                    value={100}
                    style={{ display: "inline-block" }}
                    min={0}
                    max={5000}
                    unlockDistance={0}
                    preciseMode={false}
                    onEnd={knobHandler}
                    width={200}
                    height={200}
                  />
                </Grid>
                <Grid item xs={6}>
                  <h3 className="text-3xl font-bold">Sustain</h3>
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
                </Grid>
                <Grid item xs={6}>
                  <h3 className="text-3xl font-bold">Release</h3>
                  <LimitedKnob
                    name="Release"
                    value={100}
                    style={{ display: "inline-block" }}
                    min={0}
                    max={5000}
                    unlockDistance={0}
                    preciseMode={false}
                    onEnd={knobHandler}
                    width={200}
                    height={200}
                  />
                </Grid>
                
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card id="volumeControlCard" bg="info">
              <VolumeControl 
                volume={volume}
                setVolume={setVolume}
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>
      {/*Keyboard*/}
      <Grid item>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <Card
              id="keyboard-card"
              className="text-center"
              bg="info"
              style={{ width: keyboardWidth }}
            >
              <Card.Title id="envelope-label">Keyboard</Card.Title>
              <Form>
                <Piano
                  className="PianoDarkTheme"
                  noteRange={{ first: firstNote, last: lastNote }}
                  width={keyboardWidth}
                  keyboardShortcuts={keyboardShortcuts}
                  playNote={(midiNumber) => {
                    playTone(Tone.Midi(midiNumber).toFrequency());
                  }}
                  stopNote={(midiNumber) => {
                    // Function used to stop a note (might be useful for noise gating).
                    // Not using it atm, but it has to be defined -Andrey
                  }}
                />
              </Form>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Sandbox;