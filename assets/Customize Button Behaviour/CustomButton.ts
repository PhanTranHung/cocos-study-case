import { _decorator, Component, Node, Button, EventTouch } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CustomButton")
export class CustomButton extends Button {
  constructor(...props: any) {
    super(...props);
  }

  // touch event handler
  protected _onTouchBegan(event?: EventTouch) {
    super._onTouchBegan(event);
    if (event) event.propagationStopped = false;
  }
}
