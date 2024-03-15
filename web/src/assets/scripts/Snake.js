import { AcGameObject } from "./AcGameObject";
import { Cell } from "./Cell";

export class Snake extends AcGameObject {
    constructor(info, gamemap) {
        super();

        this.id = info.id;
        this.color = info.color;
        this.gamemap = gamemap;

        this.cells = [new Cell(info.r, info.c)]; // 存放蛇的身体， cells[0]存放蛇头
        this.next_cell = null; //下一步目标位置

        this.speed = 5;
        this.direction = -1; // -1表示没有指令，0 1 2 3表示上右下左
        this.status = "idle" // idle: 静止 move: 正在移动 die: 死亡

        this.dr = [-1, 0, 1, 0]; // 4个方向行的偏移量
        this.dc = [0, 1, 0, -1]; // 4个方向列的偏移量

        this.step = 0;
        this.eps = 1e-2; // 坐标误差
    }

    start () {

    }

    set_direction (d) {
        this.direction = d;
    }
    
    next_step () {
        const d = this.direction;
        this.next_cell = new Cell(this.cells[0].r + this.dr[d], this.cells[0].c + this.dc[d]);
        this.direction = -1;
        this.status = "move";
        this.step ++;

        const k = this.cells.length;
        for (let i = k; i > 0; i--){
            this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]));
        }
    }

    update_move() { 
        const dx = this.next_cell.x - this.cells[0].x;
        const dy = this.next_cell.y - this.cells[0].y;
        // distance 是最终要移动的总距离
        const distance = Math.sqrt(dx * dx + dy * dy);

        if(distance < this.eps){
            this.cells[0] = this.next_cell;
            this.next_cell = null;
            this.status = "idle";

        } else {
            // move_distance 是每帧移动的距离
            const move_distance = this.speed * this.timedelta / 1000;
            this.cells[0].x += move_distance * dx / distance;
            this.cells[0].y += move_distance * dy / distance;
        }
        // 头部增加新球


        // 尾部看情况去球
    }

    update() {
        if(this.status === 'move'){
            this.update_move();
        }
        this.render();
    }

    render() {
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;

        ctx.fillStyle = this.color;
        for(const cell of this.cells){
            ctx.beginPath();
            ctx.arc(cell.x * L, cell.y * L, L / 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}