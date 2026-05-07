"use client";
import * as React from 'react';
import AFRAME from 'aframe';
import '@ucl-nuee/robot-loader/robotRegistry.js';
import '@ucl-nuee/robot-loader/robotLoader.js';
import '@ucl-nuee/robot-loader/stillObjects.js';
import '@ucl-nuee/robot-loader/ikWorker.js';
import '@ucl-nuee/robot-loader/jointMoveTo.js';
import '@ucl-nuee/robot-loader/reflectWorkerJoints.js';
import '@ucl-nuee/robot-loader/reflectJointLimits.js';
import '@ucl-nuee/robot-loader/reflectCollision.js';
import '@ucl-nuee/robot-loader/armMotionUI.js';
import '@ucl-nuee/robot-loader/vrControllerThumbMenu.js';
import '@ucl-nuee/robot-loader/axesFrame.js';
import '@ucl-nuee/robot-loader/attachToAnother.js';
import '@ucl-nuee/robot-loader/baseMover.js';
import '@ucl-nuee/robot-loader/ChangeOpacity.js';
import '@ucl-nuee/robot-loader/fingerCloser.js';
import '@ucl-nuee/robot-loader/ignoreCollision.js';
import '@ucl-nuee/ik-cd-worker/IkWorkerParamsComponents.js';

function toSchema (obj, separator='; ') {
  if (typeof obj !== 'object' || obj === null) {
    return String(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map((v) => toSchema(v, ',')).join(', ');
  }
  return Object.entries(obj)
    .map(([key, value]) => `${key}: `+toSchema(value,','))
    .join(separator);
};

function App() {
  const deg90 = Math.PI/2;
  const deg80 = 80.0/180*Math.PI;
  const deg45 = Math.PI/4;
  const deg22 = Math.PI/8;
  const deg10 = 10.0/180*Math.PI;
  const sin15 = Math.sin(Math.PI/12);
  const cos15 = Math.cos(Math.PI/12);
  const menuSchemaR = toSchema({items: ['g1r-unitree-r-arm',
                                        'ur5e',
                                        'g1r-unitree-r-arm',
                                        'ray'],
                                laser: false});
  const menuSchemaL = toSchema({items: ['g1r-unitree-l-arm',
                                        'ur5e',
                                        'g1l-unitree-l-arm',
                                        'ray'],
                                laser: false});
  return (
    <a-scene xr-mode-ui="XRMode: xr"
      /* cd-worker-log-timing="timing: true" */
      cd-worker-log-collision="logCollision: true"
    >
      <a-entity camera position="-0.5 1.2 1.2"
      		wasd-controls="acceleration: 20; fly: true"
                look-controls></a-entity>
      <a-entity id="robot-registry"
                robot-registry >
        <a-entity right-controller
                  laser-controls="hand: right"
                  thumbstick-menu={menuSchemaR}
                  target-selector="id: ur5e"
                  event-distributor
                  visible="false">
          <a-entity a-axes-frame="length: 0.1" />
        </a-entity>
        <a-entity left-controller
                  laser-controls="hand: left"
                  thumbstick-menu={menuSchemaL}
                  target-selector="id: ur5e"
                  event-distributor
                  visible="false">
          <a-entity a-axes-frame="length: 0.1" />
        </a-entity>
      </a-entity>
      <a-plane id="ur5e"
               position="-1.0 0.0 -0.5" rotation="-90 0 -90"
               width="0.04" height="0.04" color="blue"
               robot-loader="model: ur5e"
               ik-worker={`0, ${-deg90}, ${deg90}, 0, ${deg90}, 0`}
               exact_solution="exact: false"
               reflect-worker-joints
               reflect-collision="color: orange"
               reflect-joint-limits
               arm-motion-ui
               base-mover="velocityMax: 0.2; angularVelocityMax: 0.5"
      />
      <a-entity id="table1"
               position="-1.0 0.0 -0.5" rotation="-90 0 -90"
               still-objects="model: table"
               ik-worker
               ignore-collision__b="other:ur5e; data: 0/0"
      >
      </a-entity>
    </a-scene>
  );
}

AFRAME.registerComponent('set-end-effector-pose', {
  schema : {
    position: {type: 'vec3', default: {x:0, y:0, z:0}},
    quaternion: {type: 'vec4', default: {x:0, y:0, z:0, w:1}},
  },
  update: function () {
    const send_ee_pose = () => {
      if (this.el.workerRef?.current) {
        this.el.workerRef.current.postMessage({
          type: 'set_end_effector_pose',
          endEffectorPoint: [this.data.position.x,
			     this.data.position.y,
			     this.data.position.z],
          endEffectorQuaternion: [this.data.quaternion.x,
                                  this.data.quaternion.y,
                                  this.data.quaternion.z,
                                  this.data.quaternion.w],
        });
      }
    };
    if (this.el.ikWorkerReady) {
      send_ee_pose();
    } else {
      this.el.addEventListener('ik-worker-ready', send_ee_pose, {once: true});
    }
  }
});

export default App;
