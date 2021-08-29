import {
  _decorator,
  Component,
  Node,
  CircleCollider2D,
  Collider2D,
  Contact2DType,
  IPhysics2DContact,
  RigidBody,
  RigidBody2D,
  ERigidBody2DType,
  Vec2,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("ExplosionForce")
export class ExplosionForce extends Component {
  @property(Node)
  bombRoot: null | Node = null;

  private selfCollider: null | CircleCollider2D = null;

  onLoad() {
    this.selfCollider = this.node.getComponent(CircleCollider2D);

    if (!this.bombRoot) throw "Bomb root is null";
    if (!this.selfCollider) throw "self bomb collider is null";
    this.selfCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }

  onBeginContact(selfCollider: CircleCollider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    console.log("other collider", otherCollider.name);

    if (otherCollider.body?.type === ERigidBody2DType.Dynamic && otherCollider.node !== this.bombRoot) {
      if (!this.bombRoot) throw "Bomb root is null";

      const otherPos = otherCollider.node.getPosition();
      const selfPos = this.bombRoot.getPosition();

      const forceVector = otherPos.subtract(selfPos);
      const forceVector2D = new Vec2(forceVector.x, forceVector.y);
      //   forceVector.normalize();
      forceVector2D.multiply(new Vec2(100, 100));
      otherCollider.body.applyForceToCenter(forceVector2D, true);
    }
  }

  start() {
    // [3]
  }

  // update (deltaTime: number) {
  //     // [4]
  // }
}
