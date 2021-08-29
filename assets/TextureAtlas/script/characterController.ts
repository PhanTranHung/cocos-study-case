import {
  _decorator,
  Component,
  EventKeyboard,
  CCInteger,
  systemEvent,
  SystemEventType,
  macro,
  Node,
  EventTouch,
  Enum,
  RigidBody2D,
  Vec2,
  BoxCollider2D,
  Contact2DType,
  Collider2D,
  IPhysics2DContact,
} from "cc";
const { ccclass, property } = _decorator;

export enum XDirection {
  LEFT = -1,
  RIGHT = 1,
}

enum PadButtons {
  JUMP,
  LEFT,
  RIGHT,
}

export enum CharacterEvents {
  START_MOVING = "startmoving",
  STOP_MOVING = "stopmoving",
  START_JUMPING = "startjumping",
  END_JUMPING = "endjumping",
}

interface Pad extends Node {
  padButton: PadButtons;
}

@ccclass("CharacterController")
export class CharacterController extends Component {
  static CharacterEvents = CharacterEvents;
  static XDirection = XDirection;

  @property({ type: CCInteger, tooltip: "Distance moved per second" })
  public moveXSpeed: number = 10;
  @property({ type: CCInteger })
  public jumpHeight: number = 1000;
  @property({ type: Node })
  public leftPad: Pad | null = null;
  @property({ type: Node })
  public rightPad: Pad | null = null;
  @property({ type: Node })
  public jumpPad: Pad | null = null;

  private isXMoveable: boolean = false;
  private curMoveXDirection: XDirection = XDirection.RIGHT;
  private rigidBody: RigidBody2D | null = null;
  private footCollider: BoxCollider2D | null = null;
  private isJumping: boolean = false;

  onLoad() {
    this.isXMoveable = false;
    this.rigidBody = this.node.getComponent(RigidBody2D);
    const listCollider = this.node.getComponents(BoxCollider2D) || [];
    this.footCollider = listCollider.find((collider) => collider.tag == 1) || null;

    if (this.footCollider) {
      this.footCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    if (this.leftPad) {
      this.leftPad.padButton = PadButtons.LEFT;
      this.leftPad.on(Node.EventType.TOUCH_START, this.onKeyDown, this);
      this.leftPad.on(Node.EventType.TOUCH_END, this.onKeyUp, this);
      this.leftPad.on(Node.EventType.TOUCH_CANCEL, this.onKeyUp, this);
    }
    if (this.rightPad) {
      this.rightPad.padButton = PadButtons.RIGHT;
      this.rightPad.on(Node.EventType.TOUCH_START, this.onKeyDown, this);
      this.rightPad.on(Node.EventType.TOUCH_END, this.onKeyUp, this);
      this.rightPad.on(Node.EventType.TOUCH_CANCEL, this.onKeyUp, this);
    }

    if (this.jumpPad) {
      this.jumpPad.padButton = PadButtons.JUMP;
      this.jumpPad.on(Node.EventType.TOUCH_START, this.onKeyDown, this);
      this.jumpPad.on(Node.EventType.TOUCH_END, this.onKeyUp, this);
      this.jumpPad.on(Node.EventType.TOUCH_CANCEL, this.onKeyUp, this);
    }

    systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
    systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);
  }

  onBeginContact(selfCollider: BoxCollider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    // console.log("Other collider group", otherCollider.group);

    this.endJumping();
    // if (otherCollider.group == 2) {
    // }
  }

  //   moveLeft(e: EventTouch) {
  //       e.
  //     this.startMoving(XDirection.LEFT);
  //   }

  //   moveRight(e: EventTouch) {
  //     this.startMoving(XDirection.RIGHT);
  //   }

  onKeyDown(e: EventKeyboard | EventTouch) {
    if (e instanceof EventTouch) {
      const target = <Pad>e.target;
      switch (target.padButton) {
        case PadButtons.LEFT:
          this.startMoving(XDirection.LEFT);
          break;

        case PadButtons.RIGHT:
          this.startMoving(XDirection.RIGHT);
          break;

        case PadButtons.JUMP:
          this.startJumping();
          break;
      }
    } else if (e instanceof EventKeyboard) {
      switch (e.keyCode) {
        case macro.KEY.a:
        case macro.KEY.left:
          this.startMoving(XDirection.LEFT);
          break;
        case macro.KEY.d:
        case macro.KEY.right:
          this.startMoving(XDirection.RIGHT);
          break;

        case macro.KEY.w:
        case macro.KEY.up:
          this.startJumping();
          break;
      }
    }
  }

  onKeyUp(e: EventKeyboard | EventTouch) {
    if (e instanceof EventTouch) {
      const target = <Pad>e.target;
      switch (target.padButton) {
        case PadButtons.LEFT:
        case PadButtons.RIGHT:
          if (this.isXMoveable) this.stopMoving();
          break;

        // case PadButtons.JUMP:
        //   this.endJumping();
        //   break;
      }
    } else if (e instanceof EventKeyboard) {
      switch (e.keyCode) {
        case macro.KEY.a:
        case macro.KEY.left:
        case macro.KEY.d:
        case macro.KEY.right:
          if (this.isXMoveable) this.stopMoving();
          break;

        case macro.KEY.w:
        case macro.KEY.up:
          break;
      }
    }
  }

  startJumping(force: number = this.jumpHeight) {
    if (!this.isJumping) {
      this.isJumping = true;
      if (this.rigidBody) {
        this.rigidBody.applyForceToCenter(new Vec2(0, force), true);
      }
      this.node.emit(CharacterEvents.START_JUMPING);
    }
  }
  endJumping() {
    this.isJumping = false;
    this.node.emit(CharacterEvents.END_JUMPING);
  }

  stopMoving() {
    this.isXMoveable = false;
    this.node.emit(CharacterEvents.STOP_MOVING);
  }

  startMoving(direction: XDirection) {
    if (!this.isXMoveable) {
      this.isXMoveable = true;
      this.node.emit(CharacterEvents.START_MOVING, direction);
      if (this.curMoveXDirection !== direction) {
        this.curMoveXDirection = direction;
        this.flipX();
      }
    }
  }

  update(dt: number) {
    this.handleMove(dt);
  }

  flipX() {
    const scale = this.node.getScale();
    scale.multiply3f(-1, 1, 1);
    this.node.setScale(scale);
  }

  handleMove(dt: number) {
    const position = this.node.getPosition();

    if (this.isXMoveable) {
      const moveDistance = dt * this.moveXSpeed * this.curMoveXDirection;
      position.add3f(moveDistance, 0, 0);
    }

    // console.log(position, this.node.getComponent(UITransform)?.contentSize);

    this.node.setPosition(position);
  }
}
