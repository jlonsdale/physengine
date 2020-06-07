import React from "react";
import { Form } from "semantic-ui-react";
import "./../../Pages/style.css";

function EnvironmentalConditions(name) {
  return (
    <div>
      <h3> Environmental Conditions </h3>
      <div className="sliderContainer">
        <div>coefficient of restitution</div>
        <input
          type="range"
          className="slider"
          min={0.1}
          max={0.8}
          name="duration"
          onChange={(e) => {
            console.log(e.target.value);
          }}
          step={0.1}
        />
        <div>frictional constant (floor resistance) </div>

        <input
          type="range"
          className="slider"
          min={0.1}
          max={0.8}
          name="duration"
          onChange={(e) => {
            console.log(e.target.value);
          }}
          step={0.1}
        />
        <div>frictional constant (air resistance) </div>
        <input
          type="range"
          className="slider"
          min={0.1}
          max={0.8}
          name="duration"
          onChange={(e) => {
            console.log(e.target.value);
          }}
          step={0.1}
        />
      </div>
    </div>
  );
}

export default EnvironmentalConditions;
