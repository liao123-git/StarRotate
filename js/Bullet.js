class Bullet extends Component {
    constructor(coordinate, curve = false) {
        super('bullet');
        this.batteryPos = game.battery.getPos();
        this.coordinatePos = coordinate.getPos();
        this.coordinate = coordinate;
        this.x = this.batteryPos.cx;
        this.y = this.batteryPos.cy;
        this.speed = curve ? 1 : 10;
        this.curve = curve;
        this.svg = this.makeSVG('path');
        this.triangle1 = this.makeSVG('line');
        this.dir = 0;
        this.dom = $('<img src="img/bullet.png" alt="" class="bullet" draggable="false">');
        $('body').append(this.dom);
        this.curve && $("svg").append(this.svg).append(this.triangle1);
        this.svg = $(this.svg);
        this.triangle1 = $(this.triangle1);

        this.dom.hide();
    }

    /**
     *   p1: start point
     *   p2: end point
     *   p3: x,y,now point
     * */
    getNewPos(p1, p2) {
        let totalA = p2.x - p1.x;
        let totalB = p2.y - p1.y;
        let totalC = Math.sqrt(Math.pow(totalA, 2) + Math.pow(totalB, 2));

        let nowA = Math.abs(this.x - p1.x);
        let nowB = Math.abs(this.y - p1.y);
        let nowC = Math.sqrt(Math.pow(nowA, 2) + Math.pow(nowB, 2));

        nowC += this.speed;

        this.dir = nowC / totalC;

        let x = p1.x + totalA * this.dir;
        let y = p1.y + totalB * this.dir;

        return {x, y, die: this.dir >= 1};
    }

    getCurvePos() {
        let pos = this.svg[0].getPointAtLength(this.coordinate.centerB.dir * this.svg[0].getTotalLength());
        let {x, y} = pos;

        return {x, y, die: this.dir >= 1};
    }


    update() {
        let newPos = this.getNewPos({x: this.batteryPos.cx, y: this.batteryPos.cy}, this.coordinatePos);
        if (this.curve) {
            this.updateCurve();
            newPos = this.getCurvePos();
        }
        this.x = newPos.x;
        this.y = newPos.y;
        this.die = newPos.die;
        this.coordinate.die = newPos.die;

        if (!this.die) {
            this.angle = this.getAngle({x: this.batteryPos.cx, y: this.batteryPos.cy}, this.coordinatePos).angle;
            this.curve && (this.angle = this.getAngle({
                x: this.getPos().cx,
                y: this.getPos().cy
            }, this.coordinatePos).angle);

            this.dom.css({
                left: this.x,
                top: this.y,
                display: 'block',
                transform: `rotate(${this.angle}deg)`
            });
        }
    }

    updateCurve() {
        let angle = this.curve === 1 ? 135 : 45;
        let b = this.batteryPos.cx + Math.cos((this.coordinate.angle - angle) / 180 * Math.PI) * this.coordinate.c;
        let a = this.batteryPos.cy + Math.sin((this.coordinate.angle - angle) / 180 * Math.PI) * this.coordinate.c;

        let path = `M${this.batteryPos.cx} ${this.batteryPos.cy} Q${b} ${a} ${this.coordinatePos.x} ${this.coordinatePos.y}`;
        this.svg.attr('d', path);

        this.triangle1.attr('x1', this.batteryPos.cx);
        this.triangle1.attr('y1', this.batteryPos.cy);
        this.triangle1.attr('x2', b);
        this.triangle1.attr('y2', a);


        $('.start').html(`${this.batteryPos.cx}, ${this.batteryPos.cy}`);
        $('.end').html(`${this.coordinatePos.x}, ${this.coordinatePos.y}`);
        this.curve === 1 ? $('.redRotate').html(this.coordinate.angle - angle) : $('.blackRotate').html(this.coordinate.angle - angle,` ${b},${a}`);
        this.curve === 1 ? $('.redLineLength').html(`${this.triangle1[0].getTotalLength()}`) : $('.blackLineLength').html(`${this.triangle1[0].getTotalLength()}`);
        this.curve === 2 ? $('.redPoint').html(`${b}, ${a}`) : $('.blackPoint').html(`${b}, ${a}`);
    }

    makeSVG(tag) {
        let el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        el.setAttribute('fill', 'none');
        el.setAttribute('stroke', this.curve === 1 ? 'black' : 'red');
        el.setAttribute('stroke-width', '1px');
        return el;
    }

}

