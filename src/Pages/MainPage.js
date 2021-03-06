import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import "./style.css";
import Container from "../Components/Container";
import HeaderMenu from "../Components/Menu";
import Engine from "../Engine/engine.js";
import {
  EnvironmentalConditions,
  ElectricFields,
  HarmonicMotion,
} from "../Components/MenuComponents";

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
    x2: null,
    y2: null,
    mouseX: null,
    mouseY: null,

    spacePressed: false,
    stopped: false,

    activeMenuItem: menuStates.ELECTRIC_FIELDS,
  };

  nullThrowStates() {
    this.setState({ x1: null });
    this.setState({ y1: null });
    this.setState({ x2: null });
    this.setState({ y2: null });
    this.setState({ mouseX: null });
    this.setState({ mouseY: null });
    this.setState({ spacePressed: false });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.spaceDown, false);
    document.addEventListener("keyup", this.spaceUp, false);
    const canvas = document.getElementById("canvas");
    const engine = new Engine(
      canvas.getContext("2d"),
      canvas.height,
      canvas.width
    );
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
    if (!this.state.stopped) {
      if (this.className === "hold") {
        return false;
      }
      this.className = "hold";
      if (this.state.engine.particle.selected) {
        this.setState({ spacePressed: true });
        if (event.keyCode === 32) {
          this.state.engine.togglePendingThrow(true);
          this.setState({
            x1: this.state.mouseX.valueOf() || this.state.x1.valueOf(),
          });
          this.setState({
            y1: this.state.mouseY.valueOf() || this.state.y1.valueOf(),
          });
        }
      }
    }
  };

  spaceUp = (event) => {
    if (!this.state.stopped) {
      this.className = "";
      this.setState({ spacePressed: false });
      if (this.state.engine.particle.selected) {
        if (event.keyCode === 32) {
          this.setState({ x2: this.state.mouseX.valueOf() });
          this.setState({ y2: this.state.mouseY.valueOf() });
          this.state.engine.particle.throw(
            this.state.x2,
            this.state.x1,
            this.state.y2,
            this.state.y1
          );
          this.nullThrowStates();
        }
      }
    }
  };

  updateMenu = (type) => {
    this.setState = { menu: type };
  };

  draw = () => {
    let engine = this.state.engine;
    engine.engineViewState = {
      x1: this.state.x1,
      y1: this.state.y1,
      mouseX: this.state.mouseX,
      mouseY: this.state.mouseY,
      spacePressed: this.state.spacePressed,
    };
    this.setState({ engine: engine });
    engine.draw();
    this.handleStop();
  };

  handleStop = () => {
    if (this.state.engine.particle.stopped) {
      clearInterval(this.state.interval);
    }
  };

  stop = () => {
    this.setState({ stopped: true });
    clearInterval(this.state.interval);
  };

  play = () => {
    this.setState({ stopped: false });
    //prevents intervals from stacking
    clearInterval(this.state.interval);
    const interval = setInterval(this.draw, 1);
    this.setState({ interval: interval });
  };

  handleMouseDown(event) {
    if (!this.state.stopped) {
      const x = event.clientX - this.state.canvas.getBoundingClientRect().left;
      const y = event.clientY - this.state.canvas.getBoundingClientRect().top;
      if (this.state.engine.isWithinBounds(x, y)) {
        this.setState({ mouseX: x.valueOf() });
        this.setState({ mouseY: y.valueOf() });
        this.setState({ x1: x.valueOf() });
        this.setState({ y1: y.valueOf() });
        this.state.engine.handleSelect();
      }
    }
  }

  handleMouseUp(event) {
    if (!this.state.stopped) {
      this.state.engine.togglePendingThrow(false);
      if (this.state.engine.particle.selected) {
        if (this.state.x2 && this.state.y2) {
        } else {
          this.state.engine.particle.drop(this.state.mouseX, this.state.mouseY);
        }
        this.nullThrowStates();
      }
    }
  }

  handleMouseMove(event) {
    if (!this.state.stopped) {
      if (this.state.engine.particle.selected) {
        const mouseX =
          event.clientX - this.state.canvas.getBoundingClientRect().left;
        const mouseY =
          event.clientY - this.state.canvas.getBoundingClientRect().top;
        this.setState({ mouseX: mouseX });
        this.setState({ mouseY: mouseY });
      }
    }
  }
  render() {
    return (
      <>
        <center>
          <div id="content">
            <HeaderMenu
              activeItem={this.state.activeMenuItem}
              menuStates={menuStates}
              setActiveItem={(item) => {
                this.setState({ activeMenuItem: item });
              }}
            />
            <div class="ui info message">
              <div class="header">
                To give the particle a force, click the ball and hold with left
                mouse button & hold down space
              </div>
            </div>
            <div id="container">
              <Container>
                <center>
                  <div id="sidebar" className="ui segment">
                    {this.state.activeMenuItem === menuStates.INFORMATION ? (
                      <div className="ui green inverted segment">
                        <h2>How it works? </h2>
                        this engine calculates the vector sum of forces acting
                        on the particle. It then performs an integral to get
                        kinematic values each frame. The integral approximation
                        used is a 4th order Runge-Kutta approximation.
                      </div>
                    ) : null}

                    {this.state.activeMenuItem ===
                    menuStates.ENVIROMENTAL_CONDITIONS ? (
                      <div className="ui blue inverted segment">
                        <EnvironmentalConditions
                          engineState={
                            this.state.engine ? this.state.engine : null
                          }
                        ></EnvironmentalConditions>
                      </div>
                    ) : null}

                    {this.state.activeMenuItem ===
                    menuStates.ELECTRIC_FIELDS ? (
                      <div className="ui orange inverted segment">
                        {this.state.engine ? (
                          <ElectricFields
                            engineState={this.state.engine}
                          ></ElectricFields>
                        ) : null}
                      </div>
                    ) : null}

                    {this.state.activeMenuItem ===
                    menuStates.HARMONIC_MOTION ? (
                      <div className="ui purple inverted segment">
                        {this.state.engine ? (
                          <HarmonicMotion></HarmonicMotion>
                        ) : null}
                      </div>
                    ) : null}

                    <span>
                      <Button.Group>
                        <Button icon="play" onClick={this.play} />
                        <Button icon="pause" onClick={this.stop} />
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
                  <h3> Console </h3>
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
