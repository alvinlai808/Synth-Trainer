import React, { useState } from "react";
import { Slider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: 100,
  },
}); 

export const ADSRSLIDER = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(props.value);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleADSRCommitted = (event, newValue) => {
    props.setValue(newValue / 1000);
  };
  return (
    <div style={{ color: "dimgray" }}>
      {value.toFixed(0)} ms
      <div className={classes.root}>
        <Slider
          name={props.name}
          value={value}
          onChange={handleSliderChange}
          onChangeCommitted={handleADSRCommitted}
          orientation="vertical"
          aria-labelledby="vertical-slider"
          color="secondary"
          min={0}
          max={1000}
          id={props.id}

          // {...rest}
        />
      </div>
    </div>
  );
};
