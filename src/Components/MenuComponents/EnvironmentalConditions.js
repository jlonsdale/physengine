import React from "react";
import "./../../Pages/style.css";

function EnvironmentalConditions({ engineState }) {
  return (
    <div>
      <h2> Environmental Conditions </h2>
      <div className="sliderContainer">
        {engineState ? (
          <>
            <h4>Coefficient of Restitution</h4>
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
            <h4>Frictional Constant (Floor Resistance) </h4>
            <input
              type="range"
              className="slider"
              min={0.1}
              max={0.9}
              name="duration"
              onChange={(e) => {
                engineState.updateEnvConditions("cof", e.target.value);
              }}
              step={0.05}
            />
            <h4>Frictional Constant (Air Resistance) </h4>
            <input
              type="range"
              className="slider"
              min={0.1}
              max={0.9}
              name="duration"
              onChange={(e) => {
                engineState.updateEnvConditions("airRes", e.target.value);
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
