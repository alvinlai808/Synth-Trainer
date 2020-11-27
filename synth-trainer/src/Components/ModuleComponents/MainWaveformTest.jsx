// ( ) Generate 10 different waves
// ( ) Text at the top to indicate what number/10 the user is working on
// ( ) User hits play button to hear sound
// ( ) They click button they think the sound is
// (X) If correct -> button turns green
// (X) If wrong -> button turns red and correct waveform displays green
// ( ) user clicks next to load next sound
// ( ) after 10 the user can click see score to view results

import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Repeat from "@material-ui/icons/Repeat";

const MainWaveformTest = () => {
  const waveforms = ["sine", "square", "sawtooth"];
  const [userGuess, setUserGuess] = useState([false, ""]);
  const [waveform, setWaveform] = useState("sine");

  const handleButton = (event) => {
    const { name } = event.currentTarget;

    if (name === "playSound") {
      setUserGuess([false, ""]);
      setWaveform(waveforms[Math.floor(Math.random() * waveforms.length)]);
      // Play Sound
      // Set play to disabled
      // Set replay to enabled
    }

    if (name === "repeatSound") {
      // Repeat sound
    } else {
      setUserGuess([true, name]);
    }
  };

  return (
    <div>
      <Card bg="info">
        <Card.Title>Waveform Test</Card.Title>
        <Card.Body>
          <Button name="playSound" onClick={handleButton} disabled="false">
            <PlayArrow />
          </Button>
          <Button name="replaySond" onClick={handleButton}>
            <Repeat />
          </Button>
          <Form>
            <Button
              name="sawtooth"
              variant={
                userGuess[0] && waveform === "sawtooth"
                  ? "success"
                  : userGuess[0] &&
                    userGuess[1] === "sawtooth" &&
                    waveform !== "sawtooth"
                  ? "danger"
                  : "primary"
              }
              onClick={handleButton}
            >
              Sawtooth
            </Button>
            <Button
              variant={
                userGuess[0] && waveform === "sine"
                  ? "success"
                  : userGuess[0] &&
                    userGuess[1] === "sine" &&
                    waveform !== "sine"
                  ? "danger"
                  : "primary"
              }
              name="sine"
              onClick={handleButton}
            >
              Sine
            </Button>
            <Button
              variant={
                userGuess[0] && waveform === "square"
                  ? "success"
                  : userGuess[0] &&
                    userGuess[1] === "square" &&
                    waveform !== "square"
                  ? "danger"
                  : "primary"
              }
              name="square"
              onClick={handleButton}
            >
              Sine
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MainWaveformTest;
