'use strict';

(() => {
    // パズルのクラスを作成
class Puzzle {
    // Canvasを使用する宣言
constructor(canvas, level) {
    this.canvas = canvas;
    this.level = level;
    this.ctx = this.canvas.getContext('2d');
    // 配列を組み込む
    this.tiles = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    ];
    // 配列がどう動くかを宣言
    this.UDLR = [
    [0, -1], // up
    [0, 1], // down
    [-1, 0], // left
    [1, 0], // right
    ];
    // 使用画像の宣言
    this.img = document.createElement('img');
    this.img.src = 'img/15puzzle.png';
    this.img.addEventListener('load', () => {
    this.render();
    });
    // 元画像を切り取ってパズルに使用
    this.canvas.addEventListener('click', e => {
    const rect = this.canvas.getBoundingClientRect();
    const col = Math.floor((e.clientX - rect.left) / 70);
    const row = Math.floor((e.clientY - rect.top) / 70);
    this.swapTiles(col, row);
    this.render();
    });
    this.shuffle(this.level);
}

shuffle(n) {
    let blankCol = 3;
    let blankRow = 3;

    for (let i = 0; i < n; i++) {
    let destCol;
    let destRow;
    do {
        const dir = Math.floor(Math.random() * 4);
        const UDLR = [
        [0, -1], // up
        [0, 1], // down
        [-1, 0], // left
        [1, 0], // right
        ];
        destCol = blankCol + this.UDLR[dir][0];
        destRow = blankRow + this.UDLR[dir][1];
    } while (
        destCol < 0 || destCol > 3 ||
        destRow < 0 || destRow > 3
    );

    [
        this.tiles[blankRow][blankCol],
        this.tiles[destRow][destCol],
    ] = [
        this.tiles[destRow][destCol],
        this.tiles[blankRow][blankCol],
    ];

    [blankCol, blankRow] = [destCol, destRow];
    }
}

swapTiles(col, row) {
    if (this.tiles[row][col] === 15) {
    return;
    }

    for (let i = 0; i < 4; i++) {
    const destCol = col + this.UDLR[i][0];
    const destRow = row + this.UDLR[i][1];

    if (
        this.isOutside(destCol,destRow) ===true
    ) {
        continue;
    }

    if (this.tiles[destRow][destCol] === 15) {
        [
        this.tiles[row][col],
        this.tiles[destRow][destCol],
        ] = [
        this.tiles[destRow][destCol],
        this.tiles[row][col],
        ];
        break;
    }
    }
}
// 列と行を入れ替える
isOutside(destCol,destRow) {
    return (
        destCol < 0 || destCol > 3 ||
        destRow < 0 || destRow > 3
    );
}

render() {
    for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
        this.renderTile(this.tiles[row][col], col, row);
    }
    }
}

renderTile(n, col, row) {
    this.ctx.drawImage(
    this.img,
    (n % 4) * 70, Math.floor(n / 4) * 70, 70, 70,
    col * 70, row * 70, 70, 70
    );
}
}

const canvas = document.querySelector('canvas');
if (typeof canvas.getContext === 'undefined') {
return;
}

new Puzzle(canvas, 30);
})();