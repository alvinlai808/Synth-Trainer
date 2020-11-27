import React, { useState } from 'react';
import { Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      height: 100,
    },
  });

export const ADSRSLIDER = props => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    


    //let { onChange, ...rest } = this.props; //renaming value so it doesn't conflict with the state named value(above) 


    //https://material-ui.com/components/slider/#range-slider
    //https://material-ui.com/api/slider/
    return (
        <div> 
            {value.toFixed(0)} ms
            <div className={classes.root}>
                <Slider
                    name = {props.name}
                    value = {value}
                    onChange = {handleSliderChange}
                    onChangeCommitted = {props.onChangeCommitted}
                    orientation="vertical"
                    aria-labelledby="vertical-slider"
                    color = 'secondary'
                    min = {0}
                    max = {1000}
                    
                    // {...rest}
                />
            </div>
        </div>
            
        );
}

