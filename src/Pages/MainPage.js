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
  INFORMATION: "INFORMATION",
};

class Main extends Component {
  state = {
    canvas: null,
    engine: null,
    interval: null,
    x1: null,
    y1: null,
    time: null,
    spacePressed: false,
    menu: "environmentalConditions",
  };

  componentDidMount() {
    document.addEventListener("keydown", this.spaceDown, false);
    document.addEventListener("keyup", this.spaceUp, false);

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const engine = new Engine(ctx, canvas.height, canvas.width);
    const interval = setInterval(this.draw, 1);

    this.setState({ canvas: canvas });
    this.setState({ engine: engine });
    this.setState({ interval: interval });
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.spaceDown, false);
    document.removeEventListener("keyup", this.spaceUp, false);
  }

  spaceDown = (event) => {
    if (event.keyCode === 32) {
      this.setState({ spacePressed: true });
    }
  };

  spaceUp = (event) => {
    if (event.keyCode === 32) {
      this.setState({ spacePressed: false });
    }
  };

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
    const y1 = event.clientY - this.state.canvas.getBoundingClientRect().top;
    const x1 = event.clientX - this.state.canvas.getBoundingClientRect().left;
    if (this.state.engine.isWithinBounds(x1, y1)) {
      this.setState({ x1: x1 });
      this.setState({ y1: y1 });
      this.setState({ time: Date.now() });
      this.state.engine.updateMouse(x1, y1);
    }
  }

  handleMouseUp(event) {
    const y2 = event.clientY - this.state.canvas.getBoundingClientRect().top;
    const x2 = event.clientX - this.state.canvas.getBoundingClientRect().left;
    if (this.state.spacePressed) {
      const time = Math.abs(this.state.time - Date.now()) / 1000;
      this.state.engine.handleThrow(this.state.x1, x2, this.state.y1, y2, time);
      this.setState({ x1: null });
      this.setState({ y1: null });
      this.setState({ time: null });
    }
  }

  handleMouseMove(event) {
    if (this.state.engine && this.state.engine.particle.selected) {
      const mouseX =
        event.clientX - this.state.canvas.getBoundingClientRect().left;
      const mouseY =
        event.clientY - this.state.canvas.getBoundingClientRect().top;
      this.state.engine.updateMouse(
        mouseX || this.state.x1,
        mouseY || this.state.y1
      );
    }
  }

  render() {
    return (
      <>
        <center>
          <div id="content">
            <HeaderMenu />
            <div id="container">
              <Container>
                <center>
                  <div className="ui blue inverted segment" id="sidebar">
                    <span>
                      <EnvironmentalConditions></EnvironmentalConditions>
                      <Button.Group>
                        <Button icon="play" onClick={this.play} />
                        <Button icon="pause" onClick={this.stop} />
                        <Button icon="redo" />
                      </Button.Group>
                    </span>
                  </div>
                </center>
                <canvas
                  height="600px"
                  width="800px"
                  id="canvas"
                  onMouseDown={(event) => {
                    this.handleMouseDown(event);
                  }}
                  onMouseUp={(event) => {
                    this.handleMouseUp(event);
                  }}
                  onMouseMove={(event) => {
                    this.handleMouseMove(event);
                  }}
                />
                <div id="console">
                  <h3> Graphing Console </h3>
                </div>
              </Container>
            </div>
          </div>
        </center>
      </>
    );
  }
}

export default Main;
