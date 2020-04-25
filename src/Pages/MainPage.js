import React, { Component } from "react";
import { Header, Icon, Image, Menu, Button, Segment } from "semantic-ui-react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import styled from "styled-components";
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
    setInterval(draw, 5);
  }

  handleClick(event) {
    const y = event.clientY - this.state.canvas.getBoundingClientRect().top;
    const x = event.clientX - this.state.canvas.getBoundingClientRect().left;
    this.state.engine.handleClick(x, y);
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
              onClick={e => {
                this.handleClick(e.nativeEvent);
              }}
            />

            <div id="console">
              {this.state.engine
                ? "Height: " +
                  Math.round(600 - this.state.engine.particle.yPos) +
                  "  Speed: " +
                  Math.round(this.state.engine.particle.yVel)
                : null}
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Main;
