import React, { Component } from "react";
import { Header, Icon, Image, Menu, Button, Segment } from "semantic-ui-react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import styled from "styled-components";
import "./style.css";
import Container from "../Components/Container";
import HeaderMenu from "../Components/Menu";
import Engine from "../Engine/engine.js";

class Main extends Component {
  state = { particle: null };

  componentDidMount() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    console.log(canvas.height);
    const engine = new Engine(ctx, canvas.height, canvas.width);
    const draw = () => {
      engine.draw();
      this.setState({ particle: engine.particle });
    };
    setInterval(draw, 10);
  }

  render() {
    const particle = this.particle;
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
            </div>
            <canvas height="600px" width="1000px" id="canvas" />

            <div id="console">
              {this.state.particle
                ? "Height: " +
                  Math.round(this.state.particle.yPos) +
                  "  Speed: " +
                  Math.round(this.state.particle.yVel)
                : null}
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Main;
