import { _decorator, Component, Node, director, PhysicsSystem2D, EPhysics2DDrawFlags } from "cc";
const { ccclass, property } = _decorator;

@ccclass("MainGameControl")
export class MainGameControl extends Component {
  onLoad() {
    const physicsSystem = PhysicsSystem2D.instance;

    // physicsSystem.fixedTimeStep = 1 / 60;
    // physicsSystem.velocityIterations = 8;
    // physicsSystem.positionIterations = 8;

    physicsSystem.debugDrawFlags =
      EPhysics2DDrawFlags.Aabb | EPhysics2DDrawFlags.Pair | EPhysics2DDrawFlags.CenterOfMass | EPhysics2DDrawFlags.Joint | EPhysics2DDrawFlags.Shape;
  }
}
