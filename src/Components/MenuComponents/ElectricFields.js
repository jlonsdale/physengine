import React, { useState } from "react";
import { Form, Radio } from "semantic-ui-react";
import "./../../Pages/style.css";

function ElectricFields({ engineState }) {
  const [charge, setCharge] = useState(0);
  const [active, setActive] = useState(false);

  const handleChange = (e, { value }) => {
    setCharge(value);
  };

  const handleToggle = (value) => {
    setActive(value);
  };

  return (
    <div>
      <h2> Electric Fields </h2>

      <h4>Activate</h4>
      <Radio
        toggle
        value={true}
        onChange={() => {
          handleToggle(!active);
        }}
      />

      {active ? (
        <div className="sliderContainer">
          <h4>Particle Charge</h4>
          <Form>
            <Form.Field>
              <Radio
                label="Positive Charge"
                name="radioGroup"
                value={0}
                checked={charge === 0}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Negative Charge"
                name="radioGroup"
                value={1}
                checked={charge === 1}
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
        </div>
      ) : null}
    </div>
  );
}

export default ElectricFields;
