import { _decorator, Component, Node, Vec3 } from "cc";
import { JoystickControl } from "./joystick_control";
const { ccclass, property } = _decorator;

@ccclass("Player")
export class Player extends Component {
  // @property({type: Node})
  // joystickNode: null | Node = null;

  @property({ type: JoystickControl })
  joystick: null | JoystickControl = null;

  update(dt: number) {
    debugger;
    // const joystick = this.joystickNode?.getComponent(JoystickControl);
    const pos = this.node.getPosition();
    const { x, y } = this.joystick?.joystickVector.clone().multiplyScalar(dt * 3);
    this.node.setPosition(pos.add(new Vec3(x, y, 1)));
  }
}
