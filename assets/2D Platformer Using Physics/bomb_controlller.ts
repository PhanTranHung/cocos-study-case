import { _decorator, Component, Node, RigidBody2D, Collider2D, instantiate, CircleCollider2D, Contact2DType, IPhysics2DContact, Animation } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BombControlller")
export class BombControlller extends Component {
  private rigid_body: null | RigidBody2D = null;
  private sensorCollider: null | CircleCollider2D = null;
  private readonly playerName = "Vampire";

  onLoad() {
    this.rigid_body = this.node.getComponent(RigidBody2D);
    this.sensorCollider = this.node.getComponent(CircleCollider2D);
  }

  start() {
    this.sensorCollider?.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }

  onBeginContact(selfCollider: CircleCollider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    // console.log("Other Collider", otherCollider.name);
    if (otherCollider.group !== 2) {
      const anim = this.node.getComponent(Animation);
      if (anim) anim.play();
    }
  }

  removeNode() {
    this.node.destroy();
  }

  disablePhysic() {
    // this.node.getComponent(RigidBody2D)?.enabled = false;
    // this.node.getComponent(Collider2D)?.enabled = false;
    // this.disablePhysic();

    const rb = this.node.getComponent(RigidBody2D);
    const cld = this.node.getComponent(Collider2D);
    if (rb) rb.enabled = false;
    if (cld) cld.enabled = false;
  }
}
