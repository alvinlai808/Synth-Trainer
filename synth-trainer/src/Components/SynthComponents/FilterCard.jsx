import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import LimitedKnob from "./LimitedKnob";
import Grid from "@material-ui/core/Grid";

const FilterCard = ({ knobHandler, filterHandler }) => {
  return (
    <Card id="envelope-card" className="text-center" bg="info">
      <Card.Title id="envelope-label">Filter</Card.Title>
      <Grid
        container
        spacing={1}
        alignItems="center"
        direction="row"
        justify="center"
      >
        <Grid
          container
          item
          xs={6}
          alignItems="center"
          direction="row"
          justify="center"
        >
          <Button name="lowpass" onClick={(event) => filterHandler(event)}>
            Lowpass
          </Button>
          <Button name="highpass" onClick={(event) => filterHandler(event)}>
            Highpass
          </Button>
          <Button name="bandpass" onClick={(event) => filterHandler(event)}>
            Bandpass
          </Button>
        </Grid>
        <Grid item xs={6} alignItems="center" direction="row">
          <h5 className="text-3xl font-bold">Frequency</h5>
          <LimitedKnob
            name="Frequency"
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
        <h3>Auto Filter</h3>
        <Grid item xs={6} alignItems="center" direction="row">
          <h8 className="text-3xl font-bold">LFO Frequency</h8>
          <LimitedKnob
            name="LFO Frequency"
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

export default FilterCard;
