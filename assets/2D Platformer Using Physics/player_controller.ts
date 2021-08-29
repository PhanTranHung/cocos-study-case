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
  Prefab,
  instantiate,
  director,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("PlayerController")
export class PlayerController extends Component {
  @property({ type: Prefab })
  public bomb_prefab: null | Prefab = null;

  private direction: number = 0;
  private velocity_max_x: number = 0;
  private rigid_body: null | RigidBody2D = null;
  private colliders: Collider2D[] = [];
  private walk_force: number = 0;
  private jump_force: number = 0;
  private on_the_ground: boolean = false;

  private readonly bodyCollider: number = 1;
  private readonly footCollider: number = 0;

  onLoad() {
    this.direction = 0;
    this.walk_force = 10;
    this.jump_force = 6000;
    this.velocity_max_x = 10;
    this.on_the_ground = false;
    this.colliders = this.node.getComponents(Collider2D);
    this.rigid_body = this.node.getComponent(RigidBody2D);

    systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

    // console.log("all Colliders", this.node.getComponents(Collider2D));
  }

  start() {
    if (this.colliders.length <= 0) throw "Collider Null";
    const cldr = this.colliders.find((e) => e.tag === this.footCollider);
    if (!cldr) console.warn("Collider of the body of player is null");
    else cldr.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }

  onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    // console.log("Collider ...........");

    this.on_the_ground = true;
  }

  onKeyUp(event: EventKeyboard) {
    // console.log("Key up");
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
    // console.log("Key down");
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
        if (this.on_the_ground) {
          this.rigid_body?.applyForceToCenter(new Vec2(0, this.jump_force), true);
          this.on_the_ground = false;
        }
        break;
      case macro.KEY.space:
        return this.throwBomb();
    }
  }

  update(dt: number) {
    const linearVelocity = this.rigid_body.linearVelocity.x;
    const { direction } = this;
    if ((direction != 0 && Math.abs(linearVelocity) < this.velocity_max_x) || direction * linearVelocity < 0) {
      // console.log(this.rigid_body?.linearVelocity?.x);
      this.rigid_body?.applyLinearImpulseToCenter(new Vec2(this.direction * this.walk_force, 0), true);
    }
  }

  throwBomb() {
    const bomb: Node = instantiate(this.bomb_prefab);
    // this.node.addChild(bomb);
    bomb.parent = this.node;
    bomb.setPosition(40, 10, 0);

    const rb: RigidBody2D = bomb.getComponent(RigidBody2D);
    rb.applyForceToCenter(new Vec2(30000, 30000), true);
  }
}
