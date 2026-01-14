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
import '@ucl-nuee/robot-loader/attachToAnother.js';
import '@ucl-nuee/robot-loader/reflectCollision.js';
import '@ucl-nuee/robot-loader/baseMover.js';
import './fingerCloser.js';

function App() {
  const deg90 = Math.PI/2;
  const deg45 = Math.PI/4;
  const deg22 = Math.PI/8;
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
                  target-selector="id: g1r-unitree-r-arm"
                  event-distributor
                  visible="false">
          <a-entity a-axes-frame="length: 0.1" />
        </a-entity>
        <a-entity left-controller
                  laser-controls="hand: left"
                  thumbstick-menu="items: ray; laser: false"
                  target-selector="id: g1l-unitree-l-arm"
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
      <a-plane id="unitree-g1-torso"
               position="1.0 0.2 -0.5" rotation="-90 0 110"
               base-mover="velocityMax: 0.2; angularVelocityMax: 0.5"
               width="0.4" height="0.4" color="red"
      >
        <a-plane id="g1r-unitree-r-arm"
                 width="0.1" height="0.1" color="green"
                 material="opacity: 0.5; transparent: true; side: double;"
                 robot-loader="model: g1-right"
                 ik-worker={`${0}, ${0}, ${0}, ${0}, ${0}, 0, 0`}
                 reflect-worker-joints
                 reflect-collision="color: yellow"
                 attach-event-broadcaster
                 arm-motion-ui
        >
          <a-circle id="g1rt-unitree-r-thumb"
                    robot-loader="model: g1-right-thumb"
                    attach-to-another="to: g1r-unitree-r-arm"
                    finger-closer="stationaryJoints: 0; closeMax: -45"
                    radius="0.03" color="blue"
                    material="opacity: 0.5; transparent: true;"
          />
          <a-circle id="g1ri-unitree-r-index"
                    robot-loader="model: g1-right-index"
                    attach-to-another="to: g1r-unitree-r-arm"
                    finger-closer
                    radius="0.03" color="blue"
                    material="opacity: 0.5; transparent: true;"
          />
          <a-circle id="g1rm-unitree-r-middle"
                    robot-loader="model: g1-right-middle"
                    attach-to-another="to: g1r-unitree-r-arm"
                    finger-closer
                    radius="0.03" color="blue"
                    material="opacity: 0.5; transparent: true;"
          />
        </a-plane>

        <a-plane id="g1l-unitree-l-arm"
                 width="0.1" height="0.1" color="green"
                 material="opacity: 0.5; transparent: true; side: double;"
                 robot-loader="model: g1-left"
                 ik-worker={`${-deg22}, ${deg45}, ${0}, ${0}, ${0}, 0, 0`}
                 joint-desirable="gain: 0:200,1:200; upper: 0:-0.382,1:0.785; lower: 0:-0.382,1:0.785;"
                 reflect-worker-joints
                 reflect-collision="color: yellow"
                 attach-event-broadcaster
                 arm-motion-ui
        >
          <a-circle id="g1lt-unitree-l-thumb"
                    robot-loader="model: g1-left-thumb"
                    attach-to-another="to: g1l-unitree-l-arm"
                    finger-closer="stationaryJoints: 0; closeMax: 45"
                    radius="0.03" color="blue"
                    material="opacity: 0.5; transparent: true;"
          />
          <a-circle id="g1li-unitree-l-index"
                    robot-loader="model: g1-left-index"
                    attach-to-another="to: g1l-unitree-l-arm"
                    finger-closer="closeMax: -45"
                    radius="0.03" color="blue"
                    material="opacity: 0.5; transparent: true;"
          />
          <a-circle id="g1lm-unitree-l-middle"
                    robot-loader="model: g1-left-middle"
                    attach-to-another="to: g1l-unitree-l-arm"
                    finger-closer="closeMax: -45"
                    radius="0.03" color="blue"
                    material="opacity: 0.5; transparent: true;"
          />
        </a-plane>
      </a-plane>
    </a-scene>
  );
}

export default App;
