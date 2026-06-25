import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    private life: number = 10;

    public loseLife(amount: number = 1) {
        this.life -= amount;
        console.log("remain life:", this.life);
    }
}


