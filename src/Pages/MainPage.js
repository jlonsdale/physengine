import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import "./style.css";
import Container from "../Components/Container";
import HeaderMenu from "../Components/Menu";
import Engine from "../Engine/engine.js";

class Main extends Component {
  state = { canvas: null, engine: null };
  componentDidMount() {
    const canvas = document.getElementById("canvas");
    this.setState({ canvas: canvas });
    const ctx = canvas.getContext("2d");
    const engine = new Engine(ctx, canvas.height, canvas.width);
    const draw = () => {
      engine.draw();
      this.setState({ engine: engine });
    };
    setInterval(draw, 10);
  }

  handleClick(event) {
    const y = event.clientY - this.state.canvas.getBoundingClientRect().top;
    const x = event.clientX - this.state.canvas.getBoundingClientRect().left;
    this.state.engine.handleClick(x, y);
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
            <div id="sidebar">
              <Button
                content="Play"
                size="small"
                icon="play"
                labelPosition="left"
              />
              <Button
                content="Pause"
                size="small"
                icon="pause"
                labelPosition="left"
              />
              <Button
                content="Reset"
                size="small"
                icon="redo"
                labelPosition="left"
              />
            </div>
            <canvas
              height="600px"
              width="1000px"
              id="canvas"
              onClick={event => {
                this.handleClick(event);
              }}
              onMouseMove={event => {
                this.handleMouseMove(event);
              }}
            />

            <div id="console">
              {this.state.engine
                ? this.state.engine.data()
                : null}
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Main;
