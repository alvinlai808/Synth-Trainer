import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import LimitedKnob from "./LimitedKnob";
import {ADSRSLIDER} from "./ADSRSlider";
import Grid from "@material-ui/core/Grid";

const ADSRCard = ({ knobHandler }) => {
  return (
    <Card id="envelope-card" className="text-center" bg="info">
      <Card.Title id="envelope-label">ADSR Envelope</Card.Title>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <h3 className="text-3xl font-bold">Attack</h3>
          <ADSRSLIDER
            name = "Attack"
            value = {600}
            //onChangeCommitted = {knobHandler}
          />
        </Grid>
        <Grid item xs={6}>
          <h3 className="text-3xl font-bold">Decay</h3>
          <ADSRSLIDER
            name = "Decay"
            value = {600}
            //onChangeCommitted = {knobHandler}
          />
        </Grid>
        <Grid item xs={6}>
          <h3 className="text-3xl font-bold">Sustain</h3>
          <ADSRSLIDER
            name = "Sustain"
            value = {600}
            //onChangeCommitted = {knobHandler}
          />
        </Grid>
        <Grid item xs={6}>
          <h3 className="text-3xl font-bold">Release</h3>
          <ADSRSLIDER
            name = "Release"
            value = {600}
            //onChangeCommitted = {knobHandler}
          />
        </Grid>
      </Grid>
      <br /> {/*his is so the slider isnt attatched to the bottom of the card */}
    </Card>
  );
};

export default ADSRCard;
