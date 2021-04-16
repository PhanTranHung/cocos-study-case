import { _decorator, Component, Node, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LoadScene")
export class LoadScene extends Component {
  // [1]
  // dummy = '';

  // [2]
  // @property
  // serializableDummy = 0;
  @property({ type: String })
  public sceneName: string | null = null;

  loadScene() {
    director.loadScene(this.sceneName);
  }

  onLoad() {}
}
