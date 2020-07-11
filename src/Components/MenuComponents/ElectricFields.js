import React, { useState } from "react";
import { Form, Radio } from "semantic-ui-react";
import "./../../Pages/style.css";

function ElectricFields({ engineState }) {
  const [charge, setCharge] = useState(0);
  const handleChange = (e, { value }) => {
    setCharge(value);
  };

  return (
    <div>
      <h2> Electric Fields </h2>
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
        <br />
        <h4>Electric Field Strength</h4>
        <input
          type="range"
          className="slider"
          min={0.3}
          max={0.8}
          step={0.05}
        />
      </div>
    </div>
  );
}

export default ElectricFields;
