import {
  _decorator,
  Component,
  Node,
  systemEvent,
  SystemEvent,
  EventKeyboard,
  macro,
  RigidBody2D,
  Vec2,
  Collider2D,
  BoxCollider2D,
  Contact2DType,
  IPhysics2DContact,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("PlayerController")
export class PlayerController extends Component {
  private direction: number = 0;
  private velocity_max_x: number = 400;
  private rigid_body: null | RigidBody2D = null;
  private collider: null | Collider2D = null;
  private walk_force: number = 0;
  private jump_force: number = 0;
  private on_the_ground: boolean = false;

  onLoad() {
    this.direction = 0;
    this.walk_force = 50;
    this.jump_force = 1100;
    this.on_the_ground = false;
    this.collider = this.node.getComponent(Collider2D);
    this.rigid_body = this.node.getComponent(RigidBody2D);

    systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  start() {
    if (!this.collider) throw "Collider Null";
    this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }

  onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    console.log("Collider ...........");

    this.on_the_ground = true;
  }

  onKeyUp(event: EventKeyboard) {
    console.log("Key up");
    switch (event.keyCode) {
      case macro.KEY.left:
      case macro.KEY.right:
      case macro.KEY.a:
      case macro.KEY.d:
        this.direction = 0;
        break;
    }
  }

  onKeyDown(event: EventKeyboard) {
    console.log("Key down");
    switch (event.keyCode) {
      case macro.KEY.left:
      case macro.KEY.a:
        this.direction = -1;
        break;

      case macro.KEY.right:
      case macro.KEY.d:
        this.direction = 1;
        break;

      case macro.KEY.w:
      case macro.KEY.up:
      case macro.KEY.space:
        if (this.on_the_ground) {
          this.rigid_body?.applyForceToCenter(new Vec2(0, this.jump_force), true);
          this.on_the_ground = false;
        }
    }
  }

  update(dt: number) {
    if (this.direction != 0 && Math.abs(this.rigid_body?.linearVelocity?.x) < this.velocity_max_x)
      this.rigid_body?.applyForceToCenter(new Vec2(this.direction * this.walk_force, 0), true);
  }
}
