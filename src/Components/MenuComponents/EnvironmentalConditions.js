import React from "react";
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
              min={0.1}
              max={0.9}
              name="duration"
              onChange={(e) => {
                engineState.updateEnvConditions("cof", e.target.value);
              }}
              step={0.05}
            />
            <div>frictional constant (air resistance) </div>
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
