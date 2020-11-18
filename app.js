const dataSource = 'https://s5.ssl.qhres.com/static/b0695e2dd30daa64.json';

/* globals d3 */
(async function () {
  const data = await (await fetch(dataSource)).json();
  const regions = d3.hierarchy(data)
    .sum(d => 1)
    .sort((a, b) => b.value - a.value);

  const pack = d3.pack()
    .size([1600, 1600])
    .padding(3);

  const root = pack(regions);

  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');
  const TAU = 2 * Math.PI;

  function isInCircle (context, x, y, node) {
    const children = node.children
    if (children) {
      for (let i = 0; i < children.length; i++) {
        isInCircle(context, x, y, children[i])
      }
    } else {
      const circleX = node.x;
      const circleY = node.y;
      const circleR = node.r;
      const name = node.data.name;
      if ((circleX - x) ^ 2 + (circleY - y) ^ 2 < circleR ^ 2) {
        context.save();
        context.fillStyle = "rgba(255,255,255,255)";
        context.beginPath();
        context.arc(circleX, circleY, circleR, 0, TAU);
        context.fill();
        context.restore();
        context.fillStyle = "rgba(0,0,0,0.2)";
        context.beginPath();
        context.arc(circleX, circleY, circleR, 0, TAU);
        context.fill();
        context.fillStyle = "white";
        context.font = "1.5rem Arial";
        context.textAlign = "center";
        context.fillText(name, circleX, circleY);
      } 
    }
  }

  function draw(ctx, node, {fillStyle = 'rgba(0, 0, 0, 0.2)', textColor = 'white'} = {}) {
    const children = node.children;
    const {x, y, r} = node;
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.fill();
    if(children) {
      for(let i = 0; i < children.length; i++) {
        draw(context, children[i]);
      }
    } else {
      const name = node.data.name;
      ctx.fillStyle = textColor;
      ctx.font = '1.5rem Arial';
      ctx.textAlign = 'center';
      ctx.fillText(name, x, y);
    }
  }
  

  draw(context, root);

  window.addEventListener('mousemove', e => {
    isInCircle(context, e.clientX * 2, e.clientY * 2, root)
  })
}());