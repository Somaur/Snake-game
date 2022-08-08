function Target(size = 10, canvasOptions) {
    this.x
    this.y
    this.size = size
    this.canvasOptions = canvasOptions
}

Target.prototype.genRandomLocation = function(snake) {
    const { rows, columns } = this.canvasOptions
    randomPostion:
    while (true) {
        this.x = (Math.floor(Math.random() * columns - 1) + 1) * this.size
        this.y = (Math.floor(Math.random() * rows - 1) + 1) * this.size
        for (let i = 0; i < snake.len; i++) {
            if (this.x === snake.tails[i].x && this.y === snake.tails[i].y) {
                continue randomPostion
            }
        }
        break;
    }
}

Target.prototype.draw = function() {
    const { ctx } = this.canvasOptions
    ctx.fillStyle = "#e8ed14"
    ctx.fillRect(this.x, this.y, this.size, this.size);
}