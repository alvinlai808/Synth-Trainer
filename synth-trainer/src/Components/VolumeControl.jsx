import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeOff from '@material-ui/icons/VolumeOff';
import { Button } from '@material-ui/core';
import { useEffect } from 'react';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

export default function VolumeControl({volume, setVolume}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(volume);
  const [previousValue, setPreviousValue] = React.useState(volume);
  const [isMuted, setIsMuted] = React.useState(false)

  const checkIfMuted = () => {
    if (value === 0) {
      setIsMuted(true); 
    } else {
      setIsMuted(false);
    }
  }

  const toggleMute = () => {
    console.log(isMuted)
    if (isMuted) {
      setValue(previousValue)
      setVolume(previousValue)
    } else {
      setPreviousValue(value)
      setValue(0)
      setVolume(0)
    }
    setIsMuted(!isMuted)
  }

  const handleButton = (event) => {
    const { name } = event.currentTarget;
    if (name === "muteButton") {
      toggleMute()
    }
  }

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    setVolume(newValue);
    checkIfMuted();
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    setVolume(event.target.value)
    checkIfMuted();
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
      setVolume(0);
      checkIfMuted();
    } else if (value > 100) {
      setValue(100);
      setVolume(100);
      checkIfMuted();
    }
  };

  const downHandler = ({ key }) => {
    if (key === 'm') {
      toggleMute()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
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
            {isMuted ? <VolumeOff /> : <VolumeUp />}
          </Button>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
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
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
