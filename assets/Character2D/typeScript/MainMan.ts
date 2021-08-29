import { _decorator, Component, Node, sp, Event } from "cc";

const { Skeleton } = sp;
const { ccclass, property } = _decorator;

@ccclass("MainMan")
export class MainMan extends Component {
  private character: null | sp.Skeleton = null;

  onLoad() {
    this.character = this.node.getComponent(Skeleton);
  }

  start() {}

  playAnimation(trackIndex: number = 0, name: string = "stay", loop: boolean = true) {
    this.character?.setAnimation(trackIndex, name, loop);
  }

  setAnimation(event: Event, customEventData: string) {
    this.playAnimation(0, customEventData);
  }
}
