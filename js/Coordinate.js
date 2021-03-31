class Coordinate extends Component {
    constructor(e) {
        super('coordinate');
        this.event = e;
        this.angle = game.battery.angle;
        this.c = game.battery.c;
        this.dom = $('<img src="img/coordinate.png" alt="" class="coordinate" draggable="false">');
        $('body').append(this.dom);
        this.dom.hide();

        this.dom[0].onload = () => {
            let x = this.event.x - this.dom.width() / 2;
            let y = this.event.y - this.dom.height();
            this.dom.css({
                left: x,
                top: y,
                display: 'block',
            });

            this.centerB = new Bullet(this);
            new Bullet(this, 1);
            new Bullet(this, 2);
        };
    }
}

