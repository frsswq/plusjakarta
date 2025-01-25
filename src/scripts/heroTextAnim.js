import opentype from "opentype.js";
import g from "g.js";

export const sketch = (p) => {
  const FONT_SIZE = 150;
  const PADDING = 0;
  const CANVAS_WIDTH = 1440;
  const CANVAS_HEIGHT = FONT_SIZE + PADDING * 2;
  const PLUS_MARGIN_BOTTOM = -20;
  const DURATION = 180;
  const LETTER_SPACING = -8;
  const RT_SPACING_ADJUSTMENT = 10;

  let font;
  const textContent = "+Jakarta Sans";
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  let contourGroups = [];
  let animationDone = false;

  p.setup = async () => {
    const canvas = p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.elt.style.backgroundColor = "transparent";

    const buffer = await fetch(
      "/assets/fonts/otf/PlusJakartaSans-Bold.otf",
    ).then((res) => res.arrayBuffer());

    font = opentype.parse(buffer);

    // Calculate total width for horizontal centering
    let totalWidth = 0;
    for (let i = 0; i < textContent.length; i++) {
      const char = textContent[i];
      totalWidth += font.getAdvanceWidth(char, FONT_SIZE);
      if (i < textContent.length - 1) {
        const spacing =
          char === "r" && textContent[i + 1] === "t"
            ? LETTER_SPACING + RT_SPACING_ADJUSTMENT
            : LETTER_SPACING;
        totalWidth += spacing;
      }
    }

    // Vertical centering using font metrics
    const baselinePosition =
      CANVAS_HEIGHT / 2 +
      ((font.ascender / font.unitsPerEm) * FONT_SIZE) / 2 -
      FONT_SIZE * 0.1; // Small adjustment for visual balance

    let currentX = (CANVAS_WIDTH - totalWidth) / 2; // Horizontal centering
    let currentY = baselinePosition;

    const allContours = [];

    for (let i = 0; i < textContent.length; i++) {
      const char = textContent[i];
      const yPos = char === "+" ? currentY + PLUS_MARGIN_BOTTOM : currentY;
      const charPath = font.getPath(char, currentX, yPos, FONT_SIZE);

      let currentContour = [];
      charPath.commands.forEach((cmd) => {
        if (cmd.type === "M" && currentContour.length > 0) {
          allContours.push(currentContour);
          currentContour = [];
        }
        currentContour.push(cmd);
      });
      allContours.push(currentContour);

      const advance = font.getAdvanceWidth(char, FONT_SIZE);
      const spacing =
        char === "r" && textContent[i + 1] === "t"
          ? LETTER_SPACING + RT_SPACING_ADJUSTMENT
          : LETTER_SPACING;

      currentX += advance + spacing;
    }

    contourGroups = allContours.map((contour) => {
      const gPath = new g.Path(contour);
      const resampled = g.resampleByLength(gPath, 1);
      return resampled.commands.map((c) => [c.x, c.y]);
    });
  };

  // The draw function remains unchanged
  p.draw = () => {
    p.clear();
    p.background(0, 0);
    p.stroke(0);
    p.noFill();
    p.strokeWeight(0.5);

    const progress = Math.min(p.frameCount / DURATION, 1);
    const eased = easeInOutCubic(progress);
    animationDone = progress >= 1;

    contourGroups.forEach((contour) => {
      const limit = Math.floor(contour.length * eased);

      p.beginShape();
      for (let j = 0; j < limit; j++) {
        const [x, y] = contour[j];
        p.vertex(x, y);
      }
      p.endShape(limit === contour.length ? p.CLOSE : undefined);
    });

    if (animationDone) {
      p.drawingContext.fillStyle = "#000";
      p.drawingContext.beginPath();

      contourGroups.forEach((contour) => {
        if (!contour.length) return;
        p.drawingContext.moveTo(...contour[0]);
        contour.forEach(([x, y]) => p.drawingContext.lineTo(x, y));
        p.drawingContext.closePath();
      });

      p.drawingContext.fill("evenodd");
    }
  };
};
