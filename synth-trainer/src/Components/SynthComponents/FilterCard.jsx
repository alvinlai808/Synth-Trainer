import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import LimitedKnob from "./LimitedKnob";
import Grid from "@material-ui/core/Grid";

const FilterCard = ({ filterType, knobHandler, filterHandler }) => {
  const [lowpassColor, setLowpassColor] = useState("dimgray");
  const [highpassColor, setHighpassColor] = useState("black");
  const [bandpassColor, setBandpassColor] = useState("dimgray");

  const handlebuttonclick = (event) => {
    const { style, name } = event.currentTarget;
    if (name === "lowpass" && style.backgroundColor === lowpassColor) {
      setLowpassColor("black");
      setHighpassColor("dimgray");
      setBandpassColor("dimgray");
    }
    if (name === "highpass" && style.backgroundColor === highpassColor) {
      setLowpassColor("dimgray");
      setHighpassColor("black");
      setBandpassColor("dimgray");
    }
    if (name === "bandpass" && style.backgroundColor === bandpassColor) {
      setLowpassColor("dimgray");
      setHighpassColor("dimgray");
      setBandpassColor("black");
    }
  };

  return (
    <Card id="envelope-card" className="text-center" bg="light">
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
          <Button
            //variant={filterType === "lowpass" ? "success" : "primary"}
            style={{ backgroundColor: lowpassColor }}
            name="lowpass"
            onClick={(event) => {
              filterHandler(event);
              handlebuttonclick(event);
            }}
          >
            Lowpass
          </Button>
          <Button
            //variant={filterType === "highpass" ? "success" : "primary"}
            style={{ backgroundColor: highpassColor }}
            name="highpass"
            onClick={(event) => {
              filterHandler(event);
              handlebuttonclick(event);
            }}
          >
            Highpass
          </Button>
          <Button
            //variant={filterType === "bandpass" ? "success" : "primary"}
            style={{ backgroundColor: bandpassColor }}
            name="bandpass"
            onClick={(event) => {
              filterHandler(event);
              handlebuttonclick(event);
            }}
          >
            Bandpass
          </Button>
        </Grid>
        <Grid item xs={6}>
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
      </Grid>
    </Card>
  );
};

export default FilterCard;
