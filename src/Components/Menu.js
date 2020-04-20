import React from "react";
import { Menu, Icon, Segment, Button } from "semantic-ui-react";

export default class HeaderMenu extends React.Component {
  render() {
    return (
      <Menu>
        <Menu.Item header>
          <h2>
            <i class="fas fa-rocket"></i> Physics Engine
          </h2>
        </Menu.Item>
        <Menu.Item>
          <div> https://github.com/jlonsdale </div>
        </Menu.Item>
        <Menu.Item>
          <Button.Group>
            <Button color="red">Red</Button>
            <Button color="orange">Orange</Button>
            <Button color="yellow">Yellow</Button>
            <Button color="olive">Olive</Button>
            <Button color="green">Green</Button>
            <Button color="teal">Teal</Button>
            <Button color="blue">Blue</Button>
            <Button color="violet">Violet</Button>
            <Button color="purple">Purple</Button>
            <Button color="pink">Pink</Button>
            <Button color="brown">Brown</Button>
            <Button color="grey">Grey</Button>
            <Button color="black">Black</Button>
          </Button.Group>
        </Menu.Item>
      </Menu>
    );
  }
}
