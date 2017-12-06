function Player(id, name, x, y, color, width, height, isLocal, $context) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.isLocal = isLocal;
    this.$context = $context;

    this.moving = {
		up: false,
		down: false,
		left: false,
        right: false,
        boost: false
    };

    if (isLocal) this.setControls();
}

Player.prototype = {

    update: function () {
        this.draw();
        if (this.isLocal) this.move();
    },

    draw: function () {
        this.$context.fillStyle = "black";
        this.$context.font = "10px Arial";
        this.$context.textAlign = "center";
        this.$context.fillText(this.name, this.x + 6, this.y - 1);
        this.$context.fillStyle = this.color;        
        this.$context.fillRect(this.x, this.y, this.width, this.height);
    },

    move: function () {
        var speedX = 0;
        var speedY = 0;
            
        if (this.moving.up)
            speedY = -1;
        else if (this.moving.down)
            speedY = 1;
        if (this.moving.left)
            speedX = -1;
        else if (this.moving.right)
            speedX = 1;
        
        this.x += (this.moving.boost) ? speedX * 3 : speedX;
        this.y += (this.moving.boost) ? speedY * 3 : speedY;
    },

    setControls: function () {
        var t = this;
        document.onkeydown = function(e) {
            var key = e.keyCode || e.which;
            switch (key) {
                case 38:
                case 87:
                    t.moving.up = true;
                    break;
                case 37:
                case 65:
                    t.moving.left = true;
                    break;
                case 40:
                case 83:
                    t.moving.down = true;
                    break;
                case 39:
                case 68:
                    t.moving.right = true;
                    break;
                case 16:
                    t.moving.boost = true;
                    break;
            }
        }

        document.onkeyup = function(e) {
            var key = e.keyCode || e.which;
            switch (key) {
                case 38:
                case 87:
                    t.moving.up = false;
                    break;
                case 37:
                case 65:
                    t.moving.left = false;
                    break;
                case 40:
                case 83:
                    t.moving.down = false;
                    break;
                case 39:
                case 68:
                    t.moving.right = false;
                    break;
                case 16:
                    t.moving.boost = false;
                    break;
            }
        }
    },

    collisionWithTile: function(tile) {
        if (this.x < tile.x + tile.width &&
            this.x + this.width > tile.x &&
            this.y < tile.y + tile.height &&
            this.height + this.y > tile.y) {
            return true;
        }
        return false;
    },

    reset: function() {
        this.x = 10;
        this.y = 40;
    }
}