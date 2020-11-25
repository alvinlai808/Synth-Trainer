import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import { Card, Form } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import VolumeControl from "./SynthComponents/VolumeControl";
import Keyboard from "./SynthComponents/Keyboard";
import OscillatorCard from "./SynthComponents/OscillatorCard";
import ADSRCard from "./SynthComponents/ADSRCard";
import FilterCard from "./SynthComponents/FilterCard";
import VibratoCard from "./SynthComponents/VibratoCard";

const Sandbox = () => {
  //Oscillator Parameters
  const [mainWaveform, setMainWaveform] = useState("sawtooth");
  const [modulationWaveform, setModulationWaveform] = useState("sawtooth");
  //Volume
  const [volume, setVolume] = useState(100);
  //ADSR Parameters
  const [attackValue, setAttackValue] = useState(0);
  const [decayValue, setDecayValue] = useState(0);
  const [sustainValue, setSustainValue] = useState(1.0);
  const [releaseValue, setReleaseValue] = useState(1.0);
  //Filter Parameters
  const [filterFrequency, setFilterFrequency] = useState(0);
  const [filterType, setFilterType] = useState("highpass");
  const [rollOff, setRollOff] = useState(-12);
  //Vibrato Parameters
  const [vibratoEnabled, setVibratoEnabled] = useState(false);

  //Vibrato Effect
  const vibrato = new Tone.Vibrato({
    frequency: "1n",
    depth: 1,
  }).toDestination();

  //Filter Effect
  const filter = new Tone.Filter(
    filterFrequency,
    filterType,
    rollOff
  ).toDestination();

  //Initializing Synth Settings
  const synthSettings = {
    oscillator: {
      type: mainWaveform,
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
    volume: volume - 100,
  };

  //Instantiating Synth Object
  const polySynth = new Tone.PolySynth(Tone.FMSynth, synthSettings).chain(
    filter
  );

  //Handles generating notes
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

  const vibratoHandler = () => {
    if (!vibratoEnabled) {
      setVibratoEnabled(true);
    } else {
      setVibratoEnabled(false);
    }
  };

  //Turns Vibrato on or off. Depends on vibratoEnabled
  useEffect(() => {
    if (vibratoEnabled) {
      polySynth.chain(filter, vibrato, Tone.Destination);
    } else {
      polySynth.disconnect();
      //Tone's disconnect method disconnects all nodes
      //so we have to reconnect the ones we want manually
      polySynth.connect(filter); // <- reconnecting filter
    }
  }, [vibratoEnabled]);

  //Handles event from all knobs
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
          Sandbox
        </h1>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          alignItems="center"
          alignContent="center"
          xs={12}
          justify="center"
          spacing={2}
          direction="row"
        >
          <Grid
            item
            xs={2}
            justify="center"
            alignItems="center"
            direction="column"
          >
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
            <Card id="vibratoCard" bg="info">
              <VibratoCard vibratoHandler={vibratoHandler} />
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
