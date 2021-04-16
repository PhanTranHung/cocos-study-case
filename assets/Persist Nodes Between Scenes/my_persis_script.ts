import { _decorator, Component, Node, game } from "cc";
const { ccclass, property } = _decorator;

@ccclass("MyPersisScript")
export class MyPersisScript extends Component {
  onLoad() {
    game.addPersistRootNode(this.node);
  }
}
