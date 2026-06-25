import { _decorator, Component, Vec3 } from 'cc';
import { PathManager } from '../level/PathManager';
import { GameManager } from '../core/GameManager';
const { ccclass } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    private speed: number = 100;
    private pathPoints: Vec3[] = [];
    private arrivedAtEnd: boolean = false;
    private index: number = 0;
    private gameManager: GameManager | null = null;

    start() {
        console.log("Enemy initialized");
        const parentNode = this.node.parent;
        const pathRoot = parentNode.getChildByName("PathRoot");
        const pathManager = pathRoot.getComponent(PathManager);
        const gameManager = parentNode.getComponent(GameManager);

        if(!pathManager){
            return;
        }
        if(!gameManager){
            return;
        }
        this.pathPoints = pathManager.getPathPoints();
        this.gameManager = gameManager;
    }

    update(deltaTime: number) {
        if (!this.arrivedAtEnd) {
            this.moveAlongPath(deltaTime);
            if (this.arrivedAtEnd) {
                console.log("Enemy has reached the end of the path.");
                this.gameManager.loseLife(1);
                this.destroyEnemy();
            }
        }
    }

    private moveAlongPath(deltaTime: number) {
        if(this.index > this.pathPoints.length - 1){
            this.arrivedAtEnd = true;
            return;
        }
        let currentPosition = this.node.getPosition().clone();
        let targetPosition = this.pathPoints[this.index].clone();
        let direction = targetPosition.clone().subtract(currentPosition);
        let distance = direction.length();

        const moveDistance = this.speed * deltaTime;
        if(distance < moveDistance){
            this.node.setPosition(targetPosition);
            this.index++;
            return;
        }
        direction.normalize();
        currentPosition.add(direction.multiplyScalar(this.speed * deltaTime));
        this.node.setPosition(currentPosition);
    }

    private destroyEnemy() {
        this.node.destroy();
    }
}


