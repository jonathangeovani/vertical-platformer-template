const canvas = document.querySelector("#canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

function drawCanvas() {
  c.fillStyle = "#1F1F1F";
  c.fillRect(0, 0, canvas.width, canvas.height);
}

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
          height: 5,
        })
      );
    }
  });
});

function showDebugCollisionBlocks() {
  collisionBlocks.floor.forEach((block) => {
    block.update();
  });
}
function showDebugPlatformCollisionBlocks() {
  collisionBlocks.platform.forEach((block) => {
    block.update();
  });
}

const gravity = 0.2;

drawCanvas();

const player = new Player({
  position: {
    x: 100,
    y: 300,
  },
  collisionBlocks: collisionBlocks.floor,
  platformCollisionBlocks: collisionBlocks.platform,
  imageSrc: "./images/warrior/Idle.png",
  frameRate: 8,
  animations: {
    Idle: {
      imageSrc: "./images/warrior/Idle.png",
      frameRate: 8,
      frameBuffer: 4,
    },
    IdleLeft: {
      imageSrc: "./images/warrior/IdleLeft.png",
      frameRate: 8,
      frameBuffer: 4,
    },
    Run: {
      imageSrc: "./images/warrior/Run.png",
      frameRate: 8,
      frameBuffer: 5,
    },
    RunLeft: {
      imageSrc: "./images/warrior/RunLeft.png",
      frameRate: 8,
      frameBuffer: 5,
    },
    Jump: {
      imageSrc: "./images/warrior/Jump.png",
      frameRate: 2,
      frameBuffer: 4,
    },
    JumpLeft: {
      imageSrc: "./images/warrior/JumpLeft.png",
      frameRate: 2,
      frameBuffer: 4,
    },
    Fall: {
      imageSrc: "./images/warrior/Fall.png",
      frameRate: 2,
      frameBuffer: 4,
    },
    FallLeft: {
      imageSrc: "./images/warrior/FallLeft.png",
      frameRate: 2,
      frameBuffer: 4,
    },
  },
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
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./images/background.png",
});

const backgroundImageWidth = 576;
const backgroundImageHeight = 432;

const camera = {
  position: {
    x: 0,
    y: -backgroundImageHeight + scaledCanvas.height,
  },
};

function animate() {
  window.requestAnimationFrame(animate);
  drawCanvas();

  c.save();
  c.scale(4, 4);
  c.translate(camera.position.x, camera.position.y);
  background.update();

  // showDebugCollisionBlocks();
  // showDebugPlatformCollisionBlocks();

  player.checkForHorizontalCanvasCollision({ backgroundImageWidth });
  player.update();

  player.velocity.x = 0;

  if (keys.d.pressed) {
    player.switchSprite("Run");
    player.velocity.x = 2;
    player.lastDirection = "right";
    player.shouldPanCameraToTheLeft({ backgroundImageWidth, canvas, camera });
  } else if (keys.a.pressed) {
    player.switchSprite("RunLeft");
    player.lastDirection = "left";
    player.velocity.x = -2;
    player.shouldPanCameraToTheRight({ camera });
  } else if (player.velocity.y === 0) {
    if (player.lastDirection === "right") player.switchSprite("Idle");
    else player.switchSprite("IdleLeft");
  }

  if (player.velocity.y < 0) {
    player.shouldPanCameraDown({ camera });
    if (player.lastDirection === "right") player.switchSprite("Jump");
    else player.switchSprite("JumpLeft");
  } else if (player.velocity.y > 0) {
    player.shouldPanCameraUp({ backgroundImageHeight, canvas, camera });
    if (player.lastDirection === "right") player.switchSprite("Fall");
    else player.switchSprite("FallLeft");
  }

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
      player.velocity.y = -4.7;
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
