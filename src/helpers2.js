
export function collideAll(r1, list) {
  for (let i = 0; i < list.length; i++) {
    const r2 = list[i]
    assertRect(r1)
    assertRect(r2)
    if (isIntersect(r1.x, r1.y, r1.width, r1.height, r2.x, r2.y, r2.width, r2.height)) {
      return true
    }
  }
}

// copy paste https://stackoverflow.com/questions/31022269/collision-detection-between-two-rectangles-in-java#31035335
export function isIntersect(
  Ax, Ay, Aw, Ah,
  Bx, By, Bw, Bh) {
  return Bx + Bw > Ax &&
  By + Bh > Ay &&
  Ax + Aw > Bx &&
  Ay + Ah > By;
}

export function assertRect(r1) {
  console.assert(typeof r1.x === 'number')
  console.assert(typeof r1.y === 'number')
  console.assert(typeof r1.height === 'number', r1)
  console.assert(typeof r1.width === 'number')
}
