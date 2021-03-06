import React, { useState } from "react";
import {
  Button,
  Jumbotron,
  Container
} from "react-bootstrap";

const jumbotronBackground = `https://images.unsplash.com/photo-1557683311-eac922347aa1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80`;
const img_url = jumbotronBackground;

const MainPage = () => {
  return (
    <Container>
      <Jumbotron style={{ backgroundImage: `url(${img_url})`, backgroundSize: 'cover' }}>
        <h1>Welcome to Synth Trainer</h1>
        <p>
          Having trouble navigating the application? GG.
        </p>
        <p>
          <Button variant="primary">I do nothing</Button>
        </p>
      </Jumbotron>

      <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12" style={{ display: 'inline-block' }}>
        <div class="thumbnail">
          <div class="">
              <h3>Modules</h3>
              <p>Start learning sound design using our carefully structured modules</p>
              <p>
                <a href="#" class="btn btn-primary">Modules</a>
              </p>
          </div>
        </div>
      </div>

      <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12" style={{ display: 'inline-block' }}>
        <div class="thumbnail">
          <div class="">
              <h3>Sandbox</h3>
              <p>Experiment with an advanced synthesizer to discover new sounds</p>
              <p>
                <Button id="sandbox-button" href="Sandbox">Sandbox</Button>
              </p>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default MainPage;
