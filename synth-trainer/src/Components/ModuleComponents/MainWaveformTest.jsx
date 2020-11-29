// ( ) Generate 10 different waves
// ( ) Text at the top to indicate what number/10 the user is working on
// ( ) User hits play button to hear sound
// ( ) They click button they think the sound is
// (X) If correct -> button turns green
// (X) If wrong -> button turns red and correct waveform displays green
// ( ) user clicks next to load next sound
// ( ) after 10 the user can click see score to view results

import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Repeat from "@material-ui/icons/Repeat";
import {
  Dialog,
  DialogActions,
  DialogContent,
  LinearProgress,
} from "@material-ui/core";
import { useContext } from "react";
import {
  addInProgressModules,
  getInProgressModules,
  getModuleRef,
  removeInProgressModule,
} from "../../firebase";
import { UserContext } from "../../providers/UserProvider";
import { useEffect } from "react";
import { navigate } from "@reach/router";

const waveforms = ["sine", "square", "sawtooth"];

const MainWaveformTest = () => {
  const user = useContext(UserContext);

  useEffect(() => {
    const loadData = async () => {
      addInProgressModules(user, "MainWaveformModule");
      setModuleRef(await getModuleRef("MainWaveformModule"));
    };

    loadData();
  }, []);

  const [userGuess, setUserGuess] = useState([false, ""]);
  const [waveform, setWaveform] = useState("");
  const [canPlayNewSound, setCanPlayNewSound] = useState(true);
  const [userPassed, setUserPassed] = useState();
  const [moduleRef, setModuleRef] = useState();
  const [score, setScore] = useState(0);
  const [currentTest, setCurrentTest] = useState(0);

  const handleButton = async (event) => {
    const { name } = event.currentTarget;
    switch (name) {
      case "playSound":
        setUserGuess([false, ""]);
        setCurrentTest(currentTest + 1);
        setCanPlayNewSound(false);
        setWaveform(waveforms[Math.floor(Math.random() * waveforms.length)]);
        // Play Sound
        // Set play to disabled
        // Set replay to enabled
        break;

      case "replaySound":
        break;

      case "submit":
        if (score >= 8) {
          // User passes
          setUserPassed(true);
          break;
        } else {
          setUserPassed(false);
          break;
        }

      case "closeFinalDialog":
        setUserPassed(undefined);
        break;

      case "home":
        await removeInProgressModule(user, "MainWaveformModule");
        navigate("/");
        break;

      case "return":
        navigate(moduleRef.address);
        console.log(moduleRef);
        break;

      case "tryAgain":
        setScore(0);
        setCurrentTest(0);
        setUserGuess([false, ""]);
        setCanPlayNewSound(true);
        setUserPassed(undefined);
        break;

      default:
        setUserGuess([true, name]);
        if (name === waveform) {
          setScore(score + 1);
        }
        setCanPlayNewSound(true);
    }
  };

  if (moduleRef === undefined) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <Card bg="info">
        <Card.Title>Waveform Test</Card.Title>
        <Card.Text>
          {currentTest === 0 ? "Press Play to Begin!" : "Wave: " + currentTest}
        </Card.Text>
        <Card.Text>Score: {score}</Card.Text>
        <Card.Body>
          <LinearProgress
            variant="determinate"
            value={currentTest * 10}
          ></LinearProgress>
          <Button
            name="playSound"
            onClick={handleButton}
            disabled={!canPlayNewSound || (currentTest === 10 && userGuess[0])}
          >
            <PlayArrow />
          </Button>
          <Button
            name="replaySound"
            onClick={handleButton}
            disabled={canPlayNewSound || (currentTest === 10 && userGuess[0])}
          >
            <Repeat />
          </Button>
          <Grid container spacing={2}>
            <Grid item>
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
                disabled={
                  canPlayNewSound || (currentTest === 10 && userGuess[0])
                }
              >
                Sawtooth
              </Button>
            </Grid>
            <Grid item>
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
                disabled={
                  canPlayNewSound || (currentTest === 10 && userGuess[0])
                }
              >
                Sine
              </Button>
            </Grid>
            <Grid item>
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
                disabled={
                  canPlayNewSound || (currentTest === 10 && userGuess[0])
                }
              >
                Square
              </Button>
            </Grid>
          </Grid>
        </Card.Body>
      </Card>
      <Button
        name="submit"
        onClick={handleButton}
        disabled={!(currentTest === 10 && userGuess[0])}
      >
        Submit
      </Button>
      <Button name="home" onClick={handleButton}>
        Return to Home
      </Button>
      <Dialog
        open={userPassed !== undefined}
        keepMounted
        maxWidth="sm"
        fullWidth
        name="finalDialog"
      >
        <DialogContent>
          <h2>
            You got {score} / {currentTest}
          </h2>
          <h3>{userPassed ? "Nice!" : "So Close!"}</h3>
        </DialogContent>
        <DialogActions>
          {userPassed ? (
            <Button name="home" onClick={handleButton}>
              Return to Home
            </Button>
          ) : (
            <div>
              <Button name="return" onClick={handleButton}>
                Return to Module
              </Button>
              <Button name="tryAgain" onClick={handleButton}>
                Try Again
              </Button>
              <Button name="home" onClick={handleButton}>
                Return to Home
              </Button>
            </div>
          )}
          <Button onClick={handleButton} name="closeFinalDialog">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MainWaveformTest;
