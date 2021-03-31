class Script {
    constructor() {
        this.now = false;
        this.map = [];
        this.init();
    }

    init() {
        window.setTimeout(()=>{
            this.battery = new Battery();
        },1);
        this.update();
    }

    addMap(obj) {
        this.map.push(obj);
    }

    getMap() {
        return this.map;
    }

    update() {
        this.timer = window.setInterval(() => {
            this.map.forEach((item, key) => {
                if (!item.die) {
                    item.update();
                } else {
                    item.dom.remove();
                    this.map.splice(key, 1);
                }
            });
        }, 1000 / 60);
    }
}

$(() => {
    window.game = new Script();
});
