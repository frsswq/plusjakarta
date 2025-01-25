import p5 from "p5";
import opentype from "opentype.js";
import g from "g.js";

/** @param {p5} p */
const sketch = (p) => {
  let font;
  const txt = "Plus Jakarta Sans";
  const x = 200;
  const y = 200;
  const fontSize = 80;
  const duration = 60;

  let path;
  let gPath;
  let resampled = [];
  let resampledGroups = [];

  p.setup = async () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    const buffer = fetch("/otf/PlusJakartaSans-Regular.otf").then((res) =>
      res.arrayBuffer(),
    );

    font = opentype.parse(await buffer);
    path = font.getPath(txt, x, y, fontSize);

    gPath = new g.Path(path.commands);
    resampled = g.resampleByLength(gPath, 2);
    resampledGroups = resampled.commands.reduce((acc, curr) => {
      if (curr.type === "M") {
        acc.push([]);
      }

      if (curr.type !== "Z") {
        acc[acc.length - 1].push([curr.x, curr.y]);
      }

      return acc;
    }, []);
  };

  p.draw = () => {
    if (!font) return;

    p.background(255);
    p.strokeWeight(1);

    const t = Math.min(p.frameCount / duration, 1);

    // drawOpenTypePath(p, path);

    resampledGroups.forEach((group, i) => {
      // const groupT = p.constrain(t * resampledGroups.length - i, 0, 1);
      const pointToDraw = Math.floor(group.length * t);

      p.beginShape();
      p.stroke(0, 0, 0);

      for (let j = 0; j < pointToDraw; j++) {
        const pt = group[j];
        p.vertex(pt[0], pt[1]);
      }

      // group.forEach((pt, j) => {
      //   const pt = group[j];
      //   p.vertex(pt[0], pt[1]);
      // });

      if (pointToDraw === group.length) {
        p.endShape(p.CLOSE);
      } else {
        p.endShape();
      }
    });
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  const drawOpenTypePath = (p, path) => {
    const len = path.commands.length;

    for (let i = 0; i < len; i++) {
      const cmd = path.commands[i];
      if (cmd.type === "M") {
        p.beginShape();
        p.vertex(cmd.x, cmd.y);
      } else if (cmd.type === "L") {
        p.vertex(cmd.x, cmd.y);
      } else if (cmd.type === "C") {
        p.bezierVertex(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
      } else if (cmd.type === "Q") {
        p.quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
      } else if (cmd.type === "Z") {
        p.endShape(p.CLOSE);
      }
    }
  };
};

new p5(sketch);
