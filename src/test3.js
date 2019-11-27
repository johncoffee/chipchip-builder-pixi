import { collideAll } from './helpers.js'

const PIXI = window.PIXI

const app = new PIXI.Application({
  width: 1024,
  height: 400,
  backgroundColor: 0xffffff,
});
document.querySelector('builder-container').appendChild(app.view);

const template40x2 = [
  {x: 0, y: 0, h: 40, w: 40, colour: 0xff8000, },
  {x: 0, y: 40, h: 40, w: 40, colour: 0xff0000, },
  {x: 40, y: 0, h: 40, w: 40, colour: 0x0080ff, },
  {x: 40, y: 40, h: 40, w: 40, colour: 0x0000ff, },
]

const spriteRect = new WeakMap()
const rectSprite = new WeakMap()

template40x2.forEach(fromTemplate)

function fromTemplate (rect) {
  // make a Graphics
  const graphics = new PIXI.Graphics();
  graphics.beginFill(rect.colour);
  graphics.drawRect(0,0, rect.w, rect.h);
  graphics.endFill();

  const sprite = new PIXI.Sprite();
  sprite.addChild(graphics)
  sprite.x = rect.x
  sprite.y = rect.y

  sprite.buttonMode = true
  sprite.interactive = true

  sprite.on('pointerdown', function (evt) {
    // console.log(evt, tplNode)
    const test = {...rect}
    test.w = test.w * 2
    test.h = test.h * 2
    const isColliding = collideAll(test, template40x2.filter(n => n !== rect))
    if (isColliding) return

    rect.w = rect.w * 2
    rect.h = rect.h * 2

    graphics.clear()
    graphics.beginFill(rect.colour);
    graphics.drawRect(0,0, rect.w, rect.h);
    graphics.endFill();
  })


  // text
  const txt = new PIXI.Text(`${rect.w} x ${rect.h}`)
  sprite.addChild(txt)

  spriteRect.set(sprite, rect)
  rectSprite.set(rect, sprite)

  app.stage.addChild(sprite)
}

function onDragStart(event) {
  this.data = event.data;
  this.dragging = true;
}

function onDragEnd() {
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
}

function onDragMove() {
  if (this.dragging) {
    const newPosition = this.data.getLocalPosition(this.parent);
    const rect = spriteRect[this.parent]
    console.log(rect,this)
    const test = {...rect, ...newPosition}
    const isColliding = collideAll(test, template40x2.filter(n => n !== rect))
    if (isColliding) return console.debug("collision")

    this.x = newPosition.x;
    this.y = newPosition.y;
  }
}
