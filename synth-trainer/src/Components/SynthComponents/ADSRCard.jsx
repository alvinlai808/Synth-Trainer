import React from "react";
import { Card } from "react-bootstrap";
import { ADSRSLIDER } from "./ADSRSlider";
import Grid from "@material-ui/core/Grid";

const ADSRCard = ({
  attackStuff,
  decayStuff,
  sustainStuff,
  releaseStuff,
  frequencyStuff,
}) => {
  let attackValue = attackStuff[0];
  let setAttackValue = attackStuff[1];
  let decayValue = decayStuff[0];
  let setDecayValue = decayStuff[1];
  let sustainValue = sustainStuff[0];
  let setSustainValue = sustainStuff[1];
  let releaseValue = releaseStuff[0];
  let setReleaseValue = releaseStuff[1];
  // let frequencyValue = frequencyStuff[0]
  // let setFrequencyValue = frequencyStuff[1]

  return (
    <Card
      id="envelope-card"
      className="text-center"
      style={{ backgroundColor: "black" }}
    >
      <Card.Title id="envelope-label" style={{ color: "dimgray" }}>
        ADSR Envelope
      </Card.Title>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <h3 className="text-3xl font-bold text-white">Attack</h3>
          <ADSRSLIDER
            id="AttackSlider"
            name="Attack"
            value={attackValue}
            setValue={setAttackValue}
          />
        </Grid>
        <Grid item xs={6}>
          <h3 className="text-3xl font-bold text-white">Decay</h3>
          <ADSRSLIDER
            id="DecaySlider"
            name="Decay"
            value={decayValue}
            setValue={setDecayValue}
          />
        </Grid>
        <Grid item xs={6}>
          <h3 className="text-3xl font-bold text-white">Sustain</h3>
          <ADSRSLIDER
            id="SustainSlider"
            name="Sustain"
            value={sustainValue}
            setValue={setSustainValue}
          />
        </Grid>
        <Grid item xs={6}>
          <h3 className="text-3xl font-bold text-white">Release</h3>
          <ADSRSLIDER
            id="ReleaseSlider"
            name="Release"
            value={releaseValue}
            setValue={setReleaseValue}
          />
        </Grid>
      </Grid>
      <br />{" "}
      {/*his is so the slider isnt attatched to the bottom of the card */}
    </Card>
  );
};

export default ADSRCard;
