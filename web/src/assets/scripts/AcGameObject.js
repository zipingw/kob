const AC_GAME_OBJECTS = [];

export class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);
        this.has_call_start = false;
        this.timedelta = 0; // 用于计算物体移动速度

    }

    start() { // 只执行一次

    }

    update() { // 每一帧执行一次

    }

    on_destroy() { // 删除之前执行

    }

    destroy() {
        this.on_destroy();

        for (let i in AC_GAME_OBJECTS) {
            const obj = AC_GAME_OBJECTS[i];
            if(obj === this) {
                AC_GAME_OBJECTS.splice(i);
                break;
            }
        }   
    }
}

let last_timestamp; //上一次执行的时刻
const step = timestamp => {
    for (let obj of AC_GAME_OBJECTS) {
        if(!obj.has_call_start) {
            obj.has_call_start = true;
            obj.start();
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }

    last_timestamp = timestamp;
    requestAnimationFrame(step)
}

requestAnimationFrame(step)