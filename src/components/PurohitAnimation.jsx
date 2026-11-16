import { useEffect, useRef } from "react";

const ink = "#522c22";
const skin = "#e6a16d";
const cream = "#fff3db";
const saffron = "#ab3928";
const gold = "#e5a342";

function shape(ctx, path, fill, stroke = ink, width = 2.8) {
  const outline = new Path2D(path);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill(outline);
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.stroke(outline);
  }
}

function oval(ctx, x, y, rx, ry, fill, stroke, width = 2.8) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.stroke();
  }
}

function drawFace(ctx, phase, seconds) {
  ctx.save();
  ctx.translate(164, 118);
  ctx.rotate(Math.sin(phase - .7) * .045);
  ctx.translate(-164, -118);

  shape(ctx, "M145 119 L145 143 Q158 155 182 142 L181 117Z", skin);
  oval(ctx, 198, 91, 10, 13, skin, ink);
  shape(ctx, "M130 65 Q145 34 178 46 Q204 53 202 84 L196 108 Q186 132 160 132 Q139 131 130 112 L124 92Z", skin);
  shape(ctx, "M125 87 Q109 72 119 52 Q118 39 132 42 Q142 21 169 29 Q192 24 205 44 Q218 56 204 82 L196 88 Q197 74 187 65 Q167 70 151 58 Q139 64 137 82Z", "#372821");
  shape(ctx, "M128 57 Q138 44 155 46 M157 37 Q174 34 187 44", null, "#694536", 2.5);

  const blink = seconds % 3.8 > 3.64;
  shape(ctx, "M135 83 Q141 79 148 83 M167 82 Q175 78 182 82", null, ink, 2.2);
  if (blink) {
    shape(ctx, "M136 92 Q141 95 147 92 M167 92 Q173 95 179 92", null, ink, 2);
  } else {
    oval(ctx, 141, 91, 4, 4.7, ink);
    oval(ctx, 173, 91, 4, 4.7, ink);
    oval(ctx, 140, 89.6, 1.15, 1.3, "#fff9e9");
    oval(ctx, 172, 89.6, 1.15, 1.3, "#fff9e9");
  }
  shape(ctx, "M155 94 Q149 103 155 104 M147 114 Q155 119 165 112", null, ink, 2);
  oval(ctx, 137, 104, 5.5, 2.6, "#ce754d");
  oval(ctx, 180, 104, 5.5, 2.6, "#ce754d");
  shape(ctx, "M151 70 Q152 79 157 79 Q162 78 163 69", null, "#fff5dd", 2.4);
  shape(ctx, "M157 73 L157 79", null, saffron, 2);
  ctx.restore();
}

function drawAarti(ctx, phase) {
  const x = 70 + Math.sin(phase) * 12;
  const y = 159 + Math.cos(phase) * 9;
  const elbow = 113 + Math.sin(phase) * 4;

  const arm = `M147 151 Q133 149 124 175 Q${elbow} 197 105 186 Q89 173 ${x + 7} ${y + 7}`;
  shape(ctx, arm, null, ink, 20);
  shape(ctx, arm, null, skin, 14);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.sin(phase + .5) * .11);
  shape(ctx, "M-5 -10 L-3 9 L-10 12 L5 12 L1 9 L2 -10Z", gold, ink, 2);
  shape(ctx, "M-17 -16 Q-12 -7 -2 -7 Q8 -7 13 -16Z", gold, ink, 2.2);
  oval(ctx, -2, -16, 15, 3.7, "#ffd988", ink, 1.8);
  oval(ctx, 0, 4, 7.5, 6.4, skin, ink, 2);
  shape(ctx, "M-4 3 L3 3 M-3 6 L3 6", null, "#a45d42", 1);

  ctx.translate(-3, -17);
  ctx.scale(1 + Math.sin(phase * 6) * .06, 1 + Math.cos(phase * 6) * .13);
  shape(ctx, "M0 0 Q-9 -1 -6 -10 Q-4 -14 1 -22 Q2 -17 6 -11 Q11 -1 0 0Z", "#f8a330", "#9e4c24", 1.5);
  shape(ctx, "M0 -1 Q-4 -3 -2 -7 L1 -12 Q5 -3 0 -1Z", "#fff1ab", null);
  ctx.restore();
}

function drawPurohit(ctx, seconds) {
  const phase = seconds * Math.PI * 2 / 3.8;
  ctx.setTransform(2, 0, 0, 2, 0, 0);
  ctx.clearRect(0, 0, 300, 278);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  oval(ctx, 174, 249, 100, 9, "#6c3f221b");
  shape(ctx, "M142 198 Q123 189 108 205 Q92 219 76 225 Q73 238 94 242 L174 239 Q197 252 236 244 Q269 240 270 224 Q269 212 244 213 L215 200Z", cream);
  shape(ctx, "M116 213 Q109 225 92 228 M130 221 Q148 231 173 232 M217 216 Q231 226 257 227", null, "#bb8c67", 2);

  shape(ctx, "M143 137 Q128 142 124 159 L131 199 Q147 223 187 222 Q215 219 224 205 L214 160 Q207 139 183 137Z", skin);
  shape(ctx, "M180 136 Q200 134 213 153 Q206 186 192 209 L181 223 Q157 224 143 214 Q166 190 180 136Z", cream);
  shape(ctx, "M190 142 Q187 170 168 198 L154 219 M195 145 Q192 176 174 202 L160 220", null, saffron, 2.4);
  shape(ctx, "M140 193 Q151 199 172 202 M191 216 Q209 218 225 209", null, "#bb8c67", 2);

  shape(ctx, "M208 154 Q219 156 221 166 L225 187 Q224 198 213 199 Q201 191 185 180 L179 180 Q172 178 170 170 L171 155 Q174 151 178 154 L185 166 L209 177Z", skin);
  shape(ctx, "M176 157 L178 169 M179 157 L182 169", null, "#a45d42", 1.4);
  drawAarti(ctx, phase);
  drawFace(ctx, phase, seconds);

  shape(ctx, "M147 137 Q160 151 176 143", null, "#784432", 2.4);
  for (const [x, y] of [[148,139], [153,144], [159,147], [166,147], [173,145]]) {
    oval(ctx, x, y, 2.25, 2.3, "#76452f");
  }
  oval(ctx, 56, 247, 33, 6, "#6c3f221b");
  oval(ctx, 55, 242, 32, 8, gold, ink, 2.2);
  oval(ctx, 54, 240, 26, 5, "#ffc873");
  shape(ctx, "M37 226 Q27 236 40 241 L50 241 Q63 236 52 225 L52 220 L37 220Z", gold, ink, 2);
  shape(ctx, "M44 221 Q32 219 32 209 Q41 209 45 219 Q47 208 57 207 Q57 214 47 221Z", "#63904e", ink, 1.5);
  oval(ctx, 63, 239, 5.3, 3.6, "#d95a34");
  oval(ctx, 72, 239, 5.5, 3.8, "#f4a631");
}

export default function PurohitAnimation() {
  const canvas = useRef(null);

  useEffect(() => {
    const context = canvas.current.getContext("2d");
    if (!context) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let start;

    function animate(time) {
      start ??= time;
      drawPurohit(context, (time - start) / 1000);
      frame = requestAnimationFrame(animate);
    }

    function updateMotion() {
      cancelAnimationFrame(frame);
      start = undefined;
      drawPurohit(context, 0);
      if (!preference.matches) frame = requestAnimationFrame(animate);
    }

    updateMotion();
    preference.addEventListener("change", updateMotion);
    return () => {
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", updateMotion);
    };
  }, []);

  return <canvas ref={canvas} className="api-loader-purohit" width="600" height="556" aria-hidden="true" />;
}
