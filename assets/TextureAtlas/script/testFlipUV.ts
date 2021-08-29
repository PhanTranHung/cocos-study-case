import { _decorator, Component, Node, SpriteFrame, Sprite } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Test")
export class Test extends Component {
  private spriteFrame: SpriteFrame | null = null;

  onLoad() {
    this.spriteFrame = this.getComponent(Sprite)?.spriteFrame || null;
  }

  start() {
    if (this.spriteFrame) {
      this.spriteFrame.flipUVX = true;
      console.log("sprite is  not null");
    } else console.log("sprite is null");
  }

  update(deltaTime: number) {}
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
