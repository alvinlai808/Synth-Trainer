import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import PlayArrow from "@material-ui/icons/PlayArrow";
import * as Tone from "tone";
import VolumeControl from "../SynthComponents/VolumeControl";
import Grid from "@material-ui/core/Grid";
import WaveformExample from "./WaveformExample";

const MainWaveformModule = () => {
  //Oscillator Parameters
  const [mainWaveform, setMainWaveform] = useState("sawtooth");
  //Volume
  const [volume, setVolume] = useState(100);

  //Initializing Synth Settings
  const synthSettings = {
    oscillator: {
      type: mainWaveform,
    },
    volume: 50,
  };

  //Instantiating Synth Object
  const polySynth = new Tone.PolySynth(Tone.FMSynth, synthSettings);
  //Handles generating notes
  const playTone = (noteFrequency) => {
    polySynth.triggerAttackRelease(noteFrequency, 0.5);
  };

  const buttonHandler = (event) => {
    const { name } = event.currentTarget;
    setMainWaveform(name);
    playTone("c3");
  };

  return (
    <div>
      <h2>Intro</h2>
      <h2>Sine Wave</h2>
      <WaveformExample
        waveform="sine"
        message="Click the button to hear a C3 note with a sine waveform"
        volume={volume}
        setVolume={setVolume}
        buttonHandler={buttonHandler}
      />
      <h2>Square Wave</h2>
      <WaveformExample
        waveform="square"
        message="Click the button to hear a C3 note with a square waveform"
        volume={volume}
        setVolume={setVolume}
        buttonHandler={buttonHandler}
      />
      <h2>Sawtooth Wave</h2>
      <WaveformExample
        waveform="sawtooth"
        message="Click the button to hear a C3 note with a sawtooth waveform"
        volume={volume}
        setVolume={setVolume}
        buttonHandler={buttonHandler}
      />
      <Button>Take the Test!</Button>
    </div>
  );
};

export default MainWaveformModule;
