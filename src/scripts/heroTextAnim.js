import opentype from "opentype.js";
import g from "g.js";

export const sketch = (p) => {
  const PADDING = 0;
  const PLUS_MARGIN_BOTTOM = -20;
  const DURATION = 90;
  const LETTER_SPACING = -8;
  const RT_SPACING_ADJUSTMENT = 10;
  const STROKE_WEIGHT = 1;
  const MOBILE_BREAKPOINT = 768;

  let font;
  let FONT_SIZE;
  let CANVAS_HEIGHT;
  const textContent = "+Jakarta Sans";
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  let contourGroups = [];
  let animationDone = false;
  let resourcesLoaded = false;
  let setupComplete = false;

  const calculateSizes = () => {
    const container = document.getElementById("p5-container");
    FONT_SIZE = container.offsetWidth <= MOBILE_BREAKPOINT ? 50 : 120;
    CANVAS_HEIGHT = FONT_SIZE + PADDING * 2;
  };

  const generateContourGroups = () => {
    if (!font) return;

    const scaleFactor = FONT_SIZE / 150;
    const scaledLetterSpacing = LETTER_SPACING * scaleFactor;
    const scaledRTAdjustment = RT_SPACING_ADJUSTMENT * scaleFactor;
    const scaledPlusMargin = PLUS_MARGIN_BOTTOM * scaleFactor;

    let totalWidth = 0;
    for (let i = 0; i < textContent.length; i++) {
      const char = textContent[i];
      totalWidth += font.getAdvanceWidth(char, FONT_SIZE);
      if (i < textContent.length - 1) {
        const spacing =
          char === "r" && textContent[i + 1] === "t"
            ? scaledLetterSpacing + scaledRTAdjustment
            : scaledLetterSpacing;
        totalWidth += spacing;
      }
    }

    const baselinePosition =
      CANVAS_HEIGHT / 2 +
      ((font.ascender / font.unitsPerEm) * FONT_SIZE) / 2 -
      FONT_SIZE * 0.1;

    let currentX = (p.width - totalWidth) / 2;
    let currentY = baselinePosition;

    const allContours = [];

    for (let i = 0; i < textContent.length; i++) {
      const char = textContent[i];
      const yPos = char === "+" ? currentY + scaledPlusMargin : currentY;
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
          ? scaledLetterSpacing + scaledRTAdjustment
          : scaledLetterSpacing;

      currentX += advance + spacing;
    }

    contourGroups = allContours.map((contour) => {
      const gPath = new g.Path(contour);
      const resampled = g.resampleByLength(gPath, 1);
      return resampled.commands.map((c) => [c.x, c.y]);
    });
  };

  p.setup = async () => {
    p.noLoop();
    const container = document.getElementById("p5-container");

    try {
      calculateSizes();
      const canvas = p.createCanvas(container.offsetWidth, CANVAS_HEIGHT);
      canvas.elt.style.backgroundColor = "transparent";

      const buffer = await fetch("/fonts/otf/PlusJakartaSans-Bold.otf").then(
        (res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.arrayBuffer();
        },
      );

      font = opentype.parse(buffer);
      resourcesLoaded = true;

      generateContourGroups();
      setupComplete = true;

      p.loop();
    } catch (error) {
      console.error("Failed to initialize sketch:", error);
    }
  };

  p.windowResized = () => {
    if (!setupComplete) return;

    const container = document.getElementById("p5-container");
    calculateSizes();
    p.resizeCanvas(container.offsetWidth, CANVAS_HEIGHT);
    generateContourGroups();

    animationDone = false;
    window._animationFired = false;
    p.redraw();
  };

  p.draw = () => {
    if (!setupComplete || !resourcesLoaded) {
      p.clear();
      return;
    }

    p.clear();
    p.background(0, 0);
    p.stroke(255);
    p.noFill();
    p.strokeWeight(STROKE_WEIGHT);

    const progress = Math.min(p.frameCount / DURATION, 1);
    const eased = easeOutCubic(progress);
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
      if (!window._animationFired) {
        window.dispatchEvent(new Event("animationComplete"));
        window._animationFired = true;
      }

      p.drawingContext.fillStyle = "#fff";
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
