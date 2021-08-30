class GameOfLife {
    constructor(canvas, width, height, cellSize, {
        borderWidth,
        borderColor,
        aliveColor,
        deadColor,
        penColor
    } = {}) {
        /**
         * Main args check:
         */
        if (canvas === undefined) {
            throw new Error("Canvas connot be undefined")
        } else {
            this.canvas = canvas
            try {
                this.ctx = this.canvas.getContext("2d")
            } catch (err) {
                throw new Error(`Could not get context of canvas; Check for parsing errors: \n${err}`)
            }
        }
        width = parseFloat(width)
        height = parseFloat(height)
        cellSize = parseFloat(cellSize)
        
        if (Number.isNaN(width)) {
            throw new Error("Canvas type of width cannot NaN")
        }
        if (width <= 0) {
            throw new Error("Canvas width cannot be 0 or lower")
        }
        if (Number.isNaN(height)) {
            throw new Error("Canvas type of height cannot NaN")
        }
        if (height <= 0) {
            throw new Error("Canvas height cannt be 0 or lower")
        }
        if (Number.isNaN(cellSize)) {
            throw new Error("Canvas type of cell size cannot NaN")
        }
        if (cellSize <= 0) {
            throw new Error("Canvas cell size cannot be 0 or lower")
        }

        /**
         * Style args check:
         */
        this.borderWidth = borderWidth || 1
        this.cellSize = cellSize
        this.borderColor = borderColor || "#000000"
        this.aliveColor = aliveColor || "#000000"
        this.deadColor = deadColor || "#00000020"
        this.penColor = penColor || "grey"

        /**
         * Config:
         */
        this.runInterval = 0
        this.cellsInRow = Math.floor(width / cellSize)
        this.cellsInColumn = Math.floor(height / cellSize)
        this.grid = []
        this.canvas.width = this.cellsInRow * this.cellSize
        this.canvas.height = this.cellsInColumn * this.cellSize

        this.canvas.addEventListener("mousedown", e => {
            this.isDrawing = true
        })

        this.canvas.addEventListener("mouseup", e => {
            if (this.isDrawing) {
                this.isDrawing = false
            }
        })

        this.canvas.addEventListener("mousemove", e => {
            if (this.isDrawing) {
                this.popCell(e)
            }
        })

        this.canvas.addEventListener('click', e => {
            this.popCell(e)
        })
    }

    initGrid() {
        for (let i = 0; i < this.cellsInColumn; i++) {
            this.grid[i] = []
            for (let j = 0; j < this.cellsInRow; j++) {
                this.grid[i][j] = 0
            }
        }
    }

    randGenPop() {
        for (let i = 0; i < this.cellsInColumn; i++) {
            for (let j = 0; j < this.cellsInRow; j++) {
                this.grid[i][j] = Math.random() >= .5 ? 1 : 0
            }
        }
    }

    getCellPopStatus(column, row) {
        if (column < 0 || column > this.grid.length - 1) {
            return 0
        } else {
            if (row < 0 || row > this.grid[column].length - 1) {
                return 0
            } else {
                return this.grid[column][row]
            }
        }
    }

    countNeighbours(column, row) {
        let count = 0;

        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (!(i === 0 && j === 0)) {
                    count += this.getCellPopStatus(column + i, row + j)
                }
            }
        }
        return count
    }

    evalNextGen() {
        let tmp = []
        for (let i = 0; i < this.cellsInColumn; i++) {
            tmp[i] = []
            for (let j = 0; j < this.cellsInRow; j++) {
                tmp[i][j] = 0
                let n = this.countNeighbours(i, j)
                if (this.grid[i][j]) {
                    if (n === 2 || n === 3) {
                        tmp[i][j] = 1
                    }
                } else {
                    if (n === 3) {
                        tmp[i][j] = 1
                    }
                }
            }
        }
        this.grid = tmp
    }

    displayPop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (let i = 0; i < this.cellsInColumn; i++) {
            for (let j = 0; j < this.cellsInRow; j++) {
                this.ctx.fillStyle = this.grid[i][j] === 1 ? this.aliveColor : this.deadColor
                this.ctx.lineWidth = this.borderWidth
                this.ctx.strokeStyle = this.borderColor
                this.ctx.strokeRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize)
                this.ctx.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize)
            }
        }
    }

    popCell(e) {
        let x = Math.floor(e.offsetX / this.cellSize),
            y = Math.floor(e.offsetY / this.cellSize);

        if (this.grid[y][x] === 0) {
            this.grid[y][x] = 1
            this.ctx.fillStyle = this.penColor
            this.ctx.lineWidth = this.borderWidth
            this.ctx.strokeStyle = this.borderColor
            this.ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize)
            this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize)
        }
    }

    runGame(interval) {
        if (this.runInterval === 0) {
            this.runInterval = setInterval(() => {
                this.evalNextGen()
                this.displayPop()
            }, interval)
        }
    }

    pauseGame() {
        clearInterval(this.runInterval)
        this.runInterval = 0
    }
}