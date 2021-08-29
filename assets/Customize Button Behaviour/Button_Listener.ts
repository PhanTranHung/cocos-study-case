import { _decorator, Component, Node, SystemEventType, SystemEvent, EventTouch, Button } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ButtonListener")
export class ButtonListener extends Component {
  //   @property(Node)
  //   public button: null | Node = null;

  onLoad() {
    this.node.on(SystemEventType.TOUCH_START, this.touchStart, this);
  }

  touchStart(event: EventTouch) {
    console.log(event.getLocation());
  }
}
