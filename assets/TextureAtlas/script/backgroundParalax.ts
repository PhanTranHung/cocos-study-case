import { _decorator, Component, Node, UITransform, Vec2, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BackgroundParalax")
export class BackgroundParalax extends Component {
  @property({ type: Node })
  public target: Node | null = null;

  @property({ type: Vec3 })
  public paralaxFactor: Vec3 = new Vec3(1, 1, 0);

  //   @property({ type: Node })
  start() {
    // [3]
  }

  update(deltaTime: number) {
    if (this.target) {
      const targetPos = this.target.getPosition();
      const currentPos = this.node.getPosition();

      const paralaxPos = targetPos.multiply(this.paralaxFactor);
      this.node.setPosition(paralaxPos);
    }
  }
}
