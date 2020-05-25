import React from "react";
import { Menu, Icon, Button } from "semantic-ui-react";

export default class HeaderMenu extends React.Component {
  render() {
    return (
      <Menu stackable>
        <Menu.Item header>
          <h2>
            <Icon name="rocket" size="large" />
            Physics Engine
          </h2>
        </Menu.Item>
        <Menu.Item>
          <Button.Group>
            <Button color="black">
              <Icon name="github " /> https://github.com/jlonsdale
            </Button>
            <Button color="grey">
              <Icon name="question circle" /> Information
            </Button>
            <Button color="teal">
              <Icon name="sliders horizontal" /> Environmental Conditions
            </Button>
            <Button color="blue">
              <Icon name="lightbulb" /> Electric Fields
            </Button>
            <Button color="violet">
              <Icon name="music" /> Harmonic Motion
            </Button>
            <Button color="purple">
              <Icon name="square full" /> Rigid Bodies
            </Button>
            <Button color="pink">
              <Icon name="area graph" /> Data & Graphs
            </Button>
          </Button.Group>
        </Menu.Item>
      </Menu>
    );
  }
}
