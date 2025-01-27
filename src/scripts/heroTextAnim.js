import opentype from "opentype.js";

export const sketch = (p) => {
  const DURATION = 90;
  const STROKE_WEIGHT = 1;
  const BREAKPOINT = 1024;
  const BASE_FONT_SIZE = 150;
  const BASE_CANVAS_WIDTH = 930;
  const BASE_CANVAS_HEIGHT = 150;
  const LAPTOP_FONT_SIZE = 120;
  const LAPTOP_CANVAS_WIDTH = 730;
  const LAPTOP_CANVAS_HEIGHT = 120;

  const textContent = "+Jakarta Sans";
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  let font;
  let contourGroups = [];
  let animationDone = false;
  let resourcesLoaded = false;
  let setupComplete = false;
  let FONT_SIZE;
  let CANVAS_WIDTH;
  let CANVAS_HEIGHT;

  const LETTER_SPACING_BASE = -8;
  const RT_SPACING_ADJUSTMENT_BASE = 10;
  const PLUS_MARGIN_BOTTOM_BASE = -20;

  const calculateSizes = () => {
    const isDesktop = window.innerWidth >= BREAKPOINT;
    FONT_SIZE = isDesktop ? BASE_FONT_SIZE : LAPTOP_FONT_SIZE;
    CANVAS_WIDTH = isDesktop ? BASE_CANVAS_WIDTH : LAPTOP_CANVAS_WIDTH;
    CANVAS_HEIGHT = isDesktop ? BASE_CANVAS_HEIGHT : LAPTOP_CANVAS_HEIGHT;
  };

  const resampleContour = (contour) => {
    let pathString = "";
    for (const cmd of contour) {
      switch (cmd.type) {
        case "M":
          pathString += `M ${cmd.x} ${cmd.y} `;
          break;
        case "L":
          pathString += `L ${cmd.x} ${cmd.y} `;
          break;
        case "C":
          pathString += `C ${cmd.x1} ${cmd.y1} ${cmd.x2} ${cmd.y2} ${cmd.x} ${cmd.y} `;
          break;
        case "Q":
          pathString += `Q ${cmd.x1} ${cmd.y1} ${cmd.x} ${cmd.y} `;
          break;
        case "Z":
          pathString += "Z ";
          break;
        default:
          console.warn(`Unhandled command type: ${cmd.type}`);
          break;
      }
    }

    const svgNS = "http://www.w3.org/2000/svg";
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", pathString);
    const totalLength = path.getTotalLength();
    const resampledPoints = [];

    if (totalLength === 0) return [];

    for (let len = 0; len <= totalLength; len += 1) {
      const point = path.getPointAtLength(len);
      resampledPoints.push([point.x, point.y]);
    }

    if (pathString.includes("Z")) {
      const startPoint = path.getPointAtLength(0);
      resampledPoints.push([startPoint.x, startPoint.y]);
    }

    return resampledPoints;
  };

  const generateContourGroups = () => {
    if (!font) return;

    const scaleFactor = FONT_SIZE / BASE_FONT_SIZE;
    const letterSpacing = LETTER_SPACING_BASE * scaleFactor;
    const rtSpacingAdjustment = RT_SPACING_ADJUSTMENT_BASE * scaleFactor;
    const plusMarginBottom = PLUS_MARGIN_BOTTOM_BASE * scaleFactor;

    let totalWidth = 0;
    for (let i = 0; i < textContent.length; i++) {
      const char = textContent[i];
      totalWidth += font.getAdvanceWidth(char, FONT_SIZE);
      if (i < textContent.length - 1) {
        const spacing =
          char === "r" && textContent[i + 1] === "t"
            ? letterSpacing + rtSpacingAdjustment
            : letterSpacing;
        totalWidth += spacing;
      }
    }

    const baselinePosition =
      CANVAS_HEIGHT / 2 +
      ((font.ascender / font.unitsPerEm) * FONT_SIZE) / 2 -
      FONT_SIZE * 0.1;

    let currentX = (CANVAS_WIDTH - totalWidth) / 2;
    let currentY = baselinePosition;

    const allContours = [];

    for (let i = 0; i < textContent.length; i++) {
      const char = textContent[i];
      const yPos = char === "+" ? currentY + plusMarginBottom : currentY;
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
          ? letterSpacing + rtSpacingAdjustment
          : letterSpacing;

      currentX += advance + spacing;
    }

    contourGroups = allContours.map((contour) => resampleContour(contour));
  };

  p.setup = async () => {
    p.noLoop();
    calculateSizes();
    const canvas = p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.style.backgroundColor = "transparent";
    p.background(0, 0);

    try {
      const buffer = await fetch(
        "/plus-jakarta-site-redesign/fonts/otf/PlusJakartaSans-Bold.otf",
      ).then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.arrayBuffer();
      });

      font = opentype.parse(buffer);
      resourcesLoaded = true;

      generateContourGroups();
      setupComplete = true;
      window.dispatchEvent(new Event("animationStart"));
      p.loop();
    } catch (error) {
      console.error("Failed to initialize sketch:", error);
    }
  };

  p.windowResized = () => {
    const prevFont = FONT_SIZE;
    const prevWidth = CANVAS_WIDTH;
    const prevHeight = CANVAS_HEIGHT;

    calculateSizes();

    if (
      prevFont !== FONT_SIZE ||
      prevWidth !== CANVAS_WIDTH ||
      prevHeight !== CANVAS_HEIGHT
    ) {
      p.resizeCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      generateContourGroups();
      animationDone = false;
      window._animationFired = false;
      window.dispatchEvent(new Event("animationStart"));
      p.redraw();
    }
  };

  p.draw = () => {
    if (!setupComplete || !resourcesLoaded) {
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

      const ctx = p.canvas.getContext("2d", { willReadFrequently: true });
      ctx.fillStyle = "#fff";
      ctx.beginPath();

      contourGroups.forEach((contour) => {
        if (!contour.length) return;
        ctx.moveTo(...contour[0]);
        contour.forEach(([x, y]) => ctx.lineTo(x, y));
        ctx.closePath();
      });

      ctx.fill("evenodd");
    }
  };
};
