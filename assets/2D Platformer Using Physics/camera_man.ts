import { _decorator, Component, Node, misc } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CameraMan")
export class CameraMan extends Component {
  @property({ type: Node })
  player: null | Node = null;

  @property({ type: Node })
  bg_layer_back: Node | null = null;

  @property({ type: Node })
  bg_layer_mid: Node | null = null;

  onLoad() {}

  update(dt: number) {
    const target_position = this.player?.getPosition();
    const current_position = this.node.getPosition();

    if (target_position) {
      target_position.z = current_position.z;

      target_position.y = misc.clampf(target_position.y, -56, 56);

      current_position.lerp(target_position, 0.2);
      this.node.setPosition(current_position);
      this.bg_layer_back?.setPosition(current_position.x / 2, current_position.y / 2, 0);
      this.bg_layer_mid?.setPosition(current_position.x / 4, current_position.y / 4, 0);
    }
  }
}
