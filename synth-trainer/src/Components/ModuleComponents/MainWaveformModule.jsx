import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import * as Tone from "tone";
import WaveformExample from "./WaveformExample";
import { navigate } from "@reach/router";
import { useEffect } from "react";
import { addInProgressModules, getModuleRef } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";
import { ModulationSynth } from "tone/build/esm/instrument/ModulationSynth";

const MainWaveformModule = (props) => {
  const user = useContext(UserContext);

  useEffect(() => {
    const initializeData = async () => {
      const result = await getModuleRef("MainWaveformModule");
      addInProgressModules(user, "MainWaveformModule");

      setModuleRef(result);
    };
    initializeData();
  }, []);

  const [moduleRef, setModuleRef] = useState(null);
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
      navigate(moduleRef.test_address);
      return;
    }
    setMainWaveform(name);
    playTone("c3");
  };
  if (moduleRef === undefined) {
    return <p>Loading</p>;
  }
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
