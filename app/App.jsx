"use client";
import * as React from 'react';
import 'aframe';
import '@ucl-nuee/robot-loader/robotRegistry.js';
import '@ucl-nuee/robot-loader/robotLoader.js';
import '@ucl-nuee/robot-loader/ikWorker.js';
import '@ucl-nuee/robot-loader/reflectWorkerJoints.js';
import '@ucl-nuee/robot-loader/armMotionUI.js';
import '@ucl-nuee/robot-loader/vrControllerThumbMenu.js';
import '@ucl-nuee/robot-loader/axesFrame.js';

function App() {
  const deg90 = Math.PI/2;
  return (
    <a-scene xr-mode-ui="XRMode: xr" >
      <a-entity camera position="-0.5 1.2 1.2"
      		wasd-controls="acceleration: 20; maxSpeed: 0.05; fly: true"
                look-controls></a-entity>
      <a-entity id="robot-registry"
                robot-registry >
        <a-entity right-controller
                  laser-controls="hand: right"
                  thumbstick-menu="items: ray; laser: false"
                  target-selector="id: ur5e"
                  event-distributor
                  visible="false">
          <a-entity a-axes-frame="length: 0.1" />
        </a-entity>
      </a-entity>
      <a-plane id="ur5e"
               position="0.0 0.0 -1.0" rotation="-90 0 -90"
               width="0.04" height="0.04" color="blue"
               robot-loader="model: ur5e"
               ik-worker={`0, ${-deg90}, ${deg90}, 0, ${deg90}, 0`}
               reflect-worker-joints
               arm-motion-ui
               base-mover="velocityMax: 0.2; angularVelocityMax: 0.5"
      />
    </a-scene>
  );
}

export default App;
