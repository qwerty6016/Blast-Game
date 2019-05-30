'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const xTilesAmount = 15;
const yTilesAmount = 10;
const tileWidth = Math.floor(canvas.width / xTilesAmount);
const tileHeight = Math.floor(canvas.height / yTilesAmount);
const tiles = [];
const colors = [
  'blue',
  'red',
  'green',
  'orange',
  'gray',
  'yellow',
  'violet',
  'aqua',
];

class Tile {
  constructor (tilesX, tilesY) {
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.tilesX = tilesX;
    this.tilesY = tilesY;
    this.checked = false;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(tileWidth * this.tilesX, tileHeight * this.tilesY, tileWidth, tileHeight);
  };

  reset() {
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.draw();
  };

  checkNeighbourTiles(thisTilesX, thisTilesY) {
    let sameColorNeighboursAmount = 0;
    let leftTile = tiles[thisTilesX - 1] ? tiles[thisTilesX - 1][thisTilesY] : false;
    let rightTile = tiles[thisTilesX + 1] ? tiles[thisTilesX + 1][thisTilesY] : false;
    let upperTile = tiles[thisTilesX][thisTilesY - 1] ? tiles[thisTilesX][thisTilesY - 1] : false;
    let lowerTile = tiles[thisTilesX][thisTilesY + 1] ? tiles[thisTilesX][thisTilesY + 1] : false;;
    this.checked = true;

    if (lowerTile && !lowerTile.checked && lowerTile.color === this.color) {
      sameColorNeighboursAmount++;
      lowerTile.checkNeighbourTiles(thisTilesX, thisTilesY + 1);
    };
    if (upperTile && !upperTile.checked && upperTile.color === this.color) {
      sameColorNeighboursAmount++;
      upperTile.checkNeighbourTiles(thisTilesX, thisTilesY - 1);
    };
    if (rightTile && !rightTile.checked && rightTile.color === this.color) {
      sameColorNeighboursAmount++;
      rightTile.checkNeighbourTiles(thisTilesX + 1, thisTilesY);
    };
    if (leftTile && !leftTile.checked && leftTile.color === this.color) {
      sameColorNeighboursAmount++;
      leftTile.checkNeighbourTiles(thisTilesX - 1, thisTilesY);
    };

    if (
      sameColorNeighboursAmount > 0
      || lowerTile.checked
      || upperTile.checked
      || rightTile.checked
      || leftTile.checked
    ) {
       this.reset();
    };

    this.checked = false;
  };
};

for (let x = 0; x < xTilesAmount; x++) {
  tiles[x] = [];

  for (var y = 0; y < yTilesAmount; y++) {
    tiles[x][y] = new Tile(x, y);
  };
};

tiles.forEach((xTiles) => {
  xTiles.forEach((yTile) => {
    yTile.draw();
  });
});

function mouseDown(event) {
  let xTiles = Math.floor(event.clientX / tileWidth);
  let yTile = Math.floor(event.clientY / tileHeight);
  tiles[xTiles][yTile].checkNeighbourTiles(xTiles, yTile);
};
