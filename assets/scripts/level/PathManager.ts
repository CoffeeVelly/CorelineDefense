import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass } = _decorator;

@ccclass('PathManager')
export class PathManager extends Component {

    public pathPoints : Node[] = [];

    start() {
        this.pathPoints = [...this.node.children];
        this.pathPoints.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
        console.log("the number of path points:", this.pathPoints.length);
    }

    public getPathPoints(): Vec3[] {
        let points: Vec3[] = [];
        for (const point of this.pathPoints) {
            points.push(point.getPosition().clone());
        }

        //console.log("Path points:", points.map(p => p.toString()));
        return points;
    }
}


