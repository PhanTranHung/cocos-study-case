import { _decorator, Component, Node, UIOpacity, Vec3, tween, EventHandler } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PopupControl")
export class PopupControl extends Component {
  // @property({ type: Node })
  // popup: Node | null = null;

  @property({ type: EventHandler })
  yes_handler: EventHandler | null = null;
  @property({ type: EventHandler })
  no_handler: EventHandler | null = null;

  private uiOpacity: UIOpacity | null = null;
  onLoad() {
    this.node.active = false;
    this.uiOpacity = this.node.getComponent(UIOpacity);
  }

  show_popup() {
    const node = this.node;
    node.active = true;
    node.setScale(new Vec3(0.2, 0.2, 1));
    if (this.uiOpacity) this.uiOpacity.opacity = 0;

    tween(node)
      .to(
        0.3,
        { scale: new Vec3(1, 1, 1) },
        {
          easing: "quadInOut",
          onUpdate: (target, ratio) => {
            if (this.uiOpacity) this.uiOpacity.opacity = 255 * ratio;
          },
        }
      )
      .start();
  }

  hide_popup() {
    tween(this.node)
      .to(
        0.3,
        { scale: new Vec3(0.2, 0.2, 1) },
        {
          easing: "quadInOut",
          onUpdate: (target, ratio) => {
            if (this.uiOpacity) this.uiOpacity.opacity = 255 - 255 * ratio;
          },
        }
      )
      .call(() => (this.node.active = false))
      .start();
  }

  yes_clicked() {
    if (this.yes_handler) this.yes_handler.emit([]);

    // this.hide_popup();
  }

  no_clicked() {
    if (this.no_handler) this.no_handler.emit([]);
    // this.hide_popup();
  }
}
