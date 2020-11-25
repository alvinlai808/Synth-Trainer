import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import LimitedKnob from "./LimitedKnob";
import Grid from "@material-ui/core/Grid";

const ADSRCard = ({ knobHandler }) => {
  return (
    <Card id="envelope-card" className="text-center" bg="info">
      <Card.Title id="envelope-label">ADSR Envelope</Card.Title>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <h3 className="text-3xl font-bold">Attack</h3>
          <LimitedKnob
            name="Attack"
            value={100}
            style={{ display: "inline-block" }}
            min={0}
            max={1000}
            unlockDistance={0}
            preciseMode={false}
            onEnd={knobHandler}
            width={200}
            height={200}
          />
        </Grid>
        <Grid item xs={6}>
          <h3 className="text-3xl font-bold">Decay</h3>
          <LimitedKnob
            name="Decay"
            value={100}
            style={{ display: "inline-block" }}
            min={0}
            max={5000}
            unlockDistance={0}
            preciseMode={false}
            onEnd={knobHandler}
            width={200}
            height={200}
          />
        </Grid>
        <Grid item xs={6}>
          <h3 className="text-3xl font-bold">Sustain</h3>
          <LimitedKnob
            name="Sustain"
            value={100}
            style={{ display: "inline-block" }}
            min={0}
            max={1000}
            unlockDistance={0}
            preciseMode={false}
            onEnd={knobHandler}
            width={200}
            height={200}
          />
        </Grid>
        <Grid item xs={6}>
          <h3 className="text-3xl font-bold">Release</h3>
          <LimitedKnob
            name="Release"
            value={100}
            style={{ display: "inline-block" }}
            min={0}
            max={5000}
            unlockDistance={0}
            preciseMode={false}
            onEnd={knobHandler}
            width={200}
            height={200}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default ADSRCard;
