export function translation(tx: number, ty: number, tz: number) {
  return [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    tx, ty, tz, 1
  ];
}

export function xRotation(angleInRad: number) {
  const s = Math.sin(angleInRad);
  const c = Math.cos(angleInRad);

  return [
    1, 0, 0, 0,
    0, c, s, 0,
    0, -s, c, 0,
    0, 0, 0, 1
  ];
}

export function yRotation(angleInRad: number) {
  const s = Math.sin(angleInRad);
  const c = Math.cos(angleInRad);

  return [
    c, 0, -s, 0,
    0, 1, 0, 0,
    s, 0, c, 0,
    0, 0, 0, 1
  ];
}

export function zRotation(angleInRad: number) {
  const s = Math.sin(angleInRad);
  const c = Math.cos(angleInRad);

  return [
    c, s, 0, 0,
    -s, c, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
}

export function scaling(sx: number, sy: number, sz: number) {
  return [
    sx, 0, 0, 0,
    0, sy, 0, 0,
    0, 0, sz, 0,
    0, 0, 0, 1
  ];
}
