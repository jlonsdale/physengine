import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import "./../../Pages/style.css";

function EnvironmentalConditions({ engineState }) {
  return (
    <div>
      <h3> Environmental Conditions </h3>
      <div className="sliderContainer">
        {engineState ? (
          <>
            <div>coefficient of restitution</div>
            <input
              type="range"
              className="slider"
              min={0.3}
              max={0.8}
              name="duration"
              onChange={(e) => {
                engineState.updateEnvConditions("cor", e.target.value);
              }}
              step={0.05}
            />
            <div>frictional constant (floor resistance) </div>
            <input
              type="range"
              className="slider"
              min={0.3}
              max={0.8}
              name="duration"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              step={0.05}
            />
            <div>frictional constant (air resistance) </div>
            <input
              type="range"
              className="slider"
              min={0.3}
              max={0.8}
              name="duration"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              step={0.05}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default EnvironmentalConditions;
