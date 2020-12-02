// Current volume range is 75 - 100

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeOff from "@material-ui/icons/VolumeOff";
import { Button } from "@material-ui/core";
import { useEffect } from "react";

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

export default function VolumeControl({ volume, setVolume }) {
  const classes = useStyles();
  const [previousVolume, setPreviousVolume] = React.useState(
    (volume - 100) * 4
  );
  const [value, setValue] = React.useState((volume - 100) * 4);

  const toggleMute = () => {
    if (volume === 0) {
      setValue(previousVolume);
      setVolume(previousVolume / 4 + 75);
    } else {
      setPreviousVolume(value);
      setVolume(0);
      setValue(0);
    }
  };

  const handleButton = (event) => {
    const { name } = event.currentTarget;
    if (name === "muteButton") {
      toggleMute();
    }
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value);
    setVolume(
      event.target.value === 0
        ? event.target.value
        : event.target.value / 4 + 75
    );
  };

  const handleBlur = () => {
    if (volume < 75) {
      setVolume(0);
    } else if (volume > 100) {
      setVolume(125);
    }
  };

  const downHandler = ({ key }) => {
    if (key === "m") {
      toggleMute();
    }
  };

  const handleSliderCommit = (event, newValue) => {
    setValue(newValue);
    setVolume(newValue === 0 ? newValue : newValue / 4 + 75);
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  });

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Volume
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Button name="muteButton" onClick={handleButton} outlined="true">
            {value === 0 ? <VolumeOff /> : <VolumeUp />}
          </Button>
        </Grid>
        <Grid item xs>
          <Slider
            value={value}
            onChange={handleSliderChange}
            onChangeCommitted={handleSliderCommit}
            aria-labelledby="input-slider"
            color="secondary"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
