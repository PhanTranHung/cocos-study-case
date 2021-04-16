import { _decorator, Component, Node, Label } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LabelStatusControl")
export class LabelStatusControl extends Component {
  private label: Label | null = null;
  onLoad() {
    this.label = this.node.getComponent(Label);
  }

  change_stt_to_yes() {
    if (this.label) this.label.string = "I'm fine";
  }
  change_stt_to_no() {
    if (this.label) this.label.string = "I bored";
  }
}
