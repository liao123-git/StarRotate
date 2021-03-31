class Component {
    constructor(name) {
        this.die = false;
        this.type = name;
        game.addMap(this);
    }

    getPos(dom = this.dom) {
        let offset = dom.offset();
        let x = offset.left;
        let y = offset.top;
        let w = dom.width();
        let h = dom.height();
        let cx = x + w / 2;
        let cy = y + h / 2;
        return {x, y, w, h, cx, cy};
    }

    getAngle(p1, p2) {
        let a = p2.x - p1.x;
        let b = -(p2.y - p1.y);
        let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

        let angle = Math.atan2(a, b) * 180 / Math.PI;

        return {angle, c};
    }


    update() {

    }
}

