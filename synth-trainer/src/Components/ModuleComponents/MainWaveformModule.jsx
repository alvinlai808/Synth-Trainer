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
  let mainWaveform = "";
  //Volume
  const [volume, setVolume] = useState(100);

  const [playingSound, setPlayingSound] = useState(false);

  //Initializing Synth Settings
  let synthSettings = {};
  let polySynth = null;

  const createSynth = () => {
    synthSettings = {
      oscillator: {
        type: mainWaveform,
      },
      volume: volume - 100,
    };
    polySynth = new Tone.PolySynth(Tone.FMSynth, synthSettings).toDestination();
  };
  //Instantiating Synth Object

  //Handles generating notes
  const playTone = (noteFrequency) => {
    setPlayingSound(true);
    polySynth.triggerAttackRelease(noteFrequency, 1);
    setPlayingSound(false);
  };

  const buttonHandler = (event) => {
    const { name } = event.currentTarget;
    if (name === "next") {
      navigate(moduleRef.test_address);
      return;
    }
    mainWaveform = name;
    createSynth();
    playTone("C4");
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
        disabled={playingSound}
      />
      <h2>Square Wave</h2>
      <WaveformExample
        waveform="square"
        message="Click the button to hear a C3 note with a square waveform"
        volume={volume}
        setVolume={setVolume}
        buttonHandler={buttonHandler}
        disabled={playingSound}
      />
      <h2>Sawtooth Wave</h2>
      <WaveformExample
        waveform="sawtooth"
        message="Click the button to hear a C3 note with a sawtooth waveform"
        volume={volume}
        setVolume={setVolume}
        buttonHandler={buttonHandler}
        disabled={playingSound}
      />
      <Button onClick={buttonHandler} name="next">
        Take the Test!
      </Button>
    </div>
  );
};

export default MainWaveformModule;
