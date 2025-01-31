import opentype from "opentype.js";

export const sketch = (p) => {
  const DURATION = 120;
  const BREAKPOINT_DESKTOP = 1024;
  const BREAKPOINT_LAPTOP = 768;

  const DESKTOP_FONT_SIZE = 150;
  const DESKTOP_CANVAS_WIDTH = 930;
  const DESKTOP_CANVAS_HEIGHT = 122;
  const DESKTOP_LETTER_SPACING = -8;
  const DESKTOP_RT_SPACING = 10;
  const DESKTOP_PLUS_MARGIN = -20;
  const DESKTOP_STROKE_WEIGHT = 1.5;

  const LAPTOP_FONT_SIZE = 120;
  const LAPTOP_CANVAS_WIDTH = 730;
  const LAPTOP_CANVAS_HEIGHT = 100;
  const LAPTOP_LETTER_SPACING = -6;
  const LAPTOP_RT_SPACING = 8;
  const LAPTOP_PLUS_MARGIN = -15;
  const LAPTOP_STROKE_WEIGHT = 1;

  const MOBILE_FONT_SIZE = 50;
  const MOBILE_CANVAS_WIDTH = 315;
  const MOBILE_CANVAS_HEIGHT = 45;
  const MOBILE_LETTER_SPACING = -2;
  const MOBILE_RT_SPACING = 4;
  const MOBILE_PLUS_MARGIN = -7.5;
  const MOBILE_STROKE_WEIGHT = 0.5;

  const SAVE_FRAMES = false;

  const textContent = "+Jakarta Sans";
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);
  const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const easeInOutQuint = (t) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
  const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;
  const easeInOutExpo = (t) =>
    t === 0
      ? 0
      : t === 1
        ? 1
        : t < 0.5
          ? Math.pow(2, 20 * t - 10) / 2
          : (2 - Math.pow(2, -20 * t + 10)) / 2;
  const easing = easeInOutQuint;
  let font;
  let contourGroups = [];
  let animationDone = false;
  let resourcesLoaded = false;
  let setupComplete = false;
  let FONT_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT;
  let LETTER_SPACING, RT_SPACING_ADJUSTMENT, PLUS_MARGIN_BOTTOM, STROKE_WEIGHT;
  let frameNumber = 0;

  const calculateSizes = () => {
    const width = window.innerWidth;
    if (width >= BREAKPOINT_DESKTOP) {
      FONT_SIZE = DESKTOP_FONT_SIZE;
      CANVAS_WIDTH = DESKTOP_CANVAS_WIDTH;
      CANVAS_HEIGHT = DESKTOP_CANVAS_HEIGHT;
      LETTER_SPACING = DESKTOP_LETTER_SPACING;
      RT_SPACING_ADJUSTMENT = DESKTOP_RT_SPACING;
      PLUS_MARGIN_BOTTOM = DESKTOP_PLUS_MARGIN;
      STROKE_WEIGHT = DESKTOP_STROKE_WEIGHT;
    } else if (width >= BREAKPOINT_LAPTOP) {
      FONT_SIZE = LAPTOP_FONT_SIZE;
      CANVAS_WIDTH = LAPTOP_CANVAS_WIDTH;
      CANVAS_HEIGHT = LAPTOP_CANVAS_HEIGHT;
      LETTER_SPACING = LAPTOP_LETTER_SPACING;
      RT_SPACING_ADJUSTMENT = LAPTOP_RT_SPACING;
      PLUS_MARGIN_BOTTOM = LAPTOP_PLUS_MARGIN;
      STROKE_WEIGHT = LAPTOP_STROKE_WEIGHT;
    } else {
      FONT_SIZE = MOBILE_FONT_SIZE;
      CANVAS_WIDTH = MOBILE_CANVAS_WIDTH;
      CANVAS_HEIGHT = MOBILE_CANVAS_HEIGHT;
      LETTER_SPACING = MOBILE_LETTER_SPACING;
      RT_SPACING_ADJUSTMENT = MOBILE_RT_SPACING;
      PLUS_MARGIN_BOTTOM = MOBILE_PLUS_MARGIN;
      STROKE_WEIGHT = MOBILE_STROKE_WEIGHT;
    }
  };

  const resampleContour = (contour, resolution = 1) => {
    const resampledPoints = [];
    let prevPoint = null;

    const lerp = (p1, p2, t) => [
      p1[0] + t * (p2[0] - p1[0]),
      p1[1] + t * (p2[1] - p1[1]),
    ];

    const calculateDistance = (p1, p2) =>
      Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);

    const resampleLine = (p1, p2) => {
      const distance = calculateDistance(p1, p2);
      const steps = Math.ceil(distance / resolution);
      const points = [];
      for (let i = 1; i <= steps; i++) {
        points.push(lerp(p1, p2, i / steps));
      }
      return points;
    };

    const resampleQuadraticBezier = (p1, cp, p2) => {
      const points = [];
      const steps = Math.ceil(calculateDistance(p1, p2) / resolution);
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const x =
          (1 - t) ** 2 * p1[0] + 2 * (1 - t) * t * cp[0] + t ** 2 * p2[0];
        const y =
          (1 - t) ** 2 * p1[1] + 2 * (1 - t) * t * cp[1] + t ** 2 * p2[1];
        points.push([x, y]);
      }
      return points;
    };

    const resampleCubicBezier = (p1, cp1, cp2, p2) => {
      const points = [];
      const steps = Math.ceil(calculateDistance(p1, p2) / resolution);
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const x =
          (1 - t) ** 3 * p1[0] +
          3 * (1 - t) ** 2 * t * cp1[0] +
          3 * (1 - t) * t ** 2 * cp2[0] +
          t ** 3 * p2[0];
        const y =
          (1 - t) ** 3 * p1[1] +
          3 * (1 - t) ** 2 * t * cp1[1] +
          3 * (1 - t) * t ** 2 * cp2[1] +
          t ** 3 * p2[1];
        points.push([x, y]);
      }
      return points;
    };

    for (const cmd of contour) {
      switch (cmd.type) {
        case "M":
          prevPoint = [cmd.x, cmd.y];
          resampledPoints.push(prevPoint);
          break;
        case "L":
          if (prevPoint) {
            const linePoints = resampleLine(prevPoint, [cmd.x, cmd.y]);
            resampledPoints.push(...linePoints);
            prevPoint = [cmd.x, cmd.y];
          }
          break;
        case "Q":
          if (prevPoint) {
            const quadraticPoints = resampleQuadraticBezier(
              prevPoint,
              [cmd.x1, cmd.y1],
              [cmd.x, cmd.y],
            );
            resampledPoints.push(...quadraticPoints);
            prevPoint = [cmd.x, cmd.y];
          }
          break;
        case "C":
          if (prevPoint) {
            const cubicPoints = resampleCubicBezier(
              prevPoint,
              [cmd.x1, cmd.y1],
              [cmd.x2, cmd.y2],
              [cmd.x, cmd.y],
            );
            resampledPoints.push(...cubicPoints);
            prevPoint = [cmd.x, cmd.y];
          }
          break;
        case "Z":
          if (prevPoint && resampledPoints.length > 0) {
            const startPoint = resampledPoints[0];
            const closingPoints = resampleLine(prevPoint, startPoint);
            resampledPoints.push(...closingPoints);
            prevPoint = startPoint;
          }
          break;
        default:
          console.warn(`Unhandled command type: ${cmd.type}`);
          break;
      }
    }

    return resampledPoints;
  };

  const generateContourGroups = () => {
    if (!font) return;

    const baselinePosition =
      CANVAS_HEIGHT / 2 +
      ((font.ascender / font.unitsPerEm) * FONT_SIZE) / 2 -
      FONT_SIZE * 0.1 -
      5;

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

    let currentX = (CANVAS_WIDTH - totalWidth) / 2;
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

    contourGroups = allContours.map((contour) => resampleContour(contour));
  };

  p.setup = async () => {
    p.noLoop();
    calculateSizes();
    const canvas = p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.style.backgroundColor = "transparent";
    p.background(0, 0);
    if (SAVE_FRAMES) {
      p.frameRate(5);
    }

    try {
      const buffer = await fetch(
        "/plus-jakarta-site-redesign/fonts/subset/PlusJakartaSans-Bold-Subset.otf",
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
    const eased = easing(progress);
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

    if (SAVE_FRAMES && frameNumber <= DURATION + 5) {
      p.saveCanvas(`frame-${frameNumber.toString().padStart(4, "0")}`, "png");
      frameNumber++;
    }
  };
};
