import React from "react";
import { Menu, Icon, Segment, Button } from "semantic-ui-react";

export default class HeaderMenu extends React.Component {
  render() {
    return (
      <Menu>
        <Menu.Item header>
          <h2>Physics Engine</h2>
        </Menu.Item>
        <Menu.Item>
          <div> https://github.com/jlonsdale </div>
        </Menu.Item>
        <Menu.Item>
          <Button.Group>
            <Button color="red">Rigid Bodies</Button>
            <Button color="yellow">Electric Fields</Button>
            <Button color="green">Springs & Strings</Button>
            <Button color="green">Green</Button>
            <Button color="teal">Teal</Button>
            <Button color="blue">Blue</Button>
            <Button color="violet">Violet</Button>
            <Button color="purple">Purple</Button>
            <Button color="pink">Pink</Button>
          </Button.Group>
        </Menu.Item>
      </Menu>
    );
  }
}
