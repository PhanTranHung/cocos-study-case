import { _decorator, Component, Node, Vec2, SystemEventType, EventTouch, RigidBody, RigidBody2D, Vec3, CCInteger, Label, log } from "cc";
const { ccclass, property } = _decorator;

@ccclass("JoystickControl")
export class JoystickControl extends Component {
  @property(Node)
  joystickBall: null | Node = null;

  @property(CCInteger)
  joystickMax: number = 100;

  @property(Label)
  labelLocal: null | Label = null;

  @property(Label)
  labelWorld: null | Label = null;

  joystickVector: Vec2 = new Vec2(0, 0);
  rigidBody: null | RigidBody2D = null;

  onLoad() {
    this.rigidBody = this.node.getComponent(RigidBody2D);
    this.node.on(SystemEventType.TOUCH_START, this.joystickTouchStart, this);
    this.node.on(SystemEventType.TOUCH_MOVE, this.joystickTouchMove, this);
    this.node.on(SystemEventType.TOUCH_END, this.joystickTouchEnd, this);
    this.node.on(SystemEventType.TOUCH_CANCEL, this.joystickTouchEnd, this);
  }

  joystickTouchStart(event: EventTouch) {
    // console.log("Touch", event.getLocation(), this.node.getPosition());

    const touch_pos = event.getLocation();
    const local_touch_pos = this.rigidBody?.getLocalPoint(touch_pos);
    this.setJoystickBallPosition(local_touch_pos);
  }

  joystickTouchMove(event: EventTouch) {
    // console.log("Move", event.getLocation());

    const touch_pos = event.getLocation();
    const local_touch_pos = this.rigidBody?.getLocalPoint(touch_pos);
    this.setJoystickBallPosition(local_touch_pos);

    if (this.labelWorld) {
      this.labelWorld.string = `x: ${touch_pos.x}\ny: ${touch_pos.y}`;
    }
    // log(touch_pos);
  }

  joystickTouchEnd(event: EventTouch) {
    // console.log("End", event.getLocation());

    this.joystickBall?.setPosition(Vec3.ZERO);
    this.joystickVector = Vec2.ZERO;
  }

  // joystickTouchCancel(event: EventTouch) {
  //   // console.log("Cancel", event.getLocation());

  //   this.joystickBall?.setPosition(Vec3.ZERO);
  //   this.setJoystickBallPosition(Vec2.ZERO);
  // }

  setJoystickBallPosition(joystickPosition: Vec2) {
    this.limitJoystickPosition(joystickPosition);
    const { x, y } = joystickPosition;
    this.joystickBall?.setPosition(new Vec3(x, y, 1));
    this.joystickVector = joystickPosition;
    if (this.labelLocal) {
      this.labelLocal.string = `x: ${x}\ny: ${y}`;
    }
  }

  limitJoystickPosition(joystickPosition: Vec2) {
    const input_len = joystickPosition.length();
    if (input_len > this.joystickMax) joystickPosition.multiplyScalar(this.joystickMax / input_len);
  }
}
