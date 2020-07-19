import React from "react";
import { Form, Radio } from "semantic-ui-react";
import "./../../Pages/style.css";

function ElectricFields({ engineState }) {
  const charge = engineState ? engineState.particleCharge : null;
  const activeState = engineState ? engineState.electricFieldActive : null;

  const handleChange = (e, { value }) => {
    engineState.updateCharge(value);
  };

  const handleToggle = (value, charge) => {
    engineState.toggleElectricField(value, charge);
    console.log(engineState.particleCharge);
  };

  return (
    <div>
      <h2> Electric Fields (WIP) </h2>
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
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Negative Charge"
                name="radioGroup"
                value={-1}
                checked={charge === -1}
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
          <h4>Electric Field Strength</h4>
          <input
            type="range"
            className="slider"
            min={0.3}
            max={0.8}
            step={0.05}
          />
          <h4>Electric Field Position</h4>
          <h5>Width</h5>
          <input
            type="range"
            className="slider"
            min={0.3}
            max={0.8}
            step={0.05}
          />
          <h5>Thickness</h5>
          <input
            type="range"
            className="slider"
            min={0.3}
            max={0.8}
            step={0.05}
          />
        </div>
      ) : null}
    </div>
  );
}

export default ElectricFields;
