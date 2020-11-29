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
  const [previousVolume, setPreviousVolume] = React.useState(volume);
  const [isMuted, setIsMuted] = React.useState(false);

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(previousVolume);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
    }
  };

  const handleButton = (event) => {
    const { name } = event.currentTarget;
    if (name === "muteButton") {
      toggleMute();
    }
  };

  const handleSliderChange = (event, newValue) => {
    setVolume(newValue / 4 + 75);
  };

  const handleInputChange = (event) => {
    setVolume(event.target.value / 4 + 75);
  };

  const handleBlur = () => {
    if (volume < 0) {
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
            {volume === 0 ? <VolumeOff /> : <VolumeUp />}
          </Button>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof volume === "number" ? (volume - 75) * 4 : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={(volume - 75) * 4}
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
