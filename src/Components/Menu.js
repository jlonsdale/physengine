import React from "react";
import { Menu, Icon, Button } from "semantic-ui-react";

export default class HeaderMenu extends React.Component {
  render() {
    return (
      <Menu>
        <Menu.Item header>
          <h2>
            <Icon name="rocket" size="large" />
            Physics Engine
          </h2>
        </Menu.Item>
        <Menu.Item>
          <div> https://github.com/jlonsdale </div>
        </Menu.Item>
        <Menu.Item>
          <Button.Group>
            <Button color="blue">
              <Icon name="sliders horizontal" /> Environmental Conditions
            </Button>
            <Button color="violet">
              <Icon name="lightbulb" /> Electric Fields
            </Button>
            <Button color="purple">
              <Icon name="music" /> Harmonic Motion
            </Button>
            <Button color="pink">
              <Icon name="square full" /> Rigid Bodies
            </Button>
            <Button color="red">
              <Icon name="area graph" /> Data & Graphs
            </Button>
          </Button.Group>
        </Menu.Item>
      </Menu>
    );
  }
}
