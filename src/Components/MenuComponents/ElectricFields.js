import React, { useState } from "react";
import { Form, Radio, Button, Icon } from "semantic-ui-react";
import "./../../Pages/style.css";

function ElectricFields({ engineState }) {
  const charge = engineState ? engineState.particleCharge : null;
  const activeState = engineState ? engineState.electricFieldActive : null;
  const eFieldStrength = engineState ? engineState.eFieldStrength : null;

  const [strength, setStrength] = useState(eFieldStrength);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleChargeChange = (e, { value }) => {
    engineState.updateCharge(value);
  };

  const handleStrengthChange = (e) => {
    setStrength(e.target.value);
    engineState.updateEFieldStrength(e.target.value);
  };

  const handleToggle = (value, charge) => {
    engineState.toggleElectricField(value, charge);
  };
  return (
    <div>
      <h2> Electric Fields </h2>
      <h4>Activate</h4>
      <Radio
        toggle
        value={true}
        onChange={() => {
          handleToggle(!activeState);
        }}
      />

      {activeState ? (
        <div className="sliderContainer">
          <h4>Particle Charge</h4>
          <Form>
            <Form.Field>
              <Radio
                label="Positive Charge"
                name="radioGroup"
                value={1}
                checked={charge === 1}
                onChange={handleChargeChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Negative Charge"
                name="radioGroup"
                value={-1}
                checked={charge === -1}
                onChange={handleChargeChange}
              />
            </Form.Field>
          </Form>
          <h4>Electric Field Strength</h4>
          <input
            type="range"
            className="slider"
            min={1}
            max={100}
            step={0.05}
            value={strength}
            onChange={handleStrengthChange}
          />
          <h3>Electric Field Position (WIP) </h3>

          <Button.Group>
            <Button color="green">
              <Icon name="plus circle" /> Width
            </Button>
            <Button color="red">
              <Icon name="minus circle" /> Width
            </Button>
          </Button.Group>
          <br />
          <br />
          <Button.Group>
            <Button color="green">
              <Icon name="plus circle" /> Height
            </Button>
            <Button color="red">
              <Icon name="minus circle" /> Height
            </Button>
          </Button.Group>
        </div>
      ) : null}
    </div>
  );
}

export default ElectricFields;
