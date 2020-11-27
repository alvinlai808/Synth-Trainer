import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import PlayArrow from "@material-ui/icons/PlayArrow";
import * as Tone from "tone";
import VolumeControl from "../SynthComponents/VolumeControl";
import Grid from "@material-ui/core/Grid";

const WaveformExample = ({
  waveform,
  message,
  volume,
  setVolume,
  buttonHandler,
}) => {
  return (
    <Card id={waveform + "-example"} className="text-left" bg="info">
      <Card.Title>
        {waveform[0].toUpperCase() + waveform.slice(1)} Waveform Example
      </Card.Title>
      <Form>
        <Card.Text>{message}</Card.Text>
        <Card.Body>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Button name="playSawtoothExample" onClick={buttonHandler}>
                <PlayArrow />
              </Button>
            </Grid>
            <Grid item>
              <VolumeControl volume={volume} setVolume={setVolume} />
            </Grid>
          </Grid>
        </Card.Body>
      </Form>
    </Card>
  );
};

export default WaveformExample;
