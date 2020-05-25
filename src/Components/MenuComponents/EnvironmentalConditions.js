import React from "react";
import { Form, Grid, Image, Transition } from "semantic-ui-react";

function EnvironmentalConditions(name) {
  return (
    <div>
      <h3> Environmental Conditions </h3>
      <div>coefficient of restitution</div>
      <Form.Input
        min={0.1}
        max={0.8}
        name="duration"
        onChange={(e) => {
          console.log(e.target.value);
        }}
        step={0.1}
        type="range"
      />
      <div>frictional constant (floor resistance) </div>
      <Form.Input
        min={0.1}
        max={0.8}
        name="duration"
        onChange={(e) => {
          console.log(e.target.value);
        }}
        step={0.1}
        type="range"
      />
      <div>frictional constant (air resistance) </div>
      <Form.Input
        min={0.1}
        max={0.8}
        name="duration"
        onChange={(e) => {
          console.log(e.target.value);
        }}
        step={0.1}
        type="range"
      />
    </div>
  );
}

export default EnvironmentalConditions;
