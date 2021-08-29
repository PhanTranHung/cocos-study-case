import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

export enum CameraEvents {
  MOVE = "move",
}

@ccclass("GameViewer")
export class GameViewer extends Component {
  @property({ type: Node })
  public mainCamera: Node = null!;
  @property({ type: Node })
  public character: Node = null!;

  onLoad() {}

  start() {
    // [3]
  }

  update(deltaTime: number) {
    const characterPosition = this.character.getPosition();
    const cameraPosition = this.mainCamera.getPosition();

    //this make Z corrdinate can not change
    characterPosition.z = cameraPosition.z;

    const currentPosition = cameraPosition.lerp(characterPosition, 0.1);
    this.mainCamera.setPosition(currentPosition);
    this.mainCamera.emit(CameraEvents.MOVE);
  }
}
