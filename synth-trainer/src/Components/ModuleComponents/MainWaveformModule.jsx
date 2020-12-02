import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import * as Tone from "tone";
import WaveformExample from "./WaveformExample";
import { navigate } from "@reach/router";
import { useEffect } from "react";
import { addInProgressModules, getModuleRef } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";
import Grid from "@material-ui/core/Grid";

const MainWaveformModule = (props) => {
  const user = useContext(UserContext);

  useEffect(() => {
    const initializeData = async () => {
      const result = await getModuleRef("MainWaveformModule");
      addInProgressModules(user, "MainWaveformModule");

      setModuleRef(result);
    };
    initializeData();
  }, [user]);

  const [moduleRef, setModuleRef] = useState(null);
  //Oscillator Parameters
  let mainWaveform = "";
  //Volume
  const [volume, setVolume] = useState(100);

  let playingSound = false;
  const PLAYING_TIME = 1;
  let synthSettings = {};
  let polySynth = new Tone.PolySynth(
    Tone.FMSynth,
    synthSettings
  ).toDestination();

  const createSynth = () => {
    synthSettings = {
      oscillator: {
        type: mainWaveform,
      },
      volume: volume - 100,
    };
    polySynth.set(synthSettings);
  };

  //Handles generating notes
  const playTone = (noteFrequency) => {
    if (!playingSound) {
      playingSound = true;
      polySynth.triggerAttackRelease(noteFrequency, PLAYING_TIME);
      setTimeout(() => (playingSound = false), PLAYING_TIME * 1000);
    }
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
      <Grid
        container
        md={4}
        justify="center"
        alignItems="center"
        alignContent="center"
        direction="column"
      >
        <h2
          style={{ color: "white" }}
          className="text-3xl text-center font-bold"
        >
          Intro: Basic Waveforms
        </h2>
        <p
          style={{ color: "white" }}
          className="text-3xl text-center font-bold"
        >
          Oscillators are the fundamental building blocks of a synths. The word
          “oscillator” sounds complicated, but it’s a fancy word with a simple
          meaning. An oscillator creates a sound.
        </p>
        <p></p>
        <h2
          style={{ color: "white" }}
          className="text-3xl text-center font-bold"
        >
          Sine Wave
        </h2>
        <WaveformExample
          waveform="sine"
          message="A sine wave is the simplest waveform with no harmonics or overtones. 
          It generates a smooth, clean sound, much like the way the waveform looks."
          volume={volume}
          setVolume={setVolume}
          buttonHandler={buttonHandler}
        />
        <h2
          style={{ color: "white" }}
          className="text-3xl text-center font-bold"
        >
          Triangle Wave
        </h2>
        <WaveformExample
          waveform="triangle"
          message="Rather than a smooth, curvy waveform, the triangle wave consists of
          repeating upward and downward slopes that generate a slightly brighter tone than
          sine waves."
          volume={volume}
          setVolume={setVolume}
          buttonHandler={buttonHandler}
        />
        <h2
          style={{ color: "white" }}
          className="text-3xl text-center font-bold"
        >
          Square Wave
        </h2>
        <WaveformExample
          waveform="square"
          message="A square wave generates a buzzier tone than a sine wave due to its
          instant changes in amplitude. It introduces harmonics."
          volume={volume}
          setVolume={setVolume}
          buttonHandler={buttonHandler}
        />
        <h2
          style={{ color: "white" }}
          className="text-3xl text-center font-bold"
        >
          Sawtooth Wave
        </h2>
        <WaveformExample
          waveform="sawtooth"
          message="Sawtooth waves generate the richest tones of the 4 common waveforms.
          Its waveform consists of linear rises followed by the instant amplitude change,
          much like the square wave."
          volume={volume}
          setVolume={setVolume}
          buttonHandler={buttonHandler}
        />
        <Button onClick={buttonHandler} name="next">
          Take the Test!
        </Button>
      </Grid>
    </div>
  );
};

export default MainWaveformModule;
