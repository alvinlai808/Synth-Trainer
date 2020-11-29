import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import * as Tone from "tone";
import WaveformExample from "./WaveformExample";
import { navigate } from "@reach/router";
import { useEffect } from "react";
import { addInProgressModules } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";

const MainWaveformModule = (props) => {
  const user = useContext(UserContext);
  addInProgressModules(user, "MainWaveformModule");

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
    if (name === "next") {
      navigate("/module1/test");
      return;
    }
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
      <Button onClick={buttonHandler} name="next">
        Take the Test!
      </Button>
    </div>
  );
};

export default MainWaveformModule;
