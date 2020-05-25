import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import "./style.css";
import Container from "../Components/Container";
import HeaderMenu from "../Components/Menu";
import Engine from "../Engine/engine.js";
import { EnvironmentalConditions } from "../Components/MenuComponents";

const menuStates = {
  ENVIROMENTAL_CONDITIONS: "ENVIROMENTAL_CONDITIONS",
  ELECTRIC_FIELDS: "ELECTRIC_FIELDS",
  HARMONIC_MOTION: "HARMONIC_MOTION",
  DATA_AND_GRAPHS: "DATA_AND_GRAPHS",
};

class Main extends Component {
  state = {
    canvas: null,
    engine: null,
    interval: null,
    x1: null,
    y1: null,
    menu: "environmentalConditions",
  };
  componentDidMount() {
    const canvas = document.getElementById("canvas");
    this.setState({ canvas: canvas });
    const ctx = canvas.getContext("2d");
    const engine = new Engine(ctx, canvas.height, canvas.width);
    this.setState({ engine: engine });
    const interval = setInterval(this.draw, 1);
    this.setState({ interval: interval });
  }

  updateMenu = (type) => {
    this.setState = { menu: type };
  };

  draw = () => {
    let engine = this.state.engine;
    engine.draw();
    this.setState({ engine: engine });
    this.handleStop();
  };

  handleStop = () => {
    if (this.state.engine.particle.stopped) {
      clearInterval(this.state.interval);
    }
  };

  stop = () => {
    clearInterval(this.state.interval);
  };

  play = () => {
    //prevents intervals from stacking
    clearInterval(this.state.interval);

    const interval = setInterval(this.draw, 1);
    this.setState({ interval: interval });
  };

  handleMouseDown(event) {
    const y = event.clientY - this.state.canvas.getBoundingClientRect().top;
    const x = event.clientX - this.state.canvas.getBoundingClientRect().left;
    this.state.engine.handleClick(x, y);
  }
  
  handleMouseUp(event) {
    const y = event.clientY - this.state.canvas.getBoundingClientRect().top;
    const x = event.clientX - this.state.canvas.getBoundingClientRect().left;
    this.state.engine.handleLetGo(x, y);
  }

  handleMouseMove(event) {
    if (this.state.engine) {
      const mouseX =
        event.clientX - this.state.canvas.getBoundingClientRect().left;
      const mouseY =
        event.clientY - this.state.canvas.getBoundingClientRect().top;
      this.state.engine.updateMouse(mouseX, mouseY);
    }
  }

  render() {
    return (
      <>
        <HeaderMenu />
        <div id="container">
          <Container>
            <center>
              <div id="sidebar">
                <span>
                  <Button
                    content="Play"
                    size="tiny"
                    icon="play"
                    labelPosition="left"
                    onClick={this.play}
                  />
                  <Button
                    content="Pause"
                    size="tiny"
                    icon="pause"
                    labelPosition="left"
                    onClick={this.stop}
                  />
                  <Button
                    content="Reset"
                    size="tiny"
                    icon="redo"
                    labelPosition="left"
                  />
                </span>
                <EnvironmentalConditions></EnvironmentalConditions>
              </div>
            </center>
            <canvas
              height="600px"
              width="1000px"
              id="canvas"
              onClick={(event) => {
                this.handleClick(event);
              }}
              onMouseDown={(event) => {
                this.handleMouseMove(event);
              }}
              onMouseUp={(event) => {
                this.handleMouseMove(event);
              }}
            />

            <div id="console">
              {this.state.engine ? this.state.engine.data() : null}
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Main;
