import React, { useState } from "react";
import * as Tone from "tone";
import { Button, Card, Form } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import VolumeControl from "./SynthComponents/VolumeControl";
import Keyboard from "./SynthComponents/Keyboard";
import OscillatorCard from "./SynthComponents/OscillatorCard";
import ADSRCard from "./SynthComponents/ADSRCard";
import FilterCard from "./SynthComponents/FilterCard";

const Sandbox = () => {
  const [mainWaveform, setMainWaveform] = useState("sawtooth");
  const [modulationWaveform, setModulationWaveform] = useState("sawtooth");
  const [volume, setVolume] = useState(100);
  //const [detuneValue, setDetuneValue] = useState(100);
  const [attackValue, setAttackValue] = useState(0);
  const [decayValue, setDecayValue] = useState(0);
  const [sustainValue, setSustainValue] = useState(1.0);
  const [releaseValue, setReleaseValue] = useState(1.0);
  const [filterFrequency, setFilterFrequency] = useState(0);
  const [filterType, setFilterType] = useState("highpass");
  const [rollOff, setRollOff] = useState(-12);

  const filter = new Tone.Filter(
    filterFrequency,
    filterType,
    rollOff
  ).toDestination();

  //Initializing Synth Settings
  const synthSettings = {
    oscillator: {
      //detune: detuneValue,
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
  };
  //Instantiating Synth Object
  const polySynth = new Tone.PolySynth(Tone.FMSynth, synthSettings).connect(
    filter
  );

  const playTone = (noteFrequency) => {
    polySynth.triggerAttackRelease(noteFrequency, attackValue + 0.01);
  };

  const oscillatorHandler = (event, oscillator) => {
    const { name } = event.currentTarget;
    if (oscillator === 1) {
      setMainWaveform(name);
    } else {
      setModulationWaveform(name);
    }
  };

  const filterHandler = (event) => {
    const { name } = event.currentTarget;
    setFilterType(name);
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
    if (name === "Frequency") {
      setFilterFrequency(value);
    }
  }

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
        <h1
          style={{ color: "white" }}
          className="text-3xl text-center font-bold"
        >
          Synth
        </h1>
      </Grid>
      <Grid item xs={12}>
        <Grid container alignItems="center" alignContent="center">
          <Grid item xs={4}>
            <OscillatorCard
              oscillatorTitle={"Oscillator 1"}
              oscillatorID={1}
              oscillatorHandler={oscillatorHandler}
            />
            <OscillatorCard
              oscillatorTitle={"Oscillator 2"}
              oscillatorID={2}
              oscillatorHandler={oscillatorHandler}
            />
          </Grid>
          <Grid item xs={4}>
            <ADSRCard knobHandler={knobHandler} />
          </Grid>
          <Grid
            item
            xs={2}
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Card id="volumeControlCard" bg="info">
              <VolumeControl volume={volume} setVolume={setVolume} />
            </Card>
            <Card id="filterCard" bg="info">
              <FilterCard
                knobHandler={knobHandler}
                filterHandler={filterHandler}
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
              style={{ width: Keyboard.keyboardWidth }}
            >
              <Card.Title id="envelope-label">Keyboard</Card.Title>
              <Form>
                <Keyboard playTone={playTone} />
              </Form>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Sandbox;
