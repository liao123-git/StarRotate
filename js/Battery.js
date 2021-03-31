class Battery extends Component {
    constructor() {
        super('battery');
        this.base = $(".battery");
        this.dom = $("#star");

        this.angle = 10;
        this.c = 0;

        this.init();
    }

    init() {
        document.addEventListener('mousemove', this.mouseEvent.bind(this));
        document.addEventListener('mouseup', this.mouseEvent.bind(this));
        document.addEventListener('mousedown', this.mouseEvent.bind(this));
    }

    mouseEvent(e) {
        let starPos = this.getPos(this.base);

        ({
            mousemove() {
                let data = this.getAngle({x: starPos.cx, y: starPos.cy}, e);
                this.angle = data.angle;
                this.c = data.c;
            },
            mousedown() {
                let data = this.getAngle({x: starPos.cx, y: starPos.cy}, e);
                this.angle = data.angle;
                this.c = data.c;
                let batteryPos = this.getPos(this.battery);
                !(e.x < batteryPos.w + batteryPos.x && e.y < batteryPos.y + batteryPos.h && e.x > batteryPos.x && e.y > batteryPos.y)
                && new Coordinate(e);
            },
            mouseup() {
            }
        })[e.type]?.bind(this)?.();
    }


    update() {
        this.dom.css({
            transform: `rotate(${this.angle}deg)`
        });
    }
}

