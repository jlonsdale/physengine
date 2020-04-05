import React, { Component } from "react";
import { Header, Icon, Image, Menu, Button, Segment } from "semantic-ui-react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import styled from "styled-components";
import "./style.css";

import Canvas from "../Components/Canvas";
import Container from "../Components/Container";
import HeaderMenu from "../Components/Menu";
import Engine from "../Engine/engine.js";

const Console = styled.div`
  margin: 0 auto;
  width: 90%;
`;

class Main extends Component {
  componentDidMount() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const engine = new Engine(ctx, canvas);
    const draw = () => {
      engine.draw();
    };
    setInterval(draw, 10);
  }

  render() {
    return (
      <>
        <HeaderMenu />
        <Container>
          <Segment>
            <div>
              <Button content="Play" icon="play" labelPosition="left" />
              <Button content="Pause" icon="pause" labelPosition="left" />
            </div>
          </Segment>
          <Canvas id="canvas" />
        </Container>
        <Console>
          <Segment>snadasod </Segment>
        </Console>
      </>
    );
  }
}

export default Main;
