import React from "react";
import { Menu, Icon, Button } from "semantic-ui-react";

export default class HeaderMenu extends React.Component {
  handleItemClick = (e, { name }) => this.props.setActiveItem(name);

  render() {
    const activeItem = this.props.activeItem;

    return (
      <Menu stackable>
        <Menu.Item header>
          <h2>
            <Icon name="rocket" size="large" />
            Physics Engine
          </h2>
        </Menu.Item>
        <Menu.Item name="github">
          <a href="https://github.com/jlonsdale/physengine">
            <Icon name="github " /> Github repository
          </a>
        </Menu.Item>
        <Menu.Item
          name={this.props.menuStates.INFORMATION}
          active={activeItem === this.props.menuStates.INFORMATION}
          onClick={this.handleItemClick}
        >
          <Icon name="question circle" /> <div> Information </div>
        </Menu.Item>

        <Menu.Item
          name={this.props.menuStates.ENVIROMENTAL_CONDITIONS}
          active={activeItem === this.props.menuStates.ENVIROMENTAL_CONDITIONS}
          onClick={this.handleItemClick}
        >
          <Icon name="sliders horizontal" />
          <div> Environmental Conditions </div>
        </Menu.Item>

        <Menu.Item
          name={this.props.menuStates.ELECTRIC_FIELDS}
          active={activeItem === this.props.menuStates.ELECTRIC_FIELDS}
          onClick={this.handleItemClick}
        >
          <Icon name="lightbulb" />
          <div> Electric Fields </div>
        </Menu.Item>

        <Menu.Item
          name={this.props.menuStates.HARMONIC_MOTION}
          active={activeItem === this.props.menuStates.HARMONIC_MOTION}
          onClick={this.handleItemClick}
        >
          <Icon name="music" />
          <div> Harmonic Motion</div>
        </Menu.Item>

        <Menu.Item
          name={this.props.menuStates.RIGID_BODIES}
          active={activeItem === this.props.menuStates.RIGID_BODIES}
          onClick={this.handleItemClick}
        >
          <Icon name="square full" />
          <div> Rigid Bodies </div>
        </Menu.Item>
      </Menu>
    );
  }
}
