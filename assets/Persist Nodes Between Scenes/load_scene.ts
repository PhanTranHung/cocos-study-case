import { _decorator, Component, Node, director, CCString } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LoadScene")
export class LoadScene extends Component {
  // [1]
  // dummy = '';

  // [2]
  // @property
  // serializableDummy = 0;
  @property({ type: CCString })
  public sceneName: string | null = null;

  loadScene() {
    director.loadScene(this.sceneName);
  }

  onLoad() {}
}
