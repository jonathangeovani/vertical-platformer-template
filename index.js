const canvas = document.querySelector("#canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};

const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36));
}
const platformCollisions2D = [];
for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36));
}

const collisionBlocks = {
  floor: [],
  platform: [],
};
floorCollisions2D.forEach((row, rowIndex) => {
  row.forEach((col, colIndex) => {
    if (col == 202) {
      collisionBlocks.floor.push(
        new CollisionBlock({
          position: {
            x: colIndex * 16,
            y: rowIndex * 16,
          },
        })
      );
    }
  });
});
platformCollisions2D.forEach((row, rowIndex) => {
  row.forEach((col, colIndex) => {
    if (col == 202) {
      collisionBlocks.platform.push(
        new CollisionBlock({
          position: {
            x: colIndex * 16,
            y: rowIndex * 16,
          },
        })
      );
    }
  });
});

const gravity = 0.5;

c.fillStyle = "#FFF";
c.fillRect(0, 0, canvas.width, canvas.height);

const player = new Player({
  position: {
    x: 100,
    y: 200,
  },
  collisionBlocks: collisionBlocks.floor,
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./images/background.png",
});

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "#FFF";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();
  c.scale(4, 4);
  c.translate(0, -background.image.height + scaledCanvas.height);
  background.update();
  collisionBlocks.floor.forEach((block) => {
    block.update();
  });
  collisionBlocks.platform.forEach((block) => {
    block.update();
  });
  player.update();

  player.velocity.x = 0;
  if (keys.d.pressed) player.velocity.x = 3;
  else if (keys.a.pressed) player.velocity.x = -3;
  c.restore();
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "w":
      player.velocity.y = -7;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }
});
