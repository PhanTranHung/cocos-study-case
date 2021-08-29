import { _decorator, Component, Node, Animation } from "cc";
import { CharacterController, CharacterEvents, XDirection } from "./characterController";
const { ccclass, property } = _decorator;

enum AnimClips {
  WALK = "walk",
  IDLE = "idle",
  JUMP = "jump",
}

@ccclass("ControlAnimation")
export class ControlAnimation extends Component {
  private animation: Animation | null = null;
  private parent: Node = null!;
  private animationOnGround: AnimClips = AnimClips.IDLE;
  private isJumping: boolean = false;

  onLoad() {
    this.animation = this.getComponent(Animation);
    this.parent = this.node.getParent()!;
    this.parent.on(CharacterEvents.START_MOVING, this.onStartMoving, this);
    this.parent.on(CharacterEvents.STOP_MOVING, this.onStopMoving, this);
    this.parent.on(CharacterEvents.START_JUMPING, this.onStartJumping, this);
    this.parent.on(CharacterEvents.END_JUMPING, this.onEndJumping, this);
  }

  start() {
    // [3]
  }

  onStartJumping() {
    this.isJumping = true;
    if (this.animation) {
      this.animation.play(AnimClips.JUMP);
    }
  }

  onEndJumping() {
    this.isJumping = false;
    if (this.animation) {
      this.animation.play(this.animationOnGround);
    }
  }

  onStartMoving(direction: XDirection) {
    if (this.animation) {
      if (!this.isJumping) {
        this.animation.play(AnimClips.WALK);
      }
    }
    this.animationOnGround = AnimClips.WALK;
  }

  onStopMoving() {
    if (this.animation) {
      if (!this.isJumping) {
        this.animation.play(AnimClips.IDLE);
      }
    }
    this.animationOnGround = AnimClips.IDLE;
  }

  // update (deltaTime: number) {
  //     // [4]
  // }
}
