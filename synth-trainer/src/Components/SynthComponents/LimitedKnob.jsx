import React from "react";
import { Knob } from "react-rotary-knob";

class LimitedKnob extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(val) {
    //ignore change if distance is greater than defined
    //here we use a distance of 200 because our max value is 1000
    //change if needed
    const maxDistance = 200;
    let distance = Math.abs(val - this.state.value);
    if (distance > maxDistance) {
      return;
    } else {
      this.setState({ value: val });
    }
  }

  getValue() {
    return this.value;
  }

  render() {
    let { value, ...rest } = this.props;
    return (
      <div>
        {this.state.value.toFixed(0) / 1000}
        <div>
          <Knob
            value={this.state.value}
            onChange={this.handleOnChange}
            {...rest}
          />
        </div>
      </div>
    );
  }
}

export default LimitedKnob;
