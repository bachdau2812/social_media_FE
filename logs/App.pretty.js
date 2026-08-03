var El = Object.defineProperty;
var Tl = (e, a, t) => a in e ? El(e, a, { enumerable: true, configurable: true, writable: true, value: t }) : e[a] = t;
var kn = (e, a, t) => Tl(e, typeof a != "symbol" ? a + "" : a, t);
import { r as o, a as ya, j as n, R as Ln, u as Dl, b as Al } from "./index-BdKWyqDu.js";
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const zl = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), No = (...e) => e.filter((a, t, i) => !!a && a.trim() !== "" && i.indexOf(a) === t).join(" ").trim();
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Rl = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Pl = o.forwardRef(({ color: e = "currentColor", size: a = 24, strokeWidth: t = 2, absoluteStrokeWidth: i, className: r = "", children: s, iconNode: f, ...c }, d) => o.createElement("svg", { ref: d, ...Rl, width: a, height: a, stroke: e, strokeWidth: i ? Number(t) * 24 / Number(a) : t, className: No("lucide", r), ...c }, [...f.map(([u, h]) => o.createElement(u, h)), ...Array.isArray(s) ? s : [s]]));
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const te = (e, a) => {
  const t = o.forwardRef(({ className: i, ...r }, s) => o.createElement(Pl, { ref: s, iconNode: a, className: No(`lucide-${zl(e)}`, i), ...r }));
  return t.displayName = `${e}`, t;
};
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Dn = te("Archive", [["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }], ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" }], ["path", { d: "M10 12h4", key: "a56b0p" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ol = te("BellOff", [["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }], ["path", { d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742", key: "178tsu" }], ["path", { d: "m2 2 20 20", key: "1ooewy" }], ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05", key: "1hqiys" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ct = te("Bell", [["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }], ["path", { d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326", key: "11g9vi" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Kt = te("Bookmark", [["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const or = te("Briefcase", [["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }], ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const gn = te("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ul = te("ChevronDown", [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const dn = te("ChevronLeft", [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Cn = te("ChevronRight", [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Bl = te("ChevronUp", [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Gl = te("Compass", [["path", { d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z", key: "9ktpf1" }], ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Yl = te("Copy", [["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }], ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ea = te("Ellipsis", [["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }], ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }], ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Eo = te("ExternalLink", [["path", { d: "M15 3h6v6", key: "1q9fwt" }], ["path", { d: "M10 14 21 3", key: "gplh6r" }], ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ql = te("Eye", [["path", { d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0", key: "1nclc0" }], ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const fs = te("FilePen", [["path", { d: "M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5", key: "1couwa" }], ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }], ["path", { d: "M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z", key: "1y4qbx" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Jl = te("FileText", [["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }], ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }], ["path", { d: "M10 9H8", key: "b1mrlr" }], ["path", { d: "M16 13H8", key: "t4e002" }], ["path", { d: "M16 17H8", key: "z1uh3a" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const _l = te("FileVideo2", [["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4", key: "1pf5j1" }], ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }], ["rect", { width: "8", height: "6", x: "2", y: "12", rx: "1", key: "1a6c1e" }], ["path", { d: "m10 15.5 4 2.5v-6l-4 2.5", key: "t7cp39" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Fl = te("Film", [["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }], ["path", { d: "M7 3v18", key: "bbkbws" }], ["path", { d: "M3 7.5h4", key: "zfgn84" }], ["path", { d: "M3 12h18", key: "1i2n21" }], ["path", { d: "M3 16.5h4", key: "1230mu" }], ["path", { d: "M17 3v18", key: "in4fa5" }], ["path", { d: "M17 7.5h4", key: "myr1c1" }], ["path", { d: "M17 16.5h4", key: "go4c1d" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const fr = te("GraduationCap", [["path", { d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z", key: "j76jl0" }], ["path", { d: "M22 10v6", key: "1lu8f3" }], ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const To = te("GripVertical", [["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }], ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }], ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }], ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }], ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }], ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ja = te("Heart", [["path", { d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z", key: "c3ymky" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const cr = te("House", [["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }], ["path", { d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", key: "1d0kgt" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const An = te("ImagePlus", [["path", { d: "M16 5h6", key: "1vod17" }], ["path", { d: "M19 2v6", key: "4bpg5p" }], ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }], ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }], ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Do = te("Image", [["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }], ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }], ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const cs = te("Info", [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["path", { d: "M12 16v-4", key: "1dtifu" }], ["path", { d: "M12 8h.01", key: "e9boi3" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Hl = te("Languages", [["path", { d: "m5 8 6 6", key: "1wu5hv" }], ["path", { d: "m4 14 6-6 2-3", key: "1k1g8d" }], ["path", { d: "M2 5h12", key: "or177f" }], ["path", { d: "M7 2h1", key: "1t2jsx" }], ["path", { d: "m22 22-5-10-5 10", key: "don7ne" }], ["path", { d: "M14 18h6", key: "1m8k6r" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const lt = te("Library", [["path", { d: "m16 6 4 14", key: "ji33uf" }], ["path", { d: "M12 6v14", key: "1n7gus" }], ["path", { d: "M8 8v12", key: "1gg7y9" }], ["path", { d: "M4 4v16", key: "6qkkli" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const lr = te("Link2", [["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }], ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }], ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Mn = te("LoaderCircle", [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ao = te("Lock", [["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }], ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const $l = te("LogOut", [["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }], ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }], ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const zo = te("MapPin", [["path", { d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0", key: "1r0f0z" }], ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Vl = te("Maximize2", [["polyline", { points: "15 3 21 3 21 9", key: "mznyad" }], ["polyline", { points: "9 21 3 21 3 15", key: "1avn1i" }], ["line", { x1: "21", x2: "14", y1: "3", y2: "10", key: "ota7mn" }], ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const fn = te("MessageCircle", [["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Gt = te("Mic", [["path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z", key: "131961" }], ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }], ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const vn = te("Music2", [["circle", { cx: "8", cy: "18", r: "4", key: "1fc0mg" }], ["path", { d: "M12 18V2l7 4", key: "g04rme" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ro = te("Paperclip", [["path", { d: "M13.234 20.252 21 12.3", key: "1cbrk9" }], ["path", { d: "m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486", key: "1pkts6" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const na = te("Pause", [["rect", { x: "14", y: "4", width: "4", height: "16", rx: "1", key: "zuxfzm" }], ["rect", { x: "6", y: "4", width: "4", height: "16", rx: "1", key: "1okwgv" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ha = te("PenLine", [["path", { d: "M12 20h9", key: "t2du7b" }], ["path", { d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z", key: "1ykcvy" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ja = te("Play", [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Pa = te("Plus", [["path", { d: "M5 12h14", key: "1ays0h" }], ["path", { d: "M12 5v14", key: "s699le" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const xn = te("RefreshCw", [["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }], ["path", { d: "M21 3v5h-5", key: "1q7to0" }], ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }], ["path", { d: "M8 16H3v5", key: "1cv678" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const dr = te("Reply", [["polyline", { points: "9 17 4 12 9 7", key: "hvgpf2" }], ["path", { d: "M20 18v-2a4 4 0 0 0-4-4H4", key: "5vmcpk" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Zl = te("Save", [["path", { d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z", key: "1c8476" }], ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }], ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ma = te("Search", [["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }], ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const vt = te("Send", [["path", { d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z", key: "1ffxy3" }], ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Po = te("Settings", [["path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z", key: "1qme2f" }], ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Wl = te("Share2", [["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }], ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }], ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }], ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }], ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Oo = te("Shield", [["path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z", key: "oel41y" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ql = te("Smile", [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2", key: "1y1vjs" }], ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9", key: "yxxnd0" }], ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9", key: "1p4y9e" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Kl = te("SquarePlus", [["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }], ["path", { d: "M8 12h8", key: "1wcyev" }], ["path", { d: "M12 8v8", key: "napkw2" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const da = te("Trash2", [["path", { d: "M3 6h18", key: "d0wm0j" }], ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }], ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }], ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }], ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Xl = te("Type", [["polyline", { points: "4 7 4 4 20 4 20 7", key: "1nosan" }], ["line", { x1: "9", x2: "15", y1: "20", y2: "20", key: "swin9y" }], ["line", { x1: "12", x2: "12", y1: "4", y2: "20", key: "1tx1rr" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ed = te("Undo2", [["path", { d: "M9 14 4 9l5-5", key: "102s5s" }], ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const nd = te("UserMinus", [["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }], ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }], ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ls = te("UserPlus", [["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }], ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }], ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }], ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ad = te("UserRoundSearch", [["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }], ["path", { d: "M2 21a8 8 0 0 1 10.434-7.62", key: "1yezr2" }], ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }], ["path", { d: "m22 22-1.9-1.9", key: "1e5ubv" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Uo = te("UserRound", [["circle", { cx: "12", cy: "8", r: "5", key: "1hypcn" }], ["path", { d: "M20 21a8 8 0 0 0-16 0", key: "rfgkzh" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ur = te("User", [["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }], ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Bn = te("Users", [["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }], ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }], ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }], ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Lt = te("Video", [["path", { d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5", key: "ftymec" }], ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Oa = te("Volume2", [["path", { d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z", key: "uqj9uw" }], ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }], ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Xt = te("VolumeX", [["path", { d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z", key: "uqj9uw" }], ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }], ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const In = te("WifiOff", [["path", { d: "M12 20h.01", key: "zekei9" }], ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }], ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }], ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }], ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }], ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }], ["path", { d: "m2 2 20 20", key: "1ooewy" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const pe = te("X", [["path", { d: "M18 6 6 18", key: "1bl5f8" }], ["path", { d: "m6 6 12 12", key: "d8bk6v" }]]);
class Bo extends Error {
  constructor(t, i, r) {
    super(`${t} ${i} failed: ${r}`);
    kn(this, "status");
    kn(this, "path");
    this.name = "ApiError", this.status = r, this.path = i;
  }
}
const Ua = "http://localhost:8888/app";
function Go(e) {
  return typeof e == "object" && e !== null && "result" in e ? e.result : e;
}
async function fe(e, a = {}) {
  const t = await fetch(`${Ua}${e}`, { credentials: "include", headers: { Accept: "application/json" }, signal: a.signal });
  if (!t.ok) throw new Bo("GET", e, t.status);
  return Go(await t.json());
}
async function ie(e, a, t) {
  const i = await fetch(`${Ua}${e}`, { method: a, credentials: "include", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: t === void 0 ? void 0 : JSON.stringify(t) });
  if (!i.ok) throw new Bo(a, e, i.status);
  return Go(await i.json());
}
async function ga(e) {
  const a = await fe("/media/signature"), t = a.cloudName || void 0 || "dpilnbfrs", i = new FormData();
  i.append("file", e), i.append("api_key", a.apiKey), i.append("timestamp", String(a.timestamp)), i.append("signature", a.signature), a.folder && i.append("folder", a.folder), a.uploadPreset && i.append("upload_preset", a.uploadPreset);
  const r = await fetch(`https://api.cloudinary.com/v1_1/${t}/auto/upload`, { method: "POST", body: i });
  if (!r.ok) throw new Error(`Cloudinary upload failed: ${r.status}`);
  const s = await r.json();
  if (!s.secure_url || !s.public_id) throw new Error("Cloudinary upload response is missing media identifiers");
  return { secureUrl: s.secure_url, publicId: s.public_id, resourceType: s.resource_type || (e.type.startsWith("video/") || e.type.startsWith("audio/") ? "video" : "image"), bytes: s.bytes ?? e.size, width: s.width, height: s.height, duration: typeof s.duration == "number" ? Math.round(s.duration * 1e3) : void 0, format: s.format, fileName: s.original_filename || e.name, mimeType: e.type || (s.format ? `application/${s.format}` : "application/octet-stream") };
}
const td = "/assets/image_left_login-CzuVv5Z6.png", hr = ["1:1", "4:5", "3:4", "9:16", "4:3", "3:2", "16:9"], _i = "4:5";
function ei(e) {
  return hr.includes(e) ? e : _i;
}
function Yo(e) {
  const [a, t] = ei(e).split(":").map(Number);
  return `${a} / ${t}`;
}
const ds = 50 * 1024 * 1024, Mi = 300 * 1e3, us = 10;
function hs() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `media-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function Qo() {
  const [e, a] = o.useState([]), [t, i] = o.useState(null), [r, s] = o.useState(false), [f, c] = o.useState(0), [d, u] = o.useState(null), h = o.useRef(null), m = o.useRef(null), p = o.useRef([]), g = o.useRef(0), C = o.useRef(false), y = o.useRef(null), I = o.useRef(/* @__PURE__ */ new Set()), T = o.useRef(null);
  o.useEffect(() => {
    if (!r) return;
    const P = window.setInterval(() => {
      c(Math.min(Date.now() - g.current, Mi));
    }, 250);
    return () => window.clearInterval(P);
  }, [r]), o.useEffect(() => () => {
    w(true), I.current.forEach((P) => URL.revokeObjectURL(P)), T.current && URL.revokeObjectURL(T.current);
  }, []);
  function j() {
    var P;
    (P = m.current) == null || P.getTracks().forEach((D) => D.stop()), m.current = null, y.current !== null && (window.clearTimeout(y.current), y.current = null);
  }
  function E(P) {
    T.current && URL.revokeObjectURL(T.current), T.current = (P == null ? void 0 : P.previewUrl) ?? null, i(P);
  }
  function b(P) {
    if (u(null), !P) return;
    const D = Array.from(P);
    if (!D.length) return;
    const q = Math.max(0, us - e.length), ne = [];
    let be = null;
    D.slice(0, q).forEach((he) => {
      if (!he.type.startsWith("image/")) {
        be = "Ch\u1EC9 h\u1ED7 tr\u1EE3 t\u1EC7p \u1EA3nh.";
        return;
      }
      if (he.size > ds) {
        be = "M\u1ED7i \u1EA3nh kh\xF4ng \u0111\u01B0\u1EE3c v\u01B0\u1EE3t qu\xE1 50 MB.";
        return;
      }
      const re = URL.createObjectURL(he);
      I.current.add(re), ne.push({ id: hs(), kind: "IMAGE", file: he, previewUrl: re, status: "ready", progress: 0 });
    }), D.length > q && (be = `Ch\u1EC9 c\xF3 th\u1EC3 ch\u1ECDn t\u1ED1i \u0111a ${us} \u1EA3nh.`), be && u(be), ne.length && a((he) => [...he, ...ne]);
  }
  function N(P) {
    a((D) => {
      const q = D.find((ne) => ne.id === P);
      return q && (URL.revokeObjectURL(q.previewUrl), I.current.delete(q.previewUrl)), D.filter((ne) => ne.id !== P);
    });
  }
  function k(P, D) {
    P !== D && a((q) => {
      const ne = q.findIndex((me) => me.id === P), be = q.findIndex((me) => me.id === D);
      if (ne < 0 || be < 0) return q;
      const he = [...q], [re] = he.splice(ne, 1);
      return he.splice(be, 0, re), he;
    });
  }
  function B(P, D) {
    a((q) => q.map((ne) => ne.id === P ? { ...ne, ...D } : ne));
  }
  function z() {
    a((P) => (P.forEach((D) => {
      URL.revokeObjectURL(D.previewUrl), I.current.delete(D.previewUrl);
    }), [])), u(null);
  }
  async function x() {
    var P;
    if (u(null), !((P = navigator.mediaDevices) != null && P.getUserMedia) || typeof MediaRecorder > "u") {
      u("Tr\xECnh duy\u1EC7t kh\xF4ng h\u1ED7 tr\u1EE3 ghi \xE2m.");
      return;
    }
    w(true), E(null);
    try {
      const D = await navigator.mediaDevices.getUserMedia({ audio: true }), q = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"].find((be) => MediaRecorder.isTypeSupported(be)), ne = q ? new MediaRecorder(D, { mimeType: q }) : new MediaRecorder(D);
      m.current = D, h.current = ne, p.current = [], C.current = false, g.current = Date.now(), c(0), ne.ondataavailable = (be) => {
        be.data.size > 0 && p.current.push(be.data);
      }, ne.onstop = () => {
        const be = Math.min(Date.now() - g.current, Mi), he = C.current, re = p.current, me = ne.mimeType || "audio/webm";
        if (h.current = null, p.current = [], j(), s(false), he || re.length === 0) return;
        const we = new Blob(re, { type: me });
        if (we.size > ds) {
          u("Tin nh\u1EAFn tho\u1EA1i kh\xF4ng \u0111\u01B0\u1EE3c v\u01B0\u1EE3t qu\xE1 50 MB.");
          return;
        }
        const F = me.includes("mp4") ? "m4a" : "webm", ze = new File([we], `voice-${Date.now()}.${F}`, { type: me }), Se = URL.createObjectURL(we);
        E({ id: hs(), kind: "AUDIO", file: ze, previewUrl: Se, duration: be });
      }, ne.start(250), s(true), y.current = window.setTimeout(() => w(false), Mi);
    } catch {
      j(), u("Kh\xF4ng th\u1EC3 truy c\u1EADp microphone.");
    }
  }
  function w(P = false) {
    const D = h.current;
    if (!D || D.state === "inactive") {
      j(), s(false);
      return;
    }
    C.current = P, D.stop();
  }
  function Y() {
    if (u(null), r) {
      w(true);
      return;
    }
    E(null);
  }
  function V() {
    z(), Y();
  }
  return { images: e, audioAttachment: t, recording: r, recordingElapsed: f, error: d, selectImages: b, removeImage: N, moveImage: k, updateImageState: B, clearImages: z, startRecording: x, stopRecording: () => w(false), cancelRecording: () => w(true), clearAudio: Y, clearAll: V, clearError: () => u(null) };
}
function ot(e) {
  const a = Math.max(0, Math.floor(e / 1e3)), t = Math.floor(a / 60).toString().padStart(2, "0"), i = (a % 60).toString().padStart(2, "0");
  return `${t}:${i}`;
}
function id({ images: e, disabled: a, onAdd: t, onRemove: i, onMove: r, onRetry: s, onClear: f }) {
  const c = o.useRef(null);
  return e.length ? n.jsxs("section", { className: "chat-attachment-tray", "aria-label": `${e.length} \u1EA3nh \u0111\xE3 ch\u1ECDn`, children: [n.jsxs("header", { children: [n.jsxs("strong", { children: [e.length, " \u1EA3nh \u0111\xE3 ch\u1ECDn"] }), n.jsx("button", { type: "button", onClick: f, disabled: a, children: "B\u1ECF t\u1EA5t c\u1EA3" })] }), n.jsxs("div", { className: "chat-attachment-scroll", children: [e.map((d, u) => n.jsxs("article", { className: `chat-attachment-thumb ${d.status}`, draggable: !a, onDragStart: () => {
    c.current = d.id;
  }, onDragOver: (h) => h.preventDefault(), onDrop: () => {
    c.current && r(c.current, d.id), c.current = null;
  }, children: [n.jsx("img", { src: d.previewUrl, alt: `\u1EA2nh \u0111\xE3 ch\u1ECDn ${u + 1}` }), n.jsx("span", { className: "chat-attachment-index", children: String(u + 1).padStart(2, "0") }), !a && n.jsx("span", { className: "chat-attachment-drag", "aria-hidden": "true", children: n.jsx(To, { size: 13 }) }), n.jsx("button", { type: "button", className: "chat-attachment-remove", onClick: () => i(d.id), disabled: a, "aria-label": `B\u1ECF \u1EA3nh ${u + 1}`, children: n.jsx(pe, { size: 13 }) }), d.status === "uploading" && n.jsxs("span", { className: "chat-attachment-state", children: [n.jsx(Mn, { size: 15, className: "spin" }), n.jsxs("small", { children: [Math.max(1, d.progress), "%"] })] }), d.status === "failed" && n.jsxs("button", { type: "button", className: "chat-attachment-state failed", onClick: () => s(d.id), "aria-label": `Th\u1EED l\u1EA1i \u1EA3nh ${u + 1}`, children: [n.jsx(xn, { size: 14 }), n.jsx("small", { children: "Th\u1EED l\u1EA1i" })] })] }, d.id)), n.jsxs("button", { type: "button", className: "chat-attachment-add", onClick: t, disabled: a, "aria-label": "Th\xEAm \u1EA3nh", children: [n.jsx(An, { size: 19 }), n.jsx("span", { children: "Th\xEAm" })] })] })] }) : null;
}
function rd({ items: e, caption: a, onOpen: t, sending: i, failed: r, onRetry: s }) {
  const f = e.filter((h) => !!h.url);
  if (!f.length) return n.jsx("p", { className: "chat-media-unavailable", children: "\u1EA2nh kh\xF4ng c\xF2n kh\u1EA3 d\u1EE5ng." });
  const c = f.map((h, m) => ({ url: h.url, alt: h.fileName || `\u1EA2nh trong tin nh\u1EAFn ${m + 1}` })), d = f.length === 2 && f.every((h) => !!(h.width && h.height && h.width >= h.height)), u = d ? "paired" : "stacked";
  return n.jsxs("figure", { className: `chat-media-group media-card ${u} ${i ? "sending" : ""} ${r ? "failed" : ""}`, children: [n.jsx("div", { className: "chat-media-mosaic", children: f.map((h, m) => n.jsx(sd, { item: h, index: m, total: f.length, displayWidth: d ? 420 : 840, onOpen: () => t(c, m) }, h.id || `${h.url}-${m}`)) }), (a == null ? void 0 : a.trim()) && n.jsx("figcaption", { children: a.trim() }), i && n.jsxs("span", { className: "chat-media-group-status", children: [n.jsx(Mn, { size: 16, className: "spin" }), " \u0110ang g\u1EEDi"] }), r && n.jsxs("span", { className: "chat-media-group-status failed", children: ["G\u1EEDi th\u1EA5t b\u1EA1i ", s && n.jsxs("button", { type: "button", onClick: (h) => {
    h.stopPropagation(), s();
  }, children: [n.jsx(xn, { size: 14 }), " Th\u1EED l\u1EA1i"] })] })] });
}
function sd({ item: e, index: a, total: t, displayWidth: i, onOpen: r }) {
  const [s, f] = o.useState(false), [c, d] = o.useState(false), u = od(e.url, i);
  return n.jsxs("button", { type: "button", className: `chat-media-cell ${s ? "loaded" : "loading"}`, onClick: (h) => {
    h.stopPropagation(), r();
  }, "aria-label": `M\u1EDF \u1EA3nh ${a + 1} / ${t}`, children: [!s && !c && n.jsx(Mn, { size: 18, className: "spin" }), c ? n.jsxs("span", { children: [n.jsx(An, { size: 18 }), " Kh\xF4ng t\u1EA3i \u0111\u01B0\u1EE3c"] }) : n.jsx("img", { src: u, alt: e.fileName || `\u1EA2nh trong tin nh\u1EAFn ${a + 1}`, onLoad: () => f(true), onError: () => d(true) })] });
}
function od(e, a) {
  const t = "/image/upload/", i = e.indexOf(t);
  if (i < 0) return e;
  const r = e.slice(0, i + t.length), s = e.slice(i + t.length);
  return `${r}c_scale,w_${a},q_auto:good,f_auto/${s}`;
}
function mr({ items: e, initialIndex: a, onClose: t }) {
  const [i, r] = o.useState(Math.min(Math.max(a, 0), Math.max(0, e.length - 1))), s = o.useRef(null);
  o.useEffect(() => {
    const c = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const d = (u) => {
      u.key === "Escape" && t(), u.key === "ArrowLeft" && r((h) => Math.max(0, h - 1)), u.key === "ArrowRight" && r((h) => Math.min(e.length - 1, h + 1));
    };
    return window.addEventListener("keydown", d), () => {
      document.body.style.overflow = c, window.removeEventListener("keydown", d);
    };
  }, [e.length, t]);
  const f = e[i];
  return f ? ya.createPortal(n.jsxs("div", { className: "chat-media-viewer", role: "dialog", "aria-modal": "true", "aria-label": "Xem \u1EA3nh", onPointerDown: (c) => {
    c.target === c.currentTarget && t();
  }, onTouchStart: (c) => {
    var d;
    s.current = ((d = c.touches[0]) == null ? void 0 : d.clientX) ?? null;
  }, onTouchEnd: (c) => {
    var h;
    const d = s.current, u = (h = c.changedTouches[0]) == null ? void 0 : h.clientX;
    s.current = null, !(d == null || u == null || Math.abs(d - u) < 45) && r((m) => d > u ? Math.min(e.length - 1, m + 1) : Math.max(0, m - 1));
  }, children: [n.jsxs("header", { children: [n.jsxs("span", { children: [String(i + 1).padStart(2, "0"), " / ", String(e.length).padStart(2, "0")] }), n.jsx("button", { type: "button", onClick: t, "aria-label": "\u0110\xF3ng", children: n.jsx(pe, { size: 22 }) })] }), i > 0 && n.jsx("button", { type: "button", className: "chat-viewer-nav previous", onClick: () => r((c) => c - 1), "aria-label": "\u1EA2nh tr\u01B0\u1EDBc", children: n.jsx(dn, { size: 25 }) }), n.jsx("img", { src: f.url, alt: f.alt }), i < e.length - 1 && n.jsx("button", { type: "button", className: "chat-viewer-nav next", onClick: () => r((c) => c + 1), "aria-label": "\u1EA2nh ti\u1EBFp theo", children: n.jsx(Cn, { size: 25 }) })] }), document.body) : null;
}
const ms = [8, 13, 20, 12, 24, 16, 27, 18, 11, 22, 26, 15, 23, 12, 19, 25, 17, 10, 22, 14, 24, 18, 12, 8];
function Qn(e) {
  return Number.isFinite(e) && e > 0 ? e : 0;
}
function gr({ src: e, durationHint: a, compact: t = false }) {
  const i = o.useRef(null), r = o.useRef(`chat-audio-${Math.random().toString(36).slice(2)}`), s = Qn((a ?? 0) / 1e3), [f, c] = o.useState(false), [d, u] = o.useState(true), [h, m] = o.useState(false), [p, g] = o.useState(false), [C, y] = o.useState(0), [I, T] = o.useState(s), [j, E] = o.useState(1);
  o.useEffect(() => {
    c(false), u(true), m(false), g(false), y(0), T(s), E(1);
  }, [e, s]), o.useEffect(() => {
    const P = (D) => {
      var ne;
      D.detail !== r.current && ((ne = i.current) == null || ne.pause());
    };
    return window.addEventListener("chat-audio-play", P), () => {
      var D;
      (D = i.current) == null || D.pause(), window.removeEventListener("chat-audio-play", P);
    };
  }, []);
  function b() {
    const P = i.current;
    !P || h || (P.paused ? (u(true), window.dispatchEvent(new CustomEvent("chat-audio-play", { detail: r.current })), P.play().catch(() => {
      m(true), u(false);
    })) : P.pause());
  }
  function N() {
    const P = i.current;
    P && (m(false), u(true), g(false), y(0), P.load());
  }
  function k(P) {
    const D = Qn(I);
    if (!D) return;
    const q = Math.min(Math.max(Qn(P), 0), D);
    y(q), i.current && (i.current.currentTime = q);
  }
  function B() {
    const P = j === 1 ? 1.5 : j === 1.5 ? 2 : 1;
    E(P), i.current && (i.current.playbackRate = P);
  }
  if (!e) return n.jsx("span", { className: "chat-audio-unavailable", children: "Tin nh\u1EAFn tho\u1EA1i kh\xF4ng c\xF2n kh\u1EA3 d\u1EE5ng." });
  const z = Qn(I), x = Math.min(Qn(C), z || 0), w = z ? Math.min(100, Math.max(0, x / z * 100)) : 0, Y = x > 0 ? x : z, V = p && Y > 0 ? ot(Y * 1e3) : "--:--";
  return n.jsxs("div", { className: `chat-audio-player ${t ? "compact" : ""} ${h ? "failed" : ""}`, onClick: (P) => P.stopPropagation(), children: [n.jsx("audio", { ref: i, src: e, preload: "metadata", onLoadStart: () => u(true), onLoadedMetadata: (P) => {
    const D = Qn(P.currentTarget.duration) || s;
    T(D), g(true), u(false);
  }, onDurationChange: (P) => {
    const D = Qn(P.currentTarget.duration);
    D && T(D);
  }, onCanPlay: () => u(false), onWaiting: () => u(true), onPlaying: () => u(false), onPlay: () => c(true), onPause: () => c(false), onTimeUpdate: (P) => y(Qn(P.currentTarget.currentTime)), onEnded: () => {
    c(false), y(0);
  }, onError: () => {
    m(true), u(false);
  } }), h ? n.jsxs(n.Fragment, { children: [n.jsx("span", { className: "chat-audio-error", children: "Kh\xF4ng th\u1EC3 ph\xE1t \xE2m thanh" }), n.jsxs("button", { type: "button", className: "chat-audio-retry", onClick: N, children: [n.jsx(xn, { size: 15 }), " Retry"] })] }) : n.jsxs(n.Fragment, { children: [n.jsx("button", { type: "button", className: "chat-audio-play", onClick: b, "aria-label": f ? "T\u1EA1m d\u1EEBng" : "Ph\xE1t tin nh\u1EAFn tho\u1EA1i", children: d ? n.jsx(Mn, { size: 17, className: "spin" }) : f ? n.jsx(na, { size: 17, fill: "currentColor" }) : n.jsx(ja, { size: 17, fill: "currentColor" }) }), n.jsxs("label", { className: "chat-audio-waveform", children: [n.jsx("span", { className: "chat-audio-bars base", "aria-hidden": "true", children: ms.map((P, D) => n.jsx("i", { style: { height: P } }, `base-${D}`)) }), n.jsx("span", { className: "chat-audio-bars played", style: { clipPath: `inset(0 ${100 - w}% 0 0)` }, "aria-hidden": "true", children: ms.map((P, D) => n.jsx("i", { style: { height: P } }, `played-${D}`)) }), n.jsx("input", { type: "range", min: "0", max: z || 1, step: "0.1", value: x, disabled: !z, onChange: (P) => k(Number(P.target.value)), "aria-valuetext": `${ot(x * 1e3)} / ${z ? ot(z * 1e3) : "--:--"}` })] }), n.jsx("time", { children: V }), n.jsxs("button", { type: "button", className: "chat-audio-speed", onClick: B, "aria-label": `T\u1ED1c \u0111\u1ED9 ph\xE1t ${j}x`, children: [j, "x"] })] })] });
}
function fd({ recording: e, elapsed: a, audioUrl: t, duration: i, onCancelRecording: r, onStopRecording: s, onRemoveAudio: f }) {
  return e ? n.jsxs("section", { className: "chat-voice-composer recording", "aria-live": "polite", children: [n.jsx("span", { className: "voice-recording-pulse" }), n.jsx("strong", { children: "\u0110ang ghi \xE2m" }), n.jsx("time", { children: ot(a) }), n.jsxs("button", { type: "button", onClick: r, children: [n.jsx(da, { size: 16 }), " H\u1EE7y"] }), n.jsxs("button", { type: "button", onClick: s, children: [n.jsx(na, { size: 16, fill: "currentColor" }), " D\u1EEBng"] })] }) : t ? n.jsxs("section", { className: "chat-voice-composer preview", children: [n.jsx(gr, { src: t, durationHint: i, compact: true }), n.jsx("button", { type: "button", onClick: f, "aria-label": "X\xF3a b\u1EA3n ghi", children: n.jsx(pe, { size: 16 }) })] }) : null;
}
function ka({ src: e, label: a }) {
  const t = a.split(/\s+/).filter(Boolean).slice(0, 2).map((i) => i[0]).join("").toUpperCase() || "U";
  return n.jsx("span", { className: "conversation-details-avatar", children: e ? n.jsx("img", { src: e, alt: "" }) : t });
}
function cd(e, a) {
  var t, i;
  return (a == null ? void 0 : a.trim()) || ((t = e.fullName) == null ? void 0 : t.trim()) || ((i = e.username) == null ? void 0 : i.trim()) || e.userId;
}
function ld(e) {
  return e ? new Date(e).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Kh\xF4ng r\xF5 ng\xE0y";
}
function dd({ actorId: e, conversationId: a, conversationType: t, fallbackTitle: i, open: r, initialView: s = "MAIN", onClose: f, onOpenProfile: c, onNicknameUpdated: d, onConversationRemoved: u, onConversationDissolved: h }) {
  const [m, p] = o.useState(null), [g, C] = o.useState("idle"), [y, I] = o.useState("MAIN"), [T, j] = o.useState(false), [E, b] = o.useState(false), [N, k] = o.useState(""), [B, z] = o.useState(""), [x, w] = o.useState(false), [Y, V] = o.useState(""), [P, D] = o.useState(null), [q, ne] = o.useState(false), [be, he] = o.useState(""), [re, me] = o.useState(0), [we, F] = o.useState(""), [ze, Se] = o.useState([]), [ye, ue] = o.useState([]), [ke, Ne] = o.useState("idle"), [se, $e] = o.useState([]), [xe, Qe] = o.useState("idle"), [De, Ze] = o.useState("IMAGE"), [Ge, Ee] = o.useState([]), [Q, oe] = o.useState(null), [ee, ge] = o.useState(false), [O, K] = o.useState("idle"), [X, H] = o.useState(null), [_, le] = o.useState(null), [Me, Te] = o.useState(null), [de, Le] = o.useState(null), [Ye, Ve] = o.useState(false), [an, Xe] = o.useState("");
  o.useEffect(() => {
    r && I(s);
  }, [a, s, r]), o.useEffect(() => {
    if (!r) return;
    const l = (S) => {
      S.key === "Escape" && (_ ? le(null) : de ? Le(null) : Me ? Te(null) : P ? D(null) : E ? b(false) : y !== "MAIN" ? I("MAIN") : f());
    };
    return window.addEventListener("keydown", l), () => window.removeEventListener("keydown", l);
  }, [de, Me, E, f, r, P, _, y]), o.useEffect(() => {
    if (!Me) return;
    const l = (S) => {
      const M = S.target;
      (!(M instanceof Element) || !M.closest(".conversation-member-admin")) && Te(null);
    };
    return document.addEventListener("pointerdown", l), () => document.removeEventListener("pointerdown", l);
  }, [Me]), o.useEffect(() => {
    if (!r) return;
    let l = false;
    return C("loading"), fe(`/chat/conversations/${encodeURIComponent(a)}/details?actorId=${encodeURIComponent(e)}`).then((S) => {
      if (l) return;
      const M = S.members.find((U) => U.userId !== e);
      p(S), k((M == null ? void 0 : M.userId) ?? ""), z((M == null ? void 0 : M.nickname) ?? ""), C("ready");
    }).catch(() => !l && C("error")), () => {
      l = true;
    };
  }, [e, a, r, re]), o.useEffect(() => {
    if (!r || y !== "ADD") return;
    let l = false;
    const S = window.setTimeout(() => {
      Ne("loading"), fe(`/user-details/chat-suggestions?viewerId=${encodeURIComponent(e)}&query=${encodeURIComponent(we.trim())}&limit=30`).then((M) => {
        l || (Se((M ?? []).filter((U) => !(m != null && m.members.some((W) => W.userId === U.id)))), Ne("ready"));
      }).catch(() => !l && Ne("error"));
    }, 180);
    return () => {
      l = true, window.clearTimeout(S);
    };
  }, [e, m == null ? void 0 : m.members, r, we, y]), o.useEffect(() => {
    !r || y !== "REQUESTS" || !(m != null && m.canManageGroup) || (Qe("loading"), fe(`/chat/conversations/${encodeURIComponent(a)}/member-requests?actorId=${encodeURIComponent(e)}&page=0&size=50`).then((l) => {
      $e(l.items ?? []), Qe("ready");
    }).catch(() => Qe("error")));
  }, [e, a, m == null ? void 0 : m.canManageGroup, r, y]), o.useEffect(() => {
    !r || y !== "MEDIA" || mn(true);
  }, [De, r, y]);
  const Ke = o.useMemo(() => {
    const l = (m == null ? void 0 : m.members) ?? [];
    if (t === "DIRECT") {
      const S = l.filter((M) => M.userId !== e);
      return S.length ? S : l;
    }
    return l;
  }, [e, t, m]), We = o.useMemo(() => (m == null ? void 0 : m.members) ?? [], [m]), Je = We.find((l) => l.userId === N) ?? We[0] ?? null, A = o.useMemo(() => {
    const l = Y.trim().toLowerCase();
    return l ? We.filter((S) => `${S.nickname ?? ""} ${S.fullName ?? ""} ${S.username ?? ""} ${S.displayName}`.toLowerCase().includes(l)) : We;
  }, [Y, We]), $ = t === "GROUP", v = !!(m != null && m.isDissolved), L = !!(m != null && m.canManageGroup), R = Ke.filter((l) => l.role === "ADMIN").length, G = L && R <= 1 && !v, J = o.useMemo(() => Ge.reduce((l, S) => {
    const M = ld(S.createdAt);
    return (l[M] ?? (l[M] = [])).push(S), l;
  }, {}), [Ge]);
  function ae(l) {
    const S = We.find((M) => M.userId === l);
    S && (k(S.userId), z(S.nickname ?? ""));
  }
  async function ce() {
    if (!_) return;
    const l = _.userId;
    le(null), f(), await c(l);
  }
  async function Re() {
    if (!m || T) return;
    const l = !m.notificationsMuted;
    p({ ...m, notificationsMuted: l }), j(true);
    try {
      await ie(`/chat/conversations/${encodeURIComponent(a)}/notifications?actorId=${encodeURIComponent(e)}`, "PUT", { muted: l });
    } catch {
      p({ ...m, notificationsMuted: !l });
    } finally {
      j(false);
    }
  }
  async function Oe(l) {
    if (l.preventDefault(), !Je) return;
    const S = B.trim() || null;
    w(true);
    try {
      await ie(`/chat/conversations/${encodeURIComponent(a)}/members/${encodeURIComponent(Je.userId)}/nickname?actorId=${encodeURIComponent(e)}`, "PUT", { nickname: S });
      const M = cd(Je, S);
      b(false), V(""), p((U) => U && { ...U, members: U.members.map((W) => W.userId === Je.userId ? { ...W, nickname: S, displayName: M } : W) }), d == null || d(Je.userId, M);
    } finally {
      w(false);
    }
  }
  async function Ue() {
    if (!(!P || q)) {
      ne(true), he("");
      try {
        P === "DELETE_DIRECT" ? (await ie(`/chat/conversations/${encodeURIComponent(a)}/for-me?actorId=${encodeURIComponent(e)}`, "DELETE"), u == null || u(a)) : P === "LEAVE_GROUP" ? (await ie(`/chat/conversations/${encodeURIComponent(a)}/members/me/leave?actorId=${encodeURIComponent(e)}`, "POST"), u == null || u(a)) : (await ie(`/chat/conversations/${encodeURIComponent(a)}/dissolve?actorId=${encodeURIComponent(e)}`, "POST"), p((l) => l && { ...l, isDissolved: true }), h == null || h(a)), D(null);
      } catch {
        he("Kh\xF4ng th\u1EC3 th\u1EF1c hi\u1EC7n thao t\xE1c. Vui l\xF2ng th\u1EED l\u1EA1i.");
      } finally {
        ne(false);
      }
    }
  }
  async function tn() {
    if (ye.length) {
      Ne("saving");
      try {
        for (const l of ye) await ie(`/chat/conversations/${encodeURIComponent(a)}/members?actorId=${encodeURIComponent(e)}`, "POST", { targetUserId: l.id });
        ue([]), F(""), me((l) => l + 1), I("MAIN");
      } catch {
        Ne("error");
      }
    }
  }
  async function Yn(l, S) {
    await ie(`/chat/member-requests/${encodeURIComponent(l)}/${S}?actorId=${encodeURIComponent(e)}`, "POST"), $e((M) => M.filter((U) => U.id !== l)), S === "approve" && me((M) => M + 1);
  }
  async function ia() {
    if (!(!de || Ye)) {
      Ve(true), Xe("");
      try {
        const l = encodeURIComponent(de.member.userId), S = `/chat/conversations/${encodeURIComponent(a)}/members/${l}`;
        if (de.type === "REMOVE") await ie(`${S}?actorId=${encodeURIComponent(e)}`, "DELETE"), p((M) => M && { ...M, members: M.members.filter((U) => U.userId !== de.member.userId) });
        else {
          const M = "ADMIN";
          await ie(`${S}/role?actorId=${encodeURIComponent(e)}`, "PATCH", { role: M }), p((U) => U && { ...U, members: U.members.map((W) => W.userId === de.member.userId ? { ...W, role: M } : W) });
        }
        Le(null), Te(null), me((M) => M + 1);
      } catch {
        Xe("Kh\xF4ng th\u1EC3 c\u1EADp nh\u1EADt th\xE0nh vi\xEAn. H\xE3y ki\u1EC3m tra quy\u1EC1n qu\u1EA3n tr\u1ECB v\xE0 th\u1EED l\u1EA1i.");
      } finally {
        Ve(false);
      }
    }
  }
  async function mn(l) {
    if (!l && (!ee || O === "loading")) return;
    K("loading");
    const S = l ? "" : Q ? `&beforeSeq=${encodeURIComponent(Q)}` : "";
    try {
      const M = await fe(`/chat/conversations/${encodeURIComponent(a)}/media?actorId=${encodeURIComponent(e)}&category=${De}&limit=30${S}`);
      Ee((U) => l ? M.items ?? [] : [...U, ...M.items ?? []]), oe(M.nextCursor ?? null), ge(!!M.hasMore), K("ready");
    } catch {
      K("error");
    }
  }
  function ra(l) {
    const S = Ge.filter((W) => W.messageType === "IMAGE" || W.messageType === "VIDEO").filter((W) => {
      var Z;
      return (Z = W.media) == null ? void 0 : Z.url;
    }), M = S.map((W) => {
      var Z;
      return { url: W.media.url, type: W.messageType === "VIDEO" ? "VIDEO" : "IMAGE", alt: ((Z = W.media) == null ? void 0 : Z.fileName) ?? "Conversation media" };
    }), U = S.findIndex((W) => W.messageId === l.messageId);
    U >= 0 && H({ items: M, index: U });
  }
  if (!r) return null;
  const Wa = y === "MEDIA" ? "\u1EA2nh, video v\xE0 \u0111a ph\u01B0\u01A1ng ti\u1EC7n" : y === "ADD" ? "Th\xEAm th\xE0nh vi\xEAn" : y === "REQUESTS" ? "Y\xEAu c\u1EA7u v\xE0o nh\xF3m" : "Chi ti\u1EBFt";
  return n.jsxs(n.Fragment, { children: [n.jsx("button", { className: "conversation-details-scrim", onClick: f, "aria-label": "\u0110\xF3ng chi ti\u1EBFt cu\u1ED9c tr\xF2 chuy\u1EC7n" }), n.jsxs("aside", { className: "conversation-details-drawer", "aria-label": "Chi ti\u1EBFt cu\u1ED9c tr\xF2 chuy\u1EC7n", children: [n.jsxs("header", { children: [n.jsx("button", { className: y === "MAIN" ? "conversation-details-mobile-back" : "", onClick: () => y === "MAIN" ? f() : I("MAIN"), "aria-label": y === "MAIN" ? "\u0110\xF3ng" : "Quay l\u1EA1i", children: n.jsx(dn, { size: 20 }) }), n.jsx("h2", { children: Wa }), n.jsx("button", { onClick: f, "aria-label": "\u0110\xF3ng chi ti\u1EBFt cu\u1ED9c tr\xF2 chuy\u1EC7n", children: n.jsx(pe, { size: 19 }) })] }), n.jsxs("div", { className: `conversation-details-body view-${y.toLowerCase()}`, children: [y === "MAIN" && n.jsxs(n.Fragment, { children: [n.jsxs("button", { className: "conversation-notification-row", onClick: () => void Re(), disabled: g !== "ready" || T, "aria-label": "T\u1EAFt th\xF4ng b\xE1o v\u1EC1 tin nh\u1EAFn", "aria-pressed": (m == null ? void 0 : m.notificationsMuted) ?? false, children: [n.jsx(Ol, { size: 19 }), n.jsx("span", { children: "T\u1EAFt th\xF4ng b\xE1o v\u1EC1 tin nh\u1EAFn" }), n.jsx("i", { className: m != null && m.notificationsMuted ? "details-toggle on" : "details-toggle", children: T && n.jsx(Mn, { className: "spin", size: 13 }) })] }), n.jsxs("section", { className: "conversation-members-section", "aria-labelledby": "conversation-members-title", children: [n.jsx("h3", { id: "conversation-members-title", children: "Th\xE0nh vi\xEAn" }), g === "loading" && n.jsxs("div", { className: "conversation-details-loading", children: [n.jsx("span", {}), n.jsx("span", {})] }), g === "error" && n.jsx("button", { className: "conversation-details-retry", onClick: () => me((l) => l + 1), children: "Kh\xF4ng th\u1EC3 t\u1EA3i th\xE0nh vi\xEAn \xB7 Th\u1EED l\u1EA1i" }), g === "ready" && Ke.map((l) => {
    const S = $ && L && !v && l.userId !== e && l.role === "USER";
    return n.jsxs("article", { className: "conversation-member-item", children: [n.jsxs("button", { className: "conversation-member-row", onClick: () => le(l), children: [n.jsx(ka, { src: l.avatarUrl, label: l.displayName }), n.jsxs("span", { children: [n.jsx("strong", { children: l.displayName || i }), l.username && n.jsxs("small", { children: ["@", l.username] })] }), l.role === "ADMIN" && n.jsx("em", { children: "Qu\u1EA3n tr\u1ECB vi\xEAn" })] }), S && n.jsxs("div", { className: "conversation-member-admin", children: [n.jsx("button", { className: "conversation-member-menu-trigger", "aria-label": `Qu\u1EA3n l\xFD ${l.displayName}`, "aria-expanded": Me === l.userId, onClick: (M) => {
      M.stopPropagation(), Te((U) => U === l.userId ? null : l.userId);
    }, children: n.jsx(ea, { size: 18 }) }), Me === l.userId && n.jsxs("div", { className: "conversation-member-menu", children: [n.jsxs("button", { onClick: () => {
      Xe(""), Le({ type: "PROMOTE", member: l });
    }, children: [n.jsx(Oo, { size: 16 }), "C\u1EA5p quy\u1EC1n qu\u1EA3n tr\u1ECB"] }), n.jsxs("button", { className: "destructive", onClick: () => {
      Xe(""), Le({ type: "REMOVE", member: l });
    }, children: [n.jsx(nd, { size: 16 }), "X\xF3a kh\u1ECFi nh\xF3m"] })] })] })] }, l.userId);
  })] }), n.jsxs("div", { className: "conversation-details-actions", children: [$ && n.jsxs("button", { onClick: () => I("MEDIA"), children: [n.jsx(Do, { size: 17 }), "\u1EA2nh, video v\xE0 \u0111a ph\u01B0\u01A1ng ti\u1EC7n"] }), $ && !v && n.jsxs("button", { onClick: () => I("ADD"), children: [n.jsx(Pa, { size: 17 }), "Th\xEAm th\xE0nh vi\xEAn"] }), $ && L && !v && n.jsxs("button", { onClick: () => I("REQUESTS"), children: [n.jsx(Bn, { size: 17 }), "Y\xEAu c\u1EA7u v\xE0o nh\xF3m"] }), !v && n.jsx("button", { onClick: () => {
    b(true), V("");
  }, children: "Bi\u1EC7t danh" }), n.jsx("span", {}), n.jsx("button", { className: "destructive", children: "B\xE1o c\xE1o" }), !$ && n.jsx("button", { className: "destructive strong", onClick: () => {
    he(""), D("DELETE_DIRECT");
  }, children: "X\xF3a \u0111o\u1EA1n chat" }), $ && n.jsx("button", { className: "destructive strong", disabled: G, title: G ? "Nh\xF3m ph\u1EA3i c\xF3 \xEDt nh\u1EA5t m\u1ED9t qu\u1EA3n tr\u1ECB vi\xEAn" : void 0, onClick: () => {
    he(""), D("LEAVE_GROUP");
  }, children: "R\u1EDDi kh\u1ECFi nh\xF3m" }), $ && L && !v && n.jsx("button", { className: "destructive strong", onClick: () => {
    he(""), D("DISSOLVE_GROUP");
  }, children: "Gi\u1EA3i t\xE1n nh\xF3m" })] })] }), y === "ADD" && n.jsxs("section", { className: "group-member-manager", children: [n.jsxs("label", { children: [n.jsx("span", { children: "T\xECm ng\u01B0\u1EDDi d\xF9ng" }), n.jsx("input", { value: we, onChange: (l) => F(l.target.value), placeholder: "T\xECm ki\u1EBFm theo username..." })] }), ye.length > 0 && n.jsx("div", { className: "group-selected-users", children: ye.map((l) => n.jsxs("span", { children: [l.fullName || l.username, n.jsx("button", { onClick: () => ue((S) => S.filter((M) => M.id !== l.id)), children: n.jsx(pe, { size: 12 }) })] }, l.id)) }), n.jsxs("div", { className: "group-user-results", children: [ke === "loading" && n.jsx(Mn, { className: "spin" }), ze.map((l) => {
    const S = ye.some((M) => M.id === l.id);
    return n.jsxs("button", { className: S ? "selected" : "", onClick: () => ue((M) => S ? M.filter((U) => U.id !== l.id) : [...M, l]), children: [n.jsx(ka, { src: l.avatar, label: l.fullName || l.username }), n.jsxs("span", { children: [n.jsx("strong", { children: l.fullName || l.username }), n.jsxs("small", { children: ["@", l.username] })] }), S && n.jsx(gn, { size: 16 })] }, l.id);
  })] }), n.jsx("button", { className: "group-primary-action", disabled: !ye.length || ke === "saving", onClick: () => void tn(), children: ke === "saving" ? "\u0110ang x\u1EED l\xFD..." : m != null && m.canManageGroup ? "Th\xEAm v\xE0o nh\xF3m" : "G\u1EEDi y\xEAu c\u1EA7u" }), ke === "error" && n.jsx("p", { className: "conversation-drawer-error", children: "Kh\xF4ng th\u1EC3 th\xEAm th\xE0nh vi\xEAn. Vui l\xF2ng th\u1EED l\u1EA1i." })] }), y === "REQUESTS" && n.jsxs("section", { className: "group-request-list", children: [xe === "loading" && n.jsx(Mn, { className: "spin" }), xe === "error" && n.jsx("p", { children: "Kh\xF4ng th\u1EC3 t\u1EA3i y\xEAu c\u1EA7u." }), xe === "ready" && se.length === 0 && n.jsx("p", { children: "Kh\xF4ng c\xF3 y\xEAu c\u1EA7u \u0111ang ch\u1EDD." }), se.map((l) => n.jsxs("article", { children: [n.jsx(ka, { src: l.target.avatarUrl, label: l.target.displayName }), n.jsxs("div", { children: [n.jsx("strong", { children: l.target.displayName }), n.jsxs("small", { children: ["@", l.target.username || l.target.userId] }), n.jsxs("span", { children: ["\u0110\u01B0\u1EE3c \u0111\u1EC1 xu\u1EA5t b\u1EDFi ", l.requester.displayName] })] }), n.jsxs("div", { children: [n.jsx("button", { onClick: () => void Yn(l.id, "approve"), children: "Duy\u1EC7t" }), n.jsx("button", { onClick: () => void Yn(l.id, "reject"), children: "T\u1EEB ch\u1ED1i" })] })] }, l.id))] }), y === "MEDIA" && n.jsxs("section", { className: "conversation-media-browser", children: [n.jsx("nav", { children: ["IMAGE", "VIDEO", "FILE_AUDIO"].map((l) => n.jsx("button", { className: De === l ? "active" : "", onClick: () => Ze(l), children: l === "IMAGE" ? "\u1EA2nh" : l === "VIDEO" ? "Video" : "T\u1EC7p & \xE2m thanh" }, l)) }), O === "loading" && Ge.length === 0 && n.jsx(Mn, { className: "spin" }), O === "error" && n.jsx("button", { onClick: () => void mn(true), children: "Kh\xF4ng th\u1EC3 t\u1EA3i \xB7 Th\u1EED l\u1EA1i" }), O === "ready" && Ge.length === 0 && n.jsx("p", { children: "Ch\u01B0a c\xF3 n\u1ED9i dung trong m\u1EE5c n\xE0y." }), Object.entries(J).map(([l, S]) => n.jsxs("div", { className: "conversation-media-date", children: [n.jsx("h3", { children: l }), n.jsx("div", { children: S.map((M) => {
    var U, W, Z, ve, rn, Ae;
    return M.messageType === "IMAGE" ? n.jsx("button", { className: "conversation-media-tile", onClick: () => ra(M), children: n.jsx("img", { src: ((U = M.media) == null ? void 0 : U.url) ?? "", alt: ((W = M.media) == null ? void 0 : W.fileName) ?? "\u1EA2nh" }) }, M.messageId) : M.messageType === "VIDEO" ? n.jsxs("button", { className: "conversation-media-tile video", onClick: () => ra(M), children: [n.jsx("video", { src: ((Z = M.media) == null ? void 0 : Z.url) ?? "", preload: "metadata", muted: true }), n.jsx(Lt, { size: 18 })] }, M.messageId) : M.messageType === "AUDIO" && ((ve = M.media) != null && ve.url) ? n.jsx("div", { className: "conversation-media-audio", children: n.jsx(gr, { src: M.media.url, durationHint: M.media.duration }) }, M.messageId) : n.jsxs("a", { className: "conversation-media-file", href: ((rn = M.media) == null ? void 0 : rn.url) ?? void 0, target: "_blank", rel: "noreferrer", children: [n.jsx(Jl, { size: 19 }), n.jsx("span", { children: ((Ae = M.media) == null ? void 0 : Ae.fileName) || "T\u1EC7p \u0111\xEDnh k\xE8m" })] }, M.messageId);
  }) })] }, l)), ee && n.jsx("button", { className: "conversation-media-more", onClick: () => void mn(false), disabled: O === "loading", children: O === "loading" ? "\u0110ang t\u1EA3i..." : "Xem th\xEAm" })] })] })] }), _ && n.jsxs("div", { className: "conversation-action-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "member-profile-title", children: [n.jsx("button", { className: "conversation-action-modal-scrim", onClick: () => le(null), "aria-label": "\u0110\xF3ng" }), n.jsxs("section", { className: "conversation-member-profile-dialog", children: [n.jsx(ka, { src: _.avatarUrl, label: _.displayName }), n.jsx("strong", { id: "member-profile-title", children: _.fullName || _.displayName }), _.username && n.jsxs("small", { children: ["@", _.username] }), n.jsx("button", { className: "primary", onClick: () => void ce(), children: "Xem trang c\xE1 nh\xE2n" }), n.jsx("button", { onClick: () => le(null), children: "\u0110\xF3ng" })] })] }), "    ", E && Je && n.jsxs("div", { className: "conversation-action-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "nickname-dialog-title", children: [n.jsx("button", { className: "conversation-action-modal-scrim", onClick: () => b(false), "aria-label": "\u0110\xF3ng" }), n.jsxs("form", { className: "conversation-nickname-dialog", onSubmit: Oe, children: [n.jsxs("header", { children: [n.jsx("h3", { id: "nickname-dialog-title", children: "Bi\u1EC7t danh" }), n.jsx("button", { type: "button", onClick: () => b(false), "aria-label": "\u0110\xF3ng", children: n.jsx(pe, { size: 18 }) })] }), n.jsxs("label", { className: "conversation-nickname-search", children: [n.jsx("span", { children: "T\xECm th\xE0nh vi\xEAn" }), n.jsx("input", { value: Y, onChange: (l) => V(l.target.value), placeholder: "T\xECm theo t\xEAn ho\u1EB7c username" })] }), n.jsx("div", { className: "conversation-nickname-members", children: A.map((l) => n.jsxs("button", { type: "button", className: l.userId === Je.userId ? "selected" : "", onClick: () => ae(l.userId), children: [n.jsx(ka, { src: l.avatarUrl, label: l.displayName }), n.jsxs("span", { children: [n.jsx("strong", { children: l.userId === e ? "B\u1EA1n" : l.fullName || l.username || l.displayName }), n.jsx("small", { children: l.username ? `@${l.username}` : l.displayName })] }), l.userId === Je.userId && n.jsx(gn, { size: 16 })] }, l.userId)) }), n.jsxs("label", { className: "conversation-nickname-input", children: [n.jsxs("span", { children: ["\u0110\u1EB7t bi\u1EC7t danh cho ", Je.userId === e ? "b\u1EA1n" : Je.fullName || Je.username || Je.displayName] }), n.jsx("input", { value: B, maxLength: 100, onChange: (l) => z(l.target.value), placeholder: "Nh\u1EADp bi\u1EC7t danh" })] }), n.jsxs("footer", { children: [n.jsx("button", { type: "button", onClick: () => b(false), children: "H\u1EE7y" }), n.jsx("button", { className: "primary", disabled: x, children: x ? n.jsx(Mn, { className: "spin", size: 16 }) : "L\u01B0u" })] })] })] }), P && n.jsxs("div", { className: "conversation-action-modal", role: "alertdialog", "aria-modal": "true", "aria-labelledby": "conversation-action-title", children: [n.jsx("button", { className: "conversation-action-modal-scrim", onClick: () => !q && D(null), "aria-label": "\u0110\xF3ng" }), n.jsxs("section", { className: "conversation-confirm-dialog", children: [n.jsx("h3", { id: "conversation-action-title", children: P === "DELETE_DIRECT" ? "X\xF3a \u0111o\u1EA1n chat?" : P === "LEAVE_GROUP" ? "R\u1EDDi kh\u1ECFi nh\xF3m?" : "Gi\u1EA3i t\xE1n nh\xF3m?" }), n.jsx("p", { children: P === "DELETE_DIRECT" ? "\u0110o\u1EA1n chat ch\u1EC9 b\u1ECB x\xF3a kh\u1ECFi t\xE0i kho\u1EA3n c\u1EE7a b\u1EA1n. Tin nh\u1EAFn m\u1EDBi s\u1EBD l\xE0m cu\u1ED9c tr\xF2 chuy\u1EC7n xu\u1EA5t hi\u1EC7n l\u1EA1i." : P === "LEAVE_GROUP" ? "B\u1EA1n s\u1EBD kh\xF4ng c\xF2n th\u1EA5y nh\xF3m trong danh s\xE1ch cu\u1ED9c tr\xF2 chuy\u1EC7n." : "M\u1ECDi th\xE0nh vi\xEAn v\u1EABn xem \u0111\u01B0\u1EE3c l\u1ECBch s\u1EED nh\u01B0ng kh\xF4ng th\u1EC3 g\u1EEDi th\xEAm tin nh\u1EAFn." }), be && n.jsx("small", { role: "alert", children: be }), n.jsxs("div", { children: [n.jsx("button", { disabled: q, onClick: () => D(null), children: "H\u1EE7y" }), n.jsx("button", { className: "destructive", disabled: q, onClick: () => void Ue(), children: q ? n.jsx(Mn, { className: "spin", size: 16 }) : P === "DELETE_DIRECT" ? "X\xF3a" : P === "LEAVE_GROUP" ? "R\u1EDDi nh\xF3m" : "Gi\u1EA3i t\xE1n" })] })] })] }), de && n.jsxs("div", { className: "conversation-action-modal", role: "alertdialog", "aria-modal": "true", "aria-labelledby": "member-action-title", children: [n.jsx("button", { className: "conversation-action-modal-scrim", onClick: () => !Ye && Le(null), "aria-label": "\u0110\xF3ng" }), n.jsxs("section", { className: "conversation-confirm-dialog", children: [n.jsx(ka, { src: de.member.avatarUrl, label: de.member.displayName }), n.jsx("h3", { id: "member-action-title", children: de.type === "REMOVE" ? "X\xF3a th\xE0nh vi\xEAn kh\u1ECFi nh\xF3m?" : "C\u1EA5p quy\u1EC1n qu\u1EA3n tr\u1ECB?" }), n.jsx("p", { children: de.type === "REMOVE" ? `${de.member.displayName} s\u1EBD kh\xF4ng c\xF2n th\u1EA5y nh\xF3m v\xE0 ch\u1EC9 \u0111\u1ECDc \u0111\u01B0\u1EE3c tin nh\u1EAFn m\u1EDBi n\u1EBFu \u0111\u01B0\u1EE3c th\xEAm l\u1EA1i.` : `${de.member.displayName} c\xF3 th\u1EC3 qu\u1EA3n l\xFD th\xE0nh vi\xEAn, y\xEAu c\u1EA7u tham gia v\xE0 nh\xF3m chat.` }), an && n.jsx("small", { role: "alert", children: an }), n.jsxs("div", { children: [n.jsx("button", { disabled: Ye, onClick: () => Le(null), children: "H\u1EE7y" }), n.jsx("button", { className: de.type === "REMOVE" ? "destructive" : "primary", disabled: Ye, onClick: () => void ia(), children: Ye ? n.jsx(Mn, { className: "spin", size: 16 }) : de.type === "REMOVE" ? "X\xF3a kh\u1ECFi nh\xF3m" : "X\xE1c nh\u1EADn" })] })] })] }), X && n.jsx(mr, { items: X.items, initialIndex: X.index, onClose: () => H(null) })] });
}
class ud {
  constructor() {
    kn(this, "socket", null);
    kn(this, "userId", null);
    kn(this, "listeners", /* @__PURE__ */ new Set());
    kn(this, "heartbeatTimer", null);
    kn(this, "reconnectTimer", null);
    kn(this, "reconnectAttempt", 0);
    kn(this, "recipientCursors", /* @__PURE__ */ new Map());
    kn(this, "networkOnline", typeof navigator > "u" || navigator.onLine);
    typeof window > "u" || (window.addEventListener("online", () => {
      this.networkOnline = true, this.connect();
    }), window.addEventListener("offline", () => {
      this.networkOnline = false, this.disconnect();
    }));
  }
  subscribe(a, t) {
    return this.listeners.add(t), this.userId !== a && (this.disconnect(), this.recipientCursors.clear(), this.userId = a), this.connect(), () => {
      this.listeners.delete(t), this.listeners.size === 0 && this.disconnect();
    };
  }
  rememberRecipientCursor(a, t = 0, i = 0) {
    const r = this.recipientCursors.get(a) ?? { deliveredSeq: 0, readSeq: 0 };
    this.recipientCursors.set(a, { deliveredSeq: Math.max(r.deliveredSeq, t), readSeq: Math.max(r.readSeq, i) });
  }
  outgoingStatus(a, t) {
    const i = this.recipientCursors.get(a);
    return i && t <= i.readSeq ? "read" : i && t <= i.deliveredSeq ? "delivered" : "sent";
  }
  publishLocalMessage(a) {
    if (!this.userId || !(a != null && a.conversationId)) return;
    const t = { type: "MESSAGE_CREATED", eventId: typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : "local-" + Date.now(), conversationId: a.conversationId, actorId: a.senderId, recipientIds: [this.userId], message: a };
    this.listeners.forEach((i) => i(t));
  }
  acknowledgeDelivered(a, t) {
    this.send({ type: "DELIVERED_ACK", conversationId: a, sequence: t }), this.persistCursor("delivered", a, t);
  }
  acknowledgeRead(a, t) {
    this.send({ type: "READ_ACK", conversationId: a, sequence: t }), this.persistCursor("read", a, t);
  }
  connect() {
    var i, r;
    if (!this.userId || this.listeners.size === 0 || !this.networkOnline || ((i = this.socket) == null ? void 0 : i.readyState) === WebSocket.OPEN || ((r = this.socket) == null ? void 0 : r.readyState) === WebSocket.CONNECTING) return;
    const a = Ua.replace(/^http/i, "ws"), t = new WebSocket(`${a}/ws/chat`);
    this.socket = t, t.onopen = () => {
      if (this.socket === t) {
        if (!this.networkOnline) {
          this.disconnect();
          return;
        }
        this.reconnectAttempt = 0, this.startHeartbeat(), this.send({ type: "HEARTBEAT" });
      }
    }, t.onmessage = (s) => {
      if (this.socket === t) try {
        const f = JSON.parse(s.data);
        if (!(f != null && f.type) || !f.conversationId) return;
        f.type === "MESSAGE_CREATED" && f.message && f.message.senderId !== this.userId && this.acknowledgeDelivered(f.conversationId, f.message.messageSeq), f.type === "CURSOR_UPDATED" && f.actorId !== this.userId && this.rememberRecipientCursor(f.conversationId, f.deliveredSeq ?? 0, f.readSeq ?? 0), this.listeners.forEach((c) => c(f));
      } catch {
      }
    }, t.onerror = () => {
      this.socket === t && t.close();
    }, t.onclose = () => {
      this.socket === t && (this.stopHeartbeat(), this.socket = null, this.scheduleReconnect());
    };
  }
  persistCursor(a, t, i) {
    if (!this.userId || i <= 0) return;
    const r = "/chat/conversations/" + encodeURIComponent(t) + "/cursor/" + a + "?actorId=" + encodeURIComponent(this.userId);
    fetch(Ua + r, { method: "PUT", credentials: "include", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify({ sequence: i }) }).catch(() => {
    });
  }
  send(a) {
    var t;
    ((t = this.socket) == null ? void 0 : t.readyState) === WebSocket.OPEN && this.socket.send(JSON.stringify(a));
  }
  startHeartbeat() {
    this.stopHeartbeat(), this.heartbeatTimer = window.setInterval(() => this.send({ type: "HEARTBEAT" }), 3e4);
  }
  stopHeartbeat() {
    this.heartbeatTimer !== null && window.clearInterval(this.heartbeatTimer), this.heartbeatTimer = null;
  }
  scheduleReconnect() {
    if (!this.userId || this.listeners.size === 0 || !this.networkOnline || this.reconnectTimer !== null) return;
    const a = Math.min(15e3, 800 * 2 ** this.reconnectAttempt++);
    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null, this.connect();
    }, a);
  }
  disconnect() {
    this.stopHeartbeat(), this.reconnectTimer !== null && window.clearTimeout(this.reconnectTimer), this.reconnectTimer = null;
    const a = this.socket;
    this.socket = null, a && a.readyState < WebSocket.CLOSING && a.close(1e3, "No active subscribers");
  }
}
const en = new ud();
function Fi(e) {
  return [].concat(e);
}
function pr(e) {
  return e.startsWith(":");
}
function Jo(e) {
  return ni(e) && (e === "*" || e.length > 1 && ":>~.+*".includes(e.slice(0, 1)) || $o(e));
}
function _o(e, a) {
  return (ni(a) || typeof a == "number") && !Ho(e) && !pr(e) && !Fo(e);
}
function Fo(e) {
  return e.startsWith("@media");
}
function hd(e) {
  return e === ".";
}
function Ho(e) {
  return e === "--";
}
function ni(e) {
  return e + "" === e;
}
function $o(e) {
  return ni(e) && (e.startsWith("&") || pr(e));
}
function Yt(e, a = "") {
  return e.filter(Boolean).join(a);
}
function Vo(e, a) {
  let t = 0;
  if (a.length === 0) return t.toString();
  for (let i = 0; i < a.length; i++) {
    const r = a.charCodeAt(i);
    t = (t << 5) - t + r, t = t & t;
  }
  return `${e ?? "cl"}_${t.toString(36)}`;
}
function md(e, a) {
  return e === "content" ? `"${a}"` : a;
}
function gd(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function gs(e, a) {
  return `${e}:${a}`;
}
function pd(e) {
  return e ? `.${e}` : "";
}
function bd(e, a) {
  return e ? `${e}
${a}` : a;
}
var Zo = class Wo {
  constructor(a, t, i, r) {
    this.sheet = a, this.property = t, this.value = i, this.selector = r, this.property = t, this.value = i, this.joined = gs(t, i);
    const s = this.selector.preconditions.concat(this.selector.postconditions);
    this.hash = this.selector.hasConditions ? this.selector.scopeClassName : Vo(this.sheet.name, this.joined), this.key = Yt([this.joined, s, this.hash]);
  }
  toString() {
    let a = Hi(this.selector.preconditions, { right: this.hash });
    return a = Hi(this.selector.postconditions, { left: a }), `${a} {${Wo.genRule(this.property, this.value)}}`;
  }
  static genRule(a, t) {
    const i = gd(a);
    return gs(i, md(a, t)) + ";";
  }
};
function Hi(e, { left: a = "", right: t = "" } = {}) {
  const i = e.reduce((r, s) => pr(s) ? r + s : $o(s) ? r + s.slice(1) : Yt([r, s], " "), a);
  return Yt([i, pd(t)], " ");
}
var wd = class Rt {
  constructor(a, t = null, { preconditions: i, postconditions: r } = {}) {
    this.sheet = a, this.preconditions = [], this.scopeClassName = null, this.scopeName = null, this.postconditions = [], this.preconditions = i ? Fi(i) : [], this.postconditions = r ? Fi(r) : [], this.setScope(t);
  }
  setScope(a) {
    return a ? (this.scopeClassName || (this.scopeName = a, this.scopeClassName = Vo(this.sheet.name, a + this.sheet.count)), this) : this;
  }
  get hasConditions() {
    return this.preconditions.length > 0 || this.postconditions.length > 0;
  }
  addScope(a) {
    return new Rt(this.sheet, a, { preconditions: this.preconditions, postconditions: this.postconditions });
  }
  addPrecondition(a) {
    return new Rt(this.sheet, this.scopeClassName, { postconditions: this.postconditions, preconditions: this.preconditions.concat(a) });
  }
  addPostcondition(a) {
    return new Rt(this.sheet, this.scopeClassName, { preconditions: this.preconditions, postconditions: this.postconditions.concat(a) });
  }
  createRule(a, t) {
    return new Zo(this.sheet, a, t, this);
  }
}, yd = class {
  constructor(e, a) {
    this.name = e, this.rootNode = a, this.storedStyles = {}, this.storedClasses = {}, this.style = "", this.count = 0, this.id = `flairup-${e}`, this.styleTag = this.createStyleTag();
  }
  getStyle() {
    return this.style;
  }
  append(e) {
    this.style = bd(this.style, e);
  }
  apply() {
    this.count++, this.styleTag && (this.styleTag.innerHTML = this.style);
  }
  isApplied() {
    return !!this.styleTag;
  }
  createStyleTag() {
    if (typeof document > "u" || this.isApplied() || this.rootNode === null) return this.styleTag;
    const e = document.createElement("style");
    return e.type = "text/css", e.id = this.id, (this.rootNode ?? document.head).appendChild(e), e;
  }
  addRule(e) {
    const a = this.storedClasses[e.key];
    return ni(a) ? a : (this.storedClasses[e.key] = e.hash, this.storedStyles[e.hash] = [e.property, e.value], this.append(e.toString()), e.hash);
  }
};
function br(e, a) {
  for (const t in e) a(t.trim(), e[t]);
}
function Ce(...e) {
  const a = e.reduce((t, i) => (i instanceof Set ? t.push(...i) : typeof i == "string" ? t.push(i) : Array.isArray(i) ? t.push(Ce(...i)) : typeof i == "object" && Object.entries(i).forEach(([r, s]) => {
    s && t.push(r);
  }), t), []);
  return Yt(a, " ").trim();
}
function jd(e, a) {
  const t = new yd(e, a);
  return { create: i, getStyle: t.getStyle.bind(t), isApplied: t.isApplied.bind(t) };
  function i(r) {
    const s = {};
    return qo(t, r, new wd(t)).forEach(([c, d, u]) => {
      ai(t, d, u).forEach((h) => {
        f(c, h);
      });
    }), t.apply(), s;
    function f(c, d) {
      s[c] = s[c] ?? /* @__PURE__ */ new Set(), s[c].add(d);
    }
  }
}
function qo(e, a, t) {
  const i = [];
  return br(a, (r, s) => {
    if (Jo(r)) return qo(e, s, t.addPrecondition(r)).forEach((f) => i.push(f));
    i.push([r, a[r], t.addScope(r)]);
  }), i;
}
function ai(e, a, t) {
  const i = /* @__PURE__ */ new Set();
  return br(a, (r, s) => {
    let f = [];
    if (Jo(r)) f = ai(e, s, t.addPostcondition(r));
    else if (hd(r)) f = Fi(s);
    else if (Fo(r)) f = vd(e, s, r, t);
    else if (Ho(r)) f = Md(e, s, t);
    else if (_o(r, s)) {
      const c = t.createRule(r, s);
      e.addRule(c), i.add(c.hash);
    }
    return Ko(f, i);
  }), i;
}
function Ko(e, a) {
  return e.forEach((t) => a.add(t)), a;
}
function Md(e, a, t) {
  const i = /* @__PURE__ */ new Set(), r = [];
  if (br(a, (s, f) => {
    if (_o(s, f)) {
      r.push(Zo.genRule(s, f));
      return;
    }
    const c = ai(e, f ?? {}, t);
    Ko(c, i);
  }), !t.scopeClassName) return i;
  if (r.length) {
    const s = r.join(" ");
    e.append(`${Hi(t.preconditions, { right: t.scopeClassName })} {${s}}`);
  }
  return i.add(t.scopeClassName), i;
}
function vd(e, a, t, i) {
  e.append(t + " {");
  const r = ai(e, a, i);
  return e.append("}"), r;
}
function ps(e, a) {
  (a == null || a > e.length) && (a = e.length);
  for (var t = 0, i = Array(a); t < a; t++) i[t] = e[t];
  return i;
}
function Ld(e, a) {
  var t = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (t) return (t = t.call(e)).next.bind(t);
  if (Array.isArray(e) || (t = xd(e)) || a) {
    t && (e = t);
    var i = 0;
    return function() {
      return i >= e.length ? { done: true } : { done: false, value: e[i++] };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Pe() {
  return Pe = Object.assign ? Object.assign.bind() : function(e) {
    for (var a = 1; a < arguments.length; a++) {
      var t = arguments[a];
      for (var i in t) ({}).hasOwnProperty.call(t, i) && (e[i] = t[i]);
    }
    return e;
  }, Pe.apply(null, arguments);
}
function Cd(e, a) {
  e.prototype = Object.create(a.prototype), e.prototype.constructor = e, $i(e, a);
}
function Xo(e, a) {
  if (e == null) return {};
  var t = {};
  for (var i in e) if ({}.hasOwnProperty.call(e, i)) {
    if (a.indexOf(i) !== -1) continue;
    t[i] = e[i];
  }
  return t;
}
function $i(e, a) {
  return $i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, i) {
    return t.__proto__ = i, t;
  }, $i(e, a);
}
function xd(e, a) {
  if (e) {
    if (typeof e == "string") return ps(e, a);
    var t = {}.toString.call(e).slice(8, -1);
    return t === "Object" && e.constructor && (t = e.constructor.name), t === "Map" || t === "Set" ? Array.from(e) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? ps(e, a) : void 0;
  }
}
var Ie;
(function(e) {
  e.hiddenOnSearch = "epr-hidden-on-search", e.searchActive = "epr-search-active", e.hidden = "epr-hidden", e.visible = "epr-visible", e.active = "epr-active", e.emoji = "epr-emoji", e.category = "epr-emoji-category", e.label = "epr-emoji-category-label", e.categoryContent = "epr-emoji-category-content", e.emojiHasVariations = "epr-emoji-has-variations", e.scrollBody = "epr-body", e.emojiList = "epr-emoji-list", e.external = "__EmojiPicker__", e.emojiPicker = "EmojiPickerReact", e.open = "epr-open", e.vertical = "epr-vertical", e.horizontal = "epr-horizontal", e.variationPicker = "epr-emoji-variation-picker", e.darkTheme = "epr-dark-theme", e.autoTheme = "epr-auto-theme";
})(Ie || (Ie = {}));
function Sn() {
  for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++) a[t] = arguments[t];
  return a.map(function(i) {
    return "." + i;
  }).join("");
}
var He = jd("epr", null), Pt = { display: "none", opacity: "0", pointerEvents: "none", visibility: "hidden", overflow: "hidden" }, wr = He.create({ hidden: Pe({ ".": Ie.hidden }, Pt) }), Id = o.memo(function(a) {
  var t = a.nonce;
  return o.createElement("style", { nonce: t, suppressHydrationWarning: true, dangerouslySetInnerHTML: { __html: He.getStyle() } });
}), Ma = He.create({ ".epr-main": { ":has(input:not(:placeholder-shown))": { categoryBtn: { ":hover": { opacity: "1", backgroundPositionY: "var(--epr-category-navigation-button-size)" } }, hiddenOnSearch: Pe({ ".": Ie.hiddenOnSearch }, Pt) }, ":has(input:placeholder-shown)": { visibleOnSearchOnly: Pt } }, hiddenOnReactions: { transition: "all 0.5s ease-in-out" }, ".epr-reactions": { hiddenOnReactions: { height: "0px", width: "0px", opacity: "0", pointerEvents: "none", overflow: "hidden" } }, ".EmojiPickerReact:not(.epr-search-active)": { categoryBtn: { ":hover": { opacity: "1", backgroundPositionY: "var(--epr-category-navigation-button-size)" }, "&.epr-active": { opacity: "1", backgroundPositionY: "var(--epr-category-navigation-button-size)" } }, visibleOnSearchOnly: Pe({ ".": "epr-visible-on-search-only" }, Pt) } });
function Kn(e, a) {
  var t, i;
  return { ".epr-dark-theme": (t = {}, t[e] = a, t), ".epr-auto-theme": (i = {}, i[e] = { "@media (prefers-color-scheme: dark)": a }, i) };
}
function ef(e, a) {
  var t, i, r = (t = e.customEmojis) != null ? t : [], s = (i = a.customEmojis) != null ? i : [];
  return e.open === a.open && e.emojiVersion === a.emojiVersion && e.reactionsDefaultOpen === a.reactionsDefaultOpen && e.searchPlaceHolder === a.searchPlaceHolder && e.searchPlaceholder === a.searchPlaceholder && e.searchClearButtonLabel === a.searchClearButtonLabel && e.defaultSkinTone === a.defaultSkinTone && e.skinTonesDisabled === a.skinTonesDisabled && e.autoFocusSearch === a.autoFocusSearch && e.emojiStyle === a.emojiStyle && e.theme === a.theme && e.suggestedEmojisMode === a.suggestedEmojisMode && e.lazyLoadEmojis === a.lazyLoadEmojis && e.className === a.className && e.height === a.height && e.width === a.width && e.style === a.style && e.searchDisabled === a.searchDisabled && e.skinTonePickerLocation === a.skinTonePickerLocation && r.length === s.length && e.emojiData === a.emojiData;
}
var Sd = ["1f44d", "2764-fe0f", "1f603", "1f622", "1f64f", "1f44e", "1f621"], dt;
(function(e) {
  e.RECENT = "recent", e.FREQUENT = "frequent";
})(dt || (dt = {}));
var hn;
(function(e) {
  e.NATIVE = "native", e.APPLE = "apple", e.TWITTER = "twitter", e.GOOGLE = "google", e.FACEBOOK = "facebook";
})(hn || (hn = {}));
var Ba;
(function(e) {
  e.DARK = "dark", e.LIGHT = "light", e.AUTO = "auto";
})(Ba || (Ba = {}));
var Nn;
(function(e) {
  e.NEUTRAL = "neutral", e.LIGHT = "1f3fb", e.MEDIUM_LIGHT = "1f3fc", e.MEDIUM = "1f3fd", e.MEDIUM_DARK = "1f3fe", e.DARK = "1f3ff";
})(Nn || (Nn = {}));
var je;
(function(e) {
  e.SUGGESTED = "suggested", e.CUSTOM = "custom", e.SMILEYS_PEOPLE = "smileys_people", e.ANIMALS_NATURE = "animals_nature", e.FOOD_DRINK = "food_drink", e.TRAVEL_PLACES = "travel_places", e.ACTIVITIES = "activities", e.OBJECTS = "objects", e.SYMBOLS = "symbols", e.FLAGS = "flags";
})(je || (je = {}));
var Ga;
(function(e) {
  e.SEARCH = "SEARCH", e.PREVIEW = "PREVIEW";
})(Ga || (Ga = {}));
var kd = "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/", Nd = "https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/", Ed = "https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/", Td = "https://cdn.jsdelivr.net/npm/emoji-datasource-google/img/google/64/";
function Dd(e) {
  switch (e) {
    case hn.TWITTER:
      return Ed;
    case hn.GOOGLE:
      return Td;
    case hn.FACEBOOK:
      return Nd;
    case hn.APPLE:
    default:
      return kd;
  }
}
var Qt = [Nn.NEUTRAL, Nn.LIGHT, Nn.MEDIUM_LIGHT, Nn.MEDIUM, Nn.MEDIUM_DARK, Nn.DARK], Ad = Object.entries(Nn).reduce(function(e, a) {
  var t = a[0], i = a[1];
  return e[i] = t, e;
}, {}), yr = Qt.reduce(function(e, a) {
  var t;
  return Object.assign(e, (t = {}, t[a] = a, t));
}, {}), nn;
(function(e) {
  e.name = "n", e.unified = "u", e.variations = "v", e.added_in = "a", e.imgUrl = "imgUrl";
})(nn || (nn = {}));
function nf(e) {
  var a;
  return (a = e[nn.name]) != null ? a : [];
}
function zd(e) {
  return parseFloat(e[nn.added_in] || "0");
}
function Rd(e) {
  if (!e) return "";
  var a = nf(e);
  return a[a.length - 1];
}
function af(e) {
  var a = e.split("-"), t = a.splice(1, 1), i = t[0];
  return yr[i] ? a.join("-") : e;
}
function va(e, a) {
  var t, i = e[nn.unified];
  return !a || !Pd(e) ? i : (t = Od(e, a)) != null ? t : i;
}
function tf(e, a) {
  return "" + Dd(a) + e + ".png";
}
function jr(e) {
  var a;
  return (a = e[nn.variations]) != null ? a : [];
}
function Pd(e) {
  return jr(e).length > 0;
}
function Od(e, a) {
  return a ? jr(e).find(function(t) {
    return t.includes(a);
  }) : va(e);
}
function Ud(e) {
  var a = e.split("-"), t = a[1];
  return Object.keys(yr).includes(t) ? t : null;
}
var yn, Bd = [je.SUGGESTED, je.CUSTOM, je.SMILEYS_PEOPLE, je.ANIMALS_NATURE, je.FOOD_DRINK, je.TRAVEL_PLACES, je.ACTIVITIES, je.OBJECTS, je.SYMBOLS, je.FLAGS], Gd = { name: "Recently Used", category: je.SUGGESTED }, rf = (yn = {}, yn[je.SUGGESTED] = { category: je.SUGGESTED, name: "Frequently Used" }, yn[je.CUSTOM] = { category: je.CUSTOM, name: "Custom Emojis" }, yn[je.SMILEYS_PEOPLE] = { category: je.SMILEYS_PEOPLE, name: "Smileys & People" }, yn[je.ANIMALS_NATURE] = { category: je.ANIMALS_NATURE, name: "Animals & Nature" }, yn[je.FOOD_DRINK] = { category: je.FOOD_DRINK, name: "Food & Drink" }, yn[je.TRAVEL_PLACES] = { category: je.TRAVEL_PLACES, name: "Travel & Places" }, yn[je.ACTIVITIES] = { category: je.ACTIVITIES, name: "Activities" }, yn[je.OBJECTS] = { category: je.OBJECTS, name: "Objects" }, yn[je.SYMBOLS] = { category: je.SYMBOLS, name: "Symbols" }, yn[je.FLAGS] = { category: je.FLAGS, name: "Flags" }, yn);
function sf(e) {
  return Bd.map(function(a) {
    return Pe({}, rf[a], e && e[a] && e[a]);
  });
}
function ti(e) {
  return e.category;
}
function of(e) {
  return e.name;
}
function Yd(e, a, t) {
  var i;
  e === void 0 && (e = []), a === void 0 && (a = {});
  var r = (function() {
    var f = t != null && t.categories ? Object.fromEntries(Object.entries(t.categories).filter(function(u) {
      var h = u[1];
      return !!h;
    })) : {};
    if (a.suggestionMode === dt.RECENT) {
      var c, d = t == null || (c = t.categories) == null ? void 0 : c.suggested_recent;
      f[je.SUGGESTED] = d ? { category: je.SUGGESTED, name: d.name } : Gd;
    }
    return f;
  })(), s = sf(r);
  return (i = e) != null && i.length ? e.map(function(f) {
    return typeof f == "string" ? bs(f, r[f]) : Pe({}, bs(f.category, r[f.category]), f);
  }) : s;
}
function bs(e, a) {
  return a === void 0 && (a = {}), Object.assign(rf[e], a);
}
var Qd = ["2640-fe0f", "2642-fe0f", "2695-fe0f"], Jt = "Search", ff = "Clear", Jd = "No results found", cf = " found. Use up and down arrow keys to navigate.", _d = "1 result" + cf, Fd = "%n results" + cf;
function ws(e) {
  var a, t, i, r, s;
  e === void 0 && (e = {});
  var f = lf(), c = (a = e.emojiData) == null || (t = a.categories) == null || (i = t.preview_mood) == null ? void 0 : i.name, d = Pe({}, f.previewConfig, c && !((r = e.previewConfig) != null && r.defaultCaption) ? { defaultCaption: c } : {}, (s = e.previewConfig) != null ? s : {}), u = Object.assign(f, e), h = Yd(e.categories, { suggestionMode: u.suggestedEmojisMode }, e.emojiData);
  u.hiddenEmojis.forEach(function(p) {
    u.unicodeToHide.add(p);
  });
  var m = u.searchDisabled ? Ga.PREVIEW : u.skinTonePickerLocation;
  return Pe({}, u, { categories: h, previewConfig: d, skinTonePickerLocation: m });
}
function lf() {
  return { autoFocusSearch: true, categories: sf(), className: "", customEmojis: [], defaultSkinTone: Nn.NEUTRAL, emojiStyle: hn.APPLE, emojiVersion: null, getEmojiUrl: tf, height: 450, lazyLoadEmojis: false, previewConfig: Pe({}, Hd), searchDisabled: false, searchPlaceHolder: Jt, searchPlaceholder: Jt, searchClearButtonLabel: ff, skinTonePickerLocation: Ga.SEARCH, skinTonesDisabled: false, style: {}, suggestedEmojisMode: dt.FREQUENT, theme: Ba.LIGHT, unicodeToHide: new Set(Qd), width: 350, reactionsDefaultOpen: false, reactions: Sd, open: true, allowExpandReactions: true, hiddenEmojis: [], emojiData: void 0, categoryIcons: {}, nonce: void 0 };
}
var Hd = { defaultEmoji: "1f60a", defaultCaption: "What's your mood?", showPreview: true }, $d = ["children"], df = o.createContext(lf());
function Vd(e) {
  var a = e.children, t = Xo(e, $d), i = Zd(t);
  return o.createElement(df.Provider, { value: i }, a);
}
function Zd(e) {
  var a, t = o.useState(function() {
    return ws(e);
  }), i = t[0], r = t[1];
  return o.useEffect(function() {
    ef(i, e) || r(ws(e));
  }, [(a = e.customEmojis) == null ? void 0 : a.length, e.open, e.emojiVersion, e.reactionsDefaultOpen, e.searchPlaceHolder, e.searchPlaceholder, e.searchClearButtonLabel, e.defaultSkinTone, e.skinTonesDisabled, e.autoFocusSearch, e.emojiStyle, e.theme, e.suggestedEmojisMode, e.lazyLoadEmojis, e.className, e.height, e.width, e.searchDisabled, e.skinTonePickerLocation, e.allowExpandReactions, e.emojiData]), i;
}
function Fe() {
  return o.useContext(df);
}
function ys(e, a) {
  a === void 0 && (a = 0);
  var t = o.useState(e), i = t[0], r = t[1], s = o.useRef(null);
  function f(c) {
    return new Promise(function(d) {
      var u;
      s.current && clearTimeout(s.current), s.current = (u = window) == null ? void 0 : u.setTimeout(function() {
        r(c), d(c);
      }, a);
    });
  }
  return [i, f];
}
var Wd = { smileys_people: { category: "smileys_people", name: "people & body" }, animals_nature: { category: "animals_nature", name: "animals & nature" }, food_drink: { category: "food_drink", name: "food & drink" }, travel_places: { category: "travel_places", name: "travel & places" }, activities: { category: "activities", name: "activities" }, objects: { category: "objects", name: "objects" }, symbols: { category: "symbols", name: "symbols" }, flags: { category: "flags", name: "flags" }, suggested: { category: "suggested", name: "Frequently Used" }, custom: { category: "custom", name: "Custom Emojis" }, suggested_recent: { category: "suggested", name: "Recently Used" }, preview_mood: { category: "preview_mood", name: "What's your mood?" } }, qd = { custom: [], smileys_people: [{ n: ["face", "grin", "grinning face"], u: "1f600", a: "1" }, { n: ["face", "open", "mouth", "smile", "grinning face with big eyes"], u: "1f603", a: "0.6" }, { n: ["eye", "face", "open", "mouth", "smile", "grinning face with smiling eyes"], u: "1f604", a: "0.6" }, { n: ["eye", "face", "grin", "smile", "beaming face with smiling eyes"], u: "1f601", a: "0.6" }, { n: ["face", "laugh", "mouth", "smile", "satisfied", "grinning squinting face"], u: "1f606", a: "0.6" }, { n: ["cold", "face", "open", "smile", "sweat", "grinning face with sweat"], u: "1f605", a: "0.6" }, { n: ["face", "rofl", "floor", "laugh", "rotfl", "rolling", "rolling on the floor laughing"], u: "1f923", a: "3" }, { n: ["joy", "face", "tear", "laugh", "face with tears of joy"], u: "1f602", a: "0.6" }, { n: ["face", "smile", "slightly smiling face"], u: "1f642", a: "1" }, { n: ["face", "upside down", "upside down face"], u: "1f643", a: "1" }, { n: ["melt", "liquid", "dissolve", "disappear", "melting face"], u: "1fae0", a: "14" }, { n: ["face", "wink", "winking face"], u: "1f609", a: "0.6" }, { n: ["eye", "face", "blush", "smile", "smiling face with smiling eyes"], u: "1f60a", a: "0.6" }, { n: ["face", "halo", "angel", "fantasy", "innocent", "smiling face with halo"], u: "1f607", a: "1" }, { n: ["adore", "crush", "hearts", "in love", "smiling face with hearts"], u: "1f970", a: "11" }, { n: ["eye", "face", "love", "smile", "smiling face with heart eyes"], u: "1f60d", a: "0.6" }, { n: ["eyes", "face", "star", "grinning", "star struck"], u: "1f929", a: "5" }, { n: ["face", "kiss", "face blowing a kiss"], u: "1f618", a: "0.6" }, { n: ["face", "kiss", "kissing face"], u: "1f617", a: "1" }, { n: ["face", "smile", "relaxed", "outlined", "smiling face"], u: "263a-fe0f", a: "0.6" }, { n: ["eye", "face", "kiss", "closed", "kissing face with closed eyes"], u: "1f61a", a: "0.6" }, { n: ["eye", "face", "kiss", "smile", "kissing face with smiling eyes"], u: "1f619", a: "1" }, { n: ["tear", "proud", "smiling", "touched", "grateful", "relieved", "smiling face with tear"], u: "1f972", a: "13" }, { n: ["yum", "face", "smile", "delicious", "savouring", "face savoring food"], u: "1f60b", a: "0.6" }, { n: ["face", "tongue", "face with tongue"], u: "1f61b", a: "1" }, { n: ["eye", "face", "joke", "wink", "tongue", "winking face with tongue"], u: "1f61c", a: "0.6" }, { n: ["eye", "goofy", "large", "small", "zany face"], u: "1f92a", a: "5" }, { n: ["eye", "face", "taste", "tongue", "horrible", "squinting face with tongue"], u: "1f61d", a: "0.6" }, { n: ["face", "money", "mouth", "money mouth face"], u: "1f911", a: "1" }, { n: ["hug", "face", "hugging", "open hands", "smiling face", "smiling face with open hands"], u: "1f917", a: "1" }, { n: ["whoops", "face with hand over mouth"], u: "1f92d", a: "5" }, { n: ["awe", "scared", "surprise", "amazement", "disbelief", "embarrass", "face with open eyes and hand over mouth"], u: "1fae2", a: "14" }, { n: ["peep", "stare", "captivated", "face with peeking eye"], u: "1fae3", a: "14" }, { n: ["quiet", "shush", "shushing face"], u: "1f92b", a: "5" }, { n: ["face", "thinking", "thinking face"], u: "1f914", a: "1" }, { n: ["ok", "yes", "sunny", "salute", "troops", "saluting face"], u: "1fae1", a: "14" }, { n: ["zip", "face", "mouth", "zipper", "zipper mouth face"], u: "1f910", a: "1" }, { n: ["skeptic", "distrust", "face with raised eyebrow"], u: "1f928", a: "5" }, { n: ["meh", "face", "deadpan", "neutral", "neutral face"], u: "1f610", a: "0.7" }, { n: ["meh", "face", "inexpressive", "unexpressive", "expressionless", "expressionless face"], u: "1f611", a: "1" }, { n: ["face", "mouth", "quiet", "silent", "face without mouth"], u: "1f636", a: "1" }, { n: ["hide", "depressed", "disappear", "introvert", "invisible", "dotted line face"], u: "1fae5", a: "14" }, { n: ["absentminded", "face in clouds", "head in clouds", "face in the fog"], u: "1f636-200d-1f32b-fe0f", a: "13.1" }, { n: ["face", "smirk", "smirking face"], u: "1f60f", a: "0.6" }, { n: ["face", "unhappy", "unamused", "unamused face"], u: "1f612", a: "0.6" }, { n: ["eyes", "face", "eyeroll", "rolling", "face with rolling eyes"], u: "1f644", a: "1" }, { n: ["face", "grimace", "grimacing face"], u: "1f62c", a: "1" }, { n: ["gasp", "groan", "exhale", "relief", "whisper", "whistle", "face exhaling"], u: "1f62e-200d-1f4a8", a: "13.1" }, { n: ["lie", "face", "pinocchio", "lying face"], u: "1f925", a: "3" }, { n: ["face", "shock", "shaking", "vibrate", "earthquake", "shaking face"], u: "1fae8", a: "15" }, { n: ["no", "shake", "head shaking horizontally"], u: "1f642-200d-2194-fe0f", a: "15.1" }, { n: ["nod", "yes", "head shaking vertically"], u: "1f642-200d-2195-fe0f", a: "15.1" }, { n: ["face", "relieved", "relieved face"], u: "1f60c", a: "0.6" }, { n: ["face", "pensive", "dejected", "pensive face"], u: "1f614", a: "0.6" }, { n: ["face", "sleep", "good night", "sleepy face"], u: "1f62a", a: "0.6" }, { n: ["face", "drooling", "drooling face"], u: "1f924", a: "3" }, { n: ["zzz", "face", "sleep", "good night", "sleeping face"], u: "1f634", a: "1" }, { n: ["cold", "face", "mask", "sick", "doctor", "face with medical mask"], u: "1f637", a: "0.6" }, { n: ["ill", "face", "sick", "thermometer", "face with thermometer"], u: "1f912", a: "1" }, { n: ["face", "hurt", "injury", "bandage", "face with head bandage"], u: "1f915", a: "1" }, { n: ["face", "vomit", "nauseated", "nauseated face"], u: "1f922", a: "3" }, { n: ["puke", "sick", "vomit", "face vomiting"], u: "1f92e", a: "5" }, { n: ["face", "sneeze", "gesundheit", "sneezing face"], u: "1f927", a: "3" }, { n: ["hot", "hot face", "feverish", "sweating", "red faced", "heat stroke"], u: "1f975", a: "11" }, { n: ["cold", "icicles", "freezing", "cold face", "frostbite", "blue faced"], u: "1f976", a: "11" }, { n: ["dizzy", "tipsy", "woozy face", "wavy mouth", "intoxicated", "uneven eyes"], u: "1f974", a: "11" }, { n: ["dead", "face", "knocked out", "crossed out eyes", "face with crossed out eyes"], u: "1f635", a: "0.6" }, { n: ["whoa", "dizzy", "spiral", "trouble", "hypnotized", "face with spiral eyes"], u: "1f635-200d-1f4ab", a: "13.1" }, { n: ["shocked", "mind blown", "exploding head"], u: "1f92f", a: "5" }, { n: ["hat", "face", "cowboy", "cowgirl", "cowboy hat face"], u: "1f920", a: "3" }, { n: ["hat", "horn", "party", "celebration", "partying face"], u: "1f973", a: "11" }, { n: ["face", "nose", "glasses", "disguise", "incognito", "disguised face"], u: "1f978", a: "13" }, { n: ["sun", "cool", "face", "bright", "sunglasses", "smiling face with sunglasses"], u: "1f60e", a: "1" }, { n: ["face", "geek", "nerd", "nerd face"], u: "1f913", a: "1" }, { n: ["face", "stuffy", "monocle", "face with monocle"], u: "1f9d0", a: "5" }, { n: ["meh", "face", "confused", "confused face"], u: "1f615", a: "1" }, { n: ["meh", "unsure", "skeptical", "disappointed", "face with diagonal mouth"], u: "1fae4", a: "14" }, { n: ["face", "worried", "worried face"], u: "1f61f", a: "1" }, { n: ["face", "frown", "slightly frowning face"], u: "1f641", a: "1" }, { n: ["face", "frown", "frowning face"], u: "2639-fe0f", a: "0.7" }, { n: ["face", "open", "mouth", "sympathy", "face with open mouth"], u: "1f62e", a: "1" }, { n: ["face", "hushed", "stunned", "surprised", "hushed face"], u: "1f62f", a: "1" }, { n: ["face", "shocked", "totally", "astonished", "astonished face"], u: "1f632", a: "0.6" }, { n: ["face", "dazed", "flushed", "flushed face"], u: "1f633", a: "0.6" }, { n: ["mercy", "begging", "puppy eyes", "pleading face"], u: "1f97a", a: "11" }, { n: ["cry", "sad", "angry", "proud", "resist", "face holding back tears"], u: "1f979", a: "14" }, { n: ["face", "open", "frown", "mouth", "frowning face with open mouth"], u: "1f626", a: "1" }, { n: ["face", "anguished", "anguished face"], u: "1f627", a: "1" }, { n: ["face", "fear", "scared", "fearful", "fearful face"], u: "1f628", a: "0.6" }, { n: ["blue", "cold", "face", "sweat", "rushed", "anxious face with sweat"], u: "1f630", a: "0.6" }, { n: ["face", "whew", "relieved", "disappointed", "sad but relieved face"], u: "1f625", a: "0.6" }, { n: ["cry", "sad", "face", "tear", "crying face"], u: "1f622", a: "0.6" }, { n: ["cry", "sad", "sob", "face", "tear", "loudly crying face"], u: "1f62d", a: "0.6" }, { n: ["face", "fear", "munch", "scared", "scream", "face screaming in fear"], u: "1f631", a: "0.6" }, { n: ["face", "confounded", "confounded face"], u: "1f616", a: "0.6" }, { n: ["face", "persevere", "persevering face"], u: "1f623", a: "0.6" }, { n: ["face", "disappointed", "disappointed face"], u: "1f61e", a: "0.6" }, { n: ["cold", "face", "sweat", "downcast face with sweat"], u: "1f613", a: "0.6" }, { n: ["face", "tired", "weary", "weary face"], u: "1f629", a: "0.6" }, { n: ["face", "tired", "tired face"], u: "1f62b", a: "0.6" }, { n: ["yawn", "bored", "tired", "yawning face"], u: "1f971", a: "12" }, { n: ["won", "face", "triumph", "face with steam from nose"], u: "1f624", a: "0.6" }, { n: ["mad", "red", "face", "rage", "angry", "enraged", "pouting", "enraged face"], u: "1f621", a: "0.6" }, { n: ["mad", "face", "anger", "angry", "angry face"], u: "1f620", a: "0.6" }, { n: ["swearing", "face with symbols on mouth"], u: "1f92c", a: "5" }, { n: ["face", "horns", "smile", "fantasy", "fairy tale", "smiling face with horns"], u: "1f608", a: "1" }, { n: ["imp", "face", "demon", "devil", "fantasy", "angry face with horns"], u: "1f47f", a: "0.6" }, { n: ["face", "skull", "death", "monster", "fairy tale"], u: "1f480", a: "0.6" }, { n: ["face", "death", "skull", "monster", "crossbones", "skull and crossbones"], u: "2620-fe0f", a: "1" }, { n: ["poo", "dung", "face", "poop", "monster", "pile of poo"], u: "1f4a9", a: "0.6" }, { n: ["face", "clown", "clown face"], u: "1f921", a: "3" }, { n: ["ogre", "face", "fantasy", "monster", "creature", "fairy tale"], u: "1f479", a: "0.6" }, { n: ["face", "goblin", "fantasy", "monster", "creature", "fairy tale"], u: "1f47a", a: "0.6" }, { n: ["face", "ghost", "fantasy", "monster", "creature", "fairy tale"], u: "1f47b", a: "0.6" }, { n: ["ufo", "face", "alien", "fantasy", "creature", "extraterrestrial"], u: "1f47d", a: "0.6" }, { n: ["ufo", "face", "alien", "monster", "creature", "alien monster", "extraterrestrial"], u: "1f47e", a: "0.6" }, { n: ["face", "robot", "monster"], u: "1f916", a: "1" }, { n: ["cat", "face", "open", "mouth", "smile", "grinning", "grinning cat"], u: "1f63a", a: "0.6" }, { n: ["cat", "eye", "face", "grin", "smile", "grinning cat with smiling eyes"], u: "1f638", a: "0.6" }, { n: ["cat", "joy", "face", "tear", "cat with tears of joy"], u: "1f639", a: "0.6" }, { n: ["cat", "eye", "face", "love", "heart", "smile", "smiling cat with heart eyes"], u: "1f63b", a: "0.6" }, { n: ["cat", "wry", "face", "smile", "ironic", "cat with wry smile"], u: "1f63c", a: "0.6" }, { n: ["cat", "eye", "face", "kiss", "kissing cat"], u: "1f63d", a: "0.6" }, { n: ["oh", "cat", "face", "weary", "weary cat", "surprised"], u: "1f640", a: "0.6" }, { n: ["cat", "cry", "sad", "face", "tear", "crying cat"], u: "1f63f", a: "0.6" }, { n: ["cat", "face", "pouting", "pouting cat"], u: "1f63e", a: "0.6" }, { n: ["see", "evil", "face", "monkey", "forbidden", "see no evil monkey"], u: "1f648", a: "0.6" }, { n: ["evil", "face", "hear", "monkey", "forbidden", "hear no evil monkey"], u: "1f649", a: "0.6" }, { n: ["evil", "face", "speak", "monkey", "forbidden", "speak no evil monkey"], u: "1f64a", a: "0.6" }, { n: ["love", "mail", "heart", "letter", "love letter"], u: "1f48c", a: "0.6" }, { n: ["arrow", "cupid", "heart with arrow"], u: "1f498", a: "0.6" }, { n: ["ribbon", "valentine", "heart with ribbon"], u: "1f49d", a: "0.6" }, { n: ["excited", "sparkle", "sparkling heart"], u: "1f496", a: "0.6" }, { n: ["pulse", "excited", "growing", "nervous", "growing heart"], u: "1f497", a: "0.6" }, { n: ["beating", "heartbeat", "pulsating", "beating heart"], u: "1f493", a: "0.6" }, { n: ["revolving", "revolving hearts"], u: "1f49e", a: "0.6" }, { n: ["love", "two hearts"], u: "1f495", a: "0.6" }, { n: ["heart", "heart decoration"], u: "1f49f", a: "0.6" }, { n: ["mark", "exclamation", "punctuation", "heart exclamation"], u: "2763-fe0f", a: "1" }, { n: ["break", "broken", "broken heart"], u: "1f494", a: "0.6" }, { n: ["burn", "love", "lust", "heart", "sacred heart", "heart on fire"], u: "2764-fe0f-200d-1f525", a: "13.1" }, { n: ["well", "mending", "healthier", "improving", "recovering", "recuperating", "mending heart"], u: "2764-fe0f-200d-1fa79", a: "13.1" }, { n: ["heart", "red heart"], u: "2764-fe0f", a: "0.6" }, { n: ["cute", "like", "love", "pink", "heart", "pink heart"], u: "1fa77", a: "15" }, { n: ["orange", "orange heart"], u: "1f9e1", a: "5" }, { n: ["yellow", "yellow heart"], u: "1f49b", a: "0.6" }, { n: ["green", "green heart"], u: "1f49a", a: "0.6" }, { n: ["blue", "blue heart"], u: "1f499", a: "0.6" }, { n: ["cyan", "teal", "heart", "light blue", "light blue heart"], u: "1fa75", a: "15" }, { n: ["purple", "purple heart"], u: "1f49c", a: "0.6" }, { n: ["brown", "heart", "brown heart"], u: "1f90e", a: "12" }, { n: ["evil", "black", "wicked", "black heart"], u: "1f5a4", a: "3" }, { n: ["gray", "heart", "slate", "silver", "grey heart"], u: "1fa76", a: "15" }, { n: ["heart", "white", "white heart"], u: "1f90d", a: "12" }, { n: ["kiss", "lips", "kiss mark"], u: "1f48b", a: "0.6" }, { n: ["100", "full", "score", "hundred", "hundred points"], u: "1f4af", a: "0.6" }, { n: ["mad", "angry", "comic", "anger symbol"], u: "1f4a2", a: "0.6" }, { n: ["boom", "comic", "collision"], u: "1f4a5", a: "0.6" }, { n: ["star", "dizzy", "comic"], u: "1f4ab", a: "0.6" }, { n: ["comic", "sweat", "splashing", "sweat droplets"], u: "1f4a6", a: "0.6" }, { n: ["dash", "comic", "running", "dashing away"], u: "1f4a8", a: "0.6" }, { n: ["hole"], u: "1f573-fe0f", a: "0.7" }, { n: ["comic", "bubble", "dialog", "speech", "balloon", "speech balloon"], u: "1f4ac", a: "0.6" }, { n: ["eye", "bubble", "speech", "balloon", "witness", "eye in speech bubble"], u: "1f441-fe0f-200d-1f5e8-fe0f", a: "2" }, { n: ["bubble", "dialog", "speech", "balloon", "left speech bubble"], u: "1f5e8-fe0f", a: "2" }, { n: ["mad", "angry", "bubble", "balloon", "right anger bubble"], u: "1f5ef-fe0f", a: "0.7" }, { n: ["comic", "bubble", "balloon", "thought", "thought balloon"], u: "1f4ad", a: "1" }, { n: ["ZZZ", "zzz", "comic", "sleep", "good night"], u: "1f4a4", a: "0.6" }, { n: ["hand", "wave", "waving", "waving hand"], u: "1f44b", v: ["1f44b-1f3fb", "1f44b-1f3fc", "1f44b-1f3fd", "1f44b-1f3fe", "1f44b-1f3ff"], a: "0.6" }, { n: ["raised", "backhand", "raised back of hand"], u: "1f91a", v: ["1f91a-1f3fb", "1f91a-1f3fc", "1f91a-1f3fd", "1f91a-1f3fe", "1f91a-1f3ff"], a: "3" }, { n: ["hand", "finger", "splayed", "hand with fingers splayed"], u: "1f590-fe0f", v: ["1f590-1f3fb", "1f590-1f3fc", "1f590-1f3fd", "1f590-1f3fe", "1f590-1f3ff"], a: "0.7" }, { n: ["hand", "high 5", "high five", "raised hand"], u: "270b", v: ["270b-1f3fb", "270b-1f3fc", "270b-1f3fd", "270b-1f3fe", "270b-1f3ff"], a: "0.6" }, { n: ["hand", "spock", "finger", "vulcan", "vulcan salute"], u: "1f596", v: ["1f596-1f3fb", "1f596-1f3fc", "1f596-1f3fd", "1f596-1f3fe", "1f596-1f3ff"], a: "1" }, { n: ["hand", "right", "rightward", "rightwards hand"], u: "1faf1", v: ["1faf1-1f3fb", "1faf1-1f3fc", "1faf1-1f3fd", "1faf1-1f3fe", "1faf1-1f3ff"], a: "14" }, { n: ["hand", "left", "leftward", "leftwards hand"], u: "1faf2", v: ["1faf2-1f3fb", "1faf2-1f3fc", "1faf2-1f3fd", "1faf2-1f3fe", "1faf2-1f3ff"], a: "14" }, { n: ["drop", "shoo", "dismiss", "palm down hand"], u: "1faf3", v: ["1faf3-1f3fb", "1faf3-1f3fc", "1faf3-1f3fd", "1faf3-1f3fe", "1faf3-1f3ff"], a: "14" }, { n: ["come", "catch", "offer", "beckon", "palm up hand"], u: "1faf4", v: ["1faf4-1f3fb", "1faf4-1f3fc", "1faf4-1f3fd", "1faf4-1f3fe", "1faf4-1f3ff"], a: "14" }, { n: ["push", "stop", "wait", "refuse", "leftward", "high five", "leftwards pushing hand"], u: "1faf7", v: ["1faf7-1f3fb", "1faf7-1f3fc", "1faf7-1f3fd", "1faf7-1f3fe", "1faf7-1f3ff"], a: "15" }, { n: ["push", "stop", "wait", "refuse", "high five", "rightward", "rightwards pushing hand"], u: "1faf8", v: ["1faf8-1f3fb", "1faf8-1f3fc", "1faf8-1f3fd", "1faf8-1f3fe", "1faf8-1f3ff"], a: "15" }, { n: ["ok", "hand", "OK hand"], u: "1f44c", v: ["1f44c-1f3fb", "1f44c-1f3fc", "1f44c-1f3fd", "1f44c-1f3fe", "1f44c-1f3ff"], a: "0.6" }, { n: ["fingers", "pinched", "sarcastic", "hand gesture", "interrogation", "pinched fingers"], u: "1f90c", v: ["1f90c-1f3fb", "1f90c-1f3fc", "1f90c-1f3fd", "1f90c-1f3fe", "1f90c-1f3ff"], a: "13" }, { n: ["small amount", "pinching hand"], u: "1f90f", v: ["1f90f-1f3fb", "1f90f-1f3fc", "1f90f-1f3fd", "1f90f-1f3fe", "1f90f-1f3ff"], a: "12" }, { n: ["v", "hand", "victory", "victory hand"], u: "270c-fe0f", v: ["270c-1f3fb", "270c-1f3fc", "270c-1f3fd", "270c-1f3fe", "270c-1f3ff"], a: "0.6" }, { n: ["hand", "luck", "cross", "finger", "crossed fingers"], u: "1f91e", v: ["1f91e-1f3fb", "1f91e-1f3fc", "1f91e-1f3fd", "1f91e-1f3fe", "1f91e-1f3ff"], a: "3" }, { n: ["love", "snap", "heart", "money", "expensive", "hand with index finger and thumb crossed"], u: "1faf0", v: ["1faf0-1f3fb", "1faf0-1f3fc", "1faf0-1f3fd", "1faf0-1f3fe", "1faf0-1f3ff"], a: "14" }, { n: ["ily", "hand", "love you gesture"], u: "1f91f", v: ["1f91f-1f3fb", "1f91f-1f3fc", "1f91f-1f3fd", "1f91f-1f3fe", "1f91f-1f3ff"], a: "5" }, { n: ["hand", "horns", "finger", "rock on", "sign of the horns"], u: "1f918", v: ["1f918-1f3fb", "1f918-1f3fc", "1f918-1f3fd", "1f918-1f3fe", "1f918-1f3ff"], a: "1" }, { n: ["call", "hand", "shaka", "hang loose", "call me hand"], u: "1f919", v: ["1f919-1f3fb", "1f919-1f3fc", "1f919-1f3fd", "1f919-1f3fe", "1f919-1f3ff"], a: "3" }, { n: ["hand", "index", "point", "finger", "backhand", "backhand index pointing left"], u: "1f448", v: ["1f448-1f3fb", "1f448-1f3fc", "1f448-1f3fd", "1f448-1f3fe", "1f448-1f3ff"], a: "0.6" }, { n: ["hand", "index", "point", "finger", "backhand", "backhand index pointing right"], u: "1f449", v: ["1f449-1f3fb", "1f449-1f3fc", "1f449-1f3fd", "1f449-1f3fe", "1f449-1f3ff"], a: "0.6" }, { n: ["up", "hand", "point", "finger", "backhand", "backhand index pointing up"], u: "1f446", v: ["1f446-1f3fb", "1f446-1f3fc", "1f446-1f3fd", "1f446-1f3fe", "1f446-1f3ff"], a: "0.6" }, { n: ["hand", "finger", "middle finger"], u: "1f595", v: ["1f595-1f3fb", "1f595-1f3fc", "1f595-1f3fd", "1f595-1f3fe", "1f595-1f3ff"], a: "1" }, { n: ["down", "hand", "point", "finger", "backhand", "backhand index pointing down"], u: "1f447", v: ["1f447-1f3fb", "1f447-1f3fc", "1f447-1f3fd", "1f447-1f3fe", "1f447-1f3ff"], a: "0.6" }, { n: ["up", "hand", "index", "point", "finger", "index pointing up"], u: "261d-fe0f", v: ["261d-1f3fb", "261d-1f3fc", "261d-1f3fd", "261d-1f3fe", "261d-1f3ff"], a: "0.6" }, { n: ["you", "point", "index pointing at the viewer"], u: "1faf5", v: ["1faf5-1f3fb", "1faf5-1f3fc", "1faf5-1f3fd", "1faf5-1f3fe", "1faf5-1f3ff"], a: "14" }, { n: ["+1", "up", "hand", "thumb", "thumbs up"], u: "1f44d", v: ["1f44d-1f3fb", "1f44d-1f3fc", "1f44d-1f3fd", "1f44d-1f3fe", "1f44d-1f3ff"], a: "0.6" }, { n: [" 1", "down", "hand", "thumb", "thumbs down"], u: "1f44e", v: ["1f44e-1f3fb", "1f44e-1f3fc", "1f44e-1f3fd", "1f44e-1f3fe", "1f44e-1f3ff"], a: "0.6" }, { n: ["fist", "hand", "punch", "clenched", "raised fist"], u: "270a", v: ["270a-1f3fb", "270a-1f3fc", "270a-1f3fd", "270a-1f3fe", "270a-1f3ff"], a: "0.6" }, { n: ["fist", "hand", "punch", "clenched", "oncoming fist"], u: "1f44a", v: ["1f44a-1f3fb", "1f44a-1f3fc", "1f44a-1f3fd", "1f44a-1f3fe", "1f44a-1f3ff"], a: "0.6" }, { n: ["fist", "leftwards", "left facing fist"], u: "1f91b", v: ["1f91b-1f3fb", "1f91b-1f3fc", "1f91b-1f3fd", "1f91b-1f3fe", "1f91b-1f3ff"], a: "3" }, { n: ["fist", "rightwards", "right facing fist"], u: "1f91c", v: ["1f91c-1f3fb", "1f91c-1f3fc", "1f91c-1f3fd", "1f91c-1f3fe", "1f91c-1f3ff"], a: "3" }, { n: ["clap", "hand", "clapping hands"], u: "1f44f", v: ["1f44f-1f3fb", "1f44f-1f3fc", "1f44f-1f3fd", "1f44f-1f3fe", "1f44f-1f3ff"], a: "0.6" }, { n: ["hand", "hooray", "raised", "gesture", "celebration", "raising hands"], u: "1f64c", v: ["1f64c-1f3fb", "1f64c-1f3fc", "1f64c-1f3fd", "1f64c-1f3fe", "1f64c-1f3ff"], a: "0.6" }, { n: ["love", "heart hands"], u: "1faf6", v: ["1faf6-1f3fb", "1faf6-1f3fc", "1faf6-1f3fd", "1faf6-1f3fe", "1faf6-1f3ff"], a: "14" }, { n: ["hand", "open", "open hands"], u: "1f450", v: ["1f450-1f3fb", "1f450-1f3fc", "1f450-1f3fd", "1f450-1f3fe", "1f450-1f3ff"], a: "0.6" }, { n: ["prayer", "palms up together"], u: "1f932", v: ["1f932-1f3fb", "1f932-1f3fc", "1f932-1f3fd", "1f932-1f3fe", "1f932-1f3ff"], a: "5" }, { n: ["hand", "shake", "meeting", "handshake", "agreement"], u: "1f91d", v: ["1f91d-1f3fb", "1f91d-1f3fc", "1f91d-1f3fd", "1f91d-1f3fe", "1f91d-1f3ff", "1faf1-1f3fb-200d-1faf2-1f3fc", "1faf1-1f3fb-200d-1faf2-1f3fd", "1faf1-1f3fb-200d-1faf2-1f3fe", "1faf1-1f3fb-200d-1faf2-1f3ff", "1faf1-1f3fc-200d-1faf2-1f3fb", "1faf1-1f3fc-200d-1faf2-1f3fd", "1faf1-1f3fc-200d-1faf2-1f3fe", "1faf1-1f3fc-200d-1faf2-1f3ff", "1faf1-1f3fd-200d-1faf2-1f3fb", "1faf1-1f3fd-200d-1faf2-1f3fc", "1faf1-1f3fd-200d-1faf2-1f3fe", "1faf1-1f3fd-200d-1faf2-1f3ff", "1faf1-1f3fe-200d-1faf2-1f3fb", "1faf1-1f3fe-200d-1faf2-1f3fc", "1faf1-1f3fe-200d-1faf2-1f3fd", "1faf1-1f3fe-200d-1faf2-1f3ff", "1faf1-1f3ff-200d-1faf2-1f3fb", "1faf1-1f3ff-200d-1faf2-1f3fc", "1faf1-1f3ff-200d-1faf2-1f3fd", "1faf1-1f3ff-200d-1faf2-1f3fe"], a: "3" }, { n: ["ask", "hand", "pray", "high 5", "please", "thanks", "high five", "folded hands"], u: "1f64f", v: ["1f64f-1f3fb", "1f64f-1f3fc", "1f64f-1f3fd", "1f64f-1f3fe", "1f64f-1f3ff"], a: "0.6" }, { n: ["hand", "write", "writing hand"], u: "270d-fe0f", v: ["270d-1f3fb", "270d-1f3fc", "270d-1f3fd", "270d-1f3fe", "270d-1f3ff"], a: "0.7" }, { n: ["care", "nail", "polish", "manicure", "cosmetics", "nail polish"], u: "1f485", v: ["1f485-1f3fb", "1f485-1f3fc", "1f485-1f3fd", "1f485-1f3fe", "1f485-1f3ff"], a: "0.6" }, { n: ["phone", "selfie", "camera"], u: "1f933", v: ["1f933-1f3fb", "1f933-1f3fc", "1f933-1f3fd", "1f933-1f3fe", "1f933-1f3ff"], a: "3" }, { n: ["flex", "comic", "biceps", "muscle", "flexed biceps"], u: "1f4aa", v: ["1f4aa-1f3fb", "1f4aa-1f3fc", "1f4aa-1f3fd", "1f4aa-1f3fe", "1f4aa-1f3ff"], a: "0.6" }, { n: ["prosthetic", "accessibility", "mechanical arm"], u: "1f9be", a: "12" }, { n: ["prosthetic", "accessibility", "mechanical leg"], u: "1f9bf", a: "12" }, { n: ["leg", "kick", "limb"], u: "1f9b5", v: ["1f9b5-1f3fb", "1f9b5-1f3fc", "1f9b5-1f3fd", "1f9b5-1f3fe", "1f9b5-1f3ff"], a: "11" }, { n: ["foot", "kick", "stomp"], u: "1f9b6", v: ["1f9b6-1f3fb", "1f9b6-1f3fc", "1f9b6-1f3fd", "1f9b6-1f3fe", "1f9b6-1f3ff"], a: "11" }, { n: ["ear", "body"], u: "1f442", v: ["1f442-1f3fb", "1f442-1f3fc", "1f442-1f3fd", "1f442-1f3fe", "1f442-1f3ff"], a: "0.6" }, { n: ["accessibility", "hard of hearing", "ear with hearing aid"], u: "1f9bb", v: ["1f9bb-1f3fb", "1f9bb-1f3fc", "1f9bb-1f3fd", "1f9bb-1f3fe", "1f9bb-1f3ff"], a: "12" }, { n: ["nose", "body"], u: "1f443", v: ["1f443-1f3fb", "1f443-1f3fc", "1f443-1f3fd", "1f443-1f3fe", "1f443-1f3ff"], a: "0.6" }, { n: ["brain", "intelligent"], u: "1f9e0", a: "5" }, { n: ["heart", "organ", "pulse", "anatomical", "cardiology", "anatomical heart"], u: "1fac0", a: "13" }, { n: ["lungs", "organ", "breath", "exhalation", "inhalation", "respiration"], u: "1fac1", a: "13" }, { n: ["tooth", "dentist"], u: "1f9b7", a: "11" }, { n: ["bone", "skeleton"], u: "1f9b4", a: "11" }, { n: ["eye", "eyes", "face"], u: "1f440", a: "0.6" }, { n: ["eye", "body"], u: "1f441-fe0f", a: "0.7" }, { n: ["body", "tongue"], u: "1f445", a: "0.6" }, { n: ["lips", "mouth"], u: "1f444", a: "0.6" }, { n: ["fear", "anxious", "nervous", "worried", "flirting", "biting lip", "uncomfortable"], u: "1fae6", a: "14" }, { n: ["baby", "young"], u: "1f476", v: ["1f476-1f3fb", "1f476-1f3fc", "1f476-1f3fd", "1f476-1f3fe", "1f476-1f3ff"], a: "0.6" }, { n: ["child", "young", "gender neutral", "unspecified gender"], u: "1f9d2", v: ["1f9d2-1f3fb", "1f9d2-1f3fc", "1f9d2-1f3fd", "1f9d2-1f3fe", "1f9d2-1f3ff"], a: "5" }, { n: ["boy", "young"], u: "1f466", v: ["1f466-1f3fb", "1f466-1f3fc", "1f466-1f3fd", "1f466-1f3fe", "1f466-1f3ff"], a: "0.6" }, { n: ["girl", "virgo", "young", "zodiac"], u: "1f467", v: ["1f467-1f3fb", "1f467-1f3fc", "1f467-1f3fd", "1f467-1f3fe", "1f467-1f3ff"], a: "0.6" }, { n: ["adult", "person", "gender neutral", "unspecified gender"], u: "1f9d1", v: ["1f9d1-1f3fb", "1f9d1-1f3fc", "1f9d1-1f3fd", "1f9d1-1f3fe", "1f9d1-1f3ff"], a: "5" }, { n: ["hair", "blond", "person: blond hair", "blond haired person"], u: "1f471", v: ["1f471-1f3fb", "1f471-1f3fc", "1f471-1f3fd", "1f471-1f3fe", "1f471-1f3ff"], a: "0.6" }, { n: ["man", "adult"], u: "1f468", v: ["1f468-1f3fb", "1f468-1f3fc", "1f468-1f3fd", "1f468-1f3fe", "1f468-1f3ff"], a: "0.6" }, { n: ["beard", "person", "person: beard"], u: "1f9d4", v: ["1f9d4-1f3fb", "1f9d4-1f3fc", "1f9d4-1f3fd", "1f9d4-1f3fe", "1f9d4-1f3ff"], a: "5" }, { n: ["man", "beard", "man: beard"], u: "1f9d4-200d-2642-fe0f", v: ["1f9d4-1f3fb-200d-2642-fe0f", "1f9d4-1f3fc-200d-2642-fe0f", "1f9d4-1f3fd-200d-2642-fe0f", "1f9d4-1f3fe-200d-2642-fe0f", "1f9d4-1f3ff-200d-2642-fe0f"], a: "13.1" }, { n: ["beard", "woman", "woman: beard"], u: "1f9d4-200d-2640-fe0f", v: ["1f9d4-1f3fb-200d-2640-fe0f", "1f9d4-1f3fc-200d-2640-fe0f", "1f9d4-1f3fd-200d-2640-fe0f", "1f9d4-1f3fe-200d-2640-fe0f", "1f9d4-1f3ff-200d-2640-fe0f"], a: "13.1" }, { n: ["man", "adult", "red hair", "man: red hair"], u: "1f468-200d-1f9b0", v: ["1f468-1f3fb-200d-1f9b0", "1f468-1f3fc-200d-1f9b0", "1f468-1f3fd-200d-1f9b0", "1f468-1f3fe-200d-1f9b0", "1f468-1f3ff-200d-1f9b0"], a: "11" }, { n: ["man", "adult", "curly hair", "man: curly hair"], u: "1f468-200d-1f9b1", v: ["1f468-1f3fb-200d-1f9b1", "1f468-1f3fc-200d-1f9b1", "1f468-1f3fd-200d-1f9b1", "1f468-1f3fe-200d-1f9b1", "1f468-1f3ff-200d-1f9b1"], a: "11" }, { n: ["man", "adult", "white hair", "man: white hair"], u: "1f468-200d-1f9b3", v: ["1f468-1f3fb-200d-1f9b3", "1f468-1f3fc-200d-1f9b3", "1f468-1f3fd-200d-1f9b3", "1f468-1f3fe-200d-1f9b3", "1f468-1f3ff-200d-1f9b3"], a: "11" }, { n: ["man", "bald", "adult", "man: bald"], u: "1f468-200d-1f9b2", v: ["1f468-1f3fb-200d-1f9b2", "1f468-1f3fc-200d-1f9b2", "1f468-1f3fd-200d-1f9b2", "1f468-1f3fe-200d-1f9b2", "1f468-1f3ff-200d-1f9b2"], a: "11" }, { n: ["woman", "adult"], u: "1f469", v: ["1f469-1f3fb", "1f469-1f3fc", "1f469-1f3fd", "1f469-1f3fe", "1f469-1f3ff"], a: "0.6" }, { n: ["adult", "woman", "red hair", "woman: red hair"], u: "1f469-200d-1f9b0", v: ["1f469-1f3fb-200d-1f9b0", "1f469-1f3fc-200d-1f9b0", "1f469-1f3fd-200d-1f9b0", "1f469-1f3fe-200d-1f9b0", "1f469-1f3ff-200d-1f9b0"], a: "11" }, { n: ["adult", "person", "red hair", "gender neutral", "person: red hair", "unspecified gender"], u: "1f9d1-200d-1f9b0", v: ["1f9d1-1f3fb-200d-1f9b0", "1f9d1-1f3fc-200d-1f9b0", "1f9d1-1f3fd-200d-1f9b0", "1f9d1-1f3fe-200d-1f9b0", "1f9d1-1f3ff-200d-1f9b0"], a: "12.1" }, { n: ["adult", "woman", "curly hair", "woman: curly hair"], u: "1f469-200d-1f9b1", v: ["1f469-1f3fb-200d-1f9b1", "1f469-1f3fc-200d-1f9b1", "1f469-1f3fd-200d-1f9b1", "1f469-1f3fe-200d-1f9b1", "1f469-1f3ff-200d-1f9b1"], a: "11" }, { n: ["adult", "person", "curly hair", "gender neutral", "person: curly hair", "unspecified gender"], u: "1f9d1-200d-1f9b1", v: ["1f9d1-1f3fb-200d-1f9b1", "1f9d1-1f3fc-200d-1f9b1", "1f9d1-1f3fd-200d-1f9b1", "1f9d1-1f3fe-200d-1f9b1", "1f9d1-1f3ff-200d-1f9b1"], a: "12.1" }, { n: ["adult", "woman", "white hair", "woman: white hair"], u: "1f469-200d-1f9b3", v: ["1f469-1f3fb-200d-1f9b3", "1f469-1f3fc-200d-1f9b3", "1f469-1f3fd-200d-1f9b3", "1f469-1f3fe-200d-1f9b3", "1f469-1f3ff-200d-1f9b3"], a: "11" }, { n: ["adult", "person", "white hair", "gender neutral", "person: white hair", "unspecified gender"], u: "1f9d1-200d-1f9b3", v: ["1f9d1-1f3fb-200d-1f9b3", "1f9d1-1f3fc-200d-1f9b3", "1f9d1-1f3fd-200d-1f9b3", "1f9d1-1f3fe-200d-1f9b3", "1f9d1-1f3ff-200d-1f9b3"], a: "12.1" }, { n: ["bald", "adult", "woman", "woman: bald"], u: "1f469-200d-1f9b2", v: ["1f469-1f3fb-200d-1f9b2", "1f469-1f3fc-200d-1f9b2", "1f469-1f3fd-200d-1f9b2", "1f469-1f3fe-200d-1f9b2", "1f469-1f3ff-200d-1f9b2"], a: "11" }, { n: ["bald", "adult", "person", "person: bald", "gender neutral", "unspecified gender"], u: "1f9d1-200d-1f9b2", v: ["1f9d1-1f3fb-200d-1f9b2", "1f9d1-1f3fc-200d-1f9b2", "1f9d1-1f3fd-200d-1f9b2", "1f9d1-1f3fe-200d-1f9b2", "1f9d1-1f3ff-200d-1f9b2"], a: "12.1" }, { n: ["hair", "woman", "blonde", "woman: blond hair", "blond haired woman"], u: "1f471-200d-2640-fe0f", v: ["1f471-1f3fb-200d-2640-fe0f", "1f471-1f3fc-200d-2640-fe0f", "1f471-1f3fd-200d-2640-fe0f", "1f471-1f3fe-200d-2640-fe0f", "1f471-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["man", "hair", "blond", "man: blond hair", "blond haired man"], u: "1f471-200d-2642-fe0f", v: ["1f471-1f3fb-200d-2642-fe0f", "1f471-1f3fc-200d-2642-fe0f", "1f471-1f3fd-200d-2642-fe0f", "1f471-1f3fe-200d-2642-fe0f", "1f471-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["old", "adult", "older person", "gender neutral", "unspecified gender"], u: "1f9d3", v: ["1f9d3-1f3fb", "1f9d3-1f3fc", "1f9d3-1f3fd", "1f9d3-1f3fe", "1f9d3-1f3ff"], a: "5" }, { n: ["man", "old", "adult", "old man"], u: "1f474", v: ["1f474-1f3fb", "1f474-1f3fc", "1f474-1f3fd", "1f474-1f3fe", "1f474-1f3ff"], a: "0.6" }, { n: ["old", "adult", "woman", "old woman"], u: "1f475", v: ["1f475-1f3fb", "1f475-1f3fc", "1f475-1f3fd", "1f475-1f3fe", "1f475-1f3ff"], a: "0.6" }, { n: ["frown", "gesture", "person frowning"], u: "1f64d", v: ["1f64d-1f3fb", "1f64d-1f3fc", "1f64d-1f3fd", "1f64d-1f3fe", "1f64d-1f3ff"], a: "0.6" }, { n: ["man", "gesture", "frowning", "man frowning"], u: "1f64d-200d-2642-fe0f", v: ["1f64d-1f3fb-200d-2642-fe0f", "1f64d-1f3fc-200d-2642-fe0f", "1f64d-1f3fd-200d-2642-fe0f", "1f64d-1f3fe-200d-2642-fe0f", "1f64d-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["woman", "gesture", "frowning", "woman frowning"], u: "1f64d-200d-2640-fe0f", v: ["1f64d-1f3fb-200d-2640-fe0f", "1f64d-1f3fc-200d-2640-fe0f", "1f64d-1f3fd-200d-2640-fe0f", "1f64d-1f3fe-200d-2640-fe0f", "1f64d-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["gesture", "pouting", "person pouting"], u: "1f64e", v: ["1f64e-1f3fb", "1f64e-1f3fc", "1f64e-1f3fd", "1f64e-1f3fe", "1f64e-1f3ff"], a: "0.6" }, { n: ["man", "gesture", "pouting", "man pouting"], u: "1f64e-200d-2642-fe0f", v: ["1f64e-1f3fb-200d-2642-fe0f", "1f64e-1f3fc-200d-2642-fe0f", "1f64e-1f3fd-200d-2642-fe0f", "1f64e-1f3fe-200d-2642-fe0f", "1f64e-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["woman", "gesture", "pouting", "woman pouting"], u: "1f64e-200d-2640-fe0f", v: ["1f64e-1f3fb-200d-2640-fe0f", "1f64e-1f3fc-200d-2640-fe0f", "1f64e-1f3fd-200d-2640-fe0f", "1f64e-1f3fe-200d-2640-fe0f", "1f64e-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["hand", "gesture", "forbidden", "prohibited", "person gesturing NO", "person gesturing no"], u: "1f645", v: ["1f645-1f3fb", "1f645-1f3fc", "1f645-1f3fd", "1f645-1f3fe", "1f645-1f3ff"], a: "0.6" }, { n: ["man", "hand", "gesture", "forbidden", "prohibited", "man gesturing NO", "man gesturing no"], u: "1f645-200d-2642-fe0f", v: ["1f645-1f3fb-200d-2642-fe0f", "1f645-1f3fc-200d-2642-fe0f", "1f645-1f3fd-200d-2642-fe0f", "1f645-1f3fe-200d-2642-fe0f", "1f645-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["hand", "woman", "gesture", "forbidden", "prohibited", "woman gesturing NO", "woman gesturing no"], u: "1f645-200d-2640-fe0f", v: ["1f645-1f3fb-200d-2640-fe0f", "1f645-1f3fc-200d-2640-fe0f", "1f645-1f3fd-200d-2640-fe0f", "1f645-1f3fe-200d-2640-fe0f", "1f645-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["ok", "hand", "gesture", "person gesturing OK", "person gesturing ok"], u: "1f646", v: ["1f646-1f3fb", "1f646-1f3fc", "1f646-1f3fd", "1f646-1f3fe", "1f646-1f3ff"], a: "0.6" }, { n: ["ok", "man", "hand", "gesture", "man gesturing OK", "man gesturing ok"], u: "1f646-200d-2642-fe0f", v: ["1f646-1f3fb-200d-2642-fe0f", "1f646-1f3fc-200d-2642-fe0f", "1f646-1f3fd-200d-2642-fe0f", "1f646-1f3fe-200d-2642-fe0f", "1f646-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["ok", "hand", "woman", "gesture", "woman gesturing OK", "woman gesturing ok"], u: "1f646-200d-2640-fe0f", v: ["1f646-1f3fb-200d-2640-fe0f", "1f646-1f3fc-200d-2640-fe0f", "1f646-1f3fd-200d-2640-fe0f", "1f646-1f3fe-200d-2640-fe0f", "1f646-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["hand", "help", "sassy", "tipping", "information", "person tipping hand"], u: "1f481", v: ["1f481-1f3fb", "1f481-1f3fc", "1f481-1f3fd", "1f481-1f3fe", "1f481-1f3ff"], a: "0.6" }, { n: ["man", "sassy", "tipping hand", "man tipping hand"], u: "1f481-200d-2642-fe0f", v: ["1f481-1f3fb-200d-2642-fe0f", "1f481-1f3fc-200d-2642-fe0f", "1f481-1f3fd-200d-2642-fe0f", "1f481-1f3fe-200d-2642-fe0f", "1f481-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["sassy", "woman", "tipping hand", "woman tipping hand"], u: "1f481-200d-2640-fe0f", v: ["1f481-1f3fb-200d-2640-fe0f", "1f481-1f3fc-200d-2640-fe0f", "1f481-1f3fd-200d-2640-fe0f", "1f481-1f3fe-200d-2640-fe0f", "1f481-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["hand", "happy", "raised", "gesture", "person raising hand"], u: "1f64b", v: ["1f64b-1f3fb", "1f64b-1f3fc", "1f64b-1f3fd", "1f64b-1f3fe", "1f64b-1f3ff"], a: "0.6" }, { n: ["man", "gesture", "raising hand", "man raising hand"], u: "1f64b-200d-2642-fe0f", v: ["1f64b-1f3fb-200d-2642-fe0f", "1f64b-1f3fc-200d-2642-fe0f", "1f64b-1f3fd-200d-2642-fe0f", "1f64b-1f3fe-200d-2642-fe0f", "1f64b-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["woman", "gesture", "raising hand", "woman raising hand"], u: "1f64b-200d-2640-fe0f", v: ["1f64b-1f3fb-200d-2640-fe0f", "1f64b-1f3fc-200d-2640-fe0f", "1f64b-1f3fd-200d-2640-fe0f", "1f64b-1f3fe-200d-2640-fe0f", "1f64b-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["ear", "deaf", "hear", "deaf person", "accessibility"], u: "1f9cf", v: ["1f9cf-1f3fb", "1f9cf-1f3fc", "1f9cf-1f3fd", "1f9cf-1f3fe", "1f9cf-1f3ff"], a: "12" }, { n: ["man", "deaf", "deaf man"], u: "1f9cf-200d-2642-fe0f", v: ["1f9cf-1f3fb-200d-2642-fe0f", "1f9cf-1f3fc-200d-2642-fe0f", "1f9cf-1f3fd-200d-2642-fe0f", "1f9cf-1f3fe-200d-2642-fe0f", "1f9cf-1f3ff-200d-2642-fe0f"], a: "12" }, { n: ["deaf", "woman", "deaf woman"], u: "1f9cf-200d-2640-fe0f", v: ["1f9cf-1f3fb-200d-2640-fe0f", "1f9cf-1f3fc-200d-2640-fe0f", "1f9cf-1f3fd-200d-2640-fe0f", "1f9cf-1f3fe-200d-2640-fe0f", "1f9cf-1f3ff-200d-2640-fe0f"], a: "12" }, { n: ["bow", "sorry", "apology", "gesture", "person bowing"], u: "1f647", v: ["1f647-1f3fb", "1f647-1f3fc", "1f647-1f3fd", "1f647-1f3fe", "1f647-1f3ff"], a: "0.6" }, { n: ["man", "favor", "sorry", "bowing", "apology", "gesture", "man bowing"], u: "1f647-200d-2642-fe0f", v: ["1f647-1f3fb-200d-2642-fe0f", "1f647-1f3fc-200d-2642-fe0f", "1f647-1f3fd-200d-2642-fe0f", "1f647-1f3fe-200d-2642-fe0f", "1f647-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["favor", "sorry", "woman", "bowing", "apology", "gesture", "woman bowing"], u: "1f647-200d-2640-fe0f", v: ["1f647-1f3fb-200d-2640-fe0f", "1f647-1f3fc-200d-2640-fe0f", "1f647-1f3fd-200d-2640-fe0f", "1f647-1f3fe-200d-2640-fe0f", "1f647-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["face", "palm", "disbelief", "exasperation", "person facepalming"], u: "1f926", v: ["1f926-1f3fb", "1f926-1f3fc", "1f926-1f3fd", "1f926-1f3fe", "1f926-1f3ff"], a: "3" }, { n: ["man", "facepalm", "disbelief", "exasperation", "man facepalming"], u: "1f926-200d-2642-fe0f", v: ["1f926-1f3fb-200d-2642-fe0f", "1f926-1f3fc-200d-2642-fe0f", "1f926-1f3fd-200d-2642-fe0f", "1f926-1f3fe-200d-2642-fe0f", "1f926-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["woman", "facepalm", "disbelief", "exasperation", "woman facepalming"], u: "1f926-200d-2640-fe0f", v: ["1f926-1f3fb-200d-2640-fe0f", "1f926-1f3fc-200d-2640-fe0f", "1f926-1f3fd-200d-2640-fe0f", "1f926-1f3fe-200d-2640-fe0f", "1f926-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["doubt", "shrug", "ignorance", "indifference", "person shrugging"], u: "1f937", v: ["1f937-1f3fb", "1f937-1f3fc", "1f937-1f3fd", "1f937-1f3fe", "1f937-1f3ff"], a: "3" }, { n: ["man", "doubt", "shrug", "ignorance", "indifference", "man shrugging"], u: "1f937-200d-2642-fe0f", v: ["1f937-1f3fb-200d-2642-fe0f", "1f937-1f3fc-200d-2642-fe0f", "1f937-1f3fd-200d-2642-fe0f", "1f937-1f3fe-200d-2642-fe0f", "1f937-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["doubt", "shrug", "woman", "ignorance", "indifference", "woman shrugging"], u: "1f937-200d-2640-fe0f", v: ["1f937-1f3fb-200d-2640-fe0f", "1f937-1f3fc-200d-2640-fe0f", "1f937-1f3fd-200d-2640-fe0f", "1f937-1f3fe-200d-2640-fe0f", "1f937-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["nurse", "doctor", "therapist", "healthcare", "health worker"], u: "1f9d1-200d-2695-fe0f", v: ["1f9d1-1f3fb-200d-2695-fe0f", "1f9d1-1f3fc-200d-2695-fe0f", "1f9d1-1f3fd-200d-2695-fe0f", "1f9d1-1f3fe-200d-2695-fe0f", "1f9d1-1f3ff-200d-2695-fe0f"], a: "12.1" }, { n: ["man", "nurse", "doctor", "therapist", "healthcare", "man health worker"], u: "1f468-200d-2695-fe0f", v: ["1f468-1f3fb-200d-2695-fe0f", "1f468-1f3fc-200d-2695-fe0f", "1f468-1f3fd-200d-2695-fe0f", "1f468-1f3fe-200d-2695-fe0f", "1f468-1f3ff-200d-2695-fe0f"], a: "4" }, { n: ["nurse", "woman", "doctor", "therapist", "healthcare", "woman health worker"], u: "1f469-200d-2695-fe0f", v: ["1f469-1f3fb-200d-2695-fe0f", "1f469-1f3fc-200d-2695-fe0f", "1f469-1f3fd-200d-2695-fe0f", "1f469-1f3fe-200d-2695-fe0f", "1f469-1f3ff-200d-2695-fe0f"], a: "4" }, { n: ["student", "graduate"], u: "1f9d1-200d-1f393", v: ["1f9d1-1f3fb-200d-1f393", "1f9d1-1f3fc-200d-1f393", "1f9d1-1f3fd-200d-1f393", "1f9d1-1f3fe-200d-1f393", "1f9d1-1f3ff-200d-1f393"], a: "12.1" }, { n: ["man", "student", "graduate", "man student"], u: "1f468-200d-1f393", v: ["1f468-1f3fb-200d-1f393", "1f468-1f3fc-200d-1f393", "1f468-1f3fd-200d-1f393", "1f468-1f3fe-200d-1f393", "1f468-1f3ff-200d-1f393"], a: "4" }, { n: ["woman", "student", "graduate", "woman student"], u: "1f469-200d-1f393", v: ["1f469-1f3fb-200d-1f393", "1f469-1f3fc-200d-1f393", "1f469-1f3fd-200d-1f393", "1f469-1f3fe-200d-1f393", "1f469-1f3ff-200d-1f393"], a: "4" }, { n: ["teacher", "lecturer", "professor", "instructor"], u: "1f9d1-200d-1f3eb", v: ["1f9d1-1f3fb-200d-1f3eb", "1f9d1-1f3fc-200d-1f3eb", "1f9d1-1f3fd-200d-1f3eb", "1f9d1-1f3fe-200d-1f3eb", "1f9d1-1f3ff-200d-1f3eb"], a: "12.1" }, { n: ["man", "teacher", "lecturer", "professor", "instructor", "man teacher"], u: "1f468-200d-1f3eb", v: ["1f468-1f3fb-200d-1f3eb", "1f468-1f3fc-200d-1f3eb", "1f468-1f3fd-200d-1f3eb", "1f468-1f3fe-200d-1f3eb", "1f468-1f3ff-200d-1f3eb"], a: "4" }, { n: ["woman", "teacher", "lecturer", "professor", "instructor", "woman teacher"], u: "1f469-200d-1f3eb", v: ["1f469-1f3fb-200d-1f3eb", "1f469-1f3fc-200d-1f3eb", "1f469-1f3fd-200d-1f3eb", "1f469-1f3fe-200d-1f3eb", "1f469-1f3ff-200d-1f3eb"], a: "4" }, { n: ["law", "judge", "scales", "justice"], u: "1f9d1-200d-2696-fe0f", v: ["1f9d1-1f3fb-200d-2696-fe0f", "1f9d1-1f3fc-200d-2696-fe0f", "1f9d1-1f3fd-200d-2696-fe0f", "1f9d1-1f3fe-200d-2696-fe0f", "1f9d1-1f3ff-200d-2696-fe0f"], a: "12.1" }, { n: ["law", "man", "judge", "scales", "justice", "man judge"], u: "1f468-200d-2696-fe0f", v: ["1f468-1f3fb-200d-2696-fe0f", "1f468-1f3fc-200d-2696-fe0f", "1f468-1f3fd-200d-2696-fe0f", "1f468-1f3fe-200d-2696-fe0f", "1f468-1f3ff-200d-2696-fe0f"], a: "4" }, { n: ["law", "judge", "woman", "scales", "justice", "woman judge"], u: "1f469-200d-2696-fe0f", v: ["1f469-1f3fb-200d-2696-fe0f", "1f469-1f3fc-200d-2696-fe0f", "1f469-1f3fd-200d-2696-fe0f", "1f469-1f3fe-200d-2696-fe0f", "1f469-1f3ff-200d-2696-fe0f"], a: "4" }, { n: ["farmer", "rancher", "gardener"], u: "1f9d1-200d-1f33e", v: ["1f9d1-1f3fb-200d-1f33e", "1f9d1-1f3fc-200d-1f33e", "1f9d1-1f3fd-200d-1f33e", "1f9d1-1f3fe-200d-1f33e", "1f9d1-1f3ff-200d-1f33e"], a: "12.1" }, { n: ["man", "farmer", "rancher", "gardener", "man farmer"], u: "1f468-200d-1f33e", v: ["1f468-1f3fb-200d-1f33e", "1f468-1f3fc-200d-1f33e", "1f468-1f3fd-200d-1f33e", "1f468-1f3fe-200d-1f33e", "1f468-1f3ff-200d-1f33e"], a: "4" }, { n: ["woman", "farmer", "rancher", "gardener", "woman farmer"], u: "1f469-200d-1f33e", v: ["1f469-1f3fb-200d-1f33e", "1f469-1f3fc-200d-1f33e", "1f469-1f3fd-200d-1f33e", "1f469-1f3fe-200d-1f33e", "1f469-1f3ff-200d-1f33e"], a: "4" }, { n: ["cook", "chef"], u: "1f9d1-200d-1f373", v: ["1f9d1-1f3fb-200d-1f373", "1f9d1-1f3fc-200d-1f373", "1f9d1-1f3fd-200d-1f373", "1f9d1-1f3fe-200d-1f373", "1f9d1-1f3ff-200d-1f373"], a: "12.1" }, { n: ["man", "chef", "cook", "man cook"], u: "1f468-200d-1f373", v: ["1f468-1f3fb-200d-1f373", "1f468-1f3fc-200d-1f373", "1f468-1f3fd-200d-1f373", "1f468-1f3fe-200d-1f373", "1f468-1f3ff-200d-1f373"], a: "4" }, { n: ["chef", "cook", "woman", "woman cook"], u: "1f469-200d-1f373", v: ["1f469-1f3fb-200d-1f373", "1f469-1f3fc-200d-1f373", "1f469-1f3fd-200d-1f373", "1f469-1f3fe-200d-1f373", "1f469-1f3ff-200d-1f373"], a: "4" }, { n: ["plumber", "mechanic", "electrician", "tradesperson"], u: "1f9d1-200d-1f527", v: ["1f9d1-1f3fb-200d-1f527", "1f9d1-1f3fc-200d-1f527", "1f9d1-1f3fd-200d-1f527", "1f9d1-1f3fe-200d-1f527", "1f9d1-1f3ff-200d-1f527"], a: "12.1" }, { n: ["man", "plumber", "mechanic", "electrician", "man mechanic", "tradesperson"], u: "1f468-200d-1f527", v: ["1f468-1f3fb-200d-1f527", "1f468-1f3fc-200d-1f527", "1f468-1f3fd-200d-1f527", "1f468-1f3fe-200d-1f527", "1f468-1f3ff-200d-1f527"], a: "4" }, { n: ["woman", "plumber", "mechanic", "electrician", "tradesperson", "woman mechanic"], u: "1f469-200d-1f527", v: ["1f469-1f3fb-200d-1f527", "1f469-1f3fc-200d-1f527", "1f469-1f3fd-200d-1f527", "1f469-1f3fe-200d-1f527", "1f469-1f3ff-200d-1f527"], a: "4" }, { n: ["worker", "factory", "assembly", "industrial", "factory worker"], u: "1f9d1-200d-1f3ed", v: ["1f9d1-1f3fb-200d-1f3ed", "1f9d1-1f3fc-200d-1f3ed", "1f9d1-1f3fd-200d-1f3ed", "1f9d1-1f3fe-200d-1f3ed", "1f9d1-1f3ff-200d-1f3ed"], a: "12.1" }, { n: ["man", "worker", "factory", "assembly", "industrial", "man factory worker"], u: "1f468-200d-1f3ed", v: ["1f468-1f3fb-200d-1f3ed", "1f468-1f3fc-200d-1f3ed", "1f468-1f3fd-200d-1f3ed", "1f468-1f3fe-200d-1f3ed", "1f468-1f3ff-200d-1f3ed"], a: "4" }, { n: ["woman", "worker", "factory", "assembly", "industrial", "woman factory worker"], u: "1f469-200d-1f3ed", v: ["1f469-1f3fb-200d-1f3ed", "1f469-1f3fc-200d-1f3ed", "1f469-1f3fd-200d-1f3ed", "1f469-1f3fe-200d-1f3ed", "1f469-1f3ff-200d-1f3ed"], a: "4" }, { n: ["manager", "business", "architect", "white collar", "office worker"], u: "1f9d1-200d-1f4bc", v: ["1f9d1-1f3fb-200d-1f4bc", "1f9d1-1f3fc-200d-1f4bc", "1f9d1-1f3fd-200d-1f4bc", "1f9d1-1f3fe-200d-1f4bc", "1f9d1-1f3ff-200d-1f4bc"], a: "12.1" }, { n: ["man", "manager", "business", "architect", "white collar", "man office worker"], u: "1f468-200d-1f4bc", v: ["1f468-1f3fb-200d-1f4bc", "1f468-1f3fc-200d-1f4bc", "1f468-1f3fd-200d-1f4bc", "1f468-1f3fe-200d-1f4bc", "1f468-1f3ff-200d-1f4bc"], a: "4" }, { n: ["woman", "manager", "business", "architect", "white collar", "woman office worker"], u: "1f469-200d-1f4bc", v: ["1f469-1f3fb-200d-1f4bc", "1f469-1f3fc-200d-1f4bc", "1f469-1f3fd-200d-1f4bc", "1f469-1f3fe-200d-1f4bc", "1f469-1f3ff-200d-1f4bc"], a: "4" }, { n: ["chemist", "engineer", "scientist", "biologist", "physicist"], u: "1f9d1-200d-1f52c", v: ["1f9d1-1f3fb-200d-1f52c", "1f9d1-1f3fc-200d-1f52c", "1f9d1-1f3fd-200d-1f52c", "1f9d1-1f3fe-200d-1f52c", "1f9d1-1f3ff-200d-1f52c"], a: "12.1" }, { n: ["man", "chemist", "engineer", "biologist", "physicist", "scientist", "man scientist"], u: "1f468-200d-1f52c", v: ["1f468-1f3fb-200d-1f52c", "1f468-1f3fc-200d-1f52c", "1f468-1f3fd-200d-1f52c", "1f468-1f3fe-200d-1f52c", "1f468-1f3ff-200d-1f52c"], a: "4" }, { n: ["woman", "chemist", "engineer", "biologist", "physicist", "scientist", "woman scientist"], u: "1f469-200d-1f52c", v: ["1f469-1f3fb-200d-1f52c", "1f469-1f3fc-200d-1f52c", "1f469-1f3fd-200d-1f52c", "1f469-1f3fe-200d-1f52c", "1f469-1f3ff-200d-1f52c"], a: "4" }, { n: ["coder", "inventor", "software", "developer", "technologist"], u: "1f9d1-200d-1f4bb", v: ["1f9d1-1f3fb-200d-1f4bb", "1f9d1-1f3fc-200d-1f4bb", "1f9d1-1f3fd-200d-1f4bb", "1f9d1-1f3fe-200d-1f4bb", "1f9d1-1f3ff-200d-1f4bb"], a: "12.1" }, { n: ["man", "coder", "inventor", "software", "developer", "technologist", "man technologist"], u: "1f468-200d-1f4bb", v: ["1f468-1f3fb-200d-1f4bb", "1f468-1f3fc-200d-1f4bb", "1f468-1f3fd-200d-1f4bb", "1f468-1f3fe-200d-1f4bb", "1f468-1f3ff-200d-1f4bb"], a: "4" }, { n: ["coder", "woman", "inventor", "software", "developer", "technologist", "woman technologist"], u: "1f469-200d-1f4bb", v: ["1f469-1f3fb-200d-1f4bb", "1f469-1f3fc-200d-1f4bb", "1f469-1f3fd-200d-1f4bb", "1f469-1f3fe-200d-1f4bb", "1f469-1f3ff-200d-1f4bb"], a: "4" }, { n: ["rock", "star", "actor", "singer", "entertainer"], u: "1f9d1-200d-1f3a4", v: ["1f9d1-1f3fb-200d-1f3a4", "1f9d1-1f3fc-200d-1f3a4", "1f9d1-1f3fd-200d-1f3a4", "1f9d1-1f3fe-200d-1f3a4", "1f9d1-1f3ff-200d-1f3a4"], a: "12.1" }, { n: ["man", "rock", "star", "actor", "singer", "man singer", "entertainer"], u: "1f468-200d-1f3a4", v: ["1f468-1f3fb-200d-1f3a4", "1f468-1f3fc-200d-1f3a4", "1f468-1f3fd-200d-1f3a4", "1f468-1f3fe-200d-1f3a4", "1f468-1f3ff-200d-1f3a4"], a: "4" }, { n: ["rock", "star", "actor", "woman", "singer", "entertainer", "woman singer"], u: "1f469-200d-1f3a4", v: ["1f469-1f3fb-200d-1f3a4", "1f469-1f3fc-200d-1f3a4", "1f469-1f3fd-200d-1f3a4", "1f469-1f3fe-200d-1f3a4", "1f469-1f3ff-200d-1f3a4"], a: "4" }, { n: ["artist", "palette"], u: "1f9d1-200d-1f3a8", v: ["1f9d1-1f3fb-200d-1f3a8", "1f9d1-1f3fc-200d-1f3a8", "1f9d1-1f3fd-200d-1f3a8", "1f9d1-1f3fe-200d-1f3a8", "1f9d1-1f3ff-200d-1f3a8"], a: "12.1" }, { n: ["man", "artist", "palette", "man artist"], u: "1f468-200d-1f3a8", v: ["1f468-1f3fb-200d-1f3a8", "1f468-1f3fc-200d-1f3a8", "1f468-1f3fd-200d-1f3a8", "1f468-1f3fe-200d-1f3a8", "1f468-1f3ff-200d-1f3a8"], a: "4" }, { n: ["woman", "artist", "palette", "woman artist"], u: "1f469-200d-1f3a8", v: ["1f469-1f3fb-200d-1f3a8", "1f469-1f3fc-200d-1f3a8", "1f469-1f3fd-200d-1f3a8", "1f469-1f3fe-200d-1f3a8", "1f469-1f3ff-200d-1f3a8"], a: "4" }, { n: ["pilot", "plane"], u: "1f9d1-200d-2708-fe0f", v: ["1f9d1-1f3fb-200d-2708-fe0f", "1f9d1-1f3fc-200d-2708-fe0f", "1f9d1-1f3fd-200d-2708-fe0f", "1f9d1-1f3fe-200d-2708-fe0f", "1f9d1-1f3ff-200d-2708-fe0f"], a: "12.1" }, { n: ["man", "pilot", "plane", "man pilot"], u: "1f468-200d-2708-fe0f", v: ["1f468-1f3fb-200d-2708-fe0f", "1f468-1f3fc-200d-2708-fe0f", "1f468-1f3fd-200d-2708-fe0f", "1f468-1f3fe-200d-2708-fe0f", "1f468-1f3ff-200d-2708-fe0f"], a: "4" }, { n: ["pilot", "plane", "woman", "woman pilot"], u: "1f469-200d-2708-fe0f", v: ["1f469-1f3fb-200d-2708-fe0f", "1f469-1f3fc-200d-2708-fe0f", "1f469-1f3fd-200d-2708-fe0f", "1f469-1f3fe-200d-2708-fe0f", "1f469-1f3ff-200d-2708-fe0f"], a: "4" }, { n: ["rocket", "astronaut"], u: "1f9d1-200d-1f680", v: ["1f9d1-1f3fb-200d-1f680", "1f9d1-1f3fc-200d-1f680", "1f9d1-1f3fd-200d-1f680", "1f9d1-1f3fe-200d-1f680", "1f9d1-1f3ff-200d-1f680"], a: "12.1" }, { n: ["man", "rocket", "astronaut", "man astronaut"], u: "1f468-200d-1f680", v: ["1f468-1f3fb-200d-1f680", "1f468-1f3fc-200d-1f680", "1f468-1f3fd-200d-1f680", "1f468-1f3fe-200d-1f680", "1f468-1f3ff-200d-1f680"], a: "4" }, { n: ["woman", "rocket", "astronaut", "woman astronaut"], u: "1f469-200d-1f680", v: ["1f469-1f3fb-200d-1f680", "1f469-1f3fc-200d-1f680", "1f469-1f3fd-200d-1f680", "1f469-1f3fe-200d-1f680", "1f469-1f3ff-200d-1f680"], a: "4" }, { n: ["fire", "firetruck", "firefighter"], u: "1f9d1-200d-1f692", v: ["1f9d1-1f3fb-200d-1f692", "1f9d1-1f3fc-200d-1f692", "1f9d1-1f3fd-200d-1f692", "1f9d1-1f3fe-200d-1f692", "1f9d1-1f3ff-200d-1f692"], a: "12.1" }, { n: ["man", "firetruck", "firefighter", "man firefighter"], u: "1f468-200d-1f692", v: ["1f468-1f3fb-200d-1f692", "1f468-1f3fc-200d-1f692", "1f468-1f3fd-200d-1f692", "1f468-1f3fe-200d-1f692", "1f468-1f3ff-200d-1f692"], a: "4" }, { n: ["woman", "firetruck", "firefighter", "woman firefighter"], u: "1f469-200d-1f692", v: ["1f469-1f3fb-200d-1f692", "1f469-1f3fc-200d-1f692", "1f469-1f3fd-200d-1f692", "1f469-1f3fe-200d-1f692", "1f469-1f3ff-200d-1f692"], a: "4" }, { n: ["cop", "police", "officer", "police officer"], u: "1f46e", v: ["1f46e-1f3fb", "1f46e-1f3fc", "1f46e-1f3fd", "1f46e-1f3fe", "1f46e-1f3ff"], a: "0.6" }, { n: ["cop", "man", "police", "officer", "man police officer"], u: "1f46e-200d-2642-fe0f", v: ["1f46e-1f3fb-200d-2642-fe0f", "1f46e-1f3fc-200d-2642-fe0f", "1f46e-1f3fd-200d-2642-fe0f", "1f46e-1f3fe-200d-2642-fe0f", "1f46e-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["cop", "woman", "police", "officer", "woman police officer"], u: "1f46e-200d-2640-fe0f", v: ["1f46e-1f3fb-200d-2640-fe0f", "1f46e-1f3fc-200d-2640-fe0f", "1f46e-1f3fd-200d-2640-fe0f", "1f46e-1f3fe-200d-2640-fe0f", "1f46e-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["spy", "sleuth", "detective"], u: "1f575-fe0f", v: ["1f575-1f3fb", "1f575-1f3fc", "1f575-1f3fd", "1f575-1f3fe", "1f575-1f3ff"], a: "0.7" }, { n: ["man", "spy", "sleuth", "detective", "man detective"], u: "1f575-fe0f-200d-2642-fe0f", v: ["1f575-1f3fb-200d-2642-fe0f", "1f575-1f3fc-200d-2642-fe0f", "1f575-1f3fd-200d-2642-fe0f", "1f575-1f3fe-200d-2642-fe0f", "1f575-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["spy", "woman", "sleuth", "detective", "woman detective"], u: "1f575-fe0f-200d-2640-fe0f", v: ["1f575-1f3fb-200d-2640-fe0f", "1f575-1f3fc-200d-2640-fe0f", "1f575-1f3fd-200d-2640-fe0f", "1f575-1f3fe-200d-2640-fe0f", "1f575-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["guard"], u: "1f482", v: ["1f482-1f3fb", "1f482-1f3fc", "1f482-1f3fd", "1f482-1f3fe", "1f482-1f3ff"], a: "0.6" }, { n: ["man", "guard", "man guard"], u: "1f482-200d-2642-fe0f", v: ["1f482-1f3fb-200d-2642-fe0f", "1f482-1f3fc-200d-2642-fe0f", "1f482-1f3fd-200d-2642-fe0f", "1f482-1f3fe-200d-2642-fe0f", "1f482-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["guard", "woman", "woman guard"], u: "1f482-200d-2640-fe0f", v: ["1f482-1f3fb-200d-2640-fe0f", "1f482-1f3fc-200d-2640-fe0f", "1f482-1f3fd-200d-2640-fe0f", "1f482-1f3fe-200d-2640-fe0f", "1f482-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["ninja", "hidden", "fighter", "stealth"], u: "1f977", v: ["1f977-1f3fb", "1f977-1f3fc", "1f977-1f3fd", "1f977-1f3fe", "1f977-1f3ff"], a: "13" }, { n: ["hat", "worker", "construction", "construction worker"], u: "1f477", v: ["1f477-1f3fb", "1f477-1f3fc", "1f477-1f3fd", "1f477-1f3fe", "1f477-1f3ff"], a: "0.6" }, { n: ["man", "worker", "construction", "man construction worker"], u: "1f477-200d-2642-fe0f", v: ["1f477-1f3fb-200d-2642-fe0f", "1f477-1f3fc-200d-2642-fe0f", "1f477-1f3fd-200d-2642-fe0f", "1f477-1f3fe-200d-2642-fe0f", "1f477-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["woman", "worker", "construction", "woman construction worker"], u: "1f477-200d-2640-fe0f", v: ["1f477-1f3fb-200d-2640-fe0f", "1f477-1f3fc-200d-2640-fe0f", "1f477-1f3fd-200d-2640-fe0f", "1f477-1f3fe-200d-2640-fe0f", "1f477-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["noble", "regal", "monarch", "royalty", "person with crown"], u: "1fac5", v: ["1fac5-1f3fb", "1fac5-1f3fc", "1fac5-1f3fd", "1fac5-1f3fe", "1fac5-1f3ff"], a: "14" }, { n: ["prince"], u: "1f934", v: ["1f934-1f3fb", "1f934-1f3fc", "1f934-1f3fd", "1f934-1f3fe", "1f934-1f3ff"], a: "3" }, { n: ["fantasy", "princess", "fairy tale"], u: "1f478", v: ["1f478-1f3fb", "1f478-1f3fc", "1f478-1f3fd", "1f478-1f3fe", "1f478-1f3ff"], a: "0.6" }, { n: ["turban", "person wearing turban"], u: "1f473", v: ["1f473-1f3fb", "1f473-1f3fc", "1f473-1f3fd", "1f473-1f3fe", "1f473-1f3ff"], a: "0.6" }, { n: ["man", "turban", "man wearing turban"], u: "1f473-200d-2642-fe0f", v: ["1f473-1f3fb-200d-2642-fe0f", "1f473-1f3fc-200d-2642-fe0f", "1f473-1f3fd-200d-2642-fe0f", "1f473-1f3fe-200d-2642-fe0f", "1f473-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["woman", "turban", "woman wearing turban"], u: "1f473-200d-2640-fe0f", v: ["1f473-1f3fb-200d-2640-fe0f", "1f473-1f3fc-200d-2640-fe0f", "1f473-1f3fd-200d-2640-fe0f", "1f473-1f3fe-200d-2640-fe0f", "1f473-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["cap", "hat", "person", "skullcap", "gua pi mao", "person with skullcap"], u: "1f472", v: ["1f472-1f3fb", "1f472-1f3fc", "1f472-1f3fd", "1f472-1f3fe", "1f472-1f3ff"], a: "0.6" }, { n: ["hijab", "tichel", "mantilla", "headscarf", "woman with headscarf"], u: "1f9d5", v: ["1f9d5-1f3fb", "1f9d5-1f3fc", "1f9d5-1f3fd", "1f9d5-1f3fe", "1f9d5-1f3ff"], a: "5" }, { n: ["groom", "person", "tuxedo", "person in tuxedo"], u: "1f935", v: ["1f935-1f3fb", "1f935-1f3fc", "1f935-1f3fd", "1f935-1f3fe", "1f935-1f3ff"], a: "3" }, { n: ["man", "tuxedo", "man in tuxedo"], u: "1f935-200d-2642-fe0f", v: ["1f935-1f3fb-200d-2642-fe0f", "1f935-1f3fc-200d-2642-fe0f", "1f935-1f3fd-200d-2642-fe0f", "1f935-1f3fe-200d-2642-fe0f", "1f935-1f3ff-200d-2642-fe0f"], a: "13" }, { n: ["woman", "tuxedo", "woman in tuxedo"], u: "1f935-200d-2640-fe0f", v: ["1f935-1f3fb-200d-2640-fe0f", "1f935-1f3fc-200d-2640-fe0f", "1f935-1f3fd-200d-2640-fe0f", "1f935-1f3fe-200d-2640-fe0f", "1f935-1f3ff-200d-2640-fe0f"], a: "13" }, { n: ["veil", "bride", "person", "wedding", "person with veil"], u: "1f470", v: ["1f470-1f3fb", "1f470-1f3fc", "1f470-1f3fd", "1f470-1f3fe", "1f470-1f3ff"], a: "0.6" }, { n: ["man", "veil", "man with veil"], u: "1f470-200d-2642-fe0f", v: ["1f470-1f3fb-200d-2642-fe0f", "1f470-1f3fc-200d-2642-fe0f", "1f470-1f3fd-200d-2642-fe0f", "1f470-1f3fe-200d-2642-fe0f", "1f470-1f3ff-200d-2642-fe0f"], a: "13" }, { n: ["veil", "woman", "woman with veil"], u: "1f470-200d-2640-fe0f", v: ["1f470-1f3fb-200d-2640-fe0f", "1f470-1f3fc-200d-2640-fe0f", "1f470-1f3fd-200d-2640-fe0f", "1f470-1f3fe-200d-2640-fe0f", "1f470-1f3ff-200d-2640-fe0f"], a: "13" }, { n: ["woman", "pregnant", "pregnant woman"], u: "1f930", v: ["1f930-1f3fb", "1f930-1f3fc", "1f930-1f3fd", "1f930-1f3fe", "1f930-1f3ff"], a: "3" }, { n: ["full", "belly", "bloated", "pregnant", "pregnant man"], u: "1fac3", v: ["1fac3-1f3fb", "1fac3-1f3fc", "1fac3-1f3fd", "1fac3-1f3fe", "1fac3-1f3ff"], a: "14" }, { n: ["full", "belly", "bloated", "pregnant", "pregnant person"], u: "1fac4", v: ["1fac4-1f3fb", "1fac4-1f3fc", "1fac4-1f3fd", "1fac4-1f3fe", "1fac4-1f3ff"], a: "14" }, { n: ["baby", "breast", "nursing", "breast feeding"], u: "1f931", v: ["1f931-1f3fb", "1f931-1f3fc", "1f931-1f3fd", "1f931-1f3fe", "1f931-1f3ff"], a: "5" }, { n: ["baby", "woman", "feeding", "nursing", "woman feeding baby"], u: "1f469-200d-1f37c", v: ["1f469-1f3fb-200d-1f37c", "1f469-1f3fc-200d-1f37c", "1f469-1f3fd-200d-1f37c", "1f469-1f3fe-200d-1f37c", "1f469-1f3ff-200d-1f37c"], a: "13" }, { n: ["man", "baby", "feeding", "nursing", "man feeding baby"], u: "1f468-200d-1f37c", v: ["1f468-1f3fb-200d-1f37c", "1f468-1f3fc-200d-1f37c", "1f468-1f3fd-200d-1f37c", "1f468-1f3fe-200d-1f37c", "1f468-1f3ff-200d-1f37c"], a: "13" }, { n: ["baby", "person", "feeding", "nursing", "person feeding baby"], u: "1f9d1-200d-1f37c", v: ["1f9d1-1f3fb-200d-1f37c", "1f9d1-1f3fc-200d-1f37c", "1f9d1-1f3fd-200d-1f37c", "1f9d1-1f3fe-200d-1f37c", "1f9d1-1f3ff-200d-1f37c"], a: "13" }, { n: ["baby", "face", "angel", "fantasy", "baby angel", "fairy tale"], u: "1f47c", v: ["1f47c-1f3fb", "1f47c-1f3fc", "1f47c-1f3fd", "1f47c-1f3fe", "1f47c-1f3ff"], a: "0.6" }, { n: ["claus", "santa", "father", "christmas", "Santa Claus", "celebration"], u: "1f385", v: ["1f385-1f3fb", "1f385-1f3fc", "1f385-1f3fd", "1f385-1f3fe", "1f385-1f3ff"], a: "0.6" }, { n: ["mrs.", "claus", "mother", "christmas", "Mrs. Claus", "celebration"], u: "1f936", v: ["1f936-1f3fb", "1f936-1f3fc", "1f936-1f3fd", "1f936-1f3fe", "1f936-1f3ff"], a: "3" }, { n: ["claus", "mx claus", "christmas"], u: "1f9d1-200d-1f384", v: ["1f9d1-1f3fb-200d-1f384", "1f9d1-1f3fc-200d-1f384", "1f9d1-1f3fd-200d-1f384", "1f9d1-1f3fe-200d-1f384", "1f9d1-1f3ff-200d-1f384"], a: "13" }, { n: ["good", "hero", "heroine", "superhero", "superpower"], u: "1f9b8", v: ["1f9b8-1f3fb", "1f9b8-1f3fc", "1f9b8-1f3fd", "1f9b8-1f3fe", "1f9b8-1f3ff"], a: "11" }, { n: ["man", "good", "hero", "superpower", "man superhero"], u: "1f9b8-200d-2642-fe0f", v: ["1f9b8-1f3fb-200d-2642-fe0f", "1f9b8-1f3fc-200d-2642-fe0f", "1f9b8-1f3fd-200d-2642-fe0f", "1f9b8-1f3fe-200d-2642-fe0f", "1f9b8-1f3ff-200d-2642-fe0f"], a: "11" }, { n: ["good", "hero", "woman", "heroine", "superpower", "woman superhero"], u: "1f9b8-200d-2640-fe0f", v: ["1f9b8-1f3fb-200d-2640-fe0f", "1f9b8-1f3fc-200d-2640-fe0f", "1f9b8-1f3fd-200d-2640-fe0f", "1f9b8-1f3fe-200d-2640-fe0f", "1f9b8-1f3ff-200d-2640-fe0f"], a: "11" }, { n: ["evil", "villain", "criminal", "superpower", "supervillain"], u: "1f9b9", v: ["1f9b9-1f3fb", "1f9b9-1f3fc", "1f9b9-1f3fd", "1f9b9-1f3fe", "1f9b9-1f3ff"], a: "11" }, { n: ["man", "evil", "villain", "criminal", "superpower", "man supervillain"], u: "1f9b9-200d-2642-fe0f", v: ["1f9b9-1f3fb-200d-2642-fe0f", "1f9b9-1f3fc-200d-2642-fe0f", "1f9b9-1f3fd-200d-2642-fe0f", "1f9b9-1f3fe-200d-2642-fe0f", "1f9b9-1f3ff-200d-2642-fe0f"], a: "11" }, { n: ["evil", "woman", "villain", "criminal", "superpower", "woman supervillain"], u: "1f9b9-200d-2640-fe0f", v: ["1f9b9-1f3fb-200d-2640-fe0f", "1f9b9-1f3fc-200d-2640-fe0f", "1f9b9-1f3fd-200d-2640-fe0f", "1f9b9-1f3fe-200d-2640-fe0f", "1f9b9-1f3ff-200d-2640-fe0f"], a: "11" }, { n: ["mage", "witch", "wizard", "sorcerer", "sorceress"], u: "1f9d9", v: ["1f9d9-1f3fb", "1f9d9-1f3fc", "1f9d9-1f3fd", "1f9d9-1f3fe", "1f9d9-1f3ff"], a: "5" }, { n: ["wizard", "man mage", "sorcerer"], u: "1f9d9-200d-2642-fe0f", v: ["1f9d9-1f3fb-200d-2642-fe0f", "1f9d9-1f3fc-200d-2642-fe0f", "1f9d9-1f3fd-200d-2642-fe0f", "1f9d9-1f3fe-200d-2642-fe0f", "1f9d9-1f3ff-200d-2642-fe0f"], a: "5" }, { n: ["witch", "sorceress", "woman mage"], u: "1f9d9-200d-2640-fe0f", v: ["1f9d9-1f3fb-200d-2640-fe0f", "1f9d9-1f3fc-200d-2640-fe0f", "1f9d9-1f3fd-200d-2640-fe0f", "1f9d9-1f3fe-200d-2640-fe0f", "1f9d9-1f3ff-200d-2640-fe0f"], a: "5" }, { n: ["puck", "fairy", "oberon", "titania"], u: "1f9da", v: ["1f9da-1f3fb", "1f9da-1f3fc", "1f9da-1f3fd", "1f9da-1f3fe", "1f9da-1f3ff"], a: "5" }, { n: ["puck", "oberon", "man fairy"], u: "1f9da-200d-2642-fe0f", v: ["1f9da-1f3fb-200d-2642-fe0f", "1f9da-1f3fc-200d-2642-fe0f", "1f9da-1f3fd-200d-2642-fe0f", "1f9da-1f3fe-200d-2642-fe0f", "1f9da-1f3ff-200d-2642-fe0f"], a: "5" }, { n: ["titania", "woman fairy"], u: "1f9da-200d-2640-fe0f", v: ["1f9da-1f3fb-200d-2640-fe0f", "1f9da-1f3fc-200d-2640-fe0f", "1f9da-1f3fd-200d-2640-fe0f", "1f9da-1f3fe-200d-2640-fe0f", "1f9da-1f3ff-200d-2640-fe0f"], a: "5" }, { n: ["undead", "vampire", "dracula"], u: "1f9db", v: ["1f9db-1f3fb", "1f9db-1f3fc", "1f9db-1f3fd", "1f9db-1f3fe", "1f9db-1f3ff"], a: "5" }, { n: ["undead", "dracula", "man vampire"], u: "1f9db-200d-2642-fe0f", v: ["1f9db-1f3fb-200d-2642-fe0f", "1f9db-1f3fc-200d-2642-fe0f", "1f9db-1f3fd-200d-2642-fe0f", "1f9db-1f3fe-200d-2642-fe0f", "1f9db-1f3ff-200d-2642-fe0f"], a: "5" }, { n: ["undead", "woman vampire"], u: "1f9db-200d-2640-fe0f", v: ["1f9db-1f3fb-200d-2640-fe0f", "1f9db-1f3fc-200d-2640-fe0f", "1f9db-1f3fd-200d-2640-fe0f", "1f9db-1f3fe-200d-2640-fe0f", "1f9db-1f3ff-200d-2640-fe0f"], a: "5" }, { n: ["merman", "mermaid", "merwoman", "merperson"], u: "1f9dc", v: ["1f9dc-1f3fb", "1f9dc-1f3fc", "1f9dc-1f3fd", "1f9dc-1f3fe", "1f9dc-1f3ff"], a: "5" }, { n: ["merman", "triton"], u: "1f9dc-200d-2642-fe0f", v: ["1f9dc-1f3fb-200d-2642-fe0f", "1f9dc-1f3fc-200d-2642-fe0f", "1f9dc-1f3fd-200d-2642-fe0f", "1f9dc-1f3fe-200d-2642-fe0f", "1f9dc-1f3ff-200d-2642-fe0f"], a: "5" }, { n: ["mermaid", "merwoman"], u: "1f9dc-200d-2640-fe0f", v: ["1f9dc-1f3fb-200d-2640-fe0f", "1f9dc-1f3fc-200d-2640-fe0f", "1f9dc-1f3fd-200d-2640-fe0f", "1f9dc-1f3fe-200d-2640-fe0f", "1f9dc-1f3ff-200d-2640-fe0f"], a: "5" }, { n: ["elf", "magical"], u: "1f9dd", v: ["1f9dd-1f3fb", "1f9dd-1f3fc", "1f9dd-1f3fd", "1f9dd-1f3fe", "1f9dd-1f3ff"], a: "5" }, { n: ["man elf", "magical"], u: "1f9dd-200d-2642-fe0f", v: ["1f9dd-1f3fb-200d-2642-fe0f", "1f9dd-1f3fc-200d-2642-fe0f", "1f9dd-1f3fd-200d-2642-fe0f", "1f9dd-1f3fe-200d-2642-fe0f", "1f9dd-1f3ff-200d-2642-fe0f"], a: "5" }, { n: ["magical", "woman elf"], u: "1f9dd-200d-2640-fe0f", v: ["1f9dd-1f3fb-200d-2640-fe0f", "1f9dd-1f3fc-200d-2640-fe0f", "1f9dd-1f3fd-200d-2640-fe0f", "1f9dd-1f3fe-200d-2640-fe0f", "1f9dd-1f3ff-200d-2640-fe0f"], a: "5" }, { n: ["genie", "djinn"], u: "1f9de", a: "5" }, { n: ["djinn", "man genie"], u: "1f9de-200d-2642-fe0f", a: "5" }, { n: ["djinn", "woman genie"], u: "1f9de-200d-2640-fe0f", a: "5" }, { n: ["zombie", "undead", "walking dead"], u: "1f9df", a: "5" }, { n: ["undead", "man zombie", "walking dead"], u: "1f9df-200d-2642-fe0f", a: "5" }, { n: ["undead", "woman zombie", "walking dead"], u: "1f9df-200d-2640-fe0f", a: "5" }, { n: ["troll", "fantasy", "monster", "fairy tale"], u: "1f9cc", a: "14" }, { n: ["face", "salon", "massage", "person getting massage"], u: "1f486", v: ["1f486-1f3fb", "1f486-1f3fc", "1f486-1f3fd", "1f486-1f3fe", "1f486-1f3ff"], a: "0.6" }, { n: ["man", "face", "massage", "man getting massage"], u: "1f486-200d-2642-fe0f", v: ["1f486-1f3fb-200d-2642-fe0f", "1f486-1f3fc-200d-2642-fe0f", "1f486-1f3fd-200d-2642-fe0f", "1f486-1f3fe-200d-2642-fe0f", "1f486-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["face", "woman", "massage", "woman getting massage"], u: "1f486-200d-2640-fe0f", v: ["1f486-1f3fb-200d-2640-fe0f", "1f486-1f3fc-200d-2640-fe0f", "1f486-1f3fd-200d-2640-fe0f", "1f486-1f3fe-200d-2640-fe0f", "1f486-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["barber", "beauty", "parlor", "haircut", "person getting haircut"], u: "1f487", v: ["1f487-1f3fb", "1f487-1f3fc", "1f487-1f3fd", "1f487-1f3fe", "1f487-1f3ff"], a: "0.6" }, { n: ["man", "haircut", "man getting haircut"], u: "1f487-200d-2642-fe0f", v: ["1f487-1f3fb-200d-2642-fe0f", "1f487-1f3fc-200d-2642-fe0f", "1f487-1f3fd-200d-2642-fe0f", "1f487-1f3fe-200d-2642-fe0f", "1f487-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["woman", "haircut", "woman getting haircut"], u: "1f487-200d-2640-fe0f", v: ["1f487-1f3fb-200d-2640-fe0f", "1f487-1f3fc-200d-2640-fe0f", "1f487-1f3fd-200d-2640-fe0f", "1f487-1f3fe-200d-2640-fe0f", "1f487-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["hike", "walk", "walking", "person walking"], u: "1f6b6", v: ["1f6b6-1f3fb", "1f6b6-1f3fc", "1f6b6-1f3fd", "1f6b6-1f3fe", "1f6b6-1f3ff"], a: "0.6" }, { n: ["man", "hike", "walk", "man walking"], u: "1f6b6-200d-2642-fe0f", v: ["1f6b6-1f3fb-200d-2642-fe0f", "1f6b6-1f3fc-200d-2642-fe0f", "1f6b6-1f3fd-200d-2642-fe0f", "1f6b6-1f3fe-200d-2642-fe0f", "1f6b6-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["hike", "walk", "woman", "woman walking"], u: "1f6b6-200d-2640-fe0f", v: ["1f6b6-1f3fb-200d-2640-fe0f", "1f6b6-1f3fc-200d-2640-fe0f", "1f6b6-1f3fd-200d-2640-fe0f", "1f6b6-1f3fe-200d-2640-fe0f", "1f6b6-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["hike", "walk", "walking", "person walking", "person walking facing right"], u: "1f6b6-200d-27a1-fe0f", v: ["1f6b6-1f3fb-200d-27a1-fe0f", "1f6b6-1f3fc-200d-27a1-fe0f", "1f6b6-1f3fd-200d-27a1-fe0f", "1f6b6-1f3fe-200d-27a1-fe0f", "1f6b6-1f3ff-200d-27a1-fe0f"], a: "15.1" }, { n: ["hike", "walk", "woman", "woman walking", "woman walking facing right"], u: "1f6b6-200d-2640-fe0f-200d-27a1-fe0f", v: ["1f6b6-1f3fb-200d-2640-fe0f-200d-27a1-fe0f", "1f6b6-1f3fc-200d-2640-fe0f-200d-27a1-fe0f", "1f6b6-1f3fd-200d-2640-fe0f-200d-27a1-fe0f", "1f6b6-1f3fe-200d-2640-fe0f-200d-27a1-fe0f", "1f6b6-1f3ff-200d-2640-fe0f-200d-27a1-fe0f"], a: "15.1" }, { n: ["man", "hike", "walk", "man walking", "man walking facing right"], u: "1f6b6-200d-2642-fe0f-200d-27a1-fe0f", v: ["1f6b6-1f3fb-200d-2642-fe0f-200d-27a1-fe0f", "1f6b6-1f3fc-200d-2642-fe0f-200d-27a1-fe0f", "1f6b6-1f3fd-200d-2642-fe0f-200d-27a1-fe0f", "1f6b6-1f3fe-200d-2642-fe0f-200d-27a1-fe0f", "1f6b6-1f3ff-200d-2642-fe0f-200d-27a1-fe0f"], a: "15.1" }, { n: ["stand", "standing", "person standing"], u: "1f9cd", v: ["1f9cd-1f3fb", "1f9cd-1f3fc", "1f9cd-1f3fd", "1f9cd-1f3fe", "1f9cd-1f3ff"], a: "12" }, { n: ["man", "standing", "man standing"], u: "1f9cd-200d-2642-fe0f", v: ["1f9cd-1f3fb-200d-2642-fe0f", "1f9cd-1f3fc-200d-2642-fe0f", "1f9cd-1f3fd-200d-2642-fe0f", "1f9cd-1f3fe-200d-2642-fe0f", "1f9cd-1f3ff-200d-2642-fe0f"], a: "12" }, { n: ["woman", "standing", "woman standing"], u: "1f9cd-200d-2640-fe0f", v: ["1f9cd-1f3fb-200d-2640-fe0f", "1f9cd-1f3fc-200d-2640-fe0f", "1f9cd-1f3fd-200d-2640-fe0f", "1f9cd-1f3fe-200d-2640-fe0f", "1f9cd-1f3ff-200d-2640-fe0f"], a: "12" }, { n: ["kneel", "kneeling", "person kneeling"], u: "1f9ce", v: ["1f9ce-1f3fb", "1f9ce-1f3fc", "1f9ce-1f3fd", "1f9ce-1f3fe", "1f9ce-1f3ff"], a: "12" }, { n: ["man", "kneeling", "man kneeling"], u: "1f9ce-200d-2642-fe0f", v: ["1f9ce-1f3fb-200d-2642-fe0f", "1f9ce-1f3fc-200d-2642-fe0f", "1f9ce-1f3fd-200d-2642-fe0f", "1f9ce-1f3fe-200d-2642-fe0f", "1f9ce-1f3ff-200d-2642-fe0f"], a: "12" }, { n: ["woman", "kneeling", "woman kneeling"], u: "1f9ce-200d-2640-fe0f", v: ["1f9ce-1f3fb-200d-2640-fe0f", "1f9ce-1f3fc-200d-2640-fe0f", "1f9ce-1f3fd-200d-2640-fe0f", "1f9ce-1f3fe-200d-2640-fe0f", "1f9ce-1f3ff-200d-2640-fe0f"], a: "12" }, { n: ["kneel", "kneeling", "person kneeling", "person kneeling facing right"], u: "1f9ce-200d-27a1-fe0f", v: ["1f9ce-1f3fb-200d-27a1-fe0f", "1f9ce-1f3fc-200d-27a1-fe0f", "1f9ce-1f3fd-200d-27a1-fe0f", "1f9ce-1f3fe-200d-27a1-fe0f", "1f9ce-1f3ff-200d-27a1-fe0f"], a: "15.1" }, { n: ["woman", "kneeling", "woman kneeling facing right"], u: "1f9ce-200d-2640-fe0f-200d-27a1-fe0f", v: ["1f9ce-1f3fb-200d-2640-fe0f-200d-27a1-fe0f", "1f9ce-1f3fc-200d-2640-fe0f-200d-27a1-fe0f", "1f9ce-1f3fd-200d-2640-fe0f-200d-27a1-fe0f", "1f9ce-1f3fe-200d-2640-fe0f-200d-27a1-fe0f", "1f9ce-1f3ff-200d-2640-fe0f-200d-27a1-fe0f"], a: "15.1" }, { n: ["man", "kneeling", "man kneeling facing right"], u: "1f9ce-200d-2642-fe0f-200d-27a1-fe0f", v: ["1f9ce-1f3fb-200d-2642-fe0f-200d-27a1-fe0f", "1f9ce-1f3fc-200d-2642-fe0f-200d-27a1-fe0f", "1f9ce-1f3fd-200d-2642-fe0f-200d-27a1-fe0f", "1f9ce-1f3fe-200d-2642-fe0f-200d-27a1-fe0f", "1f9ce-1f3ff-200d-2642-fe0f-200d-27a1-fe0f"], a: "15.1" }, { n: ["blind", "accessibility", "person with white cane"], u: "1f9d1-200d-1f9af", v: ["1f9d1-1f3fb-200d-1f9af", "1f9d1-1f3fc-200d-1f9af", "1f9d1-1f3fd-200d-1f9af", "1f9d1-1f3fe-200d-1f9af", "1f9d1-1f3ff-200d-1f9af"], a: "12.1" }, { n: ["blind", "accessibility", "person with white cane", "person with white cane facing right"], u: "1f9d1-200d-1f9af-200d-27a1-fe0f", v: ["1f9d1-1f3fb-200d-1f9af-200d-27a1-fe0f", "1f9d1-1f3fc-200d-1f9af-200d-27a1-fe0f", "1f9d1-1f3fd-200d-1f9af-200d-27a1-fe0f", "1f9d1-1f3fe-200d-1f9af-200d-27a1-fe0f", "1f9d1-1f3ff-200d-1f9af-200d-27a1-fe0f"], a: "15.1" }, { n: ["man", "blind", "accessibility", "man with white cane"], u: "1f468-200d-1f9af", v: ["1f468-1f3fb-200d-1f9af", "1f468-1f3fc-200d-1f9af", "1f468-1f3fd-200d-1f9af", "1f468-1f3fe-200d-1f9af", "1f468-1f3ff-200d-1f9af"], a: "12" }, { n: ["man", "blind", "accessibility", "man with white cane", "man with white cane facing right"], u: "1f468-200d-1f9af-200d-27a1-fe0f", v: ["1f468-1f3fb-200d-1f9af-200d-27a1-fe0f", "1f468-1f3fc-200d-1f9af-200d-27a1-fe0f", "1f468-1f3fd-200d-1f9af-200d-27a1-fe0f", "1f468-1f3fe-200d-1f9af-200d-27a1-fe0f", "1f468-1f3ff-200d-1f9af-200d-27a1-fe0f"], a: "15.1" }, { n: ["blind", "woman", "accessibility", "woman with white cane"], u: "1f469-200d-1f9af", v: ["1f469-1f3fb-200d-1f9af", "1f469-1f3fc-200d-1f9af", "1f469-1f3fd-200d-1f9af", "1f469-1f3fe-200d-1f9af", "1f469-1f3ff-200d-1f9af"], a: "12" }, { n: ["blind", "woman", "accessibility", "woman with white cane", "woman with white cane facing right"], u: "1f469-200d-1f9af-200d-27a1-fe0f", v: ["1f469-1f3fb-200d-1f9af-200d-27a1-fe0f", "1f469-1f3fc-200d-1f9af-200d-27a1-fe0f", "1f469-1f3fd-200d-1f9af-200d-27a1-fe0f", "1f469-1f3fe-200d-1f9af-200d-27a1-fe0f", "1f469-1f3ff-200d-1f9af-200d-27a1-fe0f"], a: "15.1" }, { n: ["wheelchair", "accessibility", "person in motorized wheelchair"], u: "1f9d1-200d-1f9bc", v: ["1f9d1-1f3fb-200d-1f9bc", "1f9d1-1f3fc-200d-1f9bc", "1f9d1-1f3fd-200d-1f9bc", "1f9d1-1f3fe-200d-1f9bc", "1f9d1-1f3ff-200d-1f9bc"], a: "12.1" }, { n: ["wheelchair", "accessibility", "person in motorized wheelchair", "person in motorized wheelchair facing right"], u: "1f9d1-200d-1f9bc-200d-27a1-fe0f", v: ["1f9d1-1f3fb-200d-1f9bc-200d-27a1-fe0f", "1f9d1-1f3fc-200d-1f9bc-200d-27a1-fe0f", "1f9d1-1f3fd-200d-1f9bc-200d-27a1-fe0f", "1f9d1-1f3fe-200d-1f9bc-200d-27a1-fe0f", "1f9d1-1f3ff-200d-1f9bc-200d-27a1-fe0f"], a: "15.1" }, { n: ["man", "wheelchair", "accessibility", "man in motorized wheelchair"], u: "1f468-200d-1f9bc", v: ["1f468-1f3fb-200d-1f9bc", "1f468-1f3fc-200d-1f9bc", "1f468-1f3fd-200d-1f9bc", "1f468-1f3fe-200d-1f9bc", "1f468-1f3ff-200d-1f9bc"], a: "12" }, { n: ["man", "wheelchair", "accessibility", "man in motorized wheelchair", "man in motorized wheelchair facing right"], u: "1f468-200d-1f9bc-200d-27a1-fe0f", v: ["1f468-1f3fb-200d-1f9bc-200d-27a1-fe0f", "1f468-1f3fc-200d-1f9bc-200d-27a1-fe0f", "1f468-1f3fd-200d-1f9bc-200d-27a1-fe0f", "1f468-1f3fe-200d-1f9bc-200d-27a1-fe0f", "1f468-1f3ff-200d-1f9bc-200d-27a1-fe0f"], a: "15.1" }, { n: ["woman", "wheelchair", "accessibility", "woman in motorized wheelchair"], u: "1f469-200d-1f9bc", v: ["1f469-1f3fb-200d-1f9bc", "1f469-1f3fc-200d-1f9bc", "1f469-1f3fd-200d-1f9bc", "1f469-1f3fe-200d-1f9bc", "1f469-1f3ff-200d-1f9bc"], a: "12" }, { n: ["woman", "wheelchair", "accessibility", "woman in motorized wheelchair", "woman in motorized wheelchair facing right"], u: "1f469-200d-1f9bc-200d-27a1-fe0f", v: ["1f469-1f3fb-200d-1f9bc-200d-27a1-fe0f", "1f469-1f3fc-200d-1f9bc-200d-27a1-fe0f", "1f469-1f3fd-200d-1f9bc-200d-27a1-fe0f", "1f469-1f3fe-200d-1f9bc-200d-27a1-fe0f", "1f469-1f3ff-200d-1f9bc-200d-27a1-fe0f"], a: "15.1" }, { n: ["wheelchair", "accessibility", "person in manual wheelchair"], u: "1f9d1-200d-1f9bd", v: ["1f9d1-1f3fb-200d-1f9bd", "1f9d1-1f3fc-200d-1f9bd", "1f9d1-1f3fd-200d-1f9bd", "1f9d1-1f3fe-200d-1f9bd", "1f9d1-1f3ff-200d-1f9bd"], a: "12.1" }, { n: ["wheelchair", "accessibility", "person in manual wheelchair", "person in manual wheelchair facing right"], u: "1f9d1-200d-1f9bd-200d-27a1-fe0f", v: ["1f9d1-1f3fb-200d-1f9bd-200d-27a1-fe0f", "1f9d1-1f3fc-200d-1f9bd-200d-27a1-fe0f", "1f9d1-1f3fd-200d-1f9bd-200d-27a1-fe0f", "1f9d1-1f3fe-200d-1f9bd-200d-27a1-fe0f", "1f9d1-1f3ff-200d-1f9bd-200d-27a1-fe0f"], a: "15.1" }, { n: ["man", "wheelchair", "accessibility", "man in manual wheelchair"], u: "1f468-200d-1f9bd", v: ["1f468-1f3fb-200d-1f9bd", "1f468-1f3fc-200d-1f9bd", "1f468-1f3fd-200d-1f9bd", "1f468-1f3fe-200d-1f9bd", "1f468-1f3ff-200d-1f9bd"], a: "12" }, { n: ["man", "wheelchair", "accessibility", "man in manual wheelchair", "man in manual wheelchair facing right"], u: "1f468-200d-1f9bd-200d-27a1-fe0f", v: ["1f468-1f3fb-200d-1f9bd-200d-27a1-fe0f", "1f468-1f3fc-200d-1f9bd-200d-27a1-fe0f", "1f468-1f3fd-200d-1f9bd-200d-27a1-fe0f", "1f468-1f3fe-200d-1f9bd-200d-27a1-fe0f", "1f468-1f3ff-200d-1f9bd-200d-27a1-fe0f"], a: "15.1" }, { n: ["woman", "wheelchair", "accessibility", "woman in manual wheelchair"], u: "1f469-200d-1f9bd", v: ["1f469-1f3fb-200d-1f9bd", "1f469-1f3fc-200d-1f9bd", "1f469-1f3fd-200d-1f9bd", "1f469-1f3fe-200d-1f9bd", "1f469-1f3ff-200d-1f9bd"], a: "12" }, { n: ["woman", "wheelchair", "accessibility", "woman in manual wheelchair", "woman in manual wheelchair facing right"], u: "1f469-200d-1f9bd-200d-27a1-fe0f", v: ["1f469-1f3fb-200d-1f9bd-200d-27a1-fe0f", "1f469-1f3fc-200d-1f9bd-200d-27a1-fe0f", "1f469-1f3fd-200d-1f9bd-200d-27a1-fe0f", "1f469-1f3fe-200d-1f9bd-200d-27a1-fe0f", "1f469-1f3ff-200d-1f9bd-200d-27a1-fe0f"], a: "15.1" }, { n: ["running", "marathon", "person running"], u: "1f3c3", v: ["1f3c3-1f3fb", "1f3c3-1f3fc", "1f3c3-1f3fd", "1f3c3-1f3fe", "1f3c3-1f3ff"], a: "0.6" }, { n: ["man", "racing", "running", "marathon", "man running"], u: "1f3c3-200d-2642-fe0f", v: ["1f3c3-1f3fb-200d-2642-fe0f", "1f3c3-1f3fc-200d-2642-fe0f", "1f3c3-1f3fd-200d-2642-fe0f", "1f3c3-1f3fe-200d-2642-fe0f", "1f3c3-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["woman", "racing", "running", "marathon", "woman running"], u: "1f3c3-200d-2640-fe0f", v: ["1f3c3-1f3fb-200d-2640-fe0f", "1f3c3-1f3fc-200d-2640-fe0f", "1f3c3-1f3fd-200d-2640-fe0f", "1f3c3-1f3fe-200d-2640-fe0f", "1f3c3-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["running", "marathon", "person running", "person running facing right"], u: "1f3c3-200d-27a1-fe0f", v: ["1f3c3-1f3fb-200d-27a1-fe0f", "1f3c3-1f3fc-200d-27a1-fe0f", "1f3c3-1f3fd-200d-27a1-fe0f", "1f3c3-1f3fe-200d-27a1-fe0f", "1f3c3-1f3ff-200d-27a1-fe0f"], a: "15.1" }, { n: ["woman", "racing", "running", "marathon", "woman running facing right"], u: "1f3c3-200d-2640-fe0f-200d-27a1-fe0f", v: ["1f3c3-1f3fb-200d-2640-fe0f-200d-27a1-fe0f", "1f3c3-1f3fc-200d-2640-fe0f-200d-27a1-fe0f", "1f3c3-1f3fd-200d-2640-fe0f-200d-27a1-fe0f", "1f3c3-1f3fe-200d-2640-fe0f-200d-27a1-fe0f", "1f3c3-1f3ff-200d-2640-fe0f-200d-27a1-fe0f"], a: "15.1" }, { n: ["man", "racing", "running", "marathon", "man running facing right"], u: "1f3c3-200d-2642-fe0f-200d-27a1-fe0f", v: ["1f3c3-1f3fb-200d-2642-fe0f-200d-27a1-fe0f", "1f3c3-1f3fc-200d-2642-fe0f-200d-27a1-fe0f", "1f3c3-1f3fd-200d-2642-fe0f-200d-27a1-fe0f", "1f3c3-1f3fe-200d-2642-fe0f-200d-27a1-fe0f", "1f3c3-1f3ff-200d-2642-fe0f-200d-27a1-fe0f"], a: "15.1" }, { n: ["dance", "woman", "dancing", "woman dancing"], u: "1f483", v: ["1f483-1f3fb", "1f483-1f3fc", "1f483-1f3fd", "1f483-1f3fe", "1f483-1f3ff"], a: "0.6" }, { n: ["man", "dance", "dancing", "man dancing"], u: "1f57a", v: ["1f57a-1f3fb", "1f57a-1f3fc", "1f57a-1f3fd", "1f57a-1f3fe", "1f57a-1f3ff"], a: "3" }, { n: ["suit", "person", "business", "person in suit levitating"], u: "1f574-fe0f", v: ["1f574-1f3fb", "1f574-1f3fc", "1f574-1f3fd", "1f574-1f3fe", "1f574-1f3ff"], a: "0.7" }, { n: ["dancer", "partying", "bunny ear", "people with bunny ears"], u: "1f46f", a: "0.6" }, { n: ["men", "dancer", "partying", "bunny ear", "men with bunny ears"], u: "1f46f-200d-2642-fe0f", a: "4" }, { n: ["women", "dancer", "partying", "bunny ear", "women with bunny ears"], u: "1f46f-200d-2640-fe0f", a: "4" }, { n: ["sauna", "steam room", "person in steamy room"], u: "1f9d6", v: ["1f9d6-1f3fb", "1f9d6-1f3fc", "1f9d6-1f3fd", "1f9d6-1f3fe", "1f9d6-1f3ff"], a: "5" }, { n: ["sauna", "steam room", "man in steamy room"], u: "1f9d6-200d-2642-fe0f", v: ["1f9d6-1f3fb-200d-2642-fe0f", "1f9d6-1f3fc-200d-2642-fe0f", "1f9d6-1f3fd-200d-2642-fe0f", "1f9d6-1f3fe-200d-2642-fe0f", "1f9d6-1f3ff-200d-2642-fe0f"], a: "5" }, { n: ["sauna", "steam room", "woman in steamy room"], u: "1f9d6-200d-2640-fe0f", v: ["1f9d6-1f3fb-200d-2640-fe0f", "1f9d6-1f3fc-200d-2640-fe0f", "1f9d6-1f3fd-200d-2640-fe0f", "1f9d6-1f3fe-200d-2640-fe0f", "1f9d6-1f3ff-200d-2640-fe0f"], a: "5" }, { n: ["climber", "person climbing"], u: "1f9d7", v: ["1f9d7-1f3fb", "1f9d7-1f3fc", "1f9d7-1f3fd", "1f9d7-1f3fe", "1f9d7-1f3ff"], a: "5" }, { n: ["climber", "man climbing"], u: "1f9d7-200d-2642-fe0f", v: ["1f9d7-1f3fb-200d-2642-fe0f", "1f9d7-1f3fc-200d-2642-fe0f", "1f9d7-1f3fd-200d-2642-fe0f", "1f9d7-1f3fe-200d-2642-fe0f", "1f9d7-1f3ff-200d-2642-fe0f"], a: "5" }, { n: ["climber", "woman climbing"], u: "1f9d7-200d-2640-fe0f", v: ["1f9d7-1f3fb-200d-2640-fe0f", "1f9d7-1f3fc-200d-2640-fe0f", "1f9d7-1f3fd-200d-2640-fe0f", "1f9d7-1f3fe-200d-2640-fe0f", "1f9d7-1f3ff-200d-2640-fe0f"], a: "5" }, { n: ["sword", "fencer", "fencing", "person fencing"], u: "1f93a", a: "3" }, { n: ["horse", "jockey", "racing", "racehorse", "horse racing"], u: "1f3c7", v: ["1f3c7-1f3fb", "1f3c7-1f3fc", "1f3c7-1f3fd", "1f3c7-1f3fe", "1f3c7-1f3ff"], a: "1" }, { n: ["ski", "snow", "skier"], u: "26f7-fe0f", a: "0.7" }, { n: ["ski", "snow", "snowboard", "snowboarder"], u: "1f3c2", v: ["1f3c2-1f3fb", "1f3c2-1f3fc", "1f3c2-1f3fd", "1f3c2-1f3fe", "1f3c2-1f3ff"], a: "0.6" }, { n: ["ball", "golf", "person golfing"], u: "1f3cc-fe0f", v: ["1f3cc-1f3fb", "1f3cc-1f3fc", "1f3cc-1f3fd", "1f3cc-1f3fe", "1f3cc-1f3ff"], a: "0.7" }, { n: ["man", "golf", "man golfing"], u: "1f3cc-fe0f-200d-2642-fe0f", v: ["1f3cc-1f3fb-200d-2642-fe0f", "1f3cc-1f3fc-200d-2642-fe0f", "1f3cc-1f3fd-200d-2642-fe0f", "1f3cc-1f3fe-200d-2642-fe0f", "1f3cc-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["golf", "woman", "woman golfing"], u: "1f3cc-fe0f-200d-2640-fe0f", v: ["1f3cc-1f3fb-200d-2640-fe0f", "1f3cc-1f3fc-200d-2640-fe0f", "1f3cc-1f3fd-200d-2640-fe0f", "1f3cc-1f3fe-200d-2640-fe0f", "1f3cc-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["surfing", "person surfing"], u: "1f3c4", v: ["1f3c4-1f3fb", "1f3c4-1f3fc", "1f3c4-1f3fd", "1f3c4-1f3fe", "1f3c4-1f3ff"], a: "0.6" }, { n: ["man", "surfing", "man surfing"], u: "1f3c4-200d-2642-fe0f", v: ["1f3c4-1f3fb-200d-2642-fe0f", "1f3c4-1f3fc-200d-2642-fe0f", "1f3c4-1f3fd-200d-2642-fe0f", "1f3c4-1f3fe-200d-2642-fe0f", "1f3c4-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["woman", "surfing", "woman surfing"], u: "1f3c4-200d-2640-fe0f", v: ["1f3c4-1f3fb-200d-2640-fe0f", "1f3c4-1f3fc-200d-2640-fe0f", "1f3c4-1f3fd-200d-2640-fe0f", "1f3c4-1f3fe-200d-2640-fe0f", "1f3c4-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["boat", "rowboat", "person rowing boat"], u: "1f6a3", v: ["1f6a3-1f3fb", "1f6a3-1f3fc", "1f6a3-1f3fd", "1f6a3-1f3fe", "1f6a3-1f3ff"], a: "1" }, { n: ["man", "boat", "rowboat", "man rowing boat"], u: "1f6a3-200d-2642-fe0f", v: ["1f6a3-1f3fb-200d-2642-fe0f", "1f6a3-1f3fc-200d-2642-fe0f", "1f6a3-1f3fd-200d-2642-fe0f", "1f6a3-1f3fe-200d-2642-fe0f", "1f6a3-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["boat", "woman", "rowboat", "woman rowing boat"], u: "1f6a3-200d-2640-fe0f", v: ["1f6a3-1f3fb-200d-2640-fe0f", "1f6a3-1f3fc-200d-2640-fe0f", "1f6a3-1f3fd-200d-2640-fe0f", "1f6a3-1f3fe-200d-2640-fe0f", "1f6a3-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["swim", "person swimming"], u: "1f3ca", v: ["1f3ca-1f3fb", "1f3ca-1f3fc", "1f3ca-1f3fd", "1f3ca-1f3fe", "1f3ca-1f3ff"], a: "0.6" }, { n: ["man", "swim", "man swimming"], u: "1f3ca-200d-2642-fe0f", v: ["1f3ca-1f3fb-200d-2642-fe0f", "1f3ca-1f3fc-200d-2642-fe0f", "1f3ca-1f3fd-200d-2642-fe0f", "1f3ca-1f3fe-200d-2642-fe0f", "1f3ca-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["swim", "woman", "woman swimming"], u: "1f3ca-200d-2640-fe0f", v: ["1f3ca-1f3fb-200d-2640-fe0f", "1f3ca-1f3fc-200d-2640-fe0f", "1f3ca-1f3fd-200d-2640-fe0f", "1f3ca-1f3fe-200d-2640-fe0f", "1f3ca-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["ball", "person bouncing ball"], u: "26f9-fe0f", v: ["26f9-1f3fb", "26f9-1f3fc", "26f9-1f3fd", "26f9-1f3fe", "26f9-1f3ff"], a: "0.7" }, { n: ["man", "ball", "man bouncing ball"], u: "26f9-fe0f-200d-2642-fe0f", v: ["26f9-1f3fb-200d-2642-fe0f", "26f9-1f3fc-200d-2642-fe0f", "26f9-1f3fd-200d-2642-fe0f", "26f9-1f3fe-200d-2642-fe0f", "26f9-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["ball", "woman", "woman bouncing ball"], u: "26f9-fe0f-200d-2640-fe0f", v: ["26f9-1f3fb-200d-2640-fe0f", "26f9-1f3fc-200d-2640-fe0f", "26f9-1f3fd-200d-2640-fe0f", "26f9-1f3fe-200d-2640-fe0f", "26f9-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["lifter", "weight", "person lifting weights"], u: "1f3cb-fe0f", v: ["1f3cb-1f3fb", "1f3cb-1f3fc", "1f3cb-1f3fd", "1f3cb-1f3fe", "1f3cb-1f3ff"], a: "0.7" }, { n: ["man", "weight lifter", "man lifting weights"], u: "1f3cb-fe0f-200d-2642-fe0f", v: ["1f3cb-1f3fb-200d-2642-fe0f", "1f3cb-1f3fc-200d-2642-fe0f", "1f3cb-1f3fd-200d-2642-fe0f", "1f3cb-1f3fe-200d-2642-fe0f", "1f3cb-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["woman", "weight lifter", "woman lifting weights"], u: "1f3cb-fe0f-200d-2640-fe0f", v: ["1f3cb-1f3fb-200d-2640-fe0f", "1f3cb-1f3fc-200d-2640-fe0f", "1f3cb-1f3fd-200d-2640-fe0f", "1f3cb-1f3fe-200d-2640-fe0f", "1f3cb-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["biking", "bicycle", "cyclist", "person biking"], u: "1f6b4", v: ["1f6b4-1f3fb", "1f6b4-1f3fc", "1f6b4-1f3fd", "1f6b4-1f3fe", "1f6b4-1f3ff"], a: "1" }, { n: ["man", "biking", "bicycle", "cyclist", "man biking"], u: "1f6b4-200d-2642-fe0f", v: ["1f6b4-1f3fb-200d-2642-fe0f", "1f6b4-1f3fc-200d-2642-fe0f", "1f6b4-1f3fd-200d-2642-fe0f", "1f6b4-1f3fe-200d-2642-fe0f", "1f6b4-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["woman", "biking", "bicycle", "cyclist", "woman biking"], u: "1f6b4-200d-2640-fe0f", v: ["1f6b4-1f3fb-200d-2640-fe0f", "1f6b4-1f3fc-200d-2640-fe0f", "1f6b4-1f3fd-200d-2640-fe0f", "1f6b4-1f3fe-200d-2640-fe0f", "1f6b4-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["bike", "bicycle", "cyclist", "mountain", "bicyclist", "person mountain biking"], u: "1f6b5", v: ["1f6b5-1f3fb", "1f6b5-1f3fc", "1f6b5-1f3fd", "1f6b5-1f3fe", "1f6b5-1f3ff"], a: "1" }, { n: ["man", "bike", "bicycle", "cyclist", "mountain", "man mountain biking"], u: "1f6b5-200d-2642-fe0f", v: ["1f6b5-1f3fb-200d-2642-fe0f", "1f6b5-1f3fc-200d-2642-fe0f", "1f6b5-1f3fd-200d-2642-fe0f", "1f6b5-1f3fe-200d-2642-fe0f", "1f6b5-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["bike", "woman", "biking", "bicycle", "cyclist", "mountain", "woman mountain biking"], u: "1f6b5-200d-2640-fe0f", v: ["1f6b5-1f3fb-200d-2640-fe0f", "1f6b5-1f3fc-200d-2640-fe0f", "1f6b5-1f3fd-200d-2640-fe0f", "1f6b5-1f3fe-200d-2640-fe0f", "1f6b5-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["cartwheel", "gymnastics", "person cartwheeling"], u: "1f938", v: ["1f938-1f3fb", "1f938-1f3fc", "1f938-1f3fd", "1f938-1f3fe", "1f938-1f3ff"], a: "3" }, { n: ["man", "cartwheel", "gymnastics", "man cartwheeling"], u: "1f938-200d-2642-fe0f", v: ["1f938-1f3fb-200d-2642-fe0f", "1f938-1f3fc-200d-2642-fe0f", "1f938-1f3fd-200d-2642-fe0f", "1f938-1f3fe-200d-2642-fe0f", "1f938-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["woman", "cartwheel", "gymnastics", "woman cartwheeling"], u: "1f938-200d-2640-fe0f", v: ["1f938-1f3fb-200d-2640-fe0f", "1f938-1f3fc-200d-2640-fe0f", "1f938-1f3fd-200d-2640-fe0f", "1f938-1f3fe-200d-2640-fe0f", "1f938-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["wrestle", "wrestler", "people wrestling"], u: "1f93c", a: "3" }, { n: ["men", "wrestle", "men wrestling"], u: "1f93c-200d-2642-fe0f", a: "4" }, { n: ["women", "wrestle", "women wrestling"], u: "1f93c-200d-2640-fe0f", a: "4" }, { n: ["polo", "water", "person playing water polo"], u: "1f93d", v: ["1f93d-1f3fb", "1f93d-1f3fc", "1f93d-1f3fd", "1f93d-1f3fe", "1f93d-1f3ff"], a: "3" }, { n: ["man", "water polo", "man playing water polo"], u: "1f93d-200d-2642-fe0f", v: ["1f93d-1f3fb-200d-2642-fe0f", "1f93d-1f3fc-200d-2642-fe0f", "1f93d-1f3fd-200d-2642-fe0f", "1f93d-1f3fe-200d-2642-fe0f", "1f93d-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["woman", "water polo", "woman playing water polo"], u: "1f93d-200d-2640-fe0f", v: ["1f93d-1f3fb-200d-2640-fe0f", "1f93d-1f3fc-200d-2640-fe0f", "1f93d-1f3fd-200d-2640-fe0f", "1f93d-1f3fe-200d-2640-fe0f", "1f93d-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["ball", "handball", "person playing handball"], u: "1f93e", v: ["1f93e-1f3fb", "1f93e-1f3fc", "1f93e-1f3fd", "1f93e-1f3fe", "1f93e-1f3ff"], a: "3" }, { n: ["man", "handball", "man playing handball"], u: "1f93e-200d-2642-fe0f", v: ["1f93e-1f3fb-200d-2642-fe0f", "1f93e-1f3fc-200d-2642-fe0f", "1f93e-1f3fd-200d-2642-fe0f", "1f93e-1f3fe-200d-2642-fe0f", "1f93e-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["woman", "handball", "woman playing handball"], u: "1f93e-200d-2640-fe0f", v: ["1f93e-1f3fb-200d-2640-fe0f", "1f93e-1f3fc-200d-2640-fe0f", "1f93e-1f3fd-200d-2640-fe0f", "1f93e-1f3fe-200d-2640-fe0f", "1f93e-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["skill", "juggle", "balance", "multitask", "person juggling"], u: "1f939", v: ["1f939-1f3fb", "1f939-1f3fc", "1f939-1f3fd", "1f939-1f3fe", "1f939-1f3ff"], a: "3" }, { n: ["man", "juggling", "multitask", "man juggling"], u: "1f939-200d-2642-fe0f", v: ["1f939-1f3fb-200d-2642-fe0f", "1f939-1f3fc-200d-2642-fe0f", "1f939-1f3fd-200d-2642-fe0f", "1f939-1f3fe-200d-2642-fe0f", "1f939-1f3ff-200d-2642-fe0f"], a: "4" }, { n: ["woman", "juggling", "multitask", "woman juggling"], u: "1f939-200d-2640-fe0f", v: ["1f939-1f3fb-200d-2640-fe0f", "1f939-1f3fc-200d-2640-fe0f", "1f939-1f3fd-200d-2640-fe0f", "1f939-1f3fe-200d-2640-fe0f", "1f939-1f3ff-200d-2640-fe0f"], a: "4" }, { n: ["yoga", "meditation", "person in lotus position"], u: "1f9d8", v: ["1f9d8-1f3fb", "1f9d8-1f3fc", "1f9d8-1f3fd", "1f9d8-1f3fe", "1f9d8-1f3ff"], a: "5" }, { n: ["yoga", "meditation", "man in lotus position"], u: "1f9d8-200d-2642-fe0f", v: ["1f9d8-1f3fb-200d-2642-fe0f", "1f9d8-1f3fc-200d-2642-fe0f", "1f9d8-1f3fd-200d-2642-fe0f", "1f9d8-1f3fe-200d-2642-fe0f", "1f9d8-1f3ff-200d-2642-fe0f"], a: "5" }, { n: ["yoga", "meditation", "woman in lotus position"], u: "1f9d8-200d-2640-fe0f", v: ["1f9d8-1f3fb-200d-2640-fe0f", "1f9d8-1f3fc-200d-2640-fe0f", "1f9d8-1f3fd-200d-2640-fe0f", "1f9d8-1f3fe-200d-2640-fe0f", "1f9d8-1f3ff-200d-2640-fe0f"], a: "5" }, { n: ["bath", "bathtub", "person taking bath"], u: "1f6c0", v: ["1f6c0-1f3fb", "1f6c0-1f3fc", "1f6c0-1f3fd", "1f6c0-1f3fe", "1f6c0-1f3ff"], a: "0.6" }, { n: ["hotel", "sleep", "good night", "person in bed"], u: "1f6cc", v: ["1f6cc-1f3fb", "1f6cc-1f3fc", "1f6cc-1f3fd", "1f6cc-1f3fe", "1f6cc-1f3ff"], a: "1" }, { n: ["hand", "hold", "couple", "person", "holding hands", "people holding hands"], u: "1f9d1-200d-1f91d-200d-1f9d1", v: ["1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fb", "1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fc", "1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fd", "1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fe", "1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3ff", "1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3fb", "1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3fc", "1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3fd", "1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3fe", "1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3ff", "1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3fb", "1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3fc", "1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3fd", "1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3fe", "1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3ff", "1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3fb", "1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3fc", "1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3fd", "1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3fe", "1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3ff", "1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3fb", "1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3fc", "1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3fd", "1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3fe", "1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3ff"], a: "12" }, { n: ["hand", "women", "couple", "holding hands", "women holding hands"], u: "1f46d", v: ["1f46d-1f3fb", "1f46d-1f3fc", "1f46d-1f3fd", "1f46d-1f3fe", "1f46d-1f3ff", "1f469-1f3fb-200d-1f91d-200d-1f469-1f3fc", "1f469-1f3fb-200d-1f91d-200d-1f469-1f3fd", "1f469-1f3fb-200d-1f91d-200d-1f469-1f3fe", "1f469-1f3fb-200d-1f91d-200d-1f469-1f3ff", "1f469-1f3fc-200d-1f91d-200d-1f469-1f3fb", "1f469-1f3fc-200d-1f91d-200d-1f469-1f3fd", "1f469-1f3fc-200d-1f91d-200d-1f469-1f3fe", "1f469-1f3fc-200d-1f91d-200d-1f469-1f3ff", "1f469-1f3fd-200d-1f91d-200d-1f469-1f3fb", "1f469-1f3fd-200d-1f91d-200d-1f469-1f3fc", "1f469-1f3fd-200d-1f91d-200d-1f469-1f3fe", "1f469-1f3fd-200d-1f91d-200d-1f469-1f3ff", "1f469-1f3fe-200d-1f91d-200d-1f469-1f3fb", "1f469-1f3fe-200d-1f91d-200d-1f469-1f3fc", "1f469-1f3fe-200d-1f91d-200d-1f469-1f3fd", "1f469-1f3fe-200d-1f91d-200d-1f469-1f3ff", "1f469-1f3ff-200d-1f91d-200d-1f469-1f3fb", "1f469-1f3ff-200d-1f91d-200d-1f469-1f3fc", "1f469-1f3ff-200d-1f91d-200d-1f469-1f3fd", "1f469-1f3ff-200d-1f91d-200d-1f469-1f3fe"], a: "1" }, { n: ["man", "hand", "hold", "woman", "couple", "holding hands", "woman and man holding hands"], u: "1f46b", v: ["1f46b-1f3fb", "1f46b-1f3fc", "1f46b-1f3fd", "1f46b-1f3fe", "1f46b-1f3ff", "1f469-1f3fb-200d-1f91d-200d-1f468-1f3fc", "1f469-1f3fb-200d-1f91d-200d-1f468-1f3fd", "1f469-1f3fb-200d-1f91d-200d-1f468-1f3fe", "1f469-1f3fb-200d-1f91d-200d-1f468-1f3ff", "1f469-1f3fc-200d-1f91d-200d-1f468-1f3fb", "1f469-1f3fc-200d-1f91d-200d-1f468-1f3fd", "1f469-1f3fc-200d-1f91d-200d-1f468-1f3fe", "1f469-1f3fc-200d-1f91d-200d-1f468-1f3ff", "1f469-1f3fd-200d-1f91d-200d-1f468-1f3fb", "1f469-1f3fd-200d-1f91d-200d-1f468-1f3fc", "1f469-1f3fd-200d-1f91d-200d-1f468-1f3fe", "1f469-1f3fd-200d-1f91d-200d-1f468-1f3ff", "1f469-1f3fe-200d-1f91d-200d-1f468-1f3fb", "1f469-1f3fe-200d-1f91d-200d-1f468-1f3fc", "1f469-1f3fe-200d-1f91d-200d-1f468-1f3fd", "1f469-1f3fe-200d-1f91d-200d-1f468-1f3ff", "1f469-1f3ff-200d-1f91d-200d-1f468-1f3fb", "1f469-1f3ff-200d-1f91d-200d-1f468-1f3fc", "1f469-1f3ff-200d-1f91d-200d-1f468-1f3fd", "1f469-1f3ff-200d-1f91d-200d-1f468-1f3fe"], a: "0.6" }, { n: ["man", "men", "twins", "couple", "gemini", "zodiac", "holding hands", "men holding hands"], u: "1f46c", v: ["1f46c-1f3fb", "1f46c-1f3fc", "1f46c-1f3fd", "1f46c-1f3fe", "1f46c-1f3ff", "1f468-1f3fb-200d-1f91d-200d-1f468-1f3fc", "1f468-1f3fb-200d-1f91d-200d-1f468-1f3fd", "1f468-1f3fb-200d-1f91d-200d-1f468-1f3fe", "1f468-1f3fb-200d-1f91d-200d-1f468-1f3ff", "1f468-1f3fc-200d-1f91d-200d-1f468-1f3fb", "1f468-1f3fc-200d-1f91d-200d-1f468-1f3fd", "1f468-1f3fc-200d-1f91d-200d-1f468-1f3fe", "1f468-1f3fc-200d-1f91d-200d-1f468-1f3ff", "1f468-1f3fd-200d-1f91d-200d-1f468-1f3fb", "1f468-1f3fd-200d-1f91d-200d-1f468-1f3fc", "1f468-1f3fd-200d-1f91d-200d-1f468-1f3fe", "1f468-1f3fd-200d-1f91d-200d-1f468-1f3ff", "1f468-1f3fe-200d-1f91d-200d-1f468-1f3fb", "1f468-1f3fe-200d-1f91d-200d-1f468-1f3fc", "1f468-1f3fe-200d-1f91d-200d-1f468-1f3fd", "1f468-1f3fe-200d-1f91d-200d-1f468-1f3ff", "1f468-1f3ff-200d-1f91d-200d-1f468-1f3fb", "1f468-1f3ff-200d-1f91d-200d-1f468-1f3fc", "1f468-1f3ff-200d-1f91d-200d-1f468-1f3fd", "1f468-1f3ff-200d-1f91d-200d-1f468-1f3fe"], a: "1" }, { n: ["kiss", "couple"], u: "1f48f", v: ["1f48f-1f3fb", "1f48f-1f3fc", "1f48f-1f3fd", "1f48f-1f3fe", "1f48f-1f3ff", "1f9d1-1f3fb-200d-2764-fe0f-200d-1f48b-200d-1f9d1-1f3fc", "1f9d1-1f3fb-200d-2764-fe0f-200d-1f48b-200d-1f9d1-1f3fd", "1f9d1-1f3fb-200d-2764-fe0f-200d-1f48b-200d-1f9d1-1f3fe", "1f9d1-1f3fb-200d-2764-fe0f-200d-1f48b-200d-1f9d1-1f3ff", "1f9d1-1f3fc-200d-2764-fe0f-200d-1f48b-200d-1f9d1-1f3fb", "1f9d1-1f3fc-200d-2764-fe0f-200d-1f48b-200d-1f9d1-1f3fd", "1f9d1-1f3fc-200d-2764-fe0f-200d-1f48b-200d-1f9d1-1f3fe", "1f9d1-1f3fc-200d-2764-fe0f-200d-1f48b-200d-1f9d1-1f3ff", "1f9d1-1f3fd-200d-2764-fe0f-200d-1f48b-200d-1f9d1-1f3fb", "1f9d1-1f3fd-200d-2764-fe0f-200d-1f48b-200d-1f9d1-1f3fc", "1f9d1-1f3fd-200d-2764-fe0f-200d-1f48b-200d-1f9d1-1f3fe", "1f9d1-1f3fd-200d-2764-fe0f-200d-1f48b-200d-1f9d1-1f3ff", "1f9d1-1f3fe-200d-2764-fe0f-200d-1f48b-200d-1f9d1-1f3fb", "1f9d1-1f3fe-200d-2764-fe0f-200d-1f48b-200d-1f9d1-1f3fc", "1f9d1-1f3fe-200d-2764-fe0f-200d-1f48b-200d-1f9d1-1f3fd", "1f9d1-1f3fe-200d-2764-fe0f-200d-1f48b-200d-1f9d1-1f3ff", "1f9d1-1f3ff-200d-2764-fe0f-200d-1f48b-200d-1f9d1-1f3fb", "1f9d1-1f3ff-200d-2764-fe0f-200d-1f48b-200d-1f9d1-1f3fc", "1f9d1-1f3ff-200d-2764-fe0f-200d-1f48b-200d-1f9d1-1f3fd", "1f9d1-1f3ff-200d-2764-fe0f-200d-1f48b-200d-1f9d1-1f3fe"], a: "0.6" }, { n: ["man", "kiss", "woman", "couple", "kiss: woman, man"], u: "1f469-200d-2764-fe0f-200d-1f48b-200d-1f468", v: ["1f469-1f3fb-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fb", "1f469-1f3fb-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fc", "1f469-1f3fb-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fd", "1f469-1f3fb-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fe", "1f469-1f3fb-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3ff", "1f469-1f3fc-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fb", "1f469-1f3fc-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fc", "1f469-1f3fc-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fd", "1f469-1f3fc-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fe", "1f469-1f3fc-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3ff", "1f469-1f3fd-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fb", "1f469-1f3fd-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fc", "1f469-1f3fd-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fd", "1f469-1f3fd-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fe", "1f469-1f3fd-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3ff", "1f469-1f3fe-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fb", "1f469-1f3fe-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fc", "1f469-1f3fe-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fd", "1f469-1f3fe-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fe", "1f469-1f3fe-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3ff", "1f469-1f3ff-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fb", "1f469-1f3ff-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fc", "1f469-1f3ff-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fd", "1f469-1f3ff-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fe", "1f469-1f3ff-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3ff"], a: "2" }, { n: ["man", "kiss", "couple", "kiss: man, man"], u: "1f468-200d-2764-fe0f-200d-1f48b-200d-1f468", v: ["1f468-1f3fb-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fb", "1f468-1f3fb-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fc", "1f468-1f3fb-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fd", "1f468-1f3fb-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fe", "1f468-1f3fb-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3ff", "1f468-1f3fc-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fb", "1f468-1f3fc-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fc", "1f468-1f3fc-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fd", "1f468-1f3fc-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fe", "1f468-1f3fc-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3ff", "1f468-1f3fd-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fb", "1f468-1f3fd-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fc", "1f468-1f3fd-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fd", "1f468-1f3fd-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fe", "1f468-1f3fd-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3ff", "1f468-1f3fe-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fb", "1f468-1f3fe-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fc", "1f468-1f3fe-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fd", "1f468-1f3fe-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fe", "1f468-1f3fe-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3ff", "1f468-1f3ff-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fb", "1f468-1f3ff-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fc", "1f468-1f3ff-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fd", "1f468-1f3ff-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3fe", "1f468-1f3ff-200d-2764-fe0f-200d-1f48b-200d-1f468-1f3ff"], a: "2" }, { n: ["kiss", "woman", "couple", "kiss: woman, woman"], u: "1f469-200d-2764-fe0f-200d-1f48b-200d-1f469", v: ["1f469-1f3fb-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3fb", "1f469-1f3fb-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3fc", "1f469-1f3fb-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3fd", "1f469-1f3fb-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3fe", "1f469-1f3fb-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3ff", "1f469-1f3fc-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3fb", "1f469-1f3fc-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3fc", "1f469-1f3fc-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3fd", "1f469-1f3fc-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3fe", "1f469-1f3fc-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3ff", "1f469-1f3fd-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3fb", "1f469-1f3fd-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3fc", "1f469-1f3fd-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3fd", "1f469-1f3fd-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3fe", "1f469-1f3fd-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3ff", "1f469-1f3fe-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3fb", "1f469-1f3fe-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3fc", "1f469-1f3fe-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3fd", "1f469-1f3fe-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3fe", "1f469-1f3fe-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3ff", "1f469-1f3ff-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3fb", "1f469-1f3ff-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3fc", "1f469-1f3ff-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3fd", "1f469-1f3ff-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3fe", "1f469-1f3ff-200d-2764-fe0f-200d-1f48b-200d-1f469-1f3ff"], a: "2" }, { n: ["love", "couple", "couple with heart"], u: "1f491", v: ["1f491-1f3fb", "1f491-1f3fc", "1f491-1f3fd", "1f491-1f3fe", "1f491-1f3ff", "1f9d1-1f3fb-200d-2764-fe0f-200d-1f9d1-1f3fc", "1f9d1-1f3fb-200d-2764-fe0f-200d-1f9d1-1f3fd", "1f9d1-1f3fb-200d-2764-fe0f-200d-1f9d1-1f3fe", "1f9d1-1f3fb-200d-2764-fe0f-200d-1f9d1-1f3ff", "1f9d1-1f3fc-200d-2764-fe0f-200d-1f9d1-1f3fb", "1f9d1-1f3fc-200d-2764-fe0f-200d-1f9d1-1f3fd", "1f9d1-1f3fc-200d-2764-fe0f-200d-1f9d1-1f3fe", "1f9d1-1f3fc-200d-2764-fe0f-200d-1f9d1-1f3ff", "1f9d1-1f3fd-200d-2764-fe0f-200d-1f9d1-1f3fb", "1f9d1-1f3fd-200d-2764-fe0f-200d-1f9d1-1f3fc", "1f9d1-1f3fd-200d-2764-fe0f-200d-1f9d1-1f3fe", "1f9d1-1f3fd-200d-2764-fe0f-200d-1f9d1-1f3ff", "1f9d1-1f3fe-200d-2764-fe0f-200d-1f9d1-1f3fb", "1f9d1-1f3fe-200d-2764-fe0f-200d-1f9d1-1f3fc", "1f9d1-1f3fe-200d-2764-fe0f-200d-1f9d1-1f3fd", "1f9d1-1f3fe-200d-2764-fe0f-200d-1f9d1-1f3ff", "1f9d1-1f3ff-200d-2764-fe0f-200d-1f9d1-1f3fb", "1f9d1-1f3ff-200d-2764-fe0f-200d-1f9d1-1f3fc", "1f9d1-1f3ff-200d-2764-fe0f-200d-1f9d1-1f3fd", "1f9d1-1f3ff-200d-2764-fe0f-200d-1f9d1-1f3fe"], a: "0.6" }, { n: ["man", "love", "woman", "couple", "couple with heart", "couple with heart: woman, man"], u: "1f469-200d-2764-fe0f-200d-1f468", v: ["1f469-1f3fb-200d-2764-fe0f-200d-1f468-1f3fb", "1f469-1f3fb-200d-2764-fe0f-200d-1f468-1f3fc", "1f469-1f3fb-200d-2764-fe0f-200d-1f468-1f3fd", "1f469-1f3fb-200d-2764-fe0f-200d-1f468-1f3fe", "1f469-1f3fb-200d-2764-fe0f-200d-1f468-1f3ff", "1f469-1f3fc-200d-2764-fe0f-200d-1f468-1f3fb", "1f469-1f3fc-200d-2764-fe0f-200d-1f468-1f3fc", "1f469-1f3fc-200d-2764-fe0f-200d-1f468-1f3fd", "1f469-1f3fc-200d-2764-fe0f-200d-1f468-1f3fe", "1f469-1f3fc-200d-2764-fe0f-200d-1f468-1f3ff", "1f469-1f3fd-200d-2764-fe0f-200d-1f468-1f3fb", "1f469-1f3fd-200d-2764-fe0f-200d-1f468-1f3fc", "1f469-1f3fd-200d-2764-fe0f-200d-1f468-1f3fd", "1f469-1f3fd-200d-2764-fe0f-200d-1f468-1f3fe", "1f469-1f3fd-200d-2764-fe0f-200d-1f468-1f3ff", "1f469-1f3fe-200d-2764-fe0f-200d-1f468-1f3fb", "1f469-1f3fe-200d-2764-fe0f-200d-1f468-1f3fc", "1f469-1f3fe-200d-2764-fe0f-200d-1f468-1f3fd", "1f469-1f3fe-200d-2764-fe0f-200d-1f468-1f3fe", "1f469-1f3fe-200d-2764-fe0f-200d-1f468-1f3ff", "1f469-1f3ff-200d-2764-fe0f-200d-1f468-1f3fb", "1f469-1f3ff-200d-2764-fe0f-200d-1f468-1f3fc", "1f469-1f3ff-200d-2764-fe0f-200d-1f468-1f3fd", "1f469-1f3ff-200d-2764-fe0f-200d-1f468-1f3fe", "1f469-1f3ff-200d-2764-fe0f-200d-1f468-1f3ff"], a: "2" }, { n: ["man", "love", "couple", "couple with heart", "couple with heart: man, man"], u: "1f468-200d-2764-fe0f-200d-1f468", v: ["1f468-1f3fb-200d-2764-fe0f-200d-1f468-1f3fb", "1f468-1f3fb-200d-2764-fe0f-200d-1f468-1f3fc", "1f468-1f3fb-200d-2764-fe0f-200d-1f468-1f3fd", "1f468-1f3fb-200d-2764-fe0f-200d-1f468-1f3fe", "1f468-1f3fb-200d-2764-fe0f-200d-1f468-1f3ff", "1f468-1f3fc-200d-2764-fe0f-200d-1f468-1f3fb", "1f468-1f3fc-200d-2764-fe0f-200d-1f468-1f3fc", "1f468-1f3fc-200d-2764-fe0f-200d-1f468-1f3fd", "1f468-1f3fc-200d-2764-fe0f-200d-1f468-1f3fe", "1f468-1f3fc-200d-2764-fe0f-200d-1f468-1f3ff", "1f468-1f3fd-200d-2764-fe0f-200d-1f468-1f3fb", "1f468-1f3fd-200d-2764-fe0f-200d-1f468-1f3fc", "1f468-1f3fd-200d-2764-fe0f-200d-1f468-1f3fd", "1f468-1f3fd-200d-2764-fe0f-200d-1f468-1f3fe", "1f468-1f3fd-200d-2764-fe0f-200d-1f468-1f3ff", "1f468-1f3fe-200d-2764-fe0f-200d-1f468-1f3fb", "1f468-1f3fe-200d-2764-fe0f-200d-1f468-1f3fc", "1f468-1f3fe-200d-2764-fe0f-200d-1f468-1f3fd", "1f468-1f3fe-200d-2764-fe0f-200d-1f468-1f3fe", "1f468-1f3fe-200d-2764-fe0f-200d-1f468-1f3ff", "1f468-1f3ff-200d-2764-fe0f-200d-1f468-1f3fb", "1f468-1f3ff-200d-2764-fe0f-200d-1f468-1f3fc", "1f468-1f3ff-200d-2764-fe0f-200d-1f468-1f3fd", "1f468-1f3ff-200d-2764-fe0f-200d-1f468-1f3fe", "1f468-1f3ff-200d-2764-fe0f-200d-1f468-1f3ff"], a: "2" }, { n: ["love", "woman", "couple", "couple with heart", "couple with heart: woman, woman"], u: "1f469-200d-2764-fe0f-200d-1f469", v: ["1f469-1f3fb-200d-2764-fe0f-200d-1f469-1f3fb", "1f469-1f3fb-200d-2764-fe0f-200d-1f469-1f3fc", "1f469-1f3fb-200d-2764-fe0f-200d-1f469-1f3fd", "1f469-1f3fb-200d-2764-fe0f-200d-1f469-1f3fe", "1f469-1f3fb-200d-2764-fe0f-200d-1f469-1f3ff", "1f469-1f3fc-200d-2764-fe0f-200d-1f469-1f3fb", "1f469-1f3fc-200d-2764-fe0f-200d-1f469-1f3fc", "1f469-1f3fc-200d-2764-fe0f-200d-1f469-1f3fd", "1f469-1f3fc-200d-2764-fe0f-200d-1f469-1f3fe", "1f469-1f3fc-200d-2764-fe0f-200d-1f469-1f3ff", "1f469-1f3fd-200d-2764-fe0f-200d-1f469-1f3fb", "1f469-1f3fd-200d-2764-fe0f-200d-1f469-1f3fc", "1f469-1f3fd-200d-2764-fe0f-200d-1f469-1f3fd", "1f469-1f3fd-200d-2764-fe0f-200d-1f469-1f3fe", "1f469-1f3fd-200d-2764-fe0f-200d-1f469-1f3ff", "1f469-1f3fe-200d-2764-fe0f-200d-1f469-1f3fb", "1f469-1f3fe-200d-2764-fe0f-200d-1f469-1f3fc", "1f469-1f3fe-200d-2764-fe0f-200d-1f469-1f3fd", "1f469-1f3fe-200d-2764-fe0f-200d-1f469-1f3fe", "1f469-1f3fe-200d-2764-fe0f-200d-1f469-1f3ff", "1f469-1f3ff-200d-2764-fe0f-200d-1f469-1f3fb", "1f469-1f3ff-200d-2764-fe0f-200d-1f469-1f3fc", "1f469-1f3ff-200d-2764-fe0f-200d-1f469-1f3fd", "1f469-1f3ff-200d-2764-fe0f-200d-1f469-1f3fe", "1f469-1f3ff-200d-2764-fe0f-200d-1f469-1f3ff"], a: "2" }, { n: ["boy", "man", "woman", "family", "family: man, woman, boy"], u: "1f468-200d-1f469-200d-1f466", a: "2" }, { n: ["man", "girl", "woman", "family", "family: man, woman, girl"], u: "1f468-200d-1f469-200d-1f467", a: "2" }, { n: ["boy", "man", "girl", "woman", "family", "family: man, woman, girl, boy"], u: "1f468-200d-1f469-200d-1f467-200d-1f466", a: "2" }, { n: ["boy", "man", "woman", "family", "family: man, woman, boy, boy"], u: "1f468-200d-1f469-200d-1f466-200d-1f466", a: "2" }, { n: ["man", "girl", "woman", "family", "family: man, woman, girl, girl"], u: "1f468-200d-1f469-200d-1f467-200d-1f467", a: "2" }, { n: ["boy", "man", "family", "family: man, man, boy"], u: "1f468-200d-1f468-200d-1f466", a: "2" }, { n: ["man", "girl", "family", "family: man, man, girl"], u: "1f468-200d-1f468-200d-1f467", a: "2" }, { n: ["boy", "man", "girl", "family", "family: man, man, girl, boy"], u: "1f468-200d-1f468-200d-1f467-200d-1f466", a: "2" }, { n: ["boy", "man", "family", "family: man, man, boy, boy"], u: "1f468-200d-1f468-200d-1f466-200d-1f466", a: "2" }, { n: ["man", "girl", "family", "family: man, man, girl, girl"], u: "1f468-200d-1f468-200d-1f467-200d-1f467", a: "2" }, { n: ["boy", "woman", "family", "family: woman, woman, boy"], u: "1f469-200d-1f469-200d-1f466", a: "2" }, { n: ["girl", "woman", "family", "family: woman, woman, girl"], u: "1f469-200d-1f469-200d-1f467", a: "2" }, { n: ["boy", "girl", "woman", "family", "family: woman, woman, girl, boy"], u: "1f469-200d-1f469-200d-1f467-200d-1f466", a: "2" }, { n: ["boy", "woman", "family", "family: woman, woman, boy, boy"], u: "1f469-200d-1f469-200d-1f466-200d-1f466", a: "2" }, { n: ["girl", "woman", "family", "family: woman, woman, girl, girl"], u: "1f469-200d-1f469-200d-1f467-200d-1f467", a: "2" }, { n: ["boy", "man", "family", "family: man, boy"], u: "1f468-200d-1f466", a: "4" }, { n: ["boy", "man", "family", "family: man, boy, boy"], u: "1f468-200d-1f466-200d-1f466", a: "4" }, { n: ["man", "girl", "family", "family: man, girl"], u: "1f468-200d-1f467", a: "4" }, { n: ["boy", "man", "girl", "family", "family: man, girl, boy"], u: "1f468-200d-1f467-200d-1f466", a: "4" }, { n: ["man", "girl", "family", "family: man, girl, girl"], u: "1f468-200d-1f467-200d-1f467", a: "4" }, { n: ["boy", "woman", "family", "family: woman, boy"], u: "1f469-200d-1f466", a: "4" }, { n: ["boy", "woman", "family", "family: woman, boy, boy"], u: "1f469-200d-1f466-200d-1f466", a: "4" }, { n: ["girl", "woman", "family", "family: woman, girl"], u: "1f469-200d-1f467", a: "4" }, { n: ["boy", "girl", "woman", "family", "family: woman, girl, boy"], u: "1f469-200d-1f467-200d-1f466", a: "4" }, { n: ["girl", "woman", "family", "family: woman, girl, girl"], u: "1f469-200d-1f467-200d-1f467", a: "4" }, { n: ["face", "head", "speak", "speaking", "silhouette", "speaking head"], u: "1f5e3-fe0f", a: "0.7" }, { n: ["bust", "silhouette", "bust in silhouette"], u: "1f464", a: "0.6" }, { n: ["bust", "silhouette", "busts in silhouette"], u: "1f465", a: "1" }, { n: ["hug", "hello", "thanks", "goodbye", "people hugging"], u: "1fac2", a: "13" }, { n: ["family"], u: "1f46a", a: "0.6" }, { n: ["family: adult, adult, child"], u: "1f9d1-200d-1f9d1-200d-1f9d2", a: "15.1" }, { n: ["family: adult, adult, child, child"], u: "1f9d1-200d-1f9d1-200d-1f9d2-200d-1f9d2", a: "15.1" }, { n: ["family: adult, child"], u: "1f9d1-200d-1f9d2", a: "15.1" }, { n: ["family: adult, child, child"], u: "1f9d1-200d-1f9d2-200d-1f9d2", a: "15.1" }, { n: ["print", "clothing", "footprint", "footprints"], u: "1f463", a: "0.6" }], animals_nature: [{ n: ["face", "monkey", "monkey face"], u: "1f435", a: "0.6" }, { n: ["monkey"], u: "1f412", a: "0.6" }, { n: ["gorilla"], u: "1f98d", a: "3" }, { n: ["ape", "orangutan"], u: "1f9a7", a: "12" }, { n: ["dog", "pet", "face", "dog face"], u: "1f436", a: "0.6" }, { n: ["dog", "pet"], u: "1f415", a: "0.7" }, { n: ["blind", "guide", "guide dog", "accessibility"], u: "1f9ae", a: "12" }, { n: ["dog", "service", "assistance", "service dog", "accessibility"], u: "1f415-200d-1f9ba", a: "12" }, { n: ["dog", "poodle"], u: "1f429", a: "0.6" }, { n: ["wolf", "face"], u: "1f43a", a: "0.6" }, { n: ["fox", "face"], u: "1f98a", a: "3" }, { n: ["sly", "raccoon", "curious"], u: "1f99d", a: "11" }, { n: ["cat", "pet", "face", "cat face"], u: "1f431", a: "0.6" }, { n: ["cat", "pet"], u: "1f408", a: "0.7" }, { n: ["cat", "black", "unlucky", "black cat"], u: "1f408-200d-2b1b", a: "13" }, { n: ["leo", "lion", "face", "zodiac"], u: "1f981", a: "1" }, { n: ["face", "tiger", "tiger face"], u: "1f42f", a: "0.6" }, { n: ["tiger"], u: "1f405", a: "1" }, { n: ["leopard"], u: "1f406", a: "1" }, { n: ["face", "horse", "horse face"], u: "1f434", a: "0.6" }, { n: ["elk", "moose", "animal", "mammal", "antlers"], u: "1face", a: "15" }, { n: ["ass", "mule", "burro", "donkey", "animal", "mammal", "stubborn"], u: "1facf", a: "15" }, { n: ["horse", "racing", "racehorse", "equestrian"], u: "1f40e", a: "0.6" }, { n: ["face", "unicorn"], u: "1f984", a: "1" }, { n: ["zebra", "stripe"], u: "1f993", a: "5" }, { n: ["deer"], u: "1f98c", a: "3" }, { n: ["herd", "bison", "wisent", "buffalo"], u: "1f9ac", a: "13" }, { n: ["cow", "face", "cow face"], u: "1f42e", a: "0.6" }, { n: ["ox", "bull", "taurus", "zodiac"], u: "1f402", a: "1" }, { n: ["water", "buffalo", "water buffalo"], u: "1f403", a: "1" }, { n: ["cow"], u: "1f404", a: "1" }, { n: ["pig", "face", "pig face"], u: "1f437", a: "0.6" }, { n: ["pig", "sow"], u: "1f416", a: "1" }, { n: ["pig", "boar"], u: "1f417", a: "0.6" }, { n: ["pig", "face", "nose", "pig nose"], u: "1f43d", a: "0.6" }, { n: ["ram", "male", "aries", "sheep", "zodiac"], u: "1f40f", a: "1" }, { n: ["ewe", "sheep", "female"], u: "1f411", a: "0.6" }, { n: ["goat", "zodiac", "capricorn"], u: "1f410", a: "1" }, { n: ["hump", "camel", "dromedary"], u: "1f42a", a: "1" }, { n: ["hump", "camel", "bactrian", "two hump camel"], u: "1f42b", a: "0.6" }, { n: ["wool", "llama", "alpaca", "vicu\xF1a", "guanaco"], u: "1f999", a: "11" }, { n: ["spots", "giraffe"], u: "1f992", a: "5" }, { n: ["elephant"], u: "1f418", a: "0.6" }, { n: ["tusk", "large", "woolly", "mammoth", "extinction"], u: "1f9a3", a: "13" }, { n: ["rhinoceros"], u: "1f98f", a: "3" }, { n: ["hippo", "hippopotamus"], u: "1f99b", a: "11" }, { n: ["face", "mouse", "mouse face"], u: "1f42d", a: "0.6" }, { n: ["mouse"], u: "1f401", a: "1" }, { n: ["rat"], u: "1f400", a: "1" }, { n: ["pet", "face", "hamster"], u: "1f439", a: "0.6" }, { n: ["pet", "face", "bunny", "rabbit", "rabbit face"], u: "1f430", a: "0.6" }, { n: ["pet", "bunny", "rabbit"], u: "1f407", a: "1" }, { n: ["chipmunk", "squirrel"], u: "1f43f-fe0f", a: "0.7" }, { n: ["dam", "beaver"], u: "1f9ab", a: "13" }, { n: ["spiny", "hedgehog"], u: "1f994", a: "5" }, { n: ["bat", "vampire"], u: "1f987", a: "3" }, { n: ["bear", "face"], u: "1f43b", a: "0.6" }, { n: ["bear", "white", "arctic", "polar bear"], u: "1f43b-200d-2744-fe0f", a: "13" }, { n: ["face", "koala", "marsupial"], u: "1f428", a: "0.6" }, { n: ["face", "panda"], u: "1f43c", a: "0.6" }, { n: ["lazy", "slow", "sloth"], u: "1f9a5", a: "12" }, { n: ["otter", "fishing", "playful"], u: "1f9a6", a: "12" }, { n: ["skunk", "stink"], u: "1f9a8", a: "12" }, { n: ["joey", "jump", "kangaroo", "marsupial"], u: "1f998", a: "11" }, { n: ["badger", "pester", "honey badger"], u: "1f9a1", a: "11" }, { n: ["paw", "feet", "print", "paw prints"], u: "1f43e", a: "0.6" }, { n: ["bird", "turkey"], u: "1f983", a: "1" }, { n: ["bird", "chicken"], u: "1f414", a: "0.6" }, { n: ["bird", "rooster"], u: "1f413", a: "1" }, { n: ["baby", "bird", "chick", "hatching", "hatching chick"], u: "1f423", a: "0.6" }, { n: ["baby", "bird", "chick", "baby chick"], u: "1f424", a: "0.6" }, { n: ["baby", "bird", "chick", "front facing baby chick"], u: "1f425", a: "0.6" }, { n: ["bird"], u: "1f426", a: "0.6" }, { n: ["bird", "penguin"], u: "1f427", a: "0.6" }, { n: ["fly", "dove", "bird", "peace"], u: "1f54a-fe0f", a: "0.7" }, { n: ["bird", "eagle"], u: "1f985", a: "3" }, { n: ["duck", "bird"], u: "1f986", a: "3" }, { n: ["swan", "bird", "cygnet", "ugly duckling"], u: "1f9a2", a: "11" }, { n: ["owl", "bird", "wise"], u: "1f989", a: "3" }, { n: ["dodo", "large", "mauritius", "extinction"], u: "1f9a4", a: "13" }, { n: ["bird", "light", "flight", "feather", "plumage"], u: "1fab6", a: "13" }, { n: ["flamingo", "tropical", "flamboyant"], u: "1f9a9", a: "12" }, { n: ["bird", "proud", "peahen", "peacock", "ostentatious"], u: "1f99a", a: "11" }, { n: ["bird", "talk", "parrot", "pirate"], u: "1f99c", a: "11" }, { n: ["wing", "bird", "flying", "angelic", "aviation", "mythology"], u: "1fabd", a: "15" }, { n: ["bird", "crow", "rook", "black", "raven", "black bird"], u: "1f426-200d-2b1b", a: "15" }, { n: ["bird", "fowl", "honk", "goose", "silly"], u: "1fabf", a: "15" }, { n: ["phoenix", "fantasy", "rebirth", "firebird", "reincarnation"], u: "1f426-200d-1f525", a: "15.1" }, { n: ["frog", "face"], u: "1f438", a: "0.6" }, { n: ["crocodile"], u: "1f40a", a: "1" }, { n: ["turtle", "terrapin", "tortoise"], u: "1f422", a: "0.6" }, { n: ["lizard", "reptile"], u: "1f98e", a: "3" }, { n: ["snake", "bearer", "zodiac", "serpent", "ophiuchus"], u: "1f40d", a: "0.6" }, { n: ["face", "dragon", "fairy tale", "dragon face"], u: "1f432", a: "0.6" }, { n: ["dragon", "fairy tale"], u: "1f409", a: "1" }, { n: ["sauropod", "diplodocus", "brontosaurus", "brachiosaurus"], u: "1f995", a: "5" }, { n: ["T Rex", "t rex", "tyrannosaurus rex"], u: "1f996", a: "5" }, { n: ["face", "whale", "spouting", "spouting whale"], u: "1f433", a: "0.6" }, { n: ["whale"], u: "1f40b", a: "1" }, { n: ["dolphin", "flipper"], u: "1f42c", a: "0.6" }, { n: ["seal", "sea lion"], u: "1f9ad", a: "13" }, { n: ["fish", "pisces", "zodiac"], u: "1f41f", a: "0.6" }, { n: ["fish", "tropical", "tropical fish"], u: "1f420", a: "0.6" }, { n: ["fish", "blowfish"], u: "1f421", a: "0.6" }, { n: ["fish", "shark"], u: "1f988", a: "3" }, { n: ["octopus"], u: "1f419", a: "0.6" }, { n: ["shell", "spiral", "spiral shell"], u: "1f41a", a: "0.6" }, { n: ["reef", "coral", "ocean"], u: "1fab8", a: "14" }, { n: ["burn", "ouch", "jelly", "marine", "stinger", "jellyfish", "invertebrate"], u: "1fabc", a: "15" }, { n: ["snail"], u: "1f40c", a: "0.6" }, { n: ["insect", "pretty", "butterfly"], u: "1f98b", a: "3" }, { n: ["bug", "insect"], u: "1f41b", a: "0.6" }, { n: ["ant", "insect"], u: "1f41c", a: "0.6" }, { n: ["bee", "insect", "honeybee"], u: "1f41d", a: "0.6" }, { n: ["bug", "beetle", "insect"], u: "1fab2", a: "13" }, { n: ["beetle", "insect", "ladybug", "ladybird", "lady beetle"], u: "1f41e", a: "0.6" }, { n: ["cricket", "grasshopper"], u: "1f997", a: "5" }, { n: ["pest", "roach", "insect", "cockroach"], u: "1fab3", a: "13" }, { n: ["spider", "insect"], u: "1f577-fe0f", a: "0.7" }, { n: ["web", "spider", "spider web"], u: "1f578-fe0f", a: "0.7" }, { n: ["zodiac", "scorpio", "scorpion"], u: "1f982", a: "1" }, { n: ["pest", "fever", "virus", "disease", "malaria", "mosquito"], u: "1f99f", a: "11" }, { n: ["fly", "pest", "maggot", "disease", "rotting"], u: "1fab0", a: "13" }, { n: ["worm", "annelid", "parasite", "earthworm"], u: "1fab1", a: "13" }, { n: ["virus", "amoeba", "microbe", "bacteria"], u: "1f9a0", a: "11" }, { n: ["flower", "bouquet"], u: "1f490", a: "0.6" }, { n: ["cherry", "flower", "blossom", "cherry blossom"], u: "1f338", a: "0.6" }, { n: ["flower", "white flower"], u: "1f4ae", a: "0.6" }, { n: ["lotus", "flower", "purity", "buddhism", "hinduism"], u: "1fab7", a: "14" }, { n: ["plant", "rosette"], u: "1f3f5-fe0f", a: "0.7" }, { n: ["rose", "flower"], u: "1f339", a: "0.6" }, { n: ["flower", "wilted", "wilted flower"], u: "1f940", a: "3" }, { n: ["flower", "hibiscus"], u: "1f33a", a: "0.6" }, { n: ["sun", "flower", "sunflower"], u: "1f33b", a: "0.6" }, { n: ["flower", "blossom"], u: "1f33c", a: "0.6" }, { n: ["tulip", "flower"], u: "1f337", a: "0.6" }, { n: ["flower", "lupine", "hyacinth", "lavender", "bluebonnet", "snapdragon"], u: "1fabb", a: "15" }, { n: ["young", "seedling"], u: "1f331", a: "0.6" }, { n: ["grow", "house", "plant", "boring", "useless", "nurturing", "potted plant"], u: "1fab4", a: "13" }, { n: ["tree", "evergreen tree"], u: "1f332", a: "1" }, { n: ["tree", "shedding", "deciduous", "deciduous tree"], u: "1f333", a: "1" }, { n: ["palm", "tree", "palm tree"], u: "1f334", a: "0.6" }, { n: ["plant", "cactus"], u: "1f335", a: "0.6" }, { n: ["ear", "rice", "grain", "sheaf of rice"], u: "1f33e", a: "0.6" }, { n: ["herb", "leaf"], u: "1f33f", a: "0.6" }, { n: ["plant", "shamrock"], u: "2618-fe0f", a: "1" }, { n: ["4", "four", "leaf", "clover", "four leaf clover"], u: "1f340", a: "0.6" }, { n: ["leaf", "maple", "falling", "maple leaf"], u: "1f341", a: "0.6" }, { n: ["leaf", "falling", "fallen leaf"], u: "1f342", a: "0.6" }, { n: ["blow", "leaf", "wind", "flutter", "leaf fluttering in wind"], u: "1f343", a: "0.6" }, { n: ["nesting", "empty nest"], u: "1fab9", a: "14" }, { n: ["nesting", "nest with eggs"], u: "1faba", a: "14" }, { n: ["mushroom", "toadstool"], u: "1f344", a: "0.6" }], food_drink: [{ n: ["fruit", "grape", "grapes"], u: "1f347", a: "0.6" }, { n: ["melon", "fruit"], u: "1f348", a: "0.6" }, { n: ["fruit", "watermelon"], u: "1f349", a: "0.6" }, { n: ["fruit", "orange", "tangerine"], u: "1f34a", a: "0.6" }, { n: ["lemon", "fruit", "citrus"], u: "1f34b", a: "1" }, { n: ["lime", "fruit", "citrus", "tropical"], u: "1f34b-200d-1f7e9", a: "15.1" }, { n: ["fruit", "banana"], u: "1f34c", a: "0.6" }, { n: ["fruit", "pineapple"], u: "1f34d", a: "0.6" }, { n: ["mango", "fruit", "tropical"], u: "1f96d", a: "11" }, { n: ["red", "apple", "fruit", "red apple"], u: "1f34e", a: "0.6" }, { n: ["apple", "fruit", "green", "green apple"], u: "1f34f", a: "0.6" }, { n: ["pear", "fruit"], u: "1f350", a: "1" }, { n: ["peach", "fruit"], u: "1f351", a: "0.6" }, { n: ["red", "fruit", "cherry", "berries", "cherries"], u: "1f352", a: "0.6" }, { n: ["berry", "fruit", "strawberry"], u: "1f353", a: "0.6" }, { n: ["blue", "berry", "bilberry", "blueberry", "blueberries"], u: "1fad0", a: "13" }, { n: ["food", "kiwi", "fruit", "kiwi fruit"], u: "1f95d", a: "3" }, { n: ["fruit", "tomato", "vegetable"], u: "1f345", a: "0.6" }, { n: ["food", "olive"], u: "1fad2", a: "13" }, { n: ["palm", "coconut", "pi\xF1a colada"], u: "1f965", a: "5" }, { n: ["food", "fruit", "avocado"], u: "1f951", a: "3" }, { n: ["eggplant", "aubergine", "vegetable"], u: "1f346", a: "0.6" }, { n: ["food", "potato", "vegetable"], u: "1f954", a: "3" }, { n: ["food", "carrot", "vegetable"], u: "1f955", a: "3" }, { n: ["ear", "corn", "maze", "maize", "ear of corn"], u: "1f33d", a: "0.6" }, { n: ["hot", "pepper", "hot pepper"], u: "1f336-fe0f", a: "0.7" }, { n: ["pepper", "capsicum", "vegetable", "bell pepper"], u: "1fad1", a: "13" }, { n: ["food", "pickle", "cucumber", "vegetable"], u: "1f952", a: "3" }, { n: ["kale", "cabbage", "lettuce", "bok choy", "leafy green"], u: "1f96c", a: "11" }, { n: ["broccoli", "wild cabbage"], u: "1f966", a: "5" }, { n: ["garlic", "flavoring"], u: "1f9c4", a: "12" }, { n: ["onion", "flavoring"], u: "1f9c5", a: "12" }, { n: ["nut", "food", "peanut", "peanuts", "vegetable"], u: "1f95c", a: "3" }, { n: ["food", "beans", "kidney", "legume"], u: "1fad8", a: "14" }, { n: ["plant", "chestnut"], u: "1f330", a: "0.6" }, { n: ["beer", "root", "spice", "ginger root"], u: "1fada", a: "15" }, { n: ["pea", "pod", "beans", "legume", "pea pod", "edamame", "vegetable"], u: "1fadb", a: "15" }, { n: ["food", "fungus", "nature", "vegetable", "brown mushroom"], u: "1f344-200d-1f7eb", a: "15.1" }, { n: ["loaf", "bread"], u: "1f35e", a: "0.6" }, { n: ["food", "roll", "bread", "french", "croissant", "breakfast"], u: "1f950", a: "3" }, { n: ["food", "bread", "french", "baguette", "baguette bread"], u: "1f956", a: "3" }, { n: ["naan", "pita", "arepa", "lavash", "flatbread"], u: "1fad3", a: "13" }, { n: ["pretzel", "twisted"], u: "1f968", a: "5" }, { n: ["bagel", "bakery", "schmear", "breakfast"], u: "1f96f", a: "11" }, { n: ["food", "cr\xEApe", "hotcake", "pancake", "pancakes", "breakfast"], u: "1f95e", a: "3" }, { n: ["iron", "waffle", "breakfast", "indecisive"], u: "1f9c7", a: "12" }, { n: ["cheese", "cheese wedge"], u: "1f9c0", a: "1" }, { n: ["bone", "meat", "meat on bone"], u: "1f356", a: "0.6" }, { n: ["leg", "bone", "chicken", "poultry", "drumstick", "poultry leg"], u: "1f357", a: "0.6" }, { n: ["chop", "steak", "lambchop", "porkchop", "cut of meat"], u: "1f969", a: "5" }, { n: ["food", "meat", "bacon", "breakfast"], u: "1f953", a: "3" }, { n: ["burger", "hamburger"], u: "1f354", a: "0.6" }, { n: ["fries", "french", "french fries"], u: "1f35f", a: "0.6" }, { n: ["pizza", "slice", "cheese"], u: "1f355", a: "0.6" }, { n: ["hotdog", "hot dog", "sausage", "frankfurter"], u: "1f32d", a: "1" }, { n: ["bread", "sandwich"], u: "1f96a", a: "5" }, { n: ["taco", "mexican"], u: "1f32e", a: "1" }, { n: ["wrap", "burrito", "mexican"], u: "1f32f", a: "1" }, { n: ["tamale", "mexican", "wrapped"], u: "1fad4", a: "13" }, { n: ["food", "gyro", "kebab", "falafel", "stuffed", "flatbread", "stuffed flatbread"], u: "1f959", a: "3" }, { n: ["falafel", "chickpea", "meatball"], u: "1f9c6", a: "12" }, { n: ["egg", "food", "breakfast"], u: "1f95a", a: "3" }, { n: ["egg", "pan", "frying", "cooking", "breakfast"], u: "1f373", a: "0.6" }, { n: ["pan", "food", "paella", "shallow", "casserole", "shallow pan of food"], u: "1f958", a: "3" }, { n: ["pot", "stew", "pot of food"], u: "1f372", a: "0.6" }, { n: ["pot", "swiss", "fondue", "cheese", "melted", "chocolate"], u: "1fad5", a: "13" }, { n: ["cereal", "congee", "breakfast", "bowl with spoon"], u: "1f963", a: "5" }, { n: ["food", "green", "salad", "green salad"], u: "1f957", a: "3" }, { n: ["popcorn"], u: "1f37f", a: "1" }, { n: ["dairy", "butter"], u: "1f9c8", a: "12" }, { n: ["salt", "shaker", "condiment"], u: "1f9c2", a: "11" }, { n: ["can", "canned food"], u: "1f96b", a: "5" }, { n: ["box", "bento", "bento box"], u: "1f371", a: "0.6" }, { n: ["rice", "cracker", "rice cracker"], u: "1f358", a: "0.6" }, { n: ["ball", "rice", "japanese", "rice ball"], u: "1f359", a: "0.6" }, { n: ["rice", "cooked", "cooked rice"], u: "1f35a", a: "0.6" }, { n: ["rice", "curry", "curry rice"], u: "1f35b", a: "0.6" }, { n: ["bowl", "ramen", "noodle", "steaming", "steaming bowl"], u: "1f35c", a: "0.6" }, { n: ["pasta", "spaghetti"], u: "1f35d", a: "0.6" }, { n: ["sweet", "potato", "roasted", "roasted sweet potato"], u: "1f360", a: "0.6" }, { n: ["oden", "kebab", "stick", "skewer", "seafood"], u: "1f362", a: "0.6" }, { n: ["sushi"], u: "1f363", a: "0.6" }, { n: ["fried", "prawn", "shrimp", "tempura", "fried shrimp"], u: "1f364", a: "0.6" }, { n: ["cake", "fish", "swirl", "pastry", "fish cake with swirl"], u: "1f365", a: "0.6" }, { n: ["autumn", "yu\xE8b\u01D0ng", "festival", "moon cake"], u: "1f96e", a: "11" }, { n: ["dango", "stick", "sweet", "skewer", "dessert", "japanese"], u: "1f361", a: "0.6" }, { n: ["gy\u014Dza", "jiaozi", "pierogi", "dumpling", "empanada", "potsticker"], u: "1f95f", a: "5" }, { n: ["prophecy", "fortune cookie"], u: "1f960", a: "5" }, { n: ["takeout box", "oyster pail"], u: "1f961", a: "5" }, { n: ["crab", "cancer", "zodiac"], u: "1f980", a: "1" }, { n: ["claws", "bisque", "lobster", "seafood"], u: "1f99e", a: "11" }, { n: ["food", "small", "shrimp", "shellfish"], u: "1f990", a: "3" }, { n: ["food", "squid", "molusc"], u: "1f991", a: "3" }, { n: ["pearl", "oyster", "diving"], u: "1f9aa", a: "12" }, { n: ["ice", "soft", "cream", "sweet", "dessert", "icecream", "soft ice cream"], u: "1f366", a: "0.6" }, { n: ["ice", "sweet", "shaved", "dessert", "shaved ice"], u: "1f367", a: "0.6" }, { n: ["ice", "cream", "sweet", "dessert", "ice cream"], u: "1f368", a: "0.6" }, { n: ["donut", "sweet", "dessert", "doughnut", "breakfast"], u: "1f369", a: "0.6" }, { n: ["sweet", "cookie", "dessert"], u: "1f36a", a: "0.6" }, { n: ["cake", "sweet", "pastry", "dessert", "birthday", "celebration", "birthday cake"], u: "1f382", a: "0.6" }, { n: ["cake", "slice", "sweet", "pastry", "dessert", "shortcake"], u: "1f370", a: "0.6" }, { n: ["sweet", "bakery", "cupcake"], u: "1f9c1", a: "11" }, { n: ["pie", "pastry", "filling"], u: "1f967", a: "5" }, { n: ["bar", "sweet", "dessert", "chocolate", "chocolate bar"], u: "1f36b", a: "0.6" }, { n: ["candy", "sweet", "dessert"], u: "1f36c", a: "0.6" }, { n: ["candy", "sweet", "dessert", "lollipop"], u: "1f36d", a: "0.6" }, { n: ["sweet", "custard", "dessert", "pudding"], u: "1f36e", a: "0.6" }, { n: ["pot", "honey", "sweet", "honeypot", "honey pot"], u: "1f36f", a: "0.6" }, { n: ["baby", "milk", "drink", "bottle", "baby bottle"], u: "1f37c", a: "1" }, { n: ["milk", "drink", "glass", "glass of milk"], u: "1f95b", a: "3" }, { n: ["hot", "tea", "drink", "coffee", "beverage", "steaming", "hot beverage"], u: "2615", a: "0.6" }, { n: ["pot", "tea", "drink", "teapot"], u: "1fad6", a: "13" }, { n: ["cup", "tea", "drink", "teacup", "beverage", "teacup without handle"], u: "1f375", a: "0.6" }, { n: ["bar", "cup", "sake", "drink", "bottle", "beverage"], u: "1f376", a: "0.6" }, { n: ["bar", "cork", "drink", "bottle", "popping", "bottle with popping cork"], u: "1f37e", a: "1" }, { n: ["bar", "wine", "drink", "glass", "beverage", "wine glass"], u: "1f377", a: "0.6" }, { n: ["bar", "drink", "glass", "cocktail", "cocktail glass"], u: "1f378", a: "0.6" }, { n: ["bar", "drink", "tropical", "tropical drink"], u: "1f379", a: "0.6" }, { n: ["bar", "mug", "beer", "drink", "beer mug"], u: "1f37a", a: "0.6" }, { n: ["bar", "mug", "beer", "clink", "drink", "clinking beer mugs"], u: "1f37b", a: "0.6" }, { n: ["clink", "drink", "glass", "celebrate", "clinking glasses"], u: "1f942", a: "3" }, { n: ["shot", "glass", "liquor", "whisky", "tumbler", "tumbler glass"], u: "1f943", a: "3" }, { n: ["drink", "empty", "glass", "spill", "pouring liquid"], u: "1fad7", a: "14" }, { n: ["soda", "juice", "cup with straw"], u: "1f964", a: "5" }, { n: ["tea", "milk", "pearl", "bubble", "bubble tea"], u: "1f9cb", a: "13" }, { n: ["box", "juice", "straw", "sweet", "beverage", "beverage box"], u: "1f9c3", a: "12" }, { n: ["mate", "drink"], u: "1f9c9", a: "12" }, { n: ["ice", "cold", "iceberg", "ice cube"], u: "1f9ca", a: "12" }, { n: ["hashi", "chopsticks"], u: "1f962", a: "5" }, { n: ["fork", "knife", "plate", "cooking", "fork and knife with plate"], u: "1f37d-fe0f", a: "0.7" }, { n: ["fork", "knife", "cooking", "cutlery", "fork and knife"], u: "1f374", a: "0.6" }, { n: ["spoon", "tableware"], u: "1f944", a: "3" }, { n: ["tool", "hocho", "knife", "weapon", "cooking", "kitchen knife"], u: "1f52a", a: "0.6" }, { n: ["jar", "empty", "sauce", "store", "condiment", "container"], u: "1fad9", a: "14" }, { n: ["jug", "drink", "zodiac", "amphora", "cooking", "aquarius"], u: "1f3fa", a: "1" }], travel_places: [{ n: ["earth", "globe", "world", "africa", "europe", "globe showing Europe Africa", "globe showing europe africa"], u: "1f30d", a: "0.7" }, { n: ["earth", "globe", "world", "americas", "globe showing Americas", "globe showing americas"], u: "1f30e", a: "0.7" }, { n: ["asia", "earth", "globe", "world", "australia", "globe showing Asia Australia", "globe showing asia australia"], u: "1f30f", a: "0.6" }, { n: ["earth", "globe", "world", "meridians", "globe with meridians"], u: "1f310", a: "1" }, { n: ["map", "world", "world map"], u: "1f5fa-fe0f", a: "0.7" }, { n: ["map", "japan", "map of Japan", "map of japan"], u: "1f5fe", a: "0.6" }, { n: ["compass", "magnetic", "navigation", "orienteering"], u: "1f9ed", a: "11" }, { n: ["cold", "snow", "mountain", "snow capped mountain"], u: "1f3d4-fe0f", a: "0.7" }, { n: ["mountain"], u: "26f0-fe0f", a: "0.7" }, { n: ["volcano", "eruption", "mountain"], u: "1f30b", a: "0.6" }, { n: ["fuji", "mountain", "mount fuji"], u: "1f5fb", a: "0.6" }, { n: ["camping"], u: "1f3d5-fe0f", a: "0.7" }, { n: ["beach", "umbrella", "beach with umbrella"], u: "1f3d6-fe0f", a: "0.7" }, { n: ["desert"], u: "1f3dc-fe0f", a: "0.7" }, { n: ["desert", "island", "desert island"], u: "1f3dd-fe0f", a: "0.7" }, { n: ["park", "national park"], u: "1f3de-fe0f", a: "0.7" }, { n: ["stadium"], u: "1f3df-fe0f", a: "0.7" }, { n: ["classical", "classical building"], u: "1f3db-fe0f", a: "0.7" }, { n: ["construction", "building construction"], u: "1f3d7-fe0f", a: "0.7" }, { n: ["clay", "wall", "brick", "bricks", "mortar"], u: "1f9f1", a: "11" }, { n: ["rock", "heavy", "solid", "stone", "boulder"], u: "1faa8", a: "13" }, { n: ["log", "wood", "lumber", "timber"], u: "1fab5", a: "13" }, { n: ["hut", "yurt", "house", "roundhouse"], u: "1f6d6", a: "13" }, { n: ["houses"], u: "1f3d8-fe0f", a: "0.7" }, { n: ["house", "derelict", "derelict house"], u: "1f3da-fe0f", a: "0.7" }, { n: ["home", "house"], u: "1f3e0", a: "0.6" }, { n: ["home", "house", "garden", "house with garden"], u: "1f3e1", a: "0.6" }, { n: ["building", "office building"], u: "1f3e2", a: "0.6" }, { n: ["post", "japanese", "Japanese post office", "japanese post office"], u: "1f3e3", a: "0.6" }, { n: ["post", "european", "post office"], u: "1f3e4", a: "1" }, { n: ["doctor", "hospital", "medicine"], u: "1f3e5", a: "0.6" }, { n: ["bank", "building"], u: "1f3e6", a: "0.6" }, { n: ["hotel", "building"], u: "1f3e8", a: "0.6" }, { n: ["love", "hotel", "love hotel"], u: "1f3e9", a: "0.6" }, { n: ["store", "convenience", "convenience store"], u: "1f3ea", a: "0.6" }, { n: ["school", "building"], u: "1f3eb", a: "0.6" }, { n: ["store", "department", "department store"], u: "1f3ec", a: "0.6" }, { n: ["factory", "building"], u: "1f3ed", a: "0.6" }, { n: ["castle", "japanese", "Japanese castle"], u: "1f3ef", a: "0.6" }, { n: ["castle", "european"], u: "1f3f0", a: "0.6" }, { n: ["chapel", "wedding", "romance"], u: "1f492", a: "0.6" }, { n: ["tokyo", "tower", "Tokyo tower"], u: "1f5fc", a: "0.6" }, { n: ["statue", "liberty", "Statue of Liberty", "statue of liberty"], u: "1f5fd", a: "0.6" }, { n: ["cross", "church", "religion", "christian"], u: "26ea", a: "0.6" }, { n: ["islam", "mosque", "muslim", "religion"], u: "1f54c", a: "1" }, { n: ["hindu", "temple", "hindu temple"], u: "1f6d5", a: "12" }, { n: ["jew", "jewish", "temple", "religion", "synagogue"], u: "1f54d", a: "1" }, { n: ["shinto", "shrine", "religion", "shinto shrine"], u: "26e9-fe0f", a: "0.7" }, { n: ["kaaba", "islam", "muslim", "religion"], u: "1f54b", a: "1" }, { n: ["fountain"], u: "26f2", a: "0.6" }, { n: ["tent", "camping"], u: "26fa", a: "0.6" }, { n: ["fog", "foggy"], u: "1f301", a: "0.6" }, { n: ["star", "night", "night with stars"], u: "1f303", a: "0.6" }, { n: ["city", "cityscape"], u: "1f3d9-fe0f", a: "0.7" }, { n: ["sun", "morning", "sunrise", "mountain", "sunrise over mountains"], u: "1f304", a: "0.6" }, { n: ["sun", "sunrise", "morning"], u: "1f305", a: "0.6" }, { n: ["city", "dusk", "sunset", "evening", "landscape", "cityscape at dusk"], u: "1f306", a: "0.6" }, { n: ["sun", "dusk", "sunset"], u: "1f307", a: "0.6" }, { n: ["night", "bridge", "bridge at night"], u: "1f309", a: "0.6" }, { n: ["hot", "springs", "steaming", "hotsprings", "hot springs"], u: "2668-fe0f", a: "0.6" }, { n: ["horse", "carousel", "carousel horse"], u: "1f3a0", a: "0.6" }, { n: ["play", "theme park", "amusement park", "playground slide"], u: "1f6dd", a: "14" }, { n: ["wheel", "ferris", "theme park", "ferris wheel", "amusement park"], u: "1f3a1", a: "0.6" }, { n: ["roller", "coaster", "theme park", "roller coaster", "amusement park"], u: "1f3a2", a: "0.6" }, { n: ["pole", "barber", "haircut", "barber pole"], u: "1f488", a: "0.6" }, { n: ["tent", "circus", "circus tent"], u: "1f3aa", a: "0.6" }, { n: ["steam", "train", "engine", "railway", "locomotive"], u: "1f682", a: "1" }, { n: ["car", "tram", "train", "railway", "electric", "trolleybus", "railway car"], u: "1f683", a: "0.6" }, { n: ["speed", "train", "railway", "shinkansen", "high speed train"], u: "1f684", a: "0.6" }, { n: ["speed", "train", "bullet", "railway", "shinkansen", "bullet train"], u: "1f685", a: "0.6" }, { n: ["train", "railway"], u: "1f686", a: "1" }, { n: ["metro", "subway"], u: "1f687", a: "0.6" }, { n: ["railway", "light rail"], u: "1f688", a: "1" }, { n: ["train", "station", "railway"], u: "1f689", a: "0.6" }, { n: ["tram", "trolleybus"], u: "1f68a", a: "1" }, { n: ["vehicle", "monorail"], u: "1f69d", a: "1" }, { n: ["car", "railway", "mountain", "mountain railway"], u: "1f69e", a: "1" }, { n: ["car", "tram", "tram car", "trolleybus"], u: "1f68b", a: "1" }, { n: ["bus", "vehicle"], u: "1f68c", a: "0.6" }, { n: ["bus", "oncoming", "oncoming bus"], u: "1f68d", a: "0.7" }, { n: ["bus", "tram", "trolley", "trolleybus"], u: "1f68e", a: "1" }, { n: ["bus", "minibus"], u: "1f690", a: "1" }, { n: ["vehicle", "ambulance"], u: "1f691", a: "0.6" }, { n: ["fire", "truck", "engine", "fire engine"], u: "1f692", a: "0.6" }, { n: ["car", "patrol", "police", "police car"], u: "1f693", a: "0.6" }, { n: ["car", "police", "oncoming", "oncoming police car"], u: "1f694", a: "0.7" }, { n: ["taxi", "vehicle"], u: "1f695", a: "0.6" }, { n: ["taxi", "oncoming", "oncoming taxi"], u: "1f696", a: "1" }, { n: ["car", "automobile"], u: "1f697", a: "0.6" }, { n: ["car", "oncoming", "automobile", "oncoming automobile"], u: "1f698", a: "0.7" }, { n: ["recreational", "sport utility", "sport utility vehicle"], u: "1f699", a: "0.6" }, { n: ["truck", "pickup", "pick up", "pickup truck"], u: "1f6fb", a: "13" }, { n: ["truck", "delivery", "delivery truck"], u: "1f69a", a: "0.6" }, { n: ["semi", "lorry", "truck", "articulated lorry"], u: "1f69b", a: "1" }, { n: ["tractor", "vehicle"], u: "1f69c", a: "1" }, { n: ["car", "racing", "racing car"], u: "1f3ce-fe0f", a: "0.7" }, { n: ["racing", "motorcycle"], u: "1f3cd-fe0f", a: "0.7" }, { n: ["motor", "scooter", "motor scooter"], u: "1f6f5", a: "3" }, { n: ["accessibility", "manual wheelchair"], u: "1f9bd", a: "12" }, { n: ["accessibility", "motorized wheelchair"], u: "1f9bc", a: "12" }, { n: ["tuk tuk", "auto rickshaw"], u: "1f6fa", a: "12" }, { n: ["bike", "bicycle"], u: "1f6b2", a: "0.6" }, { n: ["kick", "scooter", "kick scooter"], u: "1f6f4", a: "3" }, { n: ["board", "skateboard"], u: "1f6f9", a: "11" }, { n: ["skate", "roller", "roller skate"], u: "1f6fc", a: "13" }, { n: ["bus", "stop", "bus stop"], u: "1f68f", a: "0.6" }, { n: ["road", "highway", "motorway"], u: "1f6e3-fe0f", a: "0.7" }, { n: ["train", "railway", "railway track"], u: "1f6e4-fe0f", a: "0.7" }, { n: ["oil", "drum", "oil drum"], u: "1f6e2-fe0f", a: "0.7" }, { n: ["gas", "fuel", "pump", "diesel", "station", "fuelpump", "fuel pump"], u: "26fd", a: "0.6" }, { n: ["tire", "turn", "wheel", "circle"], u: "1f6de", a: "14" }, { n: ["car", "light", "beacon", "police", "revolving", "police car light"], u: "1f6a8", a: "0.6" }, { n: ["light", "signal", "traffic", "horizontal traffic light"], u: "1f6a5", a: "0.6" }, { n: ["light", "signal", "traffic", "vertical traffic light"], u: "1f6a6", a: "1" }, { n: ["sign", "stop", "stop sign", "octagonal"], u: "1f6d1", a: "3" }, { n: ["barrier", "construction"], u: "1f6a7", a: "0.6" }, { n: ["ship", "tool", "anchor"], u: "2693", a: "0.6" }, { n: ["float", "rescue", "safety", "ring buoy", "life saver", "life preserver"], u: "1f6df", a: "14" }, { n: ["sea", "boat", "yacht", "resort", "sailboat"], u: "26f5", a: "0.6" }, { n: ["boat", "canoe"], u: "1f6f6", a: "3" }, { n: ["boat", "speedboat"], u: "1f6a4", a: "0.6" }, { n: ["ship", "passenger", "passenger ship"], u: "1f6f3-fe0f", a: "0.7" }, { n: ["boat", "ferry", "passenger"], u: "26f4-fe0f", a: "0.7" }, { n: ["boat", "motorboat", "motor boat"], u: "1f6e5-fe0f", a: "0.7" }, { n: ["ship", "boat", "passenger"], u: "1f6a2", a: "0.6" }, { n: ["airplane", "aeroplane"], u: "2708-fe0f", a: "0.6" }, { n: ["airplane", "aeroplane", "small airplane"], u: "1f6e9-fe0f", a: "0.7" }, { n: ["airplane", "check in", "aeroplane", "departure", "departures", "airplane departure"], u: "1f6eb", a: "1" }, { n: ["landing", "airplane", "arrivals", "arriving", "aeroplane", "airplane arrival"], u: "1f6ec", a: "1" }, { n: ["skydive", "parasail", "parachute", "hang glide"], u: "1fa82", a: "12" }, { n: ["seat", "chair"], u: "1f4ba", a: "0.6" }, { n: ["vehicle", "helicopter"], u: "1f681", a: "1" }, { n: ["railway", "suspension", "suspension railway"], u: "1f69f", a: "1" }, { n: ["cable", "gondola", "mountain", "mountain cableway"], u: "1f6a0", a: "1" }, { n: ["car", "cable", "aerial", "gondola", "tramway", "aerial tramway"], u: "1f6a1", a: "1" }, { n: ["space", "satellite"], u: "1f6f0-fe0f", a: "0.7" }, { n: ["space", "rocket"], u: "1f680", a: "0.6" }, { n: ["ufo", "flying saucer"], u: "1f6f8", a: "5" }, { n: ["bell", "hotel", "bellhop", "bellhop bell"], u: "1f6ce-fe0f", a: "0.7" }, { n: ["travel", "luggage", "packing"], u: "1f9f3", a: "11" }, { n: ["sand", "timer", "hourglass done"], u: "231b", a: "0.6" }, { n: ["sand", "timer", "hourglass", "hourglass not done"], u: "23f3", a: "0.6" }, { n: ["watch", "clock"], u: "231a", a: "0.6" }, { n: ["alarm", "clock", "alarm clock"], u: "23f0", a: "0.6" }, { n: ["clock", "stopwatch"], u: "23f1-fe0f", a: "1" }, { n: ["clock", "timer", "timer clock"], u: "23f2-fe0f", a: "1" }, { n: ["clock", "mantelpiece clock"], u: "1f570-fe0f", a: "0.7" }, { n: ["00", "12", "12:00", "clock", "twelve", "o\u2019clock", "twelve o\u2019clock"], u: "1f55b", a: "0.6" }, { n: ["12", "12:30", "clock", "thirty", "twelve", "twelve thirty"], u: "1f567", a: "0.7" }, { n: ["1", "00", "one", "1:00", "clock", "o\u2019clock", "one o\u2019clock"], u: "1f550", a: "0.6" }, { n: ["1", "one", "1:30", "clock", "thirty", "one thirty"], u: "1f55c", a: "0.7" }, { n: ["2", "00", "two", "2:00", "clock", "o\u2019clock", "two o\u2019clock"], u: "1f551", a: "0.6" }, { n: ["2", "two", "2:30", "clock", "thirty", "two thirty"], u: "1f55d", a: "0.7" }, { n: ["3", "00", "3:00", "clock", "three", "o\u2019clock", "three o\u2019clock"], u: "1f552", a: "0.6" }, { n: ["3", "3:30", "clock", "three", "thirty", "three thirty"], u: "1f55e", a: "0.7" }, { n: ["4", "00", "4:00", "four", "clock", "o\u2019clock", "four o\u2019clock"], u: "1f553", a: "0.6" }, { n: ["4", "4:30", "four", "clock", "thirty", "four thirty"], u: "1f55f", a: "0.7" }, { n: ["5", "00", "5:00", "five", "clock", "o\u2019clock", "five o\u2019clock"], u: "1f554", a: "0.6" }, { n: ["5", "5:30", "five", "clock", "thirty", "five thirty"], u: "1f560", a: "0.7" }, { n: ["6", "00", "six", "6:00", "clock", "o\u2019clock", "six o\u2019clock"], u: "1f555", a: "0.6" }, { n: ["6", "six", "6:30", "clock", "thirty", "six thirty"], u: "1f561", a: "0.7" }, { n: ["7", "00", "7:00", "clock", "seven", "o\u2019clock", "seven o\u2019clock"], u: "1f556", a: "0.6" }, { n: ["7", "7:30", "clock", "seven", "thirty", "seven thirty"], u: "1f562", a: "0.7" }, { n: ["8", "00", "8:00", "clock", "eight", "o\u2019clock", "eight o\u2019clock"], u: "1f557", a: "0.6" }, { n: ["8", "8:30", "clock", "eight", "thirty", "eight thirty"], u: "1f563", a: "0.7" }, { n: ["9", "00", "9:00", "nine", "clock", "o\u2019clock", "nine o\u2019clock"], u: "1f558", a: "0.6" }, { n: ["9", "9:30", "nine", "clock", "thirty", "nine thirty"], u: "1f564", a: "0.7" }, { n: ["00", "10", "ten", "10:00", "clock", "o\u2019clock", "ten o\u2019clock"], u: "1f559", a: "0.6" }, { n: ["10", "ten", "10:30", "clock", "thirty", "ten thirty"], u: "1f565", a: "0.7" }, { n: ["00", "11", "11:00", "clock", "eleven", "o\u2019clock", "eleven o\u2019clock"], u: "1f55a", a: "0.6" }, { n: ["11", "11:30", "clock", "eleven", "thirty", "eleven thirty"], u: "1f566", a: "0.7" }, { n: ["dark", "moon", "new moon"], u: "1f311", a: "0.6" }, { n: ["moon", "waxing", "crescent", "waxing crescent moon"], u: "1f312", a: "1" }, { n: ["moon", "quarter", "first quarter moon"], u: "1f313", a: "0.6" }, { n: ["moon", "waxing", "gibbous", "waxing gibbous moon"], u: "1f314", a: "0.6" }, { n: ["full", "moon", "full moon"], u: "1f315", a: "0.6" }, { n: ["moon", "waning", "gibbous", "waning gibbous moon"], u: "1f316", a: "1" }, { n: ["moon", "quarter", "last quarter moon"], u: "1f317", a: "1" }, { n: ["moon", "waning", "crescent", "waning crescent moon"], u: "1f318", a: "1" }, { n: ["moon", "crescent", "crescent moon"], u: "1f319", a: "0.6" }, { n: ["face", "moon", "new moon face"], u: "1f31a", a: "1" }, { n: ["face", "moon", "quarter", "first quarter moon face"], u: "1f31b", a: "0.6" }, { n: ["face", "moon", "quarter", "last quarter moon face"], u: "1f31c", a: "0.7" }, { n: ["weather", "thermometer"], u: "1f321-fe0f", a: "0.7" }, { n: ["sun", "rays", "sunny", "bright"], u: "2600-fe0f", a: "0.6" }, { n: ["face", "full", "moon", "bright", "full moon face"], u: "1f31d", a: "1" }, { n: ["sun", "face", "bright", "sun with face"], u: "1f31e", a: "1" }, { n: ["saturn", "saturnine", "ringed planet"], u: "1fa90", a: "12" }, { n: ["star"], u: "2b50", a: "0.6" }, { n: ["glow", "star", "shining", "sparkle", "glittery", "glowing star"], u: "1f31f", a: "0.6" }, { n: ["star", "falling", "shooting", "shooting star"], u: "1f320", a: "0.6" }, { n: ["space", "milky way"], u: "1f30c", a: "0.6" }, { n: ["cloud", "weather"], u: "2601-fe0f", a: "0.6" }, { n: ["sun", "cloud", "sun behind cloud"], u: "26c5", a: "0.6" }, { n: ["rain", "cloud", "thunder", "cloud with lightning and rain"], u: "26c8-fe0f", a: "0.7" }, { n: ["sun", "cloud", "sun behind small cloud"], u: "1f324-fe0f", a: "0.7" }, { n: ["sun", "cloud", "sun behind large cloud"], u: "1f325-fe0f", a: "0.7" }, { n: ["sun", "rain", "cloud", "sun behind rain cloud"], u: "1f326-fe0f", a: "0.7" }, { n: ["rain", "cloud", "cloud with rain"], u: "1f327-fe0f", a: "0.7" }, { n: ["cold", "snow", "cloud", "cloud with snow"], u: "1f328-fe0f", a: "0.7" }, { n: ["cloud", "lightning", "cloud with lightning"], u: "1f329-fe0f", a: "0.7" }, { n: ["cloud", "tornado", "whirlwind"], u: "1f32a-fe0f", a: "0.7" }, { n: ["fog", "cloud"], u: "1f32b-fe0f", a: "0.7" }, { n: ["blow", "face", "wind", "cloud", "wind face"], u: "1f32c-fe0f", a: "0.7" }, { n: ["dizzy", "cyclone", "twister", "typhoon", "hurricane"], u: "1f300", a: "0.6" }, { n: ["rain", "rainbow"], u: "1f308", a: "0.6" }, { n: ["rain", "clothing", "umbrella", "closed umbrella"], u: "1f302", a: "0.6" }, { n: ["rain", "umbrella", "clothing"], u: "2602-fe0f", a: "0.7" }, { n: ["drop", "rain", "clothing", "umbrella", "umbrella with rain drops"], u: "2614", a: "0.6" }, { n: ["sun", "rain", "umbrella", "umbrella on ground"], u: "26f1-fe0f", a: "0.7" }, { n: ["zap", "danger", "voltage", "electric", "lightning", "high voltage"], u: "26a1", a: "0.6" }, { n: ["cold", "snow", "snowflake"], u: "2744-fe0f", a: "0.6" }, { n: ["cold", "snow", "snowman"], u: "2603-fe0f", a: "0.7" }, { n: ["cold", "snow", "snowman", "snowman without snow"], u: "26c4", a: "0.6" }, { n: ["comet", "space"], u: "2604-fe0f", a: "1" }, { n: ["fire", "tool", "flame"], u: "1f525", a: "0.6" }, { n: ["cold", "drop", "comic", "sweat", "droplet"], u: "1f4a7", a: "0.6" }, { n: ["wave", "ocean", "water", "water wave"], u: "1f30a", a: "0.6" }], activities: [{ n: ["jack", "lantern", "halloween", "celebration", "jack o lantern"], u: "1f383", a: "0.6" }, { n: ["tree", "christmas", "celebration", "Christmas tree"], u: "1f384", a: "0.6" }, { n: ["fireworks", "celebration"], u: "1f386", a: "0.6" }, { n: ["sparkle", "sparkler", "fireworks", "celebration"], u: "1f387", a: "0.6" }, { n: ["dynamite", "explosive", "fireworks", "firecracker"], u: "1f9e8", a: "11" }, { n: ["*", "star", "sparkle", "sparkles"], u: "2728", a: "0.6" }, { n: ["balloon", "celebration"], u: "1f388", a: "0.6" }, { n: ["tada", "party", "popper", "celebration", "party popper"], u: "1f389", a: "0.6" }, { n: ["ball", "confetti", "celebration", "confetti ball"], u: "1f38a", a: "0.6" }, { n: ["tree", "banner", "japanese", "celebration", "tanabata tree"], u: "1f38b", a: "0.6" }, { n: ["pine", "bamboo", "japanese", "celebration", "pine decoration"], u: "1f38d", a: "0.6" }, { n: ["doll", "festival", "japanese", "celebration", "Japanese dolls", "japanese dolls"], u: "1f38e", a: "0.6" }, { n: ["carp", "streamer", "celebration", "carp streamer"], u: "1f38f", a: "0.6" }, { n: ["bell", "wind", "chime", "wind chime", "celebration"], u: "1f390", a: "0.6" }, { n: ["moon", "ceremony", "celebration", "moon viewing ceremony"], u: "1f391", a: "0.6" }, { n: ["gift", "money", "h\xF3ngb\u0101o", "lai see", "good luck", "red envelope"], u: "1f9e7", a: "11" }, { n: ["ribbon", "celebration"], u: "1f380", a: "0.6" }, { n: ["box", "gift", "present", "wrapped", "celebration", "wrapped gift"], u: "1f381", a: "0.6" }, { n: ["ribbon", "reminder", "celebration", "reminder ribbon"], u: "1f397-fe0f", a: "0.7" }, { n: ["ticket", "admission", "admission tickets"], u: "1f39f-fe0f", a: "0.7" }, { n: ["ticket", "admission"], u: "1f3ab", a: "0.6" }, { n: ["medal", "military", "celebration", "military medal"], u: "1f396-fe0f", a: "0.7" }, { n: ["prize", "trophy"], u: "1f3c6", a: "0.6" }, { n: ["medal", "sports medal"], u: "1f3c5", a: "1" }, { n: ["gold", "first", "medal", "1st place medal"], u: "1f947", a: "3" }, { n: ["medal", "second", "silver", "2nd place medal"], u: "1f948", a: "3" }, { n: ["medal", "third", "bronze", "3rd place medal"], u: "1f949", a: "3" }, { n: ["ball", "soccer", "football", "soccer ball"], u: "26bd", a: "0.6" }, { n: ["ball", "baseball"], u: "26be", a: "0.6" }, { n: ["ball", "glove", "softball", "underarm"], u: "1f94e", a: "11" }, { n: ["ball", "hoop", "basketball"], u: "1f3c0", a: "0.6" }, { n: ["ball", "game", "volleyball"], u: "1f3d0", a: "1" }, { n: ["ball", "american", "football", "american football"], u: "1f3c8", a: "0.6" }, { n: ["ball", "rugby", "football", "rugby football"], u: "1f3c9", a: "1" }, { n: ["ball", "tennis", "racquet"], u: "1f3be", a: "0.6" }, { n: ["ultimate", "flying disc"], u: "1f94f", a: "11" }, { n: ["ball", "game", "bowling"], u: "1f3b3", a: "0.6" }, { n: ["bat", "ball", "game", "cricket game"], u: "1f3cf", a: "1" }, { n: ["ball", "game", "field", "stick", "hockey", "field hockey"], u: "1f3d1", a: "1" }, { n: ["ice", "game", "puck", "stick", "hockey", "ice hockey"], u: "1f3d2", a: "1" }, { n: ["ball", "goal", "stick", "lacrosse"], u: "1f94d", a: "11" }, { n: ["bat", "ball", "game", "paddle", "ping pong", "table tennis"], u: "1f3d3", a: "1" }, { n: ["game", "birdie", "racquet", "badminton", "shuttlecock"], u: "1f3f8", a: "1" }, { n: ["glove", "boxing", "boxing glove"], u: "1f94a", a: "3" }, { n: ["judo", "karate", "uniform", "taekwondo", "martial arts", "martial arts uniform"], u: "1f94b", a: "3" }, { n: ["net", "goal", "goal net"], u: "1f945", a: "3" }, { n: ["golf", "hole", "flag in hole"], u: "26f3", a: "0.6" }, { n: ["ice", "skate", "ice skate"], u: "26f8-fe0f", a: "0.7" }, { n: ["fish", "pole", "fishing pole"], u: "1f3a3", a: "0.6" }, { n: ["scuba", "diving", "snorkeling", "diving mask"], u: "1f93f", a: "12" }, { n: ["sash", "shirt", "running", "athletics", "running shirt"], u: "1f3bd", a: "0.6" }, { n: ["ski", "skis", "snow"], u: "1f3bf", a: "0.6" }, { n: ["sled", "sledge", "sleigh"], u: "1f6f7", a: "5" }, { n: ["game", "rock", "curling stone"], u: "1f94c", a: "5" }, { n: ["hit", "dart", "game", "target", "bullseye", "direct hit"], u: "1f3af", a: "0.6" }, { n: ["toy", "yo yo", "fluctuate"], u: "1fa80", a: "12" }, { n: ["fly", "kite", "soar"], u: "1fa81", a: "12" }, { n: ["gun", "tool", "water", "pistol", "weapon", "handgun", "revolver", "water pistol"], u: "1f52b", a: "0.6" }, { n: ["8", "ball", "game", "eight", "billiard", "pool 8 ball"], u: "1f3b1", a: "0.6" }, { n: ["ball", "tool", "crystal", "fantasy", "fortune", "fairy tale", "crystal ball"], u: "1f52e", a: "0.6" }, { n: ["magic", "witch", "wizard", "magic wand"], u: "1fa84", a: "13" }, { n: ["game", "video game", "controller"], u: "1f3ae", a: "0.6" }, { n: ["game", "joystick", "video game"], u: "1f579-fe0f", a: "0.7" }, { n: ["game", "slot", "slot machine"], u: "1f3b0", a: "0.6" }, { n: ["die", "dice", "game", "game die"], u: "1f3b2", a: "0.6" }, { n: ["clue", "piece", "jigsaw", "puzzle", "puzzle piece", "interlocking"], u: "1f9e9", a: "11" }, { n: ["toy", "plush", "stuffed", "plaything", "teddy bear"], u: "1f9f8", a: "11" }, { n: ["party", "pi\xF1ata", "celebration"], u: "1fa85", a: "13" }, { n: ["dance", "disco", "party", "glitter", "mirror ball"], u: "1faa9", a: "14" }, { n: ["doll", "russia", "nesting", "nesting dolls"], u: "1fa86", a: "13" }, { n: ["card", "game", "spade suit"], u: "2660-fe0f", a: "0.6" }, { n: ["card", "game", "heart suit"], u: "2665-fe0f", a: "0.6" }, { n: ["card", "game", "diamond suit"], u: "2666-fe0f", a: "0.6" }, { n: ["card", "game", "club suit"], u: "2663-fe0f", a: "0.6" }, { n: ["dupe", "chess", "chess pawn", "expendable"], u: "265f-fe0f", a: "11" }, { n: ["card", "game", "joker", "wildcard"], u: "1f0cf", a: "0.6" }, { n: ["red", "game", "mahjong", "mahjong red dragon"], u: "1f004", a: "0.6" }, { n: ["card", "game", "flower", "playing", "japanese", "flower playing cards"], u: "1f3b4", a: "0.6" }, { n: ["art", "mask", "theater", "theatre", "performing", "performing arts"], u: "1f3ad", a: "0.6" }, { n: ["art", "frame", "museum", "picture", "painting", "framed picture"], u: "1f5bc-fe0f", a: "0.7" }, { n: ["art", "museum", "palette", "painting", "artist palette"], u: "1f3a8", a: "0.6" }, { n: ["spool", "thread", "needle", "sewing", "string"], u: "1f9f5", a: "11" }, { n: ["needle", "sewing", "sutures", "stitches", "tailoring", "embroidery", "sewing needle"], u: "1faa1", a: "13" }, { n: ["yarn", "ball", "knit", "crochet"], u: "1f9f6", a: "11" }, { n: ["tie", "knot", "rope", "twine", "twist", "tangled"], u: "1faa2", a: "13" }], objects: [{ n: ["eye", "glasses", "eyewear", "clothing", "eyeglasses"], u: "1f453", a: "0.6" }, { n: ["eye", "dark", "eyewear", "glasses", "sunglasses"], u: "1f576-fe0f", a: "0.7" }, { n: ["goggles", "welding", "swimming", "eye protection"], u: "1f97d", a: "11" }, { n: ["doctor", "lab coat", "scientist", "experiment"], u: "1f97c", a: "11" }, { n: ["vest", "safety", "emergency", "safety vest"], u: "1f9ba", a: "12" }, { n: ["tie", "necktie", "clothing"], u: "1f454", a: "0.6" }, { n: ["shirt", "tshirt", "t shirt", "clothing"], u: "1f455", a: "0.6" }, { n: ["jeans", "pants", "clothing", "trousers"], u: "1f456", a: "0.6" }, { n: ["neck", "scarf"], u: "1f9e3", a: "5" }, { n: ["hand", "gloves"], u: "1f9e4", a: "5" }, { n: ["coat", "jacket"], u: "1f9e5", a: "5" }, { n: ["socks", "stocking"], u: "1f9e6", a: "5" }, { n: ["dress", "clothing"], u: "1f457", a: "0.6" }, { n: ["kimono", "clothing"], u: "1f458", a: "0.6" }, { n: ["sari", "dress", "clothing"], u: "1f97b", a: "12" }, { n: ["bathing suit", "one piece swimsuit"], u: "1fa71", a: "12" }, { n: ["briefs", "swimsuit", "one piece", "underwear", "bathing suit"], u: "1fa72", a: "12" }, { n: ["pants", "shorts", "underwear", "bathing suit"], u: "1fa73", a: "12" }, { n: ["swim", "bikini", "clothing"], u: "1f459", a: "0.6" }, { n: ["woman", "clothing", "woman\u2019s clothes"], u: "1f45a", a: "0.6" }, { n: ["fan", "hot", "shy", "dance", "cooling", "flutter", "folding hand fan"], u: "1faad", a: "15" }, { n: ["coin", "purse", "clothing"], u: "1f45b", a: "0.6" }, { n: ["bag", "purse", "handbag", "clothing"], u: "1f45c", a: "0.6" }, { n: ["bag", "pouch", "clothing", "clutch bag"], u: "1f45d", a: "0.6" }, { n: ["bag", "hotel", "shopping", "shopping bags"], u: "1f6cd-fe0f", a: "0.7" }, { n: ["bag", "school", "satchel", "backpack", "rucksack"], u: "1f392", a: "0.6" }, { n: ["z\u014Dri", "thongs", "sandals", "thong sandal", "beach sandals", "thong sandals"], u: "1fa74", a: "13" }, { n: ["man", "shoe", "clothing", "man\u2019s shoe"], u: "1f45e", a: "0.6" }, { n: ["shoe", "sneaker", "athletic", "clothing", "running shoe"], u: "1f45f", a: "0.6" }, { n: ["boot", "hiking", "camping", "hiking boot", "backpacking"], u: "1f97e", a: "11" }, { n: ["slip on", "slipper", "flat shoe", "ballet flat"], u: "1f97f", a: "11" }, { n: ["heel", "shoe", "woman", "clothing", "high heeled shoe"], u: "1f460", a: "0.6" }, { n: ["shoe", "woman", "sandal", "clothing", "woman\u2019s sandal"], u: "1f461", a: "0.6" }, { n: ["dance", "ballet", "ballet shoes"], u: "1fa70", a: "12" }, { n: ["boot", "shoe", "woman", "clothing", "woman\u2019s boot"], u: "1f462", a: "0.6" }, { n: ["afro", "comb", "hair", "pick", "hair pick"], u: "1faae", a: "15" }, { n: ["king", "crown", "queen", "clothing"], u: "1f451", a: "0.6" }, { n: ["hat", "woman", "clothing", "woman\u2019s hat"], u: "1f452", a: "0.6" }, { n: ["hat", "top", "tophat", "top hat", "clothing"], u: "1f3a9", a: "0.6" }, { n: ["cap", "hat", "clothing", "graduation", "celebration", "graduation cap"], u: "1f393", a: "0.6" }, { n: ["billed cap", "baseball cap"], u: "1f9e2", a: "5" }, { n: ["army", "helmet", "soldier", "warrior", "military", "military helmet"], u: "1fa96", a: "13" }, { n: ["aid", "hat", "face", "cross", "helmet", "rescue worker\u2019s helmet"], u: "26d1-fe0f", a: "0.7" }, { n: ["beads", "prayer", "clothing", "necklace", "religion", "prayer beads"], u: "1f4ff", a: "1" }, { n: ["makeup", "lipstick", "cosmetics"], u: "1f484", a: "0.6" }, { n: ["ring", "diamond"], u: "1f48d", a: "0.6" }, { n: ["gem", "jewel", "diamond", "gem stone"], u: "1f48e", a: "0.6" }, { n: ["mute", "quiet", "silent", "speaker", "muted speaker"], u: "1f507", a: "1" }, { n: ["soft", "speaker low volume"], u: "1f508", a: "0.7" }, { n: ["medium", "speaker medium volume"], u: "1f509", a: "1" }, { n: ["loud", "speaker high volume"], u: "1f50a", a: "0.6" }, { n: ["loud", "loudspeaker", "public address"], u: "1f4e2", a: "0.6" }, { n: ["cheering", "megaphone"], u: "1f4e3", a: "0.6" }, { n: ["horn", "post", "postal", "postal horn"], u: "1f4ef", a: "1" }, { n: ["bell"], u: "1f514", a: "0.6" }, { n: ["bell", "mute", "quiet", "silent", "forbidden", "bell with slash"], u: "1f515", a: "1" }, { n: ["music", "score", "musical score"], u: "1f3bc", a: "0.6" }, { n: ["note", "music", "musical note"], u: "1f3b5", a: "0.6" }, { n: ["note", "music", "notes", "musical notes"], u: "1f3b6", a: "0.6" }, { n: ["mic", "music", "studio", "microphone", "studio microphone"], u: "1f399-fe0f", a: "0.7" }, { n: ["level", "music", "slider", "level slider"], u: "1f39a-fe0f", a: "0.7" }, { n: ["knobs", "music", "control", "control knobs"], u: "1f39b-fe0f", a: "0.7" }, { n: ["mic", "karaoke", "microphone"], u: "1f3a4", a: "0.6" }, { n: ["earbud", "headphone"], u: "1f3a7", a: "0.6" }, { n: ["radio", "video"], u: "1f4fb", a: "0.6" }, { n: ["sax", "music", "saxophone", "instrument"], u: "1f3b7", a: "0.6" }, { n: ["accordion", "concertina", "squeeze box"], u: "1fa97", a: "13" }, { n: ["music", "guitar", "instrument"], u: "1f3b8", a: "0.6" }, { n: ["music", "piano", "keyboard", "instrument", "musical keyboard"], u: "1f3b9", a: "0.6" }, { n: ["music", "trumpet", "instrument"], u: "1f3ba", a: "0.6" }, { n: ["music", "violin", "instrument"], u: "1f3bb", a: "0.6" }, { n: ["banjo", "music", "stringed"], u: "1fa95", a: "12" }, { n: ["drum", "music", "drumsticks"], u: "1f941", a: "3" }, { n: ["beat", "drum", "conga", "rhythm", "long drum"], u: "1fa98", a: "13" }, { n: ["music", "shake", "rattle", "maracas", "instrument", "percussion"], u: "1fa87", a: "15" }, { n: ["fife", "pipe", "flute", "music", "recorder", "woodwind"], u: "1fa88", a: "15" }, { n: ["cell", "phone", "mobile", "telephone", "mobile phone"], u: "1f4f1", a: "0.6" }, { n: ["cell", "arrow", "phone", "mobile", "receive", "mobile phone with arrow"], u: "1f4f2", a: "0.6" }, { n: ["phone", "telephone"], u: "260e-fe0f", a: "0.6" }, { n: ["phone", "receiver", "telephone", "telephone receiver"], u: "1f4de", a: "0.6" }, { n: ["pager"], u: "1f4df", a: "0.6" }, { n: ["fax", "fax machine"], u: "1f4e0", a: "0.6" }, { n: ["battery"], u: "1f50b", a: "0.6" }, { n: ["electronic", "low energy", "low battery"], u: "1faab", a: "14" }, { n: ["plug", "electric", "electricity", "electric plug"], u: "1f50c", a: "0.6" }, { n: ["pc", "laptop", "computer", "personal"], u: "1f4bb", a: "0.6" }, { n: ["desktop", "computer", "desktop computer"], u: "1f5a5-fe0f", a: "0.7" }, { n: ["printer", "computer"], u: "1f5a8-fe0f", a: "0.7" }, { n: ["keyboard", "computer"], u: "2328-fe0f", a: "1" }, { n: ["computer", "computer mouse"], u: "1f5b1-fe0f", a: "0.7" }, { n: ["computer", "trackball"], u: "1f5b2-fe0f", a: "0.7" }, { n: ["disk", "optical", "computer", "minidisk", "computer disk"], u: "1f4bd", a: "0.6" }, { n: ["disk", "floppy", "computer", "floppy disk"], u: "1f4be", a: "0.6" }, { n: ["cd", "disk", "optical", "computer", "optical disk"], u: "1f4bf", a: "0.6" }, { n: ["dvd", "disk", "blu ray", "optical", "computer"], u: "1f4c0", a: "0.6" }, { n: ["abacus", "calculation"], u: "1f9ee", a: "11" }, { n: ["movie", "camera", "cinema", "movie camera"], u: "1f3a5", a: "0.6" }, { n: ["film", "movie", "cinema", "frames", "film frames"], u: "1f39e-fe0f", a: "0.7" }, { n: ["film", "movie", "video", "cinema", "projector", "film projector"], u: "1f4fd-fe0f", a: "0.7" }, { n: ["movie", "clapper", "clapper board"], u: "1f3ac", a: "0.6" }, { n: ["tv", "video", "television"], u: "1f4fa", a: "0.6" }, { n: ["video", "camera"], u: "1f4f7", a: "0.6" }, { n: ["flash", "video", "camera", "camera with flash"], u: "1f4f8", a: "1" }, { n: ["video", "camera", "video camera"], u: "1f4f9", a: "0.6" }, { n: ["vhs", "tape", "video", "videocassette"], u: "1f4fc", a: "0.6" }, { n: ["tool", "glass", "search", "magnifying", "magnifying glass tilted left"], u: "1f50d", a: "0.6" }, { n: ["tool", "glass", "search", "magnifying", "magnifying glass tilted right"], u: "1f50e", a: "0.6" }, { n: ["light", "candle"], u: "1f56f-fe0f", a: "0.7" }, { n: ["bulb", "idea", "comic", "light", "electric", "light bulb"], u: "1f4a1", a: "0.6" }, { n: ["tool", "light", "torch", "electric", "flashlight"], u: "1f526", a: "0.6" }, { n: ["bar", "red", "light", "lantern", "red paper lantern"], u: "1f3ee", a: "0.6" }, { n: ["oil", "diya", "lamp", "diya lamp"], u: "1fa94", a: "12" }, { n: ["book", "cover", "notebook", "decorated", "notebook with decorative cover"], u: "1f4d4", a: "0.6" }, { n: ["book", "closed", "closed book"], u: "1f4d5", a: "0.6" }, { n: ["book", "open", "open book"], u: "1f4d6", a: "0.6" }, { n: ["book", "green", "green book"], u: "1f4d7", a: "0.6" }, { n: ["blue", "book", "blue book"], u: "1f4d8", a: "0.6" }, { n: ["book", "orange", "orange book"], u: "1f4d9", a: "0.6" }, { n: ["book", "books"], u: "1f4da", a: "0.6" }, { n: ["notebook"], u: "1f4d3", a: "0.6" }, { n: ["ledger", "notebook"], u: "1f4d2", a: "0.6" }, { n: ["curl", "page", "document", "page with curl"], u: "1f4c3", a: "0.6" }, { n: ["paper", "scroll"], u: "1f4dc", a: "0.6" }, { n: ["page", "document", "page facing up"], u: "1f4c4", a: "0.6" }, { n: ["news", "paper", "newspaper"], u: "1f4f0", a: "0.6" }, { n: ["news", "paper", "rolled", "newspaper", "rolled up newspaper"], u: "1f5de-fe0f", a: "0.7" }, { n: ["mark", "tabs", "marker", "bookmark", "bookmark tabs"], u: "1f4d1", a: "0.6" }, { n: ["mark", "bookmark"], u: "1f516", a: "0.6" }, { n: ["label"], u: "1f3f7-fe0f", a: "0.7" }, { n: ["bag", "money", "dollar", "moneybag", "money bag"], u: "1f4b0", a: "0.6" }, { n: ["coin", "gold", "metal", "money", "silver", "treasure"], u: "1fa99", a: "13" }, { n: ["yen", "bill", "note", "money", "banknote", "currency", "yen banknote"], u: "1f4b4", a: "0.6" }, { n: ["bill", "note", "money", "dollar", "banknote", "currency", "dollar banknote"], u: "1f4b5", a: "0.6" }, { n: ["bill", "euro", "note", "money", "banknote", "currency", "euro banknote"], u: "1f4b6", a: "1" }, { n: ["bill", "note", "money", "pound", "banknote", "currency", "pound banknote"], u: "1f4b7", a: "1" }, { n: ["fly", "bill", "money", "wings", "banknote", "money with wings"], u: "1f4b8", a: "0.6" }, { n: ["card", "money", "credit", "credit card"], u: "1f4b3", a: "0.6" }, { n: ["proof", "receipt", "evidence", "accounting", "bookkeeping"], u: "1f9fe", a: "11" }, { n: ["yen", "chart", "graph", "money", "growth", "chart increasing with yen"], u: "1f4b9", a: "0.6" }, { n: ["email", "letter", "envelope"], u: "2709-fe0f", a: "0.6" }, { n: ["mail", "email", "e mail", "letter"], u: "1f4e7", a: "0.6" }, { n: ["email", "e mail", "letter", "receive", "envelope", "incoming", "incoming envelope"], u: "1f4e8", a: "0.6" }, { n: ["arrow", "email", "e mail", "envelope", "outgoing", "envelope with arrow"], u: "1f4e9", a: "0.6" }, { n: ["box", "mail", "sent", "tray", "letter", "outbox", "outbox tray"], u: "1f4e4", a: "0.6" }, { n: ["box", "mail", "tray", "inbox", "letter", "receive", "inbox tray"], u: "1f4e5", a: "0.6" }, { n: ["box", "parcel", "package"], u: "1f4e6", a: "0.6" }, { n: ["mail", "closed", "mailbox", "postbox", "closed mailbox with raised flag"], u: "1f4eb", a: "0.6" }, { n: ["mail", "closed", "lowered", "mailbox", "postbox", "closed mailbox with lowered flag"], u: "1f4ea", a: "0.6" }, { n: ["mail", "open", "mailbox", "postbox", "open mailbox with raised flag"], u: "1f4ec", a: "0.7" }, { n: ["mail", "open", "lowered", "mailbox", "postbox", "open mailbox with lowered flag"], u: "1f4ed", a: "0.7" }, { n: ["mail", "postbox", "mailbox"], u: "1f4ee", a: "0.6" }, { n: ["box", "ballot", "ballot box with ballot"], u: "1f5f3-fe0f", a: "0.7" }, { n: ["pencil"], u: "270f-fe0f", a: "0.6" }, { n: ["nib", "pen", "black nib"], u: "2712-fe0f", a: "0.6" }, { n: ["pen", "fountain", "fountain pen"], u: "1f58b-fe0f", a: "0.7" }, { n: ["pen", "ballpoint"], u: "1f58a-fe0f", a: "0.7" }, { n: ["painting", "paintbrush"], u: "1f58c-fe0f", a: "0.7" }, { n: ["crayon"], u: "1f58d-fe0f", a: "0.7" }, { n: ["memo", "pencil"], u: "1f4dd", a: "0.6" }, { n: ["briefcase"], u: "1f4bc", a: "0.6" }, { n: ["file", "folder", "file folder"], u: "1f4c1", a: "0.6" }, { n: ["file", "open", "folder", "open file folder"], u: "1f4c2", a: "0.6" }, { n: ["card", "index", "dividers", "card index dividers"], u: "1f5c2-fe0f", a: "0.7" }, { n: ["date", "calendar"], u: "1f4c5", a: "0.6" }, { n: ["calendar", "tear off calendar"], u: "1f4c6", a: "0.6" }, { n: ["pad", "note", "spiral", "spiral notepad"], u: "1f5d2-fe0f", a: "0.7" }, { n: ["pad", "spiral", "calendar", "spiral calendar"], u: "1f5d3-fe0f", a: "0.7" }, { n: ["card", "index", "rolodex", "card index"], u: "1f4c7", a: "0.6" }, { n: ["chart", "graph", "trend", "growth", "upward", "chart increasing"], u: "1f4c8", a: "0.6" }, { n: ["down", "chart", "graph", "trend", "chart decreasing"], u: "1f4c9", a: "0.6" }, { n: ["bar", "chart", "graph", "bar chart"], u: "1f4ca", a: "0.6" }, { n: ["clipboard"], u: "1f4cb", a: "0.6" }, { n: ["pin", "pushpin"], u: "1f4cc", a: "0.6" }, { n: ["pin", "pushpin", "round pushpin"], u: "1f4cd", a: "0.6" }, { n: ["paperclip"], u: "1f4ce", a: "0.6" }, { n: ["link", "paperclip", "linked paperclips"], u: "1f587-fe0f", a: "0.7" }, { n: ["ruler", "straight edge", "straight ruler"], u: "1f4cf", a: "0.6" }, { n: ["set", "ruler", "triangle", "triangular ruler"], u: "1f4d0", a: "0.6" }, { n: ["tool", "cutting", "scissors"], u: "2702-fe0f", a: "0.6" }, { n: ["box", "card", "file", "card file box"], u: "1f5c3-fe0f", a: "0.7" }, { n: ["file", "filing", "cabinet", "file cabinet"], u: "1f5c4-fe0f", a: "0.7" }, { n: ["wastebasket"], u: "1f5d1-fe0f", a: "0.7" }, { n: ["locked", "closed"], u: "1f512", a: "0.6" }, { n: ["lock", "open", "unlock", "unlocked"], u: "1f513", a: "0.6" }, { n: ["ink", "nib", "pen", "lock", "privacy", "locked with pen"], u: "1f50f", a: "0.6" }, { n: ["key", "lock", "closed", "secure", "locked with key"], u: "1f510", a: "0.6" }, { n: ["key", "lock", "password"], u: "1f511", a: "0.6" }, { n: ["key", "old", "clue", "lock", "old key"], u: "1f5dd-fe0f", a: "0.7" }, { n: ["tool", "hammer"], u: "1f528", a: "0.6" }, { n: ["axe", "chop", "wood", "split", "hatchet"], u: "1fa93", a: "12" }, { n: ["pick", "tool", "mining"], u: "26cf-fe0f", a: "0.7" }, { n: ["pick", "tool", "hammer", "hammer and pick"], u: "2692-fe0f", a: "1" }, { n: ["tool", "hammer", "wrench", "spanner", "hammer and wrench"], u: "1f6e0-fe0f", a: "0.7" }, { n: ["knife", "dagger", "weapon"], u: "1f5e1-fe0f", a: "0.7" }, { n: ["swords", "weapon", "crossed", "crossed swords"], u: "2694-fe0f", a: "1" }, { n: ["bomb", "comic"], u: "1f4a3", a: "0.6" }, { n: ["rebound", "boomerang", "repercussion"], u: "1fa83", a: "13" }, { n: ["bow", "arrow", "archer", "zodiac", "sagittarius", "bow and arrow"], u: "1f3f9", a: "1" }, { n: ["shield", "weapon"], u: "1f6e1-fe0f", a: "0.7" }, { n: ["saw", "tool", "lumber", "carpenter", "carpentry saw"], u: "1fa9a", a: "13" }, { n: ["tool", "wrench", "spanner"], u: "1f527", a: "0.6" }, { n: ["tool", "screw", "screwdriver"], u: "1fa9b", a: "13" }, { n: ["nut", "bolt", "tool", "nut and bolt"], u: "1f529", a: "0.6" }, { n: ["cog", "gear", "tool", "cogwheel"], u: "2699-fe0f", a: "1" }, { n: ["tool", "vice", "clamp", "compress"], u: "1f5dc-fe0f", a: "0.7" }, { n: ["libra", "scale", "zodiac", "balance", "justice", "balance scale"], u: "2696-fe0f", a: "1" }, { n: ["blind", "white cane", "accessibility"], u: "1f9af", a: "12" }, { n: ["link"], u: "1f517", a: "0.6" }, { n: ["break", "chain", "cuffs", "freedom", "breaking", "broken chain"], u: "26d3-fe0f-200d-1f4a5", a: "15.1" }, { n: ["chain", "chains"], u: "26d3-fe0f", a: "0.7" }, { n: ["hook", "catch", "crook", "curve", "ensnare", "selling point"], u: "1fa9d", a: "13" }, { n: ["tool", "chest", "toolbox", "mechanic"], u: "1f9f0", a: "11" }, { n: ["magnet", "magnetic", "horseshoe", "attraction"], u: "1f9f2", a: "11" }, { n: ["rung", "step", "climb", "ladder"], u: "1fa9c", a: "13" }, { n: ["tool", "alembic", "chemistry"], u: "2697-fe0f", a: "1" }, { n: ["lab", "chemist", "science", "test tube", "chemistry", "experiment"], u: "1f9ea", a: "11" }, { n: ["lab", "biology", "culture", "bacteria", "biologist", "petri dish"], u: "1f9eb", a: "11" }, { n: ["dna", "gene", "life", "genetics", "biologist", "evolution"], u: "1f9ec", a: "11" }, { n: ["tool", "science", "microscope"], u: "1f52c", a: "1" }, { n: ["tool", "science", "telescope"], u: "1f52d", a: "1" }, { n: ["dish", "antenna", "satellite", "satellite antenna"], u: "1f4e1", a: "0.6" }, { n: ["shot", "sick", "needle", "syringe", "medicine"], u: "1f489", a: "0.6" }, { n: ["bleed", "injury", "medicine", "menstruation", "drop of blood", "blood donation"], u: "1fa78", a: "12" }, { n: ["pill", "sick", "doctor", "medicine"], u: "1f48a", a: "0.6" }, { n: ["bandage", "adhesive bandage"], u: "1fa79", a: "12" }, { n: ["cane", "hurt", "stick", "crutch", "disability", "mobility aid"], u: "1fa7c", a: "14" }, { n: ["heart", "doctor", "medicine", "stethoscope"], u: "1fa7a", a: "12" }, { n: ["x ray", "bones", "doctor", "medical", "skeleton"], u: "1fa7b", a: "14" }, { n: ["door"], u: "1f6aa", a: "0.6" }, { n: ["lift", "hoist", "elevator", "accessibility"], u: "1f6d7", a: "13" }, { n: ["mirror", "speculum", "reflector", "reflection"], u: "1fa9e", a: "13" }, { n: ["view", "frame", "window", "opening", "fresh air", "transparent"], u: "1fa9f", a: "13" }, { n: ["bed", "hotel", "sleep"], u: "1f6cf-fe0f", a: "0.7" }, { n: ["lamp", "couch", "hotel", "couch and lamp"], u: "1f6cb-fe0f", a: "0.7" }, { n: ["sit", "seat", "chair"], u: "1fa91", a: "12" }, { n: ["toilet"], u: "1f6bd", a: "0.6" }, { n: ["toilet", "plunger", "plumber", "suction", "force cup"], u: "1faa0", a: "13" }, { n: ["water", "shower"], u: "1f6bf", a: "1" }, { n: ["bath", "bathtub"], u: "1f6c1", a: "1" }, { n: ["bait", "trap", "snare", "mousetrap", "mouse trap"], u: "1faa4", a: "13" }, { n: ["razor", "sharp", "shave"], u: "1fa92", a: "12" }, { n: ["lotion", "shampoo", "sunscreen", "moisturizer", "lotion bottle"], u: "1f9f4", a: "11" }, { n: ["diaper", "punk rock", "safety pin"], u: "1f9f7", a: "11" }, { n: ["broom", "witch", "cleaning", "sweeping"], u: "1f9f9", a: "11" }, { n: ["basket", "picnic", "farming", "laundry"], u: "1f9fa", a: "11" }, { n: ["paper towels", "toilet paper", "roll of paper"], u: "1f9fb", a: "11" }, { n: ["vat", "cask", "pail", "bucket"], u: "1faa3", a: "13" }, { n: ["bar", "soap", "lather", "bathing", "cleaning", "soapdish"], u: "1f9fc", a: "11" }, { n: ["burp", "soap", "clean", "bubbles", "underwater"], u: "1fae7", a: "14" }, { n: ["brush", "clean", "teeth", "dental", "hygiene", "bathroom", "toothbrush"], u: "1faa5", a: "13" }, { n: ["sponge", "porous", "cleaning", "absorbing"], u: "1f9fd", a: "11" }, { n: ["fire", "quench", "extinguish", "fire extinguisher"], u: "1f9ef", a: "11" }, { n: ["cart", "trolley", "shopping", "shopping cart"], u: "1f6d2", a: "3" }, { n: ["smoking", "cigarette"], u: "1f6ac", a: "0.6" }, { n: ["death", "coffin"], u: "26b0-fe0f", a: "1" }, { n: ["grave", "cemetery", "headstone", "graveyard", "tombstone"], u: "1faa6", a: "13" }, { n: ["urn", "ashes", "death", "funeral", "funeral urn"], u: "26b1-fe0f", a: "1" }, { n: ["bead", "charm", "nazar", "evil eye", "talisman", "nazar amulet"], u: "1f9ff", a: "11" }, { n: ["hand", "mary", "hamsa", "amulet", "fatima", "miriam", "protection"], u: "1faac", a: "14" }, { n: ["moai", "face", "moyai", "statue"], u: "1f5ff", a: "0.6" }, { n: ["sign", "picket", "placard", "protest", "demonstration"], u: "1faa7", a: "13" }, { n: ["id", "license", "security", "credentials", "identification card"], u: "1faaa", a: "14" }], symbols: [{ n: ["atm", "bank", "teller", "ATM sign", "atm sign", "automated"], u: "1f3e7", a: "0.6" }, { n: ["litter", "litter bin", "litter in bin sign"], u: "1f6ae", a: "1" }, { n: ["water", "potable", "drinking", "potable water"], u: "1f6b0", a: "1" }, { n: ["access", "wheelchair symbol"], u: "267f", a: "0.6" }, { n: ["wc", "man", "toilet", "bathroom", "lavatory", "restroom", "men\u2019s room"], u: "1f6b9", a: "0.6" }, { n: ["wc", "woman", "toilet", "bathroom", "lavatory", "restroom", "women\u2019s room"], u: "1f6ba", a: "0.6" }, { n: ["wc", "toilet", "restroom", "bathroom", "lavatory"], u: "1f6bb", a: "0.6" }, { n: ["baby", "changing", "baby symbol"], u: "1f6bc", a: "0.6" }, { n: ["wc", "water", "closet", "toilet", "bathroom", "lavatory", "restroom", "water closet"], u: "1f6be", a: "0.6" }, { n: ["control", "passport", "passport control"], u: "1f6c2", a: "1" }, { n: ["customs"], u: "1f6c3", a: "1" }, { n: ["claim", "baggage", "baggage claim"], u: "1f6c4", a: "1" }, { n: ["locker", "baggage", "luggage", "left luggage"], u: "1f6c5", a: "1" }, { n: ["warning"], u: "26a0-fe0f", a: "0.6" }, { n: ["child", "traffic", "crossing", "pedestrian", "children crossing"], u: "1f6b8", a: "1" }, { n: ["no", "not", "entry", "traffic", "no entry", "forbidden", "prohibited"], u: "26d4", a: "0.6" }, { n: ["no", "not", "entry", "forbidden", "prohibited"], u: "1f6ab", a: "0.6" }, { n: ["no", "bike", "bicycle", "forbidden", "prohibited", "no bicycles"], u: "1f6b3", a: "1" }, { n: ["no", "not", "smoking", "forbidden", "no smoking", "prohibited"], u: "1f6ad", a: "0.6" }, { n: ["no", "not", "litter", "forbidden", "prohibited", "no littering"], u: "1f6af", a: "1" }, { n: ["water", "non potable", "non drinking", "non potable water"], u: "1f6b1", a: "1" }, { n: ["no", "not", "forbidden", "pedestrian", "prohibited", "no pedestrians"], u: "1f6b7", a: "1" }, { n: ["no", "cell", "phone", "mobile", "forbidden", "no mobile phones"], u: "1f4f5", a: "1" }, { n: ["18", "eighteen", "underage", "prohibited", "age restriction", "no one under eighteen"], u: "1f51e", a: "0.6" }, { n: ["sign", "radioactive"], u: "2622-fe0f", a: "1" }, { n: ["sign", "biohazard"], u: "2623-fe0f", a: "1" }, { n: ["arrow", "north", "up arrow", "cardinal", "direction"], u: "2b06-fe0f", a: "0.6" }, { n: ["arrow", "direction", "northeast", "intercardinal", "up right arrow"], u: "2197-fe0f", a: "0.6" }, { n: ["east", "arrow", "cardinal", "direction", "right arrow"], u: "27a1-fe0f", a: "0.6" }, { n: ["arrow", "direction", "southeast", "intercardinal", "down right arrow"], u: "2198-fe0f", a: "0.6" }, { n: ["down", "arrow", "south", "cardinal", "direction", "down arrow"], u: "2b07-fe0f", a: "0.6" }, { n: ["arrow", "direction", "southwest", "intercardinal", "down left arrow"], u: "2199-fe0f", a: "0.6" }, { n: ["west", "arrow", "cardinal", "direction", "left arrow"], u: "2b05-fe0f", a: "0.6" }, { n: ["arrow", "direction", "northwest", "up left arrow", "intercardinal"], u: "2196-fe0f", a: "0.6" }, { n: ["arrow", "up down arrow"], u: "2195-fe0f", a: "0.6" }, { n: ["arrow", "left right arrow"], u: "2194-fe0f", a: "0.6" }, { n: ["arrow", "right arrow curving left"], u: "21a9-fe0f", a: "0.6" }, { n: ["arrow", "left arrow curving right"], u: "21aa-fe0f", a: "0.6" }, { n: ["arrow", "right arrow curving up"], u: "2934-fe0f", a: "0.6" }, { n: ["down", "arrow", "right arrow curving down"], u: "2935-fe0f", a: "0.6" }, { n: ["arrow", "reload", "clockwise", "clockwise vertical arrows"], u: "1f503", a: "0.6" }, { n: ["arrow", "withershins", "anticlockwise", "counterclockwise", "counterclockwise arrows button"], u: "1f504", a: "1" }, { n: ["back", "arrow", "BACK arrow"], u: "1f519", a: "0.6" }, { n: ["end", "arrow", "END arrow"], u: "1f51a", a: "0.6" }, { n: ["on", "on!", "mark", "arrow", "ON! arrow"], u: "1f51b", a: "0.6" }, { n: ["soon", "arrow", "SOON arrow"], u: "1f51c", a: "0.6" }, { n: ["up", "top", "arrow", "TOP arrow"], u: "1f51d", a: "0.6" }, { n: ["worship", "religion", "place of worship"], u: "1f6d0", a: "1" }, { n: ["atom", "atheist", "atom symbol"], u: "269b-fe0f", a: "1" }, { n: ["om", "hindu", "religion"], u: "1f549-fe0f", a: "0.7" }, { n: ["jew", "star", "david", "jewish", "religion", "star of David", "star of david"], u: "2721-fe0f", a: "0.7" }, { n: ["wheel", "dharma", "buddhist", "religion", "wheel of dharma"], u: "2638-fe0f", a: "0.7" }, { n: ["tao", "yin", "yang", "taoist", "yin yang", "religion"], u: "262f-fe0f", a: "0.7" }, { n: ["cross", "religion", "christian", "latin cross"], u: "271d-fe0f", a: "0.7" }, { n: ["cross", "religion", "christian", "orthodox cross"], u: "2626-fe0f", a: "1" }, { n: ["islam", "muslim", "religion", "star and crescent"], u: "262a-fe0f", a: "0.7" }, { n: ["peace", "peace symbol"], u: "262e-fe0f", a: "1" }, { n: ["menorah", "religion", "candelabrum", "candlestick"], u: "1f54e", a: "1" }, { n: ["star", "fortune", "dotted six pointed star"], u: "1f52f", a: "0.6" }, { n: ["sikh", "khanda", "religion"], u: "1faaf", a: "15" }, { n: ["ram", "Aries", "aries", "zodiac"], u: "2648", a: "0.6" }, { n: ["ox", "bull", "Taurus", "taurus", "zodiac"], u: "2649", a: "0.6" }, { n: ["twins", "Gemini", "gemini", "zodiac"], u: "264a", a: "0.6" }, { n: ["crab", "Cancer", "cancer", "zodiac"], u: "264b", a: "0.6" }, { n: ["Leo", "leo", "lion", "zodiac"], u: "264c", a: "0.6" }, { n: ["Virgo", "virgo", "zodiac"], u: "264d", a: "0.6" }, { n: ["Libra", "libra", "scales", "zodiac", "balance", "justice"], u: "264e", a: "0.6" }, { n: ["zodiac", "Scorpio", "scorpio", "scorpion", "scorpius"], u: "264f", a: "0.6" }, { n: ["archer", "zodiac", "Sagittarius", "sagittarius"], u: "2650", a: "0.6" }, { n: ["goat", "zodiac", "Capricorn", "capricorn"], u: "2651", a: "0.6" }, { n: ["water", "bearer", "zodiac", "Aquarius", "aquarius"], u: "2652", a: "0.6" }, { n: ["fish", "Pisces", "pisces", "zodiac"], u: "2653", a: "0.6" }, { n: ["snake", "bearer", "zodiac", "serpent", "Ophiuchus", "ophiuchus"], u: "26ce", a: "0.6" }, { n: ["arrow", "crossed", "shuffle tracks button"], u: "1f500", a: "1" }, { n: ["arrow", "repeat", "clockwise", "repeat button"], u: "1f501", a: "1" }, { n: ["once", "arrow", "clockwise", "repeat single button"], u: "1f502", a: "1" }, { n: ["play", "arrow", "right", "triangle", "play button"], u: "25b6-fe0f", a: "0.6" }, { n: ["fast", "arrow", "double", "forward", "fast forward button"], u: "23e9", a: "0.6" }, { n: ["arrow", "triangle", "next scene", "next track", "next track button"], u: "23ed-fe0f", a: "0.7" }, { n: ["play", "arrow", "pause", "right", "triangle", "play or pause button"], u: "23ef-fe0f", a: "1" }, { n: ["left", "arrow", "reverse", "triangle", "reverse button"], u: "25c0-fe0f", a: "0.6" }, { n: ["arrow", "double", "rewind", "fast reverse button"], u: "23ea", a: "0.6" }, { n: ["arrow", "triangle", "previous scene", "previous track", "last track button"], u: "23ee-fe0f", a: "0.7" }, { n: ["arrow", "button", "upwards button"], u: "1f53c", a: "0.6" }, { n: ["arrow", "double", "fast up button"], u: "23eb", a: "0.6" }, { n: ["down", "arrow", "button", "downwards button"], u: "1f53d", a: "0.6" }, { n: ["down", "arrow", "double", "fast down button"], u: "23ec", a: "0.6" }, { n: ["bar", "pause", "double", "vertical", "pause button"], u: "23f8-fe0f", a: "0.7" }, { n: ["stop", "square", "stop button"], u: "23f9-fe0f", a: "0.7" }, { n: ["circle", "record", "record button"], u: "23fa-fe0f", a: "0.7" }, { n: ["eject", "eject button"], u: "23cf-fe0f", a: "1" }, { n: ["film", "movie", "cinema", "camera"], u: "1f3a6", a: "0.6" }, { n: ["dim", "low", "dim button", "brightness"], u: "1f505", a: "1" }, { n: ["bright", "brightness", "bright button"], u: "1f506", a: "1" }, { n: ["bar", "cell", "phone", "mobile", "antenna", "antenna bars"], u: "1f4f6", a: "0.6" }, { n: ["wifi", "wi fi", "network", "wireless", "computer", "internet"], u: "1f6dc", a: "15" }, { n: ["cell", "mode", "phone", "mobile", "telephone", "vibration", "vibration mode"], u: "1f4f3", a: "0.6" }, { n: ["off", "cell", "phone", "mobile", "telephone", "mobile phone off"], u: "1f4f4", a: "0.6" }, { n: ["woman", "female sign"], u: "2640-fe0f", a: "4" }, { n: ["man", "male sign"], u: "2642-fe0f", a: "4" }, { n: ["transgender", "transgender symbol"], u: "26a7-fe0f", a: "13" }, { n: ["x", "\xD7", "sign", "cancel", "multiply", "multiplication"], u: "2716-fe0f", a: "0.6" }, { n: ["+", "plus", "math", "sign"], u: "2795", a: "0.6" }, { n: [" ", "\u2212", "math", "sign", "minus"], u: "2796", a: "0.6" }, { n: ["\xF7", "math", "sign", "divide", "division"], u: "2797", a: "0.6" }, { n: ["math", "equality", "heavy equals sign"], u: "1f7f0", a: "14" }, { n: ["forever", "infinity", "unbounded", "universal"], u: "267e-fe0f", a: "11" }, { n: ["!", "!!", "mark", "bangbang", "exclamation", "double exclamation mark"], u: "203c-fe0f", a: "0.6" }, { n: ["!", "?", "!?", "mark", "question", "exclamation", "interrobang", "punctuation", "exclamation question mark"], u: "2049-fe0f", a: "0.6" }, { n: ["?", "mark", "question", "punctuation", "red question mark"], u: "2753", a: "0.6" }, { n: ["?", "mark", "outlined", "question", "punctuation", "white question mark"], u: "2754", a: "0.6" }, { n: ["!", "mark", "outlined", "exclamation", "punctuation", "white exclamation mark"], u: "2755", a: "0.6" }, { n: ["!", "mark", "exclamation", "punctuation", "red exclamation mark"], u: "2757", a: "0.6" }, { n: ["dash", "wavy", "wavy dash", "punctuation"], u: "3030-fe0f", a: "0.6" }, { n: ["bank", "money", "currency", "exchange", "currency exchange"], u: "1f4b1", a: "0.6" }, { n: ["money", "dollar", "currency", "heavy dollar sign"], u: "1f4b2", a: "0.6" }, { n: ["staff", "medicine", "aesculapius", "medical symbol"], u: "2695-fe0f", a: "4" }, { n: ["recycle", "recycling symbol"], u: "267b-fe0f", a: "0.6" }, { n: ["fleur de lis"], u: "269c-fe0f", a: "1" }, { n: ["ship", "tool", "anchor", "emblem", "trident", "trident emblem"], u: "1f531", a: "0.6" }, { n: ["name", "badge", "name badge"], u: "1f4db", a: "0.6" }, { n: ["leaf", "chevron", "beginner", "japanese", "Japanese symbol for beginner", "japanese symbol for beginner"], u: "1f530", a: "0.6" }, { n: ["o", "red", "large", "circle", "hollow red circle"], u: "2b55", a: "0.6" }, { n: ["\u2713", "mark", "check", "button", "check mark button"], u: "2705", a: "0.6" }, { n: ["\u2713", "box", "check", "check box with check"], u: "2611-fe0f", a: "0.6" }, { n: ["\u2713", "mark", "check", "check mark"], u: "2714-fe0f", a: "0.6" }, { n: ["x", "\xD7", "mark", "cross", "cancel", "multiply", "cross mark", "multiplication"], u: "274c", a: "0.6" }, { n: ["x", "\xD7", "mark", "square", "cross mark button"], u: "274e", a: "0.6" }, { n: ["curl", "loop", "curly loop"], u: "27b0", a: "0.6" }, { n: ["curl", "loop", "double", "double curly loop"], u: "27bf", a: "1" }, { n: ["mark", "part", "part alternation mark"], u: "303d-fe0f", a: "0.6" }, { n: ["*", "asterisk", "eight spoked asterisk"], u: "2733-fe0f", a: "0.6" }, { n: ["*", "star", "eight pointed star"], u: "2734-fe0f", a: "0.6" }, { n: ["*", "sparkle"], u: "2747-fe0f", a: "0.6" }, { n: ["c", "copyright"], u: "00a9-fe0f", a: "0.6" }, { n: ["r", "registered"], u: "00ae-fe0f", a: "0.6" }, { n: ["tm", "mark", "trademark", "trade mark"], u: "2122-fe0f", a: "0.6" }, { n: ["keycap", "keycap: #"], u: "0023-fe0f-20e3", a: "0.6" }, { n: ["keycap", "keycap: *"], u: "002a-fe0f-20e3", a: "2" }, { n: ["keycap", "keycap: 0"], u: "0030-fe0f-20e3", a: "0.6" }, { n: ["keycap", "keycap: 1"], u: "0031-fe0f-20e3", a: "0.6" }, { n: ["keycap", "keycap: 2"], u: "0032-fe0f-20e3", a: "0.6" }, { n: ["keycap", "keycap: 3"], u: "0033-fe0f-20e3", a: "0.6" }, { n: ["keycap", "keycap: 4"], u: "0034-fe0f-20e3", a: "0.6" }, { n: ["keycap", "keycap: 5"], u: "0035-fe0f-20e3", a: "0.6" }, { n: ["keycap", "keycap: 6"], u: "0036-fe0f-20e3", a: "0.6" }, { n: ["keycap", "keycap: 7"], u: "0037-fe0f-20e3", a: "0.6" }, { n: ["keycap", "keycap: 8"], u: "0038-fe0f-20e3", a: "0.6" }, { n: ["keycap", "keycap: 9"], u: "0039-fe0f-20e3", a: "0.6" }, { n: ["keycap", "keycap: 10"], u: "1f51f", a: "0.6" }, { n: ["abcd", "input", "latin", "letters", "uppercase", "input latin uppercase"], u: "1f520", a: "0.6" }, { n: ["abcd", "input", "latin", "letters", "lowercase", "input latin lowercase"], u: "1f521", a: "0.6" }, { n: ["1234", "input", "numbers", "input numbers"], u: "1f522", a: "0.6" }, { n: ["\u3012\u266A&%", "input", "input symbols"], u: "1f523", a: "0.6" }, { n: ["abc", "input", "latin", "letters", "alphabet", "input latin letters"], u: "1f524", a: "0.6" }, { n: ["a", "blood type", "A button (blood type)", "a button (blood type)"], u: "1f170-fe0f", a: "0.6" }, { n: ["ab", "blood type", "AB button (blood type)", "ab button (blood type)"], u: "1f18e", a: "0.6" }, { n: ["b", "blood type", "B button (blood type)", "b button (blood type)"], u: "1f171-fe0f", a: "0.6" }, { n: ["cl", "CL button", "cl button"], u: "1f191", a: "0.6" }, { n: ["cool", "COOL button", "cool button"], u: "1f192", a: "0.6" }, { n: ["free", "FREE button", "free button"], u: "1f193", a: "0.6" }, { n: ["i", "information"], u: "2139-fe0f", a: "0.6" }, { n: ["id", "identity", "ID button", "id button"], u: "1f194", a: "0.6" }, { n: ["m", "circle", "circled M", "circled m"], u: "24c2-fe0f", a: "0.6" }, { n: ["new", "NEW button", "new button"], u: "1f195", a: "0.6" }, { n: ["ng", "NG button", "ng button"], u: "1f196", a: "0.6" }, { n: ["o", "blood type", "O button (blood type)", "o button (blood type)"], u: "1f17e-fe0f", a: "0.6" }, { n: ["ok", "OK button", "ok button"], u: "1f197", a: "0.6" }, { n: ["p", "parking", "P button", "p button"], u: "1f17f-fe0f", a: "0.6" }, { n: ["sos", "help", "SOS button", "sos button"], u: "1f198", a: "0.6" }, { n: ["up", "up!", "mark", "UP! button", "up! button"], u: "1f199", a: "0.6" }, { n: ["vs", "versus", "VS button", "vs button"], u: "1f19a", a: "0.6" }, { n: ["\u30B3\u30B3", "\u201Chere\u201D", "japanese", "katakana", "Japanese \u201Chere\u201D button", "japanese \u201Chere\u201D button"], u: "1f201", a: "0.6" }, { n: ["\u30B5", "japanese", "katakana", "\u201Cservice charge\u201D", "Japanese \u201Cservice charge\u201D button", "japanese \u201Cservice charge\u201D button"], u: "1f202-fe0f", a: "0.6" }, { n: ["\u6708", "japanese", "ideograph", "\u201Cmonthly amount\u201D", "Japanese \u201Cmonthly amount\u201D button", "japanese \u201Cmonthly amount\u201D button"], u: "1f237-fe0f", a: "0.6" }, { n: ["\u6709", "japanese", "ideograph", "\u201Cnot free of charge\u201D", "Japanese \u201Cnot free of charge\u201D button", "japanese \u201Cnot free of charge\u201D button"], u: "1f236", a: "0.6" }, { n: ["\u6307", "japanese", "ideograph", "\u201Creserved\u201D", "Japanese \u201Creserved\u201D button", "japanese \u201Creserved\u201D button"], u: "1f22f", a: "0.6" }, { n: ["\u5F97", "japanese", "ideograph", "\u201Cbargain\u201D", "Japanese \u201Cbargain\u201D button", "japanese \u201Cbargain\u201D button"], u: "1f250", a: "0.6" }, { n: ["\u5272", "japanese", "ideograph", "\u201Cdiscount\u201D", "Japanese \u201Cdiscount\u201D button", "japanese \u201Cdiscount\u201D button"], u: "1f239", a: "0.6" }, { n: ["\u7121", "japanese", "ideograph", "\u201Cfree of charge\u201D", "Japanese \u201Cfree of charge\u201D button", "japanese \u201Cfree of charge\u201D button"], u: "1f21a", a: "0.6" }, { n: ["\u7981", "japanese", "ideograph", "\u201Cprohibited\u201D", "Japanese \u201Cprohibited\u201D button", "japanese \u201Cprohibited\u201D button"], u: "1f232", a: "0.6" }, { n: ["\u53EF", "japanese", "ideograph", "\u201Cacceptable\u201D", "Japanese \u201Cacceptable\u201D button", "japanese \u201Cacceptable\u201D button"], u: "1f251", a: "0.6" }, { n: ["\u7533", "japanese", "ideograph", "\u201Capplication\u201D", "Japanese \u201Capplication\u201D button", "japanese \u201Capplication\u201D button"], u: "1f238", a: "0.6" }, { n: ["\u5408", "japanese", "ideograph", "\u201Cpassing grade\u201D", "Japanese \u201Cpassing grade\u201D button", "japanese \u201Cpassing grade\u201D button"], u: "1f234", a: "0.6" }, { n: ["\u7A7A", "japanese", "ideograph", "\u201Cvacancy\u201D", "Japanese \u201Cvacancy\u201D button", "japanese \u201Cvacancy\u201D button"], u: "1f233", a: "0.6" }, { n: ["\u795D", "japanese", "ideograph", "\u201Ccongratulations\u201D", "Japanese \u201Ccongratulations\u201D button", "japanese \u201Ccongratulations\u201D button"], u: "3297-fe0f", a: "0.6" }, { n: ["\u79D8", "japanese", "\u201Csecret\u201D", "ideograph", "Japanese \u201Csecret\u201D button", "japanese \u201Csecret\u201D button"], u: "3299-fe0f", a: "0.6" }, { n: ["\u55B6", "japanese", "ideograph", "\u201Copen for business\u201D", "Japanese \u201Copen for business\u201D button", "japanese \u201Copen for business\u201D button"], u: "1f23a", a: "0.6" }, { n: ["\u6E80", "japanese", "ideograph", "\u201Cno vacancy\u201D", "Japanese \u201Cno vacancy\u201D button", "japanese \u201Cno vacancy\u201D button"], u: "1f235", a: "0.6" }, { n: ["red", "circle", "geometric", "red circle"], u: "1f534", a: "0.6" }, { n: ["circle", "orange", "orange circle"], u: "1f7e0", a: "12" }, { n: ["circle", "yellow", "yellow circle"], u: "1f7e1", a: "12" }, { n: ["green", "circle", "green circle"], u: "1f7e2", a: "12" }, { n: ["blue", "circle", "geometric", "blue circle"], u: "1f535", a: "0.6" }, { n: ["circle", "purple", "purple circle"], u: "1f7e3", a: "12" }, { n: ["brown", "circle", "brown circle"], u: "1f7e4", a: "12" }, { n: ["circle", "geometric", "black circle"], u: "26ab", a: "0.6" }, { n: ["circle", "geometric", "white circle"], u: "26aa", a: "0.6" }, { n: ["red", "square", "red square"], u: "1f7e5", a: "12" }, { n: ["orange", "square", "orange square"], u: "1f7e7", a: "12" }, { n: ["square", "yellow", "yellow square"], u: "1f7e8", a: "12" }, { n: ["green", "square", "green square"], u: "1f7e9", a: "12" }, { n: ["blue", "square", "blue square"], u: "1f7e6", a: "12" }, { n: ["purple", "square", "purple square"], u: "1f7ea", a: "12" }, { n: ["brown", "square", "brown square"], u: "1f7eb", a: "12" }, { n: ["square", "geometric", "black large square"], u: "2b1b", a: "0.6" }, { n: ["square", "geometric", "white large square"], u: "2b1c", a: "0.6" }, { n: ["square", "geometric", "black medium square"], u: "25fc-fe0f", a: "0.6" }, { n: ["square", "geometric", "white medium square"], u: "25fb-fe0f", a: "0.6" }, { n: ["square", "geometric", "black medium small square"], u: "25fe", a: "0.6" }, { n: ["square", "geometric", "white medium small square"], u: "25fd", a: "0.6" }, { n: ["square", "geometric", "black small square"], u: "25aa-fe0f", a: "0.6" }, { n: ["square", "geometric", "white small square"], u: "25ab-fe0f", a: "0.6" }, { n: ["orange", "diamond", "geometric", "large orange diamond"], u: "1f536", a: "0.6" }, { n: ["blue", "diamond", "geometric", "large blue diamond"], u: "1f537", a: "0.6" }, { n: ["orange", "diamond", "geometric", "small orange diamond"], u: "1f538", a: "0.6" }, { n: ["blue", "diamond", "geometric", "small blue diamond"], u: "1f539", a: "0.6" }, { n: ["red", "geometric", "red triangle pointed up"], u: "1f53a", a: "0.6" }, { n: ["red", "down", "geometric", "red triangle pointed down"], u: "1f53b", a: "0.6" }, { n: ["comic", "inside", "diamond", "geometric", "diamond with a dot"], u: "1f4a0", a: "0.6" }, { n: ["radio", "button", "geometric", "radio button"], u: "1f518", a: "0.6" }, { n: ["button", "square", "outlined", "geometric", "white square button"], u: "1f533", a: "0.6" }, { n: ["button", "square", "geometric", "black square button"], u: "1f532", a: "0.6" }], flags: [{ n: ["racing", "checkered", "chequered", "chequered flag"], u: "1f3c1", a: "0.6" }, { n: ["post", "triangular flag"], u: "1f6a9", a: "0.6" }, { n: ["cross", "crossed", "japanese", "celebration", "crossed flags"], u: "1f38c", a: "0.6" }, { n: ["waving", "black flag"], u: "1f3f4", a: "1" }, { n: ["waving", "white flag"], u: "1f3f3-fe0f", a: "0.7" }, { n: ["pride", "rainbow", "rainbow flag"], u: "1f3f3-fe0f-200d-1f308", a: "4" }, { n: ["flag", "pink", "white", "light blue", "transgender", "transgender flag"], u: "1f3f3-fe0f-200d-26a7-fe0f", a: "13" }, { n: ["pirate", "plunder", "treasure", "pirate flag", "jolly roger"], u: "1f3f4-200d-2620-fe0f", a: "11" }, { n: ["AC", "flag", "flag: Ascension Island", "flag: ascension island"], u: "1f1e6-1f1e8", a: "2" }, { n: ["AD", "flag", "flag: Andorra", "flag: andorra"], u: "1f1e6-1f1e9", a: "2" }, { n: ["AE", "flag", "flag: United Arab Emirates", "flag: united arab emirates"], u: "1f1e6-1f1ea", a: "2" }, { n: ["AF", "flag", "flag: Afghanistan", "flag: afghanistan"], u: "1f1e6-1f1eb", a: "2" }, { n: ["AG", "flag", "flag: Antigua & Barbuda", "flag: antigua & barbuda"], u: "1f1e6-1f1ec", a: "2" }, { n: ["AI", "flag", "flag: Anguilla", "flag: anguilla"], u: "1f1e6-1f1ee", a: "2" }, { n: ["AL", "flag", "flag: Albania", "flag: albania"], u: "1f1e6-1f1f1", a: "2" }, { n: ["AM", "flag", "flag: Armenia", "flag: armenia"], u: "1f1e6-1f1f2", a: "2" }, { n: ["AO", "flag", "flag: Angola", "flag: angola"], u: "1f1e6-1f1f4", a: "2" }, { n: ["AQ", "flag", "flag: Antarctica", "flag: antarctica"], u: "1f1e6-1f1f6", a: "2" }, { n: ["AR", "flag", "flag: Argentina", "flag: argentina"], u: "1f1e6-1f1f7", a: "2" }, { n: ["AS", "flag", "flag: American Samoa", "flag: american samoa"], u: "1f1e6-1f1f8", a: "2" }, { n: ["AT", "flag", "flag: Austria", "flag: austria"], u: "1f1e6-1f1f9", a: "2" }, { n: ["AU", "flag", "flag: Australia", "flag: australia"], u: "1f1e6-1f1fa", a: "2" }, { n: ["AW", "flag", "flag: Aruba", "flag: aruba"], u: "1f1e6-1f1fc", a: "2" }, { n: ["AX", "flag", "flag: \xC5land Islands", "flag: \xE5land islands"], u: "1f1e6-1f1fd", a: "2" }, { n: ["AZ", "flag", "flag: Azerbaijan", "flag: azerbaijan"], u: "1f1e6-1f1ff", a: "2" }, { n: ["BA", "flag", "flag: Bosnia & Herzegovina", "flag: bosnia & herzegovina"], u: "1f1e7-1f1e6", a: "2" }, { n: ["BB", "flag", "flag: Barbados", "flag: barbados"], u: "1f1e7-1f1e7", a: "2" }, { n: ["BD", "flag", "flag: Bangladesh", "flag: bangladesh"], u: "1f1e7-1f1e9", a: "2" }, { n: ["BE", "flag", "flag: Belgium", "flag: belgium"], u: "1f1e7-1f1ea", a: "2" }, { n: ["BF", "flag", "flag: Burkina Faso", "flag: burkina faso"], u: "1f1e7-1f1eb", a: "2" }, { n: ["BG", "flag", "flag: Bulgaria", "flag: bulgaria"], u: "1f1e7-1f1ec", a: "2" }, { n: ["BH", "flag", "flag: Bahrain", "flag: bahrain"], u: "1f1e7-1f1ed", a: "2" }, { n: ["BI", "flag", "flag: Burundi", "flag: burundi"], u: "1f1e7-1f1ee", a: "2" }, { n: ["BJ", "flag", "flag: Benin", "flag: benin"], u: "1f1e7-1f1ef", a: "2" }, { n: ["BL", "flag", "flag: St. Barth\xE9lemy", "flag: st. barth\xE9lemy"], u: "1f1e7-1f1f1", a: "2" }, { n: ["BM", "flag", "flag: Bermuda", "flag: bermuda"], u: "1f1e7-1f1f2", a: "2" }, { n: ["BN", "flag", "flag: Brunei", "flag: brunei"], u: "1f1e7-1f1f3", a: "2" }, { n: ["BO", "flag", "flag: Bolivia", "flag: bolivia"], u: "1f1e7-1f1f4", a: "2" }, { n: ["BQ", "flag", "flag: Caribbean Netherlands", "flag: caribbean netherlands"], u: "1f1e7-1f1f6", a: "2" }, { n: ["BR", "flag", "flag: Brazil", "flag: brazil"], u: "1f1e7-1f1f7", a: "2" }, { n: ["BS", "flag", "flag: Bahamas", "flag: bahamas"], u: "1f1e7-1f1f8", a: "2" }, { n: ["BT", "flag", "flag: Bhutan", "flag: bhutan"], u: "1f1e7-1f1f9", a: "2" }, { n: ["BV", "flag", "flag: Bouvet Island", "flag: bouvet island"], u: "1f1e7-1f1fb", a: "2" }, { n: ["BW", "flag", "flag: Botswana", "flag: botswana"], u: "1f1e7-1f1fc", a: "2" }, { n: ["BY", "flag", "flag: Belarus", "flag: belarus"], u: "1f1e7-1f1fe", a: "2" }, { n: ["BZ", "flag", "flag: Belize", "flag: belize"], u: "1f1e7-1f1ff", a: "2" }, { n: ["CA", "flag", "flag: Canada", "flag: canada"], u: "1f1e8-1f1e6", a: "2" }, { n: ["CC", "flag", "flag: Cocos (Keeling) Islands", "flag: cocos (keeling) islands"], u: "1f1e8-1f1e8", a: "2" }, { n: ["CD", "flag", "flag: Congo   Kinshasa", "flag: congo   kinshasa"], u: "1f1e8-1f1e9", a: "2" }, { n: ["CF", "flag", "flag: Central African Republic", "flag: central african republic"], u: "1f1e8-1f1eb", a: "2" }, { n: ["CG", "flag", "flag: Congo   Brazzaville", "flag: congo   brazzaville"], u: "1f1e8-1f1ec", a: "2" }, { n: ["CH", "flag", "flag: Switzerland", "flag: switzerland"], u: "1f1e8-1f1ed", a: "2" }, { n: ["CI", "flag", "flag: C\xF4te d\u2019Ivoire", "flag: c\xF4te d\u2019ivoire"], u: "1f1e8-1f1ee", a: "2" }, { n: ["CK", "flag", "flag: Cook Islands", "flag: cook islands"], u: "1f1e8-1f1f0", a: "2" }, { n: ["CL", "flag", "flag: Chile", "flag: chile"], u: "1f1e8-1f1f1", a: "2" }, { n: ["CM", "flag", "flag: Cameroon", "flag: cameroon"], u: "1f1e8-1f1f2", a: "2" }, { n: ["CN", "flag", "flag: China", "flag: china"], u: "1f1e8-1f1f3", a: "0.6" }, { n: ["CO", "flag", "flag: Colombia", "flag: colombia"], u: "1f1e8-1f1f4", a: "2" }, { n: ["CP", "flag", "flag: Clipperton Island", "flag: clipperton island"], u: "1f1e8-1f1f5", a: "2" }, { n: ["CR", "flag", "flag: Costa Rica", "flag: costa rica"], u: "1f1e8-1f1f7", a: "2" }, { n: ["CU", "flag", "flag: Cuba", "flag: cuba"], u: "1f1e8-1f1fa", a: "2" }, { n: ["CV", "flag", "flag: Cape Verde", "flag: cape verde"], u: "1f1e8-1f1fb", a: "2" }, { n: ["CW", "flag", "flag: Cura\xE7ao", "flag: cura\xE7ao"], u: "1f1e8-1f1fc", a: "2" }, { n: ["CX", "flag", "flag: Christmas Island", "flag: christmas island"], u: "1f1e8-1f1fd", a: "2" }, { n: ["CY", "flag", "flag: Cyprus", "flag: cyprus"], u: "1f1e8-1f1fe", a: "2" }, { n: ["CZ", "flag", "flag: Czechia", "flag: czechia"], u: "1f1e8-1f1ff", a: "2" }, { n: ["DE", "flag", "flag: Germany", "flag: germany"], u: "1f1e9-1f1ea", a: "0.6" }, { n: ["DG", "flag", "flag: Diego Garcia", "flag: diego garcia"], u: "1f1e9-1f1ec", a: "2" }, { n: ["DJ", "flag", "flag: Djibouti", "flag: djibouti"], u: "1f1e9-1f1ef", a: "2" }, { n: ["DK", "flag", "flag: Denmark", "flag: denmark"], u: "1f1e9-1f1f0", a: "2" }, { n: ["DM", "flag", "flag: Dominica", "flag: dominica"], u: "1f1e9-1f1f2", a: "2" }, { n: ["DO", "flag", "flag: Dominican Republic", "flag: dominican republic"], u: "1f1e9-1f1f4", a: "2" }, { n: ["DZ", "flag", "flag: Algeria", "flag: algeria"], u: "1f1e9-1f1ff", a: "2" }, { n: ["EA", "flag", "flag: Ceuta & Melilla", "flag: ceuta & melilla"], u: "1f1ea-1f1e6", a: "2" }, { n: ["EC", "flag", "flag: Ecuador", "flag: ecuador"], u: "1f1ea-1f1e8", a: "2" }, { n: ["EE", "flag", "flag: Estonia", "flag: estonia"], u: "1f1ea-1f1ea", a: "2" }, { n: ["EG", "flag", "flag: Egypt", "flag: egypt"], u: "1f1ea-1f1ec", a: "2" }, { n: ["EH", "flag", "flag: Western Sahara", "flag: western sahara"], u: "1f1ea-1f1ed", a: "2" }, { n: ["ER", "flag", "flag: Eritrea", "flag: eritrea"], u: "1f1ea-1f1f7", a: "2" }, { n: ["ES", "flag", "flag: Spain", "flag: spain"], u: "1f1ea-1f1f8", a: "0.6" }, { n: ["ET", "flag", "flag: Ethiopia", "flag: ethiopia"], u: "1f1ea-1f1f9", a: "2" }, { n: ["EU", "flag", "flag: European Union", "flag: european union"], u: "1f1ea-1f1fa", a: "2" }, { n: ["FI", "flag", "flag: Finland", "flag: finland"], u: "1f1eb-1f1ee", a: "2" }, { n: ["FJ", "flag", "flag: Fiji", "flag: fiji"], u: "1f1eb-1f1ef", a: "2" }, { n: ["FK", "flag", "flag: Falkland Islands", "flag: falkland islands"], u: "1f1eb-1f1f0", a: "2" }, { n: ["FM", "flag", "flag: Micronesia", "flag: micronesia"], u: "1f1eb-1f1f2", a: "2" }, { n: ["FO", "flag", "flag: Faroe Islands", "flag: faroe islands"], u: "1f1eb-1f1f4", a: "2" }, { n: ["FR", "flag", "flag: France", "flag: france"], u: "1f1eb-1f1f7", a: "0.6" }, { n: ["GA", "flag", "flag: Gabon", "flag: gabon"], u: "1f1ec-1f1e6", a: "2" }, { n: ["GB", "flag", "flag: United Kingdom", "flag: united kingdom"], u: "1f1ec-1f1e7", a: "0.6" }, { n: ["GD", "flag", "flag: Grenada", "flag: grenada"], u: "1f1ec-1f1e9", a: "2" }, { n: ["GE", "flag", "flag: Georgia", "flag: georgia"], u: "1f1ec-1f1ea", a: "2" }, { n: ["GF", "flag", "flag: French Guiana", "flag: french guiana"], u: "1f1ec-1f1eb", a: "2" }, { n: ["GG", "flag", "flag: Guernsey", "flag: guernsey"], u: "1f1ec-1f1ec", a: "2" }, { n: ["GH", "flag", "flag: Ghana", "flag: ghana"], u: "1f1ec-1f1ed", a: "2" }, { n: ["GI", "flag", "flag: Gibraltar", "flag: gibraltar"], u: "1f1ec-1f1ee", a: "2" }, { n: ["GL", "flag", "flag: Greenland", "flag: greenland"], u: "1f1ec-1f1f1", a: "2" }, { n: ["GM", "flag", "flag: Gambia", "flag: gambia"], u: "1f1ec-1f1f2", a: "2" }, { n: ["GN", "flag", "flag: Guinea", "flag: guinea"], u: "1f1ec-1f1f3", a: "2" }, { n: ["GP", "flag", "flag: Guadeloupe", "flag: guadeloupe"], u: "1f1ec-1f1f5", a: "2" }, { n: ["GQ", "flag", "flag: Equatorial Guinea", "flag: equatorial guinea"], u: "1f1ec-1f1f6", a: "2" }, { n: ["GR", "flag", "flag: Greece", "flag: greece"], u: "1f1ec-1f1f7", a: "2" }, { n: ["GS", "flag", "flag: South Georgia & South Sandwich Islands", "flag: south georgia & south sandwich islands"], u: "1f1ec-1f1f8", a: "2" }, { n: ["GT", "flag", "flag: Guatemala", "flag: guatemala"], u: "1f1ec-1f1f9", a: "2" }, { n: ["GU", "flag", "flag: Guam", "flag: guam"], u: "1f1ec-1f1fa", a: "2" }, { n: ["GW", "flag", "flag: Guinea Bissau", "flag: guinea bissau"], u: "1f1ec-1f1fc", a: "2" }, { n: ["GY", "flag", "flag: Guyana", "flag: guyana"], u: "1f1ec-1f1fe", a: "2" }, { n: ["HK", "flag", "flag: Hong Kong SAR China", "flag: hong kong sar china"], u: "1f1ed-1f1f0", a: "2" }, { n: ["HM", "flag", "flag: Heard & McDonald Islands", "flag: heard & mcdonald islands"], u: "1f1ed-1f1f2", a: "2" }, { n: ["HN", "flag", "flag: Honduras", "flag: honduras"], u: "1f1ed-1f1f3", a: "2" }, { n: ["HR", "flag", "flag: Croatia", "flag: croatia"], u: "1f1ed-1f1f7", a: "2" }, { n: ["HT", "flag", "flag: Haiti", "flag: haiti"], u: "1f1ed-1f1f9", a: "2" }, { n: ["HU", "flag", "flag: Hungary", "flag: hungary"], u: "1f1ed-1f1fa", a: "2" }, { n: ["IC", "flag", "flag: Canary Islands", "flag: canary islands"], u: "1f1ee-1f1e8", a: "2" }, { n: ["ID", "flag", "flag: Indonesia", "flag: indonesia"], u: "1f1ee-1f1e9", a: "2" }, { n: ["IE", "flag", "flag: Ireland", "flag: ireland"], u: "1f1ee-1f1ea", a: "2" }, { n: ["IL", "flag", "flag: Israel", "flag: israel"], u: "1f1ee-1f1f1", a: "2" }, { n: ["IM", "flag", "flag: Isle of Man", "flag: isle of man"], u: "1f1ee-1f1f2", a: "2" }, { n: ["IN", "flag", "flag: India", "flag: india"], u: "1f1ee-1f1f3", a: "2" }, { n: ["IO", "flag", "flag: British Indian Ocean Territory", "flag: british indian ocean territory"], u: "1f1ee-1f1f4", a: "2" }, { n: ["IQ", "flag", "flag: Iraq", "flag: iraq"], u: "1f1ee-1f1f6", a: "2" }, { n: ["IR", "flag", "flag: Iran", "flag: iran"], u: "1f1ee-1f1f7", a: "2" }, { n: ["IS", "flag", "flag: Iceland", "flag: iceland"], u: "1f1ee-1f1f8", a: "2" }, { n: ["IT", "flag", "flag: Italy", "flag: italy"], u: "1f1ee-1f1f9", a: "0.6" }, { n: ["JE", "flag", "flag: Jersey", "flag: jersey"], u: "1f1ef-1f1ea", a: "2" }, { n: ["JM", "flag", "flag: Jamaica", "flag: jamaica"], u: "1f1ef-1f1f2", a: "2" }, { n: ["JO", "flag", "flag: Jordan", "flag: jordan"], u: "1f1ef-1f1f4", a: "2" }, { n: ["JP", "flag", "flag: Japan", "flag: japan"], u: "1f1ef-1f1f5", a: "0.6" }, { n: ["KE", "flag", "flag: Kenya", "flag: kenya"], u: "1f1f0-1f1ea", a: "2" }, { n: ["KG", "flag", "flag: Kyrgyzstan", "flag: kyrgyzstan"], u: "1f1f0-1f1ec", a: "2" }, { n: ["KH", "flag", "flag: Cambodia", "flag: cambodia"], u: "1f1f0-1f1ed", a: "2" }, { n: ["KI", "flag", "flag: Kiribati", "flag: kiribati"], u: "1f1f0-1f1ee", a: "2" }, { n: ["KM", "flag", "flag: Comoros", "flag: comoros"], u: "1f1f0-1f1f2", a: "2" }, { n: ["KN", "flag", "flag: St. Kitts & Nevis", "flag: st. kitts & nevis"], u: "1f1f0-1f1f3", a: "2" }, { n: ["KP", "flag", "flag: North Korea", "flag: north korea"], u: "1f1f0-1f1f5", a: "2" }, { n: ["KR", "flag", "flag: South Korea", "flag: south korea"], u: "1f1f0-1f1f7", a: "0.6" }, { n: ["KW", "flag", "flag: Kuwait", "flag: kuwait"], u: "1f1f0-1f1fc", a: "2" }, { n: ["KY", "flag", "flag: Cayman Islands", "flag: cayman islands"], u: "1f1f0-1f1fe", a: "2" }, { n: ["KZ", "flag", "flag: Kazakhstan", "flag: kazakhstan"], u: "1f1f0-1f1ff", a: "2" }, { n: ["LA", "flag", "flag: Laos", "flag: laos"], u: "1f1f1-1f1e6", a: "2" }, { n: ["LB", "flag", "flag: Lebanon", "flag: lebanon"], u: "1f1f1-1f1e7", a: "2" }, { n: ["LC", "flag", "flag: St. Lucia", "flag: st. lucia"], u: "1f1f1-1f1e8", a: "2" }, { n: ["LI", "flag", "flag: Liechtenstein", "flag: liechtenstein"], u: "1f1f1-1f1ee", a: "2" }, { n: ["LK", "flag", "flag: Sri Lanka", "flag: sri lanka"], u: "1f1f1-1f1f0", a: "2" }, { n: ["LR", "flag", "flag: Liberia", "flag: liberia"], u: "1f1f1-1f1f7", a: "2" }, { n: ["LS", "flag", "flag: Lesotho", "flag: lesotho"], u: "1f1f1-1f1f8", a: "2" }, { n: ["LT", "flag", "flag: Lithuania", "flag: lithuania"], u: "1f1f1-1f1f9", a: "2" }, { n: ["LU", "flag", "flag: Luxembourg", "flag: luxembourg"], u: "1f1f1-1f1fa", a: "2" }, { n: ["LV", "flag", "flag: Latvia", "flag: latvia"], u: "1f1f1-1f1fb", a: "2" }, { n: ["LY", "flag", "flag: Libya", "flag: libya"], u: "1f1f1-1f1fe", a: "2" }, { n: ["MA", "flag", "flag: Morocco", "flag: morocco"], u: "1f1f2-1f1e6", a: "2" }, { n: ["MC", "flag", "flag: Monaco", "flag: monaco"], u: "1f1f2-1f1e8", a: "2" }, { n: ["MD", "flag", "flag: Moldova", "flag: moldova"], u: "1f1f2-1f1e9", a: "2" }, { n: ["ME", "flag", "flag: Montenegro", "flag: montenegro"], u: "1f1f2-1f1ea", a: "2" }, { n: ["MF", "flag", "flag: St. Martin", "flag: st. martin"], u: "1f1f2-1f1eb", a: "2" }, { n: ["MG", "flag", "flag: Madagascar", "flag: madagascar"], u: "1f1f2-1f1ec", a: "2" }, { n: ["MH", "flag", "flag: Marshall Islands", "flag: marshall islands"], u: "1f1f2-1f1ed", a: "2" }, { n: ["MK", "flag", "flag: North Macedonia", "flag: north macedonia"], u: "1f1f2-1f1f0", a: "2" }, { n: ["ML", "flag", "flag: Mali", "flag: mali"], u: "1f1f2-1f1f1", a: "2" }, { n: ["MM", "flag", "flag: Myanmar (Burma)", "flag: myanmar (burma)"], u: "1f1f2-1f1f2", a: "2" }, { n: ["MN", "flag", "flag: Mongolia", "flag: mongolia"], u: "1f1f2-1f1f3", a: "2" }, { n: ["MO", "flag", "flag: Macao SAR China", "flag: macao sar china"], u: "1f1f2-1f1f4", a: "2" }, { n: ["MP", "flag", "flag: Northern Mariana Islands", "flag: northern mariana islands"], u: "1f1f2-1f1f5", a: "2" }, { n: ["MQ", "flag", "flag: Martinique", "flag: martinique"], u: "1f1f2-1f1f6", a: "2" }, { n: ["MR", "flag", "flag: Mauritania", "flag: mauritania"], u: "1f1f2-1f1f7", a: "2" }, { n: ["MS", "flag", "flag: Montserrat", "flag: montserrat"], u: "1f1f2-1f1f8", a: "2" }, { n: ["MT", "flag", "flag: Malta", "flag: malta"], u: "1f1f2-1f1f9", a: "2" }, { n: ["MU", "flag", "flag: Mauritius", "flag: mauritius"], u: "1f1f2-1f1fa", a: "2" }, { n: ["MV", "flag", "flag: Maldives", "flag: maldives"], u: "1f1f2-1f1fb", a: "2" }, { n: ["MW", "flag", "flag: Malawi", "flag: malawi"], u: "1f1f2-1f1fc", a: "2" }, { n: ["MX", "flag", "flag: Mexico", "flag: mexico"], u: "1f1f2-1f1fd", a: "2" }, { n: ["MY", "flag", "flag: Malaysia", "flag: malaysia"], u: "1f1f2-1f1fe", a: "2" }, { n: ["MZ", "flag", "flag: Mozambique", "flag: mozambique"], u: "1f1f2-1f1ff", a: "2" }, { n: ["NA", "flag", "flag: Namibia", "flag: namibia"], u: "1f1f3-1f1e6", a: "2" }, { n: ["NC", "flag", "flag: New Caledonia", "flag: new caledonia"], u: "1f1f3-1f1e8", a: "2" }, { n: ["NE", "flag", "flag: Niger", "flag: niger"], u: "1f1f3-1f1ea", a: "2" }, { n: ["NF", "flag", "flag: Norfolk Island", "flag: norfolk island"], u: "1f1f3-1f1eb", a: "2" }, { n: ["NG", "flag", "flag: Nigeria", "flag: nigeria"], u: "1f1f3-1f1ec", a: "2" }, { n: ["NI", "flag", "flag: Nicaragua", "flag: nicaragua"], u: "1f1f3-1f1ee", a: "2" }, { n: ["NL", "flag", "flag: Netherlands", "flag: netherlands"], u: "1f1f3-1f1f1", a: "2" }, { n: ["NO", "flag", "flag: Norway", "flag: norway"], u: "1f1f3-1f1f4", a: "2" }, { n: ["NP", "flag", "flag: Nepal", "flag: nepal"], u: "1f1f3-1f1f5", a: "2" }, { n: ["NR", "flag", "flag: Nauru", "flag: nauru"], u: "1f1f3-1f1f7", a: "2" }, { n: ["NU", "flag", "flag: Niue", "flag: niue"], u: "1f1f3-1f1fa", a: "2" }, { n: ["NZ", "flag", "flag: New Zealand", "flag: new zealand"], u: "1f1f3-1f1ff", a: "2" }, { n: ["OM", "flag", "flag: Oman", "flag: oman"], u: "1f1f4-1f1f2", a: "2" }, { n: ["PA", "flag", "flag: Panama", "flag: panama"], u: "1f1f5-1f1e6", a: "2" }, { n: ["PE", "flag", "flag: Peru", "flag: peru"], u: "1f1f5-1f1ea", a: "2" }, { n: ["PF", "flag", "flag: French Polynesia", "flag: french polynesia"], u: "1f1f5-1f1eb", a: "2" }, { n: ["PG", "flag", "flag: Papua New Guinea", "flag: papua new guinea"], u: "1f1f5-1f1ec", a: "2" }, { n: ["PH", "flag", "flag: Philippines", "flag: philippines"], u: "1f1f5-1f1ed", a: "2" }, { n: ["PK", "flag", "flag: Pakistan", "flag: pakistan"], u: "1f1f5-1f1f0", a: "2" }, { n: ["PL", "flag", "flag: Poland", "flag: poland"], u: "1f1f5-1f1f1", a: "2" }, { n: ["PM", "flag", "flag: St. Pierre & Miquelon", "flag: st. pierre & miquelon"], u: "1f1f5-1f1f2", a: "2" }, { n: ["PN", "flag", "flag: Pitcairn Islands", "flag: pitcairn islands"], u: "1f1f5-1f1f3", a: "2" }, { n: ["PR", "flag", "flag: Puerto Rico", "flag: puerto rico"], u: "1f1f5-1f1f7", a: "2" }, { n: ["PS", "flag", "flag: Palestinian Territories", "flag: palestinian territories"], u: "1f1f5-1f1f8", a: "2" }, { n: ["PT", "flag", "flag: Portugal", "flag: portugal"], u: "1f1f5-1f1f9", a: "2" }, { n: ["PW", "flag", "flag: Palau", "flag: palau"], u: "1f1f5-1f1fc", a: "2" }, { n: ["PY", "flag", "flag: Paraguay", "flag: paraguay"], u: "1f1f5-1f1fe", a: "2" }, { n: ["QA", "flag", "flag: Qatar", "flag: qatar"], u: "1f1f6-1f1e6", a: "2" }, { n: ["RE", "flag", "flag: R\xE9union", "flag: r\xE9union"], u: "1f1f7-1f1ea", a: "2" }, { n: ["RO", "flag", "flag: Romania", "flag: romania"], u: "1f1f7-1f1f4", a: "2" }, { n: ["RS", "flag", "flag: Serbia", "flag: serbia"], u: "1f1f7-1f1f8", a: "2" }, { n: ["RU", "flag", "flag: Russia", "flag: russia"], u: "1f1f7-1f1fa", a: "0.6" }, { n: ["RW", "flag", "flag: Rwanda", "flag: rwanda"], u: "1f1f7-1f1fc", a: "2" }, { n: ["SA", "flag", "flag: Saudi Arabia", "flag: saudi arabia"], u: "1f1f8-1f1e6", a: "2" }, { n: ["SB", "flag", "flag: Solomon Islands", "flag: solomon islands"], u: "1f1f8-1f1e7", a: "2" }, { n: ["SC", "flag", "flag: Seychelles", "flag: seychelles"], u: "1f1f8-1f1e8", a: "2" }, { n: ["SD", "flag", "flag: Sudan", "flag: sudan"], u: "1f1f8-1f1e9", a: "2" }, { n: ["SE", "flag", "flag: Sweden", "flag: sweden"], u: "1f1f8-1f1ea", a: "2" }, { n: ["SG", "flag", "flag: Singapore", "flag: singapore"], u: "1f1f8-1f1ec", a: "2" }, { n: ["SH", "flag", "flag: St. Helena", "flag: st. helena"], u: "1f1f8-1f1ed", a: "2" }, { n: ["SI", "flag", "flag: Slovenia", "flag: slovenia"], u: "1f1f8-1f1ee", a: "2" }, { n: ["SJ", "flag", "flag: Svalbard & Jan Mayen", "flag: svalbard & jan mayen"], u: "1f1f8-1f1ef", a: "2" }, { n: ["SK", "flag", "flag: Slovakia", "flag: slovakia"], u: "1f1f8-1f1f0", a: "2" }, { n: ["SL", "flag", "flag: Sierra Leone", "flag: sierra leone"], u: "1f1f8-1f1f1", a: "2" }, { n: ["SM", "flag", "flag: San Marino", "flag: san marino"], u: "1f1f8-1f1f2", a: "2" }, { n: ["SN", "flag", "flag: Senegal", "flag: senegal"], u: "1f1f8-1f1f3", a: "2" }, { n: ["SO", "flag", "flag: Somalia", "flag: somalia"], u: "1f1f8-1f1f4", a: "2" }, { n: ["SR", "flag", "flag: Suriname", "flag: suriname"], u: "1f1f8-1f1f7", a: "2" }, { n: ["SS", "flag", "flag: South Sudan", "flag: south sudan"], u: "1f1f8-1f1f8", a: "2" }, { n: ["ST", "flag", "flag: S\xE3o Tom\xE9 & Pr\xEDncipe", "flag: s\xE3o tom\xE9 & pr\xEDncipe"], u: "1f1f8-1f1f9", a: "2" }, { n: ["SV", "flag", "flag: El Salvador", "flag: el salvador"], u: "1f1f8-1f1fb", a: "2" }, { n: ["SX", "flag", "flag: Sint Maarten", "flag: sint maarten"], u: "1f1f8-1f1fd", a: "2" }, { n: ["SY", "flag", "flag: Syria", "flag: syria"], u: "1f1f8-1f1fe", a: "2" }, { n: ["SZ", "flag", "flag: Eswatini", "flag: eswatini"], u: "1f1f8-1f1ff", a: "2" }, { n: ["TA", "flag", "flag: Tristan da Cunha", "flag: tristan da cunha"], u: "1f1f9-1f1e6", a: "2" }, { n: ["TC", "flag", "flag: Turks & Caicos Islands", "flag: turks & caicos islands"], u: "1f1f9-1f1e8", a: "2" }, { n: ["TD", "flag", "flag: Chad", "flag: chad"], u: "1f1f9-1f1e9", a: "2" }, { n: ["TF", "flag", "flag: French Southern Territories", "flag: french southern territories"], u: "1f1f9-1f1eb", a: "2" }, { n: ["TG", "flag", "flag: Togo", "flag: togo"], u: "1f1f9-1f1ec", a: "2" }, { n: ["TH", "flag", "flag: Thailand", "flag: thailand"], u: "1f1f9-1f1ed", a: "2" }, { n: ["TJ", "flag", "flag: Tajikistan", "flag: tajikistan"], u: "1f1f9-1f1ef", a: "2" }, { n: ["TK", "flag", "flag: Tokelau", "flag: tokelau"], u: "1f1f9-1f1f0", a: "2" }, { n: ["TL", "flag", "flag: Timor Leste", "flag: timor leste"], u: "1f1f9-1f1f1", a: "2" }, { n: ["TM", "flag", "flag: Turkmenistan", "flag: turkmenistan"], u: "1f1f9-1f1f2", a: "2" }, { n: ["TN", "flag", "flag: Tunisia", "flag: tunisia"], u: "1f1f9-1f1f3", a: "2" }, { n: ["TO", "flag", "flag: Tonga", "flag: tonga"], u: "1f1f9-1f1f4", a: "2" }, { n: ["TR", "flag", "flag: T\xFCrkiye", "flag: t\xFCrkiye"], u: "1f1f9-1f1f7", a: "2" }, { n: ["TT", "flag", "flag: Trinidad & Tobago", "flag: trinidad & tobago"], u: "1f1f9-1f1f9", a: "2" }, { n: ["TV", "flag", "flag: Tuvalu", "flag: tuvalu"], u: "1f1f9-1f1fb", a: "2" }, { n: ["TW", "flag", "flag: Taiwan", "flag: taiwan"], u: "1f1f9-1f1fc", a: "2" }, { n: ["TZ", "flag", "flag: Tanzania", "flag: tanzania"], u: "1f1f9-1f1ff", a: "2" }, { n: ["UA", "flag", "flag: Ukraine", "flag: ukraine"], u: "1f1fa-1f1e6", a: "2" }, { n: ["UG", "flag", "flag: Uganda", "flag: uganda"], u: "1f1fa-1f1ec", a: "2" }, { n: ["UM", "flag", "flag: U.S. Outlying Islands", "flag: u.s. outlying islands"], u: "1f1fa-1f1f2", a: "2" }, { n: ["UN", "flag", "flag: United Nations", "flag: united nations"], u: "1f1fa-1f1f3", a: "4" }, { n: ["US", "flag", "flag: United States", "flag: united states"], u: "1f1fa-1f1f8", a: "0.6" }, { n: ["UY", "flag", "flag: Uruguay", "flag: uruguay"], u: "1f1fa-1f1fe", a: "2" }, { n: ["UZ", "flag", "flag: Uzbekistan", "flag: uzbekistan"], u: "1f1fa-1f1ff", a: "2" }, { n: ["VA", "flag", "flag: Vatican City", "flag: vatican city"], u: "1f1fb-1f1e6", a: "2" }, { n: ["VC", "flag", "flag: St. Vincent & Grenadines", "flag: st. vincent & grenadines"], u: "1f1fb-1f1e8", a: "2" }, { n: ["VE", "flag", "flag: Venezuela", "flag: venezuela"], u: "1f1fb-1f1ea", a: "2" }, { n: ["VG", "flag", "flag: British Virgin Islands", "flag: british virgin islands"], u: "1f1fb-1f1ec", a: "2" }, { n: ["VI", "flag", "flag: U.S. Virgin Islands", "flag: u.s. virgin islands"], u: "1f1fb-1f1ee", a: "2" }, { n: ["VN", "flag", "flag: Vietnam", "flag: vietnam"], u: "1f1fb-1f1f3", a: "2" }, { n: ["VU", "flag", "flag: Vanuatu", "flag: vanuatu"], u: "1f1fb-1f1fa", a: "2" }, { n: ["WF", "flag", "flag: Wallis & Futuna", "flag: wallis & futuna"], u: "1f1fc-1f1eb", a: "2" }, { n: ["WS", "flag", "flag: Samoa", "flag: samoa"], u: "1f1fc-1f1f8", a: "2" }, { n: ["XK", "flag", "flag: Kosovo", "flag: kosovo"], u: "1f1fd-1f1f0", a: "2" }, { n: ["YE", "flag", "flag: Yemen", "flag: yemen"], u: "1f1fe-1f1ea", a: "2" }, { n: ["YT", "flag", "flag: Mayotte", "flag: mayotte"], u: "1f1fe-1f1f9", a: "2" }, { n: ["ZA", "flag", "flag: South Africa", "flag: south africa"], u: "1f1ff-1f1e6", a: "2" }, { n: ["ZM", "flag", "flag: Zambia", "flag: zambia"], u: "1f1ff-1f1f2", a: "2" }, { n: ["ZW", "flag", "flag: Zimbabwe", "flag: zimbabwe"], u: "1f1ff-1f1fc", a: "2" }, { n: ["flag", "gbeng", "flag: England", "flag: england"], u: "1f3f4-e0067-e0062-e0065-e006e-e0067-e007f", a: "5" }, { n: ["flag", "gbsct", "flag: Scotland", "flag: scotland"], u: "1f3f4-e0067-e0062-e0073-e0063-e0074-e007f", a: "5" }, { n: ["flag", "gbwls", "flag: Wales", "flag: wales"], u: "1f3f4-e0067-e0062-e0077-e006c-e0073-e007f", a: "5" }] }, Mr = { categories: Wd, emojis: qd }, uf = "epr_suggested";
function vr(e) {
  try {
    var a, t, i;
    if (!((a = window) != null && a.localStorage)) return [];
    var r = JSON.parse((t = (i = window) == null ? void 0 : i.localStorage.getItem(uf)) != null ? t : "[]");
    return e === dt.FREQUENT ? r.sort(function(s, f) {
      return f.count - s.count;
    }) : r;
  } catch {
    return [];
  }
}
function Kd(e, a) {
  var t = vr(), i = zn(e, a), r = zn(e), s = t.find(function(d) {
    var u = d.unified;
    return u === i;
  }), f;
  s ? f = [s].concat(t.filter(function(d) {
    return d !== s;
  })) : (s = { unified: i, original: r, count: 0 }, f = [s].concat(t)), s.count++, f.length = Math.min(f.length, 14);
  try {
    var c;
    (c = window) == null || c.localStorage.setItem(uf, JSON.stringify(f));
  } catch {
  }
}
function Lr(e) {
  var a;
  return (a = e[nn.name]) != null ? a : [];
}
function js(e) {
  if (!e) return "";
  var a = Lr(e);
  return a[a.length - 1];
}
function hf(e) {
  var a = e.split("-"), t = a.splice(1, 1), i = t[0];
  return yr[i] ? a.join("-") : e;
}
function zn(e, a) {
  var t, i = e[nn.unified];
  return !a || !_a(e) ? i : (t = eu(e, a)) != null ? t : i;
}
function Xd() {
  var e = Lf(), a = Sr(), t = a[0], i = Ln.useMemo(function() {
    var r, s = (r = vr(e)) != null ? r : [];
    return s.map(function(f) {
      return ri(f.unified);
    }).filter(Boolean);
  }, [t, e]);
  return function(s) {
    var f;
    return s === je.SUGGESTED ? i : (f = Mr.emojis[s]) != null ? f : [];
  };
}
function ii(e) {
  var a;
  return (a = e[nn.variations]) != null ? a : [];
}
function _a(e) {
  return ii(e).length > 0;
}
function eu(e, a) {
  return a ? ii(e).find(function(t) {
    return t.includes(a);
  }) : zn(e);
}
function ri(e) {
  if (e) {
    if (Ot[e]) return Ot[e];
    var a = hf(e);
    return Ot[a];
  }
}
var nu = Object.values(Mr.emojis).flat(), Ot = {};
nu.reduce(function(e, a) {
  return e[zn(a)] = a, _a(a) && ii(a).forEach(function(t) {
    e[t] = a;
  }), e;
}, Ot);
function au(e) {
  var a = e.split("-"), t = a[1];
  return Qt.includes(t) ? t : null;
}
var mf = Ln.createContext({ emojiData: {}, allEmojis: [], allEmojisByUnified: {}, searchIndex: {}, emojiByUnified: ri, activeVariationFromUnified: function() {
  return null;
} });
function tu(e) {
  var a = e.children, t = Fe(), i = t.customEmojis, r = t.emojiData, s = Ln.useMemo(function() {
    var c = r || Mr, d = JSON.parse(JSON.stringify(c));
    i && i.length > 0 && (d.emojis[je.CUSTOM] = i.map(ru));
    var u = d.emojis || {}, h = Object.values(u).flat(), m = {}, p = {};
    return h.forEach(function(g) {
      var C = g[nn.unified];
      if (m[C] = g, g[nn.variations]) {
        var y;
        (y = g[nn.variations]) == null || y.forEach(function(T) {
          m[T] = g;
        });
      }
      var I = (g[nn.name] || []).join("").toLowerCase().split("");
      I.forEach(function(T) {
        var j;
        p[T] = (j = p[T]) != null ? j : {}, p[T][C] = g;
      });
    }), { emojiData: d, allEmojis: h, allEmojisByUnified: m, searchIndex: p };
  }, [r, i]), f = Ln.useCallback(function(c) {
    var d;
    if (c) {
      var u = (d = s.allEmojisByUnified[c]) != null ? d : s.allEmojisByUnified[af(c)];
      return u;
    }
  }, [s.allEmojisByUnified]);
  return Ln.createElement(mf.Provider, { value: Pe({}, s, { emojiByUnified: f, activeVariationFromUnified: Ud }) }, a);
}
function Fa() {
  return Ln.useContext(mf);
}
function iu() {
  var e = Fa(), a = e.emojiData, t = e.emojiByUnified, i = Lf(), r = Sr(), s = r[0], f = Ln.useMemo(function() {
    var c, d = (c = vr(i)) != null ? c : [];
    return d.map(function(u) {
      var h, m = t(u.unified);
      if (m) return Pe({}, m, (h = {}, h[nn.unified] = u.unified, h));
    }).filter(Boolean);
  }, [s, i, t]);
  return function(d) {
    var u, h;
    return d === je.SUGGESTED ? f : (u = (h = a.emojis) == null ? void 0 : h[d]) != null ? u : [];
  };
}
function ru(e) {
  var a;
  return a = {}, a[nn.name] = e.names.map(function(t) {
    return t.toLowerCase();
  }), a[nn.unified] = e.id.toLowerCase(), a[nn.added_in] = "0", a[nn.imgUrl] = e.imgUrl, a;
}
function su() {
  var e = Su();
  return function(a) {
    return e.has(a);
  };
}
function gf() {
  var e = o.useRef({}), a = Iu(), t = Fa(), i = t.allEmojis;
  return o.useMemo(function() {
    var r = parseFloat("" + a);
    return !a || Number.isNaN(r) ? e.current : i.reduce(function(s, f) {
      return fu(f, r) && (s[va(f)] = true), s;
    }, e.current);
  }, [a, i]);
}
function ou() {
  var e = gf(), a = su();
  return function(i) {
    var r = af(va(i));
    return !!(e[r] || a(r));
  };
}
function fu(e, a) {
  return zd(e) > a;
}
function cu(e) {
  o.useEffect(function() {
    e(true);
  }, [e]);
}
function lu(e) {
  var a = e.children, t = gf(), i = gu(), r = xu(), s = Fa(), f = s.searchIndex, c = o.useRef(f);
  o.useEffect(function() {
    c.current = f;
  }, [f]);
  var d = o.useRef(false), u = o.useRef(false), h = o.useRef(t), m = ys(Date.now(), 200), p = ys("", 100), g = o.useState(false), C = o.useState(i), y = o.useState(null), I = o.useState(/* @__PURE__ */ new Set()), T = o.useState(null), j = o.useState(r), E = o.useState(false), b = E[0], N = E[1], k = o.useState([]), B = o.useState(null);
  return cu(N), o.createElement(pn.Provider, { value: { activeCategoryState: y, activeSkinTone: C, disallowClickRef: d, disallowMouseRef: u, disallowedEmojisRef: h, emojiVariationPickerState: T, emojisThatFailedToLoadState: I, filterRef: c, isPastInitialLoad: b, searchTerm: p, skinToneFanOpenState: g, suggestedUpdateState: m, reactionsModeState: j, visibleCategoriesState: k, emojiSizeState: B } }, a);
}
var pn = o.createContext({ activeCategoryState: [null, function() {
}], activeSkinTone: [Nn.NEUTRAL, function() {
}], disallowClickRef: { current: false }, disallowMouseRef: { current: false }, disallowedEmojisRef: { current: {} }, emojiVariationPickerState: [null, function() {
}], emojisThatFailedToLoadState: [/* @__PURE__ */ new Set(), function() {
}], filterRef: { current: {} }, isPastInitialLoad: true, searchTerm: ["", function() {
  return new Promise(function() {
  });
}], skinToneFanOpenState: [false, function() {
}], suggestedUpdateState: [Date.now(), function() {
}], reactionsModeState: [false, function() {
}], visibleCategoriesState: [[], function() {
  return [];
}], emojiSizeState: [null, function() {
}] });
function Cr() {
  var e = o.useContext(pn), a = e.filterRef;
  return a;
}
function du() {
  var e = o.useContext(pn), a = e.disallowClickRef;
  return a;
}
function xr() {
  var e = o.useContext(pn), a = e.disallowMouseRef;
  return a;
}
function La() {
  var e = o.useContext(pn), a = e.reactionsModeState;
  return a;
}
function si() {
  var e = o.useContext(pn), a = e.searchTerm;
  return a;
}
function oi() {
  var e = o.useContext(pn), a = e.activeSkinTone;
  return a;
}
function pf() {
  var e = o.useContext(pn), a = e.emojisThatFailedToLoadState;
  return a;
}
function Ha() {
  var e = o.useContext(pn), a = e.emojiVariationPickerState;
  return a;
}
function Ct() {
  var e = o.useContext(pn), a = e.skinToneFanOpenState;
  return a;
}
function Ir() {
  var e = o.useContext(pn), a = e.visibleCategoriesState;
  return a;
}
function bf() {
  var e = o.useContext(pn), a = e.emojiSizeState;
  return a;
}
function Sr() {
  var e = o.useContext(pn), a = e.suggestedUpdateState, t = a[0], i = a[1];
  return [t, function() {
    i(Date.now());
  }];
}
var wf = Ln.createContext({});
function yf() {
  var e = Ln.useContext(wf);
  return e;
}
function uu(e) {
  var a = Ln.useRef({ onEmojiClick: e.onEmojiClick || It, onReactionClick: e.onReactionClick || e.onEmojiClick, onSkinToneChange: e.onSkinToneChange || It });
  return Ln.useEffect(function() {
    a.current.onEmojiClick = e.onEmojiClick || It, a.current.onReactionClick = e.onReactionClick || e.onEmojiClick;
  }, [e.onEmojiClick, e.onReactionClick]), Ln.useEffect(function() {
    a.current.onSkinToneChange = e.onSkinToneChange || It;
  }, [e.onSkinToneChange]), a;
}
function It() {
}
var ut;
(function(e) {
  e.REACTIONS = "reactions", e.PICKER = "picker";
})(ut || (ut = {}));
function hu() {
  var e, a = Fe(), t = a.searchPlaceHolder, i = a.searchPlaceholder;
  return (e = [t, i].find(function(r) {
    return r !== Jt;
  })) != null ? e : Jt;
}
function mu() {
  var e = Fe(), a = e.searchClearButtonLabel;
  return a ?? ff;
}
function gu() {
  var e = Fe(), a = e.defaultSkinTone;
  return a;
}
function jf() {
  var e = Fe(), a = e.allowExpandReactions;
  return a;
}
function Mf() {
  var e = Fe(), a = e.skinTonesDisabled;
  return a;
}
function Ca() {
  var e = Fe(), a = e.emojiStyle;
  return a;
}
function pu() {
  var e = Fe(), a = e.autoFocusSearch;
  return a;
}
function kr() {
  var e = Fe(), a = e.categories;
  return a;
}
function bu() {
  var e = Fe(), a = e.categoryIcons;
  return a;
}
function wu() {
  var e = Fe(), a = e.customEmojis;
  return a;
}
function yu() {
  var e = Fe(), a = e.open;
  return a;
}
function ju(e) {
  var a = yf(), t = a.current, i = La(), r = i[1], s = t.onEmojiClick || function() {
  }, f = t.onReactionClick;
  return e === ut.REACTIONS && f ? function() {
    for (var c = arguments.length, d = new Array(c), u = 0; u < c; u++) d[u] = arguments[u];
    return f.apply(void 0, d.concat([{ collapseToReactions: function() {
      r(function(m) {
        return m;
      });
    } }]));
  } : function() {
    for (var c = arguments.length, d = new Array(c), u = 0; u < c; u++) d[u] = arguments[u];
    s.apply(void 0, d.concat([{ collapseToReactions: function() {
      r(true);
    } }]));
  };
}
function Mu() {
  var e = yf(), a = e.current;
  return a.onSkinToneChange || function() {
  };
}
function vf() {
  var e = Fe(), a = e.previewConfig;
  return a;
}
function vu() {
  var e = Fe(), a = e.theme;
  return a;
}
function Lf() {
  var e = Fe(), a = e.suggestedEmojisMode;
  return a;
}
function Cf() {
  var e = Fe(), a = e.lazyLoadEmojis;
  return a;
}
function Lu() {
  var e = Fe(), a = e.className;
  return a;
}
function Cu() {
  var e = Fe(), a = e.height, t = e.width, i = e.style;
  return Pe({ height: Ms(a), width: Ms(t) }, i);
}
function xu() {
  var e = Fe(), a = e.reactionsDefaultOpen;
  return a;
}
function Iu() {
  var e = Fe(), a = e.emojiVersion;
  return a;
}
function xf() {
  var e = Fe(), a = e.searchDisabled;
  return a;
}
function If() {
  var e = Fe(), a = e.skinTonePickerLocation;
  return a;
}
function Su() {
  var e = Fe(), a = e.unicodeToHide;
  return a;
}
function ku() {
  var e = Fe(), a = e.reactions;
  return a;
}
function xa() {
  var e = Fe(), a = e.getEmojiUrl;
  return a;
}
function Ms(e) {
  return typeof e == "number" ? e + "px" : e;
}
function Nu(e) {
  var a = e > 0, t = e > 1;
  return a ? t ? Fd.replace("%n", e.toString()) : _d : Jd;
}
function fi() {
  var e = si(), a = e[0];
  return !!a;
}
function bn(e) {
  e && requestAnimationFrame(function() {
    e.focus();
  });
}
function Sf(e) {
  if (e) {
    var a = e.previousElementSibling;
    bn(a);
  }
}
function kf(e) {
  if (e) {
    var a = e.nextElementSibling;
    bn(a);
  }
}
function Nf(e) {
  if (e) {
    var a = e.firstElementChild;
    bn(a);
  }
}
function ht() {
  return document.activeElement;
}
function Eu(e) {
  var a = e.children, t = o.useRef(null), i = o.useRef(null), r = o.useRef(null), s = o.useRef(null), f = o.useRef(null), c = o.useRef(null), d = o.useRef(null), u = o.useRef(null), h = o.useRef(null);
  return o.createElement(Ef.Provider, { value: { AnchoredEmojiRef: i, BodyRef: r, EmojiListRef: s, CategoryNavigationRef: d, PickerMainRef: t, SearchInputRef: f, SkinTonePickerRef: c, VariationPickerRef: u, ReactionsRef: h } }, a);
}
var Ef = o.createContext({ AnchoredEmojiRef: o.createRef(), BodyRef: o.createRef(), CategoryNavigationRef: o.createRef(), EmojiListRef: o.createRef(), PickerMainRef: o.createRef(), SearchInputRef: o.createRef(), SkinTonePickerRef: o.createRef(), VariationPickerRef: o.createRef(), ReactionsRef: o.createRef() });
function Gn() {
  return o.useContext(Ef);
}
function Tf() {
  return Gn().EmojiListRef;
}
function $a() {
  return Gn().PickerMainRef;
}
function ci() {
  return Gn().AnchoredEmojiRef;
}
function Df() {
  var e = ci();
  return function(a) {
    a === null && e.current !== null && bn(e.current), e.current = a;
  };
}
function wn() {
  return Gn().BodyRef;
}
function Tu() {
  return Gn().ReactionsRef;
}
function aa() {
  return Gn().SearchInputRef;
}
function Nr() {
  return Gn().SkinTonePickerRef;
}
function Er() {
  return Gn().CategoryNavigationRef;
}
function Du() {
  return Gn().VariationPickerRef;
}
function Af(e, a) {
  a === void 0 && (a = 0);
  var t = $f(e);
  t && requestAnimationFrame(function() {
    t.scrollTop = a;
  });
}
function Au(e, a) {
  var t = $f(e);
  t && requestAnimationFrame(function() {
    t.scrollTop = t.scrollTop + a;
  });
}
function zu() {
  var e = wn();
  return o.useCallback(function(a) {
    requestAnimationFrame(function() {
      e.current && (e.current.scrollTop = a);
    });
  }, [e]);
}
function li(e) {
  if (!(!e || !y1(e)) && !e.closest(Sn(Ie.variationPicker))) {
    var a = Zf(e), t = Vf(e);
    Au(a, -(zr(ta(e)) - t));
  }
}
function di(e) {
  var a = Br(e);
  bn(a), li(a);
}
function Ru(e) {
  var a = Br(e);
  bn(a), a == null || a.click();
}
function Pu(e) {
  bn(Kf(e));
}
function Ou(e) {
  if (e) {
    var a = Xf(e);
    if (!a) return di(hi(e));
    bn(a), li(a);
  }
}
function Uu(e) {
  if (e) {
    var a = Ur(e);
    if (!a) return Pu(ui(e));
    bn(a), li(a);
  }
}
function Bu(e, a) {
  if (e) {
    var t = Yu(e);
    if (!t) return a();
    bn(t), li(t);
  }
}
function Gu(e) {
  if (e) {
    var a = Qu(e);
    return bn(a);
  }
}
function Yu(e) {
  if (!e) return null;
  var a = ec(e), t = ta(a), i = Jf(a, e), r = Ya(t), s = r.indexOf(e), f = s % i;
  if (s === -1) return null;
  if (r[s - i]) return r[s - i];
  var c = ui(t);
  if (!c) return null;
  var d = Ya(c), u = d.length % i - 1;
  if (f > u) return d.at(-1);
  for (var h = d.length - 1; h >= 0; h--) if (h % i === f) return d[h];
  return d.at(-1);
}
function Qu(e) {
  var a;
  if (!e) return null;
  var t = ec(e), i = ta(t), r = Jf(t, e), s = Ya(i), f = s.indexOf(e);
  if (f === -1) return null;
  var c = r - f % r - 1, d = f + c + 1;
  if (s[d]) {
    for (var u = f + r; u % r >= 0; u--) if (s[u]) return s[u];
  }
  var h = f % r, m = hi(i), p = Ya(m);
  return p[h] ? p[h] : (a = p.at(0)) != null ? a : null;
}
function Ia() {
  var e = Ha(), a = e[0], t = e[1], i = Ct(), r = i[0], s = i[1], f = o.useCallback(function() {
    a && t(null), r && s(false);
  }, [a, r, t, s]);
  return f;
}
function zf() {
  var e = Ha(), a = e[0], t = Ct(), i = t[0];
  return function() {
    return !!a || i;
  };
}
function Ju() {
  var e = xr();
  return function() {
    e.current = true;
  };
}
function Rf() {
  var e = xr();
  return function() {
    e.current = false;
  };
}
function Pf() {
  var e = xr();
  return function() {
    return e.current;
  };
}
function _u() {
  var e = wn(), a = Rf(), t = Pf();
  o.useEffect(function() {
    var i = e.current;
    i == null || i.addEventListener("mousemove", r, { passive: true });
    function r() {
      t() && a();
    }
    return function() {
      i == null || i.removeEventListener("mousemove", r);
    };
  }, [e, a, t]);
}
function Sa() {
  var e = aa();
  return o.useCallback(function() {
    bn(e.current);
  }, [e]);
}
function Fu() {
  var e = Nr();
  return o.useCallback(function() {
    e.current && Nf(e.current);
  }, [e]);
}
function Of() {
  var e = Er();
  return o.useCallback(function() {
    e.current && Nf(e.current);
  }, [e]);
}
function Hu() {
  var e = Cr();
  return function a(t) {
    if (typeof t == "function") return a(t(e.current));
    e.current = t;
  };
}
function Uf() {
  var e = Tr(), a = aa(), t = Sa();
  return function() {
    a.current && (a.current.value = ""), e(""), t();
  };
}
function $u() {
  var e = aa(), a = Tr();
  return function(i) {
    e.current ? (e.current.value = "" + e.current.value + i, a(vs(e.current.value))) : a(vs(i));
  };
}
function Vu() {
  var e = aa(), a = Cr(), t = Hu(), i = Tr(), r = si(), s = r[0], f = e1(a.current, s);
  return { onChange: c, searchTerm: s, SearchInputRef: e, statusSearchResults: f };
  function c(d) {
    var u = a.current, h = d.toLowerCase();
    if (u != null && u[h] || h.length <= 1) return i(h);
    var m = Xu(h, u);
    if (!m) return i(h);
    t(function(p) {
      var g;
      return Object.assign(p, (g = {}, g[h] = Zu(m, h), g));
    }), i(h);
  }
}
function Tr() {
  var e = si(), a = e[1], t = $a();
  return function(r) {
    requestAnimationFrame(function() {
      a(r && (r == null ? void 0 : r.toLowerCase())).then(function() {
        Af(t.current, 0);
      });
    });
  };
}
function Zu(e, a) {
  var t = {};
  for (var i in e) {
    var r = e[i];
    Wu(r, a) && (t[i] = r);
  }
  return t;
}
function Wu(e, a) {
  return nf(e).some(function(t) {
    return t.includes(a);
  });
}
function qu() {
  var e = Cr(), a = e.current, t = si(), i = t[0];
  return function(r) {
    return Ku(r, a, i);
  };
}
function Ku(e, a, t) {
  var i;
  return !a || !t ? false : !((i = a[t]) != null && i[e]);
}
function Xu(e, a) {
  if (!a) return null;
  if (a[e]) return a[e];
  var t = Object.keys(a).sort(function(i, r) {
    return r.length - i.length;
  }).find(function(i) {
    return e.includes(i);
  });
  return t ? a[t] : null;
}
function vs(e) {
  return !e || typeof e != "string" ? "" : e.trim().toLowerCase();
}
function e1(e, a) {
  var t;
  if (!(e != null && e[a])) return "";
  var i = ((t = Object.entries(e == null ? void 0 : e[a])) == null ? void 0 : t.length) || 0;
  return Nu(i);
}
function Bf() {
  var e = Df(), a = Ha(), t = a[1];
  return function(r) {
    var s = Ff(r), f = s[0];
    f && (e(r), t(f));
  };
}
function Dr() {
  var e = If();
  return e === Ga.SEARCH;
}
function Gf() {
  var e = If();
  return e === Ga.PREVIEW;
}
var qe;
(function(e) {
  e.ArrowDown = "ArrowDown", e.ArrowUp = "ArrowUp", e.ArrowLeft = "ArrowLeft", e.ArrowRight = "ArrowRight", e.Escape = "Escape", e.Enter = "Enter", e.Space = " ";
})(qe || (qe = {}));
function n1() {
  a1(), t1(), i1(), r1(), s1();
}
function a1() {
  var e = $a(), a = Uf(), t = zu(), i = aa(), r = Sa(), s = zf(), f = Ju(), c = Ia(), d = o.useMemo(function() {
    return function(h) {
      var m = h.key;
      switch (f(), m) {
        case qe.Escape:
          if (h.preventDefault(), s()) {
            c();
            return;
          }
          a(), t(0), r();
          break;
      }
    };
  }, [t, a, c, r, s, f]);
  o.useEffect(function() {
    var u = e.current;
    if (u) return u.addEventListener("keydown", d), function() {
      u.removeEventListener("keydown", d);
    };
  }, [e, i, t, d]);
}
function t1() {
  var e = Fu(), a = $a(), t = wn(), i = aa(), r = Ct(), s = r[1], f = Yf(), c = Dr(), d = o.useMemo(function() {
    return function(h) {
      var m = h.key;
      switch (m) {
        case qe.ArrowRight:
          if (!c) return;
          h.preventDefault(), s(true), e();
          break;
        case qe.ArrowDown:
          h.preventDefault(), f();
          break;
        case qe.Enter:
          h.preventDefault(), Ru(t.current);
          break;
      }
    };
  }, [e, f, s, t, c]);
  o.useEffect(function() {
    var u = i.current;
    if (u) return u.addEventListener("keydown", d), function() {
      u.removeEventListener("keydown", d);
    };
  }, [a, i, d]);
}
function i1() {
  var e = Nr(), a = Sa(), t = aa(), i = Yf(), r = Ct(), s = r[0], f = r[1], c = Gf(), d = Dr(), u = Ar(), h = o.useMemo(function() {
    return (function(p) {
      var g = p.key;
      if (d) switch (g) {
        case qe.ArrowLeft:
          if (p.preventDefault(), !s) return a();
          Ls(a);
          break;
        case qe.ArrowRight:
          if (p.preventDefault(), !s) return a();
          Cs();
          break;
        case qe.ArrowDown:
          p.preventDefault(), s && f(false), i();
          break;
        default:
          u(p);
          break;
      }
      if (c) switch (g) {
        case qe.ArrowUp:
          if (p.preventDefault(), !s) return a();
          Ls(a);
          break;
        case qe.ArrowDown:
          if (p.preventDefault(), !s) return a();
          Cs();
          break;
        default:
          u(p);
          break;
      }
    });
  }, [s, a, f, i, u, c, d]);
  o.useEffect(function() {
    var m = e.current;
    if (m) return m.addEventListener("keydown", h), function() {
      m.removeEventListener("keydown", h);
    };
  }, [e, t, s, h]);
}
function r1() {
  var e = Sa(), a = Er(), t = wn(), i = Ar(), r = o.useMemo(function() {
    return function(f) {
      var c = f.key;
      switch (c) {
        case qe.ArrowUp:
          f.preventDefault(), e();
          break;
        case qe.ArrowRight:
          f.preventDefault(), kf(ht());
          break;
        case qe.ArrowLeft:
          f.preventDefault(), Sf(ht());
          break;
        case qe.ArrowDown:
          f.preventDefault(), di(t.current);
          break;
        default:
          i(f);
          break;
      }
    };
  }, [t, e, i]);
  o.useEffect(function() {
    var s = a.current;
    if (s) return s.addEventListener("keydown", r), function() {
      s.removeEventListener("keydown", r);
    };
  }, [a, t, r]);
}
function s1() {
  var e = wn(), a = o1(), t = Bf(), i = zf(), r = Ia(), s = Ar(), f = o.useMemo(function() {
    return (function(d) {
      var u = d.key, h = En(ht());
      switch (u) {
        case qe.ArrowRight:
          d.preventDefault(), Ou(h);
          break;
        case qe.ArrowLeft:
          d.preventDefault(), Uu(h);
          break;
        case qe.ArrowDown:
          if (d.preventDefault(), i()) {
            r();
            break;
          }
          Gu(h);
          break;
        case qe.ArrowUp:
          if (d.preventDefault(), i()) {
            r();
            break;
          }
          Bu(h, a);
          break;
        case qe.Space:
          d.preventDefault(), t(d.target);
          break;
        default:
          s(d);
          break;
      }
    });
  }, [a, s, t, i, r]);
  o.useEffect(function() {
    var c = e.current;
    if (c) return c.addEventListener("keydown", f), function() {
      c.removeEventListener("keydown", f);
    };
  }, [e, f]);
}
function Yf() {
  var e = Of(), a = fi(), t = wn();
  return o.useCallback(function() {
    return a ? di(t.current) : e();
  }, [t, e, a]);
}
function o1() {
  var e = Sa(), a = Of(), t = fi();
  return o.useCallback(function() {
    return t ? e() : a();
  }, [e, t, a]);
}
function Ls(e) {
  var a = ht();
  a && (p1(a) || e(), kf(a));
}
function Cs() {
  var e = ht();
  e && Sf(e);
}
function Ar() {
  var e = $u(), a = Sa(), t = xf(), i = Ia();
  return function(s) {
    var f = s.key;
    f1(s) || t || f.match(/(^[a-zA-Z0-9]$){1}/) && (s.preventDefault(), i(), a(), e(f));
  };
}
function f1(e) {
  var a = e.metaKey, t = e.ctrlKey, i = e.altKey;
  return a || t || i;
}
function c1(e, a, t, i, r, s, f, c) {
  if (e && a !== hn.NATIVE) {
    var d = va(e);
    Vi.has(d) || !s || !f || setTimeout(function() {
      var u = r + s.top, h = t + i, m = u >= h && u < h + f.emojiSize * 2;
      m && Qf(c, e, a);
    });
  }
}
function Qf(e, a, t) {
  if (a) {
    var i = va(a);
    Vi.has(i) || (Vi.add(i), jr(a).concat(i).forEach(function(r) {
      var s = e(r, t);
      l1(s);
    }));
  }
}
var Vi = /* @__PURE__ */ new Set();
function l1(e) {
  var a = new Image();
  a.src = e;
}
function d1() {
  var e = wn(), a = Ca(), t = xa();
  o.useEffect(function() {
    if (a === hn.NATIVE) return;
    var i = e.current;
    return i == null || i.addEventListener("focusin", r), function() {
      i == null || i.removeEventListener("focusin", r);
    };
    function r(s) {
      var f = En(s.target);
      if (f) {
        var c = Ff(f), d = c[0];
        d && _a(d) && Qf(t, d, a);
      }
    }
  }, [e, a, t]);
}
var u1 = ["width", "height"], Zi = 40;
function h1(e) {
  var a = e.children;
  return o.createElement(lu, null, o.createElement(m1, null, a));
}
function m1(e) {
  var a, t = e.children, i = La(), r = i[0], s = vu(), f = fi(), c = $a(), d = Lu(), u = Cu();
  n1(), d1();
  var h = u || {}, m = h.width, p = h.height, g = Xo(h, u1);
  return o.createElement("aside", { className: Ce(Ka.main, Ka.baseVariables, s === Ba.DARK && Ka.darkTheme, s === Ba.AUTO && Ka.autoThemeDark, (a = {}, a[Ie.searchActive] = f, a), r && Ka.reactionsMenu, d), ref: c, style: Pe({}, g, !r && { height: p, width: m }) }, t);
}
var xs = { "--epr-emoji-variation-picker-bg-color": "var(--epr-dark-emoji-variation-picker-bg-color)", "--epr-hover-bg-color-reduced-opacity": "var(--epr-dark-hover-bg-color-reduced-opacity)", "--epr-highlight-color": "var(--epr-dark-highlight-color)", "--epr-text-color": "var(--epr-dark-text-color)", "--epr-hover-bg-color": "var(--epr-dark-hover-bg-color)", "--epr-focus-bg-color": "var(--epr-dark-focus-bg-color)", "--epr-search-input-bg-color": "var(--epr-dark-search-input-bg-color)", "--epr-category-label-bg-color": "var(--epr-dark-category-label-bg-color)", "--epr-picker-border-color": "var(--epr-dark-picker-border-color)", "--epr-bg-color": "var(--epr-dark-bg-color)", "--epr-reactions-bg-color": "var(--epr-dark-reactions-bg-color)", "--epr-search-input-bg-color-active": "var(--epr-dark-search-input-bg-color-active)", "--epr-emoji-variation-indicator-color": "var(--epr-dark-emoji-variation-indicator-color)", "--epr-category-icon-active-color": "var(--epr-dark-category-icon-active-color)", "--epr-skin-tone-picker-menu-color": "var(--epr-dark-skin-tone-picker-menu-color)", "--epr-skin-tone-outer-border-color": "var(--epr-dark-skin-tone-outer-border-color)", "--epr-skin-tone-inner-border-color": "var(--epr-dark-skin-tone-inner-border-color)" }, Ka = He.create({ main: { ".": ["epr-main", Ie.emojiPicker], position: "relative", display: "flex", flexDirection: "column", borderWidth: "1px", borderStyle: "solid", borderRadius: "var(--epr-picker-border-radius)", borderColor: "var(--epr-picker-border-color)", backgroundColor: "var(--epr-bg-color)", overflow: "hidden", transition: "height 0.3s ease-in-out, background-color 0.1s ease-in-out", "*": { boxSizing: "border-box", fontFamily: "sans-serif" } }, baseVariables: { "--": { "--epr-highlight-color": "#007aeb", "--epr-hover-bg-color": "#e5f0fa", "--epr-hover-bg-color-reduced-opacity": "#e5f0fa80", "--epr-focus-bg-color": "#e0f0ff", "--epr-text-color": "#858585", "--epr-search-input-bg-color": "#f6f6f6", "--epr-picker-border-color": "#e7e7e7", "--epr-bg-color": "#fff", "--epr-reactions-bg-color": "#ffffff90", "--epr-category-icon-active-color": "#6aa8de", "--epr-skin-tone-picker-menu-color": "#ffffff95", "--epr-skin-tone-outer-border-color": "#555555", "--epr-skin-tone-inner-border-color": "var(--epr-bg-color)", "--epr-horizontal-padding": "10px", "--epr-picker-border-radius": "8px", "--epr-header-padding": "15px var(--epr-horizontal-padding)", "--epr-active-skin-tone-indicator-border-color": "var(--epr-highlight-color)", "--epr-active-skin-hover-color": "var(--epr-hover-bg-color)", "--epr-search-input-bg-color-active": "var(--epr-search-input-bg-color)", "--epr-search-input-padding": "0 30px", "--epr-search-input-border-radius": "8px", "--epr-search-input-height": "40px", "--epr-search-input-text-color": "var(--epr-text-color)", "--epr-search-input-placeholder-color": "var(--epr-text-color)", "--epr-search-bar-inner-padding": "var(--epr-horizontal-padding)", "--epr-search-border-color": "var(--epr-search-input-bg-color)", "--epr-search-border-color-active": "var(--epr-highlight-color)", "--epr-category-navigation-button-size": "30px", "--epr-emoji-variation-picker-height": "45px", "--epr-emoji-variation-picker-bg-color": "var(--epr-bg-color)", "--epr-preview-height": "70px", "--epr-preview-text-size": "14px", "--epr-preview-text-padding": "0 var(--epr-horizontal-padding)", "--epr-preview-border-color": "var(--epr-picker-border-color)", "--epr-preview-text-color": "var(--epr-text-color)", "--epr-category-padding": "0 var(--epr-horizontal-padding)", "--epr-category-label-bg-color": "#ffffffe6", "--epr-category-label-text-color": "var(--epr-text-color)", "--epr-category-label-padding": "0 var(--epr-horizontal-padding)", "--epr-category-label-height": Zi + "px", "--epr-emoji-size": "30px", "--epr-emoji-padding": "5px", "--epr-emoji-fullsize": "calc(var(--epr-emoji-size) + var(--epr-emoji-padding) * 2)", "--epr-emoji-hover-color": "var(--epr-hover-bg-color)", "--epr-emoji-variation-indicator-color": "var(--epr-picker-border-color)", "--epr-emoji-variation-indicator-color-hover": "var(--epr-text-color)", "--epr-header-overlay-z-index": "3", "--epr-emoji-variations-indictator-z-index": "1", "--epr-category-label-z-index": "2", "--epr-skin-variation-picker-z-index": "5", "--epr-preview-z-index": "6", "--epr-dark": "#000", "--epr-dark-emoji-variation-picker-bg-color": "var(--epr-dark)", "--epr-dark-highlight-color": "#c0c0c0", "--epr-dark-text-color": "var(--epr-highlight-color)", "--epr-dark-hover-bg-color": "#363636f6", "--epr-dark-hover-bg-color-reduced-opacity": "#36363680", "--epr-dark-focus-bg-color": "#474747", "--epr-dark-search-input-bg-color": "#333333", "--epr-dark-category-label-bg-color": "#222222e6", "--epr-dark-picker-border-color": "#151617", "--epr-dark-bg-color": "#222222", "--epr-dark-reactions-bg-color": "#22222290", "--epr-dark-search-input-bg-color-active": "var(--epr-dark)", "--epr-dark-emoji-variation-indicator-color": "#444", "--epr-dark-category-icon-active-color": "#3271b7", "--epr-dark-skin-tone-picker-menu-color": "#22222295", "--epr-dark-skin-tone-outer-border-color": "var(--epr-dark-picker-border-color)", "--epr-dark-skin-tone-inner-border-color": "#00000000" } }, autoThemeDark: { ".": Ie.autoTheme, "@media (prefers-color-scheme: dark)": { "--": xs } }, darkTheme: { ".": Ie.darkTheme, "--": xs }, reactionsMenu: { ".": "epr-reactions", height: "50px", display: "inline-flex", backgroundColor: "var(--epr-reactions-bg-color)", backdropFilter: "blur(8px)", "--": { "--epr-picker-border-radius": "50px" } } });
function Jf(e, a) {
  if (!e || !a) return 0;
  var t = e.getBoundingClientRect().width, i = a.getBoundingClientRect().width;
  return Math.floor(t / i);
}
function g1(e, a, t) {
  if (!e || !a.length) return null;
  var i = e.getBoundingClientRect().top, r = e.getBoundingClientRect().bottom, s = i + _f(e), f = a.find(function(c) {
    var d = c.getBoundingClientRect().top, u = c.getBoundingClientRect().bottom, h = c.clientHeight * t, m = d + h, p = u - h;
    return m < s ? false : m >= i && m <= r || p >= i && p <= r;
  });
  return f || null;
}
function p1(e) {
  return !!e.nextElementSibling;
}
function _f(e) {
  if (!e) return Zi;
  var a = e.querySelector(Sn(Ie.label));
  if (a) {
    var t = a.getBoundingClientRect().height;
    if (t > 0) return t;
  }
  return Zi;
}
var mt = "button" + Sn(Ie.emoji), b1 = [mt, Sn(Ie.visible), ":not(" + Sn(Ie.hidden) + ")"].join("");
function En(e) {
  var a;
  return (a = e == null ? void 0 : e.closest(mt)) != null ? a : null;
}
function Ff(e) {
  var a = Wf(e), t = Rr(e);
  if (!a) return [];
  var i = ri(t ?? a);
  return i ? [i, t] : [];
}
function w1(e) {
  var a;
  return !!(e != null && e.matches(mt) || !(e == null || (a = e.parentElement) == null) && a.matches(mt));
}
function Is(e) {
  var a;
  return (a = e == null ? void 0 : e.clientHeight) != null ? a : 0;
}
function Hf(e) {
  if (!e) return 0;
  var a = En(e), t = ta(a), i = zr(t);
  return Ss(a) + Ss(t) + i;
}
function zr(e) {
  var a, t;
  if (!e) return 0;
  var i = e.querySelector(Sn(Ie.categoryContent));
  return ((a = e == null ? void 0 : e.clientHeight) != null ? a : 0) - ((t = i == null ? void 0 : i.clientHeight) != null ? t : 0);
}
function y1(e) {
  return e ? Vf(e) < zr(ta(e)) : false;
}
function $f(e) {
  return e ? e.matches(Sn(Ie.scrollBody)) ? e : e.querySelector(Sn(Ie.scrollBody)) : null;
}
function Vf(e) {
  var a, t;
  return e ? Hf(e) - ((a = (t = Zf(e)) == null ? void 0 : t.scrollTop) != null ? a : 0) : 0;
}
function Zf(e) {
  var a;
  return e && (a = e.closest(Sn(Ie.scrollBody))) != null ? a : null;
}
function j1(e) {
  var a = En(e), t = ta(a);
  return ks(a) + ks(t);
}
function Ss(e) {
  var a;
  return (a = e == null ? void 0 : e.offsetTop) != null ? a : 0;
}
function ks(e) {
  var a;
  return (a = e == null ? void 0 : e.offsetLeft) != null ? a : 0;
}
function Rr(e) {
  var a;
  return (a = M1(En(e), "unified")) != null ? a : null;
}
function Wf(e) {
  var a = Rr(e);
  return a ? hf(a) : null;
}
function Pr(e) {
  return e ? { unified: Rr(e), originalUnified: Wf(e) } : { unified: null, originalUnified: null };
}
function M1(e, a) {
  var t;
  return (t = v1(e)[a]) != null ? t : null;
}
function v1(e) {
  var a;
  return (a = e == null ? void 0 : e.dataset) != null ? a : {};
}
function Or(e) {
  return e.classList.contains(Ie.visible);
}
function qf(e) {
  return e ? e.classList.contains(Ie.hidden) : true;
}
function Ya(e) {
  return e ? Array.from(e.querySelectorAll(b1)) : [];
}
function Kf(e) {
  if (!e) return null;
  var a = Ya(e), t = a.slice(-1), i = t[0];
  return i ? Or(i) ? i : Ur(i) : null;
}
function Xf(e) {
  var a = e.nextElementSibling;
  return a ? Or(a) ? a : Xf(a) : Br(hi(e));
}
function Ur(e) {
  var a = e.previousElementSibling;
  return a ? Or(a) ? a : Ur(a) : Kf(ui(e));
}
function Br(e) {
  if (!e) return null;
  var a = Ya(e);
  return g1(e, a, 0.1);
}
function ui(e) {
  var a = ta(e);
  if (!a) return null;
  var t = a.previousElementSibling;
  return t ? qf(t) ? ui(t) : t : null;
}
function hi(e) {
  var a = ta(e);
  if (!a) return null;
  var t = a.nextElementSibling;
  return t ? qf(t) ? hi(t) : t : null;
}
function ta(e) {
  return e ? e.closest(Sn(Ie.category)) : null;
}
function ec(e) {
  return e ? e.closest(Sn(Ie.categoryContent)) : null;
}
function nc(e) {
  return e.split("-").map(function(a) {
    return String.fromCodePoint(parseInt(a, 16));
  }).join("");
}
function L1(e) {
  return e.category === je.CUSTOM;
}
function ac(e) {
  return e.imgUrl !== void 0;
}
function tc(e, a) {
  var t = o.useRef(), i = Bf(), r = du(), s = Ha(), f = s[1], c = Ia(), d = oi(), u = d[0], h = ju(a), m = Sr(), p = m[1], g = xa(), C = Ca(), y = Fa(), I = y.emojiByUnified, T = o.useCallback(function(N) {
    if (!r.current) {
      c();
      var k = Ns(N, I), B = k[0], z = k[1];
      if (!(!B || !z)) {
        var x = au(z) || u;
        p(), Kd(B, x), h(C1(B, x, C, g), N);
      }
    }
  }, [u, c, r, I, h, p, g, C]), j = o.useCallback(function(N) {
    var k;
    t.current && clearTimeout(t.current);
    var B = Ns(N, I), z = B[0];
    !z || !_a(z) || (t.current = (k = window) == null ? void 0 : k.setTimeout(function() {
      r.current = true, t.current = void 0, c(), i(N.target), f(z);
    }, 500));
  }, [r, I, c, i, f]), E = o.useCallback(function() {
    t.current ? (clearTimeout(t.current), t.current = void 0) : r.current && requestAnimationFrame(function() {
      r.current = false;
    });
  }, [r]);
  o.useEffect(function() {
    if (e.current) {
      var b = e.current;
      return b.addEventListener("click", T, { passive: true }), b.addEventListener("mousedown", j, { passive: true }), b.addEventListener("mouseup", E, { passive: true }), function() {
        b == null || b.removeEventListener("click", T), b == null || b.removeEventListener("mousedown", j), b == null || b.removeEventListener("mouseup", E);
      };
    }
  }, [e, T, j, E]);
}
function Ns(e, a) {
  var t = e == null ? void 0 : e.target;
  if (!w1(t)) return [];
  var i = Pr(t), r = i.unified, s = i.originalUnified, f = r ?? s;
  if (!f) return [];
  var c = a(f);
  return c ? [c, r ?? f] : [];
}
function C1(e, a, t, i) {
  var r = Lr(e);
  if (ac(e)) {
    var s = zn(e);
    return { activeSkinTone: a, emoji: s, getImageUrl: function() {
      return e.imgUrl;
    }, imageUrl: e.imgUrl, isCustom: true, names: r, unified: s, unifiedWithoutSkinTone: s };
  }
  var f = zn(e, a);
  return { activeSkinTone: a, emoji: nc(f), getImageUrl: function(d) {
    return d === void 0 && (d = t ?? hn.APPLE), i(f, d);
  }, imageUrl: i(f, t ?? hn.APPLE), isCustom: false, names: r, unified: f, unifiedWithoutSkinTone: zn(e) };
}
function xt(e) {
  return o.createElement("button", Object.assign({ type: "button" }, e, { className: Ce(x1.button, e.className) }), e.children);
}
var x1 = He.create({ button: { ".": "epr-btn", cursor: "pointer", border: "0", background: "none", outline: "none" } });
function I1(e) {
  var a, t = e.emojiNames, i = e.unified, r = e.hidden, s = e.hiddenOnSearch, f = e.showVariations, c = f === void 0 ? true : f, d = e.hasVariations, u = e.children, h = e.className, m = e.noBackground, p = m === void 0 ? false : m, g = e.style;
  return o.createElement(xt, { className: Ce(vi.emoji, r && wr.hidden, s && Ma.hiddenOnSearch, (a = {}, a[Ie.visible] = !r && !s, a), !!(d && c) && vi.hasVariations, p && vi.noBackground, h), "data-unified": i, "aria-label": S1(t), "data-full-name": t, style: g }, u);
}
function S1(e) {
  return e[e.length - 1];
}
var vi = He.create({ emoji: { ".": Ie.emoji, position: "relative", width: "var(--epr-emoji-fullsize)", height: "var(--epr-emoji-fullsize)", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", maxWidth: "var(--epr-emoji-fullsize)", maxHeight: "var(--epr-emoji-fullsize)", borderRadius: "8px", overflow: "hidden", transition: "background-color 0.2s", ":hover": { backgroundColor: "var(--epr-emoji-hover-color)" }, ":focus": { backgroundColor: "var(--epr-focus-bg-color)" } }, noBackground: { background: "none", ":hover": { backgroundColor: "transparent", background: "none" }, ":focus": { backgroundColor: "transparent", background: "none" } }, hasVariations: { ".": Ie.emojiHasVariations, ":after": { content: "", display: "block", width: "0", height: "0", right: "0px", bottom: "1px", position: "absolute", borderLeft: "4px solid transparent", borderRight: "4px solid transparent", transform: "rotate(135deg)", borderBottom: "4px solid var(--epr-emoji-variation-indicator-color)", zIndex: "var(--epr-emoji-variations-indictator-z-index)" }, ":hover:after": { borderBottom: "4px solid var(--epr-emoji-variation-indicator-color-hover)" } } }), _t = He.create({ external: { ".": Ie.external, fontSize: "0" }, common: { alignSelf: "center", justifySelf: "center", display: "block" } });
function Es(e) {
  var a = e.emojiName, t = e.style, i = e.lazyLoad, r = i === void 0 ? false : i, s = e.imgUrl, f = e.onError, c = e.className;
  return o.createElement("img", { src: s, alt: a, className: Ce(k1.emojiImag, _t.external, _t.common, c), loading: r ? "lazy" : "eager", onError: f, style: t });
}
var k1 = He.create({ emojiImag: { ".": "epr-emoji-img", maxWidth: "var(--epr-emoji-fullsize)", maxHeight: "var(--epr-emoji-fullsize)", minWidth: "var(--epr-emoji-fullsize)", minHeight: "var(--epr-emoji-fullsize)", padding: "var(--epr-emoji-padding)" } });
function N1(e) {
  var a = e.unified, t = e.style, i = e.className;
  return o.createElement("span", { className: Ce(E1.nativeEmoji, _t.common, _t.external, i), "data-unified": a, style: t }, nc(a));
}
var E1 = He.create({ nativeEmoji: { ".": "epr-emoji-native", fontFamily: '"Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "EmojiOne Color", "Android Emoji"!important', position: "relative", lineHeight: "100%", fontSize: "var(--epr-emoji-size)", textAlign: "center", alignSelf: "center", justifySelf: "center", letterSpacing: "0", padding: "var(--epr-emoji-padding)" } });
function Wi(e) {
  var a = e.emoji, t = e.unified, i = e.emojiStyle, r = e.size, s = e.lazyLoad, f = e.getEmojiUrl, c = f === void 0 ? tf : f, d = e.className, u = pf(), h = u[1], m = Fa(), p = m.emojiByUnified, g = {};
  r && (g.width = g.height = g.fontSize = r + "px");
  var C = a || p(t);
  if (!C) return null;
  if (ac(C)) return o.createElement(Es, { style: g, emojiName: t, emojiStyle: hn.NATIVE, lazyLoad: s, imgUrl: C.imgUrl, onError: y, className: d });
  return o.createElement(o.Fragment, null, i === hn.NATIVE ? o.createElement(N1, { unified: t, style: g, className: d }) : o.createElement(Es, { style: g, emojiName: Rd(C), emojiStyle: i, lazyLoad: s, imgUrl: c(t, i), onError: y, className: d }));
  function y() {
    h(function(I) {
      return new Set(I).add(t);
    });
  }
}
function mi(e) {
  var a = e.emoji, t = e.unified, i = e.hidden, r = e.hiddenOnSearch, s = e.emojiStyle, f = e.showVariations, c = f === void 0 ? true : f, d = e.size, u = e.lazyLoad, h = e.getEmojiUrl, m = e.className, p = e.noBackground, g = p === void 0 ? false : p, C = e.style, y = _a(a);
  return o.createElement(I1, { hasVariations: y, showVariations: c, hidden: i, hiddenOnSearch: r, emojiNames: Lr(a), unified: t, noBackground: g, style: C }, o.createElement(Wi, { unified: t, emoji: a, size: d, emojiStyle: s, lazyLoad: u, getEmojiUrl: h, className: m }));
}
var T1 = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI4LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjgwcHgiIHZpZXdCb3g9IjAgMCAyMCA4MCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgODAiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cGF0aCBmaWxsPSIjODY4Njg2IiBkPSJNNS43LDEwLjRjMCwwLjEsMC4xLDAuMywwLjIsMC40QzYsMTAuOSw2LjEsMTEsNi4zLDExaDMuNHYzLjRjMCwwLjEsMC4xLDAuMywwLjIsMC40CgljMC4xLDAuMSwwLjIsMC4yLDAuNCwwLjJjMC4zLDAsMC41LTAuMiwwLjUtMC41di0zLjRoMy40YzAuMywwLDAuNS0wLjIsMC41LTAuNXMtMC4yLTAuNS0wLjUtMC41aC0zLjRWNi43YzAtMC4zLTAuMi0wLjUtMC41LTAuNQoJQzkuOCw2LDkuNiw2LjIsOS42LDYuNXYzLjRINi4yQzUuOSw5LjksNS43LDEwLjEsNS43LDEwLjRMNS43LDEwLjR6Ii8+CjxwYXRoIGZpbGw9IiMzMzcxQjciIGQ9Ik01LjcsMzAuNGMwLDAuMSwwLjEsMC4zLDAuMiwwLjRTNi4xLDMxLDYuMywzMWgzLjR2My40YzAsMC4xLDAuMSwwLjMsMC4yLDAuNGMwLjEsMC4xLDAuMiwwLjIsMC40LDAuMgoJYzAuMywwLDAuNS0wLjIsMC41LTAuNXYtMy40aDMuNGMwLjMsMCwwLjUtMC4yLDAuNS0wLjVzLTAuMi0wLjUtMC41LTAuNWgtMy40di0zLjRjMC0wLjMtMC4yLTAuNS0wLjUtMC41cy0wLjUsMC4yLTAuNSwwLjV2My40SDYuMgoJQzUuOSwyOS45LDUuNywzMC4xLDUuNywzMC40TDUuNywzMC40eiIvPgo8cGF0aCBmaWxsPSIjQzBDMEJGIiBkPSJNNS43LDUwLjRjMCwwLjEsMC4xLDAuMywwLjIsMC40QzYsNTAuOSw2LjEsNTEsNi4zLDUxaDMuNHYzLjRjMCwwLjEsMC4xLDAuMywwLjIsMC40CgljMC4xLDAuMSwwLjIsMC4yLDAuNCwwLjJjMC4zLDAsMC41LTAuMiwwLjUtMC41di0zLjRoMy40YzAuMywwLDAuNS0wLjIsMC41LTAuNXMtMC4yLTAuNS0wLjUtMC41aC0zLjR2LTMuNGMwLTAuMy0wLjItMC41LTAuNS0wLjUKCXMtMC41LDAuMi0wLjUsMC41djMuNEg2LjJDNS45LDQ5LjksNS43LDUwLjEsNS43LDUwLjRMNS43LDUwLjR6Ii8+CjxwYXRoIGZpbGw9IiM2QUE5REQiIGQ9Ik01LjcsNzAuNGMwLDAuMSwwLjEsMC4zLDAuMiwwLjRTNi4xLDcxLDYuMyw3MWgzLjR2My40YzAsMC4xLDAuMSwwLjMsMC4yLDAuNGMwLjEsMC4xLDAuMiwwLjIsMC40LDAuMgoJYzAuMywwLDAuNS0wLjIsMC41LTAuNXYtMy40aDMuNGMwLjMsMCwwLjUtMC4yLDAuNS0wLjVzLTAuMi0wLjUtMC41LTAuNWgtMy40di0zLjRjMC0wLjMtMC4yLTAuNS0wLjUtMC41cy0wLjUsMC4yLTAuNSwwLjV2My40SDYuNAoJQzUuOSw2OS45LDUuNyw3MC4xLDUuNyw3MC40TDUuNyw3MC40eiIvPgo8L3N2Zz4=";
function D1() {
  var e = La(), a = e[1];
  return o.createElement(xt, { "aria-label": "Show all Emojis", title: "Show all Emojis", tabIndex: 0, className: Ce(A1.plusSign), onClick: function() {
    return a(false);
  } });
}
var A1 = He.create(Pe({ plusSign: { fontSize: "20px", padding: "17px", color: "var(--epr-text-color)", borderRadius: "50%", textAlign: "center", lineHeight: "100%", width: "20px", height: "20px", display: "flex", justifyContent: "center", alignItems: "center", transition: "background-color 0.2s ease-in-out", ":after": { content: "", minWidth: "20px", minHeight: "20px", backgroundImage: "url(" + T1 + ")", backgroundColor: "transparent", backgroundRepeat: "no-repeat", backgroundSize: "20px", backgroundPositionY: "0" }, ":hover": { color: "var(--epr-highlight-color)", backgroundColor: "var(--epr-hover-bg-color-reduced-opacity)", ":after": { backgroundPositionY: "-20px" } }, ":focus": { color: "var(--epr-highlight-color)", backgroundColor: "var(--epr-hover-bg-color-reduced-opacity)", ":after": { backgroundPositionY: "-40px" } } } }, Kn("plusSign", { ":after": { backgroundPositionY: "-40px" }, ":hover:after": { backgroundPositionY: "-60px" } })));
function z1() {
  var e = La(), a = e[0], t = Tu(), i = ku();
  tc(t, ut.REACTIONS);
  var r = Ca(), s = jf(), f = xa();
  return a ? o.createElement("ul", { className: Ce(Ts.list, !a && wr.hidden), ref: t, "aria-label": "Reactions" }, i.map(function(c) {
    var d = ri(c);
    return d ? o.createElement("li", { key: c }, o.createElement(mi, { emoji: d, emojiStyle: r, unified: c, showVariations: false, className: Ce(Ts.emojiButton), noBackground: true, getEmojiUrl: f })) : null;
  }), s ? o.createElement("li", null, o.createElement(D1, null)) : null) : null;
}
var Ts = He.create({ list: { listStyle: "none", margin: "0", padding: "0 5px", display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }, emojiButton: { ":hover": { transform: "scale(1.2)" }, ":focus": { transform: "scale(1.2)" }, ":active": { transform: "scale(1.1)" }, transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.5)" } });
function R1(e) {
  var a = Ia(), t = o.useState(0), i = t[0], r = t[1];
  return o.useEffect(function() {
    var s = e.current;
    if (!s) return;
    s.addEventListener("scroll", f, { passive: true });
    function f() {
      var c;
      r((c = s == null ? void 0 : s.scrollTop) != null ? c : 0), a();
    }
    return function() {
      s == null || s.removeEventListener("scroll", f);
    };
  }, [e, a]), i;
}
function P1(e) {
  var a = e.scrollTop, t = e.clientHeight, i = e.topOffset, r = e.style, s = e.dimensions;
  if (!r || !s) return false;
  var f = i + r.top, c = f + s.emojiSize, d = c + s.emojiSize * 2 >= a && f <= a + t + s.emojiSize;
  return !d;
}
function O1(e, a) {
  return e ? { top: Math.floor(a / e.emojisPerRow) * e.emojiSize, left: a % e.emojisPerRow * e.emojiSize } : void 0;
}
var U1 = 40;
function B1(e) {
  var a = Tf(), t = La(), i = t[0], r = $a(), s = o.useRef(), f = Ir(), c = f[0], d = bf(), u = d[0], h = o.useState(), m = h[0], p = h[1], g = o.useCallback(function() {
    var C = a.current;
    if (C) {
      var y = C.querySelector(mt), I = y == null ? void 0 : y.clientHeight;
      I && (s.current = I);
      var T = u || I || s.current || U1, j = C.clientWidth;
      if (!(j === 0 || T === 0)) {
        var E = Math.max(1, Math.floor(j / T)), b = Math.ceil(e / E), N = b * T;
        p({ categoryHeight: N, emojisPerRow: E, emojiSize: T });
      }
    }
  }, [a, e, u]);
  return o.useEffect(function() {
    g();
  }, [e, i, g, c.length]), o.useEffect(function() {
    var C = r.current;
    if (C) {
      var y = function(T) {
        var j = T, E = j.propertyName;
        (E === "width" || E === "max-width" || E === "min-width" || E === "height" || E === "max-height" || E === "min-height") && (typeof queueMicrotask == "function" ? queueMicrotask(function() {
          return g();
        }) : requestAnimationFrame(function() {
          return g();
        }));
      };
      return C.addEventListener("transitionend", y, { passive: true }), function() {
        C.removeEventListener("transitionend", y);
      };
    }
  }, [r, g]), m;
}
function G1() {
  var e = pf(), a = e[0], t = qu();
  return function(i) {
    var r = va(i), s = a.has(r), f = t(r);
    return { failedToLoad: s, filteredOut: f, hidden: s || f };
  };
}
function Y1(e) {
  var a = e.categoryEmojis, t = e.topOffset, i = e.onHeightReady, r = e.scrollTop, s = e.isCategoryVisible, f = G1(), c = Cf(), d = Ca(), u = oi(), h = u[0], m = ou(), p = xa(), g = !Mf(), C = wn(), y = 0, I = a.filter(function(b) {
    var N = m(b), k = f(b), B = k.failedToLoad, z = k.filteredOut, x = k.hidden;
    return !B && !z && !x && !N;
  }), T = B1(I.length);
  o.useEffect(function() {
    T && i(T.categoryHeight);
  }, [T, i, I.length]);
  var j = function(N) {
    var k, B;
    return T && C.current && P1({ scrollTop: r, clientHeight: (k = (B = C.current) == null ? void 0 : B.clientHeight) != null ? k : 0, topOffset: t, style: N, dimensions: T });
  }, E = I.reduce(function(b, N, k) {
    var B = va(N, h), z = O1(T, k);
    if (j(z)) {
      var x, w;
      return y++, c1(N, d, r, (x = (w = C.current) == null ? void 0 : w.clientHeight) != null ? x : 0, t, z, T, p), b;
    }
    return s ? (b.push(o.createElement(mi, { showVariations: g, key: B, emoji: N, unified: B, emojiStyle: d, lazyLoad: c, getEmojiUrl: p, style: Pe({}, z, { position: "absolute" }) })), b) : (y++, b);
  }, []);
  return { virtualizedCounter: y, emojis: E, dimensions: T };
}
function Q1(e) {
  var a = e.categoryConfig, t = e.children, i = e.hidden, r = e.hiddenOnSearch, s = e.height, f = ti(a), c = of(a);
  return o.createElement("li", { className: Ce(Li.category, i && wr.hidden, r && Ma.hiddenOnSearch), "data-name": f, "aria-label": c }, o.createElement("h2", { className: Ce(Li.label) }, c), o.createElement("div", { className: Ce(Li.categoryContent), style: { height: s } }, t));
}
var Li = He.create({ category: { ".": Ie.category, minHeight: "calc(var(--epr-emoji-fullsize) + var(--epr-category-label-height))", position: "relative" }, categoryContent: { ".": Ie.categoryContent, display: "grid", gridGap: "0", gridTemplateColumns: "repeat(auto-fill, var(--epr-emoji-fullsize))", justifyContent: "space-between", margin: "var(--epr-category-padding)", position: "relative" }, label: { ".": Ie.label, alignItems: "center", backdropFilter: "blur(3px)", backgroundColor: "var(--epr-category-label-bg-color)", color: "var(--epr-category-label-text-color)", display: "flex", fontSize: "16px", fontWeight: "bold", height: "var(--epr-category-label-height)", margin: "0", padding: "var(--epr-category-label-padding)", position: "sticky", textTransform: "capitalize", top: "0", width: "100%", zIndex: "var(--epr-category-label-z-index)" } });
function J1() {
  var e = kr(), a = Xd(), t = Ca(), i = xa(), r = Cf(), s = oi(), f = s[0], c = bf(), d = c[0], u = c[1], h = o.useRef(null);
  if (o.useLayoutEffect(function() {
    h.current && u(h.current.clientHeight);
  }), d) return null;
  var m = e[0], p = a(ti(m))[0], g = p ? zn(p, f) : "";
  return p ? o.createElement("div", { ref: h }, o.createElement(mi, { emoji: p, unified: g, emojiStyle: t, getEmojiUrl: i, lazyLoad: r, showVariations: false, hidden: false, style: { opacity: 0, pointerEvents: "none", position: "absolute", top: 0, left: 0, zIndex: -1, height: "var(--epr-emoji-fullsize)", width: "var(--epr-emoji-fullsize)" } })) : null;
}
function _1(e) {
  var a = e.scrollTop, t = kr(), i = o.useState({}), r = i[0], s = i[1], f = Tf(), c = iu(), d = _f(f.current), u = 0;
  return o.createElement("ul", { className: Ce(H1.emojiList), ref: f }, o.createElement(J1, null), t.map(function(h) {
    var m = ti(h), p = u, g = r[m];
    return g && (u += g + d), o.createElement(o.Suspense, { key: m }, o.createElement(F1, { categoryEmojis: c(m), categoryConfig: h, topOffset: p, onHeightReady: function(y) {
      r[m] !== y && s(function(I) {
        var T;
        return Pe({}, I, (T = {}, T[m] = y, T));
      });
    }, scrollTop: a }));
  }));
}
function F1(e) {
  var a = e.categoryEmojis, t = e.categoryConfig, i = e.topOffset, r = e.onHeightReady, s = e.scrollTop, f = Ir(), c = f[0], d = Y1({ categoryEmojis: a, topOffset: i, onHeightReady: r, scrollTop: s, isCategoryVisible: c.includes(t.category) }), u = d.virtualizedCounter, h = d.emojis, m = d.dimensions;
  return o.createElement(Q1, { categoryConfig: t, height: m == null ? void 0 : m.categoryHeight, hidden: !h.length && u === 0 }, h);
}
var H1 = He.create({ emojiList: { ".": Ie.emojiList, listStyle: "none", margin: "0", padding: "0" } }), $1 = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjMuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI1MHB4IgoJIGhlaWdodD0iMTVweCIgdmlld0JveD0iMCAwIDUwIDE1IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MCAxNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnIGlkPSJMYXllcl8xIj4KPC9nPgo8ZyBpZD0iTGF5ZXJfMiI+Cgk8cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNFOEU3RTciIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTEuODYtMC40M2w5LjgzLDExLjUzYzAuNTksMC42OSwxLjU2LDAuNjksMi4xNCwwbDkuODMtMTEuNTMiLz4KCTxwYXRoIGZpbGw9IiMwMTAyMDIiIHN0cm9rZT0iIzE1MTYxNyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMjYuODYtMC40M2w5LjgzLDExLjUzYzAuNTksMC42OSwxLjU2LDAuNjksMi4xNCwwbDkuODMtMTEuNTMiLz4KPC9nPgo8L3N2Zz4=", Aa;
(function(e) {
  e[e.Up = 0] = "Up", e[e.Down = 1] = "Down";
})(Aa || (Aa = {}));
function V1() {
  var e = ci(), a = Du(), t = Ha(), i = t[0], r = Ca(), s = W1(a), f = s.getTop, c = s.getMenuDirection, d = Df(), u = Z1(a), h = xa(), m = En(e.current), p = !!(i && m && _a(i) && m.classList.contains(Ie.emojiHasVariations));
  o.useEffect(function() {
    p && di(a.current);
  }, [a, p, e]);
  var g, C;
  return !p && e.current ? d(null) : (g = f(), C = u()), o.createElement("div", { ref: a, className: Ce(St.variationPicker, c() === Aa.Down && St.pointingUp, p && St.visible), style: { top: g } }, p && i ? [zn(i)].concat(ii(i)).slice(0, 6).map(function(y) {
    return o.createElement(mi, { key: y, emoji: i, unified: y, emojiStyle: r, showVariations: false, getEmojiUrl: h });
  }) : null, o.createElement("div", { className: Ce(St.pointer), style: C }));
}
function Z1(e) {
  var a = ci();
  return function() {
    var i = {};
    if (!e.current) return i;
    if (a.current) {
      var r = En(a.current), s = j1(r);
      if (!r) return i;
      i.left = s + (r == null ? void 0 : r.clientWidth) / 2;
    }
    return i;
  };
}
function W1(e) {
  var a = ci(), t = wn(), i = Aa.Up;
  return { getMenuDirection: r, getTop: s };
  function r() {
    return i;
  }
  function s() {
    i = Aa.Up;
    var f = 0;
    if (!e.current) return 0;
    var c = Is(e.current);
    if (a.current) {
      var d, u = t.current, h = En(a.current), m = Is(h);
      f = Hf(h);
      var p = (d = u == null ? void 0 : u.scrollTop) != null ? d : 0;
      p > f - c && (i = Aa.Down, f += m + c);
    }
    return f - c;
  }
}
var St = He.create(Pe({ variationPicker: { ".": Ie.variationPicker, position: "absolute", right: "15px", left: "15px", padding: "5px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", borderRadius: "3px", display: "flex", alignItems: "center", justifyContent: "space-around", opacity: "0", visibility: "hidden", pointerEvents: "none", top: "-100%", border: "1px solid var(--epr-picker-border-color)", height: "var(--epr-emoji-variation-picker-height)", zIndex: "var(--epr-skin-variation-picker-z-index)", background: "var(--epr-emoji-variation-picker-bg-color)", transform: "scale(0.9)", transition: "transform 0.1s ease-out, opacity 0.2s ease-out" }, visible: { opacity: "1", visibility: "visible", pointerEvents: "all", transform: "scale(1)" }, pointingUp: { ".": "pointing-up", transformOrigin: "center 0%", transform: "scale(0.9)" }, ".pointing-up": { pointer: { top: "0", transform: "rotate(180deg) translateY(100%) translateX(18px)" } }, pointer: { ".": "epr-emoji-pointer", content: "", position: "absolute", width: "25px", height: "15px", backgroundRepeat: "no-repeat", backgroundPosition: "0 0", backgroundSize: "50px 15px", top: "100%", transform: "translateX(-18px)", backgroundImage: "url(" + $1 + ")" } }, Kn("pointer", { backgroundPosition: "-25px 0" })));
function q1() {
  var e = wn(), a = R1(e);
  return tc(e, ut.PICKER), _u(), o.createElement("div", { className: Ce(K1.body, Ma.hiddenOnReactions), ref: e }, o.createElement(V1, null), o.createElement(_1, { scrollTop: a }));
}
var K1 = He.create({ body: { ".": Ie.scrollBody, flex: "1", overflowY: "scroll", overflowX: "hidden", position: "relative" } });
function X1(e, a) {
  if (!e || !a) return 0;
  var t = e.getBoundingClientRect(), i = a.getBoundingClientRect();
  return i.height - (t.y - i.y);
}
function e0(e, a) {
  var t = wn(), i = Pf(), r = Rf();
  o.useEffect(function() {
    if (!e) return;
    var s = t.current;
    s == null || s.addEventListener("keydown", d, { passive: true }), s == null || s.addEventListener("mouseover", u, true), s == null || s.addEventListener("focus", f, true), s == null || s.addEventListener("mouseout", c, { passive: true }), s == null || s.addEventListener("blur", c, true);
    function f(h) {
      var m = En(h.target);
      if (!m) return c();
      var p = Pr(m), g = p.unified, C = p.originalUnified;
      if (!g || !C) return c();
      a({ unified: g, originalUnified: C });
    }
    function c(h) {
      if (h) {
        var m = h.relatedTarget;
        if (!En(m)) return a(null);
      }
      a(null);
    }
    function d(h) {
      h.key === "Escape" && a(null);
    }
    function u(h) {
      if (!i()) {
        var m = En(h.target);
        if (m) {
          var p = X1(m, s), g = m.getBoundingClientRect().height;
          if (p < g) return n0(m, a);
          bn(m);
        }
      }
    }
    return function() {
      s == null || s.removeEventListener("mouseover", u), s == null || s.removeEventListener("mouseout", c), s == null || s.removeEventListener("focus", f, true), s == null || s.removeEventListener("blur", c, true), s == null || s.removeEventListener("keydown", d);
    };
  }, [t, e, a, i, r]);
}
function n0(e, a) {
  var t, i = Pr(e), r = i.unified, s = i.originalUnified;
  !r || !s || ((t = document.activeElement) == null || t.blur == null || t.blur(), a({ unified: r, originalUnified: s }));
}
var kt, gt;
(function(e) {
  e.ROW = "FlexRow", e.COLUMN = "FlexColumn";
})(gt || (gt = {}));
function ic(e) {
  var a = e.children, t = e.className, i = e.style, r = i === void 0 ? {} : i, s = e.direction, f = s === void 0 ? gt.ROW : s;
  return o.createElement("div", { style: Pe({}, r), className: Ce(Ds.flex, t, Ds[f]) }, a);
}
var Ds = He.create((kt = { flex: { display: "flex" } }, kt[gt.ROW] = { flexDirection: "row" }, kt[gt.COLUMN] = { flexDirection: "column" }, kt));
function a0(e) {
  var a = e.className, t = e.style, i = t === void 0 ? {} : t;
  return o.createElement("div", { style: Pe({ flex: 1 }, i), className: Ce(a) });
}
function t0(e) {
  var a = e.children, t = e.className, i = e.style;
  return o.createElement("div", { style: Pe({}, i, { position: "absolute" }), className: t }, a);
}
function gi(e) {
  var a = e.children, t = e.className, i = e.style;
  return o.createElement("div", { style: Pe({}, i, { position: "relative" }), className: t }, a);
}
function i0(e) {
  var a = e.isOpen, t = e.onClick, i = e.isActive, r = e.skinToneVariation, s = e.style;
  return o.createElement(xt, { style: s, onClick: t, className: Ce("epr-tone-" + r, Ci.tone, !a && Ci.closedTone, i && Ci.active), "aria-pressed": i, "aria-label": "Skin tone " + Ad[r] });
}
var Ci = He.create({ closedTone: { opacity: "0", zIndex: "0" }, active: { ".": "epr-active", zIndex: "1", opacity: "1" }, tone: { ".": "epr-tone", width: "var(--epr-skin-tone-size)", display: "block", cursor: "pointer", borderRadius: "4px", height: "var(--epr-skin-tone-size)", position: "absolute", right: "0", transition: "transform 0.3s ease-in-out, opacity 0.35s ease-in-out", zIndex: "0", border: "1px solid var(--epr-skin-tone-outer-border-color)", boxShadow: "inset 0px 0px 0 1px var(--epr-skin-tone-inner-border-color)", ":hover": { boxShadow: "0 0 0 3px var(--epr-active-skin-hover-color), inset 0px 0px 0 1px var(--epr-skin-tone-inner-border-color)" }, ":focus": { boxShadow: "0 0 0 3px var(--epr-focus-bg-color)" }, "&.epr-tone-neutral": { backgroundColor: "#ffd225" }, "&.epr-tone-1f3fb": { backgroundColor: "#ffdfbd" }, "&.epr-tone-1f3fc": { backgroundColor: "#e9c197" }, "&.epr-tone-1f3fd": { backgroundColor: "#c88e62" }, "&.epr-tone-1f3fe": { backgroundColor: "#a86637" }, "&.epr-tone-1f3ff": { backgroundColor: "#60463a" } } }), it = 28;
function r0() {
  return o.createElement(gi, { style: { height: it } }, o.createElement(t0, { style: { bottom: 0, right: 0 } }, o.createElement(rc, { direction: pt.VERTICAL })));
}
function rc(e) {
  var a = e.direction, t = a === void 0 ? pt.HORIZONTAL : a, i = Nr(), r = Mf(), s = Ct(), f = s[0], c = s[1], d = oi(), u = d[0], h = d[1], m = Mu(), p = Ia(), g = Sa();
  if (r) return null;
  var C = it * Qt.length + "px", y = f ? C : it + "px", I = t === pt.VERTICAL;
  return o.createElement(gi, { className: Ce(Xa.skinTones, I && Xa.vertical, f && Xa.open, I && f && Xa.verticalShadow), style: I ? { flexBasis: y, height: y } : { flexBasis: y } }, o.createElement("div", { className: Ce(Xa.select), ref: i }, Qt.map(function(T, j) {
    var E = T === u;
    return o.createElement(i0, { key: T, skinToneVariation: T, isOpen: f, style: { transform: Ce(I ? "translateY(-" + j * (f ? it : 0) + "px)" : "translateX(-" + j * (f ? it : 0) + "px)", f && E && "scale(1.3)") }, isActive: E, onClick: function() {
      f ? (h(T), m(T), g()) : c(true), p();
    } });
  })));
}
var pt;
(function(e) {
  e.VERTICAL = "epr-vertical", e.HORIZONTAL = "epr-horizontal";
})(pt || (pt = {}));
var Xa = He.create({ skinTones: { ".": "epr-skin-tones", "--": { "--epr-skin-tone-size": "15px" }, display: "flex", alignItems: "center", justifyContent: "flex-end", transition: "all 0.3s ease-in-out", padding: "10px 0" }, vertical: { padding: "9px", alignItems: "flex-end", flexDirection: "column", borderRadius: "6px", border: "1px solid var(--epr-bg-color)" }, verticalShadow: { boxShadow: "0px 0 7px var(--epr-picker-border-color)" }, open: { backdropFilter: "blur(5px)", background: "var(--epr-skin-tone-picker-menu-color)", ".epr-active": { border: "1px solid var(--epr-active-skin-tone-indicator-border-color)" } }, select: { ".": "epr-skin-tone-select", position: "relative", width: "var(--epr-skin-tone-size)", height: "var(--epr-skin-tone-size)" } });
function s0() {
  var e = vf(), a = Gf(), t = La(), i = t[0];
  return e.showPreview ? o.createElement(ic, { className: Ce(ft.preview, Ma.hiddenOnReactions, i && ft.hideOnReactions) }, o.createElement(o0, null), o.createElement(a0, null), a ? o.createElement(r0, null) : null) : null;
}
function o0() {
  var e, a = vf(), t = o.useState(null), i = t[0], r = t[1], s = Ca(), f = Ha(), c = f[0], d = xa(), u = Fa(), h = u.emojiByUnified;
  e0(a.showPreview, r);
  var m = h((e = i == null ? void 0 : i.unified) != null ? e : i == null ? void 0 : i.originalUnified), p = m != null && i != null;
  return o.createElement(g, null);
  function g() {
    var C = c ?? h(a.defaultEmoji);
    if (!C) return null;
    var y = c ? js(c) : a.defaultCaption;
    return o.createElement(o.Fragment, null, o.createElement("div", null, p ? o.createElement(Wi, { unified: i == null ? void 0 : i.unified, emoji: m, emojiStyle: s, size: 45, getEmojiUrl: d, className: Ce(ft.emoji) }) : C ? o.createElement(Wi, { unified: zn(C), emoji: C, emojiStyle: s, size: 45, getEmojiUrl: d, className: Ce(ft.emoji) }) : null), o.createElement("div", { className: Ce(ft.label) }, p ? js(m) : y));
  }
}
var ft = He.create({ preview: { alignItems: "center", borderTop: "1px solid var(--epr-preview-border-color)", height: "var(--epr-preview-height)", padding: "0 var(--epr-horizontal-padding)", position: "relative", zIndex: "var(--epr-preview-z-index)" }, label: { color: "var(--epr-preview-text-color)", fontSize: "var(--epr-preview-text-size)", padding: "var(--epr-preview-text-padding)", textTransform: "capitalize" }, emoji: { padding: "0" }, hideOnReactions: { opacity: "0", transition: "opacity 0.5s ease-in-out" } });
function f0(e) {
  var a;
  return (a = e == null ? void 0 : e.getAttribute("data-name")) != null ? a : null;
}
function c0(e) {
  var a = e.setActiveCategory, t = e.setVisibleCategories, i = wn();
  o.useEffect(function() {
    var r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), f = i.current, c = new IntersectionObserver(function(d) {
      if (f) {
        for (var u = Ld(d), h; !(h = u()).done; ) {
          var m = h.value, p = f0(m.target);
          p && (r.set(p, m.intersectionRatio), s.set(p, m.isIntersecting));
        }
        var g = Array.from(r), C = g.filter(function(N) {
          var k = N[0], B = N[1];
          return B > 0 || s.get(k);
        }).map(function(N) {
          var k = N[0];
          return k;
        });
        t(C);
        var y = g[g.length - 1];
        if ((y == null ? void 0 : y[1]) == 1) return a(y[0]);
        for (var I = 0, T = g; I < T.length; I++) {
          var j = T[I], E = j[0], b = j[1];
          if (b) {
            a(E);
            break;
          }
        }
      }
    }, { root: f, threshold: [0, 1] });
    return f == null || f.querySelectorAll(Sn(Ie.category)).forEach(function(d) {
      c.observe(d);
    }), function() {
      c.disconnect();
    };
  }, [i, a, t]);
}
function l0() {
  var e = wn(), a = $a();
  return function(i) {
    var r;
    if (e.current) {
      var s = (r = e.current) == null ? void 0 : r.querySelector('[data-name="' + i + '"]');
      if (s) {
        var f = s.offsetTop || 0;
        Af(a.current, f);
      }
    }
  };
}
function d0() {
  var e = wu();
  return e ? e.length === 0 : false;
}
var u0 = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjMuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIyMDBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgMjAwIDgwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyMDAgODAiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8ZyBpZD0iTGF5ZXJfMTEiPgoJPGc+CgkJPHBhdGggZmlsbD0iIzMzNzFCNyIgc3Ryb2tlPSIjMzM3MUI3IiBzdHJva2Utd2lkdGg9IjAuMSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTIuOCwyOS41YzAuNiwwLDEuMS0wLjUsMS4xLTEuMQoJCQljMC0wLjYtMC41LTEuMi0xLjEtMS4yYy0wLjYsMC0xLjIsMC41LTEuMiwxLjJDMTEuNiwyOSwxMi4yLDI5LjUsMTIuOCwyOS41eiBNMTIuOCwyOGMwLjIsMCwwLjQsMC4yLDAuNCwwLjQKCQkJYzAsMC4yLTAuMiwwLjQtMC40LDAuNGMtMC4yLDAtMC40LTAuMi0wLjQtMC40QzEyLjQsMjguMSwxMi42LDI4LDEyLjgsMjh6Ii8+CgkJPHBhdGggZmlsbD0iIzMzNzFCNyIgc3Ryb2tlPSIjMzM3MUI3IiBzdHJva2Utd2lkdGg9IjAuMSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTAsMjNjLTMuOCwwLTcsMy4xLTcsN2MwLDMuOCwzLjEsNyw3LDcKCQkJczctMy4xLDctN0MxNywyNi4yLDEzLjgsMjMsMTAsMjN6IE0xMCwzNi4yYy0zLjQsMC02LjItMi44LTYuMi02LjJjMC0zLjQsMi44LTYuMiw2LjItNi4yczYuMiwyLjgsNi4yLDYuMgoJCQlDMTYuMiwzMy40LDEzLjQsMzYuMiwxMCwzNi4yeiIvPgoJCTxwYXRoIGZpbGw9IiMzMzcxQjciIHN0cm9rZT0iIzMzNzFCNyIgc3Ryb2tlLXdpZHRoPSIwLjEiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTE0LjYsMzEuMmMtMC4xLTAuMS0wLjItMC4yLTAuMy0wLjJINS43CgkJCWMtMC4xLDAtMC4yLDAuMS0wLjMsMC4yYy0wLjEsMC4xLTAuMSwwLjIsMCwwLjRjMC43LDIsMi41LDMuMyw0LjYsMy4zczMuOS0xLjMsNC42LTMuM0MxNC43LDMxLjUsMTQuNywzMS4zLDE0LjYsMzEuMnogTTEwLDM0LjEKCQkJYy0xLjYsMC0zLTAuOS0zLjctMi4yaDcuM0MxMywzMy4yLDExLjYsMzQuMSwxMCwzNC4xeiIvPgoJCTxwYXRoIGZpbGw9IiMzMzcxQjciIHN0cm9rZT0iIzMzNzFCNyIgc3Ryb2tlLXdpZHRoPSIwLjEiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTcuMiwyOS41YzAuNiwwLDEuMi0wLjUsMS4yLTEuMQoJCQljMC0wLjYtMC41LTEuMi0xLjItMS4yYy0wLjYsMC0xLjEsMC41LTEuMSwxLjJDNi4xLDI5LDYuNiwyOS41LDcuMiwyOS41eiBNNy4yLDI4YzAuMiwwLDAuNCwwLjIsMC40LDAuNGMwLDAuMi0wLjIsMC40LTAuNCwwLjQKCQkJYy0wLjIsMC0wLjQtMC4yLTAuNC0wLjRDNi44LDI4LjEsNywyOCw3LjIsMjh6Ii8+Cgk8L2c+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzM3MUI3IiBkPSJNNjQuMSwzMy40bDIuMywwYzAuMiwwLDAuNCwwLjIsMC40LDAuNHYyLjFjMCwwLjItMC4yLDAuNC0wLjQsMC40aC0yLjMKCQkJCWMtMC4yLDAtMC40LTAuMi0wLjQtMC40di0yLjFDNjMuNywzMy42LDYzLjgsMzMuNCw2NC4xLDMzLjR6Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzNzFCNyIgZD0iTTczLjUsMzMuNWgyLjRjMC4yLDAsMC40LDAuMiwwLjQsMC40djJjMCwwLjItMC4yLDAuNC0wLjQsMC40aC0yLjQKCQkJCWMtMC4yLDAtMC40LTAuMi0wLjQtMC40bDAtMkM3My4xLDMzLjYsNzMuMywzMy41LDczLjUsMzMuNXoiLz4KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzM3MUI3IiBkPSJNNjMuNywyOC40aDEyLjZ2NUg2My43VjI4LjR6Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzNzFCNyIgZD0iTTY1LjUsMjMuNmg4LjljMSwwLDEuOSwwLjgsMS45LDEuOXYzLjFINjMuN3YtMy4xQzYzLjcsMjQuNSw2NC41LDIzLjYsNjUuNSwyMy42eiIvPgoJCQk8ZWxsaXBzZSBmaWxsPSIjMzM3MUI3IiBjeD0iNjYuMiIgY3k9IjMwLjkiIHJ4PSIwLjkiIHJ5PSIxIi8+CgkJCTxlbGxpcHNlIGZpbGw9IiMzMzcxQjciIGN4PSI3My44IiBjeT0iMzAuOSIgcng9IjAuOSIgcnk9IjEiLz4KCQk8L2c+Cgk8L2c+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzM3MUI3IiBkPSJNOTYuNCwzMGMwLDMuNi0yLjksNi41LTYuNCw2LjVzLTYuNC0yLjktNi40LTYuNXMyLjktNi41LDYuNC02LjVTOTYuNCwyNi40LDk2LjQsMzB6Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzNzFCNyIgZD0iTTk2LjMsMjguNmMwLDAsMCwwLjEsMCwwLjFjLTAuOSwwLjEtMi45LDAuMS00LjYtMS4xYy0xLjEtMC44LTItMS43LTIuNi0yLjUKCQkJCWMtMC4zLTAuNC0wLjYtMC44LTAuNy0xYy0wLjEtMC4xLTAuMS0wLjEtMC4xLTAuMmMwLjUtMC4xLDEuMi0wLjIsMi0wLjFjMS4yLDAsMi41LDAuMywzLjUsMS4xYzEsMC44LDEuNywxLjgsMi4xLDIuOAoJCQkJQzk2LjEsMjcuOSw5Ni4yLDI4LjMsOTYuMywyOC42eiIvPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMzMzcxQjciIGQ9Ik04NCwzMi4yYzAsMCwwLTAuMSwwLTAuMWMwLjktMC4yLDIuOS0wLjQsNC43LDAuNmMxLjEsMC43LDEuOSwxLjUsMi40LDIuMwoJCQkJYzAuNCwwLjUsMC42LDEsMC43LDEuM2MtMC40LDAuMS0xLDAuMi0xLjcsMC4zYy0xLDAtMi4xLTAuMS0zLjItMC44cy0xLjktMS42LTIuNC0yLjVDODQuMiwzMi44LDg0LjEsMzIuNSw4NCwzMi4yeiIvPgoJCTwvZz4KCTwvZz4KCTxnPgoJCTxnPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMzMzcxQjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTExNi4zLDI2LjhsLTEuNCwybC0wLjgtMC44bC0wLjYtMC42bDAsMC45bC0wLjEsOC4yaC02LjgKCQkJCWwtMC4xLTguMmwwLTAuOWwtMC42LDAuNmwtMC44LDAuOGwtMS40LTJsMi42LTIuOWMwLjEtMC4xLDAuMi0wLjEsMC4zLTAuMWgxLjNsMC40LDAuN2MwLjcsMS4zLDIuNiwxLjMsMy4zLTAuMWwwLjMtMC42aDEuMgoJCQkJYzAuMSwwLDAuMiwwLDAuMywwLjFsMC4zLTAuM2wtMC4zLDAuM0wxMTYuMywyNi44eiIvPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMzMzcxQjciIGQ9Ik0xMTAuMSwyNy43aDJ2MC45YzAsMC40LTAuNCwwLjctMSwwLjdjLTAuNiwwLTEtMC4zLTEtMC43TDExMC4xLDI3LjdMMTEwLjEsMjcuN3oiLz4KCQk8L2c+Cgk8L2c+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzM3MUI3IiBkPSJNMTI2LjgsMzQuM2MwLDEuMi0xLDIuMi0yLjIsMi4ycy0yLjItMS0yLjItMi4yczEtMi4yLDIuMi0yLjJTMTI2LjgsMzMuMSwxMjYuOCwzNC4zeiIvPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMzMzcxQjciIGQ9Ik0xMzcuNiwzNC4zYzAsMS4yLTEsMi4yLTIuMiwyLjJjLTEuMiwwLTIuMi0xLTIuMi0yLjJzMS0yLjIsMi4yLTIuMgoJCQkJQzEzNi42LDMyLjEsMTM3LjYsMzMuMSwxMzcuNiwzNC4zeiIvPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMzMzcxQjciIGQ9Ik0xMjYuOCwyNC40djkuOSIvPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMzMzcxQjciIGQ9Ik0xMzcuNywyNC40djkuOSIvPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMzMzcxQjciIGQ9Ik0xMjYuOCwyMy41aDEwLjh2Mi43aC0xMC44QzEyNi44LDI2LjIsMTI2LjgsMjMuNSwxMjYuOCwyMy41eiIvPgoJCTwvZz4KCTwvZz4KCTxnPgoJCTxnPgoJCQk8cGF0aCBmaWxsPSIjMzM3MUI3IiBkPSJNMTcwLjgsMjMuMUwxNzAuOCwyMy4xYy0wLjMsMC0wLjUsMC0wLjgsMGMtMi4xLDAtNCwxLTUuMywyLjVsLTAuMSwwbC0wLjEtMC4xbC0xLTEuMmwtMC4zLDMuNGwzLjQsMC4zCgkJCQlsLTEuMS0xLjNsLTAuMS0wLjFsMC4xLTAuMWMxLjEtMS41LDMtMi4zLDUtMi4xbDAsMGMzLjIsMC4zLDUuNSwzLjEsNS4yLDYuM2MtMC4zLDMtMy4xLDUuMy02LjEsNS4xYy0zLjEtMC4yLTUuNC0yLjktNS4zLTYKCQkJCWwtMS4zLTAuMWMtMC4yLDMuOCwyLjYsNy4xLDYuMyw3LjRjMy45LDAuMyw3LjMtMi42LDcuNi02LjVDMTc3LjIsMjYuOCwxNzQuNCwyMy41LDE3MC44LDIzLjF6Ii8+CgkJCTxwYXRoIGZpbGw9IiMzMzcxQjciIGQ9Ik0xNzAuMywyNy40YzAtMC4zLTAuMy0wLjYtMC42LTAuNnMtMC42LDAuMy0wLjYsMC42djMuMmMwLDAuMiwwLjEsMC4zLDAuMiwwLjRjMC4xLDAuMSwwLjMsMC4yLDAuNCwwLjIKCQkJCWgyLjRjMC40LDAsMC42LTAuMywwLjYtMC42YzAtMC40LTAuMy0wLjYtMC42LTAuNmgtMS42aC0wLjJ2LTAuMkwxNzAuMywyNy40TDE3MC4zLDI3LjR6Ii8+CgkJPC9nPgoJPC9nPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzNzFCNyIgZD0iTTE4Ni4yLDIzLjRoNy43YzEuNSwwLDIuNywxLjIsMi43LDIuN3Y3LjdjMCwxLjUtMS4yLDIuNy0yLjcsMi43aC03LjcKCQkJCWMtMS41LDAtMi43LTEuMi0yLjctMi43di03LjdDMTgzLjQsMjQuNiwxODQuNywyMy40LDE4Ni4yLDIzLjR6Ii8+CgkJCTxlbGxpcHNlIGZpbGw9IiMzMzcxQjciIGN4PSIxODYiIGN5PSIyOC45IiByeD0iMC43IiByeT0iMC43Ii8+CgkJCTxlbGxpcHNlIGZpbGw9IiMzMzcxQjciIGN4PSIxOTQiIGN5PSIyNi43IiByeD0iMC43IiByeT0iMC43Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzNzFCNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMTg2LDMzLjNsMC40LTAuM2MwLjQtMC4zLDEtMC4zLDEuNS0wLjFsMSwwLjQKCQkJCWMwLjUsMC4yLDEsMC4yLDEuNS0wLjFsMC44LTAuNWMwLjQtMC4zLDEtMC4zLDEuNS0wLjFsMS44LDAuOCIvPgoJCTwvZz4KCTwvZz4KCTxwYXRoIGZpbGw9IiMzMzcxQjciIHN0cm9rZT0iIzMzNzFCNyIgc3Ryb2tlLXdpZHRoPSIwLjI1IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xNTYsMjQuM2MtMC4yLTAuMS0wLjQtMC4xLTAuNSwwCgkJYzAsMC0wLjIsMC4xLTAuOSwwLjJjLTAuNywwLTIuNC0wLjEtMy44LTAuNmMtMC44LTAuMy0xLjctMC41LTIuNS0wLjVjLTAuMiwwLTAuNCwwLTAuNSwwYy0xLjMsMC0yLjUsMC4zLTMuNiwxCgkJYy0wLjIsMC4xLTAuMiwwLjItMC4yLDAuNHYxMS42YzAsMC4zLDAuMSwwLjUsMC4zLDAuNWMwLjYsMCwwLjUtMC40LDAuNS0wLjZ2LTUuN2MwLjctMC4zLDMuMi0xLjEsNS44LTAuMQoJCWMxLjYsMC42LDMuNSwwLjcsNC4zLDAuN2MwLjgsMCwxLjMtMC4zLDEuMy0wLjNjMC4yLTAuMSwwLjMtMC4yLDAuMy0wLjR2LTUuN0MxNTYuMiwyNC42LDE1Ni4xLDI0LjQsMTU2LDI0LjN6IE0xNTUuNiwzMC4yCgkJYy0wLjEsMC0wLjcsMC4xLTEsMC4xYy0wLjcsMC0yLjQtMC4xLTMuOC0wLjZjLTIuNS0xLTUtMC41LTYuMi0wLjF2LTQuOWMwLjktMC41LDIuMi0wLjcsMy4yLTAuN2MwLjEsMCwwLjMsMCwwLjQsMAoJCWMwLjcsMCwxLjUsMC4yLDIuMiwwLjRjMS42LDAuNiwzLjUsMC43LDQuMywwLjdjMC4yLDAsMC44LDAsMS0wLjFWMzAuMnoiLz4KCTxnPgoJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzNzFCNyIgZD0iTTQ4LjEsMjMuNWgzLjdjMi41LDAsNC41LDIsNC41LDQuNWMwLDAuNS0wLjQsMC45LTAuOSwwLjlINDQuNWMtMC41LDAtMC45LTAuNC0wLjktMC45CgkJCUM0My42LDI1LjUsNDUuNiwyMy41LDQ4LjEsMjMuNXoiLz4KCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMzMzcxQjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTQzLjUsMjguOGMtMC4yLDAuMS0wLjUsMS4yLDAsMS41YzEuNCwxLDguNSwwLjgsMTEuMywwLjYKCQkJYzAuOC0wLjEsMS42LTAuNCwxLjctMS4yYzAtMC4zLTAuMS0wLjYtMC42LTAuOSIvPgoJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzNzFCNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNNDMuNSwzMC42TDQzLjMsMzFjLTAuMiwwLjUsMC4yLDEsMC43LDAuOWMwLjMtMC4xLDAuNSwwLDAuNywwLjMKCQkJbDAuMSwwLjJjMC4zLDAuNSwxLDAuNiwxLjUsMC4ybDAsMGMwLjMtMC4yLDAuNy0wLjMsMS0wLjJsMC44LDAuM2MwLjQsMC4yLDAuOCwwLjEsMS4yLDBsMC41LTAuMmMwLjQtMC4yLDAuOS0wLjIsMS4zLDBsMC41LDAuMgoJCQljMC40LDAuMiwwLjgsMC4yLDEuMiwwbDAuMi0wLjFjMC4zLTAuMiwwLjgtMC4yLDEuMSwwLjFsMC4yLDAuMmMwLjMsMC4zLDAuOCwwLjIsMS0wLjJsMC4xLTAuMmMwLjEtMC4yLDAtMC4zLDAuMi0wLjMKCQkJYzAuNSwwLDEuMi0wLjMsMS4xLTAuN2wtMC40LTEuMSIvPgoJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzNzFCNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNNDMuNSwzMi4yYy0wLjEsMC4yLTAuMywwLjgsMCwxLjFjMC4zLDAuNCwzLDEuMSw2LjQsMS4xCgkJCWMyLjIsMCw0LjYtMC4zLDYtMC42YzAuNS0wLjEsMC45LTAuNSwwLjgtMC45YzAtMC4yLTAuMi0wLjUtMC40LTAuNyIvPgoJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzNzFCNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNNDMuNSwzMy4zYzAsMC41LDAuNiwyLjMsMS4zLDIuN2MxLjgsMC44LDUuNywwLjcsOC4xLDAuNQoJCQljMS4zLTAuMSwyLjUtMC43LDMuMi0xLjhjMC4zLTAuNSwwLjUtMSwwLjUtMS40Ii8+CgkJPGVsbGlwc2UgZmlsbD0iIzMzNzFCNyIgY3g9IjUxLjYiIGN5PSIyNi41IiByeD0iMC4zIiByeT0iMC40Ii8+CgkJPGVsbGlwc2UgZmlsbD0iIzMzNzFCNyIgY3g9IjUzIiBjeT0iMjUiIHJ4PSIwLjMiIHJ5PSIwLjQiLz4KCQk8ZWxsaXBzZSBmaWxsPSIjMzM3MUI3IiBjeD0iNTMiIGN5PSIyNy4yIiByeD0iMC4zIiByeT0iMC40Ii8+CgkJPGVsbGlwc2UgZmlsbD0iIzMzNzFCNyIgY3g9IjU0LjMiIGN5PSIyNi41IiByeD0iMC4zIiByeT0iMC40Ii8+CgkJPGVsbGlwc2UgZmlsbD0iIzMzNzFCNyIgY3g9IjUwLjkiIGN5PSIyNSIgcng9IjAuMyIgcnk9IjAuNCIvPgoJPC9nPgoJPGc+CgkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzM3MUI3IiBkPSJNMjQuMiwzMXYtNy42YzAuMSwwLjEsMC44LDAuOSwyLjgsMy4xYzIuNS0xLjYsNS42LTAuNyw2LjksMGwyLjQtMy4xdjcuMQoJCQljMCwxLjItMC4xLDIuNS0wLjksMy40Yy0xLDEuMi0yLjcsMi41LTUuMywyLjVjLTIuOSwwLTQuNS0xLjUtNS4zLTIuOUMyNC4yLDMyLjksMjQuMiwzMiwyNC4yLDMxeiIvPgoJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzNzFCNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMjEuMiwzMGw1LjQsMS4yIi8+CgkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzM3MUI3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0yMS4yLDM0LjFsNS40LTEuMiIvPgoJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzNzFCNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMzguOCwzMGwtNS40LDEuMiIvPgoJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzNzFCNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMzguOCwzNC4xbC01LjQtMS4yIi8+CgkJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMzMzcxQjciIGQ9Ik0yOS41LDMyLjRMMjksMzEuN2MtMC4yLTAuMywwLTAuNiwwLjMtMC42aDEuNAoJCQljMC4zLDAsMC41LDAuNCwwLjMsMC42bC0wLjcsMWwwLDBjLTAuNywxLjItMi42LDEuMS0zLjEtMC4zbC0wLjEtMC4yYy0wLjEtMC4yLDAtMC40LDAuMi0wLjVzMC40LDAsMC41LDAuMmwwLjEsMC4yCgkJCUMyOC4zLDMyLjgsMjkuMSwzMi45LDI5LjUsMzIuNHoiLz4KCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMzMzcxQjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTMyLjQsMzIuMWwtMC4xLDAuMmMtMC40LDEtMS44LDEuMS0yLjMsMC4yIi8+CgkJPGVsbGlwc2UgZmlsbD0iIzMzNzFCNyIgY3g9IjI3LjYiIGN5PSIyOS43IiByeD0iMC43IiByeT0iMC43Ii8+CgkJPGVsbGlwc2UgZmlsbD0iIzMzNzFCNyIgY3g9IjMyLjQiIGN5PSIyOS43IiByeD0iMC43IiByeT0iMC43Ii8+Cgk8L2c+Cgk8Zz4KCQk8cGF0aCBmaWxsPSIjQzBDMEJGIiBzdHJva2U9IiNDMEMwQkYiIHN0cm9rZS13aWR0aD0iMC4xIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xMi44LDQ5LjVjMC42LDAsMS4xLTAuNSwxLjEtMS4xCgkJCWMwLTAuNi0wLjUtMS4yLTEuMS0xLjJjLTAuNiwwLTEuMiwwLjUtMS4yLDEuMkMxMS42LDQ5LDEyLjIsNDkuNSwxMi44LDQ5LjV6IE0xMi44LDQ4YzAuMiwwLDAuNCwwLjIsMC40LDAuNAoJCQljMCwwLjItMC4yLDAuNC0wLjQsMC40Yy0wLjIsMC0wLjQtMC4yLTAuNC0wLjRDMTIuNCw0OC4xLDEyLjYsNDgsMTIuOCw0OHoiLz4KCQk8cGF0aCBmaWxsPSIjQzBDMEJGIiBzdHJva2U9IiNDMEMwQkYiIHN0cm9rZS13aWR0aD0iMC4xIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xNC42LDUxLjJjLTAuMS0wLjEtMC4yLTAuMi0wLjMtMC4ySDUuNwoJCQljLTAuMSwwLTAuMiwwLjEtMC4zLDAuMmMtMC4xLDAuMS0wLjEsMC4yLDAsMC40YzAuNywyLDIuNSwzLjMsNC42LDMuM3MzLjktMS4zLDQuNi0zLjNDMTQuNyw1MS41LDE0LjcsNTEuMywxNC42LDUxLjJ6IE0xMCw1NC4xCgkJCWMtMS42LDAtMy0wLjktMy43LTIuMmg3LjNDMTMsNTMuMiwxMS42LDU0LjEsMTAsNTQuMXoiLz4KCQk8cGF0aCBmaWxsPSIjQzBDMEJGIiBzdHJva2U9IiNDMEMwQkYiIHN0cm9rZS13aWR0aD0iMC4xIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik03LjIsNDkuNWMwLjYsMCwxLjItMC41LDEuMi0xLjEKCQkJYzAtMC42LTAuNS0xLjItMS4yLTEuMmMtMC42LDAtMS4xLDAuNS0xLjEsMS4yQzYuMSw0OSw2LjYsNDkuNSw3LjIsNDkuNXogTTcuMiw0OGMwLjIsMCwwLjQsMC4yLDAuNCwwLjRjMCwwLjItMC4yLDAuNC0wLjQsMC40CgkJCWMtMC4yLDAtMC40LTAuMi0wLjQtMC40QzYuOCw0OC4xLDcsNDgsNy4yLDQ4eiIvPgoJCTxwYXRoIGZpbGw9IiNDMEMwQkYiIHN0cm9rZT0iI0MwQzBCRiIgc3Ryb2tlLXdpZHRoPSIwLjEiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTEwLDQzYy0zLjgsMC03LDMuMS03LDdjMCwzLjgsMy4xLDcsNyw3CgkJCXM3LTMuMSw3LTdDMTcsNDYuMiwxMy44LDQzLDEwLDQzeiBNMTAsNTYuMmMtMy40LDAtNi4yLTIuOC02LjItNi4yYzAtMy40LDIuOC02LjIsNi4yLTYuMnM2LjIsMi44LDYuMiw2LjIKCQkJQzE2LjIsNTMuNCwxMy40LDU2LjIsMTAsNTYuMnoiLz4KCTwvZz4KCTxnPgoJCTxnPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNDMEMwQkYiIGQ9Ik02NC4xLDUzLjRsMi4zLDBjMC4yLDAsMC40LDAuMiwwLjQsMC40djIuMWMwLDAuMi0wLjIsMC40LTAuNCwwLjRoLTIuMwoJCQkJYy0wLjIsMC0wLjQtMC4yLTAuNC0wLjR2LTIuMUM2My43LDUzLjYsNjMuOCw1My40LDY0LjEsNTMuNHoiLz4KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzBDMEJGIiBkPSJNNzMuNSw1My41aDIuNGMwLjIsMCwwLjQsMC4yLDAuNCwwLjR2MmMwLDAuMi0wLjIsMC40LTAuNCwwLjRoLTIuNAoJCQkJYy0wLjIsMC0wLjQtMC4yLTAuNC0wLjRsMC0yQzczLjEsNTMuNiw3My4zLDUzLjUsNzMuNSw1My41eiIvPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNDMEMwQkYiIGQ9Ik02My43LDQ4LjRoMTIuNnY1SDYzLjdWNDguNHoiLz4KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzBDMEJGIiBkPSJNNjUuNSw0My42aDguOWMxLDAsMS45LDAuOCwxLjksMS45djMuMUg2My43di0zLjFDNjMuNyw0NC41LDY0LjUsNDMuNiw2NS41LDQzLjZ6Ii8+CgkJCTxlbGxpcHNlIGZpbGw9IiNDMEMwQkYiIGN4PSI2Ni4yIiBjeT0iNTAuOSIgcng9IjAuOSIgcnk9IjEiLz4KCQkJPGVsbGlwc2UgZmlsbD0iI0MwQzBCRiIgY3g9IjczLjgiIGN5PSI1MC45IiByeD0iMC45IiByeT0iMSIvPgoJCTwvZz4KCTwvZz4KCTxnPgoJCTxnPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNDMEMwQkYiIGQ9Ik05Ni40LDUwYzAsMy42LTIuOSw2LjUtNi40LDYuNXMtNi40LTIuOS02LjQtNi41czIuOS02LjUsNi40LTYuNVM5Ni40LDQ2LjQsOTYuNCw1MHoiLz4KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzBDMEJGIiBkPSJNOTYuMyw0OC42YzAsMCwwLDAuMSwwLDAuMWMtMC45LDAuMS0yLjksMC4xLTQuNi0xLjJjLTEuMS0wLjgtMi0xLjctMi42LTIuNQoJCQkJYy0wLjMtMC40LTAuNi0wLjgtMC43LTFjLTAuMS0wLjEtMC4xLTAuMi0wLjEtMC4yYzAuNS0wLjEsMS4yLTAuMiwyLTAuMmMxLjIsMCwyLjUsMC4zLDMuNSwxLjFjMSwwLjgsMS43LDEuOCwyLjEsMi44CgkJCQlDOTYuMSw0Ny45LDk2LjIsNDguMyw5Ni4zLDQ4LjZ6Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0MwQzBCRiIgZD0iTTg0LDUyLjJjMCwwLDAtMC4xLDAtMC4xYzAuOS0wLjIsMi45LTAuNCw0LjcsMC42YzEuMSwwLjcsMS45LDEuNSwyLjQsMi4zCgkJCQljMC40LDAuNSwwLjYsMSwwLjcsMS4zYy0wLjQsMC4xLTEsMC4yLTEuNywwLjNjLTEsMC0yLjEtMC4xLTMuMi0wLjhzLTEuOS0xLjYtMi40LTIuNUM4NC4yLDUyLjgsODQuMSw1Mi41LDg0LDUyLjJ6Ii8+CgkJPC9nPgoJPC9nPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0MwQzBCRiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMTE2LjMsNDYuOGwtMS40LDJsLTAuOC0wLjhsLTAuNi0wLjdsMCwwLjlsLTAuMSw4LjJoLTYuOAoJCQkJbC0wLjEtOC4ybDAtMC45bC0wLjYsMC43bC0wLjgsMC44bC0xLjQtMmwyLjYtMi45YzAuMS0wLjEsMC4yLTAuMSwwLjMtMC4xaDEuM2wwLjQsMC43YzAuNywxLjMsMi42LDEuMywzLjMtMC4xbDAuMy0wLjZoMS4yCgkJCQljMC4xLDAsMC4yLDAsMC4zLDAuMWwwLjMtMC4zbC0wLjMsMC4zTDExNi4zLDQ2Ljh6Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0MwQzBCRiIgZD0iTTExMC4xLDQ3LjdoMnYwLjljMCwwLjQtMC40LDAuNy0xLDAuN2MtMC42LDAtMS0wLjMtMS0wLjdMMTEwLjEsNDcuN0wxMTAuMSw0Ny43eiIvPgoJCTwvZz4KCTwvZz4KCTxnPgoJCTxnPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNDMEMwQkYiIGQ9Ik0xMjYuOCw1NC4zYzAsMS4yLTEsMi4yLTIuMiwyLjJzLTIuMi0xLTIuMi0yLjJzMS0yLjIsMi4yLTIuMlMxMjYuOCw1My4xLDEyNi44LDU0LjN6Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0MwQzBCRiIgZD0iTTEzNy42LDU0LjNjMCwxLjItMSwyLjItMi4yLDIuMmMtMS4yLDAtMi4yLTEtMi4yLTIuMnMxLTIuMiwyLjItMi4yCgkJCQlDMTM2LjYsNTIuMSwxMzcuNiw1My4xLDEzNy42LDU0LjN6Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0MwQzBCRiIgZD0iTTEyNi44LDQ0LjR2OS45Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0MwQzBCRiIgZD0iTTEzNy43LDQ0LjR2OS45Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0MwQzBCRiIgZD0iTTEyNi44LDQzLjVoMTAuOHYyLjdoLTEwLjhDMTI2LjgsNDYuMiwxMjYuOCw0My41LDEyNi44LDQzLjV6Ii8+CgkJPC9nPgoJPC9nPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGZpbGw9IiNDMEMwQkYiIGQ9Ik0xNzAuOCw0My4xTDE3MC44LDQzLjFjLTAuMywwLTAuNSwwLTAuOCwwYy0yLjEsMC00LDEtNS4zLDIuNWwtMC4xLDBsLTAuMS0wLjFsLTEtMS4ybC0wLjMsMy40bDMuNCwwLjMKCQkJCWwtMS4xLTEuM2wtMC4xLTAuMWwwLjEtMC4xYzEuMS0xLjUsMy0yLjMsNS0yLjFsMCwwYzMuMiwwLjMsNS41LDMuMSw1LjIsNi4zYy0wLjMsMy0zLjEsNS4zLTYuMSw1LjFjLTMuMS0wLjItNS40LTIuOS01LjMtNgoJCQkJbC0xLjMtMC4xYy0wLjIsMy44LDIuNiw3LjEsNi4zLDcuNGMzLjksMC4zLDcuMy0yLjYsNy42LTYuNUMxNzcuMiw0Ni44LDE3NC40LDQzLjUsMTcwLjgsNDMuMXoiLz4KCQkJPHBhdGggZmlsbD0iI0MwQzBCRiIgZD0iTTE3MC4zLDQ3LjRjMC0wLjMtMC4zLTAuNi0wLjYtMC42cy0wLjYsMC4zLTAuNiwwLjZ2My4yYzAsMC4yLDAuMSwwLjMsMC4yLDAuNGMwLjEsMC4xLDAuMywwLjIsMC40LDAuMgoJCQkJaDIuNGMwLjQsMCwwLjYtMC4zLDAuNi0wLjZjMC0wLjMtMC4zLTAuNi0wLjYtMC42aC0xLjZoLTAuMnYtMC4yTDE3MC4zLDQ3LjRMMTcwLjMsNDcuNHoiLz4KCQk8L2c+Cgk8L2c+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzBDMEJGIiBkPSJNMTg2LjIsNDMuNGg3LjdjMS41LDAsMi43LDEuMiwyLjcsMi43djcuN2MwLDEuNS0xLjIsMi43LTIuNywyLjdoLTcuNwoJCQkJYy0xLjUsMC0yLjctMS4yLTIuNy0yLjd2LTcuN0MxODMuNCw0NC43LDE4NC43LDQzLjQsMTg2LjIsNDMuNHoiLz4KCQkJPGVsbGlwc2UgZmlsbD0iI0MwQzBCRiIgY3g9IjE4NiIgY3k9IjQ4LjkiIHJ4PSIwLjciIHJ5PSIwLjciLz4KCQkJPGVsbGlwc2UgZmlsbD0iI0MwQzBCRiIgY3g9IjE5NCIgY3k9IjQ2LjciIHJ4PSIwLjciIHJ5PSIwLjciLz4KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzBDMEJGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0xODYsNTMuM2wwLjQtMC4zYzAuNC0wLjMsMS0wLjMsMS41LTAuMWwxLDAuNAoJCQkJYzAuNSwwLjIsMSwwLjIsMS41LTAuMWwwLjgtMC41YzAuNC0wLjMsMS0wLjMsMS41LTAuMWwxLjgsMC44Ii8+CgkJPC9nPgoJPC9nPgoJPHBhdGggZmlsbD0iI0MwQzBCRiIgc3Ryb2tlPSIjQzBDMEJGIiBzdHJva2Utd2lkdGg9IjAuMjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTE1Niw0NC4zYy0wLjItMC4xLTAuNC0wLjEtMC41LDAKCQljMCwwLTAuMiwwLjEtMC45LDAuMmMtMC43LDAtMi40LTAuMS0zLjgtMC42Yy0wLjgtMC4zLTEuNy0wLjUtMi41LTAuNWMtMC4yLDAtMC40LDAtMC41LDBjLTEuMywwLTIuNSwwLjMtMy42LDEKCQljLTAuMiwwLjEtMC4yLDAuMi0wLjIsMC40djExLjZjMCwwLjMsMC4xLDAuNSwwLjMsMC41YzAuNiwwLDAuNS0wLjQsMC41LTAuNnYtNS43YzAuNy0wLjMsMy4yLTEuMSw1LjgtMC4xCgkJYzEuNiwwLjYsMy41LDAuNyw0LjMsMC43YzAuOCwwLDEuMy0wLjMsMS4zLTAuM2MwLjItMC4xLDAuMy0wLjIsMC4zLTAuNHYtNS43QzE1Ni4yLDQ0LjYsMTU2LjEsNDQuNCwxNTYsNDQuM3ogTTE1NS42LDUwLjIKCQljLTAuMSwwLTAuNywwLjEtMSwwLjFjLTAuNywwLTIuNC0wLjEtMy44LTAuNmMtMi41LTEtNS0wLjUtNi4yLTAuMXYtNC45YzAuOS0wLjUsMi4yLTAuNywzLjItMC43YzAuMSwwLDAuMywwLDAuNCwwCgkJYzAuNywwLDEuNSwwLjIsMi4yLDAuNGMxLjYsMC42LDMuNSwwLjcsNC4zLDAuN2MwLjIsMCwwLjgsMCwxLTAuMVY1MC4yeiIvPgoJPGc+CgkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzBDMEJGIiBkPSJNNDguMSw0My41aDMuN2MyLjUsMCw0LjUsMiw0LjUsNC41YzAsMC41LTAuNCwwLjktMC45LDAuOUg0NC41Yy0wLjUsMC0wLjktMC40LTAuOS0wLjkKCQkJQzQzLjYsNDUuNSw0NS42LDQzLjUsNDguMSw0My41eiIvPgoJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0MwQzBCRiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNNDMuNSw0OC44Yy0wLjIsMC4xLTAuNSwxLjIsMCwxLjVjMS40LDEsOC41LDAuOCwxMS4zLDAuNgoJCQljMC44LTAuMSwxLjYtMC40LDEuNy0xLjJjMC0wLjMtMC4xLTAuNi0wLjYtMC45Ii8+CgkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzBDMEJGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik00My41LDUwLjZMNDMuMyw1MWMtMC4yLDAuNSwwLjIsMSwwLjcsMC45YzAuMy0wLjEsMC41LDAsMC43LDAuMwoJCQlsMC4xLDAuMmMwLjMsMC41LDEsMC42LDEuNSwwLjJsMCwwYzAuMy0wLjIsMC43LTAuMywxLTAuMmwwLjgsMC4zYzAuNCwwLjIsMC44LDAuMSwxLjIsMGwwLjUtMC4yYzAuNC0wLjIsMC45LTAuMiwxLjMsMGwwLjUsMC4yCgkJCWMwLjQsMC4yLDAuOCwwLjIsMS4yLDBsMC4yLTAuMWMwLjMtMC4yLDAuOC0wLjIsMS4xLDAuMWwwLjIsMC4yYzAuMywwLjMsMC44LDAuMiwxLTAuMmwwLjEtMC4yYzAuMS0wLjIsMC0wLjMsMC4yLTAuMwoJCQljMC41LDAsMS4yLTAuMywxLjEtMC43bC0wLjQtMS4xIi8+CgkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzBDMEJGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik00My41LDUyLjJjLTAuMSwwLjItMC4zLDAuOCwwLDEuMWMwLjMsMC40LDMsMS4xLDYuNCwxLjEKCQkJYzIuMiwwLDQuNi0wLjMsNi0wLjZjMC41LTAuMSwwLjktMC41LDAuOC0wLjljMC0wLjItMC4yLTAuNS0wLjQtMC43Ii8+CgkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzBDMEJGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik00My41LDUzLjNjMCwwLjUsMC42LDIuMywxLjMsMi43YzEuOCwwLjgsNS43LDAuNyw4LjEsMC41CgkJCWMxLjMtMC4xLDIuNS0wLjcsMy4yLTEuOGMwLjMtMC41LDAuNS0xLDAuNS0xLjQiLz4KCQk8ZWxsaXBzZSBmaWxsPSIjQzBDMEJGIiBjeD0iNTEuNiIgY3k9IjQ2LjUiIHJ4PSIwLjMiIHJ5PSIwLjQiLz4KCQk8ZWxsaXBzZSBmaWxsPSIjQzBDMEJGIiBjeD0iNTMiIGN5PSI0NSIgcng9IjAuMyIgcnk9IjAuNCIvPgoJCTxlbGxpcHNlIGZpbGw9IiNDMEMwQkYiIGN4PSI1MyIgY3k9IjQ3LjIiIHJ4PSIwLjMiIHJ5PSIwLjQiLz4KCQk8ZWxsaXBzZSBmaWxsPSIjQzBDMEJGIiBjeD0iNTQuMyIgY3k9IjQ2LjUiIHJ4PSIwLjMiIHJ5PSIwLjQiLz4KCQk8ZWxsaXBzZSBmaWxsPSIjQzBDMEJGIiBjeD0iNTAuOSIgY3k9IjQ1IiByeD0iMC4zIiByeT0iMC40Ii8+Cgk8L2c+Cgk8Zz4KCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNDMEMwQkYiIGQ9Ik0yNC4yLDUxdi03LjZjMC4xLDAuMSwwLjgsMC45LDIuOCwzLjFjMi41LTEuNyw1LjYtMC43LDYuOSwwbDIuNC0zLjF2Ny4xCgkJCWMwLDEuMi0wLjEsMi41LTAuOSwzLjRjLTEsMS4yLTIuNywyLjUtNS4zLDIuNWMtMi45LDAtNC41LTEuNS01LjMtMi45QzI0LjIsNTIuOSwyNC4yLDUyLDI0LjIsNTF6Ii8+CgkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzBDMEJGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0yMS4yLDUwbDUuNCwxLjIiLz4KCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNDMEMwQkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTIxLjIsNTQuMWw1LjQtMS4yIi8+CgkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzBDMEJGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0zOC44LDUwbC01LjQsMS4yIi8+CgkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzBDMEJGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0zOC44LDU0LjFsLTUuNC0xLjIiLz4KCQk8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI0MwQzBCRiIgZD0iTTI5LjUsNTIuNEwyOSw1MS43Yy0wLjItMC4zLDAtMC42LDAuMy0wLjZoMS40CgkJCWMwLjMsMCwwLjUsMC40LDAuMywwLjZsLTAuNywxbDAsMGMtMC43LDEuMi0yLjYsMS4xLTMuMS0wLjNsLTAuMS0wLjJjLTAuMS0wLjIsMC0wLjQsMC4yLTAuNXMwLjQsMCwwLjUsMC4ybDAuMSwwLjIKCQkJQzI4LjMsNTIuOCwyOS4xLDUyLjksMjkuNSw1Mi40eiIvPgoJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0MwQzBCRiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMzIuNCw1Mi4xbC0wLjEsMC4yYy0wLjQsMS0xLjgsMS4xLTIuMywwLjIiLz4KCQk8ZWxsaXBzZSBmaWxsPSIjQzBDMEJGIiBjeD0iMjcuNiIgY3k9IjQ5LjciIHJ4PSIwLjciIHJ5PSIwLjciLz4KCQk8ZWxsaXBzZSBmaWxsPSIjQzBDMEJGIiBjeD0iMzIuNCIgY3k9IjQ5LjciIHJ4PSIwLjciIHJ5PSIwLjciLz4KCTwvZz4KCTxnPgoJCTxwYXRoIGZpbGw9IiM2QUE5REQiIHN0cm9rZT0iIzZBQTlERCIgc3Ryb2tlLXdpZHRoPSIwLjEiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTE0LjYsNzEuMmMtMC4xLTAuMS0wLjItMC4yLTAuMy0wLjJINS43CgkJCWMtMC4xLDAtMC4yLDAuMS0wLjMsMC4yYy0wLjEsMC4xLTAuMSwwLjIsMCwwLjRjMC43LDIsMi41LDMuMyw0LjYsMy4zczMuOS0xLjMsNC42LTMuM0MxNC43LDcxLjUsMTQuNyw3MS4zLDE0LjYsNzEuMnogTTEwLDc0LjEKCQkJYy0xLjYsMC0zLTAuOS0zLjctMi4yaDcuM0MxMyw3My4yLDExLjYsNzQuMSwxMCw3NC4xeiIvPgoJCTxwYXRoIGZpbGw9IiM2QUE5REQiIHN0cm9rZT0iIzZBQTlERCIgc3Ryb2tlLXdpZHRoPSIwLjEiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTEyLjgsNjkuNWMwLjYsMCwxLjEtMC41LDEuMS0xLjEKCQkJYzAtMC42LTAuNS0xLjItMS4xLTEuMmMtMC42LDAtMS4yLDAuNS0xLjIsMS4yQzExLjYsNjksMTIuMiw2OS41LDEyLjgsNjkuNXogTTEyLjgsNjhjMC4yLDAsMC40LDAuMiwwLjQsMC40CgkJCWMwLDAuMi0wLjIsMC40LTAuNCwwLjRjLTAuMiwwLTAuNC0wLjItMC40LTAuNEMxMi40LDY4LjEsMTIuNiw2OCwxMi44LDY4eiIvPgoJCTxwYXRoIGZpbGw9IiM2QUE5REQiIHN0cm9rZT0iIzZBQTlERCIgc3Ryb2tlLXdpZHRoPSIwLjEiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTcuMiw2OS41YzAuNiwwLDEuMi0wLjUsMS4yLTEuMQoJCQljMC0wLjYtMC41LTEuMi0xLjItMS4yYy0wLjYsMC0xLjEsMC41LTEuMSwxLjJDNi4xLDY5LDYuNiw2OS41LDcuMiw2OS41eiBNNy4yLDY4YzAuMiwwLDAuNCwwLjIsMC40LDAuNGMwLDAuMi0wLjIsMC40LTAuNCwwLjQKCQkJYy0wLjIsMC0wLjQtMC4yLTAuNC0wLjRDNi44LDY4LjEsNyw2OCw3LjIsNjh6Ii8+CgkJPHBhdGggZmlsbD0iIzZBQTlERCIgc3Ryb2tlPSIjNkFBOUREIiBzdHJva2Utd2lkdGg9IjAuMSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTAsNjNjLTMuOCwwLTcsMy4xLTcsN2MwLDMuOCwzLjEsNyw3LDcKCQkJczctMy4xLDctN0MxNyw2Ni4yLDEzLjgsNjMsMTAsNjN6IE0xMCw3Ni4yYy0zLjQsMC02LjItMi44LTYuMi02LjJjMC0zLjQsMi44LTYuMiw2LjItNi4yczYuMiwyLjgsNi4yLDYuMgoJCQlDMTYuMiw3My40LDEzLjQsNzYuMiwxMCw3Ni4yeiIvPgoJPC9nPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZBQTlERCIgZD0iTTY0LjEsNzMuNGwyLjMsMGMwLjIsMCwwLjQsMC4yLDAuNCwwLjR2Mi4xYzAsMC4yLTAuMiwwLjQtMC40LDAuNGgtMi4zCgkJCQljLTAuMiwwLTAuNC0wLjItMC40LTAuNHYtMi4xQzYzLjcsNzMuNiw2My44LDczLjQsNjQuMSw3My40eiIvPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM2QUE5REQiIGQ9Ik03My41LDczLjVoMi40YzAuMiwwLDAuNCwwLjIsMC40LDAuNHYyLjFjMCwwLjItMC4yLDAuNC0wLjQsMC40aC0yLjQKCQkJCWMtMC4yLDAtMC40LTAuMi0wLjQtMC40bDAtMi4xQzczLjEsNzMuNiw3My4zLDczLjUsNzMuNSw3My41eiIvPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM2QUE5REQiIGQ9Ik02My43LDY4LjRoMTIuNnY1SDYzLjdWNjguNHoiLz4KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNkFBOUREIiBkPSJNNjUuNSw2My42aDguOWMxLDAsMS45LDAuOCwxLjksMS45djMuMUg2My43di0zLjFDNjMuNyw2NC41LDY0LjUsNjMuNiw2NS41LDYzLjZ6Ii8+CgkJCTxlbGxpcHNlIGZpbGw9IiM2QUE5REQiIGN4PSI2Ni4yIiBjeT0iNzAuOSIgcng9IjAuOSIgcnk9IjAuOSIvPgoJCQk8ZWxsaXBzZSBmaWxsPSIjNkFBOUREIiBjeD0iNzMuOCIgY3k9IjcwLjkiIHJ4PSIwLjkiIHJ5PSIwLjkiLz4KCQk8L2c+Cgk8L2c+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNkFBOUREIiBkPSJNOTYuNCw3MGMwLDMuNi0yLjksNi41LTYuNCw2LjVzLTYuNC0yLjktNi40LTYuNXMyLjktNi41LDYuNC02LjVTOTYuNCw2Ni40LDk2LjQsNzB6Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZBQTlERCIgZD0iTTk2LjMsNjguNmMwLDAsMCwwLjEsMCwwLjFjLTAuOSwwLjEtMi45LDAuMS00LjYtMS4yYy0xLjEtMC44LTItMS43LTIuNi0yLjUKCQkJCWMtMC4zLTAuNC0wLjYtMC44LTAuNy0xLjFjLTAuMS0wLjEtMC4xLTAuMi0wLjEtMC4yYzAuNS0wLjEsMS4yLTAuMiwyLTAuMmMxLjIsMCwyLjUsMC4zLDMuNSwxLjFjMSwwLjgsMS43LDEuOCwyLjEsMi44CgkJCQlDOTYuMSw2Ny45LDk2LjIsNjguMyw5Ni4zLDY4LjZ6Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZBQTlERCIgZD0iTTg0LDcyLjJjMCwwLDAtMC4xLDAtMC4xYzAuOS0wLjIsMi45LTAuNCw0LjcsMC42YzEuMSwwLjcsMS45LDEuNSwyLjQsMi4zCgkJCQljMC40LDAuNSwwLjYsMSwwLjcsMS4zYy0wLjQsMC4xLTEsMC4yLTEuNywwLjNjLTEsMC0yLjEtMC4xLTMuMi0wLjhzLTEuOS0xLjYtMi40LTIuNUM4NC4yLDcyLjgsODQuMSw3Mi40LDg0LDcyLjJ6Ii8+CgkJPC9nPgoJPC9nPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZBQTlERCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMTE2LjMsNjYuOGwtMS40LDJsLTAuOC0wLjhsLTAuNi0wLjdsMCwwLjlsLTAuMSw4LjJoLTYuOAoJCQkJbC0wLjEtOC4ybDAtMC45bC0wLjYsMC43bC0wLjgsMC44bC0xLjQtMmwyLjYtMi45YzAuMS0wLjEsMC4yLTAuMSwwLjMtMC4xaDEuM2wwLjQsMC43YzAuNywxLjMsMi42LDEuMywzLjMtMC4xbDAuMy0wLjZoMS4yCgkJCQljMC4xLDAsMC4yLDAsMC4zLDAuMWwwLjMtMC4zbC0wLjMsMC4zTDExNi4zLDY2Ljh6Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZBQTlERCIgZD0iTTExMC4xLDY3LjdoMnYwLjljMCwwLjQtMC40LDAuNy0xLDAuN2MtMC42LDAtMS0wLjMtMS0wLjdMMTEwLjEsNjcuN0wxMTAuMSw2Ny43eiIvPgoJCTwvZz4KCTwvZz4KCTxnPgoJCTxnPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM2QUE5REQiIGQ9Ik0xMjYuOCw3NC4zYzAsMS4yLTEsMi4yLTIuMiwyLjJzLTIuMi0xLTIuMi0yLjJzMS0yLjIsMi4yLTIuMlMxMjYuOCw3My4xLDEyNi44LDc0LjN6Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZBQTlERCIgZD0iTTEzNy42LDc0LjNjMCwxLjItMSwyLjItMi4yLDIuMmMtMS4yLDAtMi4yLTEtMi4yLTIuMnMxLTIuMiwyLjItMi4yCgkJCQlDMTM2LjYsNzIuMSwxMzcuNiw3My4xLDEzNy42LDc0LjN6Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZBQTlERCIgZD0iTTEyNi44LDY0LjR2OS45Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZBQTlERCIgZD0iTTEzNy43LDY0LjR2OS45Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZBQTlERCIgZD0iTTEyNi44LDYzLjVoMTAuOHYyLjdoLTEwLjhDMTI2LjgsNjYuMiwxMjYuOCw2My41LDEyNi44LDYzLjV6Ii8+CgkJPC9nPgoJPC9nPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGZpbGw9IiM2QUE5REQiIGQ9Ik0xNzAuOCw2My4xTDE3MC44LDYzLjFjLTAuMywwLTAuNSwwLTAuOCwwYy0yLjEsMC00LDEtNS4zLDIuNWwtMC4xLDBsLTAuMS0wLjFsLTEtMS4ybC0wLjMsMy40bDMuNCwwLjMKCQkJCWwtMS4xLTEuM2wtMC4xLTAuMWwwLjEtMC4xYzEuMS0xLjQsMy0yLjMsNS0yLjFsMCwwYzMuMiwwLjMsNS41LDMuMSw1LjIsNi4zYy0wLjMsMy0zLjEsNS4zLTYuMSw1LjFjLTMuMS0wLjItNS40LTIuOS01LjMtNgoJCQkJbC0xLjMtMC4xYy0wLjIsMy44LDIuNiw3LjEsNi4zLDcuNGMzLjksMC4zLDcuMy0yLjYsNy42LTYuNUMxNzcuMiw2Ni44LDE3NC40LDYzLjUsMTcwLjgsNjMuMXoiLz4KCQkJPHBhdGggZmlsbD0iIzZBQTlERCIgZD0iTTE3MC4zLDY3LjRjMC0wLjMtMC4zLTAuNi0wLjYtMC42cy0wLjYsMC4zLTAuNiwwLjZ2My4yYzAsMC4yLDAuMSwwLjMsMC4yLDAuNGMwLjEsMC4xLDAuMywwLjIsMC40LDAuMgoJCQkJaDIuNGMwLjQsMCwwLjYtMC4zLDAuNi0wLjZTMTcyLjQsNzAsMTcyLDcwaC0xLjZoLTAuMnYtMC4yTDE3MC4zLDY3LjRMMTcwLjMsNjcuNHoiLz4KCQk8L2c+Cgk8L2c+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNkFBOUREIiBkPSJNMTg2LjIsNjMuNGg3LjdjMS41LDAsMi43LDEuMiwyLjcsMi43djcuN2MwLDEuNS0xLjIsMi43LTIuNywyLjdoLTcuNwoJCQkJYy0xLjUsMC0yLjctMS4yLTIuNy0yLjd2LTcuN0MxODMuNCw2NC43LDE4NC43LDYzLjQsMTg2LjIsNjMuNHoiLz4KCQkJPGVsbGlwc2UgZmlsbD0iIzZBQTlERCIgY3g9IjE4NiIgY3k9IjY4LjkiIHJ4PSIwLjciIHJ5PSIwLjciLz4KCQkJPGVsbGlwc2UgZmlsbD0iIzZBQTlERCIgY3g9IjE5NCIgY3k9IjY2LjciIHJ4PSIwLjciIHJ5PSIwLjciLz4KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNkFBOUREIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0xODYsNzMuM2wwLjQtMC4zYzAuNC0wLjMsMS0wLjMsMS41LTAuMWwxLDAuNAoJCQkJYzAuNSwwLjIsMSwwLjIsMS41LTAuMWwwLjgtMC41YzAuNC0wLjMsMS0wLjMsMS41LTAuMWwxLjgsMC44Ii8+CgkJPC9nPgoJPC9nPgoJPHBhdGggZmlsbD0iIzZBQTlERCIgc3Ryb2tlPSIjNkFBOUREIiBzdHJva2Utd2lkdGg9IjAuMjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTE1Niw2NC4zYy0wLjItMC4xLTAuNC0wLjEtMC41LDAKCQljMCwwLTAuMiwwLjEtMC45LDAuMmMtMC43LDAtMi40LTAuMS0zLjgtMC42Yy0wLjgtMC4zLTEuNy0wLjUtMi41LTAuNWMtMC4yLDAtMC40LDAtMC41LDBjLTEuMywwLTIuNSwwLjMtMy42LDEKCQljLTAuMiwwLjEtMC4yLDAuMi0wLjIsMC40djExLjZjMCwwLjMsMC4xLDAuNSwwLjMsMC41YzAuNiwwLDAuNS0wLjQsMC41LTAuNnYtNS43YzAuNy0wLjMsMy4yLTEuMSw1LjgtMC4xCgkJYzEuNiwwLjYsMy41LDAuNyw0LjMsMC43YzAuOCwwLDEuMy0wLjMsMS4zLTAuM2MwLjItMC4xLDAuMy0wLjIsMC4zLTAuNHYtNS43QzE1Ni4yLDY0LjYsMTU2LjEsNjQuNCwxNTYsNjQuM3ogTTE1NS42LDcwLjIKCQljLTAuMSwwLTAuNywwLjEtMSwwLjFjLTAuNywwLTIuNC0wLjEtMy44LTAuNmMtMi41LTEtNS0wLjUtNi4yLTAuMXYtNC45YzAuOS0wLjUsMi4yLTAuNywzLjItMC43YzAuMSwwLDAuMywwLDAuNCwwCgkJYzAuNywwLDEuNSwwLjIsMi4yLDAuNGMxLjYsMC42LDMuNSwwLjcsNC4zLDAuN2MwLjIsMCwwLjgsMCwxLTAuMVY3MC4yeiIvPgoJPGc+CgkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNkFBOUREIiBkPSJNNDguMSw2My41aDMuN2MyLjUsMCw0LjUsMiw0LjUsNC41YzAsMC41LTAuNCwwLjktMC45LDAuOUg0NC41Yy0wLjUsMC0wLjktMC40LTAuOS0wLjkKCQkJQzQzLjYsNjUuNSw0NS42LDYzLjUsNDguMSw2My41eiIvPgoJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZBQTlERCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNNDMuNSw2OC44Yy0wLjIsMC4xLTAuNSwxLjIsMCwxLjVjMS40LDAuOSw4LjUsMC44LDExLjMsMC42CgkJCWMwLjgtMC4xLDEuNi0wLjQsMS43LTEuMmMwLTAuMy0wLjEtMC42LTAuNi0wLjkiLz4KCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM2QUE5REQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTQzLjUsNzAuNkw0My4zLDcxYy0wLjIsMC41LDAuMiwxLDAuNywwLjljMC4zLTAuMSwwLjUsMC4xLDAuNywwLjMKCQkJbDAuMSwwLjJjMC4zLDAuNSwxLDAuNiwxLjUsMC4ybDAsMGMwLjMtMC4yLDAuNy0wLjMsMS0wLjJsMC44LDAuM2MwLjQsMC4yLDAuOCwwLjEsMS4yLDBsMC41LTAuMmMwLjQtMC4yLDAuOS0wLjIsMS4zLDBsMC41LDAuMgoJCQljMC40LDAuMiwwLjgsMC4yLDEuMi0wLjFsMC4yLTAuMWMwLjMtMC4yLDAuOC0wLjIsMS4xLDAuMWwwLjIsMC4yYzAuMywwLjMsMC44LDAuMiwxLTAuMmwwLjEtMC4yYzAuMS0wLjIsMC0wLjMsMC4yLTAuMwoJCQljMC41LDAsMS4yLTAuMywxLjEtMC43bC0wLjQtMS4xIi8+CgkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNkFBOUREIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik00My41LDcyLjJjLTAuMSwwLjItMC4zLDAuOCwwLDEuMWMwLjMsMC40LDMsMS4xLDYuNCwxLjEKCQkJYzIuMiwwLDQuNi0wLjMsNi0wLjZjMC41LTAuMSwwLjktMC40LDAuOC0wLjljMC0wLjItMC4yLTAuNS0wLjQtMC43Ii8+CgkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNkFBOUREIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik00My41LDczLjNjMCwwLjUsMC42LDIuMywxLjMsMi43YzEuOCwwLjgsNS43LDAuNyw4LjEsMC41CgkJCWMxLjMtMC4xLDIuNS0wLjcsMy4yLTEuOGMwLjMtMC41LDAuNS0xLDAuNS0xLjQiLz4KCQk8ZWxsaXBzZSBmaWxsPSIjNkFBOUREIiBjeD0iNTEuNiIgY3k9IjY2LjUiIHJ4PSIwLjMiIHJ5PSIwLjQiLz4KCQk8ZWxsaXBzZSBmaWxsPSIjNkFBOUREIiBjeD0iNTMiIGN5PSI2NSIgcng9IjAuMyIgcnk9IjAuNCIvPgoJCTxlbGxpcHNlIGZpbGw9IiM2QUE5REQiIGN4PSI1MyIgY3k9IjY3LjIiIHJ4PSIwLjMiIHJ5PSIwLjQiLz4KCQk8ZWxsaXBzZSBmaWxsPSIjNkFBOUREIiBjeD0iNTQuMyIgY3k9IjY2LjUiIHJ4PSIwLjMiIHJ5PSIwLjQiLz4KCQk8ZWxsaXBzZSBmaWxsPSIjNkFBOUREIiBjeD0iNTAuOSIgY3k9IjY1IiByeD0iMC4zIiByeT0iMC40Ii8+Cgk8L2c+Cgk8Zz4KCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM2QUE5REQiIGQ9Ik0yNC4yLDcxdi03LjZjMC4xLDAuMSwwLjgsMC45LDIuOCwzLjFjMi41LTEuNyw1LjYtMC43LDYuOSwwbDIuNC0zLjF2Ny4xCgkJCWMwLDEuMi0wLjEsMi41LTAuOSwzLjRjLTEsMS4yLTIuNywyLjUtNS4zLDIuNWMtMi45LDAtNC41LTEuNS01LjMtMi45QzI0LjIsNzIuOSwyNC4yLDcyLDI0LjIsNzF6Ii8+CgkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNkFBOUREIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0yMS4yLDcwLjFsNS40LDEuMiIvPgoJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZBQTlERCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMjEuMiw3NC4xbDUuNC0xLjIiLz4KCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM2QUE5REQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTM4LjgsNzAuMWwtNS40LDEuMiIvPgoJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZBQTlERCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMzguOCw3NC4xbC01LjQtMS4yIi8+CgkJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiM2QUE5REQiIGQ9Ik0yOS41LDcyLjRMMjksNzEuN2MtMC4yLTAuMywwLTAuNiwwLjMtMC42aDEuNAoJCQljMC4zLDAsMC41LDAuNCwwLjMsMC42bC0wLjcsMWwwLDBjLTAuNywxLjItMi42LDEuMS0zLjEtMC4zbC0wLjEtMC4yYy0wLjEtMC4yLDAtMC40LDAuMi0wLjVjMC4yLTAuMSwwLjQsMCwwLjUsMC4ybDAuMSwwLjIKCQkJQzI4LjMsNzIuOCwyOS4xLDcyLjksMjkuNSw3Mi40eiIvPgoJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZBQTlERCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMzIuNCw3Mi4xbC0wLjEsMC4yYy0wLjQsMS0xLjgsMS4xLTIuMywwLjIiLz4KCQk8ZWxsaXBzZSBmaWxsPSIjNkFBOUREIiBjeD0iMjcuNiIgY3k9IjY5LjciIHJ4PSIwLjciIHJ5PSIwLjciLz4KCQk8ZWxsaXBzZSBmaWxsPSIjNkFBOUREIiBjeD0iMzIuNCIgY3k9IjY5LjciIHJ4PSIwLjciIHJ5PSIwLjciLz4KCTwvZz4KPC9nPgo8Zz4KCTxwYXRoIGZpbGw9IiM4Njg2ODYiIHN0cm9rZT0iIzg2ODY4NiIgc3Ryb2tlLXdpZHRoPSIwLjEiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTEyLjgsOS41YzAuNiwwLDEuMS0wLjUsMS4xLTEuMgoJCWMwLTAuNi0wLjUtMS4xLTEuMS0xLjFjLTAuNiwwLTEuMiwwLjUtMS4yLDEuMVMxMi4yLDkuNSwxMi44LDkuNXogTTEyLjgsNy45YzAuMiwwLDAuNCwwLjIsMC40LDAuNGMwLDAuMi0wLjIsMC40LTAuNCwwLjQKCQljLTAuMiwwLTAuNC0wLjItMC40LTAuNEMxMi40LDguMSwxMi42LDcuOSwxMi44LDcuOXoiLz4KCTxwYXRoIGZpbGw9IiM4Njg2ODYiIHN0cm9rZT0iIzg2ODY4NiIgc3Ryb2tlLXdpZHRoPSIwLjEiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTcuMiw5LjVjMC42LDAsMS4yLTAuNSwxLjItMS4yCgkJYzAtMC42LTAuNS0xLjEtMS4yLTEuMWMtMC42LDAtMS4xLDAuNS0xLjEsMS4xUzYuNiw5LjUsNy4yLDkuNXogTTcuMiw3LjljMC4yLDAsMC40LDAuMiwwLjQsMC40YzAsMC4yLTAuMiwwLjQtMC40LDAuNAoJCUM3LDguNyw2LjgsOC41LDYuOCw4LjNDNi44LDguMSw3LDcuOSw3LjIsNy45eiIvPgoJPHBhdGggZmlsbD0iIzg2ODY4NiIgc3Ryb2tlPSIjODY4Njg2IiBzdHJva2Utd2lkdGg9IjAuMSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTQuNiwxMS4yYy0wLjEtMC4xLTAuMi0wLjItMC4zLTAuMkg1LjcKCQljLTAuMSwwLTAuMiwwLjEtMC4zLDAuMmMtMC4xLDAuMS0wLjEsMC4yLDAsMC40YzAuNywyLDIuNSwzLjMsNC42LDMuM3MzLjktMS4zLDQuNi0zLjNDMTQuNywxMS40LDE0LjcsMTEuMywxNC42LDExLjJ6IE0xMCwxNC4xCgkJYy0xLjYsMC0zLTAuOS0zLjctMi4yaDcuM0MxMywxMy4yLDExLjYsMTQuMSwxMCwxNC4xeiIvPgoJPHBhdGggZmlsbD0iIzg2ODY4NiIgc3Ryb2tlPSIjODY4Njg2IiBzdHJva2Utd2lkdGg9IjAuMSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTAsM2MtMy44LDAtNywzLjEtNyw3czMuMSw3LDcsN3M3LTMuMSw3LTcKCQlTMTMuOCwzLDEwLDN6IE0xMCwxNi4yYy0zLjQsMC02LjItMi44LTYuMi02LjJTNi42LDMuOCwxMCwzLjhzNi4yLDIuOCw2LjIsNi4yUzEzLjQsMTYuMiwxMCwxNi4yeiIvPgo8L2c+CjxnIGlkPSJDYXJfMDAwMDAwMTg5MzUzOTUwODU0MTM0MTM3NTAwMDAwMDA4MjUyNzM4Nzc4NDI3NzU3MTVfIj4KCTxnPgoJCTxnPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM4Njg2ODYiIGQ9Ik02NC4xLDEzLjRsMi4zLDBjMC4yLDAsMC40LDAuMiwwLjQsMC40djIuMWMwLDAuMi0wLjIsMC40LTAuNCwwLjRoLTIuMwoJCQkJYy0wLjIsMC0wLjQtMC4yLTAuNC0wLjR2LTIuMUM2My43LDEzLjYsNjMuOCwxMy40LDY0LjEsMTMuNHoiLz4KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODY4Njg2IiBkPSJNNzMuNSwxMy40aDIuNGMwLjIsMCwwLjQsMC4yLDAuNCwwLjR2Mi4xYzAsMC4yLTAuMiwwLjQtMC40LDAuNGgtMi40CgkJCQljLTAuMiwwLTAuNC0wLjItMC40LTAuNGwwLTIuMUM3My4xLDEzLjYsNzMuMywxMy40LDczLjUsMTMuNHoiLz4KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODY4Njg2IiBkPSJNNjMuNyw4LjRoMTIuNnY1SDYzLjdWOC40eiIvPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM4Njg2ODYiIGQ9Ik02NS41LDMuNmg4LjljMSwwLDEuOSwwLjgsMS45LDEuOXYzLjFINjMuN1Y1LjVDNjMuNyw0LjQsNjQuNSwzLjYsNjUuNSwzLjZ6Ii8+CgkJCTxlbGxpcHNlIGZpbGw9IiM4Njg2ODYiIGN4PSI2Ni4yIiBjeT0iMTAuOSIgcng9IjAuOSIgcnk9IjAuOSIvPgoJCQk8ZWxsaXBzZSBmaWxsPSIjODY4Njg2IiBjeD0iNzMuOCIgY3k9IjEwLjkiIHJ4PSIwLjkiIHJ5PSIwLjkiLz4KCQk8L2c+Cgk8L2c+CjwvZz4KPGcgaWQ9IkFjdGl2aXRpZXMiPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg2ODY4NiIgZD0iTTk2LjQsMTBjMCwzLjYtMi45LDYuNS02LjQsNi41cy02LjQtMi45LTYuNC02LjVzMi45LTYuNSw2LjQtNi41Uzk2LjQsNi40LDk2LjQsMTB6Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg2ODY4NiIgZD0iTTk2LjMsOC42YzAsMCwwLDAuMSwwLDAuMWMtMC45LDAuMS0yLjksMC4xLTQuNi0xLjJjLTEuMS0wLjgtMi0xLjctMi42LTIuNQoJCQkJYy0wLjMtMC40LTAuNi0wLjgtMC43LTEuMWMtMC4xLTAuMS0wLjEtMC4yLTAuMS0wLjJjMC41LTAuMSwxLjItMC4yLDItMC4yYzEuMiwwLDIuNSwwLjMsMy41LDEuMWMxLDAuOCwxLjcsMS44LDIuMSwyLjgKCQkJCUM5Ni4xLDcuOSw5Ni4yLDguMyw5Ni4zLDguNnoiLz4KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODY4Njg2IiBkPSJNODQsMTIuMWMwLDAsMC0wLjEsMC0wLjFjMC45LTAuMiwyLjktMC40LDQuNywwLjZjMS4xLDAuNiwxLjksMS41LDIuNCwyLjMKCQkJCWMwLjQsMC41LDAuNiwxLDAuNywxLjNjLTAuNCwwLjEtMSwwLjItMS43LDAuM2MtMSwwLTIuMS0wLjEtMy4yLTAuOGMtMS4xLTAuNi0xLjktMS42LTIuNC0yLjVDODQuMiwxMi44LDg0LjEsMTIuNCw4NCwxMi4xeiIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8ZyBpZD0iT2JqZWN0c18wMDAwMDA2NDMxMjM3MTczOTEzMDMxNTI1MDAwMDAxMDIyNTg4OTAzMjIyODYzMjk3NV8iPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg2ODY4NiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMTE2LjMsNi44bC0xLjQsMkwxMTQuMSw4bC0wLjYtMC43bDAsMC45bC0wLjEsOC4yaC02LjhsLTAuMS04LjIKCQkJCWwwLTAuOUwxMDUuOSw4bC0wLjgsMC44bC0xLjQtMmwyLjYtMi45YzAuMS0wLjEsMC4yLTAuMSwwLjMtMC4xaDEuM2wwLjQsMC43YzAuNywxLjMsMi42LDEuMywzLjMtMC4xbDAuMy0wLjZoMS4yCgkJCQljMC4xLDAsMC4yLDAsMC4zLDAuMWwwLjMtMC4zbC0wLjMsMC4zTDExNi4zLDYuOHoiLz4KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODY4Njg2IiBkPSJNMTEwLjEsNy43aDJ2MC45YzAsMC40LTAuNCwwLjctMSwwLjdjLTAuNiwwLTEtMC4zLTEtMC43TDExMC4xLDcuN0wxMTAuMSw3Ljd6Ii8+CgkJPC9nPgoJPC9nPgo8L2c+CjxnIGlkPSJTeW1ib2xzXzAwMDAwMDk2NzQ2OTA3ODY5OTI5OTIxMTgwMDAwMDA2NDg0ODEyODMwMjgyNTgyNDE2XyI+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODY4Njg2IiBkPSJNMTI2LjgsMTQuM2MwLDEuMi0xLDIuMi0yLjIsMi4ycy0yLjItMS0yLjItMi4yczEtMi4yLDIuMi0yLjJTMTI2LjgsMTMuMSwxMjYuOCwxNC4zeiIvPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM4Njg2ODYiIGQ9Ik0xMzcuNiwxNC4zYzAsMS4yLTEsMi4yLTIuMiwyLjJjLTEuMiwwLTIuMi0xLTIuMi0yLjJzMS0yLjIsMi4yLTIuMgoJCQkJQzEzNi42LDEyLjEsMTM3LjYsMTMuMSwxMzcuNiwxNC4zeiIvPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM4Njg2ODYiIGQ9Ik0xMjYuOCw0LjR2OS45Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg2ODY4NiIgZD0iTTEzNy43LDQuNHY5LjkiLz4KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODY4Njg2IiBkPSJNMTI2LjgsMy41aDEwLjh2Mi43aC0xMC44QzEyNi44LDYuMiwxMjYuOCwzLjUsMTI2LjgsMy41eiIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8ZyBpZD0iUmVjZW50cyI+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggZmlsbD0iIzg2ODY4NiIgZD0iTTE3MC44LDMuMUwxNzAuOCwzLjFjLTAuMywwLTAuNSwwLTAuOCwwYy0yLjEsMC00LDEtNS4zLDIuNWwtMC4xLDBsLTAuMS0wLjFsLTEtMS4ybC0wLjMsMy40bDMuNCwwLjMKCQkJCWwtMS4xLTEuM2wtMC4xLTAuMWwwLjEtMC4xYzEuMS0xLjQsMy0yLjMsNS0yLjFsMCwwYzMuMiwwLjMsNS41LDMuMSw1LjIsNi4zYy0wLjMsMy0zLjEsNS4zLTYuMSw1LjFjLTMuMS0wLjItNS40LTIuOS01LjMtNgoJCQkJTDE2Myw5LjVjLTAuMiwzLjgsMi42LDcuMSw2LjMsNy40YzMuOSwwLjQsNy4zLTIuNiw3LjYtNi41QzE3Ny4yLDYuOCwxNzQuNCwzLjUsMTcwLjgsMy4xeiIvPgoJCQk8cGF0aCBmaWxsPSIjODY4Njg2IiBkPSJNMTcwLjMsNy40YzAtMC4zLTAuMy0wLjYtMC42LTAuNlMxNjksNy4xLDE2OSw3LjR2My4yYzAsMC4yLDAuMSwwLjMsMC4yLDAuNGMwLjEsMC4xLDAuMywwLjIsMC40LDAuMgoJCQkJaDIuNGMwLjQsMCwwLjYtMC4zLDAuNi0wLjZzLTAuMy0wLjYtMC42LTAuNmgtMS42aC0wLjJWOS44TDE3MC4zLDcuNEwxNzAuMyw3LjR6Ii8+CgkJPC9nPgoJPC9nPgo8L2c+CjxnIGlkPSJDdXN0b21fMDAwMDAxODEwODcyMjk0MzQzMDIzMzY3ODAwMDAwMDUxNTIyNzc5NDU5NDA2NzQ0ODhfIj4KCTxnPgoJCTxnPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM4Njg2ODYiIGQ9Ik0xODYuMiwzLjRoNy43YzEuNSwwLDIuNywxLjIsMi43LDIuN3Y3LjdjMCwxLjUtMS4yLDIuNy0yLjcsMi43aC03LjcKCQkJCWMtMS41LDAtMi43LTEuMi0yLjctMi43VjYuMUMxODMuNCw0LjYsMTg0LjcsMy40LDE4Ni4yLDMuNHoiLz4KCQkJPGVsbGlwc2UgZmlsbD0iIzg2ODY4NiIgY3g9IjE4NiIgY3k9IjguOSIgcng9IjAuNyIgcnk9IjAuNyIvPgoJCQk8ZWxsaXBzZSBmaWxsPSIjODY4Njg2IiBjeD0iMTk0IiBjeT0iNi43IiByeD0iMC43IiByeT0iMC43Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg2ODY4NiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMTg2LDEzLjNsMC40LTAuM2MwLjQtMC4zLDEtMC4zLDEuNS0wLjFsMSwwLjQKCQkJCWMwLjUsMC4yLDEsMC4yLDEuNS0wLjFsMC44LTAuNWMwLjQtMC4zLDEtMC4zLDEuNS0wLjFsMS44LDAuOCIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8cGF0aCBmaWxsPSIjODY4Njg2IiBzdHJva2U9IiM4Njg2ODYiIHN0cm9rZS13aWR0aD0iMC4yNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTU2LDQuM2MtMC4yLTAuMS0wLjQtMC4xLTAuNSwwCgljMCwwLTAuMiwwLjEtMC45LDAuMWMtMC43LDAtMi40LTAuMS0zLjgtMC42Yy0wLjgtMC4zLTEuNy0wLjUtMi41LTAuNWMtMC4yLDAtMC40LDAtMC41LDBjLTEuMywwLTIuNSwwLjMtMy42LDEKCWMtMC4yLDAuMS0wLjIsMC4yLTAuMiwwLjR2MTEuNmMwLDAuMywwLjEsMC41LDAuMywwLjVjMC42LDAsMC41LTAuNCwwLjUtMC42di01LjdjMC43LTAuMywzLjItMS4xLDUuOC0wLjFjMS42LDAuNiwzLjUsMC43LDQuMywwLjcKCWMwLjgsMCwxLjMtMC4zLDEuMy0wLjNjMC4yLTAuMSwwLjMtMC4yLDAuMy0wLjRWNC43QzE1Ni4yLDQuNSwxNTYuMSw0LjQsMTU2LDQuM3ogTTE1NS42LDEwLjJjLTAuMSwwLTAuNywwLjEtMSwwLjEKCWMtMC43LDAtMi40LTAuMS0zLjgtMC42Yy0yLjUtMS01LTAuNS02LjItMC4xVjQuN2MwLjktMC41LDIuMi0wLjcsMy4yLTAuN2MwLjEsMCwwLjMsMCwwLjQsMGMwLjcsMCwxLjUsMC4yLDIuMiwwLjQKCWMxLjYsMC42LDMuNSwwLjcsNC4zLDAuN2MwLjIsMCwwLjgsMCwxLTAuMVYxMC4yeiIvPgo8ZyBpZD0iRm9vZCI+Cgk8ZyBpZD0iTGF5ZXJfMTIiPgoJCTxnPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM4Njg2ODYiIGQ9Ik00OC4xLDMuNWgzLjdjMi41LDAsNC41LDIsNC41LDQuNWMwLDAuNS0wLjQsMC45LTAuOSwwLjlINDQuNWMtMC41LDAtMC45LTAuNC0wLjktMC45CgkJCQlDNDMuNiw1LjUsNDUuNiwzLjUsNDguMSwzLjV6Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg2ODY4NiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNNDMuNSw4LjdjLTAuMiwwLjEtMC41LDEuMiwwLDEuNWMxLjQsMC45LDguNSwwLjgsMTEuMywwLjYKCQkJCWMwLjgtMC4xLDEuNi0wLjQsMS43LTEuMmMwLTAuMy0wLjEtMC42LTAuNi0wLjkiLz4KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODY4Njg2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik00My41LDEwLjZMNDMuMywxMWMtMC4yLDAuNSwwLjIsMSwwLjcsMC45CgkJCQljMC4zLTAuMSwwLjUsMC4xLDAuNywwLjNsMC4xLDAuMmMwLjMsMC41LDEsMC42LDEuNSwwLjJsMCwwYzAuMy0wLjIsMC43LTAuMywxLTAuMmwwLjgsMC4zYzAuNCwwLjEsMC44LDAuMSwxLjIsMGwwLjUtMC4yCgkJCQljMC40LTAuMiwwLjktMC4yLDEuMywwbDAuNSwwLjJjMC40LDAuMiwwLjgsMC4xLDEuMi0wLjFsMC4yLTAuMWMwLjMtMC4yLDAuOC0wLjEsMS4xLDAuMWwwLjIsMC4yYzAuMywwLjMsMC44LDAuMiwxLTAuMmwwLjEtMC4yCgkJCQljMC4xLTAuMiwwLTAuMywwLjItMC40YzAuNSwwLDEuMi0wLjMsMS4xLTAuN2wtMC40LTEuMSIvPgoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM4Njg2ODYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTQzLjUsMTIuMWMtMC4xLDAuMi0wLjMsMC44LDAsMS4xYzAuMywwLjQsMywxLjEsNi40LDEuMQoJCQkJYzIuMiwwLDQuNi0wLjMsNi0wLjZjMC41LTAuMSwwLjktMC40LDAuOC0wLjljMC0wLjItMC4yLTAuNS0wLjQtMC43Ii8+CgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg2ODY4NiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNNDMuNSwxMy4zYzAsMC41LDAuNiwyLjQsMS4zLDIuNmMxLjgsMC44LDUuNywwLjcsOC4xLDAuNQoJCQkJYzEuMy0wLjEsMi41LTAuNywzLjItMS44YzAuMy0wLjUsMC41LTEsMC41LTEuNCIvPgoJCQk8ZWxsaXBzZSBmaWxsPSIjODY4Njg2IiBjeD0iNTEuNiIgY3k9IjYuNSIgcng9IjAuMyIgcnk9IjAuNCIvPgoJCQk8ZWxsaXBzZSBmaWxsPSIjODY4Njg2IiBjeD0iNTMiIGN5PSI0LjkiIHJ4PSIwLjMiIHJ5PSIwLjQiLz4KCQkJPGVsbGlwc2UgZmlsbD0iIzg2ODY4NiIgY3g9IjUzIiBjeT0iNy4yIiByeD0iMC4zIiByeT0iMC40Ii8+CgkJCTxlbGxpcHNlIGZpbGw9IiM4Njg2ODYiIGN4PSI1NC4zIiBjeT0iNi41IiByeD0iMC4zIiByeT0iMC40Ii8+CgkJCTxlbGxpcHNlIGZpbGw9IiM4Njg2ODYiIGN4PSI1MC45IiBjeT0iNC45IiByeD0iMC4zIiByeT0iMC40Ii8+CgkJPC9nPgoJPC9nPgo8L2c+CjxnIGlkPSJBbmltYWxzIj4KCTxnPgoJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg2ODY4NiIgZD0iTTI0LjIsMTFWMy41YzAuMSwwLjEsMC44LDAuOSwyLjgsMy4xYzIuNS0xLjcsNS42LTAuNyw2LjksMGwyLjQtMy4xdjcuMQoJCQljMCwxLjItMC4xLDIuNS0wLjksMy40Yy0xLDEuMi0yLjcsMi41LTUuMywyLjVjLTIuOSwwLTQuNS0xLjUtNS4zLTIuOUMyNC4yLDEyLjksMjQuMiwxMS45LDI0LjIsMTF6Ii8+CgkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODY4Njg2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0yMS4yLDEwbDUuNCwxLjIiLz4KCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM4Njg2ODYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTIxLjIsMTQuMWw1LjQtMS4yIi8+CgkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODY4Njg2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0zOC44LDEwbC01LjQsMS4yIi8+CgkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODY4Njg2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0zOC44LDE0LjFsLTUuNC0xLjIiLz4KCQk8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzg2ODY4NiIgZD0iTTI5LjUsMTIuNEwyOSwxMS43Yy0wLjItMC4zLDAtMC42LDAuMy0wLjZoMS40CgkJCWMwLjMsMCwwLjUsMC40LDAuMywwLjZsLTAuNywxbDAsMGMtMC43LDEuMi0yLjYsMS4xLTMuMS0wLjNsLTAuMS0wLjJjLTAuMS0wLjIsMC0wLjQsMC4yLTAuNXMwLjQsMCwwLjUsMC4ybDAuMSwwLjIKCQkJQzI4LjMsMTIuNywyOS4xLDEyLjksMjkuNSwxMi40eiIvPgoJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg2ODY4NiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMzIuNCwxMi4xbC0wLjEsMC4yYy0wLjQsMS0xLjgsMS4xLTIuMywwLjIiLz4KCQk8ZWxsaXBzZSBmaWxsPSIjODY4Njg2IiBjeD0iMjcuNiIgY3k9IjkuNyIgcng9IjAuNyIgcnk9IjAuNyIvPgoJCTxlbGxpcHNlIGZpbGw9IiM4Njg2ODYiIGN4PSIzMi40IiBjeT0iOS43IiByeD0iMC43IiByeT0iMC43Ii8+Cgk8L2c+CjwvZz4KPC9zdmc+";
function h0(e) {
  var a, t, i = e.isActiveCategory, r = e.category, s = e.allowNavigation, f = e.categoryConfig, c = e.onClick, d = e.customIcon, u = (a = f.icon) != null ? a : d, h = u != null;
  return o.createElement(xt, { tabIndex: s ? 0 : -1, className: Ce(Rs.catBtn, Ma.categoryBtn, h ? Rs.customIcon : "epr-icn-" + r, (t = {}, t[Ie.active] = i, t)), onClick: c, "aria-label": of(f), "aria-selected": i, role: "tab", "aria-controls": "epr-category-nav-id" }, h ? u : null);
}
var As = { backgroundPositionY: "calc(var(--epr-category-navigation-button-size) * 3)" }, m0 = { backgroundPositionY: "calc(var(--epr-category-navigation-button-size) * 2)" }, zs = { ":not(.epr-search-active)": { catBtn: { ":hover": As, "&.epr-active": As } } }, Rs = He.create(Pe({ catBtn: { ".": "epr-cat-btn", display: "inline-block", transition: "opacity 0.2s ease-in-out", position: "relative", height: "var(--epr-category-navigation-button-size)", width: "var(--epr-category-navigation-button-size)", backgroundSize: "calc(var(--epr-category-navigation-button-size) * 10)", outline: "none", backgroundPosition: "0 0", backgroundImage: "url(" + u0 + ")", ":focus:before": { content: "", position: "absolute", top: "-2px", left: "-2px", right: "-2px", bottom: "-2px", border: "2px solid var(--epr-category-icon-active-color)", borderRadius: "50%" }, "&.epr-icn-suggested": { backgroundPositionX: "calc(var(--epr-category-navigation-button-size) * -8)" }, "&.epr-icn-custom": { backgroundPositionX: "calc(var(--epr-category-navigation-button-size) * -9)" }, "&.epr-icn-activities": { backgroundPositionX: "calc(var(--epr-category-navigation-button-size) * -4)" }, "&.epr-icn-animals_nature": { backgroundPositionX: "calc(var(--epr-category-navigation-button-size) * -1)" }, "&.epr-icn-flags": { backgroundPositionX: "calc(var(--epr-category-navigation-button-size) * -7)" }, "&.epr-icn-food_drink": { backgroundPositionX: "calc(var(--epr-category-navigation-button-size) * -2)" }, "&.epr-icn-objects": { backgroundPositionX: "calc(var(--epr-category-navigation-button-size) * -5)" }, "&.epr-icn-smileys_people": { backgroundPositionX: "0px" }, "&.epr-icn-symbols": { backgroundPositionX: "calc(var(--epr-category-navigation-button-size) * -6)" }, "&.epr-icn-travel_places": { backgroundPositionX: "calc(var(--epr-category-navigation-button-size) * -3)" } }, customIcon: { ".": "epr-cat-btn-custom-icon", backgroundImage: "none", display: "flex", alignItems: "center", justifyContent: "center" } }, Kn("catBtn", m0), { ".epr-dark-theme": Pe({}, zs), ".epr-auto-theme": Pe({}, zs) }));
function g0() {
  var e = o.useState(null), a = e[0], t = e[1], i = Ir(), r = i[1], s = l0();
  c0({ setActiveCategory: t, setVisibleCategories: r });
  var f = fi(), c = kr(), d = bu(), u = Er(), h = d0();
  return o.createElement("div", { className: Ce(p0.nav), role: "tablist", "aria-label": "Category navigation", id: "epr-category-nav-id", ref: u }, c.map(function(m) {
    var p = ti(m), g = p === a;
    if (L1(m) && h) return null;
    var C = !f && !g;
    return o.createElement(h0, { key: p, category: p, isActiveCategory: g, allowNavigation: C, categoryConfig: m, customIcon: d[p], onClick: function() {
      s(p), setTimeout(function() {
        t(p);
      }, 10);
    } });
  }));
}
var p0 = He.create({ nav: { ".": "epr-category-nav", display: "flex", flexDirection: "row", justifyContent: "space-around", padding: "var(--epr-header-padding)" }, ".epr-search-active": { nav: { opacity: "0.3", cursor: "default", pointerEvents: "none" } }, ".epr-main:has(input:not(:placeholder-shown))": { nav: { opacity: "0.3", cursor: "default", pointerEvents: "none" } } }), sc = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjMuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjgwcHgiIHZpZXdCb3g9IjAgMCAyMCA4MCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgODAiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cGF0aCBmaWxsPSIjODY4Njg2IiBkPSJNNi45OCwxMy41OWMwLjEsMC4xLDAuMjQsMC4xNSwwLjM3LDAuMTVzMC4yNy0wLjA1LDAuMzctMC4xNWwyLjQyLTIuNDJsMi40MywyLjQzCgljMC4xLDAuMSwwLjI0LDAuMTUsMC4zNywwLjE1YzAuMTQsMCwwLjI3LTAuMDUsMC4zNy0wLjE1YzAuMjEtMC4yMSwwLjIxLTAuNTQsMC0wLjc1bC0yLjQzLTIuNDNMMTMuMzIsOAoJYzAuMjEtMC4yMSwwLjIxLTAuNTQsMC0wLjc1Yy0wLjIxLTAuMjEtMC41NC0wLjIxLTAuNzUsMGwtMi40MiwyLjQyTDcuNzQsNy4yN2MtMC4yMS0wLjIxLTAuNTQtMC4yMS0wLjc1LDAKCWMtMC4yMSwwLjIxLTAuMjEsMC41NCwwLDAuNzVsMi40MSwyLjQxbC0yLjQyLDIuNDJDNi43NywxMy4wNSw2Ljc3LDEzLjM5LDYuOTgsMTMuNTlMNi45OCwxMy41OXoiLz4KPHBhdGggZmlsbD0iIzg2ODY4NiIgZD0iTTEwLjE1LDE4LjQzYzQuNDEsMCw4LTMuNTksOC04YzAtNC40MS0zLjU5LTgtOC04Yy00LjQxLDAtOCwzLjU5LTgsOEMyLjE1LDE0Ljg0LDUuNzQsMTguNDMsMTAuMTUsMTguNDN6CgkgTTEwLjE1LDMuNDljMy44MywwLDYuOTQsMy4xMSw2Ljk0LDYuOTRjMCwzLjgzLTMuMTEsNi45NC02Ljk0LDYuOTRjLTMuODMsMC02Ljk0LTMuMTEtNi45NC02Ljk0QzMuMjEsNi42LDYuMzMsMy40OSwxMC4xNSwzLjQ5CglMMTAuMTUsMy40OXoiLz4KPHBhdGggZmlsbD0iIzMzNzFCNyIgZD0iTTYuOTgsMzMuNTljMC4xLDAuMSwwLjI0LDAuMTUsMC4zNywwLjE1czAuMjctMC4wNSwwLjM3LTAuMTVsMi40Mi0yLjQybDIuNDMsMi40MwoJYzAuMSwwLjEsMC4yNCwwLjE1LDAuMzcsMC4xNWMwLjE0LDAsMC4yNy0wLjA1LDAuMzctMC4xNWMwLjIxLTAuMjEsMC4yMS0wLjU0LDAtMC43NWwtMi40My0yLjQzTDEzLjMyLDI4CgljMC4yMS0wLjIxLDAuMjEtMC41NCwwLTAuNzVjLTAuMjEtMC4yMS0wLjU0LTAuMjEtMC43NSwwbC0yLjQyLDIuNDJsLTIuNDEtMi40MWMtMC4yMS0wLjIxLTAuNTQtMC4yMS0wLjc1LDAKCWMtMC4yMSwwLjIxLTAuMjEsMC41NCwwLDAuNzVsMi40MSwyLjQxbC0yLjQyLDIuNDJDNi43NywzMy4wNSw2Ljc3LDMzLjM5LDYuOTgsMzMuNTlMNi45OCwzMy41OXoiLz4KPHBhdGggZmlsbD0iIzMzNzFCNyIgZD0iTTEwLjE1LDM4LjQzYzQuNDEsMCw4LTMuNTksOC04YzAtNC40MS0zLjU5LTgtOC04Yy00LjQxLDAtOCwzLjU5LTgsOEMyLjE1LDM0Ljg0LDUuNzQsMzguNDMsMTAuMTUsMzguNDN6CgkgTTEwLjE1LDIzLjQ5YzMuODMsMCw2Ljk0LDMuMTEsNi45NCw2Ljk0YzAsMy44My0zLjExLDYuOTQtNi45NCw2Ljk0Yy0zLjgzLDAtNi45NC0zLjExLTYuOTQtNi45NAoJQzMuMjEsMjYuNiw2LjMzLDIzLjQ5LDEwLjE1LDIzLjQ5TDEwLjE1LDIzLjQ5eiIvPgo8cGF0aCBmaWxsPSIjQzBDMEJGIiBkPSJNNi45OCw1My41OWMwLjEsMC4xLDAuMjQsMC4xNSwwLjM3LDAuMTVzMC4yNy0wLjA1LDAuMzctMC4xNWwyLjQyLTIuNDJsMi40MywyLjQzCgljMC4xLDAuMSwwLjI0LDAuMTUsMC4zNywwLjE1YzAuMTQsMCwwLjI3LTAuMDUsMC4zNy0wLjE1YzAuMjEtMC4yMSwwLjIxLTAuNTQsMC0wLjc1bC0yLjQzLTIuNDNMMTMuMzIsNDgKCWMwLjIxLTAuMjEsMC4yMS0wLjU0LDAtMC43NWMtMC4yMS0wLjIxLTAuNTQtMC4yMS0wLjc1LDBsLTIuNDIsMi40MmwtMi40MS0yLjQxYy0wLjIxLTAuMjEtMC41NC0wLjIxLTAuNzUsMAoJYy0wLjIxLDAuMjEtMC4yMSwwLjU0LDAsMC43NWwyLjQxLDIuNDFsLTIuNDIsMi40MkM2Ljc3LDUzLjA1LDYuNzcsNTMuMzksNi45OCw1My41OUw2Ljk4LDUzLjU5eiIvPgo8cGF0aCBmaWxsPSIjQzBDMEJGIiBkPSJNMTAuMTUsNTguNDNjNC40MSwwLDgtMy41OSw4LThjMC00LjQxLTMuNTktOC04LThjLTQuNDEsMC04LDMuNTktOCw4QzIuMTUsNTQuODQsNS43NCw1OC40MywxMC4xNSw1OC40M3oKCSBNMTAuMTUsNDMuNDljMy44MywwLDYuOTQsMy4xMSw2Ljk0LDYuOTRjMCwzLjgzLTMuMTEsNi45NC02Ljk0LDYuOTRjLTMuODMsMC02Ljk0LTMuMTEtNi45NC02Ljk0CglDMy4yMSw0Ni42LDYuMzMsNDMuNDksMTAuMTUsNDMuNDlMMTAuMTUsNDMuNDl6Ii8+CjxwYXRoIGZpbGw9IiM2QUE5REQiIGQ9Ik02Ljk4LDczLjU5YzAuMSwwLjEsMC4yNCwwLjE1LDAuMzcsMC4xNXMwLjI3LTAuMDUsMC4zNy0wLjE1bDIuNDItMi40MmwyLjQzLDIuNDMKCWMwLjEsMC4xLDAuMjQsMC4xNSwwLjM3LDAuMTVjMC4xNCwwLDAuMjctMC4wNSwwLjM3LTAuMTVjMC4yMS0wLjIxLDAuMjEtMC41NCwwLTAuNzVsLTIuNDMtMi40M0wxMy4zMiw2OAoJYzAuMjEtMC4yMSwwLjIxLTAuNTQsMC0wLjc1Yy0wLjIxLTAuMjEtMC41NC0wLjIxLTAuNzUsMGwtMi40MiwyLjQybC0yLjQxLTIuNDFjLTAuMjEtMC4yMS0wLjU0LTAuMjEtMC43NSwwCgljLTAuMjEsMC4yMS0wLjIxLDAuNTQsMCwwLjc1bDIuNDEsMi40MWwtMi40MiwyLjQyQzYuNzcsNzMuMDUsNi43Nyw3My4zOSw2Ljk4LDczLjU5TDYuOTgsNzMuNTl6Ii8+CjxwYXRoIGZpbGw9IiM2QUE5REQiIGQ9Ik0xMC4xNSw3OC40M2M0LjQxLDAsOC0zLjU5LDgtOGMwLTQuNDEtMy41OS04LTgtOGMtNC40MSwwLTgsMy41OS04LDhDMi4xNSw3NC44NCw1Ljc0LDc4LjQzLDEwLjE1LDc4LjQzegoJIE0xMC4xNSw2My40OWMzLjgzLDAsNi45NCwzLjExLDYuOTQsNi45NGMwLDMuODMtMy4xMSw2Ljk0LTYuOTQsNi45NGMtMy44MywwLTYuOTQtMy4xMS02Ljk0LTYuOTQKCUMzLjIxLDY2LjYsNi4zMyw2My40OSwxMC4xNSw2My40OUwxMC4xNSw2My40OXoiLz4KPC9zdmc+";
function b0() {
  var e = Uf(), a = mu();
  return o.createElement(xt, { className: Ce(Ps.btnClearSearch, Ma.visibleOnSearchOnly), onClick: e, "aria-label": a, title: a }, o.createElement("div", { className: Ce(Ps.icnClearnSearch) }));
}
var w0 = { ":hover": { "> .epr-icn-clear-search": { backgroundPositionY: "-60px" } } }, Ps = He.create(Pe({ btnClearSearch: { ".": "epr-btn-clear-search", position: "absolute", right: "var(--epr-search-bar-inner-padding)", height: "30px", width: "30px", display: "flex", alignItems: "center", justifyContent: "center", top: "50%", transform: "translateY(-50%)", padding: "0", borderRadius: "50%", ":hover": { background: "var(--epr-hover-bg-color)" }, ":focus": { background: "var(--epr-hover-bg-color)" } }, icnClearnSearch: { ".": "epr-icn-clear-search", backgroundColor: "transparent", backgroundRepeat: "no-repeat", backgroundSize: "20px", height: "20px", width: "20px", backgroundImage: "url(" + sc + ")", ":hover": { backgroundPositionY: "-20px" }, ":focus": { backgroundPositionY: "-20px" } } }, Kn("icnClearnSearch", { backgroundPositionY: "-40px" }), Kn("btnClearSearch", w0))), y0 = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjMuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjQwcHgiIHZpZXdCb3g9IjAgMCAyMCA0MCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzg2ODY4NiIgZD0iTTEyLDguODFjMCwyLjA4LTEuNjgsMy43Ni0zLjc2LDMuNzZjLTIuMDgsMC0zLjc2LTEuNjgtMy43Ni0zLjc2CgljMC0yLjA4LDEuNjgtMy43NiwzLjc2LTMuNzZDMTAuMzIsNS4wNSwxMiw2LjczLDEyLDguODF6IE0xMS4yMywxMi43MmMtMC44MywwLjY0LTEuODcsMS4wMS0yLjk5LDEuMDFjLTIuNzIsMC00LjkyLTIuMi00LjkyLTQuOTIKCWMwLTIuNzIsMi4yLTQuOTIsNC45Mi00LjkyYzIuNzIsMCw0LjkyLDIuMiw0LjkyLDQuOTJjMCwxLjEzLTAuMzgsMi4xNi0xLjAxLDIuOTlsMy45NCwzLjkzYzAuMjUsMC4yNSwwLjI1LDAuNjYsMCwwLjkyCgljLTAuMjUsMC4yNS0wLjY2LDAuMjUtMC45MiwwTDExLjIzLDEyLjcyeiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI0MwQzBCRiIgZD0iTTEyLDI4LjgxYzAsMi4wOC0xLjY4LDMuNzYtMy43NiwzLjc2Yy0yLjA4LDAtMy43Ni0xLjY4LTMuNzYtMy43NgoJYzAtMi4wOCwxLjY4LTMuNzYsMy43Ni0zLjc2QzEwLjMyLDI1LjA1LDEyLDI2LjczLDEyLDI4LjgxeiBNMTEuMjMsMzIuNzJjLTAuODMsMC42NC0xLjg3LDEuMDEtMi45OSwxLjAxCgljLTIuNzIsMC00LjkyLTIuMi00LjkyLTQuOTJjMC0yLjcyLDIuMi00LjkyLDQuOTItNC45MmMyLjcyLDAsNC45MiwyLjIsNC45Miw0LjkyYzAsMS4xMy0wLjM4LDIuMTYtMS4wMSwyLjk5bDMuOTQsMy45MwoJYzAuMjUsMC4yNSwwLjI1LDAuNjYsMCwwLjkyYy0wLjI1LDAuMjUtMC42NiwwLjI1LTAuOTIsMEwxMS4yMywzMi43MnoiLz4KPC9zdmc+";
function j0() {
  return o.createElement("div", { className: Ce(M0.icnSearch) });
}
var M0 = He.create(Pe({ icnSearch: { ".": "epr-icn-search", content: "", position: "absolute", top: "50%", left: "var(--epr-search-bar-inner-padding)", transform: "translateY(-50%)", width: "20px", height: "20px", backgroundRepeat: "no-repeat", backgroundPosition: "0 0", backgroundSize: "20px", backgroundImage: "url(" + y0 + ")" } }, Kn("icnSearch", { backgroundPositionY: "-20px" })));
function v0() {
  var e = xf(), a = Dr();
  return e ? null : o.createElement(ic, { className: Ce(Ut.overlay) }, o.createElement(L0, null), a ? o.createElement(rc, null) : null);
}
function L0() {
  var e = Ia(), a = aa(), t = hu(), i = pu(), r = Vu(), s = r.statusSearchResults, f = r.searchTerm, c = r.onChange, d = a == null ? void 0 : a.current, u = d == null ? void 0 : d.value;
  return o.createElement(gi, { className: Ce(Ut.searchContainer) }, o.createElement("input", { autoFocus: i, "aria-label": "Type to search for an emoji", onFocus: e, className: Ce(Ut.search), type: "text", "aria-controls": "epr-search-id", placeholder: t, onChange: function(m) {
    var p, g;
    c((p = m == null || (g = m.target) == null ? void 0 : g.value) != null ? p : u);
  }, ref: a }), f ? o.createElement("div", { role: "status", className: Ce("epr-status-search-results", Ut.visuallyHidden), "aria-live": "polite", id: "epr-search-id", "aria-atomic": "true" }, s) : null, o.createElement(j0, null), o.createElement(b0, null));
}
var Ut = He.create(Pe({ overlay: { padding: "var(--epr-header-padding)", zIndex: "var(--epr-header-overlay-z-index)" }, searchContainer: { ".": "epr-search-container", flex: "1", display: "block", minWidth: "0" }, visuallyHidden: { clip: "rect(0 0 0 0)", clipPath: "inset(50%)", height: "1px", overflow: "hidden", position: "absolute", whiteSpace: "nowrap", width: "1px" }, search: { outline: "none", transition: "all 0.2s ease-in-out", color: "var(--epr-search-input-text-color)", borderRadius: "var(--epr-search-input-border-radius)", padding: "var(--epr-search-input-padding)", height: "var(--epr-search-input-height)", backgroundColor: "var(--epr-search-input-bg-color)", border: "1px solid var(--epr-search-border-color)", width: "100%", ":focus": { backgroundColor: "var(--epr-search-input-bg-color-active)", border: "1px solid var(--epr-search-border-color-active)" }, "::placeholder": { color: "var(--epr-search-input-placeholder-color)" } }, btnClearSearch: { ".": "epr-btn-clear-search", position: "absolute", right: "var(--epr-search-bar-inner-padding)", height: "30px", width: "30px", display: "flex", alignItems: "center", justifyContent: "center", top: "50%", transform: "translateY(-50%)", padding: "0", borderRadius: "50%", ":hover": { background: "var(--epr-hover-bg-color)" }, ":focus": { background: "var(--epr-hover-bg-color)" } }, icnClearnSearch: { ".": "epr-icn-clear-search", backgroundColor: "transparent", backgroundRepeat: "no-repeat", backgroundSize: "20px", height: "20px", width: "20px", backgroundImage: "url(" + sc + ")", ":hover": { backgroundPositionY: "-20px" }, ":focus": { backgroundPositionY: "-20px" } } }, Kn("icnClearnSearch", { backgroundPositionY: "-40px" }), Kn("btnClearSearch", { ":hover > .epr-icn-clear-search": { backgroundPositionY: "-60px" } })));
function C0() {
  return o.createElement(gi, { className: Ce("epr-header", Ma.hiddenOnReactions) }, o.createElement(v0, null), o.createElement(g0, null));
}
function x0(e) {
  return o.createElement(Eu, null, o.createElement(Id, { nonce: e.nonce }), o.createElement(Vd, Object.assign({}, e), o.createElement(tu, null, o.createElement(I0, null))));
}
function I0() {
  var e = La(), a = e[0], t = jf(), i = o.useState(!a), r = i[0], s = i[1], f = yu();
  return o.useEffect(function() {
    a && !t || r || s(true);
  }, [r, t, a]), f ? o.createElement(h1, null, o.createElement(z1, null), o.createElement(S0, { renderAll: r })) : null;
}
function S0(e) {
  var a = e.renderAll;
  return a ? o.createElement(o.Fragment, null, o.createElement(C0, null), o.createElement(q1, null), o.createElement(s0, null)) : null;
}
var k0 = o.memo(x0, ef), N0 = (function(e) {
  Cd(a, e);
  function a(i) {
    var r;
    return r = e.call(this, i) || this, r.state = { hasError: false }, r;
  }
  a.getDerivedStateFromError = function() {
    return { hasError: true };
  };
  var t = a.prototype;
  return t.componentDidCatch = function(r, s) {
    console.error("Emoji Picker React failed to render:", r, s);
  }, t.render = function() {
    return this.state.hasError ? null : this.props.children;
  }, a;
})(o.Component);
function E0(e) {
  var a = uu({ onEmojiClick: e.onEmojiClick, onReactionClick: e.onReactionClick, onSkinToneChange: e.onSkinToneChange });
  return o.createElement(N0, null, o.createElement(wf.Provider, { value: a }, o.createElement(k0, Object.assign({}, e))));
}
const xi = "social-media:emoji-picker-open", T0 = 768, Os = 350, Us = 420, Jn = 12;
function Gr({ textareaRef: e, value: a, onChange: t, disabled: i = false, iconSize: r = 18, className: s = "" }) {
  const f = o.useId(), c = o.useRef(null), d = o.useRef({ start: a.length, end: a.length }), [u, h] = o.useState(false), [m, p] = o.useState(false), [g, C] = o.useState({ left: Jn, top: Jn, width: Os, height: Us });
  function y() {
    const N = e.current;
    if (!N) {
      d.current = { start: a.length, end: a.length };
      return;
    }
    d.current = { start: N.selectionStart ?? a.length, end: N.selectionEnd ?? a.length };
  }
  function I(N) {
    window.requestAnimationFrame(() => {
      const k = e.current;
      k && (k.focus(), typeof N == "number" && k.setSelectionRange(N, N));
    });
  }
  function T(N = true) {
    h(false), N && I(d.current.start);
  }
  function j() {
    var V;
    const N = window.innerWidth < T0;
    if (p(N), N) return;
    const k = (V = c.current) == null ? void 0 : V.getBoundingClientRect();
    if (!k) return;
    const B = Math.min(Os, window.innerWidth - Jn * 2), z = Math.min(Us, window.innerHeight - Jn * 2), x = Math.min(Math.max(Jn, k.left + k.width / 2 - B / 2), window.innerWidth - B - Jn), w = k.top - z - 10, Y = w >= Jn ? w : Math.min(k.bottom + 10, window.innerHeight - z - Jn);
    C({ left: x, top: Y, width: B, height: z });
  }
  function E() {
    if (u) {
      T();
      return;
    }
    y(), window.dispatchEvent(new CustomEvent(xi, { detail: f })), h(true);
  }
  function b(N) {
    const k = Math.min(d.current.start, a.length), B = Math.min(d.current.end, a.length), z = Math.min(k, B), x = Math.max(k, B), w = `${a.slice(0, z)}${N.emoji}${a.slice(x)}`, Y = z + N.emoji.length;
    d.current = { start: Y, end: Y }, t(w), h(false), I(Y);
  }
  return o.useEffect(() => {
    const N = (k) => {
      k.detail !== f && h(false);
    };
    return window.addEventListener(xi, N), () => window.removeEventListener(xi, N);
  }, [f]), o.useEffect(() => {
    if (!u) return;
    const N = (B) => {
      B.key === "Escape" && (B.preventDefault(), T());
    }, k = () => j();
    return window.addEventListener("keydown", N), window.addEventListener("resize", k), window.addEventListener("scroll", k, true), () => {
      window.removeEventListener("keydown", N), window.removeEventListener("resize", k), window.removeEventListener("scroll", k, true);
    };
  }, [u, a]), o.useLayoutEffect(() => {
    u && j();
  }, [u]), n.jsxs(n.Fragment, { children: [n.jsx("button", { ref: c, type: "button", className: `emoji-picker-trigger ${s}`.trim(), "aria-label": "Ch\u1ECDn emoji", "aria-haspopup": "dialog", "aria-expanded": u, disabled: i, onPointerDown: y, onClick: E, children: n.jsx(ql, { size: r }) }), u && ya.createPortal(n.jsx("div", { className: `emoji-picker-layer${m ? " mobile" : ""}`, role: "presentation", onPointerDown: (N) => {
    N.target === N.currentTarget && T();
  }, children: n.jsxs("section", { className: "emoji-picker-panel", role: "dialog", "aria-label": "Ch\u1ECDn emoji", style: m ? void 0 : g, onPointerDown: (N) => N.stopPropagation(), children: [n.jsxs("header", { className: "emoji-picker-mobile-header", children: [n.jsx("strong", { children: "Emoji" }), n.jsx("button", { type: "button", onClick: () => T(), "aria-label": "\u0110\xF3ng b\u1ED9 ch\u1ECDn emoji", children: n.jsx(pe, { size: 18 }) })] }), n.jsx("div", { className: "emoji-picker-body", children: n.jsx(E0, { width: "100%", height: "100%", theme: Ba.LIGHT, emojiStyle: hn.NATIVE, searchPlaceholder: "T\xECm ki\u1EBFm emoji", lazyLoadEmojis: true, previewConfig: { showPreview: false }, onEmojiClick: b }) })] }) }), document.body)] });
}
const D0 = () => {
};
var Bs = {};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const oc = function(e) {
  const a = [];
  let t = 0;
  for (let i = 0; i < e.length; i++) {
    let r = e.charCodeAt(i);
    r < 128 ? a[t++] = r : r < 2048 ? (a[t++] = r >> 6 | 192, a[t++] = r & 63 | 128) : (r & 64512) === 55296 && i + 1 < e.length && (e.charCodeAt(i + 1) & 64512) === 56320 ? (r = 65536 + ((r & 1023) << 10) + (e.charCodeAt(++i) & 1023), a[t++] = r >> 18 | 240, a[t++] = r >> 12 & 63 | 128, a[t++] = r >> 6 & 63 | 128, a[t++] = r & 63 | 128) : (a[t++] = r >> 12 | 224, a[t++] = r >> 6 & 63 | 128, a[t++] = r & 63 | 128);
  }
  return a;
}, A0 = function(e) {
  const a = [];
  let t = 0, i = 0;
  for (; t < e.length; ) {
    const r = e[t++];
    if (r < 128) a[i++] = String.fromCharCode(r);
    else if (r > 191 && r < 224) {
      const s = e[t++];
      a[i++] = String.fromCharCode((r & 31) << 6 | s & 63);
    } else if (r > 239 && r < 365) {
      const s = e[t++], f = e[t++], c = e[t++], d = ((r & 7) << 18 | (s & 63) << 12 | (f & 63) << 6 | c & 63) - 65536;
      a[i++] = String.fromCharCode(55296 + (d >> 10)), a[i++] = String.fromCharCode(56320 + (d & 1023));
    } else {
      const s = e[t++], f = e[t++];
      a[i++] = String.fromCharCode((r & 15) << 12 | (s & 63) << 6 | f & 63);
    }
  }
  return a.join("");
}, fc = { byteToCharMap_: null, charToByteMap_: null, byteToCharMapWebSafe_: null, charToByteMapWebSafe_: null, ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", get ENCODED_VALS() {
  return this.ENCODED_VALS_BASE + "+/=";
}, get ENCODED_VALS_WEBSAFE() {
  return this.ENCODED_VALS_BASE + "-_.";
}, HAS_NATIVE_SUPPORT: typeof atob == "function", encodeByteArray(e, a) {
  if (!Array.isArray(e)) throw Error("encodeByteArray takes an array as a parameter");
  this.init_();
  const t = a ? this.byteToCharMapWebSafe_ : this.byteToCharMap_, i = [];
  for (let r = 0; r < e.length; r += 3) {
    const s = e[r], f = r + 1 < e.length, c = f ? e[r + 1] : 0, d = r + 2 < e.length, u = d ? e[r + 2] : 0, h = s >> 2, m = (s & 3) << 4 | c >> 4;
    let p = (c & 15) << 2 | u >> 6, g = u & 63;
    d || (g = 64, f || (p = 64)), i.push(t[h], t[m], t[p], t[g]);
  }
  return i.join("");
}, encodeString(e, a) {
  return this.HAS_NATIVE_SUPPORT && !a ? btoa(e) : this.encodeByteArray(oc(e), a);
}, decodeString(e, a) {
  return this.HAS_NATIVE_SUPPORT && !a ? atob(e) : A0(this.decodeStringToByteArray(e, a));
}, decodeStringToByteArray(e, a) {
  this.init_();
  const t = a ? this.charToByteMapWebSafe_ : this.charToByteMap_, i = [];
  for (let r = 0; r < e.length; ) {
    const s = t[e.charAt(r++)], c = r < e.length ? t[e.charAt(r)] : 0;
    ++r;
    const u = r < e.length ? t[e.charAt(r)] : 64;
    ++r;
    const m = r < e.length ? t[e.charAt(r)] : 64;
    if (++r, s == null || c == null || u == null || m == null) throw new z0();
    const p = s << 2 | c >> 4;
    if (i.push(p), u !== 64) {
      const g = c << 4 & 240 | u >> 2;
      if (i.push(g), m !== 64) {
        const C = u << 6 & 192 | m;
        i.push(C);
      }
    }
  }
  return i;
}, init_() {
  if (!this.byteToCharMap_) {
    this.byteToCharMap_ = {}, this.charToByteMap_ = {}, this.byteToCharMapWebSafe_ = {}, this.charToByteMapWebSafe_ = {};
    for (let e = 0; e < this.ENCODED_VALS.length; e++) this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e), this.charToByteMap_[this.byteToCharMap_[e]] = e, this.byteToCharMapWebSafe_[e] = this.ENCODED_VALS_WEBSAFE.charAt(e), this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e, e >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e, this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e);
  }
} };
class z0 extends Error {
  constructor() {
    super(...arguments), this.name = "DecodeBase64StringError";
  }
}
const R0 = function(e) {
  const a = oc(e);
  return fc.encodeByteArray(a, true);
}, cc = function(e) {
  return R0(e).replace(/\./g, "");
}, P0 = function(e) {
  try {
    return fc.decodeString(e, true);
  } catch (a) {
    console.error("base64Decode failed: ", a);
  }
  return null;
};
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function O0() {
  if (typeof self < "u") return self;
  if (typeof window < "u") return window;
  if (typeof global < "u") return global;
  throw new Error("Unable to locate global object.");
}
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const U0 = () => O0().__FIREBASE_DEFAULTS__, B0 = () => {
  if (typeof process > "u" || typeof Bs > "u") return;
  const e = Bs.__FIREBASE_DEFAULTS__;
  if (e) return JSON.parse(e);
}, G0 = () => {
  if (typeof document > "u") return;
  let e;
  try {
    e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
  } catch {
    return;
  }
  const a = e && P0(e[1]);
  return a && JSON.parse(a);
}, Y0 = () => {
  try {
    return D0() || U0() || B0() || G0();
  } catch (e) {
    console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
    return;
  }
}, lc = () => {
  var e;
  return (e = Y0()) === null || e === void 0 ? void 0 : e.config;
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
class Q0 {
  constructor() {
    this.reject = () => {
    }, this.resolve = () => {
    }, this.promise = new Promise((a, t) => {
      this.resolve = a, this.reject = t;
    });
  }
  wrapCallback(a) {
    return (t, i) => {
      t ? this.reject(t) : this.resolve(i), typeof a == "function" && (this.promise.catch(() => {
      }), a.length === 1 ? a(t) : a(t, i));
    };
  }
}
function dc() {
  try {
    return typeof indexedDB == "object";
  } catch {
    return false;
  }
}
function uc() {
  return new Promise((e, a) => {
    try {
      let t = true;
      const i = "validate-browser-context-for-indexeddb-analytics-module", r = self.indexedDB.open(i);
      r.onsuccess = () => {
        r.result.close(), t || self.indexedDB.deleteDatabase(i), e(true);
      }, r.onupgradeneeded = () => {
        t = false;
      }, r.onerror = () => {
        var s;
        a(((s = r.error) === null || s === void 0 ? void 0 : s.message) || "");
      };
    } catch (t) {
      a(t);
    }
  });
}
function J0() {
  return !(typeof navigator > "u" || !navigator.cookieEnabled);
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const _0 = "FirebaseError";
class Va extends Error {
  constructor(a, t, i) {
    super(t), this.code = a, this.customData = i, this.name = _0, Object.setPrototypeOf(this, Va.prototype), Error.captureStackTrace && Error.captureStackTrace(this, pi.prototype.create);
  }
}
class pi {
  constructor(a, t, i) {
    this.service = a, this.serviceName = t, this.errors = i;
  }
  create(a, ...t) {
    const i = t[0] || {}, r = `${this.service}/${a}`, s = this.errors[a], f = s ? F0(s, i) : "Error", c = `${this.serviceName}: ${f} (${r}).`;
    return new Va(r, c, i);
  }
}
function F0(e, a) {
  return e.replace(H0, (t, i) => {
    const r = a[i];
    return r != null ? String(r) : `<${i}?>`;
  });
}
const H0 = /\{\$([^}]+)}/g;
function qi(e, a) {
  if (e === a) return true;
  const t = Object.keys(e), i = Object.keys(a);
  for (const r of t) {
    if (!i.includes(r)) return false;
    const s = e[r], f = a[r];
    if (Gs(s) && Gs(f)) {
      if (!qi(s, f)) return false;
    } else if (s !== f) return false;
  }
  for (const r of i) if (!t.includes(r)) return false;
  return true;
}
function Gs(e) {
  return e !== null && typeof e == "object";
}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Yr(e) {
  return e && e._delegate ? e._delegate : e;
}
class Xn {
  constructor(a, t, i) {
    this.name = a, this.instanceFactory = t, this.type = i, this.multipleInstances = false, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null;
  }
  setInstantiationMode(a) {
    return this.instantiationMode = a, this;
  }
  setMultipleInstances(a) {
    return this.multipleInstances = a, this;
  }
  setServiceProps(a) {
    return this.serviceProps = a, this;
  }
  setInstanceCreatedCallback(a) {
    return this.onInstanceCreated = a, this;
  }
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const fa = "[DEFAULT]";
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
class $0 {
  constructor(a, t) {
    this.name = a, this.container = t, this.component = null, this.instances = /* @__PURE__ */ new Map(), this.instancesDeferred = /* @__PURE__ */ new Map(), this.instancesOptions = /* @__PURE__ */ new Map(), this.onInitCallbacks = /* @__PURE__ */ new Map();
  }
  get(a) {
    const t = this.normalizeInstanceIdentifier(a);
    if (!this.instancesDeferred.has(t)) {
      const i = new Q0();
      if (this.instancesDeferred.set(t, i), this.isInitialized(t) || this.shouldAutoInitialize()) try {
        const r = this.getOrInitializeService({ instanceIdentifier: t });
        r && i.resolve(r);
      } catch {
      }
    }
    return this.instancesDeferred.get(t).promise;
  }
  getImmediate(a) {
    var t;
    const i = this.normalizeInstanceIdentifier(a == null ? void 0 : a.identifier), r = (t = a == null ? void 0 : a.optional) !== null && t !== void 0 ? t : false;
    if (this.isInitialized(i) || this.shouldAutoInitialize()) try {
      return this.getOrInitializeService({ instanceIdentifier: i });
    } catch (s) {
      if (r) return null;
      throw s;
    }
    else {
      if (r) return null;
      throw Error(`Service ${this.name} is not available`);
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(a) {
    if (a.name !== this.name) throw Error(`Mismatching Component ${a.name} for Provider ${this.name}.`);
    if (this.component) throw Error(`Component for ${this.name} has already been provided`);
    if (this.component = a, !!this.shouldAutoInitialize()) {
      if (Z0(a)) try {
        this.getOrInitializeService({ instanceIdentifier: fa });
      } catch {
      }
      for (const [t, i] of this.instancesDeferred.entries()) {
        const r = this.normalizeInstanceIdentifier(t);
        try {
          const s = this.getOrInitializeService({ instanceIdentifier: r });
          i.resolve(s);
        } catch {
        }
      }
    }
  }
  clearInstance(a = fa) {
    this.instancesDeferred.delete(a), this.instancesOptions.delete(a), this.instances.delete(a);
  }
  async delete() {
    const a = Array.from(this.instances.values());
    await Promise.all([...a.filter((t) => "INTERNAL" in t).map((t) => t.INTERNAL.delete()), ...a.filter((t) => "_delete" in t).map((t) => t._delete())]);
  }
  isComponentSet() {
    return this.component != null;
  }
  isInitialized(a = fa) {
    return this.instances.has(a);
  }
  getOptions(a = fa) {
    return this.instancesOptions.get(a) || {};
  }
  initialize(a = {}) {
    const { options: t = {} } = a, i = this.normalizeInstanceIdentifier(a.instanceIdentifier);
    if (this.isInitialized(i)) throw Error(`${this.name}(${i}) has already been initialized`);
    if (!this.isComponentSet()) throw Error(`Component ${this.name} has not been registered yet`);
    const r = this.getOrInitializeService({ instanceIdentifier: i, options: t });
    for (const [s, f] of this.instancesDeferred.entries()) {
      const c = this.normalizeInstanceIdentifier(s);
      i === c && f.resolve(r);
    }
    return r;
  }
  onInit(a, t) {
    var i;
    const r = this.normalizeInstanceIdentifier(t), s = (i = this.onInitCallbacks.get(r)) !== null && i !== void 0 ? i : /* @__PURE__ */ new Set();
    s.add(a), this.onInitCallbacks.set(r, s);
    const f = this.instances.get(r);
    return f && a(f, r), () => {
      s.delete(a);
    };
  }
  invokeOnInitCallbacks(a, t) {
    const i = this.onInitCallbacks.get(t);
    if (i) for (const r of i) try {
      r(a, t);
    } catch {
    }
  }
  getOrInitializeService({ instanceIdentifier: a, options: t = {} }) {
    let i = this.instances.get(a);
    if (!i && this.component && (i = this.component.instanceFactory(this.container, { instanceIdentifier: V0(a), options: t }), this.instances.set(a, i), this.instancesOptions.set(a, t), this.invokeOnInitCallbacks(i, a), this.component.onInstanceCreated)) try {
      this.component.onInstanceCreated(this.container, a, i);
    } catch {
    }
    return i || null;
  }
  normalizeInstanceIdentifier(a = fa) {
    return this.component ? this.component.multipleInstances ? a : fa : a;
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT";
  }
}
function V0(e) {
  return e === fa ? void 0 : e;
}
function Z0(e) {
  return e.instantiationMode === "EAGER";
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
class W0 {
  constructor(a) {
    this.name = a, this.providers = /* @__PURE__ */ new Map();
  }
  addComponent(a) {
    const t = this.getProvider(a.name);
    if (t.isComponentSet()) throw new Error(`Component ${a.name} has already been registered with ${this.name}`);
    t.setComponent(a);
  }
  addOrOverwriteComponent(a) {
    this.getProvider(a.name).isComponentSet() && this.providers.delete(a.name), this.addComponent(a);
  }
  getProvider(a) {
    if (this.providers.has(a)) return this.providers.get(a);
    const t = new $0(a, this);
    return this.providers.set(a, t), t;
  }
  getProviders() {
    return Array.from(this.providers.values());
  }
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var _e;
(function(e) {
  e[e.DEBUG = 0] = "DEBUG", e[e.VERBOSE = 1] = "VERBOSE", e[e.INFO = 2] = "INFO", e[e.WARN = 3] = "WARN", e[e.ERROR = 4] = "ERROR", e[e.SILENT = 5] = "SILENT";
})(_e || (_e = {}));
const q0 = { debug: _e.DEBUG, verbose: _e.VERBOSE, info: _e.INFO, warn: _e.WARN, error: _e.ERROR, silent: _e.SILENT }, K0 = _e.INFO, X0 = { [_e.DEBUG]: "log", [_e.VERBOSE]: "log", [_e.INFO]: "info", [_e.WARN]: "warn", [_e.ERROR]: "error" }, eh = (e, a, ...t) => {
  if (a < e.logLevel) return;
  const i = (/* @__PURE__ */ new Date()).toISOString(), r = X0[a];
  if (r) console[r](`[${i}]  ${e.name}:`, ...t);
  else throw new Error(`Attempted to log a message with an invalid logType (value: ${a})`);
};
class nh {
  constructor(a) {
    this.name = a, this._logLevel = K0, this._logHandler = eh, this._userLogHandler = null;
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(a) {
    if (!(a in _e)) throw new TypeError(`Invalid value "${a}" assigned to \`logLevel\``);
    this._logLevel = a;
  }
  setLogLevel(a) {
    this._logLevel = typeof a == "string" ? q0[a] : a;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(a) {
    if (typeof a != "function") throw new TypeError("Value assigned to `logHandler` must be a function");
    this._logHandler = a;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(a) {
    this._userLogHandler = a;
  }
  debug(...a) {
    this._userLogHandler && this._userLogHandler(this, _e.DEBUG, ...a), this._logHandler(this, _e.DEBUG, ...a);
  }
  log(...a) {
    this._userLogHandler && this._userLogHandler(this, _e.VERBOSE, ...a), this._logHandler(this, _e.VERBOSE, ...a);
  }
  info(...a) {
    this._userLogHandler && this._userLogHandler(this, _e.INFO, ...a), this._logHandler(this, _e.INFO, ...a);
  }
  warn(...a) {
    this._userLogHandler && this._userLogHandler(this, _e.WARN, ...a), this._logHandler(this, _e.WARN, ...a);
  }
  error(...a) {
    this._userLogHandler && this._userLogHandler(this, _e.ERROR, ...a), this._logHandler(this, _e.ERROR, ...a);
  }
}
const ah = (e, a) => a.some((t) => e instanceof t);
let Ys, Qs;
function th() {
  return Ys || (Ys = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function ih() {
  return Qs || (Qs = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey]);
}
const hc = /* @__PURE__ */ new WeakMap(), Ki = /* @__PURE__ */ new WeakMap(), mc = /* @__PURE__ */ new WeakMap(), Ii = /* @__PURE__ */ new WeakMap(), Qr = /* @__PURE__ */ new WeakMap();
function rh(e) {
  const a = new Promise((t, i) => {
    const r = () => {
      e.removeEventListener("success", s), e.removeEventListener("error", f);
    }, s = () => {
      t(Pn(e.result)), r();
    }, f = () => {
      i(e.error), r();
    };
    e.addEventListener("success", s), e.addEventListener("error", f);
  });
  return a.then((t) => {
    t instanceof IDBCursor && hc.set(t, e);
  }).catch(() => {
  }), Qr.set(a, e), a;
}
function sh(e) {
  if (Ki.has(e)) return;
  const a = new Promise((t, i) => {
    const r = () => {
      e.removeEventListener("complete", s), e.removeEventListener("error", f), e.removeEventListener("abort", f);
    }, s = () => {
      t(), r();
    }, f = () => {
      i(e.error || new DOMException("AbortError", "AbortError")), r();
    };
    e.addEventListener("complete", s), e.addEventListener("error", f), e.addEventListener("abort", f);
  });
  Ki.set(e, a);
}
let Xi = { get(e, a, t) {
  if (e instanceof IDBTransaction) {
    if (a === "done") return Ki.get(e);
    if (a === "objectStoreNames") return e.objectStoreNames || mc.get(e);
    if (a === "store") return t.objectStoreNames[1] ? void 0 : t.objectStore(t.objectStoreNames[0]);
  }
  return Pn(e[a]);
}, set(e, a, t) {
  return e[a] = t, true;
}, has(e, a) {
  return e instanceof IDBTransaction && (a === "done" || a === "store") ? true : a in e;
} };
function oh(e) {
  Xi = e(Xi);
}
function fh(e) {
  return e === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(a, ...t) {
    const i = e.call(Si(this), a, ...t);
    return mc.set(i, a.sort ? a.sort() : [a]), Pn(i);
  } : ih().includes(e) ? function(...a) {
    return e.apply(Si(this), a), Pn(hc.get(this));
  } : function(...a) {
    return Pn(e.apply(Si(this), a));
  };
}
function ch(e) {
  return typeof e == "function" ? fh(e) : (e instanceof IDBTransaction && sh(e), ah(e, th()) ? new Proxy(e, Xi) : e);
}
function Pn(e) {
  if (e instanceof IDBRequest) return rh(e);
  if (Ii.has(e)) return Ii.get(e);
  const a = ch(e);
  return a !== e && (Ii.set(e, a), Qr.set(a, e)), a;
}
const Si = (e) => Qr.get(e);
function bi(e, a, { blocked: t, upgrade: i, blocking: r, terminated: s } = {}) {
  const f = indexedDB.open(e, a), c = Pn(f);
  return i && f.addEventListener("upgradeneeded", (d) => {
    i(Pn(f.result), d.oldVersion, d.newVersion, Pn(f.transaction), d);
  }), t && f.addEventListener("blocked", (d) => t(d.oldVersion, d.newVersion, d)), c.then((d) => {
    s && d.addEventListener("close", () => s()), r && d.addEventListener("versionchange", (u) => r(u.oldVersion, u.newVersion, u));
  }).catch(() => {
  }), c;
}
function ki(e, { blocked: a } = {}) {
  const t = indexedDB.deleteDatabase(e);
  return a && t.addEventListener("blocked", (i) => a(i.oldVersion, i)), Pn(t).then(() => {
  });
}
const lh = ["get", "getKey", "getAll", "getAllKeys", "count"], dh = ["put", "add", "delete", "clear"], Ni = /* @__PURE__ */ new Map();
function Js(e, a) {
  if (!(e instanceof IDBDatabase && !(a in e) && typeof a == "string")) return;
  if (Ni.get(a)) return Ni.get(a);
  const t = a.replace(/FromIndex$/, ""), i = a !== t, r = dh.includes(t);
  if (!(t in (i ? IDBIndex : IDBObjectStore).prototype) || !(r || lh.includes(t))) return;
  const s = async function(f, ...c) {
    const d = this.transaction(f, r ? "readwrite" : "readonly");
    let u = d.store;
    return i && (u = u.index(c.shift())), (await Promise.all([u[t](...c), r && d.done]))[0];
  };
  return Ni.set(a, s), s;
}
oh((e) => ({ ...e, get: (a, t, i) => Js(a, t) || e.get(a, t, i), has: (a, t) => !!Js(a, t) || e.has(a, t) }));
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
class uh {
  constructor(a) {
    this.container = a;
  }
  getPlatformInfoString() {
    return this.container.getProviders().map((t) => {
      if (hh(t)) {
        const i = t.getImmediate();
        return `${i.library}/${i.version}`;
      } else return null;
    }).filter((t) => t).join(" ");
  }
}
function hh(e) {
  const a = e.getComponent();
  return (a == null ? void 0 : a.type) === "VERSION";
}
const er = "@firebase/app", _s = "0.13.2";
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const Un = new nh("@firebase/app"), mh = "@firebase/app-compat", gh = "@firebase/analytics-compat", ph = "@firebase/analytics", bh = "@firebase/app-check-compat", wh = "@firebase/app-check", yh = "@firebase/auth", jh = "@firebase/auth-compat", Mh = "@firebase/database", vh = "@firebase/data-connect", Lh = "@firebase/database-compat", Ch = "@firebase/functions", xh = "@firebase/functions-compat", Ih = "@firebase/installations", Sh = "@firebase/installations-compat", kh = "@firebase/messaging", Nh = "@firebase/messaging-compat", Eh = "@firebase/performance", Th = "@firebase/performance-compat", Dh = "@firebase/remote-config", Ah = "@firebase/remote-config-compat", zh = "@firebase/storage", Rh = "@firebase/storage-compat", Ph = "@firebase/firestore", Oh = "@firebase/ai", Uh = "@firebase/firestore-compat", Bh = "firebase";
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const nr = "[DEFAULT]", Gh = { [er]: "fire-core", [mh]: "fire-core-compat", [ph]: "fire-analytics", [gh]: "fire-analytics-compat", [wh]: "fire-app-check", [bh]: "fire-app-check-compat", [yh]: "fire-auth", [jh]: "fire-auth-compat", [Mh]: "fire-rtdb", [vh]: "fire-data-connect", [Lh]: "fire-rtdb-compat", [Ch]: "fire-fn", [xh]: "fire-fn-compat", [Ih]: "fire-iid", [Sh]: "fire-iid-compat", [kh]: "fire-fcm", [Nh]: "fire-fcm-compat", [Eh]: "fire-perf", [Th]: "fire-perf-compat", [Dh]: "fire-rc", [Ah]: "fire-rc-compat", [zh]: "fire-gcs", [Rh]: "fire-gcs-compat", [Ph]: "fire-fst", [Uh]: "fire-fst-compat", [Oh]: "fire-vertex", "fire-js": "fire-js", [Bh]: "fire-js-all" };
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const bt = /* @__PURE__ */ new Map(), Yh = /* @__PURE__ */ new Map(), ar = /* @__PURE__ */ new Map();
function Fs(e, a) {
  try {
    e.container.addComponent(a);
  } catch (t) {
    Un.debug(`Component ${a.name} failed to register with FirebaseApp ${e.name}`, t);
  }
}
function pa(e) {
  const a = e.name;
  if (ar.has(a)) return Un.debug(`There were multiple attempts to register component ${a}.`), false;
  ar.set(a, e);
  for (const t of bt.values()) Fs(t, e);
  for (const t of Yh.values()) Fs(t, e);
  return true;
}
function Jr(e, a) {
  const t = e.container.getProvider("heartbeat").getImmediate({ optional: true });
  return t && t.triggerHeartbeat(), e.container.getProvider(a);
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const Qh = { "no-app": "No Firebase App '{$appName}' has been created - call initializeApp() first", "bad-app-name": "Illegal App name: '{$appName}'", "duplicate-app": "Firebase App named '{$appName}' already exists with different options or config", "app-deleted": "Firebase App named '{$appName}' already deleted", "server-app-deleted": "Firebase Server App has been deleted", "no-options": "Need to provide options, when not being deployed to hosting via source.", "invalid-app-argument": "firebase.{$appName}() takes either no argument or a Firebase App instance.", "invalid-log-argument": "First argument to `onLog` must be null or a function.", "idb-open": "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.", "idb-get": "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.", "idb-set": "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.", "idb-delete": "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.", "finalization-registry-not-supported": "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.", "invalid-server-app-environment": "FirebaseServerApp is not for use in browser environments." }, Wn = new pi("app", "Firebase", Qh);
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
class Jh {
  constructor(a, t, i) {
    this._isDeleted = false, this._options = Object.assign({}, a), this._config = Object.assign({}, t), this._name = t.name, this._automaticDataCollectionEnabled = t.automaticDataCollectionEnabled, this._container = i, this.container.addComponent(new Xn("app", () => this, "PUBLIC"));
  }
  get automaticDataCollectionEnabled() {
    return this.checkDestroyed(), this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(a) {
    this.checkDestroyed(), this._automaticDataCollectionEnabled = a;
  }
  get name() {
    return this.checkDestroyed(), this._name;
  }
  get options() {
    return this.checkDestroyed(), this._options;
  }
  get config() {
    return this.checkDestroyed(), this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(a) {
    this._isDeleted = a;
  }
  checkDestroyed() {
    if (this.isDeleted) throw Wn.create("app-deleted", { appName: this._name });
  }
}
function _r(e, a = {}) {
  let t = e;
  typeof a != "object" && (a = { name: a });
  const i = Object.assign({ name: nr, automaticDataCollectionEnabled: true }, a), r = i.name;
  if (typeof r != "string" || !r) throw Wn.create("bad-app-name", { appName: String(r) });
  if (t || (t = lc()), !t) throw Wn.create("no-options");
  const s = bt.get(r);
  if (s) {
    if (qi(t, s.options) && qi(i, s.config)) return s;
    throw Wn.create("duplicate-app", { appName: r });
  }
  const f = new W0(r);
  for (const d of ar.values()) f.addComponent(d);
  const c = new Jh(t, i, f);
  return bt.set(r, c), c;
}
function Fr(e = nr) {
  const a = bt.get(e);
  if (!a && e === nr && lc()) return _r();
  if (!a) throw Wn.create("no-app", { appName: e });
  return a;
}
function gc() {
  return Array.from(bt.values());
}
function qn(e, a, t) {
  var i;
  let r = (i = Gh[e]) !== null && i !== void 0 ? i : e;
  t && (r += `-${t}`);
  const s = r.match(/\s|\//), f = a.match(/\s|\//);
  if (s || f) {
    const c = [`Unable to register library "${r}" with version "${a}":`];
    s && c.push(`library name "${r}" contains illegal characters (whitespace or "/")`), s && f && c.push("and"), f && c.push(`version name "${a}" contains illegal characters (whitespace or "/")`), Un.warn(c.join(" "));
    return;
  }
  pa(new Xn(`${r}-version`, () => ({ library: r, version: a }), "VERSION"));
}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const _h = "firebase-heartbeat-database", Fh = 1, wt = "firebase-heartbeat-store";
let Ei = null;
function pc() {
  return Ei || (Ei = bi(_h, Fh, { upgrade: (e, a) => {
    switch (a) {
      case 0:
        try {
          e.createObjectStore(wt);
        } catch (t) {
          console.warn(t);
        }
    }
  } }).catch((e) => {
    throw Wn.create("idb-open", { originalErrorMessage: e.message });
  })), Ei;
}
async function Hh(e) {
  try {
    const t = (await pc()).transaction(wt), i = await t.objectStore(wt).get(bc(e));
    return await t.done, i;
  } catch (a) {
    if (a instanceof Va) Un.warn(a.message);
    else {
      const t = Wn.create("idb-get", { originalErrorMessage: a == null ? void 0 : a.message });
      Un.warn(t.message);
    }
  }
}
async function Hs(e, a) {
  try {
    const i = (await pc()).transaction(wt, "readwrite");
    await i.objectStore(wt).put(a, bc(e)), await i.done;
  } catch (t) {
    if (t instanceof Va) Un.warn(t.message);
    else {
      const i = Wn.create("idb-set", { originalErrorMessage: t == null ? void 0 : t.message });
      Un.warn(i.message);
    }
  }
}
function bc(e) {
  return `${e.name}!${e.options.appId}`;
}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const $h = 1024, Vh = 30;
class Zh {
  constructor(a) {
    this.container = a, this._heartbeatsCache = null;
    const t = this.container.getProvider("app").getImmediate();
    this._storage = new qh(t), this._heartbeatsCachePromise = this._storage.read().then((i) => (this._heartbeatsCache = i, i));
  }
  async triggerHeartbeat() {
    var a, t;
    try {
      const r = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(), s = $s();
      if (((a = this._heartbeatsCache) === null || a === void 0 ? void 0 : a.heartbeats) == null && (this._heartbeatsCache = await this._heartbeatsCachePromise, ((t = this._heartbeatsCache) === null || t === void 0 ? void 0 : t.heartbeats) == null) || this._heartbeatsCache.lastSentHeartbeatDate === s || this._heartbeatsCache.heartbeats.some((f) => f.date === s)) return;
      if (this._heartbeatsCache.heartbeats.push({ date: s, agent: r }), this._heartbeatsCache.heartbeats.length > Vh) {
        const f = Kh(this._heartbeatsCache.heartbeats);
        this._heartbeatsCache.heartbeats.splice(f, 1);
      }
      return this._storage.overwrite(this._heartbeatsCache);
    } catch (i) {
      Un.warn(i);
    }
  }
  async getHeartbeatsHeader() {
    var a;
    try {
      if (this._heartbeatsCache === null && await this._heartbeatsCachePromise, ((a = this._heartbeatsCache) === null || a === void 0 ? void 0 : a.heartbeats) == null || this._heartbeatsCache.heartbeats.length === 0) return "";
      const t = $s(), { heartbeatsToSend: i, unsentEntries: r } = Wh(this._heartbeatsCache.heartbeats), s = cc(JSON.stringify({ version: 2, heartbeats: i }));
      return this._heartbeatsCache.lastSentHeartbeatDate = t, r.length > 0 ? (this._heartbeatsCache.heartbeats = r, await this._storage.overwrite(this._heartbeatsCache)) : (this._heartbeatsCache.heartbeats = [], this._storage.overwrite(this._heartbeatsCache)), s;
    } catch (t) {
      return Un.warn(t), "";
    }
  }
}
function $s() {
  return (/* @__PURE__ */ new Date()).toISOString().substring(0, 10);
}
function Wh(e, a = $h) {
  const t = [];
  let i = e.slice();
  for (const r of e) {
    const s = t.find((f) => f.agent === r.agent);
    if (s) {
      if (s.dates.push(r.date), Vs(t) > a) {
        s.dates.pop();
        break;
      }
    } else if (t.push({ agent: r.agent, dates: [r.date] }), Vs(t) > a) {
      t.pop();
      break;
    }
    i = i.slice(1);
  }
  return { heartbeatsToSend: t, unsentEntries: i };
}
class qh {
  constructor(a) {
    this.app = a, this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
  }
  async runIndexedDBEnvironmentCheck() {
    return dc() ? uc().then(() => true).catch(() => false) : false;
  }
  async read() {
    if (await this._canUseIndexedDBPromise) {
      const t = await Hh(this.app);
      return t != null && t.heartbeats ? t : { heartbeats: [] };
    } else return { heartbeats: [] };
  }
  async overwrite(a) {
    var t;
    if (await this._canUseIndexedDBPromise) {
      const r = await this.read();
      return Hs(this.app, { lastSentHeartbeatDate: (t = a.lastSentHeartbeatDate) !== null && t !== void 0 ? t : r.lastSentHeartbeatDate, heartbeats: a.heartbeats });
    } else return;
  }
  async add(a) {
    var t;
    if (await this._canUseIndexedDBPromise) {
      const r = await this.read();
      return Hs(this.app, { lastSentHeartbeatDate: (t = a.lastSentHeartbeatDate) !== null && t !== void 0 ? t : r.lastSentHeartbeatDate, heartbeats: [...r.heartbeats, ...a.heartbeats] });
    } else return;
  }
}
function Vs(e) {
  return cc(JSON.stringify({ version: 2, heartbeats: e })).length;
}
function Kh(e) {
  if (e.length === 0) return -1;
  let a = 0, t = e[0].date;
  for (let i = 1; i < e.length; i++) e[i].date < t && (t = e[i].date, a = i);
  return a;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Xh(e) {
  pa(new Xn("platform-logger", (a) => new uh(a), "PRIVATE")), pa(new Xn("heartbeat", (a) => new Zh(a), "PRIVATE")), qn(er, _s, e), qn(er, _s, "esm2017"), qn("fire-js", "");
}
Xh("");
var em = "firebase", nm = "11.10.0";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
qn(em, nm, "app");
const wc = "@firebase/installations", Hr = "0.6.18";
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const yc = 1e4, jc = `w:${Hr}`, Mc = "FIS_v2", am = "https://firebaseinstallations.googleapis.com/v1", tm = 3600 * 1e3, im = "installations", rm = "Installations";
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const sm = { "missing-app-config-values": 'Missing App configuration value: "{$valueName}"', "not-registered": "Firebase Installation is not registered.", "installation-not-found": "Firebase Installation not found.", "request-failed": '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"', "app-offline": "Could not process request. Application offline.", "delete-pending-registration": "Can't delete installation while there is a pending registration request." }, ba = new pi(im, rm, sm);
function vc(e) {
  return e instanceof Va && e.code.includes("request-failed");
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Lc({ projectId: e }) {
  return `${am}/projects/${e}/installations`;
}
function Cc(e) {
  return { token: e.token, requestStatus: 2, expiresIn: fm(e.expiresIn), creationTime: Date.now() };
}
async function xc(e, a) {
  const i = (await a.json()).error;
  return ba.create("request-failed", { requestName: e, serverCode: i.code, serverMessage: i.message, serverStatus: i.status });
}
function Ic({ apiKey: e }) {
  return new Headers({ "Content-Type": "application/json", Accept: "application/json", "x-goog-api-key": e });
}
function om(e, { refreshToken: a }) {
  const t = Ic(e);
  return t.append("Authorization", cm(a)), t;
}
async function Sc(e) {
  const a = await e();
  return a.status >= 500 && a.status < 600 ? e() : a;
}
function fm(e) {
  return Number(e.replace("s", "000"));
}
function cm(e) {
  return `${Mc} ${e}`;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function lm({ appConfig: e, heartbeatServiceProvider: a }, { fid: t }) {
  const i = Lc(e), r = Ic(e), s = a.getImmediate({ optional: true });
  if (s) {
    const u = await s.getHeartbeatsHeader();
    u && r.append("x-firebase-client", u);
  }
  const f = { fid: t, authVersion: Mc, appId: e.appId, sdkVersion: jc }, c = { method: "POST", headers: r, body: JSON.stringify(f) }, d = await Sc(() => fetch(i, c));
  if (d.ok) {
    const u = await d.json();
    return { fid: u.fid || t, registrationStatus: 2, refreshToken: u.refreshToken, authToken: Cc(u.authToken) };
  } else throw await xc("Create Installation", d);
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function kc(e) {
  return new Promise((a) => {
    setTimeout(a, e);
  });
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function dm(e) {
  return btoa(String.fromCharCode(...e)).replace(/\+/g, "-").replace(/\//g, "_");
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const um = /^[cdef][\w-]{21}$/, tr = "";
function hm() {
  try {
    const e = new Uint8Array(17);
    (self.crypto || self.msCrypto).getRandomValues(e), e[0] = 112 + e[0] % 16;
    const t = mm(e);
    return um.test(t) ? t : tr;
  } catch {
    return tr;
  }
}
function mm(e) {
  return dm(e).substr(0, 22);
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function wi(e) {
  return `${e.appName}!${e.appId}`;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const Nc = /* @__PURE__ */ new Map();
function Ec(e, a) {
  const t = wi(e);
  Tc(t, a), gm(t, a);
}
function Tc(e, a) {
  const t = Nc.get(e);
  if (t) for (const i of t) i(a);
}
function gm(e, a) {
  const t = pm();
  t && t.postMessage({ key: e, fid: a }), bm();
}
let ca = null;
function pm() {
  return !ca && "BroadcastChannel" in self && (ca = new BroadcastChannel("[Firebase] FID Change"), ca.onmessage = (e) => {
    Tc(e.data.key, e.data.fid);
  }), ca;
}
function bm() {
  Nc.size === 0 && ca && (ca.close(), ca = null);
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const wm = "firebase-installations-database", ym = 1, wa = "firebase-installations-store";
let Ti = null;
function $r() {
  return Ti || (Ti = bi(wm, ym, { upgrade: (e, a) => {
    switch (a) {
      case 0:
        e.createObjectStore(wa);
    }
  } })), Ti;
}
async function Ft(e, a) {
  const t = wi(e), r = (await $r()).transaction(wa, "readwrite"), s = r.objectStore(wa), f = await s.get(t);
  return await s.put(a, t), await r.done, (!f || f.fid !== a.fid) && Ec(e, a.fid), a;
}
async function Dc(e) {
  const a = wi(e), i = (await $r()).transaction(wa, "readwrite");
  await i.objectStore(wa).delete(a), await i.done;
}
async function yi(e, a) {
  const t = wi(e), r = (await $r()).transaction(wa, "readwrite"), s = r.objectStore(wa), f = await s.get(t), c = a(f);
  return c === void 0 ? await s.delete(t) : await s.put(c, t), await r.done, c && (!f || f.fid !== c.fid) && Ec(e, c.fid), c;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function Vr(e) {
  let a;
  const t = await yi(e.appConfig, (i) => {
    const r = jm(i), s = Mm(e, r);
    return a = s.registrationPromise, s.installationEntry;
  });
  return t.fid === tr ? { installationEntry: await a } : { installationEntry: t, registrationPromise: a };
}
function jm(e) {
  const a = e || { fid: hm(), registrationStatus: 0 };
  return Ac(a);
}
function Mm(e, a) {
  if (a.registrationStatus === 0) {
    if (!navigator.onLine) {
      const r = Promise.reject(ba.create("app-offline"));
      return { installationEntry: a, registrationPromise: r };
    }
    const t = { fid: a.fid, registrationStatus: 1, registrationTime: Date.now() }, i = vm(e, t);
    return { installationEntry: t, registrationPromise: i };
  } else return a.registrationStatus === 1 ? { installationEntry: a, registrationPromise: Lm(e) } : { installationEntry: a };
}
async function vm(e, a) {
  try {
    const t = await lm(e, a);
    return Ft(e.appConfig, t);
  } catch (t) {
    throw vc(t) && t.customData.serverCode === 409 ? await Dc(e.appConfig) : await Ft(e.appConfig, { fid: a.fid, registrationStatus: 0 }), t;
  }
}
async function Lm(e) {
  let a = await Zs(e.appConfig);
  for (; a.registrationStatus === 1; ) await kc(100), a = await Zs(e.appConfig);
  if (a.registrationStatus === 0) {
    const { installationEntry: t, registrationPromise: i } = await Vr(e);
    return i || t;
  }
  return a;
}
function Zs(e) {
  return yi(e, (a) => {
    if (!a) throw ba.create("installation-not-found");
    return Ac(a);
  });
}
function Ac(e) {
  return Cm(e) ? { fid: e.fid, registrationStatus: 0 } : e;
}
function Cm(e) {
  return e.registrationStatus === 1 && e.registrationTime + yc < Date.now();
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function xm({ appConfig: e, heartbeatServiceProvider: a }, t) {
  const i = Im(e, t), r = om(e, t), s = a.getImmediate({ optional: true });
  if (s) {
    const u = await s.getHeartbeatsHeader();
    u && r.append("x-firebase-client", u);
  }
  const f = { installation: { sdkVersion: jc, appId: e.appId } }, c = { method: "POST", headers: r, body: JSON.stringify(f) }, d = await Sc(() => fetch(i, c));
  if (d.ok) {
    const u = await d.json();
    return Cc(u);
  } else throw await xc("Generate Auth Token", d);
}
function Im(e, { fid: a }) {
  return `${Lc(e)}/${a}/authTokens:generate`;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function Zr(e, a = false) {
  let t;
  const i = await yi(e.appConfig, (s) => {
    if (!zc(s)) throw ba.create("not-registered");
    const f = s.authToken;
    if (!a && Nm(f)) return s;
    if (f.requestStatus === 1) return t = Sm(e, a), s;
    {
      if (!navigator.onLine) throw ba.create("app-offline");
      const c = Tm(s);
      return t = km(e, c), c;
    }
  });
  return t ? await t : i.authToken;
}
async function Sm(e, a) {
  let t = await Ws(e.appConfig);
  for (; t.authToken.requestStatus === 1; ) await kc(100), t = await Ws(e.appConfig);
  const i = t.authToken;
  return i.requestStatus === 0 ? Zr(e, a) : i;
}
function Ws(e) {
  return yi(e, (a) => {
    if (!zc(a)) throw ba.create("not-registered");
    const t = a.authToken;
    return Dm(t) ? Object.assign(Object.assign({}, a), { authToken: { requestStatus: 0 } }) : a;
  });
}
async function km(e, a) {
  try {
    const t = await xm(e, a), i = Object.assign(Object.assign({}, a), { authToken: t });
    return await Ft(e.appConfig, i), t;
  } catch (t) {
    if (vc(t) && (t.customData.serverCode === 401 || t.customData.serverCode === 404)) await Dc(e.appConfig);
    else {
      const i = Object.assign(Object.assign({}, a), { authToken: { requestStatus: 0 } });
      await Ft(e.appConfig, i);
    }
    throw t;
  }
}
function zc(e) {
  return e !== void 0 && e.registrationStatus === 2;
}
function Nm(e) {
  return e.requestStatus === 2 && !Em(e);
}
function Em(e) {
  const a = Date.now();
  return a < e.creationTime || e.creationTime + e.expiresIn < a + tm;
}
function Tm(e) {
  const a = { requestStatus: 1, requestTime: Date.now() };
  return Object.assign(Object.assign({}, e), { authToken: a });
}
function Dm(e) {
  return e.requestStatus === 1 && e.requestTime + yc < Date.now();
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function Am(e) {
  const a = e, { installationEntry: t, registrationPromise: i } = await Vr(a);
  return i ? i.catch(console.error) : Zr(a).catch(console.error), t.fid;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function zm(e, a = false) {
  const t = e;
  return await Rm(t), (await Zr(t, a)).token;
}
async function Rm(e) {
  const { registrationPromise: a } = await Vr(e);
  a && await a;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Pm(e) {
  if (!e || !e.options) throw Di("App Configuration");
  if (!e.name) throw Di("App Name");
  const a = ["projectId", "apiKey", "appId"];
  for (const t of a) if (!e.options[t]) throw Di(t);
  return { appName: e.name, projectId: e.options.projectId, apiKey: e.options.apiKey, appId: e.options.appId };
}
function Di(e) {
  return ba.create("missing-app-config-values", { valueName: e });
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const Rc = "installations", Om = "installations-internal", Um = (e) => {
  const a = e.getProvider("app").getImmediate(), t = Pm(a), i = Jr(a, "heartbeat");
  return { app: a, appConfig: t, heartbeatServiceProvider: i, _delete: () => Promise.resolve() };
}, Bm = (e) => {
  const a = e.getProvider("app").getImmediate(), t = Jr(a, Rc).getImmediate();
  return { getId: () => Am(t), getToken: (r) => zm(t, r) };
};
function Gm() {
  pa(new Xn(Rc, Um, "PUBLIC")), pa(new Xn(Om, Bm, "PRIVATE"));
}
Gm();
qn(wc, Hr);
qn(wc, Hr, "esm2017");
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const Ym = "/firebase-messaging-sw.js", Qm = "/firebase-cloud-messaging-push-scope", Pc = "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4", Jm = "https://fcmregistrations.googleapis.com/v1", Oc = "google.c.a.c_id", _m = "google.c.a.c_l", Fm = "google.c.a.ts", Hm = "google.c.a.e", qs = 1e4;
var Ks;
(function(e) {
  e[e.DATA_MESSAGE = 1] = "DATA_MESSAGE", e[e.DISPLAY_NOTIFICATION = 3] = "DISPLAY_NOTIFICATION";
})(Ks || (Ks = {}));
/**
* @license
* Copyright 2018 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
* in compliance with the License. You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software distributed under the License
* is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
* or implied. See the License for the specific language governing permissions and limitations under
* the License.
*/
var yt;
(function(e) {
  e.PUSH_RECEIVED = "push-received", e.NOTIFICATION_CLICKED = "notification-clicked";
})(yt || (yt = {}));
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Rn(e) {
  const a = new Uint8Array(e);
  return btoa(String.fromCharCode(...a)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function $m(e) {
  const a = "=".repeat((4 - e.length % 4) % 4), t = (e + a).replace(/\-/g, "+").replace(/_/g, "/"), i = atob(t), r = new Uint8Array(i.length);
  for (let s = 0; s < i.length; ++s) r[s] = i.charCodeAt(s);
  return r;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const Ai = "fcm_token_details_db", Vm = 5, Xs = "fcm_token_object_Store";
async function Zm(e) {
  if ("databases" in indexedDB && !(await indexedDB.databases()).map((s) => s.name).includes(Ai)) return null;
  let a = null;
  return (await bi(Ai, Vm, { upgrade: async (i, r, s, f) => {
    var c;
    if (r < 2 || !i.objectStoreNames.contains(Xs)) return;
    const d = f.objectStore(Xs), u = await d.index("fcmSenderId").get(e);
    if (await d.clear(), !!u) {
      if (r === 2) {
        const h = u;
        if (!h.auth || !h.p256dh || !h.endpoint) return;
        a = { token: h.fcmToken, createTime: (c = h.createTime) !== null && c !== void 0 ? c : Date.now(), subscriptionOptions: { auth: h.auth, p256dh: h.p256dh, endpoint: h.endpoint, swScope: h.swScope, vapidKey: typeof h.vapidKey == "string" ? h.vapidKey : Rn(h.vapidKey) } };
      } else if (r === 3) {
        const h = u;
        a = { token: h.fcmToken, createTime: h.createTime, subscriptionOptions: { auth: Rn(h.auth), p256dh: Rn(h.p256dh), endpoint: h.endpoint, swScope: h.swScope, vapidKey: Rn(h.vapidKey) } };
      } else if (r === 4) {
        const h = u;
        a = { token: h.fcmToken, createTime: h.createTime, subscriptionOptions: { auth: Rn(h.auth), p256dh: Rn(h.p256dh), endpoint: h.endpoint, swScope: h.swScope, vapidKey: Rn(h.vapidKey) } };
      }
    }
  } })).close(), await ki(Ai), await ki("fcm_vapid_details_db"), await ki("undefined"), Wm(a) ? a : null;
}
function Wm(e) {
  if (!e || !e.subscriptionOptions) return false;
  const { subscriptionOptions: a } = e;
  return typeof e.createTime == "number" && e.createTime > 0 && typeof e.token == "string" && e.token.length > 0 && typeof a.auth == "string" && a.auth.length > 0 && typeof a.p256dh == "string" && a.p256dh.length > 0 && typeof a.endpoint == "string" && a.endpoint.length > 0 && typeof a.swScope == "string" && a.swScope.length > 0 && typeof a.vapidKey == "string" && a.vapidKey.length > 0;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const qm = "firebase-messaging-database", Km = 1, jt = "firebase-messaging-store";
let zi = null;
function Uc() {
  return zi || (zi = bi(qm, Km, { upgrade: (e, a) => {
    switch (a) {
      case 0:
        e.createObjectStore(jt);
    }
  } })), zi;
}
async function Xm(e) {
  const a = Bc(e), i = await (await Uc()).transaction(jt).objectStore(jt).get(a);
  if (i) return i;
  {
    const r = await Zm(e.appConfig.senderId);
    if (r) return await Wr(e, r), r;
  }
}
async function Wr(e, a) {
  const t = Bc(e), r = (await Uc()).transaction(jt, "readwrite");
  return await r.objectStore(jt).put(a, t), await r.done, a;
}
function Bc({ appConfig: e }) {
  return e.appId;
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const eg = { "missing-app-config-values": 'Missing App configuration value: "{$valueName}"', "only-available-in-window": "This method is available in a Window context.", "only-available-in-sw": "This method is available in a service worker context.", "permission-default": "The notification permission was not granted and dismissed instead.", "permission-blocked": "The notification permission was not granted and blocked instead.", "unsupported-browser": "This browser doesn't support the API's required to use the Firebase SDK.", "indexed-db-unsupported": "This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)", "failed-service-worker-registration": "We are unable to register the default service worker. {$browserErrorMessage}", "token-subscribe-failed": "A problem occurred while subscribing the user to FCM: {$errorInfo}", "token-subscribe-no-token": "FCM returned no token when subscribing the user to push.", "token-unsubscribe-failed": "A problem occurred while unsubscribing the user from FCM: {$errorInfo}", "token-update-failed": "A problem occurred while updating the user from FCM: {$errorInfo}", "token-update-no-token": "FCM returned no token when updating the user to push.", "use-sw-after-get-token": "The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.", "invalid-sw-registration": "The input to useServiceWorker() must be a ServiceWorkerRegistration.", "invalid-bg-handler": "The input to setBackgroundMessageHandler() must be a function.", "invalid-vapid-key": "The public VAPID key must be a string.", "use-vapid-key-after-get-token": "The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used." }, ln = new pi("messaging", "Messaging", eg);
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function ng(e, a) {
  const t = await Kr(e), i = Gc(a), r = { method: "POST", headers: t, body: JSON.stringify(i) };
  let s;
  try {
    s = await (await fetch(qr(e.appConfig), r)).json();
  } catch (f) {
    throw ln.create("token-subscribe-failed", { errorInfo: f == null ? void 0 : f.toString() });
  }
  if (s.error) {
    const f = s.error.message;
    throw ln.create("token-subscribe-failed", { errorInfo: f });
  }
  if (!s.token) throw ln.create("token-subscribe-no-token");
  return s.token;
}
async function ag(e, a) {
  const t = await Kr(e), i = Gc(a.subscriptionOptions), r = { method: "PATCH", headers: t, body: JSON.stringify(i) };
  let s;
  try {
    s = await (await fetch(`${qr(e.appConfig)}/${a.token}`, r)).json();
  } catch (f) {
    throw ln.create("token-update-failed", { errorInfo: f == null ? void 0 : f.toString() });
  }
  if (s.error) {
    const f = s.error.message;
    throw ln.create("token-update-failed", { errorInfo: f });
  }
  if (!s.token) throw ln.create("token-update-no-token");
  return s.token;
}
async function tg(e, a) {
  const i = { method: "DELETE", headers: await Kr(e) };
  try {
    const s = await (await fetch(`${qr(e.appConfig)}/${a}`, i)).json();
    if (s.error) {
      const f = s.error.message;
      throw ln.create("token-unsubscribe-failed", { errorInfo: f });
    }
  } catch (r) {
    throw ln.create("token-unsubscribe-failed", { errorInfo: r == null ? void 0 : r.toString() });
  }
}
function qr({ projectId: e }) {
  return `${Jm}/projects/${e}/registrations`;
}
async function Kr({ appConfig: e, installations: a }) {
  const t = await a.getToken();
  return new Headers({ "Content-Type": "application/json", Accept: "application/json", "x-goog-api-key": e.apiKey, "x-goog-firebase-installations-auth": `FIS ${t}` });
}
function Gc({ p256dh: e, auth: a, endpoint: t, vapidKey: i }) {
  const r = { web: { endpoint: t, auth: a, p256dh: e } };
  return i !== Pc && (r.web.applicationPubKey = i), r;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const ig = 10080 * 60 * 1e3;
async function rg(e) {
  const a = await og(e.swRegistration, e.vapidKey), t = { vapidKey: e.vapidKey, swScope: e.swRegistration.scope, endpoint: a.endpoint, auth: Rn(a.getKey("auth")), p256dh: Rn(a.getKey("p256dh")) }, i = await Xm(e.firebaseDependencies);
  if (i) {
    if (fg(i.subscriptionOptions, t)) return Date.now() >= i.createTime + ig ? sg(e, { token: i.token, createTime: Date.now(), subscriptionOptions: t }) : i.token;
    try {
      await tg(e.firebaseDependencies, i.token);
    } catch (r) {
      console.warn(r);
    }
    return eo(e.firebaseDependencies, t);
  } else return eo(e.firebaseDependencies, t);
}
async function sg(e, a) {
  try {
    const t = await ag(e.firebaseDependencies, a), i = Object.assign(Object.assign({}, a), { token: t, createTime: Date.now() });
    return await Wr(e.firebaseDependencies, i), t;
  } catch (t) {
    throw t;
  }
}
async function eo(e, a) {
  const i = { token: await ng(e, a), createTime: Date.now(), subscriptionOptions: a };
  return await Wr(e, i), i.token;
}
async function og(e, a) {
  const t = await e.pushManager.getSubscription();
  return t || e.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: $m(a) });
}
function fg(e, a) {
  const t = a.vapidKey === e.vapidKey, i = a.endpoint === e.endpoint, r = a.auth === e.auth, s = a.p256dh === e.p256dh;
  return t && i && r && s;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function no(e) {
  const a = { from: e.from, collapseKey: e.collapse_key, messageId: e.fcmMessageId };
  return cg(a, e), lg(a, e), dg(a, e), a;
}
function cg(e, a) {
  if (!a.notification) return;
  e.notification = {};
  const t = a.notification.title;
  t && (e.notification.title = t);
  const i = a.notification.body;
  i && (e.notification.body = i);
  const r = a.notification.image;
  r && (e.notification.image = r);
  const s = a.notification.icon;
  s && (e.notification.icon = s);
}
function lg(e, a) {
  a.data && (e.data = a.data);
}
function dg(e, a) {
  var t, i, r, s, f;
  if (!a.fcmOptions && !(!((t = a.notification) === null || t === void 0) && t.click_action)) return;
  e.fcmOptions = {};
  const c = (r = (i = a.fcmOptions) === null || i === void 0 ? void 0 : i.link) !== null && r !== void 0 ? r : (s = a.notification) === null || s === void 0 ? void 0 : s.click_action;
  c && (e.fcmOptions.link = c);
  const d = (f = a.fcmOptions) === null || f === void 0 ? void 0 : f.analytics_label;
  d && (e.fcmOptions.analyticsLabel = d);
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function ug(e) {
  return typeof e == "object" && !!e && Oc in e;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function hg(e) {
  if (!e || !e.options) throw Ri("App Configuration Object");
  if (!e.name) throw Ri("App Name");
  const a = ["projectId", "apiKey", "appId", "messagingSenderId"], { options: t } = e;
  for (const i of a) if (!t[i]) throw Ri(i);
  return { appName: e.name, projectId: t.projectId, apiKey: t.apiKey, appId: t.appId, senderId: t.messagingSenderId };
}
function Ri(e) {
  return ln.create("missing-app-config-values", { valueName: e });
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
class mg {
  constructor(a, t, i) {
    this.deliveryMetricsExportedToBigQueryEnabled = false, this.onBackgroundMessageHandler = null, this.onMessageHandler = null, this.logEvents = [], this.isLogServiceStarted = false;
    const r = hg(a);
    this.firebaseDependencies = { app: a, appConfig: r, installations: t, analyticsProvider: i };
  }
  _delete() {
    return Promise.resolve();
  }
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function gg(e) {
  try {
    e.swRegistration = await navigator.serviceWorker.register(Ym, { scope: Qm }), e.swRegistration.update().catch(() => {
    }), await pg(e.swRegistration);
  } catch (a) {
    throw ln.create("failed-service-worker-registration", { browserErrorMessage: a == null ? void 0 : a.message });
  }
}
async function pg(e) {
  return new Promise((a, t) => {
    const i = setTimeout(() => t(new Error(`Service worker not registered after ${qs} ms`)), qs), r = e.installing || e.waiting;
    e.active ? (clearTimeout(i), a()) : r ? r.onstatechange = (s) => {
      var f;
      ((f = s.target) === null || f === void 0 ? void 0 : f.state) === "activated" && (r.onstatechange = null, clearTimeout(i), a());
    } : (clearTimeout(i), t(new Error("No incoming service worker found.")));
  });
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function bg(e, a) {
  if (!a && !e.swRegistration && await gg(e), !(!a && e.swRegistration)) {
    if (!(a instanceof ServiceWorkerRegistration)) throw ln.create("invalid-sw-registration");
    e.swRegistration = a;
  }
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function wg(e, a) {
  a ? e.vapidKey = a : e.vapidKey || (e.vapidKey = Pc);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function Yc(e, a) {
  if (!navigator) throw ln.create("only-available-in-window");
  if (Notification.permission === "default" && await Notification.requestPermission(), Notification.permission !== "granted") throw ln.create("permission-blocked");
  return await wg(e, a == null ? void 0 : a.vapidKey), await bg(e, a == null ? void 0 : a.serviceWorkerRegistration), rg(e);
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function yg(e, a, t) {
  const i = jg(a);
  (await e.firebaseDependencies.analyticsProvider.get()).logEvent(i, { message_id: t[Oc], message_name: t[_m], message_time: t[Fm], message_device_time: Math.floor(Date.now() / 1e3) });
}
function jg(e) {
  switch (e) {
    case yt.NOTIFICATION_CLICKED:
      return "notification_open";
    case yt.PUSH_RECEIVED:
      return "notification_foreground";
    default:
      throw new Error();
  }
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function Mg(e, a) {
  const t = a.data;
  if (!t.isFirebaseMessaging) return;
  e.onMessageHandler && t.messageType === yt.PUSH_RECEIVED && (typeof e.onMessageHandler == "function" ? e.onMessageHandler(no(t)) : e.onMessageHandler.next(no(t)));
  const i = t.data;
  ug(i) && i[Hm] === "1" && await yg(e, t.messageType, i);
}
const ao = "@firebase/messaging", to = "0.12.22";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const vg = (e) => {
  const a = new mg(e.getProvider("app").getImmediate(), e.getProvider("installations-internal").getImmediate(), e.getProvider("analytics-internal"));
  return navigator.serviceWorker.addEventListener("message", (t) => Mg(a, t)), a;
}, Lg = (e) => {
  const a = e.getProvider("messaging").getImmediate();
  return { getToken: (i) => Yc(a, i) };
};
function Cg() {
  pa(new Xn("messaging", vg, "PUBLIC")), pa(new Xn("messaging-internal", Lg, "PRIVATE")), qn(ao, to), qn(ao, to, "esm2017");
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function Xr() {
  try {
    await uc();
  } catch {
    return false;
  }
  return typeof window < "u" && dc() && J0() && "serviceWorker" in navigator && "PushManager" in window && "Notification" in window && "fetch" in window && ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification") && PushSubscription.prototype.hasOwnProperty("getKey");
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function xg(e, a) {
  if (!navigator) throw ln.create("only-available-in-window");
  return e.onMessageHandler = a, () => {
    e.onMessageHandler = null;
  };
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Qc(e = Fr()) {
  return Xr().then((a) => {
    if (!a) throw ln.create("unsupported-browser");
  }, (a) => {
    throw ln.create("indexed-db-unsupported");
  }), Jr(Yr(e), "messaging").getImmediate();
}
async function Ig(e, a) {
  return e = Yr(e), Yc(e, a);
}
function Sg(e, a) {
  return e = Yr(e), xg(e, a);
}
Cg();
function _n(e) {
  return typeof e == "string" && e.trim().length > 0;
}
function Ht(e) {
  if (!e || typeof e != "object") return false;
  const a = e;
  switch (a.kind) {
    case "home":
      return true;
    case "profile":
      return _n(a.userId);
    case "post":
      return _n(a.postId) && (a.commentId === void 0 || _n(a.commentId)) && (a.focusComment === void 0 || typeof a.focusComment == "boolean");
    case "conversation":
      return _n(a.conversationId) && (a.messageId === void 0 || _n(a.messageId)) && (a.messageSeq === void 0 || typeof a.messageSeq == "number" && Number.isSafeInteger(a.messageSeq) && a.messageSeq >= 0) && (a.surface === void 0 || a.surface === "full" || a.surface === "mini") && (a.panel === void 0 || a.panel === "details" || a.panel === "requests");
    case "story":
      return _n(a.ownerId) && (a.storyId === void 0 || _n(a.storyId)) && (a.storyItemId === void 0 || _n(a.storyItemId)) && (a.scope === "owner" || a.scope === "rail");
    default:
      return false;
  }
}
const Jc = "notificationTarget", _c = "https://notification.local";
function sa(e, a, t) {
  t !== void 0 && e.set(a, String(t));
}
function un(e) {
  return (e == null ? void 0 : e.trim()) || null;
}
function Fc(e) {
  if (e === null || !/^\d+$/.test(e)) return;
  const a = Number(e);
  return Number.isSafeInteger(a) ? a : void 0;
}
function kg(e) {
  const a = e.pathname.replace(/^\/app(?=\/)/, ""), t = e.searchParams;
  if (a === "/" || a === "") return { kind: "home" };
  if (a === "/messages") {
    const s = un(t.get("conversationId"));
    if (!s) return null;
    const f = un(t.get("messageId")) ?? void 0, c = Fc(t.get("messageSeq")), d = t.get("panel");
    return { kind: "conversation", conversationId: s, ...f ? { messageId: f } : {}, ...c !== void 0 ? { messageSeq: c } : {}, ...d === "details" || d === "requests" ? { panel: d } : {} };
  }
  const i = a.match(/^\/profiles\/([^/]+)$/);
  if (i) return { kind: "profile", userId: decodeURIComponent(i[1]) };
  const r = a.match(/^\/posts\/([^/]+)$/);
  if (r) {
    const s = un(t.get("commentId")) ?? void 0;
    return { kind: "post", postId: decodeURIComponent(r[1]), ...s ? { commentId: s, focusComment: true } : {} };
  }
  if (a === "/stories") {
    const s = un(t.get("ownerId"));
    if (!s) return null;
    const f = un(t.get("storyId")) ?? void 0, c = un(t.get("storyItemId")) ?? void 0;
    return { kind: "story", ownerId: s, scope: t.get("scoped") === "true" ? "owner" : "rail", ...f ? { storyId: f } : {}, ...c ? { storyItemId: c } : {} };
  }
  return null;
}
function Ng(e, a = "/") {
  if (!Ht(e)) throw new Error("Cannot encode an invalid notification destination.");
  const t = /^[a-z][a-z\d+.-]*:\/\//i.test(a), i = new URL(a, _c), r = i.searchParams;
  switch (r.set(Jc, e.kind), e.kind) {
    case "home":
      break;
    case "profile":
      r.set("userId", e.userId);
      break;
    case "post":
      r.set("postId", e.postId), sa(r, "commentId", e.commentId), e.focusComment && r.set("focusComment", "1");
      break;
    case "conversation":
      r.set("conversationId", e.conversationId), sa(r, "messageId", e.messageId), sa(r, "messageSeq", e.messageSeq), sa(r, "surface", e.surface), sa(r, "panel", e.panel);
      break;
    case "story":
      r.set("ownerId", e.ownerId), sa(r, "storyId", e.storyId), sa(r, "storyItemId", e.storyItemId), r.set("scope", e.scope);
      break;
  }
  return t ? i.toString() : `${i.pathname}${i.search}${i.hash}`;
}
function Za(e) {
  try {
    const a = e instanceof URL ? e : new URL(e, _c), t = a.searchParams, i = t.get(Jc);
    if (!i) return kg(a);
    let r = null;
    switch (i) {
      case "home":
        r = { kind: "home" };
        break;
      case "profile": {
        const s = un(t.get("userId"));
        s && (r = { kind: "profile", userId: s });
        break;
      }
      case "post": {
        const s = un(t.get("postId"));
        if (!s) break;
        const f = un(t.get("commentId")) ?? void 0;
        r = { kind: "post", postId: s, ...f ? { commentId: f } : {}, ...t.get("focusComment") === "1" ? { focusComment: true } : {} };
        break;
      }
      case "conversation": {
        const s = un(t.get("conversationId"));
        if (!s) break;
        const f = un(t.get("messageId")) ?? void 0, c = Fc(t.get("messageSeq")), d = t.get("surface"), u = t.get("panel");
        r = { kind: "conversation", conversationId: s, ...f ? { messageId: f } : {}, ...c !== void 0 ? { messageSeq: c } : {}, ...d === "full" || d === "mini" ? { surface: d } : {}, ...u === "details" || u === "requests" ? { panel: u } : {} };
        break;
      }
      case "story": {
        const s = un(t.get("ownerId")), f = t.get("scope");
        if (!s || f !== "owner" && f !== "rail") break;
        const c = un(t.get("storyId")) ?? void 0, d = un(t.get("storyItemId")) ?? void 0;
        r = { kind: "story", ownerId: s, scope: f, ...c ? { storyId: c } : {}, ...d ? { storyItemId: d } : {} };
        break;
      }
    }
    return r && Ht(r) ? r : null;
  } catch {
    return null;
  }
}
function io(e) {
  switch (e.kind) {
    case "home":
      return "home";
    case "profile":
      return e.userId;
    case "post":
      return e.postId;
    case "conversation":
      return e.conversationId;
    case "story":
      return e.storyId ?? e.ownerId;
  }
}
function Eg(e, a) {
  return !!(e && a && e.kind === a.kind && io(e) === io(a));
}
function Hc(e = {}) {
  const a = /* @__PURE__ */ new Map(), t = e.dedupeWindowMs ?? 6e4, i = e.now ?? Date.now;
  function r(s, f) {
    var u;
    const c = i(), d = s.notificationId ?? s.url;
    if (d) {
      const h = a.get(d);
      if (h !== void 0 && c - h <= t) return { display: false, reason: "duplicate" };
      a.set(d, c);
    }
    return Eg(s.destination, f) ? { display: false, reason: "active-destination" } : (u = e.shouldSuppress) != null && u.call(e, s, f) ? { display: false, reason: "custom" } : { display: true, reason: "display" };
  }
  return { evaluate: r };
}
const Ea = "social-media:pending-notification-destination", Tg = 1440 * 60 * 1e3;
function es() {
  return typeof window < "u" ? window.sessionStorage : void 0;
}
function Pi(e, a = {}) {
  var s;
  const t = a.storage ?? es();
  if (!t) return;
  const i = ((s = a.now) == null ? void 0 : s.call(a)) ?? Date.now(), r = { version: 1, url: Ng(e), expiresAt: i + (a.ttlMs ?? Tg) };
  t.setItem(Ea, JSON.stringify(r));
}
function Dg(e = {}) {
  var i;
  const a = e.storage ?? es();
  if (!a) return null;
  const t = a.getItem(Ea);
  if (!t) return null;
  try {
    const r = JSON.parse(t), s = ((i = e.now) == null ? void 0 : i.call(e)) ?? Date.now();
    if (r.version !== 1 || typeof r.url != "string" || typeof r.expiresAt != "number" || r.expiresAt < s) return a.removeItem(Ea), null;
    const f = Za(r.url);
    return f || a.removeItem(Ea), f;
  } catch {
    return a.removeItem(Ea), null;
  }
}
function Ag(e = {}) {
  const a = e.storage ?? es(), t = Dg({ ...e, storage: a });
  return a == null || a.removeItem(Ea), t;
}
function zg(e) {
  var r, s, f, c, d, u, h, m, p, g, C, y;
  const a = e.data ?? {}, t = ((r = a.notificationId) == null ? void 0 : r.trim()) || ((s = a.id) == null ? void 0 : s.trim()) || void 0, i = ((f = a.url) == null ? void 0 : f.trim()) || void 0;
  return { ...t ? { notificationId: t } : {}, title: ((c = a.title) == null ? void 0 : c.trim()) || ((u = (d = e.notification) == null ? void 0 : d.title) == null ? void 0 : u.trim()) || "Th\xF4ng b\xE1o m\u1EDBi", body: ((h = a.body) == null ? void 0 : h.trim()) || ((p = (m = e.notification) == null ? void 0 : m.body) == null ? void 0 : p.trim()) || "B\u1EA1n c\xF3 m\u1ED9t th\xF4ng b\xE1o m\u1EDBi.", icon: ((g = a.icon) == null ? void 0 : g.trim()) || ((y = (C = e.notification) == null ? void 0 : C.icon) == null ? void 0 : y.trim()) || "/favicon.ico", ...i ? { url: i } : {}, destination: i ? Za(i) : null, data: a };
}
function Rg(e) {
  return { ...e.data ?? {}, ...e.metadata ?? {} };
}
function $t(e) {
  return e.replace(/[^a-z\d]/gi, "").toLowerCase();
}
function Fn(e, ...a) {
  const t = new Set(a.map($t));
  for (const [i, r] of Object.entries(e)) if (t.has($t(i)) && typeof r == "string" && r.trim()) return r.trim();
}
function Pg(e, ...a) {
  const t = new Set(a.map($t));
  for (const [i, r] of Object.entries(e)) {
    if (!t.has($t(i))) continue;
    const s = typeof r == "number" ? r : typeof r == "string" ? Number(r) : Number.NaN;
    if (Number.isSafeInteger(s) && s >= 0) return s;
  }
}
function Og(e) {
  var d, u, h, m, p;
  if (Ht(e.destination)) return e.destination;
  const a = Rg(e);
  if (Ht(a.destination)) return a.destination;
  const t = Fn(a, "url", "deepLink");
  if (t) {
    const g = Za(t);
    if (g) return g;
  }
  const i = ((d = e.actionType) == null ? void 0 : d.trim().toUpperCase()) ?? "", r = ((u = e.actorId) == null ? void 0 : u.trim()) || Fn(a, "actorId", "storyOwnerId"), s = ((h = e.entityId) == null ? void 0 : h.trim()) || void 0, f = Fn(a, "conversationId", "groupId"), c = Fn(a, "postId");
  if (i === "CHAT_MEMBER_REQUEST") {
    const g = f ?? s;
    return g ? { kind: "conversation", conversationId: g, panel: "requests" } : null;
  }
  if (i === "CHAT_GROUP_MEMBER_ADDED" || i === "CHAT_MEMBER_ADDED") {
    const g = f ?? s;
    return g ? { kind: "conversation", conversationId: g } : null;
  }
  if (i === "SEND_MESSAGE" || i === "NEW_MESSAGE" || i === "MESSAGE") {
    if (!f) return null;
    const g = Fn(a, "messageId") ?? s, C = Pg(a, "messageSeq");
    return { kind: "conversation", conversationId: f, ...g ? { messageId: g } : {}, ...C !== void 0 ? { messageSeq: C } : {} };
  }
  if (i === "STORY_DIRECT" || i === "FRIEND_STORY") {
    if (!r) return null;
    const g = Fn(a, "storyId") ?? s, C = Fn(a, "storyItemId");
    return { kind: "story", ownerId: r, scope: "owner", ...g ? { storyId: g } : {}, ...C ? { storyItemId: C } : {} };
  }
  if (i === "STORY_ACTIVITY" || i === "UP_STORY") return r ? { kind: "profile", userId: r } : null;
  if (i.includes("FOLLOW")) return r ? { kind: "profile", userId: r } : null;
  if (i.includes("COMMENT") || i.includes("REPLY")) {
    const g = c ?? (((m = e.entityType) == null ? void 0 : m.toUpperCase()) === "POST" ? s : void 0), C = Fn(a, "commentId") ?? (((p = e.entityType) == null ? void 0 : p.toUpperCase()) !== "POST" ? s : void 0);
    return g ? { kind: "post", postId: g, ...C ? { commentId: C, focusComment: true } : {} } : null;
  }
  if (i.includes("LIKE") || i.includes("POST_SHARED")) {
    const g = c ?? s;
    return g ? { kind: "post", postId: g } : null;
  }
  return null;
}
const ro = "SOCIAL_NOTIFICATION_NAVIGATE";
function Ug(e) {
  if (!e || typeof e != "object") return null;
  const a = e;
  return a.type !== ro || typeof a.url != "string" || !Za(a.url) || a.notificationId !== void 0 && typeof a.notificationId != "string" ? null : { type: ro, url: a.url, ...typeof a.notificationId == "string" ? { notificationId: a.notificationId } : {} };
}
function Bg(e) {
  if (typeof navigator > "u" || !("serviceWorker" in navigator)) return () => {
  };
  const a = (t) => {
    const i = Ug(t.data);
    if (!i) return;
    const r = Za(i.url);
    r && e(r, i);
  };
  return navigator.serviceWorker.addEventListener("message", a), () => navigator.serviceWorker.removeEventListener("message", a);
}
const $c = { apiKey: "AIzaSyAsiXfRJfpT_CJjqHwXLJLyOnuCAtZDbDw", authDomain: "social-app-4d91f.firebaseapp.com", projectId: "social-app-4d91f", storageBucket: "social-app-4d91f.firebasestorage.app", messagingSenderId: "294570923858", appId: "1:294570923858:web:da82fe629f87b7aecacc8b" }, so = "social-media-push-device-id";
let Ta = null, Na = null, Vc = Hc(), ns = {};
function Gg() {
  const e = window.localStorage.getItem(so);
  if (e) return e;
  const a = crypto.randomUUID();
  return window.localStorage.setItem(so, a), a;
}
function Vt() {
  return typeof window > "u" || !("Notification" in window) || !("serviceWorker" in navigator) ? "unsupported" : Notification.permission;
}
async function Yg(e) {
  if (Vt() === "unsupported" || !await Xr()) throw new Error("Push notifications are not supported by this browser.");
  const a = await Notification.requestPermission();
  if (a !== "granted") throw new Error(a === "denied" ? "Notification permission was blocked in browser settings." : "Notification permission was not granted.");
  const t = await navigator.serviceWorker.register("/firebase-messaging-sw.js", { scope: "/" });
  await navigator.serviceWorker.ready;
  const i = gc().length ? Fr() : _r($c), r = Qc(i), s = await Ig(r, { serviceWorkerRegistration: t });
  if (!s) throw new Error("Firebase did not return a messaging token.");
  return await ie("/notifications/push-tokens", "POST", { userId: e, deviceId: Gg(), deviceToken: s }), await Zc(), s;
}
async function Qg(e) {
  var s, f, c, d, u, h, m;
  if (Notification.permission !== "granted") return;
  const a = zg(e), t = ns, i = ((s = t.getActiveDestination) == null ? void 0 : s.call(t)) ?? null;
  (f = t.onReceived) == null || f.call(t, a);
  const r = Vc.evaluate(a, i);
  if (!r.display) {
    (c = t.onSuppressed) == null || c.call(t, a, r.reason);
    return;
  }
  if (await ((d = t.shouldSuppress) == null ? void 0 : d.call(t, a, i))) {
    (u = t.onSuppressed) == null || u.call(t, a, "custom");
    return;
  }
  try {
    await (await navigator.serviceWorker.ready).showNotification(a.title, { body: a.body, icon: a.icon, tag: a.notificationId, data: { ...a.data, ...a.url ? { url: a.url } : {}, ...a.notificationId ? { notificationId: a.notificationId } : {} } }), (h = t.onDisplayed) == null || h.call(t, a);
  } catch (p) {
    (m = t.onDisplayError) == null || m.call(t, p, a);
  }
}
function Zc(e = {}) {
  return ns = e, Ta ? Promise.resolve() : Na || (Na = (async () => {
    if (Vt() !== "granted" || !await Xr()) return;
    const a = gc().length ? Fr() : _r($c), t = Qc(a);
    Ta = Sg(t, (i) => {
      Qg(i);
    });
  })().finally(() => {
    Na = null;
  }), Na);
}
function oo() {
  Ta == null || Ta(), Ta = null, Na = null, ns = {}, Vc = Hc();
}
function Jg({ userId: e }) {
  const [a, t] = o.useState(() => Vt()), [i, r] = o.useState(false), [s, f] = o.useState("");
  async function c() {
    r(false), t("requesting"), f("");
    try {
      await Yg(e), t("registered");
    } catch (h) {
      const m = Vt();
      t(m === "denied" || m === "unsupported" ? m : "error"), f(h instanceof Error ? h.message : "Could not register push notifications.");
    }
  }
  const d = a === "requesting" || a === "registered" || a === "unsupported" || a === "denied", u = a === "requesting" ? "Requesting permission" : a === "registered" ? "Permission granted" : a === "denied" ? "Permission blocked" : a === "unsupported" ? "Notifications unsupported" : "Request Permission";
  return n.jsxs(n.Fragment, { children: [n.jsxs("div", { className: "notification-permission-control", children: [n.jsxs("span", { children: [n.jsx(ct, { size: 18 }), n.jsxs("span", { children: [n.jsx("strong", { children: "Browser notifications" }), n.jsx("small", { children: "Allow this device to receive push notifications." })] })] }), n.jsxs("button", { type: "button", disabled: d, onClick: () => r(true), children: [a === "requesting" ? n.jsx(Mn, { className: "spin", size: 17 }) : a === "registered" ? n.jsx(gn, { size: 17 }) : null, u] }), s && n.jsx("small", { className: "notification-permission-error", role: "alert", children: s })] }), i && ya.createPortal(n.jsx("div", { className: "permission-dialog-backdrop", role: "presentation", onMouseDown: (h) => h.target === h.currentTarget && r(false), children: n.jsxs("section", { className: "permission-dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": "permission-dialog-title", children: [n.jsx("button", { className: "permission-dialog-close", onClick: () => r(false), "aria-label": "Close", children: n.jsx(pe, { size: 18 }) }), n.jsx("span", { className: "permission-dialog-icon", children: n.jsx(ct, { size: 22 }) }), n.jsx("h3", { id: "permission-dialog-title", children: "Allow notifications?" }), n.jsx("p", { children: "Your browser will ask for permission. When accepted, this device will be registered for account notifications." }), n.jsxs("div", { children: [n.jsx("button", { onClick: () => r(false), children: "Not now" }), n.jsx("button", { className: "primary", onClick: () => void c(), children: "Continue" })] })] }) }), document.body)] });
}
function Wc({ title: e, description: a, action: t }) {
  return n.jsxs("div", { className: "shared-state", role: "status", children: [n.jsx("strong", { children: e }), a ? n.jsx("p", { children: a }) : null, t] });
}
function qc({ message: e, onRetry: a }) {
  return n.jsxs("div", { className: "shared-state shared-state-error", role: "alert", children: [n.jsx("p", { children: e }), a ? n.jsx("button", { type: "button", onClick: a, children: "Retry" }) : null] });
}
function Zt({ src: e, fallbackSrc: a = "/default-avatar.svg", alt: t = "", ...i }) {
  return n.jsx("img", { src: e || a, alt: t, ...i });
}
function _g(e, a = "vi-VN") {
  const t = e instanceof Date ? e : new Date(e);
  return Number.isNaN(t.getTime()) ? "" : new Intl.DateTimeFormat(a, { dateStyle: "medium" }).format(t);
}
function Fg(e) {
  const a = new Date(e).getTime();
  if (!Number.isFinite(a)) return "";
  const t = Math.max(0, Math.floor((Date.now() - a) / 1e3));
  if (t < 60) return "V\u1EEBa xong";
  const i = Math.floor(t / 60);
  if (i < 60) return `${i} ph\xFAt tr\u01B0\u1EDBc`;
  const r = Math.floor(i / 60);
  if (r < 24) return `${r} gi\u1EDD tr\u01B0\u1EDBc`;
  const s = Math.floor(r / 24);
  return s < 7 ? `${s} ng\xE0y tr\u01B0\u1EDBc` : _g(e);
}
const Nt = { list(e, a, t = 0, i = 50) {
  return fe(`/notifications?userId=${encodeURIComponent(e)}&filter=${a}&page=${t}&size=${i}`);
}, markRead(e) {
  return ie(`/notifications/${encodeURIComponent(e)}/read`, "POST");
}, markAllRead(e) {
  return ie(`/notifications/read-all?userId=${encodeURIComponent(e)}`, "POST");
}, follow(e, a) {
  return ie("/user-followers/follow", "POST", { followerId: e, followingId: a });
} };
function ji(e) {
  return (e || "SYSTEM").toUpperCase();
}
function as(e) {
  const a = ji(e);
  return a.includes("FOLLOW") || a.includes("FRIEND") ? "CONNECTIONS" : ["SYSTEM", "REGISTRATION", "LOGIN", "LOGOUT", "FORGOT_PASSWORD", "RESET_PASSWORD", "WELCOME_USER", "SECURITY"].includes(a) ? "SYSTEM" : "INTERACTIONS";
}
function Hg(e, a, t = true) {
  const i = ji(e);
  return t ? i === "CHAT_MEMBER_REQUEST" ? "Nh\xF3m c\u1EE7a b\u1EA1n c\xF3 y\xEAu c\u1EA7u tham gia m\u1EDBi." : i === "CHAT_GROUP_MEMBER_ADDED" || i === "CHAT_MEMBER_ADDED" ? "\u0111\xE3 tham gia nh\xF3m." : i === "SEND_MESSAGE" || i === "NEW_MESSAGE" || i === "MESSAGE" ? "\u0111\xE3 g\u1EEDi cho b\u1EA1n m\u1ED9t tin nh\u1EAFn m\u1EDBi." : i.includes("LIKE_COMMENT") ? "\u0111\xE3 th\xEDch b\xECnh lu\u1EADn c\u1EE7a b\u1EA1n." : i.includes("LIKE") ? "\u0111\xE3 th\xEDch b\xE0i vi\u1EBFt c\u1EE7a b\u1EA1n." : i.includes("REPLY") || i.includes("COMMENT") ? "\u0111\xE3 b\xECnh lu\u1EADn v\u1EC1 b\xE0i vi\u1EBFt c\u1EE7a b\u1EA1n." : i.includes("FOLLOW") ? "\u0111\xE3 theo d\xF5i b\u1EA1n." : i === "STORY_DIRECT" || i === "FRIEND_STORY" ? "\u0111\xE3 \u0111\u0103ng Story m\u1EDBi." : i === "STORY_ACTIVITY" || i === "UP_STORY" ? "\u0111\xE3 \u0111\u0103ng m\u1ED9t Story m\u1EDBi." : i.includes("MENTION") ? "\u0111\xE3 nh\u1EAFc \u0111\u1EBFn b\u1EA1n." : i.includes("TAG") ? "\u0111\xE3 g\u1EAFn th\u1EBB b\u1EA1n." : i.includes("POST_SHARED") ? "\u0111\xE3 chia s\u1EBB m\u1ED9t b\xE0i vi\u1EBFt v\u1EDBi b\u1EA1n." : as(i) === "SYSTEM" ? "\u0111\xE3 g\u1EEDi m\u1ED9t th\xF4ng b\xE1o t\xE0i kho\u1EA3n ho\u1EB7c b\u1EA3o m\u1EADt." : `\u0111\xE3 g\u1EEDi m\u1ED9t th\xF4ng b\xE1o ${String(a || "m\u1EDBi").toLowerCase()}.` : "N\u1ED9i dung ngu\u1ED3n kh\xF4ng c\xF2n t\u1ED3n t\u1EA1i.";
}
function $g(e, a, t = true) {
  if (!t) return;
  const i = ji(e);
  if (i.includes("FOLLOW") && !i.includes("FOLLOW_BACK")) return "Theo d\xF5i l\u1EA1i";
  if (i === "CHAT_MEMBER_REQUEST") return "Xem y\xEAu c\u1EA7u";
  if (i.includes("COMMENT") || i.includes("REPLY")) return "Xem b\xECnh lu\u1EADn";
  if (i.includes("LIKE") || i.includes("STORY") || i.includes("MESSAGE") || String(a || "").toUpperCase() === "POST") return "M\u1EDF";
}
function Vg(e) {
  const a = e.actionType || "SYSTEM", t = e.entityAvailable !== false;
  return { id: e.id, status: e.status === "READ" ? "READ" : "UNREAD", actor: e.actorDisplayName || e.actorUsername || e.actorId || "H\u1EC7 th\u1ED1ng", actorId: e.actorId, actorAvatarUrl: e.actorAvatarUrl || void 0, actionType: a, entityId: e.entityId, entityType: e.entityType || "SYSTEM", contentThumbnailUrl: e.contentThumbnailUrl, entityAvailable: t, createdAt: e.createdAt || (/* @__PURE__ */ new Date()).toISOString(), message: Hg(a, e.entityType, t), actionLabel: $g(a, e.entityType, t), category: as(a), content: e.content || void 0, metadata: { ...e.metadata ?? {}, ...e.deepLink ? { deepLink: e.deepLink } : {} }, deepLink: e.deepLink || void 0 };
}
function Zg({ userId: e, onNavigate: a }) {
  const [t, i] = o.useState("ALL"), [r, s] = o.useState([]), [f, c] = o.useState("loading"), [d, u] = o.useState(""), h = [{ id: "ALL", label: "T\u1EA5t c\u1EA3" }, { id: "INTERACTIONS", label: "T\u01B0\u01A1ng t\xE1c" }, { id: "CONNECTIONS", label: "K\u1EBFt n\u1ED1i" }, { id: "SYSTEM", label: "H\u1EC7 th\u1ED1ng" }], m = o.useCallback(async () => {
    c("loading"), u("");
    try {
      const j = await Nt.list(e, t);
      s((j.content ?? []).map(Vg)), c("ready");
    } catch (j) {
      s([]), c("error"), u(j instanceof Error ? j.message : "Kh\xF4ng th\u1EC3 t\u1EA3i th\xF4ng b\xE1o");
    }
  }, [t, e]);
  o.useEffect(() => {
    m();
  }, [m]), o.useEffect(() => {
    const j = () => void m();
    return window.addEventListener("notification-refresh", j), () => window.removeEventListener("notification-refresh", j);
  }, [m]);
  async function p() {
    const j = r;
    s((E) => E.map((b) => ({ ...b, status: "READ" })));
    try {
      await Nt.markAllRead(e);
    } catch {
      s(j);
    }
  }
  async function g(j) {
    j.status !== "READ" && (s((E) => E.map((b) => b.id === j.id ? { ...b, status: "READ" } : b)), await Nt.markRead(j.id).catch(() => {
    }));
  }
  function C(j) {
    return Og({ id: j.id, actionType: j.actionType, actorId: j.actorId, entityId: j.entityId, entityType: j.entityType, metadata: { ...j.metadata ?? {}, ...j.deepLink ? { deepLink: j.deepLink } : {} } });
  }
  async function y(j) {
    await g(j);
    const E = C(j);
    E && await a(E);
  }
  async function I(j) {
    if (j.actionLabel === "Theo d\xF5i l\u1EA1i" && j.actorId) {
      await Nt.follow(e, j.actorId), await g(j);
      return;
    }
    await y(j);
  }
  const T = Wg(r);
  return n.jsxs("section", { className: "screen notifications-screen", children: [n.jsxs("div", { className: "notifications-header", children: [n.jsxs("div", { children: [n.jsx("p", { className: "eyebrow", children: "Ho\u1EA1t \u0111\u1ED9ng" }), n.jsx("h2", { children: "Th\xF4ng b\xE1o" })] }), n.jsxs("button", { onClick: () => void p(), disabled: !r.some((j) => j.status === "UNREAD"), children: [n.jsx(gn, { size: 18 }), " \u0110\xE1nh d\u1EA5u \u0111\xE3 \u0111\u1ECDc"] })] }), n.jsx("div", { className: "notification-filters", role: "tablist", "aria-label": "B\u1ED9 l\u1ECDc th\xF4ng b\xE1o", children: h.map((j) => n.jsx("button", { className: t === j.id ? "active" : "", onClick: () => i(j.id), role: "tab", "aria-selected": t === j.id, children: j.label }, j.id)) }), f === "loading" && n.jsx(qg, {}), f === "error" && n.jsxs("div", { className: "notification-state", children: [n.jsx(In, { size: 24 }), n.jsx("strong", { children: "Kh\xF4ng th\u1EC3 t\u1EA3i" }), n.jsx("span", { children: d }), n.jsx("button", { onClick: () => void m(), children: "Th\u1EED l\u1EA1i" })] }), f === "ready" && r.length === 0 && n.jsxs("div", { className: "notification-state", children: [n.jsx(ct, { size: 24 }), n.jsx("strong", { children: "Ch\u01B0a c\xF3 th\xF4ng b\xE1o" }), n.jsx("span", { children: "Ho\u1EA1t \u0111\u1ED9ng m\u1EDBi s\u1EBD xu\u1EA5t hi\u1EC7n t\u1EA1i \u0111\xE2y." }), n.jsx("button", { onClick: () => void m(), children: "L\xE0m m\u1EDBi" })] }), f === "ready" && r.length > 0 && n.jsx("div", { className: "notification-list", children: T.map((j) => j.items.length > 0 && n.jsxs("section", { className: "notification-group", children: [n.jsx("h3", { children: j.title }), j.items.map((E) => n.jsxs("article", { className: `notification-row ${E.status === "UNREAD" ? "unread" : "read"} ${E.entityAvailable ? "" : "removed"}`, children: [n.jsx("div", { className: "notification-avatar", children: E.actorAvatarUrl ? n.jsx(Zt, { src: E.actorAvatarUrl, alt: "" }) : n.jsx(fo, { item: E }) }), n.jsxs("button", { className: "notification-copy", onClick: () => void y(E), children: [n.jsx("span", { children: E.content || n.jsxs(n.Fragment, { children: [n.jsx("strong", { children: E.actor }), " ", E.message] }) }), n.jsx("time", { children: Fg(E.createdAt) }), !E.entityAvailable && n.jsx("em", { children: "N\u1ED9i dung ngu\u1ED3n kh\xF4ng c\xF2n t\u1ED3n t\u1EA1i" })] }), E.contentThumbnailUrl && E.entityAvailable ? n.jsx("button", { className: "notification-thumbnail-button", onClick: () => void y(E), "aria-label": "M\u1EDF n\u1ED9i dung", children: n.jsx("img", { className: "notification-thumbnail", src: E.contentThumbnailUrl, alt: "" }) }) : n.jsx("span", { className: "notification-thumbnail empty", children: n.jsx(fo, { item: E }) }), E.actionLabel && n.jsx("button", { className: "notification-action", onClick: () => void I(E), children: E.actionLabel }), n.jsx("button", { className: "icon-button notification-more", "aria-label": "T\xF9y ch\u1ECDn th\xF4ng b\xE1o", children: n.jsx(ea, { size: 18 }) })] }, E.id))] }, j.title)) })] });
}
function fo({ item: e }) {
  const a = ji(e.actionType);
  return as(a) === "SYSTEM" ? n.jsx(Ao, { size: 18 }) : a.includes("FOLLOW") || a.includes("FRIEND") ? n.jsx(Bn, { size: 18 }) : a.includes("COMMENT") || a.includes("REPLY") || a.includes("MESSAGE") ? n.jsx(fn, { size: 18 }) : a.includes("MENTION") ? n.jsx(Xl, { size: 18 }) : a.includes("TAG") ? n.jsx(Kt, { size: 18 }) : a.includes("STORY") ? n.jsx(ja, { size: 18 }) : a.includes("SHARED") ? n.jsx(Wl, { size: 18 }) : n.jsx(Ja, { size: 18 });
}
function Wg(e) {
  const a = /* @__PURE__ */ new Date(), t = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime(), i = t - 8640 * 60 * 1e3;
  return [{ title: "H\xF4m nay", items: e.filter((r) => new Date(r.createdAt).getTime() >= t) }, { title: "Tu\u1EA7n n\xE0y", items: e.filter((r) => {
    const s = new Date(r.createdAt).getTime();
    return s < t && s >= i;
  }) }, { title: "Tr\u01B0\u1EDBc \u0111\xF3", items: e.filter((r) => new Date(r.createdAt).getTime() < i) }];
}
function qg() {
  return n.jsx("div", { className: "notification-list loading", "aria-label": "\u0110ang t\u1EA3i th\xF4ng b\xE1o", children: Array.from({ length: 8 }, (e, a) => n.jsxs("div", { className: "notification-row skeleton", children: [n.jsx("span", {}), n.jsxs("div", { children: [n.jsx("i", {}), n.jsx("i", {})] }), n.jsx("b", {})] }, a)) });
}
const Kc = { getDetail(e, a) {
  const t = a ? `?viewerId=${encodeURIComponent(a)}` : "";
  return fe(`/posts/${encodeURIComponent(e)}${t}`);
}, update(e) {
  return ie("/posts", "PUT", e);
} };
function Xc(e) {
  return !(e != null && e.id) || !e.playbackUrl ? null : { id: e.id, displayName: e.displayName || e.id, artist: e.artist, artworkUrl: e.artworkUrl, playbackUrl: e.playbackUrl, segmentStart: e.segmentStart, segmentEnd: e.segmentEnd, duration: e.duration };
}
function Kg(e, a) {
  return (a ?? []).filter((t) => {
    var i, r;
    return ((i = t.media) == null ? void 0 : i.secureUrl) || ((r = t.media) == null ? void 0 : r.url);
  }).sort((t, i) => (t.orderNumber ?? 0) - (i.orderNumber ?? 0)).map((t, i) => {
    const r = t.media, s = Number(r.width ?? 0), f = Number(r.height ?? 0);
    return { id: t.id || r.assetId || `${e}-${i}`, orderNumber: t.orderNumber ?? void 0, type: (r.resourceType ?? r.mediaFormat ?? "IMAGE").toUpperCase().match(/VIDEO|MP4|WEBM|MOV/) ? "VIDEO" : "IMAGE", url: r.secureUrl || r.url || "", aspectRatio: s > 0 && f > 0 ? f / s : 1.25, alt: r.displayName || t.caption || "Post media", caption: t.caption || null, music: Xc(t.music) };
  });
}
function Xg(e, a) {
  return (a ?? []).map((t, i) => ({ id: t.assetId ?? `${e}-${i}`, type: (t.resourceType ?? "IMAGE").toUpperCase().includes("VIDEO") ? "VIDEO" : "IMAGE", url: t.secureUrl || t.url || "", aspectRatio: 1.25, alt: t.displayName || "Post media", caption: null, music: null })).filter((t) => t.url);
}
function ep(e) {
  if (Array.isArray(e)) return e.map((a) => String(a).replace(/^#/, "")).filter(Boolean);
  if (!e) return [];
  try {
    const a = JSON.parse(e);
    return Array.isArray(a) ? a.map((t) => String(t).replace(/^#/, "")).filter(Boolean) : [];
  } catch {
    return String(e).split(/[ ,]+/).map((a) => a.replace(/^#/, "")).filter(Boolean);
  }
}
function np(e) {
  const a = Kg(e.postId, e.items), t = a.length ? a : Xg(e.postId, e.media);
  return { id: e.postId, author: { id: e.userId, username: e.authorUsername || e.userId, displayName: e.authorFullName || e.authorUsername || e.userId, avatarUrl: e.authorAvatarUrl || "" }, createdAt: e.createdAt ?? (/* @__PURE__ */ new Date()).toISOString(), layoutVariant: t.length ? "STANDARD" : "TEXT", mediaRatio: ei(e.mediaRatio), caption: e.content || "", hashtags: ep(e.hashtags ?? e.hashtag), music: Xc(e.music), media: t, engagement: { likes: e.likeCount ?? 0, comments: e.commentCount ?? 0, reposts: e.repostCount ?? 0, shares: 0, saves: 0 }, viewerState: { liked: !!e.likedByCurrentUser, saved: false, reposted: !!e.repostedByCurrentUser }, comments: [] };
}
const el = (e) => np(e);
function ap(e, a) {
  const t = el(a);
  return { ...e, createdAt: t.createdAt, caption: t.caption, hashtags: t.hashtags, mediaRatio: t.mediaRatio, music: t.music, media: t.media.length ? t.media : e.media };
}
function tp({ post: e, userId: a, onClose: t, onSaved: i }) {
  const [r, s] = o.useState(e.caption), [f, c] = o.useState((e.hashtags ?? []).join(" ")), [d, u] = o.useState(e.mediaRatio), [h, m] = o.useState(e.media.map((b, N) => ({ ...b, originalIndex: N }))), [p, g] = o.useState(false), [C, y] = o.useState(""), I = o.useMemo(() => JSON.stringify({ caption: r, hashtags: f, mediaRatio: d, media: h }) !== JSON.stringify({ caption: e.caption, hashtags: (e.hashtags ?? []).join(" "), mediaRatio: e.mediaRatio, media: e.media.map((b, N) => ({ ...b, originalIndex: N })) }), [r, f, h, d, e]);
  function T(b, N) {
    const k = b + N;
    k < 0 || k >= h.length || m((B) => {
      const z = [...B];
      return [z[b], z[k]] = [z[k], z[b]], z;
    });
  }
  function j(b) {
    if (!(b != null && b.length)) return;
    const N = Array.from(b).filter((k) => k.type.startsWith("image/") || k.type.startsWith("video/")).map((k, B) => ({ id: `new-${crypto.randomUUID()}`, orderNumber: h.length + B + 1, type: k.type.startsWith("video/") ? "VIDEO" : "IMAGE", url: URL.createObjectURL(k), aspectRatio: 1, alt: k.name, caption: null, music: null, originalIndex: h.length + B, file: k }));
    m((k) => [...k, ...N]);
  }
  async function E() {
    var b, N, k;
    if (!(!I || p)) {
      g(true), y("");
      try {
        const B = await Promise.all(h.map(async (x) => {
          if (!x.file) return x;
          const w = await ga(x.file);
          return { ...x, publicId: w.publicId, resourceType: w.resourceType, url: w.secureUrl };
        })), z = await Kc.update({ postId: e.id, userId: a, content: r, hashtag: f.split(/[ ,]+/).map((x) => x.replace(/^#/, "")).filter(Boolean), mediaRatio: d, musicId: ((b = e.music) == null ? void 0 : b.id) ?? void 0, musicStart: ((N = e.music) == null ? void 0 : N.segmentStart) ?? void 0, musicEnd: ((k = e.music) == null ? void 0 : k.segmentEnd) ?? void 0, items: B.map((x, w) => {
          var Y, V, P;
          return { itemId: x.file ? null : x.id, orderNumber: w + 1, secureUrl: x.file ? x.url : null, publicId: x.file ? x.publicId : null, resourceType: x.file ? x.resourceType : null, caption: x.caption ?? null, musicId: ((Y = x.music) == null ? void 0 : Y.id) ?? null, musicStart: ((V = x.music) == null ? void 0 : V.segmentStart) ?? null, musicEnd: ((P = x.music) == null ? void 0 : P.segmentEnd) ?? null };
        }) });
        i(ap(e, z)), t();
      } catch (B) {
        y(B instanceof Error ? B.message : "Kh\xF4ng th\u1EC3 c\u1EADp nh\u1EADt b\xE0i vi\u1EBFt");
      } finally {
        g(false);
      }
    }
  }
  return n.jsx("div", { className: "post-edit-backdrop", role: "presentation", onMouseDown: (b) => {
    b.target === b.currentTarget && t();
  }, children: n.jsxs("section", { className: "post-edit-dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": "post-edit-title", children: [n.jsxs("header", { children: [n.jsx("h2", { id: "post-edit-title", children: "Ch\u1EC9nh s\u1EEDa b\xE0i vi\u1EBFt" }), n.jsx("button", { type: "button", onClick: t, "aria-label": "\u0110\xF3ng", children: n.jsx(pe, { size: 20 }) })] }), n.jsxs("div", { className: "post-edit-body", children: [n.jsxs("label", { children: ["N\u1ED9i dung", n.jsx("textarea", { value: r, onChange: (b) => s(b.target.value), rows: 5 })] }), n.jsxs("label", { children: ["Hashtag", n.jsx("input", { value: f, onChange: (b) => c(b.target.value), placeholder: "#travel #memory" })] }), h.length ? n.jsxs("label", { children: ["T\u1EF7 l\u1EC7 khung", n.jsx("select", { value: d, onChange: (b) => u(b.target.value), children: hr.map((b) => n.jsx("option", { value: b, children: b }, b)) })] }) : null, n.jsxs("label", { className: "post-edit-add-media", children: [n.jsxs("span", { children: [n.jsx(An, { size: 17 }), " Th\xEAm \u1EA3nh ho\u1EB7c video"] }), n.jsx("input", { type: "file", accept: "image/*,video/*", multiple: true, onChange: (b) => {
    j(b.target.files), b.target.value = "";
  } })] }), h.length ? n.jsx("div", { className: "post-edit-media-list", "aria-label": "Media b\xE0i vi\u1EBFt", children: h.map((b, N) => n.jsxs("article", { children: [b.type === "VIDEO" ? n.jsx("video", { src: b.url, muted: true }) : n.jsx("img", { src: b.url, alt: b.alt }), n.jsxs("label", { children: ["Caption media", n.jsx("textarea", { value: b.caption ?? "", onChange: (k) => m((B) => B.map((z) => z.id === b.id ? { ...z, caption: k.target.value } : z)), rows: 2 })] }), n.jsxs("div", { children: [n.jsx("button", { type: "button", onClick: () => T(N, -1), disabled: N === 0, "aria-label": "\u0110\u01B0a media l\xEAn", children: n.jsx(Bl, { size: 17 }) }), n.jsx("button", { type: "button", onClick: () => T(N, 1), disabled: N === h.length - 1, "aria-label": "\u0110\u01B0a media xu\u1ED1ng", children: n.jsx(Ul, { size: 17 }) }), n.jsx("button", { type: "button", className: "danger", onClick: () => m((k) => k.filter((B) => B.id !== b.id)), "aria-label": "X\xF3a media", children: n.jsx(da, { size: 17 }) })] })] }, b.id)) }) : null, C ? n.jsx("p", { className: "post-edit-error", role: "alert", children: C }) : null] }), n.jsxs("footer", { children: [n.jsx("button", { type: "button", onClick: t, children: "H\u1EE7y" }), n.jsxs("button", { type: "button", className: "primary", onClick: () => void E(), disabled: !I || p, children: [n.jsx(Zl, { size: 17 }), p ? "\u0110ang l\u01B0u" : "L\u01B0u thay \u0111\u1ED5i"] })] })] }) });
}
const ip = 50 * 1024 * 1024, rp = 500 * 1024 * 1024;
function sp({ userId: e, onBack: a, onClose: t, onDraftSaved: i, onPublished: r, initialDraft: s }) {
  const f = o.useRef(null), c = o.useRef(null), [d, u] = o.useState(1), [h, m] = o.useState([]), [p, g] = o.useState(null), [C, y] = o.useState(null), [I, T] = o.useState(null), [j, E] = o.useState(false), [b, N] = o.useState(null), [k, B] = o.useState(null), [z, x] = o.useState(0), [w, Y] = o.useState(30), [V, P] = o.useState(""), [D, q] = o.useState([]), [ne, be] = o.useState(false), [he, re] = o.useState(false), [me, we] = o.useState(0), [F, ze] = o.useState(true), Se = o.useRef(0), [ye, ue] = o.useState(null), [ke, Ne] = o.useState({}), [se, $e] = o.useState(""), [xe, Qe] = o.useState(""), [De, Ze] = o.useState(_i), [Ge, Ee] = o.useState("idle"), [Q, oe] = o.useState(false), [ee, ge] = o.useState(""), [O, K] = o.useState(""), X = o.useRef(null);
  o.useEffect(() => {
    var l;
    if (!(!(s != null && s.payload) || s.draftType !== "POST" || X.current === s.id)) {
      X.current = s.id;
      try {
        const S = JSON.parse(s.payload);
        $e(S.caption ?? ""), Qe(S.hashtags ?? ""), Ze(S.mediaRatio ?? _i), N(S.sharedMusic ?? null), x(S.musicStart ?? 0), Y(S.musicEnd ?? 30);
        const M = (S.media ?? []).filter((U) => !!U.secureUrl).map((U, W) => ({ id: U.id ?? `restored-${W}-${crypto.randomUUID()}`, fileName: U.fileName ?? `media-${W + 1}`, type: U.type === "VIDEO" ? "VIDEO" : "IMAGE", url: U.secureUrl ?? "", file: null, secureUrl: U.secureUrl, publicId: U.publicId, resourceType: U.resourceType, status: "ready", itemCaption: U.itemCaption ?? "", music: U.music ?? null, musicStart: U.musicStart ?? 0, musicEnd: U.musicEnd ?? 30 }));
        m(M), g(((l = M[0]) == null ? void 0 : l.id) ?? null), u(M.length ? 2 : 1);
      } catch {
        K("Kh\xF4ng th\u1EC3 kh\xF4i ph\u1EE5c d\u1EEF li\u1EC7u b\u1EA3n nh\xE1p.");
      }
    }
  }, [s]), o.useEffect(() => {
    const l = ++Se.current, S = new AbortController();
    let M = true;
    return q([]), we(0), ze(true), be(true), fe(`/musics?page=0&size=10&keyword=${encodeURIComponent(V)}`, { signal: S.signal }).then((U) => {
      !M || l !== Se.current || (q(U.content ?? []), we(U.pageNumber ?? 0), ze((U.pageNumber ?? 0) + 1 < (U.totalPages ?? 0)));
    }).catch(() => {
      M && l === Se.current && q([]);
    }).finally(() => {
      M && be(false);
    }), () => {
      M = false, S.abort();
    };
  }, [V]);
  async function H() {
    if (ne || he || !F) return;
    const l = Se.current, S = me + 1;
    re(true);
    try {
      const M = await fe(`/musics?page=${S}&size=10&keyword=${encodeURIComponent(V)}`);
      if (l !== Se.current) return;
      q((U) => {
        const W = new Set(U.map((Z) => Z.id));
        return [...U, ...(M.content ?? []).filter((Z) => !W.has(Z.id))];
      }), we(M.pageNumber ?? S), ze((M.pageNumber ?? S) + 1 < (M.totalPages ?? 0));
    } finally {
      l === Se.current && re(false);
    }
  }
  o.useEffect(() => () => {
    var l;
    (l = c.current) == null || l.pause(), c.current = null;
  }, []);
  const _ = h.find((l) => l.id === p) ?? h[0] ?? null, le = h.filter((l) => l.type === "IMAGE" && l.music).length, Me = h.some((l) => l.type === "IMAGE"), Te = b ? z >= 0 && w > z : h.every((l) => !l.music || l.musicStart >= 0 && l.musicEnd > l.musicStart), de = h.length > 0 && h.every((l) => l.status === "ready") && Te, Le = h.length > 0 || !!(se || xe || b || le);
  function Ye(l) {
    return Math.max(1, Math.min(30, Math.floor((l.duration ?? 0) > 0 ? l.duration ?? 30 : 30)));
  }
  function Ve(l) {
    return { id: l.id, title: l.displayName, artist: l.singleName || l.category || "Unknown artist", url: l.songUrl, artwork: l.displayImages || "", duration: l.duration || 0 };
  }
  function an() {
    if (Le && Ge !== "success") {
      oe(true);
      return;
    }
    t();
  }
  function Xe(l) {
    const S = Array.from(l);
    if (S.find((Z) => !Z.type.startsWith("image/") && !Z.type.startsWith("video/"))) {
      K("Only image or video files are supported."), Ee("failure");
      return;
    }
    const U = S.find((Z) => Z.type.startsWith("image/") ? Z.size > ip : Z.size > rp);
    if (U) {
      K(U.type.startsWith("image/") ? "Images must be 50MB or smaller." : "Videos must be 500MB or smaller."), Ee("failure");
      return;
    }
    if (!S.length) {
      K("Choose at least one image or video."), Ee("failure");
      return;
    }
    K(""), Ee("uploading");
    const W = S.map((Z, ve) => ({ id: `${Date.now()}-${ve}-${Z.name}`, fileName: Z.name, type: Z.type.startsWith("video/") ? "VIDEO" : "IMAGE", url: URL.createObjectURL(Z), file: Z, status: Z.type.startsWith("video/") ? "processing" : "ready", itemCaption: "", music: null, musicStart: 0, musicEnd: 30 }));
    m((Z) => [...Z, ...W]), g((Z) => {
      var ve;
      return Z ?? ((ve = W[0]) == null ? void 0 : ve.id) ?? null;
    }), window.setTimeout(() => {
      m((Z) => Z.map((ve) => ve.status === "processing" ? { ...ve, status: "ready" } : ve)), Ee("idle");
    }, 700);
  }
  function Ke(l) {
    l.target.files && Xe(l.target.files), l.target.value = "";
  }
  function We(l) {
    l.preventDefault(), Xe(l.dataTransfer.files);
  }
  function Je(l, S) {
    m((M) => {
      const U = M.findIndex((rn) => rn.id === l), W = Math.min(M.length - 1, Math.max(0, U + S));
      if (U < 0 || U === W) return M;
      const Z = [...M], [ve] = Z.splice(U, 1);
      return Z.splice(W, 0, ve), Z;
    });
  }
  function A(l) {
    var U;
    const S = h.findIndex((W) => W.id === l), M = h.filter((W) => W.id !== l);
    m(M), p === l && g(((U = M[Math.min(S, M.length - 1)]) == null ? void 0 : U.id) ?? null), C === l && (y(null), T(null));
  }
  function $(l, S) {
    m((M) => M.map((U) => U.id === l ? { ...U, ...S } : U));
  }
  function v(l, S, M) {
    if (!S || !M) return;
    const U = M >= S ? "portrait" : "landscape";
    Ne((W) => W[l] === U ? W : { ...W, [l]: U });
  }
  function L(l, S) {
    v(l, S.naturalWidth, S.naturalHeight);
  }
  function R(l, S) {
    v(l, S.videoWidth, S.videoHeight);
  }
  function G(l, S) {
    const M = Ve(S), U = Ye(M);
    $(l, { music: M, musicStart: 0, musicEnd: U }), y(l), T(null), Ue(M, 0, U, true);
  }
  function J(l) {
    $(l, { music: null, musicStart: 0, musicEnd: 30 }), T(l), tn();
  }
  function ae(l) {
    const S = Ve(l);
    N(S), x(0), Y(Ye(S)), m((M) => M.map((U) => ({ ...U, music: null, musicStart: 0, musicEnd: 30 }))), y(null), T(null), E(false), B(null);
  }
  function ce(l) {
    if (le > 0) {
      B(l);
      return;
    }
    ae(l);
  }
  function Re() {
    N(null), E(false), tn(), ge("Shared music removed. Item music is available again."), window.setTimeout(() => ge(""), 2400);
  }
  function Oe() {
    const l = (_ == null ? void 0 : _.type) === "IMAGE" ? _ : h.find((S) => S.type === "IMAGE");
    l && (u(2), g(l.id), y(l.id), T(l.music ? null : l.id));
  }
  function Ue(l, S = 0, M, U = false) {
    if (!l.url) return;
    const W = c.current;
    if (!U && ye === l.id && W && !W.paused) {
      W.pause(), ue(null);
      return;
    }
    W == null || W.pause();
    const Z = new Audio(l.url);
    c.current = Z, Z.currentTime = Math.max(0, S), Z.ontimeupdate = () => {
      M != null && Z.currentTime >= M && (Z.pause(), ue(null));
    }, Z.onended = () => ue(null), ue(l.id), Z.play().catch(() => ue(null));
  }
  function tn() {
    var l;
    (l = c.current) == null || l.pause(), c.current = null, ue(null);
  }
  async function Yn() {
    var M;
    Ee("uploading");
    const l = await Promise.all(h.map(async (U) => U.secureUrl ? { secureUrl: U.secureUrl, publicId: U.publicId ?? "", resourceType: U.resourceType ?? U.type.toLowerCase() } : ga(U.file))), S = { id: (s == null ? void 0 : s.id) ?? `draft_${Date.now()}`, draftType: "POST", mediaCount: h.length, captionPreview: se || "Empty draft", updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
    i(S), Ee("draft"), await ie(`/me/${e}/drafts`, "POST", { id: (s == null ? void 0 : s.id) ?? null, draftType: "POST", thumbnailUrl: ((M = l[0]) == null ? void 0 : M.secureUrl) ?? null, captionPreview: S.captionPreview, mediaCount: h.length, payload: JSON.stringify({ caption: se, hashtags: xe, mediaRatio: De, sharedMusic: b, musicId: (b == null ? void 0 : b.id) ?? null, musicStart: b ? z : null, musicEnd: b ? w : null, media: h.map((U, W) => {
      var Z, ve, rn, Ae;
      return { id: U.id, fileName: U.fileName, type: U.type, secureUrl: (Z = l[W]) == null ? void 0 : Z.secureUrl, publicId: (ve = l[W]) == null ? void 0 : ve.publicId, resourceType: (rn = l[W]) == null ? void 0 : rn.resourceType, itemCaption: U.itemCaption, music: U.music, musicId: b || U.type === "VIDEO" ? null : ((Ae = U.music) == null ? void 0 : Ae.id) ?? null, musicStart: b || U.type === "VIDEO" || !U.music ? null : U.musicStart, musicEnd: b || U.type === "VIDEO" || !U.music ? null : U.musicEnd };
    }) }) }).catch(() => Ee("failure"));
  }
  async function ia() {
    if (de) {
      Ee("publishing");
      try {
        const l = await Promise.all(h.map((M) => M.secureUrl ? { secureUrl: M.secureUrl, publicId: M.publicId ?? "", resourceType: M.resourceType ?? M.type.toLowerCase() } : ga(M.file))), S = await ie("/posts", "POST", { userId: e, content: se, hashtags: xe.split(/[ ,]+/).filter(Boolean).map((M) => M.replace(/^#/, "")), mediaRatio: De, musicId: (b == null ? void 0 : b.id) ?? null, musicStart: b ? z : null, musicEnd: b ? w : null, items: h.map((M, U) => {
          var W;
          return { orderNumber: U + 1, secureUrl: l[U].secureUrl, publicId: l[U].publicId, resourceType: l[U].resourceType, caption: M.itemCaption || null, musicId: b || M.type === "VIDEO" ? null : ((W = M.music) == null ? void 0 : W.id) ?? null, musicStart: b || M.type === "VIDEO" || !M.music ? null : M.musicStart, musicEnd: b || M.type === "VIDEO" || !M.music ? null : M.musicEnd };
        }) });
        Ee("success"), tn(), window.dispatchEvent(new CustomEvent("app-toast", { detail: S.message || "B\xE0i vi\u1EBFt m\u1EA5t m\u1ED9t ch\xFAt th\u1EDDi gian \u0111\u1EC3 t\u1EA3i l\xEAn, vui l\xF2ng \u0111\u1EE3i" })), r(), t();
      } catch (l) {
        Ee("failure"), K(l instanceof Error ? l.message : "Publish failed");
      }
    }
  }
  const mn = b ?? (_ == null ? void 0 : _.music) ?? null, ra = b ? z : (_ == null ? void 0 : _.musicStart) ?? 0, Wa = b ? w : (_ == null ? void 0 : _.musicEnd) ?? 0;
  return n.jsx("section", { className: "screen post-create-screen", children: n.jsxs("div", { className: "post-create-modal post-music-studio", role: "dialog", "aria-modal": "false", children: [n.jsxs("header", { className: "post-create-header", children: [n.jsx("button", { className: "icon-button", onClick: an, "aria-label": "Close create", children: n.jsx(pe, { size: 20 }) }), n.jsx("nav", { className: "step-meter", "aria-label": "Post creation progress", children: [1, 2, 3, 4].map((l) => n.jsx("button", { type: "button", className: d === l ? "active" : l < d ? "complete" : "", onClick: () => u(l), "aria-label": `Go to step ${l}`, "aria-current": d === l ? "step" : void 0 }, l)) })] }), n.jsxs("main", { className: `post-create-body ${d === 1 ? h.length ? "step-one-populated" : "step-one-empty" : ""}`, children: [!(d === 1 && h.length === 0) && n.jsxs("section", { className: "create-preview", children: [n.jsx("div", { className: "preview-frame", children: n.jsx("div", { className: "preview-ratio-frame", style: { aspectRatio: Yo(De) }, children: _ ? _.type === "VIDEO" ? n.jsx("video", { className: `preview-media ${ke[_.id] ?? "landscape"}`, src: _.url, muted: true, playsInline: true, controls: true, onLoadedMetadata: (l) => R(_.id, l.currentTarget) }) : n.jsx("img", { className: `preview-media ${ke[_.id] ?? "landscape"}`, src: _.url, alt: _.fileName, onLoad: (l) => L(_.id, l.currentTarget) }) : n.jsxs("div", { children: [n.jsx(An, { size: 32 }), n.jsx("span", { children: "Preview" })] }) }) }), mn && n.jsxs("div", { className: "preview-music-attribution", children: [n.jsx(vn, { size: 17 }), n.jsxs("span", { children: [n.jsx("strong", { children: mn.title }), n.jsxs("small", { children: [mn.artist, " \xB7 ", Tn(ra), "-", Tn(Wa)] })] })] }), n.jsx(uo, { status: Ge })] }), n.jsxs("section", { className: "create-step-panel", children: [d === 1 && n.jsxs("div", { className: `create-step media-selection-step ${h.length ? "has-media" : "empty"}`, children: [n.jsx("input", { className: "media-file-input", ref: f, type: "file", accept: "image/*,video/*", multiple: true, onChange: Ke }), O && n.jsxs("div", { className: "create-status validation", children: [n.jsx("strong", { children: "Media validation" }), n.jsx("span", { children: O })] }), h.length ? n.jsxs(n.Fragment, { children: [n.jsx("nav", { className: "step-one-media-list", "aria-label": "Selected post media", children: h.map((l, S) => n.jsxs("article", { className: (_ == null ? void 0 : _.id) === l.id ? "active" : "", children: [n.jsxs("button", { type: "button", className: "step-one-media-select", onClick: () => g(l.id), children: [n.jsx("span", { className: "media-order", children: String(S + 1).padStart(2, "0") }), n.jsx("span", { className: "step-one-media-thumb", children: l.type === "VIDEO" ? n.jsx("video", { src: l.url, muted: true }) : n.jsx("img", { src: l.url, alt: "" }) }), n.jsxs("span", { className: "step-one-media-copy", children: [n.jsx("strong", { children: l.fileName }), n.jsxs("small", { children: [l.type === "VIDEO" ? "Video" : "Image", " \xB7 ", l.status] })] }), (_ == null ? void 0 : _.id) === l.id && n.jsx(gn, { size: 17 })] }), n.jsx("button", { type: "button", className: "step-one-media-remove", onClick: () => A(l.id), "aria-label": `Remove ${l.fileName}`, children: n.jsx(pe, { size: 17 }) })] }, l.id)) }), n.jsxs("button", { type: "button", className: "add-more-media", onClick: () => {
    var l;
    return (l = f.current) == null ? void 0 : l.click();
  }, children: [n.jsx(An, { size: 17 }), " Add more"] })] }) : n.jsxs(n.Fragment, { children: [n.jsxs("div", { className: "drop-zone create-drop", onDragOver: (l) => l.preventDefault(), onDrop: We, children: [n.jsx(An, { size: 28 }), n.jsx("strong", { children: "Upload photos or videos" }), n.jsx("span", { children: "JPEG, PNG, WEBP, MP4 or WEBM. Multiple items supported." }), n.jsx("button", { type: "button", onClick: () => {
    var l;
    return (l = f.current) == null ? void 0 : l.click();
  }, children: "Choose from device" })] }), n.jsx(uo, { status: Ge })] })] }), d === 2 && n.jsxs("div", { className: "create-step media-editor-step", children: [n.jsxs("div", { className: "create-step-heading", children: [n.jsxs("div", { children: [n.jsx("h3", { children: "Edit media" }), n.jsxs("span", { children: ["Item music \xB7 ", le, " configured"] })] }), le > 0 && n.jsxs("span", { className: "music-step-chip", children: [n.jsx(vn, { size: 15 }), le] })] }), b && n.jsxs("div", { className: "neutral-info-banner", children: [n.jsx(cs, { size: 16 }), n.jsx("span", { children: "Shared post music is applied to the complete carousel. Individual music controls are hidden." })] }), n.jsx("div", { className: "step-two-media-accordion", children: h.map((l, S) => {
    var U;
    const M = C === l.id;
    return n.jsxs("article", { className: `${M ? "expanded" : ""} ${(_ == null ? void 0 : _.id) === l.id ? "active" : ""}`, children: [n.jsxs("button", { type: "button", className: "media-accordion-trigger", onClick: () => {
      const W = C !== l.id;
      g(l.id), y(W ? l.id : null), T(W && !b && l.type === "IMAGE" && !l.music ? l.id : null), tn();
    }, "aria-expanded": M, children: [n.jsx("span", { className: "media-order", children: String(S + 1).padStart(2, "0") }), n.jsx("span", { className: "media-list-thumb", children: l.type === "VIDEO" ? n.jsx("video", { src: l.url, muted: true }) : n.jsx("img", { src: l.url, alt: "" }) }), n.jsxs("span", { className: "media-list-copy", children: [n.jsx("strong", { children: l.fileName }), n.jsxs("small", { children: [l.itemCaption ? "Caption added" : "No caption", !b && l.type === "IMAGE" ? l.music ? " \xB7 Music added" : " \xB7 No music" : ""] })] }), !b && l.music && n.jsx("span", { className: "media-music-status", title: "Music added", children: n.jsx(vn, { size: 15 }) }), n.jsx(Cn, { className: "media-accordion-chevron", size: 17 })] }), M && n.jsxs("div", { className: "media-accordion-panel", children: [n.jsxs("div", { className: "media-accordion-actions", children: [n.jsx("button", { type: "button", onClick: () => Je(l.id, -1), disabled: S === 0, "aria-label": "Move item left", children: n.jsx(dn, { size: 15 }) }), n.jsx("button", { type: "button", onClick: () => Je(l.id, 1), disabled: S === h.length - 1, "aria-label": "Move item right", children: n.jsx(Cn, { size: 15 }) }), n.jsx("button", { type: "button", onClick: () => A(l.id), "aria-label": `Remove ${l.fileName}`, children: n.jsx(pe, { size: 16 }) })] }), n.jsxs("label", { className: "item-caption-field", children: [n.jsx("span", { children: "Media caption" }), n.jsx("input", { value: l.itemCaption, onChange: (W) => $(l.id, { itemCaption: W.target.value }), placeholder: "Caption for this media" })] }), !b && l.type === "IMAGE" && n.jsx("div", { className: "accordion-music-editor", children: l.music && I !== l.id ? n.jsx(lo, { music: l.music, start: l.musicStart, end: l.musicEnd, playing: ye === l.music.id, onRangeChange: (W, Z) => $(l.id, { musicStart: W, musicEnd: Z }), onPlayToggle: () => Ue(l.music, l.musicStart, l.musicEnd), onRangeCommit: (W, Z) => Ue(l.music, W, Z, true), onReplace: () => T(l.id), onRemove: () => J(l.id) }) : n.jsx(co, { tracks: D, query: V, loading: ne, loadingMore: he, hasMore: F, selectedId: ((U = l.music) == null ? void 0 : U.id) ?? null, previewingId: ye, onQueryChange: P, onLoadMore: () => void H(), onPreview: (W) => Ue(Ve(W)), onSelect: (W) => G(l.id, W), onClose: () => {
      l.music ? T(null) : y(null);
    } }) })] })] }, l.id);
  }) })] }), d === 3 && n.jsxs("div", { className: "create-step details post-details-step", children: [n.jsxs("div", { className: "create-step-heading", children: [n.jsxs("div", { children: [n.jsx("h3", { children: "Post details" }), n.jsx("span", { children: b ? "Shared music" : "No shared music" })] }), b && n.jsxs("span", { className: "music-step-chip", children: [n.jsx(vn, { size: 15 }), "1"] })] }), n.jsx("textarea", { value: se, onChange: (l) => $e(l.target.value), placeholder: "Write a caption..." }), n.jsx("input", { value: xe, onChange: (l) => Qe(l.target.value), placeholder: "Hashtags" }), n.jsxs("section", { className: "post-ratio-section", children: [n.jsxs("header", { children: [n.jsx("strong", { children: "Feed media ratio" }), n.jsx("small", { children: "Applies to the media frame for this post" })] }), n.jsx("div", { className: "post-ratio-options", role: "radiogroup", "aria-label": "Feed media ratio", children: hr.map((l) => n.jsx("button", { type: "button", role: "radio", "aria-checked": De === l, className: De === l ? "active" : "", onClick: () => Ze(l), children: l }, l)) })] }), n.jsxs("section", { className: "shared-music-section", children: [n.jsxs("header", { children: [n.jsx(vn, { size: 19 }), n.jsxs("span", { children: [n.jsx("strong", { children: "Music for the complete post" }), n.jsx("small", { children: "Optional \xB7 Applies to every media item in this carousel" })] })] }), Me ? j ? n.jsx(co, { tracks: D, query: V, loading: ne, loadingMore: he, hasMore: F, selectedId: (b == null ? void 0 : b.id) ?? null, previewingId: ye, onQueryChange: P, onLoadMore: () => void H(), onPreview: (l) => Ue(Ve(l)), onSelect: ce, onClose: () => E(false) }) : b ? n.jsxs(n.Fragment, { children: [n.jsx(lo, { music: b, start: z, end: w, playing: ye === b.id, onRangeChange: (l, S) => {
    x(l), Y(S);
  }, onPlayToggle: () => Ue(b, z, w), onRangeCommit: (l, S) => Ue(b, l, S, true), onReplace: () => E(true), onRemove: Re }), n.jsxs("div", { className: "neutral-info-banner", children: [n.jsx(cs, { size: 16 }), n.jsx("span", { children: "This track will play across the complete post. Individual media music controls are hidden while shared music is active." })] })] }) : n.jsxs("div", { className: "shared-music-empty", children: [n.jsx("span", { children: "No shared track is selected. You can assign music separately to each media item in the previous step." }), n.jsxs("div", { children: [n.jsxs("button", { type: "button", onClick: () => E(true), children: [n.jsx(vn, { size: 16 }), " Add shared music"] }), n.jsx("button", { type: "button", onClick: Oe, children: "Edit item music" })] })] }) : n.jsx("div", { className: "shared-music-empty", children: n.jsx("span", { children: "Music is unavailable for a video-only post." }) })] })] }), d === 4 && n.jsxs("div", { className: "create-step review", children: [n.jsx("div", { className: "create-step-heading", children: n.jsxs("div", { children: [n.jsx("h3", { children: "Review and publish" }), n.jsx("span", { children: "Confirm carousel and music configuration" })] }) }), n.jsxs("div", { className: "review-block", children: [n.jsx("strong", { children: "Feed media ratio" }), n.jsx("span", { children: De })] }), n.jsxs("div", { className: "review-block", children: [n.jsx("strong", { children: "Carousel order" }), h.map((l, S) => n.jsxs("span", { children: [S + 1, ". ", l.fileName, l.itemCaption ? ` - ${l.itemCaption}` : ""] }, l.id))] }), n.jsxs("section", { className: "review-music-summary", children: [n.jsxs("header", { children: [n.jsx("strong", { children: "Music" }), n.jsx("span", { children: b ? `Shared across all ${h.length} media items` : le ? "Configured separately by media item" : "No music attached" })] }), b ? n.jsxs("div", { className: "review-shared-track", children: [n.jsx(ts, { music: b }), n.jsxs("span", { children: [n.jsx("strong", { children: b.title }), n.jsx("small", { children: b.artist }), n.jsxs("small", { children: [Tn(z), "-", Tn(w), " \xB7 ", w - z, " seconds"] })] }), n.jsxs("div", { children: [n.jsxs("button", { type: "button", onClick: () => Ue(b, z, w), children: [ye === b.id ? n.jsx(na, { size: 16 }) : n.jsx(ja, { size: 16 }), " Preview"] }), n.jsx("button", { type: "button", onClick: () => u(3), children: "Edit" })] })] }) : le ? n.jsx("div", { className: "review-item-music-list", children: h.map((l, S) => n.jsxs("button", { type: "button", className: (_ == null ? void 0 : _.id) === l.id ? "active" : "", onClick: () => g(l.id), children: [n.jsx("span", { children: String(S + 1).padStart(2, "0") }), n.jsx("span", { className: "review-media-thumb", children: l.type === "VIDEO" ? n.jsx("video", { src: l.url, muted: true }) : n.jsx("img", { src: l.url, alt: "" }) }), n.jsx("strong", { children: l.fileName }), n.jsx("small", { children: l.music ? `${l.music.title} \xB7 ${Tn(l.musicStart)}-${Tn(l.musicEnd)}` : "No music" })] }, l.id)) }) : null, le > 0 && !b && n.jsx("button", { type: "button", className: "review-edit-music", onClick: Oe, children: "Edit item music" })] }), n.jsxs("div", { className: "review-block", children: [n.jsx("strong", { children: "Caption preview" }), n.jsx("p", { children: se || "No caption" })] })] })] })] }), n.jsx("footer", { className: "post-create-footer centered-actions", children: n.jsxs("div", { children: [n.jsx("button", { type: "button", onClick: () => d === 1 ? a() : u((l) => Math.max(1, l - 1)), children: "Back" }), d < 4 ? n.jsx("button", { type: "button", onClick: () => u((l) => Math.min(4, l + 1)), disabled: d === 1 && !de, children: "Next" }) : n.jsxs("button", { type: "button", onClick: () => void ia(), disabled: !de || Ge === "publishing", children: [n.jsx(vt, { size: 18 }), " Publish"] })] }) }), k && n.jsx("div", { className: "music-mode-dialog-backdrop", role: "dialog", "aria-modal": "true", children: n.jsxs("div", { className: "music-mode-dialog", children: [n.jsx(vn, { size: 21 }), n.jsx("strong", { children: "Use one track for the complete post?" }), n.jsx("p", { children: "Selecting shared music will replace the individual music presentation for this post." }), n.jsxs("div", { children: [n.jsx("button", { type: "button", onClick: () => B(null), children: "Cancel" }), n.jsx("button", { type: "button", onClick: () => ae(k), children: "Use shared music" })] })] }) }), ee && n.jsx("div", { className: "music-mode-toast", children: ee }), Q && n.jsx("div", { className: "unsaved-warning", children: n.jsxs("div", { children: [n.jsx("strong", { children: "Unsaved changes warning" }), n.jsx("span", { children: "Your post has unsaved work." }), n.jsx("button", { type: "button", onClick: () => oe(false), children: "Keep editing" }), n.jsxs("button", { type: "button", onClick: () => void Yn().then(t), children: [n.jsx(Dn, { size: 16 }), " Save draft"] }), n.jsx("button", { type: "button", onClick: t, children: "Discard" })] }) })] }) });
}
function Tn(e) {
  const a = Math.max(0, Math.floor(Number.isFinite(e) ? e : 0));
  return `${String(Math.floor(a / 60)).padStart(2, "0")}:${String(a % 60).padStart(2, "0")}`;
}
function ts({ music: e }) {
  return e.artwork ? n.jsx("img", { className: "music-artwork", src: e.artwork, alt: "" }) : n.jsx("span", { className: "music-artwork fallback", children: n.jsx(vn, { size: 18 }) });
}
function co({ tracks: e, query: a, loading: t, loadingMore: i, hasMore: r, selectedId: s, previewingId: f, onQueryChange: c, onLoadMore: d, onPreview: u, onSelect: h, onClose: m }) {
  return n.jsxs("section", { className: "track-browser", children: [n.jsxs("header", { children: [n.jsx("strong", { children: a ? "Search results" : "Suggested tracks" }), n.jsx("button", { type: "button", onClick: m, "aria-label": "Close music browser", children: n.jsx(pe, { size: 17 }) })] }), n.jsxs("label", { className: "track-search", children: [n.jsx(ma, { size: 17 }), n.jsx("input", { value: a, onChange: (p) => c(p.target.value), placeholder: "Search tracks or artists", autoFocus: true }), a && n.jsx("button", { type: "button", onClick: () => c(""), "aria-label": "Clear search", children: n.jsx(pe, { size: 15 }) })] }), t ? n.jsxs("div", { className: "track-browser-state", children: [n.jsx("span", {}), n.jsx("span", {}), n.jsx("span", {})] }) : e.length ? n.jsxs("div", { className: "track-results", children: [e.map((p) => {
    const g = s === p.id, C = f === p.id, y = { id: p.id, title: p.displayName, artist: p.singleName || p.category || "Unknown artist", url: p.songUrl, artwork: p.displayImages || "", duration: p.duration || 0 };
    return n.jsxs("article", { className: g ? "selected" : "", children: [n.jsx(ts, { music: y }), n.jsxs("span", { children: [n.jsx("strong", { children: y.title }), n.jsxs("small", { children: [y.artist, " \xB7 ", Tn(y.duration)] })] }), n.jsx("button", { type: "button", onClick: () => u(p), "aria-label": C ? "Pause track preview" : "Play track preview", children: C ? n.jsx(na, { size: 16 }) : n.jsx(ja, { size: 16 }) }), n.jsx("button", { type: "button", className: "track-select", onClick: () => h(p), children: g ? n.jsx(gn, { size: 16 }) : "Select" })] }, p.id);
  }), r && n.jsx("button", { type: "button", className: "track-load-more", onClick: d, disabled: i, children: i ? "Loading more..." : "Load more" })] }) : n.jsxs("div", { className: "track-empty", children: [n.jsx(vn, { size: 20 }), n.jsx("strong", { children: "No tracks found" }), n.jsx("span", { children: "Try another title or artist." })] })] });
}
function lo({ music: e, start: a, end: t, playing: i, onRangeChange: r, onPlayToggle: s, onRangeCommit: f, onReplace: c, onRemove: d }) {
  return n.jsxs("section", { className: "selected-music-editor compact", children: [n.jsxs("div", { className: "selected-track-summary", children: [n.jsx(ts, { music: e }), n.jsxs("span", { children: [n.jsx("strong", { children: e.title }), n.jsx("small", { children: e.artist })] })] }), n.jsx(op, { music: e, start: a, end: t, onChange: r, onCommit: f }), n.jsxs("footer", { className: "compact-music-actions", children: [n.jsxs("button", { type: "button", onClick: s, children: [i ? n.jsx(na, { size: 15 }) : n.jsx(ja, { size: 15 }), i ? "Pause" : "Play"] }), n.jsx("button", { type: "button", onClick: c, children: "Replace" }), n.jsx("button", { type: "button", onClick: d, children: "Remove" })] })] });
}
function op({ music: e, start: a, end: t, onChange: i, onCommit: r }) {
  const s = Math.max(1, Math.floor(e.duration || Math.max(t, 60))), f = Math.max(0, Math.min(Math.floor(a), s - 1)), c = Math.max(f + 1, Math.min(Math.floor(t), s)), d = f / s * 100, u = (c - f) / s * 100, h = o.useRef({ start: f, end: c }), m = o.useRef(null);
  h.current = { start: f, end: c };
  function p(j, E) {
    const b = Math.max(0, Math.min(Math.floor(j), s - 1)), N = Math.max(b + 1, Math.min(Math.floor(E), s));
    return h.current = { start: b, end: N }, i(b, N), { start: b, end: N };
  }
  function g() {
    r(h.current.start, h.current.end);
  }
  function C(j) {
    var b;
    const E = ((b = j.currentTarget.parentElement) == null ? void 0 : b.getBoundingClientRect().width) ?? 0;
    E && (m.current = { originX: j.clientX, trackWidth: E, start: f, end: c }, j.currentTarget.setPointerCapture(j.pointerId));
  }
  function y(j) {
    const E = m.current;
    if (!E) return;
    const b = E.end - E.start, N = Math.round((j.clientX - E.originX) / E.trackWidth * s), k = Math.max(0, Math.min(s - b, E.start + N));
    p(k, k + b);
  }
  function I(j) {
    m.current && (m.current = null, j.currentTarget.hasPointerCapture(j.pointerId) && j.currentTarget.releasePointerCapture(j.pointerId), g());
  }
  function T(j) {
    const E = c - f, b = Math.max(0, Math.min(s - E, f + j));
    p(b, b + E);
  }
  return n.jsxs("div", { className: "music-segment-editor", children: [n.jsxs("div", { className: "clip-length", children: [n.jsx("span", { children: "Clip length" }), [15, 30, 60].filter((j) => j <= s).map((j) => n.jsxs("button", { type: "button", className: c - f === j ? "active" : "", onClick: () => {
    const E = Math.min(s, f + j), b = Math.max(0, E - j), N = p(b, E);
    r(N.start, N.end);
  }, children: [j, " sec"] }, j))] }), n.jsxs("div", { className: "waveform", children: [Array.from({ length: 32 }, (j, E) => n.jsx("i", { style: { height: `${8 + E * 7 % 18}px` } }, E)), n.jsx("button", { type: "button", className: "range-window", style: { left: `${d}%`, width: `${u}%` }, "aria-label": "Move selected music range", title: "Drag to move selected range", onPointerDown: C, onPointerMove: y, onPointerUp: I, onPointerCancel: (j) => {
    m.current = null, j.currentTarget.hasPointerCapture(j.pointerId) && j.currentTarget.releasePointerCapture(j.pointerId);
  }, onKeyDown: (j) => {
    (j.key === "ArrowLeft" || j.key === "ArrowRight") && (j.preventDefault(), T(j.key === "ArrowLeft" ? -1 : 1));
  }, onKeyUp: (j) => {
    (j.key === "ArrowLeft" || j.key === "ArrowRight") && g();
  } })] }), n.jsxs("div", { className: "segment-sliders", children: [n.jsx("input", { "aria-label": "Music segment start", type: "range", min: "0", max: Math.max(0, c - 1), value: f, onChange: (j) => p(Math.min(Number(j.target.value), c - 1), c), onPointerUp: g, onKeyUp: g }), n.jsx("input", { "aria-label": "Music segment end", type: "range", min: Math.min(s, f + 1), max: s, value: c, onChange: (j) => p(f, Math.max(f + 1, Number(j.target.value))), onPointerUp: g, onKeyUp: g })] }), n.jsxs("div", { className: "segment-times", children: [n.jsx("span", { children: Tn(f) }), n.jsx("span", { children: Tn(c) }), n.jsx("small", { children: Tn(s) })] })] });
}
function uo({ status: e }) {
  if (e === "idle") return null;
  const a = { uploading: ["Uploading", "Preparing selected media."], processing: ["Processing video", "Waiting for video processing."], publishing: ["Publishing", "Sending the post to the backend."], success: ["Publish success", "Post was submitted."], failure: ["Publish failure", "The request or media could not be processed."], draft: ["Draft saved", "Draft was sent to the backend."] }, [t, i] = a[e];
  return n.jsxs("div", { className: "create-status", children: [n.jsx("strong", { children: t }), n.jsx("span", { children: i })] });
}
const ho = { users(e, a, t) {
  return fe(`/search/users/rich?viewerId=${encodeURIComponent(e)}&q=${encodeURIComponent(a)}&page=0&size=20`, { signal: t });
}, posts(e, a) {
  return fe(`/posts/search/rich?query=${encodeURIComponent(e)}&page=0&limit=20`, { signal: a });
} }, fp = "_workspace_1ms20_1", cp = "_tabs_1ms20_7", lp = "_tab_1ms20_7", dp = "_activeTab_1ms20_14", up = "_searchField_1ms20_40", hp = "_results_1ms20_68", mp = "_status_1ms20_72", gp = "_quietState_1ms20_73", pp = "_spinner_1ms20_100", bp = "_userList_1ms20_109", wp = "_postList_1ms20_110", yp = "_userRow_1ms20_115", jp = "_postRow_1ms20_116", Mp = "_avatar_1ms20_150", vp = "_avatarFallback_1ms20_151", Lp = "_userIdentity_1ms20_171", Cp = "_relationship_1ms20_188", xp = "_postAuthor_1ms20_201", Ip = "_mediaStrip_1ms20_226", Sp = "_mediaItem_1ms20_232", kp = "_videoBadge_1ms20_253", Np = "_moreMedia_1ms20_254", Ep = "_srOnly_1ms20_277", Be = { workspace: fp, tabs: cp, tab: lp, activeTab: dp, searchField: up, results: hp, status: mp, quietState: gp, spinner: pp, userList: bp, postList: wp, userRow: yp, postRow: jp, avatar: Mp, avatarFallback: vp, userIdentity: Lp, relationship: Cp, postAuthor: xp, mediaStrip: Ip, mediaItem: Sp, videoBadge: kp, moreMedia: Np, srOnly: Ep }, mo = { none: "", follows_you: "Follows you", following: "Following", friends: "Friends" };
function go({ src: e, name: a }) {
  return e ? n.jsx("img", { className: Be.avatar, src: e, alt: "" }) : n.jsx("span", { className: Be.avatarFallback, "aria-hidden": "true", children: a.trim().charAt(0).toUpperCase() || n.jsx(Uo, { size: 18 }) });
}
function Tp({ query: e, onQueryChange: a, loadUsers: t, loadPosts: i, onSelectUser: r, onSelectPost: s, initialTab: f = "users", debounceMs: c = 350 }) {
  const [d, u] = o.useState(f), [h, m] = o.useState("idle"), [p, g] = o.useState([]), [C, y] = o.useState([]), [I, T] = o.useState(0), j = o.useRef(0), E = o.useCallback(async (N, k, B, z) => {
    try {
      if (N === "users") {
        const x = await t({ query: k, signal: B });
        if (B.aborted || z !== j.current) return;
        g(x);
      } else {
        const x = await i({ query: k, signal: B });
        if (B.aborted || z !== j.current) return;
        y(x);
      }
      m("success");
    } catch {
      if (B.aborted || z !== j.current) return;
      m("error");
    }
  }, [i, t]);
  o.useEffect(() => {
    const N = e.trim(), k = new AbortController(), B = ++j.current;
    if (!N) return m("idle"), g([]), y([]), () => k.abort();
    m("loading");
    const z = window.setTimeout(() => {
      E(d, N, k.signal, B);
    }, c);
    return () => {
      window.clearTimeout(z), k.abort();
    };
  }, [c, E, e, I, d]);
  const b = d === "users" ? p : C;
  return n.jsxs("section", { className: Be.workspace, "aria-label": "Search", children: [n.jsxs("div", { className: Be.tabs, role: "tablist", "aria-label": "Search type", children: [n.jsx("button", { className: d === "users" ? Be.activeTab : Be.tab, type: "button", role: "tab", "aria-selected": d === "users", onClick: () => u("users"), children: "Users" }), n.jsx("button", { className: d === "posts" ? Be.activeTab : Be.tab, type: "button", role: "tab", "aria-selected": d === "posts", onClick: () => u("posts"), children: "Posts" })] }), n.jsxs("label", { className: Be.searchField, children: [n.jsx(ma, { size: 18, "aria-hidden": "true" }), n.jsxs("span", { className: Be.srOnly, children: ["Search ", d] }), n.jsx("input", { type: "search", value: e, placeholder: d === "users" ? "Search by username" : "Search posts", onChange: (N) => a(N.target.value) })] }), n.jsxs("div", { className: Be.results, "aria-live": "polite", children: [!e.trim() && n.jsxs("div", { className: Be.quietState, children: [n.jsx(ma, { size: 22, "aria-hidden": "true" }), n.jsxs("p", { children: ["Start typing to search ", d, "."] })] }), e.trim() && h === "loading" && n.jsxs("div", { className: Be.status, role: "status", children: [n.jsx("span", { className: Be.spinner, "aria-hidden": "true" }), "Searching"] }), e.trim() && h === "error" && n.jsxs("div", { className: Be.quietState, role: "alert", children: [n.jsx("strong", { children: "Search failed" }), n.jsx("p", { children: "Check your connection and try again." }), n.jsx("button", { type: "button", onClick: () => T((N) => N + 1), children: "Retry search" })] }), e.trim() && h === "success" && b.length === 0 && n.jsx("div", { className: Be.quietState, children: n.jsxs("p", { children: ["No ", d, " found"] }) }), d === "users" && h === "success" && p.length > 0 && n.jsx("div", { className: Be.userList, children: p.map((N) => n.jsxs("button", { className: Be.userRow, type: "button", "aria-label": `Open ${N.displayName} profile`, onClick: () => r(N), children: [n.jsx(go, { src: N.avatarUrl, name: N.displayName }), n.jsxs("span", { className: Be.userIdentity, children: [n.jsx("strong", { children: N.displayName }), n.jsxs("span", { children: ["@", N.username] }), N.metadata && n.jsx("small", { children: N.metadata })] }), N.relationship && mo[N.relationship] && n.jsx("span", { className: Be.relationship, children: mo[N.relationship] })] }, N.id)) }), d === "posts" && h === "success" && C.length > 0 && n.jsx("div", { className: Be.postList, children: C.map((N) => n.jsxs("button", { className: Be.postRow, type: "button", "aria-label": `Open post by ${N.author.displayName}`, onClick: () => s(N), children: [n.jsxs("div", { className: Be.postAuthor, children: [n.jsx(go, { src: N.author.avatarUrl, name: N.author.displayName }), n.jsxs("span", { children: [n.jsx("strong", { children: N.author.displayName }), n.jsxs("small", { children: ["@", N.author.username] })] })] }), N.caption && n.jsx("p", { children: N.caption }), N.media.length > 0 && n.jsx("div", { className: Be.mediaStrip, children: N.media.slice(0, 3).map((k, B) => n.jsxs("span", { className: Be.mediaItem, children: [n.jsx("img", { src: k.thumbnailUrl, alt: "" }), k.mediaType === "VIDEO" && n.jsx("span", { className: Be.videoBadge, children: "Video" }), B === 2 && (N.totalMediaItems ?? N.media.length) > 3 && n.jsxs("span", { className: Be.moreMedia, children: ["+", (N.totalMediaItems ?? N.media.length) - 3] })] }, k.id)) })] }, N.id)) })] })] });
}
function Dp(e) {
  return e.friend ? "friends" : e.viewerFollowsUser ? "following" : e.userFollowsViewer ? "follows_you" : "none";
}
function Ap({ viewerId: e, onSelectPost: a, onOpenProfile: t }) {
  const [i, r] = o.useState("");
  async function s({ query: d, signal: u }) {
    return ((await ho.users(e, d, u)).content ?? []).filter((m) => m.userId !== e).map((m) => ({ id: m.userId, username: m.username || m.userId, displayName: m.fullName || m.username || m.userId, avatarUrl: m.avatarUrl || null, relationship: Dp(m), metadata: m.mutualCount ? `${m.mutualCount} k\u1EBFt n\u1ED1i chung` : void 0 }));
  }
  async function f({ query: d, signal: u }) {
    return ((await ho.posts(d, u)).content ?? []).map((m) => {
      var p;
      return { id: m.postId, author: { id: m.userId, username: m.authorUsername || m.userId, displayName: m.authorFullName || m.authorUsername || m.userId, avatarUrl: m.authorAvatarUrl || null }, caption: m.content || "", totalMediaItems: m.totalMediaItems ?? ((p = m.items) == null ? void 0 : p.length) ?? 0, media: (m.items ?? []).flatMap((g) => {
        var I, T, j, E;
        const C = ((I = g.media) == null ? void 0 : I.secureUrl) || ((T = g.media) == null ? void 0 : T.url);
        if (!C) return [];
        const y = (((j = g.media) == null ? void 0 : j.resourceType) || ((E = g.media) == null ? void 0 : E.mediaFormat) || "IMAGE").toUpperCase().match(/VIDEO|MP4|WEBM|MOV/) ? "VIDEO" : "IMAGE";
        return [{ id: g.id, thumbnailUrl: C, mediaType: y }];
      }) };
    });
  }
  async function c(d) {
    try {
      const u = await Kc.getDetail(d.id);
      a(el(u));
    } catch {
      window.dispatchEvent(new CustomEvent("app-toast", { detail: "Kh\xF4ng th\u1EC3 m\u1EDF b\xE0i vi\u1EBFt n\xE0y" }));
    }
  }
  return n.jsx("section", { className: "screen", children: n.jsx(Tp, { query: i, onQueryChange: r, loadUsers: s, loadPosts: f, onSelectUser: (d) => void t(d.id), onSelectPost: (d) => void c(d) }) });
}
const zp = "_actions_1jfbx_1", Rp = "_primary_1jfbx_9", Pp = "_secondary_1jfbx_14", Op = "_iconButton_1jfbx_15", et = { actions: zp, primary: Rp, secondary: Pp, iconButton: Op };
function Up({ relationship: e, onFollow: a, onUnfollow: t, onMessage: i, onFindSimilar: r, pending: s = false }) {
  const f = e === "following" || e === "friends", c = e === "follows_you" ? "Follow back" : "Follow";
  return n.jsxs("div", { className: et.actions, "aria-label": "Profile actions", children: [f ? n.jsxs(n.Fragment, { children: [n.jsx("button", { className: et.secondary, type: "button", disabled: s, onClick: () => void t(), children: "Following" }), n.jsx("button", { className: et.secondary, type: "button", disabled: s, onClick: () => void i(), children: "Message" })] }) : n.jsx("button", { className: et.primary, type: "button", disabled: s, onClick: () => void a(), children: c }), n.jsx("button", { className: et.iconButton, type: "button", "aria-label": "Find similar people", "aria-pressed": false, disabled: s, onClick: r, children: n.jsx(ad, { size: 19, "aria-hidden": "true" }) })] });
}
const Bp = "_section_17clo_1", Gp = "_header_17clo_10", Yp = "_dialog_17clo_11", Qp = "_railControls_17clo_32", Jp = "_rail_17clo_32", _p = "_card_17clo_68", Fp = "_identityButton_17clo_80", Hp = "_avatar_17clo_93", $p = "_avatarFallback_17clo_94", Vp = "_followButton_17clo_131", Zp = "_followingButton_17clo_132", Wp = "_state_17clo_133", qp = "_viewAll_17clo_156", Kp = "_skeleton_17clo_173", Xp = "_dialogBackdrop_17clo_187", eb = "_dialogGrid_17clo_215", on = { section: Bp, header: Gp, dialog: Yp, railControls: Qp, rail: Jp, card: _p, identityButton: Fp, avatar: Hp, avatarFallback: $p, followButton: Vp, followingButton: Zp, state: Wp, viewAll: qp, skeleton: Kp, dialogBackdrop: Xp, dialogGrid: eb }, oa = /* @__PURE__ */ new Map();
function nb({ user: e }) {
  return e.avatarUrl ? n.jsx("img", { className: on.avatar, src: e.avatarUrl, alt: "" }) : n.jsx("span", { className: on.avatarFallback, "aria-hidden": "true", children: e.displayName.trim().charAt(0).toUpperCase() || n.jsx(Uo, { size: 22 }) });
}
function ab({ user: e, onSelect: a, onToggleFollow: t }) {
  const i = e.relationship === "following" || e.relationship === "friends";
  return n.jsxs("article", { className: on.card, children: [n.jsxs("button", { className: on.identityButton, type: "button", "aria-label": `Open ${e.displayName} profile`, onClick: a, children: [n.jsx(nb, { user: e }), n.jsx("strong", { children: e.displayName }), n.jsxs("span", { children: ["@", e.username] }), e.metadata && n.jsx("small", { children: e.metadata })] }), n.jsx("button", { className: i ? on.followingButton : on.followButton, type: "button", "aria-label": `${i ? "Unfollow" : e.relationship === "follows_you" ? "Follow back" : "Follow"} ${e.displayName}`, onClick: t, children: i ? "Following" : e.relationship === "follows_you" ? "Follow back" : "Follow" })] });
}
function tb({ open: e, profileId: a, loadUsers: t, onSelectUser: i, onFollow: r, onUnfollow: s, onClose: f }) {
  const [c, d] = o.useState(() => oa.get(a) ?? []), [u, h] = o.useState(oa.has(a) ? "success" : "idle"), [m, p] = o.useState(0), [g, C] = o.useState(false), y = o.useRef(null);
  if (o.useEffect(() => {
    if (!e) return;
    const b = oa.get(a);
    if (b) {
      d(b), h("success");
      return;
    }
    const N = new AbortController();
    return h("loading"), t({ profileId: a, signal: N.signal }).then((k) => {
      N.signal.aborted || (oa.set(a, k), d(k), h("success"));
    }).catch(() => {
      N.signal.aborted || h("error");
    }), () => N.abort();
  }, [t, e, a, m]), o.useEffect(() => {
    if (!g) return;
    const b = (N) => {
      N.key === "Escape" && C(false);
    };
    return window.addEventListener("keydown", b), () => window.removeEventListener("keydown", b);
  }, [g]), !e) return null;
  const I = async (b) => {
    const N = b.relationship === "following" || b.relationship === "friends", k = c, B = c.map((z) => z.id === b.id ? { ...z, relationship: N ? "none" : "following" } : z);
    d(B), oa.set(a, B);
    try {
      N ? await s(b) : await r(b);
    } catch {
      d(k), oa.set(a, k);
    }
  }, T = (b) => n.jsx(ab, { user: b, onSelect: () => i(b), onToggleFollow: () => void I(b) }, b.id), j = c.slice(0, 3).map(T), E = c.map(T);
  return n.jsxs("section", { className: on.section, "aria-label": "Similar people", children: [n.jsxs("header", { className: on.header, children: [n.jsxs("div", { children: [n.jsx("strong", { children: "Similar people" }), n.jsx("span", { children: "Profiles related to this account" })] }), n.jsx("button", { type: "button", "aria-label": "Close similar people", onClick: f, children: n.jsx(pe, { size: 18, "aria-hidden": "true" }) })] }), u === "loading" && n.jsx("div", { className: on.skeleton, role: "status", children: "Loading suggestions" }), u === "error" && n.jsxs("div", { className: on.state, role: "alert", children: [n.jsx("strong", { children: "Unable to load suggestions" }), n.jsx("button", { type: "button", onClick: () => {
    oa.delete(a), p((b) => b + 1);
  }, children: "Retry suggestions" })] }), u === "success" && c.length === 0 && n.jsx("div", { className: on.state, children: "No similar people found" }), u === "success" && c.length > 0 && n.jsxs(n.Fragment, { children: [n.jsxs("div", { className: on.railControls, children: [n.jsx("button", { type: "button", "aria-label": "Previous suggestions", onClick: () => {
    var b;
    return (b = y.current) == null ? void 0 : b.scrollBy({ left: -240, behavior: "smooth" });
  }, children: n.jsx(dn, { size: 18, "aria-hidden": "true" }) }), n.jsx("button", { type: "button", "aria-label": "Next suggestions", onClick: () => {
    var b;
    return (b = y.current) == null ? void 0 : b.scrollBy({ left: 240, behavior: "smooth" });
  }, children: n.jsx(Cn, { size: 18, "aria-hidden": "true" }) })] }), n.jsx("div", { className: on.rail, ref: y, children: j }), c.length > 3 && n.jsx("button", { className: on.viewAll, type: "button", "aria-label": "View all similar people", onClick: () => C(true), children: "View all" })] }), g && n.jsx("div", { className: on.dialogBackdrop, role: "presentation", onMouseDown: () => C(false), children: n.jsxs("div", { className: on.dialog, role: "dialog", "aria-modal": "true", "aria-label": "Similar people", onMouseDown: (b) => b.stopPropagation(), children: [n.jsxs("header", { children: [n.jsx("strong", { children: "Similar people" }), n.jsx("button", { type: "button", "aria-label": "Close similar people dialog", onClick: () => C(false), children: n.jsx(pe, { size: 18, "aria-hidden": "true" }) })] }), n.jsx("div", { className: on.dialogGrid, children: E })] }) })] });
}
const ib = "_backdrop_1y795_1", rb = "_menu_1y795_12", sb = "_options_1y795_43", ob = "_icon_1y795_75", nt = { backdrop: ib, menu: rb, options: sb, icon: ob };
function fb({ open: e, onClose: a, onCreatePost: t, reelsAvailable: i = false, onCreateReels: r }) {
  const s = o.useRef(null);
  return o.useEffect(() => {
    if (!e) return;
    const f = (d) => {
      d.key === "Escape" && a();
    };
    window.addEventListener("keydown", f);
    const c = window.setTimeout(() => {
      var d, u;
      (u = (d = s.current) == null ? void 0 : d.querySelector("button:not(:disabled)")) == null || u.focus();
    });
    return () => {
      window.clearTimeout(c), window.removeEventListener("keydown", f);
    };
  }, [a, e]), e ? n.jsx("div", { className: nt.backdrop, "data-testid": "create-content-backdrop", role: "presentation", onMouseDown: (f) => {
    f.target === f.currentTarget && a();
  }, children: n.jsxs("div", { className: nt.menu, ref: s, role: "dialog", "aria-modal": "true", "aria-label": "Create content", children: [n.jsxs("header", { children: [n.jsx("strong", { children: "Create" }), n.jsx("button", { type: "button", "aria-label": "Close create menu", onClick: a, children: n.jsx(pe, { size: 18, "aria-hidden": "true" }) })] }), n.jsxs("div", { className: nt.options, children: [n.jsxs("button", { type: "button", "aria-label": "Create post", onClick: () => {
    t(), a();
  }, children: [n.jsx("span", { className: nt.icon, children: n.jsx(Kl, { size: 20, "aria-hidden": "true" }) }), n.jsxs("span", { children: [n.jsx("strong", { children: "Post" }), n.jsx("small", { children: "Share photos, video or text" })] })] }), n.jsxs("button", { type: "button", "aria-label": "Create reels", disabled: !i || !r, onClick: () => {
    r == null || r(), a();
  }, children: [n.jsx("span", { className: nt.icon, children: n.jsx(_l, { size: 20, "aria-hidden": "true" }) }), n.jsxs("span", { children: [n.jsx("strong", { children: "Reels" }), n.jsx("small", { children: i ? "Create a short video" : "Unavailable" })] })] })] })] }) }) : null;
}
const za = { archive(e, a = 0, t = 60) {
  return fe(`/profile-media/${encodeURIComponent(e)}/stories?page=${a}&size=${t}&mediaType=STORY`);
}, recordView(e, a, t) {
  const i = new URLSearchParams({ viewerId: a });
  return t && i.set("reaction", t), ie(`/profile-media/stories/${encodeURIComponent(e)}/views?${i.toString()}`, "POST");
}, viewers(e, a, t = 0, i = 20) {
  return fe(`/profile-media/stories/${encodeURIComponent(e)}/viewers?ownerId=${encodeURIComponent(a)}&page=${t}&size=${i}`);
}, highlights(e) {
  return fe(`/profile-media/${encodeURIComponent(e)}/highlights`);
}, createHighlight(e, a, t, i) {
  return ie("/profile-media/highlights", "POST", { ownerId: e, title: a, storyIds: t, coverStoryId: i });
}, updateHighlight(e, a, t, i, r) {
  return ie(`/profile-media/highlights/${encodeURIComponent(e)}`, "PUT", { ownerId: a, title: t, storyIds: i, coverStoryId: r });
}, deleteHighlight(e, a) {
  return ie(`/profile-media/highlights/${encodeURIComponent(e)}?ownerId=${encodeURIComponent(a)}`, "DELETE");
} };
function cb({ ownerId: e, ownProfile: a, onOpen: t }) {
  const [i, r] = o.useState([]), [s, f] = o.useState("loading"), [c, d] = o.useState(false), [u, h] = o.useState([]), [m, p] = o.useState(/* @__PURE__ */ new Set()), [g, C] = o.useState(""), [y, I] = o.useState(false);
  function T() {
    f("loading"), za.highlights(e).then((b) => {
      r(b ?? []), f("ready");
    }).catch(() => f("error"));
  }
  o.useEffect(T, [e]);
  async function j() {
    d(true);
    const b = await za.archive(e).catch(() => null);
    h((b == null ? void 0 : b.content) ?? []);
  }
  async function E() {
    if (!(!g.trim() || m.size === 0 || y)) {
      I(true);
      try {
        await za.createHighlight(e, g.trim(), [...m], [...m][0]), d(false), C(""), p(/* @__PURE__ */ new Set()), T();
      } finally {
        I(false);
      }
    }
  }
  return s === "loading" ? n.jsxs("div", { className: "story-highlight-skeleton", children: [n.jsx("i", {}), n.jsx("i", {}), n.jsx("i", {})] }) : s === "error" ? n.jsx(qc, { message: "Kh\xF4ng th\u1EC3 t\u1EA3i Story n\u1ED5i b\u1EADt", onRetry: T }) : !i.length && !a ? null : n.jsxs("section", { className: "story-highlights-section", "aria-label": "Story n\u1ED5i b\u1EADt", children: [n.jsxs("div", { className: "story-highlights-strip", children: [a ? n.jsxs("button", { type: "button", className: "story-highlight-item add", onClick: () => void j(), children: [n.jsx("span", { children: n.jsx(Pa, { size: 20 }) }), n.jsx("small", { children: "Th\xEAm m\u1EDBi" })] }) : null, i.map((b) => n.jsxs("button", { type: "button", className: "story-highlight-item", onClick: () => t(b), children: [n.jsx("span", { children: b.coverUrl ? n.jsx("img", { src: b.coverUrl, alt: "" }) : n.jsx(Po, { size: 19 }) }), n.jsx("small", { children: b.title })] }, b.id))] }), c ? n.jsx("div", { className: "highlight-editor-backdrop", onMouseDown: (b) => {
    b.target === b.currentTarget && d(false);
  }, children: n.jsxs("section", { className: "highlight-editor", role: "dialog", "aria-modal": "true", "aria-label": "T\u1EA1o Story n\u1ED5i b\u1EADt", children: [n.jsxs("header", { children: [n.jsx("strong", { children: "T\u1EA1o Story n\u1ED5i b\u1EADt" }), n.jsx("button", { type: "button", onClick: () => d(false), "aria-label": "\u0110\xF3ng", children: n.jsx(pe, { size: 19 }) })] }), n.jsxs("label", { children: ["T\xEAn", n.jsx("input", { value: g, onChange: (b) => C(b.target.value), maxLength: 120 })] }), u.length ? n.jsx("div", { className: "highlight-story-grid", children: u.map((b) => {
    var N;
    return n.jsxs("button", { type: "button", className: m.has(b.id) ? "selected" : "", onClick: () => p((k) => {
      const B = new Set(k);
      return B.has(b.id) ? B.delete(b.id) : B.add(b.id), B;
    }), children: [((N = b.mediaType) == null ? void 0 : N.toUpperCase()) === "VIDEO" ? n.jsx("video", { src: b.mediaUrl ?? "", muted: true }) : n.jsx("img", { src: b.mediaUrl ?? "", alt: "" }), m.has(b.id) ? n.jsx(gn, { size: 17 }) : null] }, b.id);
  }) }) : n.jsx(Wc, { title: "Kho Story \u0111ang tr\u1ED1ng" }), n.jsxs("footer", { children: [n.jsx("button", { type: "button", onClick: () => d(false), children: "H\u1EE7y" }), n.jsx("button", { type: "button", onClick: () => void E(), disabled: !g.trim() || !m.size || y, children: y ? "\u0110ang t\u1EA1o" : "T\u1EA1o" })] })] }) }) : null] });
}
function lb({ storyId: e, ownerId: a, onClose: t, onOpenProfile: i }) {
  const [r, s] = o.useState([]), [f, c] = o.useState(0), [d, u] = o.useState(0), [h, m] = o.useState(false), [p, g] = o.useState("loading"), C = o.useCallback(async (y = 0) => {
    g("loading");
    try {
      const I = await za.viewers(e, a, y, 20);
      s((T) => y === 0 ? I.content : [...T, ...I.content]), c(I.pageNumber), u(I.totalElements), m(I.pageNumber + 1 < I.totalPages), g("ready");
    } catch {
      g("error");
    }
  }, [a, e]);
  return o.useEffect(() => {
    C();
  }, [C]), o.useEffect(() => {
    const y = (I) => {
      I.key === "Escape" && t();
    };
    return window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y);
  }, [t]), n.jsxs("aside", { className: "story-viewers-panel", "aria-label": "Danh s\xE1ch ng\u01B0\u1EDDi xem Story", children: [n.jsxs("header", { children: [n.jsxs("div", { children: [n.jsx("strong", { children: "Ng\u01B0\u1EDDi xem" }), n.jsxs("span", { children: [d, " l\u01B0\u1EE3t xem"] })] }), n.jsx("button", { onClick: t, "aria-label": "\u0110\xF3ng", children: n.jsx(pe, { size: 19 }) })] }), n.jsxs("div", { className: "story-viewers-list", children: [r.map((y) => n.jsxs("button", { onClick: () => i(y.userId), children: [n.jsx(Zt, { src: y.avatarUrl ?? "", alt: y.fullName || y.username || y.userId }), n.jsxs("span", { children: [n.jsx("strong", { children: y.fullName || y.username || y.userId }), n.jsx("small", { children: y.username ? `@${y.username}` : "" }), n.jsx("time", { children: new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short" }).format(new Date(y.viewedAt)) })] }), y.reaction && n.jsxs("em", { children: [n.jsx(Ja, { size: 13, fill: "currentColor" }), y.reaction] })] }, `${y.userId}-${y.viewedAt}`)), p === "loading" && n.jsx("div", { className: "story-viewers-loading", children: "\u0110ang t\u1EA3i..." }), p === "error" && n.jsxs("button", { className: "story-viewers-retry", onClick: () => void C(f), children: [n.jsx(xn, { size: 16 }), "Th\u1EED l\u1EA1i"] }), p === "ready" && !r.length && n.jsx("p", { children: "Ch\u01B0a c\xF3 ai xem Story n\xE0y." }), h && p === "ready" && n.jsx("button", { className: "story-viewers-more", onClick: () => void C(f + 1), children: "Xem th\xEAm" })] })] });
}
const db = 50 * 1024 * 1024, ub = 500 * 1024 * 1024;
function hb(e, a) {
  return { id: `story-${Date.now()}-${a}-${crypto.randomUUID()}`, file: e, fileName: e.name, previewUrl: URL.createObjectURL(e), mediaType: e.type.startsWith("video/") ? "VIDEO" : "IMAGE", status: "ready", fit: "contain", background: "black", muted: false, music: null, musicStart: null, musicEnd: null };
}
function mb(e) {
  const a = e.type.startsWith("image/"), t = e.type.startsWith("video/");
  return !a && !t ? "Ch\u1EC9 h\u1ED7 tr\u1EE3 t\u1EC7p \u1EA3nh ho\u1EB7c video." : a && e.size > db ? "\u1EA2nh kh\xF4ng \u0111\u01B0\u1EE3c v\u01B0\u1EE3t qu\xE1 50 MB." : t && e.size > ub ? "Video kh\xF4ng \u0111\u01B0\u1EE3c v\u01B0\u1EE3t qu\xE1 500 MB." : null;
}
function Et(e) {
  const a = Math.max(0, e ?? 0), t = Math.floor(a / 60), i = Math.floor(a % 60);
  return `${String(t).padStart(2, "0")}:${String(i).padStart(2, "0")}`;
}
function gb({ userId: e, onClose: a, onPublished: t, onDraftSaved: i, initialDraft: r }) {
  async function s(O) {
    if (!O.file) throw new Error("Story media file is unavailable.");
    if (O.mediaType !== "IMAGE") return O.file;
    const K = new Image();
    K.src = O.previewUrl, await new Promise((de, Le) => {
      K.onload = () => de(), K.onerror = () => Le(new Error("Kh?ng th? ??c ?nh Story."));
    });
    const X = document.createElement("canvas");
    X.width = 1080, X.height = 1920;
    const H = X.getContext("2d");
    if (!H) return O.file;
    H.fillStyle = O.background === "soft" ? "#d7d7d1" : "#090c0f", H.fillRect(0, 0, X.width, X.height);
    const _ = O.fit === "cover" ? Math.max(X.width / K.naturalWidth, X.height / K.naturalHeight) : Math.min(X.width / K.naturalWidth, X.height / K.naturalHeight), le = K.naturalWidth * _, Me = K.naturalHeight * _;
    H.drawImage(K, (X.width - le) / 2, (X.height - Me) / 2, le, Me);
    const Te = await new Promise((de) => X.toBlob(de, "image/jpeg", 0.92));
    return Te ? new File([Te], `${O.file.name.replace(/\.[^.]+$/, "")}-story.jpg`, { type: "image/jpeg" }) : O.file;
  }
  const f = o.useRef(null), c = o.useRef(/* @__PURE__ */ new Set()), [d, u] = o.useState([]), [h, m] = o.useState(null), [p, g] = o.useState("edit"), [C, y] = o.useState(""), [I, T] = o.useState([]), [j, E] = o.useState(false), [b, N] = o.useState(false), [k, B] = o.useState(0), [z, x] = o.useState(true), w = o.useRef(0), [Y, V] = o.useState(false), [P, D] = o.useState(false), [q, ne] = o.useState(false), [be, he] = o.useState(""), [re, me] = o.useState(null), we = o.useRef(null), F = d.find((O) => O.id === h) ?? d[0] ?? null, ze = d.filter((O) => O.status !== "published").length, Se = d.length > 0 && d.every((O) => O.status === "published"), ye = d.length > 0 && !P && d.some((O) => O.status !== "published"), ue = F ? d.findIndex((O) => O.id === F.id) : -1;
  o.useEffect(() => {
    var O;
    if (!(!(r != null && r.payload) || r.draftType !== "STORY" || we.current === r.id)) {
      we.current = r.id;
      try {
        const X = JSON.parse(r.payload).filter((H) => !!H.secureUrl).map((H, _) => ({ id: H.id ?? `restored-story-${_}-${crypto.randomUUID()}`, file: null, fileName: H.fileName ?? `story-${_ + 1}`, previewUrl: H.secureUrl ?? "", secureUrl: H.secureUrl, publicId: H.publicId, resourceType: H.resourceType, mediaType: H.mediaType === "VIDEO" ? "VIDEO" : "IMAGE", status: "ready", fit: H.fit ?? "contain", background: H.background ?? "black", muted: H.muted ?? false, music: H.music ?? null, musicStart: H.musicStart ?? null, musicEnd: H.musicEnd ?? null }));
        u(X), m(((O = X[0]) == null ? void 0 : O.id) ?? null), X.forEach((H) => c.current.add(H.previewUrl));
      } catch {
        he("Kh\xF4ng th\u1EC3 kh\xF4i ph\u1EE5c b\u1EA3n nh\xE1p Story.");
      }
    }
  }, [r]), o.useEffect(() => {
    if (!Y) return;
    const O = ++w.current, K = new AbortController(), X = window.setTimeout(async () => {
      T([]), B(0), x(true), E(true);
      try {
        const H = await fe(`/musics?page=0&size=10&keyword=${encodeURIComponent(C)}`, { signal: K.signal });
        if (O !== w.current) return;
        T(H.content ?? []), B(H.pageNumber ?? 0), x((H.pageNumber ?? 0) + 1 < (H.totalPages ?? 0));
      } catch {
        !K.signal.aborted && O === w.current && T([]);
      } finally {
        !K.signal.aborted && O === w.current && E(false);
      }
    }, 180);
    return () => {
      window.clearTimeout(X), K.abort();
    };
  }, [Y, C]);
  async function ke() {
    if (j || b || !z) return;
    const O = w.current, K = k + 1;
    N(true);
    try {
      const X = await fe(`/musics?page=${K}&size=10&keyword=${encodeURIComponent(C)}`);
      if (O !== w.current) return;
      T((H) => {
        const _ = new Set(H.map((le) => le.id));
        return [...H, ...(X.content ?? []).filter((le) => !_.has(le.id))];
      }), B(X.pageNumber ?? K), x((X.pageNumber ?? K) + 1 < (X.totalPages ?? 0));
    } finally {
      O === w.current && N(false);
    }
  }
  o.useEffect(() => () => {
    c.current.forEach((O) => URL.revokeObjectURL(O));
  }, []);
  function Ne(O) {
    const K = [], X = [];
    if (Array.from(O).forEach((_) => {
      const le = mb(_);
      le ? X.push(`${_.name}: ${le}`) : K.push(_);
    }), X.length && he(X[0]), !K.length) return;
    const H = K.map(hb);
    H.forEach((_) => c.current.add(_.previewUrl)), u((_) => [..._, ...H]), m((_) => _ ?? H[0].id), g("edit");
  }
  function se(O, K) {
    u((X) => X.map((H) => H.id === O ? { ...H, ...K } : H));
  }
  function $e(O) {
    u((K) => {
      var _;
      const X = K.find((le) => le.id === O), H = K.filter((le) => le.id !== O);
      return X && !H.some((le) => le.previewUrl === X.previewUrl) && (URL.revokeObjectURL(X.previewUrl), c.current.delete(X.previewUrl)), h === O && m(((_ = H[Math.min(K.findIndex((le) => le.id === O), H.length - 1)]) == null ? void 0 : _.id) ?? null), H;
    });
  }
  function xe() {
    if (!F) return;
    const O = { ...F, id: `story-${Date.now()}-${crypto.randomUUID()}`, status: "ready", error: void 0 };
    u((K) => {
      const X = K.findIndex((_) => _.id === F.id), H = [...K];
      return H.splice(X + 1, 0, O), H;
    }), m(O.id);
  }
  function Qe(O) {
    F && u((K) => {
      const X = K.findIndex((le) => le.id === F.id), H = X + O;
      if (X < 0 || H < 0 || H >= K.length) return K;
      const _ = [...K];
      return [_[X], _[H]] = [_[H], _[X]], _;
    });
  }
  function De(O) {
    !re || re === O || (u((K) => {
      const X = K.findIndex((Me) => Me.id === re), H = K.findIndex((Me) => Me.id === O);
      if (X < 0 || H < 0) return K;
      const _ = [...K], [le] = _.splice(X, 1);
      return _.splice(H, 0, le), _;
    }), me(null));
  }
  function Ze(O) {
    if (!F) return;
    const K = Math.max(1, Math.floor(O.duration ?? 30));
    se(F.id, { music: O, musicStart: 0, musicEnd: Math.min(30, K) }), V(false);
  }
  function Ge(O) {
    if (!(F != null && F.music)) return;
    const K = F.musicEnd ?? O + 1;
    se(F.id, { musicStart: Math.min(O, Math.max(0, K - 1)) });
  }
  function Ee(O) {
    if (!(F != null && F.music)) return;
    const K = F.musicStart ?? 0;
    se(F.id, { musicEnd: Math.max(K + 1, O) });
  }
  async function Q() {
    var X, H;
    D(true);
    const O = await Promise.all(d.map(async (_) => _.secureUrl ? { secureUrl: _.secureUrl, publicId: _.publicId ?? "", resourceType: _.resourceType ?? _.mediaType.toLowerCase() } : ga(await s(_)))), K = { id: (r == null ? void 0 : r.id) ?? `story-draft-${Date.now()}`, draftType: "STORY", mediaCount: d.length, captionPreview: ((X = d[0]) == null ? void 0 : X.fileName) ?? "Story draft", updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
    try {
      await ie(`/me/${encodeURIComponent(e)}/drafts`, "POST", { id: (r == null ? void 0 : r.id) ?? null, draftType: "STORY", thumbnailUrl: ((H = O[0]) == null ? void 0 : H.secureUrl) ?? null, mediaCount: d.length, captionPreview: K.captionPreview, payload: JSON.stringify(d.map((_, le) => {
        var Me, Te, de;
        return { id: _.id, fileName: _.fileName, mediaType: _.mediaType, secureUrl: (Me = O[le]) == null ? void 0 : Me.secureUrl, publicId: (Te = O[le]) == null ? void 0 : Te.publicId, resourceType: (de = O[le]) == null ? void 0 : de.resourceType, fit: _.fit, background: _.background, muted: _.muted, music: _.music, musicStart: _.musicStart, musicEnd: _.musicEnd };
      })) }), i == null || i(K), D(false), a();
    } catch {
      D(false), ne(false), he("Kh\xF4ng th\u1EC3 l\u01B0u b\u1EA3n nh\xE1p Story.");
    }
  }
  async function oe() {
    var K;
    if (!ye) return;
    D(true), he("");
    let O = 0;
    for (const X of d) if (X.status !== "published") try {
      se(X.id, { status: "uploading", error: void 0 });
      const H = X.secureUrl ? { secureUrl: X.secureUrl, publicId: X.publicId ?? "", resourceType: X.resourceType ?? X.mediaType.toLowerCase() } : await ga(await s(X));
      se(X.id, { status: "publishing" }), await ie("/profile-media/stories", "POST", { userId: e, mediaUrl: H.secureUrl, musicId: ((K = X.music) == null ? void 0 : K.id) ?? null, musicUrl: null, musicStart: X.music ? X.musicStart : null, musicEnd: X.music ? X.musicEnd : null }), se(X.id, { status: "published" });
    } catch (H) {
      O += 1, se(X.id, { status: "failed", error: H instanceof Error ? H.message : "Kh\xF4ng th\u1EC3 \u0111\u0103ng Story." });
    }
    if (D(false), O > 0) {
      he(`${O} Story ch\u01B0a \u0111\u0103ng \u0111\u01B0\u1EE3c. C\xE1c Story c\xF2n l\u1EA1i \u0111\xE3 \u0111\u01B0\u1EE3c gi\u1EEF nguy\xEAn.`);
      return;
    }
    await t(), window.dispatchEvent(new CustomEvent("app-toast", { detail: "Story \u0111ang \u0111\u01B0\u1EE3c x\u1EED l\xFD v\xE0 s\u1EBD s\u1EDBm hi\u1EC3n th\u1ECB." })), a();
  }
  function ee() {
    d.some((O) => O.status !== "published") ? ne(true) : a();
  }
  const ge = o.useMemo(() => F ? `story-studio-media ${F.fit} background-${F.background}` : "story-studio-media empty", [F]);
  return n.jsx("div", { className: "story-studio-backdrop", role: "dialog", "aria-modal": "true", "aria-label": "T\u1EA1o Story", children: n.jsxs("section", { className: "story-studio", children: [n.jsxs("header", { className: "story-studio-header", children: [n.jsx("button", { className: "story-studio-icon", onClick: ee, "aria-label": "\u0110\xF3ng tr\xECnh t\u1EA1o Story", children: n.jsx(pe, { size: 21 }) }), n.jsxs("div", { children: [n.jsx("strong", { children: "T\u1EA1o Story" }), n.jsx("span", { children: d.length ? `${d.length} Story trong phi\xEAn n\xE0y` : "Canvas 9:16" })] }), n.jsxs("div", { className: "story-studio-steps", "aria-label": "Ti\u1EBFn tr\xECnh t\u1EA1o Story", children: [n.jsx("button", { className: p === "edit" ? "active" : "", onClick: () => g("edit"), children: "Ch\u1EC9nh s\u1EEDa" }), n.jsx("button", { className: p === "review" ? "active" : "", onClick: () => g("review"), disabled: !d.length, children: "Xem l\u1EA1i" })] })] }), n.jsxs("div", { className: "story-studio-body", children: [n.jsxs("aside", { className: "story-draft-rail", "aria-label": "Danh s\xE1ch Story", children: [n.jsxs("button", { className: "story-draft-add", onClick: () => {
    var O;
    return (O = f.current) == null ? void 0 : O.click();
  }, "aria-label": "Th\xEAm \u1EA3nh ho\u1EB7c video", children: [n.jsx(Pa, { size: 20 }), n.jsx("span", { children: "Th\xEAm" })] }), d.map((O, K) => n.jsxs("button", { draggable: true, onDragStart: () => me(O.id), onDragOver: (X) => X.preventDefault(), onDrop: () => De(O.id), className: `story-draft-tile ${(F == null ? void 0 : F.id) === O.id ? "active" : ""} ${O.status}`, onClick: () => {
    m(O.id), g("edit");
  }, children: [O.mediaType === "VIDEO" ? n.jsx("video", { src: O.previewUrl, muted: true, playsInline: true }) : n.jsx("img", { src: O.previewUrl, alt: "" }), n.jsx("span", { children: String(K + 1).padStart(2, "0") }), O.status === "published" && n.jsx(gn, { size: 14 }), O.status === "failed" && n.jsx(xn, { size: 14 })] }, O.id)), n.jsx("input", { ref: f, type: "file", accept: "image/*,video/*", multiple: true, hidden: true, onChange: (O) => {
    O.target.files && Ne(O.target.files), O.target.value = "";
  } })] }), n.jsx("main", { className: "story-studio-workspace", children: p === "edit" ? n.jsxs(n.Fragment, { children: [n.jsxs("div", { className: ge, children: [F ? F.mediaType === "VIDEO" ? n.jsx("video", { src: F.previewUrl, muted: F.muted, playsInline: true, controls: true }) : n.jsx("img", { src: F.previewUrl, alt: F.fileName }) : n.jsxs("button", { onClick: () => {
    var O;
    return (O = f.current) == null ? void 0 : O.click();
  }, children: [n.jsx(An, { size: 34 }), n.jsx("strong", { children: "Ch\u1ECDn \u1EA3nh ho\u1EB7c video" }), n.jsx("span", { children: "T\u1EA1o m\u1ED9t ho\u1EB7c nhi\u1EC1u Story trong c\xF9ng phi\xEAn." })] }), (F == null ? void 0 : F.music) && n.jsxs("div", { className: "story-studio-attribution", children: [n.jsx(vn, { size: 14 }), n.jsx("span", { children: F.music.displayName })] })] }), F && n.jsxs("div", { className: "story-studio-item-nav", children: [n.jsx("button", { onClick: () => {
    var O;
    return m(((O = d[ue - 1]) == null ? void 0 : O.id) ?? F.id);
  }, disabled: ue <= 0, "aria-label": "Story tr\u01B0\u1EDBc", children: n.jsx(dn, { size: 19 }) }), n.jsxs("span", { children: [String(ue + 1).padStart(2, "0"), " / ", String(d.length).padStart(2, "0")] }), n.jsx("button", { onClick: () => {
    var O;
    return m(((O = d[ue + 1]) == null ? void 0 : O.id) ?? F.id);
  }, disabled: ue >= d.length - 1, "aria-label": "Story ti\u1EBFp theo", children: n.jsx(Cn, { size: 19 }) })] })] }) : n.jsxs("section", { className: "story-review", children: [n.jsxs("header", { children: [n.jsx("strong", { children: "Xem l\u1EA1i chu\u1ED7i Story" }), n.jsxs("span", { children: [d.length, " m\u1EE5c s\u1EBD \u0111\u01B0\u1EE3c \u0111\u0103ng theo th\u1EE9 t\u1EF1 b\xEAn d\u01B0\u1EDBi."] })] }), n.jsx("div", { children: d.map((O, K) => n.jsxs("button", { onClick: () => {
    m(O.id), g("edit");
  }, children: [O.mediaType === "VIDEO" ? n.jsx("video", { src: O.previewUrl, muted: true }) : n.jsx("img", { src: O.previewUrl, alt: "" }), n.jsxs("span", { children: [n.jsxs("strong", { children: [String(K + 1).padStart(2, "0"), " \xB7 ", O.fileName] }), n.jsx("small", { children: O.music ? `${O.music.displayName} \xB7 ${Et(O.musicStart)}\u2013${Et(O.musicEnd)}` : "Kh\xF4ng c\xF3 nh\u1EA1c" })] }), n.jsx("em", { className: O.status, children: O.status === "failed" ? "Th\u1EED l\u1EA1i" : O.status })] }, O.id)) })] }) }), n.jsx("aside", { className: "story-studio-tools", children: F ? n.jsxs(n.Fragment, { children: [n.jsxs("div", { className: "story-tool-heading", children: [n.jsxs("span", { children: [n.jsx(To, { size: 16 }), " Story ", String(ue + 1).padStart(2, "0")] }), n.jsx("small", { children: F.fileName })] }), n.jsxs("section", { children: [n.jsx("label", { children: "Hi\u1EC3n th\u1ECB media" }), n.jsxs("div", { className: "story-studio-segmented", children: [n.jsx("button", { className: F.fit === "contain" ? "active" : "", onClick: () => se(F.id, { fit: "contain" }), children: "V\u1EEBa khung" }), n.jsx("button", { className: F.fit === "cover" ? "active" : "", onClick: () => se(F.id, { fit: "cover" }), children: "Ph\u1EE7 khung" })] })] }), n.jsxs("section", { children: [n.jsx("label", { children: "N\u1EC1n canvas" }), n.jsx("div", { className: "story-background-options", children: ["black", "soft", "blur"].map((O) => n.jsx("button", { className: `${O} ${F.background === O ? "active" : ""}`, onClick: () => se(F.id, { background: O }), "aria-label": `N\u1EC1n ${O}` }, O)) })] }), F.mediaType === "VIDEO" && n.jsxs("button", { className: "story-studio-row", onClick: () => se(F.id, { muted: !F.muted }), children: [F.muted ? n.jsx(Xt, { size: 18 }) : n.jsx(Oa, { size: 18 }), n.jsxs("span", { children: [n.jsx("strong", { children: "\xC2m thanh video" }), n.jsx("small", { children: F.muted ? "\u0110ang t\u1EAFt" : "\u0110ang b\u1EADt" })] })] }), n.jsxs("section", { className: "story-studio-music", children: [n.jsxs("div", { className: "story-tool-label", children: [n.jsxs("span", { children: [n.jsx(vn, { size: 17 }), " Nh\u1EA1c cho Story n\xE0y"] }), F.music && n.jsx("button", { onClick: () => se(F.id, { music: null, musicStart: null, musicEnd: null }), children: "X\xF3a" })] }), F.music ? n.jsxs("div", { className: "story-selected-music", children: [n.jsxs("button", { className: "story-music-summary", onClick: () => V(true), children: [n.jsxs("span", { children: [n.jsx("strong", { children: F.music.displayName }), n.jsx("small", { children: F.music.singleName || F.music.category || "Music" })] }), n.jsx("span", { children: "Thay" })] }), n.jsxs("label", { children: ["B\u1EAFt \u0111\u1EA7u ", n.jsx("output", { children: Et(F.musicStart) }), n.jsx("input", { type: "range", min: 0, max: Math.max(1, Math.floor(F.music.duration ?? 60) - 1), value: F.musicStart ?? 0, onChange: (O) => Ge(Number(O.target.value)) })] }), n.jsxs("label", { children: ["K\u1EBFt th\xFAc ", n.jsx("output", { children: Et(F.musicEnd) }), n.jsx("input", { type: "range", min: 1, max: Math.max(1, Math.floor(F.music.duration ?? 60)), value: F.musicEnd ?? 1, onChange: (O) => Ee(Number(O.target.value)) })] })] }) : n.jsxs("button", { className: "story-add-music", onClick: () => V(true), children: [n.jsx(vn, { size: 18 }), " Ch\u1ECDn nh\u1EA1c"] })] }), n.jsxs("div", { className: "story-studio-order-actions", children: [n.jsxs("button", { onClick: () => Qe(-1), disabled: ue <= 0, children: [n.jsx(dn, { size: 17 }), " L\xF9i"] }), n.jsxs("button", { onClick: () => Qe(1), disabled: ue >= d.length - 1, children: ["Ti\u1EBFn ", n.jsx(Cn, { size: 17 })] })] }), n.jsxs("div", { className: "story-studio-item-actions", children: [n.jsxs("button", { onClick: xe, children: [n.jsx(Yl, { size: 17 }), " Nh\xE2n b\u1EA3n"] }), n.jsxs("button", { className: "danger", onClick: () => $e(F.id), children: [n.jsx(da, { size: 17 }), " X\xF3a"] })] })] }) : n.jsxs("div", { className: "story-tools-empty", children: [n.jsx(Lt, { size: 24 }), n.jsx("span", { children: "C\xF4ng c\u1EE5 s\u1EBD xu\u1EA5t hi\u1EC7n sau khi b\u1EA1n ch\u1ECDn media." })] }) })] }), n.jsxs("footer", { className: "story-studio-footer", children: [n.jsx("span", { children: be || (Se ? "T\u1EA5t c\u1EA3 Story \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi." : `${ze} Story s\u1EB5n s\xE0ng`) }), n.jsxs("div", { children: [p === "edit" && n.jsx("button", { onClick: () => g("review"), disabled: !d.length, children: "Xem l\u1EA1i" }), n.jsxs("button", { className: "primary", onClick: () => void oe(), disabled: !ye, children: [P ? n.jsx(xn, { className: "spin", size: 17 }) : n.jsx(vt, { size: 17 }), P ? "\u0110ang \u0111\u0103ng..." : "\u0110\u0103ng Story"] })] })] }), Y && n.jsx("div", { className: "story-music-overlay", role: "dialog", "aria-modal": "true", "aria-label": "Ch\u1ECDn nh\u1EA1c", children: n.jsxs("div", { className: "story-music-browser", children: [n.jsxs("header", { children: [n.jsxs("div", { children: [n.jsx("strong", { children: "Ch\u1ECDn nh\u1EA1c" }), n.jsx("span", { children: "\xC1p d\u1EE5ng ri\xEAng cho Story \u0111ang ch\u1ECDn." })] }), n.jsx("button", { onClick: () => V(false), "aria-label": "\u0110\xF3ng danh s\xE1ch nh\u1EA1c", children: n.jsx(pe, { size: 19 }) })] }), n.jsx("input", { autoFocus: true, value: C, onChange: (O) => y(O.target.value), placeholder: "T\xECm ki\u1EBFm b\xE0i h\xE1t..." }), n.jsx("div", { children: j ? n.jsx("p", { children: "\u0110ang t\xECm ki\u1EBFm..." }) : I.length ? I.map((O) => {
    var K;
    return n.jsxs("button", { onClick: () => Ze(O), children: [n.jsxs("span", { children: [n.jsx("strong", { children: O.displayName }), n.jsx("small", { children: O.singleName || O.category || "Music" })] }), ((K = F == null ? void 0 : F.music) == null ? void 0 : K.id) === O.id ? n.jsx(gn, { size: 17 }) : n.jsx(Pa, { size: 17 })] }, O.id);
  }) : n.jsx("p", { children: "Kh\xF4ng t\xECm th\u1EA5y b\xE0i h\xE1t." }) }), z && n.jsx("button", { className: "story-music-load-more", onClick: () => void ke(), disabled: b, children: b ? "Loading more..." : "Load more tracks" })] }) }), q && n.jsx("div", { className: "story-close-prompt", role: "alertdialog", "aria-modal": "true", children: n.jsxs("div", { children: [n.jsx("strong", { children: "L\u01B0u b\u1EA3n nh\xE1p tr\u01B0\u1EDBc khi tho\xE1t?" }), n.jsx("span", { children: "C\xE1c media ch\u01B0a \u0111\u0103ng s\u1EBD b\u1ECB m\u1EA5t n\u1EBFu b\u1EA1n b\u1ECF qua." }), n.jsx("button", { onClick: () => void Q(), children: "L\u01B0u b\u1EA3n nh\xE1p" }), n.jsx("button", { className: "danger", onClick: a, children: "B\u1ECF b\u1EA3n nh\xE1p" }), n.jsx("button", { onClick: () => ne(false), children: "Ti\u1EBFp t\u1EE5c ch\u1EC9nh s\u1EEDa" })] }) })] }) });
}
const pb = "social-media-story-seen";
function nl(e) {
  return `${pb}:${e}`;
}
function bb(e) {
  try {
    const a = JSON.parse(localStorage.getItem(nl(e)) ?? "[]");
    return new Set(Array.isArray(a) ? a.filter((t) => typeof t == "string") : []);
  } catch {
    return /* @__PURE__ */ new Set();
  }
}
function wb(e, a) {
  try {
    localStorage.setItem(nl(e), JSON.stringify(Array.from(a).slice(-500)));
  } catch {
  }
}
function po(e, a) {
  return e.state === "seen" || e.status === "SEEN" || a.has(e.id);
}
function yb(e, a, t) {
  const i = /* @__PURE__ */ new Map();
  return e.forEach((r, s) => {
    const f = i.get(r.userId);
    f ? f.items.push(r) : i.set(r.userId, { firstPosition: s, items: [r] });
  }), Array.from(i.entries()).map(([r, s]) => {
    const f = [...s.items].sort((d, u) => new Date(d.createdAt ?? 0).getTime() - new Date(u.createdAt ?? 0).getTime()), c = f.filter((d) => po(d, t)).length;
    return { ownerId: r, firstPosition: s.firstPosition, seenCount: c, fullySeen: c === f.length, items: f.map((d) => ({ ...d, totalItems: f.length, seenItems: c, state: d.state === "muted" ? "muted" : po(d, t) ? "seen" : "unseen" })) };
  }).sort((r, s) => {
    const f = r.ownerId === a, c = s.ownerId === a;
    return f !== c ? f ? -1 : 1 : r.fullySeen !== s.fullySeen ? r.fullySeen ? 1 : -1 : r.firstPosition - s.firstPosition;
  }).flatMap((r) => r.items);
}
function jb(e) {
  const a = /* @__PURE__ */ new Map();
  return e.forEach((t) => {
    const i = a.get(t.userId);
    i ? i.push(t) : a.set(t.userId, [t]);
  }), Array.from(a.values()).map((t) => {
    const r = t.find((f) => f.state === "unseen") ?? t[t.length - 1], s = t.filter((f) => f.state === "seen").length;
    return { ...r, totalItems: t.length, seenItems: s, state: r.state === "muted" ? "muted" : s >= t.length ? "seen" : "unseen" };
  });
}
function Mb(e, a) {
  const t = e.findIndex((i) => i.userId === a && i.state === "unseen");
  return t >= 0 ? t : Math.max(0, e.findIndex((i) => i.userId === a));
}
const Oi = { list(e, a = 0, t = 8, i) {
  return fe(`/search/users/suggested?viewerId=${encodeURIComponent(e)}&page=${a}&size=${t}`, { signal: i });
}, refresh(e, a = 0, t = 30) {
  return ie(`/search/users/suggested/refresh?viewerId=${encodeURIComponent(e)}&page=${a}&size=${t}`, "POST");
}, follow(e, a) {
  return ie("/user-followers/follow", "POST", { followerId: e, followingId: a });
} };
function vb({ viewerId: e, onOpenProfile: a, onOpenChat: t }) {
  const [i, r] = o.useState([]), [s, f] = o.useState("loading"), [c, d] = o.useState(false), [u, h] = o.useState(/* @__PURE__ */ new Set());
  o.useEffect(() => {
    const g = new AbortController();
    return f("loading"), Oi.list(e, 0, 30, g.signal).then((C) => {
      r(C.content ?? []), f("ready");
    }).catch(() => {
      g.signal.aborted || f("error");
    }), () => g.abort();
  }, [e]);
  async function m() {
    f("loading");
    try {
      const g = await Oi.refresh(e);
      r(g.content ?? []), f("ready");
    } catch {
      f("error");
    }
  }
  async function p(g) {
    h((C) => new Set(C).add(g.userId));
    try {
      await Oi.follow(e, g.userId), r((C) => C.map((y) => y.userId === g.userId ? { ...y, viewerFollowsUser: true } : y));
    } finally {
      h((C) => {
        const y = new Set(C);
        return y.delete(g.userId), y;
      });
    }
  }
  return n.jsxs("section", { className: "suggested-friends-panel", children: [n.jsxs("header", { children: [n.jsxs("div", { children: [n.jsx("strong", { children: "G\u1EE3i \xFD cho b\u1EA1n" }), n.jsx("span", { children: "D\u1EF1a tr\xEAn h\u1ED3 s\u01A1 v\xE0 k\u1EBFt n\u1ED1i chung" })] }), n.jsx("button", { type: "button", onClick: () => void m(), "aria-label": "L\xE0m m\u1EDBi g\u1EE3i \xFD", children: n.jsx(xn, { size: 17 }) })] }), s === "loading" ? n.jsx("div", { className: "suggestion-skeleton", children: [0, 1, 2].map((g) => n.jsx("i", {}, g)) }) : null, s === "error" ? n.jsx(qc, { message: "Kh\xF4ng th\u1EC3 t\u1EA3i g\u1EE3i \xFD", onRetry: () => void m() }) : null, s === "ready" && i.length === 0 ? n.jsx(Wc, { title: "Ch\u01B0a c\xF3 g\u1EE3i \xFD ph\xF9 h\u1EE3p" }) : null, s === "ready" && i.length ? n.jsx("div", { className: "suggested-friends-list", children: i.slice(0, 5).map((g) => n.jsxs("article", { children: [n.jsxs("button", { type: "button", className: "suggested-user", onClick: () => void a(g.userId), children: [n.jsx(Zt, { src: g.avatarUrl, alt: "" }), n.jsxs("span", { children: [n.jsx("strong", { children: g.fullName || g.username }), n.jsxs("small", { children: ["@", g.username] })] })] }), n.jsxs("div", { children: [g.viewerFollowsUser ? n.jsx("button", { type: "button", "aria-label": "Nh\u1EAFn tin", onClick: () => void t(g.userId), children: n.jsx(fn, { size: 17 }) }) : n.jsxs("button", { type: "button", onClick: () => void p(g), disabled: u.has(g.userId), children: [n.jsx(ls, { size: 16 }), g.userFollowsViewer ? "Theo d\xF5i l\u1EA1i" : "Theo d\xF5i"] }), n.jsx("button", { type: "button", "aria-label": "\u1EA8n g\u1EE3i \xFD", onClick: () => r((C) => C.filter((y) => y.userId !== g.userId)), children: n.jsx(pe, { size: 15 }) })] })] }, g.userId)) }) : null, i.length > 5 ? n.jsxs("button", { type: "button", className: "suggestions-see-all", onClick: () => d(true), children: [n.jsx(Bn, { size: 16 }), " Xem t\u1EA5t c\u1EA3"] }) : null, c ? n.jsx("div", { className: "suggestions-dialog-backdrop", role: "presentation", onMouseDown: (g) => {
    g.target === g.currentTarget && d(false);
  }, children: n.jsxs("section", { className: "suggestions-dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": "suggestions-title", children: [n.jsxs("header", { children: [n.jsx("strong", { id: "suggestions-title", children: "Ng\u01B0\u1EDDi d\xF9ng t\u01B0\u01A1ng t\u1EF1" }), n.jsx("button", { type: "button", onClick: () => d(false), "aria-label": "\u0110\xF3ng", children: n.jsx(pe, { size: 18 }) })] }), n.jsx("div", { className: "suggested-friends-list", children: i.map((g) => n.jsxs("article", { children: [n.jsxs("button", { type: "button", className: "suggested-user", onClick: () => {
    d(false), a(g.userId);
  }, children: [n.jsx(Zt, { src: g.avatarUrl, alt: "" }), n.jsxs("span", { children: [n.jsx("strong", { children: g.fullName || g.username }), n.jsxs("small", { children: ["@", g.username] })] })] }), n.jsxs("div", { children: [g.viewerFollowsUser ? n.jsx("button", { type: "button", "aria-label": "Nh\u1EAFn tin", onClick: () => void t(g.userId), children: n.jsx(fn, { size: 17 }) }) : n.jsxs("button", { type: "button", onClick: () => void p(g), disabled: u.has(g.userId), children: [n.jsx(ls, { size: 16 }), g.userFollowsViewer ? "Theo d\xF5i l\u1EA1i" : "Theo d\xF5i"] }), n.jsx("button", { type: "button", "aria-label": "\u1EA8n g\u1EE3i \xFD", onClick: () => r((C) => C.filter((y) => y.userId !== g.userId)), children: n.jsx(pe, { size: 15 }) })] })] }, g.userId)) })] }) }) : null] });
}
const Hn = { saved(e, a = 0, t = 30) {
  return fe(`/me/${encodeURIComponent(e)}/saved?page=${a}&size=${t}`);
}, drafts(e) {
  return fe(`/me/${encodeURIComponent(e)}/drafts`);
}, archive(e, a) {
  const t = a ? `?type=${a}` : "";
  return fe(`/me/${encodeURIComponent(e)}/archive${t}`);
}, storyArchive(e, a = 0, t = 100) {
  return fe(`/profile-media/${encodeURIComponent(e)}/stories?page=${a}&size=${t}&mediaType=STORY`);
}, removeSaved(e, a) {
  return ie(`/me/${encodeURIComponent(e)}/saved/items/${encodeURIComponent(a)}`, "DELETE");
}, deleteDraft(e, a) {
  return ie(`/me/${encodeURIComponent(e)}/drafts/${encodeURIComponent(a)}`, "DELETE");
}, restoreArchive(e, a) {
  return ie(`/me/${encodeURIComponent(e)}/archive/${encodeURIComponent(a)}/restore`, "POST");
}, deleteArchive(e, a) {
  return ie(`/me/${encodeURIComponent(e)}/archive/items/${encodeURIComponent(a)}`, "DELETE");
} };
function Lb({ userId: e, onOpenPost: a, onOpenStory: t, onResumeDraft: i }) {
  const [r, s] = o.useState("SAVED"), [f, c] = o.useState("POST"), [d, u] = o.useState([]), [h, m] = o.useState([]), [p, g] = o.useState([]), [C, y] = o.useState([]), [I, T] = o.useState("loading"), j = o.useCallback(async () => {
    T("loading");
    try {
      const [x, w, Y, V] = await Promise.all([Hn.saved(e), Hn.drafts(e), Hn.archive(e, "POST"), Hn.storyArchive(e)]);
      u(x.content ?? []), m(w ?? []), g(Y ?? []), y(V.content ?? []), T("ready");
    } catch {
      T("error");
    }
  }, [e]);
  o.useEffect(() => {
    j();
  }, [j]);
  async function E(x) {
    await Hn.removeSaved(e, x.postId), u((w) => w.filter((Y) => Y.id !== x.id));
  }
  async function b(x) {
    await Hn.deleteDraft(e, x.id), m((w) => w.filter((Y) => Y.id !== x.id));
  }
  async function N(x) {
    await Hn.restoreArchive(e, x.contentId), g((w) => w.filter((Y) => Y.id !== x.id));
  }
  async function k(x) {
    await Hn.deleteArchive(e, x.id), g((w) => w.filter((Y) => Y.id !== x.id));
  }
  const B = p.filter((x) => x.contentType.toUpperCase().includes("POST")), z = r === "SAVED" ? d.length : r === "DRAFTS" ? h.length : B.length + C.length;
  return n.jsxs("section", { className: "screen feature-library", children: [n.jsxs("header", { className: "feature-library-header", children: [n.jsxs("div", { children: [n.jsx("span", { children: "Th\u01B0 vi\u1EC7n c\xE1 nh\xE2n" }), n.jsx("h2", { children: "Kho n\u1ED9i dung" }), n.jsxs("p", { children: [z, " m\u1EE5c"] })] }), n.jsx("button", { onClick: () => void j(), "aria-label": "T\u1EA3i l\u1EA1i", children: n.jsx(xn, { size: 18 }) })] }), n.jsxs("nav", { className: "feature-library-tabs", "aria-label": "C\xE1c ph\u1EA7n th\u01B0 vi\u1EC7n", children: [n.jsxs("button", { className: r === "SAVED" ? "active" : "", onClick: () => s("SAVED"), children: [n.jsx(Kt, { size: 18 }), "\u0110\xE3 l\u01B0u"] }), n.jsxs("button", { className: r === "DRAFTS" ? "active" : "", onClick: () => s("DRAFTS"), children: [n.jsx(fs, { size: 18 }), "B\u1EA3n nh\xE1p"] }), n.jsxs("button", { className: r === "ARCHIVE" ? "active" : "", onClick: () => s("ARCHIVE"), children: [n.jsx(Dn, { size: 18 }), "Kho l\u01B0u tr\u1EEF"] })] }), I === "loading" && n.jsx("div", { className: "feature-library-grid loading", children: Array.from({ length: 6 }, (x, w) => n.jsx("span", {}, w)) }), I === "error" && n.jsx(at, { title: "Kh\xF4ng th\u1EC3 t\u1EA3i th\u01B0 vi\u1EC7n", action: "Th\u1EED l\u1EA1i", onAction: () => void j() }), I === "ready" && r === "SAVED" && (d.length ? n.jsx("div", { className: "feature-library-grid", children: d.map((x) => n.jsxs("article", { children: [n.jsxs("button", { className: "library-preview placeholder", onClick: () => a(x.postId), children: [n.jsx(Do, { size: 26 }), n.jsx("small", { children: "B\xE0i vi\u1EBFt" })] }), n.jsxs("div", { children: [n.jsx("strong", { children: x.postId.slice(0, 12) }), n.jsx("button", { onClick: () => void E(x), "aria-label": "B\u1ECF l\u01B0u", children: n.jsx(da, { size: 17 }) })] })] }, x.id)) }) : n.jsx(at, { title: "Ch\u01B0a c\xF3 b\xE0i vi\u1EBFt \u0111\xE3 l\u01B0u" })), I === "ready" && r === "DRAFTS" && (h.length ? n.jsx("div", { className: "feature-library-grid", children: h.map((x) => n.jsxs("article", { children: [n.jsxs("button", { className: "library-preview", onClick: () => i(x), children: [x.thumbnailUrl ? n.jsx("img", { src: x.thumbnailUrl, alt: "" }) : n.jsx(fs, { size: 26 }), n.jsx("small", { children: x.draftType })] }), n.jsxs("div", { children: [n.jsx("strong", { children: x.captionPreview || "B\u1EA3n nh\xE1p ch\u01B0a \u0111\u1EB7t t\xEAn" }), n.jsx("button", { onClick: () => void b(x), "aria-label": "X\xF3a b\u1EA3n nh\xE1p", children: n.jsx(da, { size: 17 }) })] })] }, x.id)) }) : n.jsx(at, { title: "Ch\u01B0a c\xF3 b\u1EA3n nh\xE1p" })), I === "ready" && r === "ARCHIVE" && n.jsxs(n.Fragment, { children: [n.jsxs("div", { className: "feature-library-filter", children: [n.jsx("button", { className: f === "POST" ? "active" : "", onClick: () => c("POST"), children: "B\xE0i vi\u1EBFt" }), n.jsx("button", { className: f === "STORY" ? "active" : "", onClick: () => c("STORY"), children: "Story" })] }), f === "POST" ? B.length ? n.jsx("div", { className: "feature-library-grid", children: B.map((x) => n.jsxs("article", { children: [n.jsxs("button", { className: "library-preview", onClick: () => a(x.contentId), children: [x.thumbnailUrl ? n.jsx("img", { src: x.thumbnailUrl, alt: "" }) : n.jsx(Dn, { size: 26 }), n.jsx("small", { children: "B\xE0i vi\u1EBFt" })] }), n.jsxs("div", { children: [n.jsx("strong", { children: x.captionPreview || x.contentId.slice(0, 12) }), n.jsxs("span", { children: [n.jsx("button", { onClick: () => void N(x), "aria-label": "Kh\xF4i ph\u1EE5c", children: n.jsx(ed, { size: 17 }) }), n.jsx("button", { onClick: () => void k(x), "aria-label": "X\xF3a v\u0129nh vi\u1EC5n", children: n.jsx(da, { size: 17 }) })] })] })] }, x.id)) }) : n.jsx(at, { title: "Ch\u01B0a c\xF3 b\xE0i vi\u1EBFt l\u01B0u tr\u1EEF" }) : C.length ? n.jsx("div", { className: "feature-library-grid story-archive-grid", children: C.map((x) => {
    var w;
    return n.jsxs("article", { children: [n.jsxs("button", { className: "library-preview", onClick: () => t(x.id), children: [x.mediaUrl ? (w = x.mediaType) != null && w.toUpperCase().includes("VIDEO") ? n.jsx("video", { src: x.mediaUrl, muted: true, preload: "metadata" }) : n.jsx("img", { src: x.mediaUrl, alt: "" }) : n.jsx(Dn, { size: 26 }), n.jsx("small", { children: "Story" })] }), n.jsx("div", { children: n.jsx("strong", { children: x.createdAt ? new Date(x.createdAt).toLocaleDateString("vi-VN") : x.id.slice(0, 12) }) })] }, x.id);
  }) }) : n.jsx(at, { title: "Ch\u01B0a c\xF3 Story l\u01B0u tr\u1EEF" })] })] });
}
function at({ title: e, action: a, onAction: t }) {
  return n.jsxs("div", { className: "feature-library-state", children: [n.jsx(Dn, { size: 24 }), n.jsx("strong", { children: e }), a && n.jsx("button", { onClick: t, children: a })] });
}
const bo = { get(e) {
  return fe(`/me/${encodeURIComponent(e)}/settings`);
}, update(e, a) {
  return ie(`/me/${encodeURIComponent(e)}/settings`, "PATCH", a);
} };
function $n({ title: e, description: a, children: t }) {
  return n.jsxs("section", { className: "settings-feature-group", children: [n.jsxs("header", { children: [n.jsx("h3", { children: e }), a && n.jsx("p", { children: a })] }), n.jsx("div", { children: t })] });
}
function jn({ label: e, detail: a, checked: t, onChange: i }) {
  return n.jsxs("label", { className: "settings-feature-row", children: [n.jsxs("span", { children: [n.jsx("strong", { children: e }), a && n.jsx("small", { children: a })] }), n.jsx("input", { type: "checkbox", checked: t, onChange: i }), n.jsx("i", { "aria-hidden": "true" })] });
}
function Vn({ label: e, value: a, options: t, onChange: i }) {
  return n.jsxs("div", { className: "settings-feature-choice", children: [n.jsx("strong", { children: e }), n.jsx("div", { children: t.map((r) => n.jsx("button", { className: a === r.value ? "active" : "", onClick: () => i(r.value), children: r.label }, r.value)) })] });
}
const Cb = [{ id: "appearance", label: "Ng\xF4n ng\u1EEF v\xE0 giao di\u1EC7n", icon: Hl }, { id: "privacy", label: "Trang c\xE1 nh\xE2n v\xE0 quy\u1EC1n ri\xEAng t\u01B0", icon: Oo }, { id: "posts", label: "B\xE0i vi\u1EBFt", icon: Fl }, { id: "feed", label: "B\u1EA3ng tin v\xE0 n\u1ED9i dung", icon: Ql }, { id: "messages", label: "Tin nh\u1EAFn", icon: fn }, { id: "notifications", label: "Th\xF4ng b\xE1o", icon: ct }];
function xb({ userId: e }) {
  const [a, t] = o.useState("appearance"), [i, r] = o.useState(null), [s, f] = o.useState("loading"), { theme: c, setTheme: d } = Dl(), { locale: u, setLocale: h } = Al(), m = o.useCallback(async () => {
    f("loading");
    try {
      r(await bo.get(e)), f("ready");
    } catch {
      f("error");
    }
  }, [e]);
  o.useEffect(() => {
    m();
  }, [m]);
  async function p(I) {
    const T = i;
    r(I), f("saving");
    try {
      const j = await bo.update(e, I);
      r(j), f("ready");
    } catch {
      r(T), f("error");
    }
  }
  function g(I, T) {
    i && p({ ...i, [I]: T });
  }
  function C(I) {
    i && typeof i[I] == "boolean" && g(I, !i[I]);
  }
  function y(I) {
    d(I), g("theme", I.toUpperCase());
  }
  return n.jsxs("section", { className: "screen settings-feature", children: [n.jsxs("header", { className: "settings-feature-title", children: [n.jsxs("div", { children: [n.jsx("span", { children: "C\xE0i \u0111\u1EB7t" }), n.jsx("h2", { children: "Ki\u1EC3m so\xE1t tr\u1EA3i nghi\u1EC7m c\u1EE7a b\u1EA1n" })] }), n.jsx("small", { className: s, children: s === "saving" ? "\u0110ang l\u01B0u..." : s === "error" ? "Kh\xF4ng th\u1EC3 l\u01B0u thay \u0111\u1ED5i" : "" })] }), n.jsxs("div", { className: "settings-feature-layout", children: [n.jsx("nav", { children: Cb.map((I) => {
    const T = I.icon;
    return n.jsxs("button", { className: a === I.id ? "active" : "", onClick: () => t(I.id), children: [n.jsx(T, { size: 18 }), n.jsx("span", { children: I.label })] }, I.id);
  }) }), n.jsxs("main", { children: [s === "loading" && n.jsx("div", { className: "settings-feature-loading" }), s === "error" && !i && n.jsx("button", { className: "settings-feature-retry", onClick: () => void m(), children: "Th\u1EED t\u1EA3i l\u1EA1i" }), i && a === "appearance" && n.jsxs(n.Fragment, { children: [n.jsx($n, { title: "Ng\xF4n ng\u1EEF", children: n.jsx(Vn, { label: "Ng\xF4n ng\u1EEF \u1EE9ng d\u1EE5ng", value: u, options: [{ value: "vi", label: "Ti\u1EBFng Vi\u1EC7t" }, { value: "en", label: "English" }], onChange: (I) => h(I) }) }), n.jsxs($n, { title: "Giao di\u1EC7n", children: [n.jsx(Vn, { label: "Ch\u1EBF \u0111\u1ED9 m\xE0u", value: c, options: [{ value: "system", label: "Theo h\u1EC7 th\u1ED1ng" }, { value: "light", label: "S\xE1ng" }, { value: "dark", label: "T\u1ED1i" }], onChange: (I) => y(I) }), n.jsx(jn, { label: "Gi\u1EA3m chuy\u1EC3n \u0111\u1ED9ng", checked: i.reducedMotion, onChange: () => C("reducedMotion") }), n.jsx(jn, { label: "T\u0103ng \u0111\u1ED9 t\u01B0\u01A1ng ph\u1EA3n", checked: i.highContrast, onChange: () => C("highContrast") }), n.jsxs("label", { className: "settings-feature-range", children: [n.jsx("span", { children: "C\u1EE1 ch\u1EEF" }), n.jsx("input", { type: "range", min: "0.8", max: "1.4", step: "0.1", value: i.textScale, onChange: (I) => g("textScale", Number(I.target.value)) }), n.jsxs("strong", { children: [i.textScale.toFixed(1), "x"] })] })] })] }), i && a === "privacy" && n.jsx(n.Fragment, { children: n.jsxs($n, { title: "Quy\u1EC1n ri\xEAng t\u01B0", children: [n.jsx(Vn, { label: "T\xE0i kho\u1EA3n", value: i.accountVisibility, options: [{ value: "PUBLIC", label: "C\xF4ng khai" }, { value: "PRIVATE", label: "Ri\xEAng t\u01B0" }], onChange: (I) => g("accountVisibility", I) }), n.jsx(Vn, { label: "Ai c\xF3 th\u1EC3 xem Story", value: i.storyVisibility, options: [{ value: "EVERYONE", label: "M\u1ECDi ng\u01B0\u1EDDi" }, { value: "FOLLOWERS", label: "Ng\u01B0\u1EDDi theo d\xF5i" }, { value: "FRIENDS", label: "B\u1EA1n b\xE8" }], onChange: (I) => g("storyVisibility", I) }), n.jsx(jn, { label: "Hi\u1EC3n th\u1ECB tr\u1EA1ng th\xE1i ho\u1EA1t \u0111\u1ED9ng", checked: i.activityStatusVisible, onChange: () => C("activityStatusVisible") }), n.jsx(jn, { label: "Duy\u1EC7t tag tr\u01B0\u1EDBc khi hi\u1EC3n th\u1ECB", checked: i.tagApprovalRequired, onChange: () => C("tagApprovalRequired") })] }) }), i && a === "posts" && n.jsxs($n, { title: "T\u01B0\u01A1ng t\xE1c m\u1EB7c \u0111\u1ECBnh", children: [n.jsx(Vn, { label: "Ai c\xF3 th\u1EC3 b\xECnh lu\u1EADn", value: i.commentPermission, options: [{ value: "EVERYONE", label: "M\u1ECDi ng\u01B0\u1EDDi" }, { value: "FOLLOWERS", label: "Ng\u01B0\u1EDDi theo d\xF5i" }, { value: "FRIENDS", label: "B\u1EA1n b\xE8" }, { value: "NONE", label: "Kh\xF4ng ai" }], onChange: (I) => g("commentPermission", I) }), n.jsx(Vn, { label: "Ai c\xF3 th\u1EC3 mention", value: i.mentionPermission, options: [{ value: "EVERYONE", label: "M\u1ECDi ng\u01B0\u1EDDi" }, { value: "FOLLOWERS", label: "Ng\u01B0\u1EDDi theo d\xF5i" }, { value: "FRIENDS", label: "B\u1EA1n b\xE8" }, { value: "NONE", label: "Kh\xF4ng ai" }], onChange: (I) => g("mentionPermission", I) }), n.jsx(jn, { label: "Lu\xF4n hi\u1EC3n th\u1ECB caption", checked: i.alwaysShowCaptions, onChange: () => C("alwaysShowCaptions") })] }), i && a === "feed" && n.jsxs($n, { title: "Media v\xE0 n\u1ED9i dung", children: [n.jsx(Vn, { label: "T\u1EF1 \u0111\u1ED9ng ph\xE1t video", value: i.autoplayVideo, options: [{ value: "ALWAYS", label: "Lu\xF4n lu\xF4n" }, { value: "WIFI_ONLY", label: "Ch\u1EC9 Wi-Fi" }, { value: "NEVER", label: "Kh\xF4ng bao gi\u1EDD" }], onChange: (I) => g("autoplayVideo", I) }), n.jsx(Vn, { label: "N\u1ED9i dung nh\u1EA1y c\u1EA3m", value: i.sensitiveContentLevel, options: [{ value: "LESS", label: "\xCDt h\u01A1n" }, { value: "STANDARD", label: "Ti\xEAu chu\u1EA9n" }, { value: "MORE", label: "Nhi\u1EC1u h\u01A1n" }], onChange: (I) => g("sensitiveContentLevel", I) })] }), i && a === "messages" && n.jsxs($n, { title: "Tr\u1EA1ng th\xE1i tin nh\u1EAFn", children: [n.jsx(jn, { label: "G\u1EEDi tr\u1EA1ng th\xE1i \u0111\xE3 xem", checked: i.readReceiptsEnabled, onChange: () => C("readReceiptsEnabled") }), n.jsx(jn, { label: "Th\xF4ng b\xE1o tin nh\u1EAFn", checked: i.messagesEnabled, onChange: () => C("messagesEnabled") })] }), i && a === "notifications" && n.jsxs(n.Fragment, { children: [n.jsxs($n, { title: "Lo\u1EA1i th\xF4ng b\xE1o", children: [n.jsx(jn, { label: "L\u01B0\u1EE3t th\xEDch", checked: i.likesEnabled, onChange: () => C("likesEnabled") }), n.jsx(jn, { label: "B\xECnh lu\u1EADn", checked: i.commentsEnabled, onChange: () => C("commentsEnabled") }), n.jsx(jn, { label: "Ng\u01B0\u1EDDi theo d\xF5i", checked: i.followsEnabled, onChange: () => C("followsEnabled") }), n.jsx(jn, { label: "Story", checked: i.storiesEnabled, onChange: () => C("storiesEnabled") }), n.jsx(jn, { label: "Push notification", checked: i.pushEnabled, onChange: () => C("pushEnabled") })] }), n.jsx($n, { title: "Quy\u1EC1n thi\u1EBFt b\u1ECB", children: n.jsx(Jg, { userId: e }) })] })] })] })] });
}
const al = [{ id: "home", label: "Home", icon: cr }, { id: "search", label: "Search", icon: ma }, { id: "create", label: "Create", icon: An }, { id: "notifications", label: "Alerts", icon: ct }, { id: "library", label: "Library", icon: lt }, { id: "chat", label: "Chat", icon: fn }, { id: "profile", label: "Profile", icon: ur }, { id: "settings", label: "Settings", icon: Po }], rt = "social-media-active-view", ir = "social-media-active-feed-tab", st = "social-media-profile-user", Ib = /* @__PURE__ */ new Set(["home", "search", "create", "profile", "notifications", "library", "settings", "chat", "states"]);
function Sb() {
  try {
    const e = sessionStorage.getItem(rt);
    return e && Ib.has(e) ? e : "home";
  } catch {
    return "home";
  }
}
function kb() {
  try {
    return sessionStorage.getItem(ir) === "FRIENDS" ? "FRIENDS" : "DISCOVER";
  } catch {
    return "DISCOVER";
  }
}
function Nb() {
  try {
    return sessionStorage.getItem(st);
  } catch {
    return null;
  }
}
const wo = { saved: [], drafts: [], archive: [] }, Eb = 50 * 1024 * 1024, Tb = 500 * 1024 * 1024, Bt = "feed-music-owner", rr = "feed-music-suspend";
let tl = false;
const Ui = /* @__PURE__ */ new Map();
function yo(e, a) {
  a > 0 ? Ui.set(e, a) : Ui.delete(e);
  let t = null, i = 0.59;
  Ui.forEach((r, s) => {
    r > i && (i = r, t = s);
  }), window.dispatchEvent(new CustomEvent(Bt, { detail: t }));
}
function Bi(e) {
  tl = e, window.dispatchEvent(new CustomEvent(rr, { detail: e }));
}
function Db() {
  const e = /* @__PURE__ */ new Set(), a = () => document.hidden || !document.hasFocus();
  function t(s) {
    !s.paused && !s.ended && e.add(s), s.pause();
  }
  function i() {
    if (a()) {
      document.querySelectorAll("audio, video").forEach(t);
      return;
    }
    const s = Array.from(e);
    e.clear(), s.forEach((f) => {
      document.contains(f) && !f.ended && f.play().catch(() => {
      });
    });
  }
  function r(s) {
    if (!a()) return;
    const f = s.target;
    f instanceof HTMLMediaElement && (e.add(f), f.pause());
  }
  return document.addEventListener("visibilitychange", i), document.addEventListener("play", r, true), window.addEventListener("blur", i), window.addEventListener("focus", i), a() && i(), () => {
    document.removeEventListener("visibilitychange", i), document.removeEventListener("play", r, true), window.removeEventListener("blur", i), window.removeEventListener("focus", i), e.clear();
  };
}
function L2() {
  const [e, a] = o.useState(null), [t, i] = o.useState("loading"), [r, s] = o.useState(Sb), [f, c] = o.useState([]), [d, u] = o.useState(kb), h = o.useRef({ DISCOVER: 0, FRIENDS: 0 }), [m, p] = o.useState([]), [g, C] = o.useState(0), [y, I] = o.useState(true), [T, j] = o.useState(false), E = o.useRef(false), b = o.useRef(0), [N, k] = o.useState([]), [B, z] = o.useState(null), [x, w] = o.useState(null), [Y, V] = o.useState(Nb), [P, D] = o.useState("FOLLOWERS"), [q, ne] = o.useState(false), [be, he] = o.useState(wo), [re, me] = o.useState(null), [we, F] = o.useState(null), [ze, Se] = o.useState("idle"), [ye, ue] = o.useState(""), [ke, Ne] = o.useState(""), [se, $e] = o.useState(0), [xe, Qe] = o.useState(false), [De, Ze] = o.useState(null), [Ge, Ee] = o.useState(false), [Q, oe] = o.useState(null), [ee, ge] = o.useState(/* @__PURE__ */ new Set()), [O, K] = o.useState(null), [X, H] = o.useState(null), [_, le] = o.useState(null), Me = o.useRef(false);
  o.useEffect(() => {
    e != null && e.userId && ge(bb(e.userId));
  }, [e == null ? void 0 : e.userId]), o.useEffect(() => {
    de();
  }, []), o.useEffect(() => Db(), []), o.useEffect(() => {
    if (Me.current) return;
    const l = Za(window.location.href);
    if (!e) {
      l && Pi(l);
      return;
    }
    const S = Ag() ?? l;
    Me.current = true, S && (v(S), window.history.replaceState(window.history.state, "", "/"));
  }, [e == null ? void 0 : e.userId]), o.useEffect(() => Bg((l) => {
    if (!e) {
      Pi(l);
      return;
    }
    v(l);
  }), [e == null ? void 0 : e.userId]), o.useEffect(() => {
    if (!(e != null && e.userId)) {
      oo();
      return;
    }
    return Zc({ getActiveDestination: () => r === "chat" && O ? { kind: "conversation", conversationId: O.conversationId } : re ? { kind: "post", postId: re.id } : null, onReceived: () => {
      r === "notifications" && window.dispatchEvent(new Event("notification-refresh"));
    } }), () => oo();
  }, [e == null ? void 0 : e.userId, r, O == null ? void 0 : O.conversationId, re == null ? void 0 : re.id]), o.useEffect(() => {
    try {
      sessionStorage.setItem(rt, r);
    } catch {
    }
  }, [r]), o.useEffect(() => {
    try {
      sessionStorage.setItem(ir, d);
    } catch {
    }
  }, [d]), o.useEffect(() => {
    e && Ve(r, e.userId, d);
  }, [r, d, e == null ? void 0 : e.userId, Y]), o.useEffect(() => {
    function l(S) {
      const M = S.detail;
      M && Te(M);
    }
    return window.addEventListener("app-toast", l), () => window.removeEventListener("app-toast", l);
  }, []), o.useEffect(() => {
    Bi(!!re);
  }, [re]), o.useEffect(() => {
    if (!re) return;
    const l = document.body, S = document.documentElement, M = window.scrollY, U = { position: l.style.position, top: l.style.top, right: l.style.right, left: l.style.left, width: l.style.width, overflow: l.style.overflow, paddingRight: l.style.paddingRight }, W = S.style.overflow, Z = Math.max(0, window.innerWidth - S.clientWidth);
    return S.style.overflow = "hidden", l.style.position = "fixed", l.style.top = "-" + M + "px", l.style.right = "0", l.style.left = "0", l.style.width = "100%", l.style.overflow = "hidden", Z > 0 && (l.style.paddingRight = Z + "px"), () => {
      S.style.overflow = W, l.style.position = U.position, l.style.top = U.top, l.style.right = U.right, l.style.left = U.left, l.style.width = U.width, l.style.overflow = U.overflow, l.style.paddingRight = U.paddingRight, window.scrollTo({ top: M, left: 0, behavior: "auto" });
    };
  }, [re == null ? void 0 : re.id]), o.useEffect(() => {
    if (!(e != null && e.userId)) return;
    const l = new EventSource(`${Ua}/posts/sse/${encodeURIComponent(e.userId)}`, { withCredentials: true });
    l.addEventListener("post_upload", (M) => {
      try {
        const U = JSON.parse(M.data);
        Te(U.message || (U.result === "FAILED" ? "Kh\xF4ng th\u1EC3 \u0111\u0103ng t\u1EA3i b\xE0i vi\u1EBFt" : "B\xE0i vi\u1EBFt \u0111\xE3 \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt")), U.result !== "FAILED" && Ve("home", e.userId, d);
      } catch {
        Te("B\xE0i vi\u1EBFt \u0111\xE3 \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt");
      }
    });
    const S = (M) => {
      try {
        const U = JSON.parse(M.data);
        window.dispatchEvent(new CustomEvent("comment-media-result", { detail: U }));
      } catch {
      }
    };
    return l.addEventListener("comment_success_event", S), l.addEventListener("comment_failed_event", S), l.onerror = () => {
    }, () => l.close();
  }, [e == null ? void 0 : e.userId, d]), o.useEffect(() => {
    if (!(e != null && e.userId)) {
      $e(0);
      return;
    }
    let l = false;
    fe(`/chat/conversations?actorId=${encodeURIComponent(e.userId)}&limit=100`).then((U) => {
      l || $e((U.items ?? []).reduce((W, Z) => W + (Z.unreadCount ?? 0), 0));
    }).catch(() => {
    });
    const S = en.subscribe(e.userId, (U) => {
      var W;
      U.type === "MESSAGE_CREATED" && ((W = U.message) == null ? void 0 : W.senderId) !== e.userId && $e((Z) => Z + 1);
    }), M = (U) => {
      const W = Number(U.detail);
      Number.isFinite(W) && $e(Math.max(0, W));
    };
    return window.addEventListener("chat-unread-count", M), () => {
      l = true, S(), window.removeEventListener("chat-unread-count", M);
    };
  }, [e == null ? void 0 : e.userId]);
  function Te(l) {
    Ne(l), window.setTimeout(() => Ne(""), 4200);
  }
  async function de() {
    i("loading");
    try {
      a(await fe("/auth/session")), i("ready");
    } catch {
      a(null), i("idle");
    }
  }
  async function Le(l, S) {
    i("loading"), ue("");
    try {
      a(await ie("/auth/login", "POST", { username: l, password: S, deviceInfo: "social-media-fe" })), i("ready"), c([]);
      try {
        sessionStorage.setItem(rt, "home");
      } catch {
      }
      s("home");
    } catch (M) {
      ue(M instanceof Error ? M.message : "Login failed"), i("error");
    }
  }
  async function Ye() {
    await ie("/auth/logout", "POST").catch(() => {
    });
    try {
      sessionStorage.removeItem(rt), sessionStorage.removeItem(ir), sessionStorage.removeItem(st);
    } catch {
    }
    a(null), c([]), p([]), w(null), V(null), he(wo), i("idle");
  }
  async function Ve(l, S, M) {
    var U, W;
    Se("loading"), ue("");
    try {
      if (l === "home") {
        const Z = ++b.current;
        E.current = false, j(false);
        const ve = await fe(`/home?userId=${encodeURIComponent(S)}&tab=${M}&limit=20&page=0&mediaType=FEED`);
        if (Z !== b.current) return;
        p((((U = ve.feed) == null ? void 0 : U.items) ?? []).map(jo)), k((ve.storyTray ?? []).map(Tt)), C(0), I(!!((W = ve.feed) != null && W.hasMore));
      } else b.current += 1;
      l === "profile" && await $(Y ?? S, false), Se("ready");
    } catch (Z) {
      Se("error"), ue(Z instanceof Error ? Z.message : "Request failed");
    }
  }
  async function an() {
    var U, W;
    if (!e || r !== "home" || ze !== "ready" || !y || E.current) return;
    E.current = true, j(true);
    const l = d, S = b.current, M = g + 1;
    try {
      const Z = await fe(`/home?userId=${encodeURIComponent(e.userId)}&tab=${l}&limit=20&page=${M}&mediaType=FEED`);
      if (S !== b.current) return;
      const ve = (((U = Z.feed) == null ? void 0 : U.items) ?? []).map(jo), rn = new Set(m.map((qa) => qa.id)), Ae = ve.filter((qa) => !rn.has(qa.id));
      p((qa) => [...qa, ...Ae]), C(M), I(!!((W = Z.feed) != null && W.hasMore) && Ae.length > 0);
    } catch (Z) {
      Te(Z instanceof Error ? Z.message : "Kh\xF4ng th\u1EC3 t\u1EA3i th\xEAm b\xE0i vi\u1EBFt");
    } finally {
      E.current = false, j(false);
    }
  }
  async function Xe(l, S) {
    const M = await fe(`/profiles/${encodeURIComponent(l)}/summary?viewerId=${encodeURIComponent(S)}&postLimit=18`);
    return ol(M);
  }
  function Ke(l, S = null) {
    Bi(true), le(S), me(l);
  }
  function We() {
    me(null), Bi(false);
  }
  function Je(l) {
    l !== d && (h.current[d] = window.scrollY, u(l), window.setTimeout(() => window.scrollTo({ top: h.current[l] ?? 0, behavior: "auto" }), 80));
  }
  function A(l, S = null) {
    const M = r === "profile" ? Y : null;
    r === l && M === (l === "profile" ? S : null) || c((W) => [...W, { view: r, profileUserId: M, scrollY: window.scrollY }].slice(-30));
  }
  async function $(l, S = true) {
    if (!e) return;
    const M = await Xe(l, e.userId);
    S && A("profile", l), V(l);
    try {
      sessionStorage.setItem(st, l);
    } catch {
    }
    w(M), me(null), z(null), S && s("profile");
  }
  async function v(l) {
    if (!e) {
      Pi(l);
      return;
    }
    if (Qe(false), l.kind === "home") {
      R("home");
      return;
    }
    if (l.kind === "profile") {
      await $(l.userId);
      return;
    }
    if (l.kind === "post") {
      try {
        const S = await fe(`/posts/${encodeURIComponent(l.postId)}?mediaType=POST`);
        Ke(rs(S), l.commentId ?? null);
      } catch {
        Te("B?i vi?t kh?ng c?n t?n t?i ho?c b?n kh?ng c? quy?n xem");
      }
      return;
    }
    if (l.kind === "conversation") {
      const S = { conversationId: l.conversationId, ...l.messageId ? { messageId: l.messageId } : {}, ...l.messageSeq !== void 0 ? { messageSeq: l.messageSeq } : {}, ...l.panel ? { panel: l.panel } : {} };
      l.surface === "mini" ? Ze({ ...S, nonce: Date.now() }) : (A("chat"), K(S), s("chat"));
      return;
    }
    if (l.kind === "story") try {
      const S = await fe(`/profile-media/${encodeURIComponent(l.ownerId)}/stories?page=0&size=50&mediaType=STORY`);
      let M = null;
      try {
        M = await fe(`/profiles/${encodeURIComponent(l.ownerId)}/summary?viewerId=${encodeURIComponent(e.userId)}&postLimit=0`);
      } catch {
        M = null;
      }
      const U = (S.content ?? []).map((ve) => {
        var rn, Ae;
        return Tt({ ...ve, username: M == null ? void 0 : M.user.username, fullName: M == null ? void 0 : M.user.fullName, avatarUrl: ((rn = M == null ? void 0 : M.currentAvatar) == null ? void 0 : rn.secureUrl) || ((Ae = M == null ? void 0 : M.currentAvatar) == null ? void 0 : Ae.url) });
      });
      if (!U.length) {
        Te("Story kh?ng c?n kh? d?ng");
        return;
      }
      const W = l.storyItemId || l.storyId, Z = W ? Math.max(0, U.findIndex((ve) => ve.id === W)) : 0;
      H(l.scope === "owner" ? U : null), z(Z);
    } catch {
      Te("Kh?ng th? t?i Story");
    }
  }
  async function L(l) {
    if (e) try {
      const S = await ie(`/chat/conversations/direct?actorId=${encodeURIComponent(e.userId)}`, "POST", { targetUserId: l });
      Ze({ conversationId: S.id, nonce: Date.now() });
    } catch (S) {
      Te(S instanceof Error ? S.message : "Kh?ng th? m? cu?c tr? chuy?n");
    }
  }
  function R(l) {
    if (l === "create") {
      Qe(true);
      return;
    }
    const S = l === "profile" && e ? e.userId : null;
    if (A(l, S), ne(false), me(null), z(null), l === "profile" && e) {
      V(e.userId);
      try {
        sessionStorage.setItem(st, e.userId);
      } catch {
      }
    }
    s(l);
  }
  function G() {
    if (re) {
      We();
      return;
    }
    if (B !== null) {
      z(null);
      return;
    }
    if (q) {
      ne(false);
      return;
    }
    const l = f[f.length - 1];
    if (!l) {
      r !== "home" && (V(null), s("home"), window.scrollTo({ top: 0, behavior: "auto" }));
      return;
    }
    if (c((S) => S.slice(0, -1)), ne(false), me(null), z(null), V(l.profileUserId), l.profileUserId) try {
      sessionStorage.setItem(st, l.profileUserId);
    } catch {
    }
    s(l.view), window.setTimeout(() => window.scrollTo({ top: l.scrollY, behavior: "auto" }), 80);
  }
  function J() {
    try {
      sessionStorage.setItem(rt, "home");
    } catch {
    }
    window.location.reload();
  }
  function ae(l) {
    D(l), ne(true);
  }
  function ce(l, S) {
    w((M) => M && { ...M, followerCount: l === "FOLLOWERS" ? Math.max(0, M.followerCount - 1) : M.followerCount, followingCount: l === "FOLLOWING" ? Math.max(0, M.followingCount - 1) : M.followingCount, friendCount: S.friend ? Math.max(0, (M.friendCount ?? 0) - 1) : M.friendCount });
  }
  function Re(l, S) {
    if (!e) return;
    const M = (re == null ? void 0 : re.id) === l ? re : m.find((Z) => Z.id === l) ?? (x == null ? void 0 : x.posts.find((Z) => Z.id === l)) ?? (x == null ? void 0 : x.reposts.find((Z) => Z.id === l)), U = !(M != null && M.viewerState[S]), W = (Z) => {
      if (Z.id !== l) return Z;
      const ve = { ...Z, viewerState: { ...Z.viewerState, [S]: U } };
      return S === "liked" && (ve.engagement = { ...ve.engagement, likes: Math.max(0, ve.engagement.likes + (U ? 1 : -1)) }), S === "reposted" && (ve.engagement = { ...ve.engagement, reposts: Math.max(0, ve.engagement.reposts + (U ? 1 : -1)) }), ve;
    };
    if (p((Z) => Z.map(W)), w((Z) => Z && { ...Z, posts: Z.posts.map(W), reposts: Z.reposts.map(W) }), me((Z) => Z && W(Z)), S === "liked" && ie(`/likes/users/${e.userId}`, "POST", { targetId: l, targetType: "POST" }).catch(() => {
    }), S === "saved" && ie(`/me/${e.userId}/saved/items`, "POST", { postId: l }).catch(() => {
    }), S === "reposted") {
      const Z = U ? "POST" : "DELETE";
      ie(`/posts/${encodeURIComponent(l)}/repost?actorId=${encodeURIComponent(e.userId)}`, Z).then((ve) => {
        const rn = (Ae) => Ae.id === l ? { ...Ae, viewerState: { ...Ae.viewerState, reposted: ve.reposted }, engagement: { ...Ae.engagement, reposts: ve.repostCount } } : Ae;
        p((Ae) => Ae.map(rn)), w((Ae) => Ae && { ...Ae, posts: Ae.posts.map(rn), reposts: Ae.reposts.map(rn) }), me((Ae) => Ae && rn(Ae));
      }).catch(() => {
      });
    }
  }
  function Oe(l) {
    const S = (M) => M.id === l ? { ...M, engagement: { ...M.engagement, comments: M.engagement.comments + 1 } } : M;
    p((M) => M.map(S)), w((M) => M && { ...M, posts: M.posts.map(S), reposts: M.reposts.map(S) }), me((M) => M && S(M));
  }
  function Ue(l) {
    const S = (M) => M.id === l.id ? { ...M, ...l } : M;
    p((M) => M.map(S)), w((M) => M && { ...M, posts: M.posts.map(S), reposts: M.reposts.map(S) }), me((M) => M && S(M));
  }
  async function tn(l) {
    var S;
    !e || l.author.id !== e.userId || (await ie(`/me/${encodeURIComponent(e.userId)}/archive`, "POST", { contentId: l.id, contentType: "POST", thumbnailUrl: ((S = l.media[0]) == null ? void 0 : S.url) ?? null, captionPreview: l.caption.slice(0, 180) }), p((M) => M.filter((U) => U.id !== l.id)), w((M) => M && { ...M, posts: M.posts.filter((U) => U.id !== l.id), reposts: M.reposts.filter((U) => U.id !== l.id) }), (re == null ? void 0 : re.id) === l.id && We(), Te("\u0110\xE3 chuy\u1EC3n b\xE0i vi\u1EBFt v\xE0o Kho l\u01B0u tr\u1EEF"));
  }
  function Yn(l) {
    e && (za.recordView(l, e.userId).catch(() => {
    }), ge((S) => {
      if (S.has(l)) return S;
      const M = new Set(S);
      return M.add(l), wb(e.userId, M), M;
    }));
  }
  function ia(l) {
    if (!x) return;
    const S = (l.stories ?? []).map((M) => Tt({ ...M, username: x.username, fullName: x.displayName, avatarUrl: x.avatarUrl, collectionId: l.id }));
    S.length && (H(S), z(0));
  }
  if (t === "loading") return n.jsx(Ob, {});
  const mn = e ? yb(N, e.userId, ee) : N, ra = X ?? mn;
  if (!e) return n.jsx(Ub, { errorText: ye, loading: false, onLogin: Le });
  const Wa = f.length > 0 || r !== "home";
  return n.jsxs("div", { className: r === "home" ? "app-shell home-shell" : r === "chat" ? "app-shell chat-shell" : "app-shell centered-shell", children: [n.jsx(Qb, { active: r, chatUnreadCount: se, onNavigate: R, onReloadHome: J, onLogout: Ye }), Wa && r !== "chat" && n.jsx("button", { type: "button", className: "app-back-button", onClick: G, "aria-label": "Quay l\u1EA1i m\xE0n tr\u01B0\u1EDBc", title: "Quay l\u1EA1i", children: n.jsx(dn, { size: 20 }) }), n.jsxs("main", { className: "app-main", children: [ze === "error" && n.jsx(_b, { message: ye, onRetry: () => Ve(r, e.userId, d) }), r === "home" && n.jsx(Fb, { userId: e.userId, tab: d, setTab: Je, stories: mn, posts: m, status: ze, hasMore: y, loadingMore: T, onLoadMore: an, onSelectPost: Ke, onCreateStory: () => Ee(true), onSelectStory: (l) => {
    const S = [...mn];
    H(S), z(Mb(S, l.userId));
  }, onTogglePost: Re, onEditPost: F, onArchivePost: tn, onOpenProfile: $ }), r === "search" && n.jsx(Ap, { viewerId: e.userId, onSelectPost: Ke, onOpenProfile: $ }), r === "create" && n.jsx(a2, { userId: e.userId, initialDraft: (Q == null ? void 0 : Q.draftType) === "POST" ? Q : null, onClose: () => {
    oe(null), G();
  }, onDraftSaved: (l) => he((S) => ({ ...S, drafts: [l, ...S.drafts] })), onPublished: () => Ve("home", e.userId, d) }), r === "notifications" && n.jsx(Zg, { userId: e.userId, onNavigate: v }), r === "library" && n.jsx(Lb, { userId: e.userId, onOpenPost: (l) => {
    v({ kind: "post", postId: l });
  }, onOpenStory: (l) => {
    za.archive(e.userId, 0, 100).then((S) => {
      const M = S.content.find((U) => U.id === l);
      M && (H([Tt(M)]), z(0));
    });
  }, onResumeDraft: (l) => {
    oe(l), l.draftType === "STORY" ? Ee(true) : s("create");
  } }), r === "chat" && n.jsx(h2, { userId: e.userId, username: e.username, onOpenProfile: $, initialTarget: O }), r === "profile" && n.jsx(s2, { viewerId: e.userId, profile: x, onSelectPost: Ke, onOpenStoryHighlight: ia, onOpenArchive: () => R("library"), onOpenConnections: ae, onRefresh: async () => {
    x && await $(x.id, false);
  }, onMessage: L, onOpenProfile: $ }), r === "settings" && n.jsx(xb, { userId: e.userId }), r === "states" && n.jsx(w2, {})] }), r === "home" && n.jsx("aside", { className: "right-rail", children: n.jsx(vb, { viewerId: e.userId, onOpenProfile: $, onOpenChat: L }) }), n.jsx(Jb, { active: r, onNavigate: R }), n.jsx(fb, { open: xe, onClose: () => Qe(false), onCreatePost: () => {
    A("create"), s("create");
  }, reelsAvailable: false }), q && n.jsx(l2, { viewerId: e.userId, profile: x, activeTab: P, onTabChange: D, onClose: () => ne(false), onOpenProfile: async (l) => {
    ne(false), await $(l);
  }, onRelationshipRemoved: ce }), B !== null && ra[B] && n.jsx($b, { stories: ra, index: B, currentUserId: e.userId, onClose: () => {
    z(null), H(null);
  }, onSelectIndex: z, onViewed: Yn, onOpenProfile: $ }), Ge && n.jsx(gb, { userId: e.userId, initialDraft: (Q == null ? void 0 : Q.draftType) === "STORY" ? Q : null, onClose: () => {
    Ee(false), oe(null);
  }, onDraftSaved: (l) => he((S) => ({ ...S, drafts: [l, ...S.drafts] })), onPublished: () => Ve("home", e.userId, d) }), re && n.jsx(Kb, { post: re, viewerId: e.userId, targetCommentId: _, onClose: We, onTogglePost: Re, onCommentCreated: Oe, onEdit: () => F(re), onArchive: () => void tn(re), onOpenProfile: $ }), we && n.jsx(tp, { post: we, userId: e.userId, onClose: () => F(null), onSaved: Ue }), r !== "chat" && n.jsx(b2, { userId: e.userId, compactLauncher: r !== "home", onOpenFullChat: () => R("chat"), openConversationRequest: De }), ke && n.jsx("div", { className: "app-global-toast", role: "status", children: ke })] });
}
function is(e) {
  return !(e != null && e.id) || !e.playbackUrl ? null : { id: e.id, displayName: e.displayName || e.id, artist: e.artist, artworkUrl: e.artworkUrl, playbackUrl: e.playbackUrl, segmentStart: e.segmentStart, segmentEnd: e.segmentEnd, duration: e.duration };
}
function il(e, a) {
  return (a ?? []).filter((t) => {
    var i, r;
    return ((i = t.media) == null ? void 0 : i.secureUrl) || ((r = t.media) == null ? void 0 : r.url);
  }).sort((t, i) => (t.orderNumber ?? 0) - (i.orderNumber ?? 0)).map((t, i) => {
    const r = t.media, s = Number(r.width ?? 0), f = Number(r.height ?? 0);
    return { id: t.id || r.assetId || `${e}-${i}`, orderNumber: t.orderNumber ?? void 0, type: (r.resourceType ?? r.mediaFormat ?? "IMAGE").toUpperCase().match(/VIDEO|MP4|WEBM|MOV/) ? "VIDEO" : "IMAGE", url: r.secureUrl || r.url || "", aspectRatio: s > 0 && f > 0 ? f / s : 1.25, alt: r.displayName || t.caption || "Post media", caption: t.caption || null, music: is(t.music) };
  });
}
function rl(e, a) {
  return (a ?? []).map((t, i) => ({ id: t.assetId ?? `${e}-${i}`, type: (t.resourceType ?? "IMAGE").toUpperCase().includes("VIDEO") ? "VIDEO" : "IMAGE", url: t.secureUrl || t.url || "", aspectRatio: 1.25, alt: t.displayName || "Post media", caption: null, music: null })).filter((t) => t.url);
}
function jo(e) {
  const a = il(e.postId, e.items), t = a.length ? a : rl(e.postId, e.media);
  return { id: e.postId, author: { id: e.userId, username: e.authorUsername || e.userId, displayName: e.authorFullName || e.authorUsername || e.userId, avatarUrl: e.authorAvatarUrl || "" }, createdAt: e.createdAt ?? (/* @__PURE__ */ new Date()).toISOString(), layoutVariant: t.length ? "STANDARD" : "TEXT", mediaRatio: ei(e.mediaRatio), caption: e.content || "", hashtags: sl(e.hashtags ?? e.hashtag), music: is(e.music), media: t, engagement: { likes: e.likeCount ?? 0, comments: e.commentCount ?? 0, reposts: e.repostCount ?? 0, shares: 0, saves: 0 }, viewerState: { liked: !!e.likedByCurrentUser, saved: false, reposted: !!e.repostedByCurrentUser }, comments: [] };
}
function rs(e) {
  const a = il(e.postId, e.items), t = a.length ? a : rl(e.postId, e.media);
  return { id: e.postId, author: { id: e.userId, username: e.authorUsername || e.userId, displayName: e.authorFullName || e.authorUsername || e.userId, avatarUrl: e.authorAvatarUrl || "" }, createdAt: e.createdAt ?? (/* @__PURE__ */ new Date()).toISOString(), layoutVariant: t.length ? "STANDARD" : "TEXT", mediaRatio: ei(e.mediaRatio), caption: e.content || "", hashtags: sl(e.hashtags ?? e.hashtag), music: is(e.music), media: t, engagement: { likes: e.likeCount ?? 0, comments: e.commentCount ?? 0, reposts: e.repostCount ?? 0, shares: 0, saves: 0 }, viewerState: { liked: !!e.likedByCurrentUser, saved: false, reposted: !!e.repostedByCurrentUser }, comments: [] };
}
function Ab(e, a) {
  const t = rs(a);
  return { ...e, createdAt: t.createdAt, caption: t.caption, hashtags: t.hashtags, mediaRatio: t.mediaRatio, music: t.music, media: t.media.length ? t.media : e.media };
}
function sl(e) {
  if (Array.isArray(e)) return e.map((a) => String(a).replace(/^#/, "")).filter(Boolean);
  if (!e) return [];
  try {
    const a = JSON.parse(e);
    return Array.isArray(a) ? a.map((t) => String(t).replace(/^#/, "")).filter(Boolean) : [];
  } catch {
    return String(e).split(/[ ,]+/).map((a) => a.replace(/^#/, "")).filter(Boolean);
  }
}
function zb(e) {
  const a = Math.max(1, Math.floor((Date.now() - new Date(e).getTime()) / 1e3));
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  if (t < 60) return `${t}m`;
  const i = Math.floor(t / 60);
  return i < 24 ? `${i}h` : `${Math.floor(i / 24)}d`;
}
function Wt(e) {
  const a = new Date(e), t = Math.max(0, Math.floor((Date.now() - a.getTime()) / 1e3));
  if (t < 60) return "v\u1EEBa xong";
  const i = Math.floor(t / 60);
  if (i < 60) return `${i} ph\xFAt tr\u01B0\u1EDBc`;
  const r = Math.floor(i / 60);
  if (r < 24) return `${r} gi\u1EDD tr\u01B0\u1EDBc`;
  const s = Math.floor(r / 24);
  return s <= 7 ? `${s} ng\xE0y tr\u01B0\u1EDBc` : new Intl.DateTimeFormat("vi-VN", { day: "numeric", month: "long", year: "numeric" }).format(a);
}
function Rb(e) {
  const a = e / 1048576;
  return a >= 1 ? `${a.toFixed(a >= 10 ? 0 : 1)} MB` : `${Math.max(1, Math.round(e / 1024))} KB`;
}
function ua(e) {
  return e >= 1e3 ? `${(e / 1e3).toFixed(e >= 1e4 ? 0 : 1)}k` : String(e);
}
function Tt(e) {
  const a = (e.mediaType ?? e.mediaUrl ?? "").toUpperCase().match(/VIDEO|MP4|WEBM|MOV/) ? "VIDEO" : "IMAGE", t = e.username || e.userId;
  return { id: e.id, userId: e.userId, name: e.fullName || t, username: t, avatarUrl: e.avatarUrl || "", mediaUrl: e.mediaUrl || "", mediaType: a, musicId: e.musicId || void 0, musicUrl: e.musicUrl || void 0, musicName: e.musicName || void 0, musicStart: e.musicStart ?? void 0, musicEnd: e.musicEnd ?? void 0, durationSeconds: e.durationSeconds ?? void 0, createdAt: e.createdAt || (/* @__PURE__ */ new Date()).toISOString(), status: e.status || "AVAILABLE", replyEnabled: e.replyEnabled !== false, collectionId: e.collectionId || void 0, totalItems: 1, seenItems: 0, state: e.status === "SEEN" ? "seen" : e.status === "MUTED" ? "muted" : "unseen" };
}
function Mo(e) {
  var a;
  return rs({ ...e, items: (a = e.items) != null && a.length ? e.items : e.firstItem ? [e.firstItem] : [] });
}
function Gi(e) {
  return e.isPublic ?? e.public ?? true;
}
function ol(e) {
  var i, r, s, f;
  const a = (e.recentPosts ?? []).map(Mo), t = (e.repostedPosts ?? []).map(Mo).map((c) => ({ ...c, viewerState: { ...c.viewerState, reposted: true }, engagement: { ...c.engagement, reposts: Math.max(1, c.engagement.reposts) } }));
  return { id: e.user.userId, username: e.user.username || e.user.userId, displayName: e.user.fullName || e.user.username || e.user.userId, avatarUrl: ((i = e.currentAvatar) == null ? void 0 : i.secureUrl) || ((r = e.currentAvatar) == null ? void 0 : r.url) || "", currentCity: ((s = e.user.livingIn) == null ? void 0 : s.trim()) || void 0, hometown: ((f = e.user.hometown) == null ? void 0 : f.trim()) || void 0, hobbies: (e.user.hobbyList ?? []).map((c) => c.trim()).filter(Boolean), jobs: (e.jobs ?? []).map((c) => ({ ...c, isPublic: Gi(c) })), universities: (e.universities ?? []).map((c) => ({ ...c, isGraduate: c.isGraduate ?? c.graduate ?? false, isPublic: Gi(c) })), highSchools: (e.highSchools ?? []).map((c) => ({ ...c, isGraduate: c.isGraduate ?? c.graduate ?? false, isPublic: Gi(c) })), socialLinks: (e.socialMedia ?? []).filter((c) => !!c.link).map((c, d) => ({ id: c.id || `social-${d}`, link: c.link })), followerCount: e.followerCount, followingCount: e.followingCount, friendCount: e.friendCount ?? (e.friend ? 1 : 0), friend: e.friend, viewerFollows: e.viewerFollowsUser, userFollowsViewer: e.userFollowsViewer, posts: a, reposts: t };
}
function fl(e) {
  return e.slice(0, 2).toUpperCase();
}
function cn({ src: e, label: a }) {
  const [t, i] = o.useState(false);
  return o.useEffect(() => i(false), [e]), e && !t ? n.jsx("img", { src: e, alt: "", onError: () => i(true) }) : n.jsx("span", { className: "avatar-fallback", children: fl(a) });
}
function Pb({ compact: e = false }) {
  return n.jsxs("span", { className: e ? "app-logo compact" : "app-logo", children: [n.jsx("span", { className: "logo-glyph", children: n.jsx(Bn, { size: e ? 18 : 20 }) }), !e && n.jsxs("span", { children: [n.jsx("strong", { children: "Pulse" }), n.jsx("small", { children: "Social" })] })] });
}
function Ob() {
  return n.jsx("main", { className: "auth-shell", children: n.jsxs("div", { className: "auth-card", children: [n.jsx(xn, { size: 24 }), n.jsx("h1", { children: "Loading session" })] }) });
}
function Ub({ errorText: e, loading: a, onLogin: t }) {
  const [i, r] = o.useState("signin"), [s, f] = o.useState({ fullName: "", username: "", password: "", confirmPassword: "", email: "", phoneNumber: "", dob: "", sex: "OTHER", livingIn: "", hometown: "", hobbyList: "", role: "USER", code: "" }), [c, d] = o.useState(""), [u, h] = o.useState(""), [m, p] = o.useState(false), [g, C] = o.useState(0), [y, I] = o.useState(false), T = Gb(s.password);
  o.useEffect(() => {
    if (g <= 0) return;
    const D = window.setInterval(() => C((q) => Math.max(0, q - 1)), 1e3);
    return () => window.clearInterval(D);
  }, [g]);
  function j(D, q) {
    f((ne) => ({ ...ne, [D]: q })), d(""), h(""), D === "username" && I(q.toLowerCase().includes("taken") || q.length > 0 && q.length < 4);
  }
  function E() {
    return { fullName: s.fullName.trim(), username: s.username.trim(), password: s.password, email: s.email.trim(), phoneNumber: s.phoneNumber.trim() || null, dob: s.dob || null, sex: s.sex || null, livingIn: s.livingIn.trim() || null, hometown: s.hometown.trim() || null, hobbyList: s.hobbyList.split(",").map((D) => D.trim()).filter(Boolean), role: s.role || "USER" };
  }
  function b(D) {
    window.location.href = `${Ua}/oauth2/authorization/${D}`;
  }
  async function N(D) {
    if (D.preventDefault(), !s.username.trim() || !s.password) {
      d("Enter your username and password.");
      return;
    }
    p(true);
    try {
      await t(s.username.trim(), s.password);
    } catch (q) {
      h(q instanceof Error ? q.message : "Network error");
    } finally {
      p(false);
    }
  }
  async function k(D) {
    if (D == null || D.preventDefault(), !s.fullName.trim() || !s.username.trim() || !s.password || !s.email.trim()) {
      d("Complete full name, username, password and email.");
      return;
    }
    if (y) {
      d("Username unavailable.");
      return;
    }
    if (T.score < 2 || s.password !== s.confirmPassword) {
      d("Check password strength and confirmation.");
      return;
    }
    p(true);
    try {
      await ie("/auth/user-credentials/pre-register", "POST", E()), C(60), r("verifyCreate");
    } catch (q) {
      h(q instanceof Error ? q.message : "Network error");
    } finally {
      p(false);
    }
  }
  async function B(D) {
    if (D.preventDefault(), !s.email.trim() || !s.code.trim()) {
      d("Enter email and verification code.");
      return;
    }
    p(true);
    try {
      await ie("/auth/user-credentials/email-verify-and-create-user", "POST", { email: s.email.trim(), code: s.code.trim() }), r("signin"), f((q) => ({ ...q, code: "" }));
    } catch (q) {
      h(q instanceof Error ? q.message : "Verification failed");
    } finally {
      p(false);
    }
  }
  async function z() {
    g > 0 || m || await k();
  }
  async function x(D) {
    if (D.preventDefault(), !s.email.trim()) {
      d("Enter your email.");
      return;
    }
    p(true);
    try {
      await ie("/auth/user-credentials/check-and-send-code-for-forget-password", "POST", { email: s.email.trim() }), C(60), r("verifyForgot");
    } catch (q) {
      h(q instanceof Error ? q.message : "Network error");
    } finally {
      p(false);
    }
  }
  async function w(D) {
    if (D.preventDefault(), !s.email.trim() || !s.code.trim()) {
      d("Enter email and verification code.");
      return;
    }
    p(true);
    try {
      await ie("/auth/user-credentials/verify-and-send-new-password-to-user", "POST", { email: s.email.trim(), code: s.code.trim() }), r("signin"), f((q) => ({ ...q, code: "" }));
    } catch (q) {
      h(q instanceof Error ? q.message : "Verification failed");
    } finally {
      p(false);
    }
  }
  async function Y() {
    if (!(g > 0 || m || !s.email.trim())) {
      p(true);
      try {
        await ie("/auth/user-credentials/check-and-send-code-for-forget-password", "POST", { email: s.email.trim() }), C(60);
      } catch (D) {
        h(D instanceof Error ? D.message : "Network error");
      } finally {
        p(false);
      }
    }
  }
  const V = [{ id: "google", label: "Google" }, { id: "github", label: "GitHub" }, { id: "facebook", label: "Facebook" }], P = c || u || e;
  return n.jsxs("main", { className: "auth-experience", children: [n.jsx("section", { className: "auth-brand-panel auth-image-panel", "aria-hidden": "true", children: n.jsx("img", { src: td, alt: "" }) }), n.jsx("section", { className: "auth-flow-panel", children: n.jsxs("div", { className: "auth-shell", children: [i !== "signin" && n.jsxs("button", { className: "auth-back", onClick: () => r(i === "create" || i === "forgot" ? "signin" : i === "verifyCreate" ? "create" : "forgot"), children: [n.jsx(dn, { size: 18 }), " Back"] }), i === "signin" && n.jsxs(tt, { title: "Sign in", subtitle: "Access your account with username and password.", children: [n.jsxs("form", { className: "auth-form", onSubmit: N, children: [n.jsx(sn, { label: "Username", value: s.username, onChange: (D) => j("username", D), autoComplete: "username", error: !s.username && c ? "Username is required" : void 0 }), n.jsx(sn, { label: "Password", type: "password", value: s.password, onChange: (D) => j("password", D), autoComplete: "current-password", error: !s.password && c ? "Password is required" : void 0 }), n.jsx("button", { className: "auth-primary", disabled: m || a, children: m || a ? "Signing in" : "Sign in" })] }), n.jsx("button", { className: "auth-link", onClick: () => r("forgot"), children: "Forgot password?" }), n.jsx(Bb, { providers: V, onSelect: b }), n.jsxs("p", { className: "auth-switch", children: ["Don't have an account? ", n.jsx("button", { onClick: () => r("create"), children: "Create account" })] })] }), i === "create" && n.jsxs(tt, { title: "Create account", subtitle: "Enter the account details required by the service.", children: [n.jsxs("form", { className: "auth-form auth-form-wide", onSubmit: k, children: [n.jsx(sn, { label: "Full name", value: s.fullName, onChange: (D) => j("fullName", D), autoComplete: "name", error: c && !s.fullName ? "Full name is required" : void 0 }), n.jsx(sn, { label: "Email", value: s.email, onChange: (D) => j("email", D), autoComplete: "email", inputMode: "email", error: c && !s.email ? "Email is required" : void 0 }), n.jsx(sn, { label: "Phone number", value: s.phoneNumber, onChange: (D) => j("phoneNumber", D), autoComplete: "tel", inputMode: "tel" }), n.jsx(sn, { label: "Username", value: s.username, onChange: (D) => j("username", D), autoComplete: "username", error: y ? "Username unavailable" : void 0 }), n.jsx(sn, { label: "Password", type: "password", value: s.password, onChange: (D) => j("password", D), autoComplete: "new-password" }), n.jsx(Yb, { result: T }), n.jsx(sn, { label: "Confirm password", type: "password", value: s.confirmPassword, onChange: (D) => j("confirmPassword", D), autoComplete: "new-password", error: s.confirmPassword && s.confirmPassword !== s.password ? "Passwords do not match" : void 0 }), n.jsx(sn, { label: "Date of birth", type: "date", value: s.dob, onChange: (D) => j("dob", D) }), n.jsxs("label", { className: "auth-field", children: [n.jsx("span", { children: "Sex" }), n.jsxs("select", { value: s.sex, onChange: (D) => j("sex", D.target.value), children: [n.jsx("option", { value: "OTHER", children: "Other" }), n.jsx("option", { value: "MALE", children: "Male" }), n.jsx("option", { value: "FEMALE", children: "Female" })] })] }), n.jsx(sn, { label: "Living in", value: s.livingIn, onChange: (D) => j("livingIn", D) }), n.jsx(sn, { label: "Hometown", value: s.hometown, onChange: (D) => j("hometown", D) }), n.jsx(sn, { label: "Hobbies", value: s.hobbyList, onChange: (D) => j("hobbyList", D) }), n.jsxs("label", { className: "auth-field", children: [n.jsx("span", { children: "Role" }), n.jsx("select", { value: s.role, onChange: (D) => j("role", D.target.value), children: n.jsx("option", { value: "USER", children: "USER" }) })] }), n.jsx("button", { className: "auth-primary", disabled: m || y, children: m ? "Sending code" : "Create account" })] }), n.jsxs("p", { className: "auth-switch", children: ["Already have an account? ", n.jsx("button", { onClick: () => r("signin"), children: "Sign in" })] })] }), i === "verifyCreate" && n.jsxs(tt, { title: "Verify email", subtitle: "Enter the verification code sent to your email.", children: [n.jsxs("form", { className: "auth-form", onSubmit: B, children: [n.jsx(sn, { label: "Email", value: s.email, onChange: (D) => j("email", D), autoComplete: "email", inputMode: "email" }), n.jsx(sn, { label: "Verification code", value: s.code, onChange: (D) => j("code", D), inputMode: "numeric", error: c ? "Code is required" : void 0 }), n.jsx("button", { className: "auth-primary", disabled: m, children: m ? "Verifying" : "Verify and create" })] }), n.jsx("button", { className: "auth-link", disabled: g > 0 || m, onClick: () => void z(), children: g > 0 ? `Resend in ${g}s` : "Resend code" })] }), i === "forgot" && n.jsxs(tt, { title: "Forgot password", subtitle: "Request a verification code for your email.", children: [n.jsxs("form", { className: "auth-form", onSubmit: x, children: [n.jsx(sn, { label: "Email", value: s.email, onChange: (D) => j("email", D), autoComplete: "email", inputMode: "email", error: c ? "Email is required" : void 0 }), n.jsx("button", { className: "auth-primary", disabled: m, children: m ? "Sending" : "Send verification code" })] }), n.jsxs("p", { className: "auth-switch", children: ["Remembered it? ", n.jsx("button", { onClick: () => r("signin"), children: "Sign in" })] })] }), i === "verifyForgot" && n.jsxs(tt, { title: "Verify email", subtitle: "Confirm the code to receive the reset password response from the service.", children: [n.jsxs("form", { className: "auth-form", onSubmit: w, children: [n.jsx(sn, { label: "Email", value: s.email, onChange: (D) => j("email", D), autoComplete: "email", inputMode: "email" }), n.jsx(sn, { label: "Verification code", value: s.code, onChange: (D) => j("code", D), inputMode: "numeric", error: c ? "Code is required" : void 0 }), n.jsx("button", { className: "auth-primary", disabled: m, children: m ? "Verifying" : "Verify" })] }), n.jsx("button", { className: "auth-link", disabled: g > 0 || m, onClick: () => void Y(), children: g > 0 ? `Resend in ${g}s` : "Resend code" })] }), P && n.jsxs("p", { className: "auth-alert", children: [n.jsx(In, { size: 16 }), " ", P] })] }) })] });
}
function tt({ title: e, subtitle: a, children: t }) {
  return n.jsxs("div", { className: "auth-step-card", children: [n.jsx("h1", { children: e }), n.jsx("p", { children: a }), t] });
}
function sn({ label: e, value: a, onChange: t, type: i = "text", error: r, autoComplete: s, inputMode: f }) {
  return n.jsxs("label", { className: r ? "auth-field error" : "auth-field", children: [n.jsx("span", { children: e }), n.jsx("input", { value: a, type: i, autoComplete: s, inputMode: f, onChange: (c) => t(c.target.value) }), r && n.jsx("small", { children: r })] });
}
function Bb({ providers: e, onSelect: a }) {
  return n.jsxs("div", { className: "social-login", children: [n.jsx("span", { children: "Or continue with" }), e.map((t) => n.jsxs("button", { className: `oauth-button ${t.id}`, onClick: () => a(t.id), children: [n.jsx("span", { className: `oauth-logo ${t.id}`, "aria-hidden": "true", children: t.id === "google" ? "G" : t.id === "github" ? "GH" : "f" }), n.jsx("span", { children: t.label })] }, t.id))] });
}
function Gb(e) {
  let a = 0;
  e.length >= 8 && a++, /[A-Z]/.test(e) && /[a-z]/.test(e) && a++, /\d/.test(e) && a++, /[^A-Za-z0-9]/.test(e) && a++;
  const t = a <= 1 ? "Weak" : a === 2 ? "Fair" : a === 3 ? "Good" : "Strong";
  return { score: a, label: t };
}
function Yb({ result: e }) {
  return n.jsxs("div", { className: "password-meter", children: [n.jsx("span", { children: n.jsx("i", { style: { width: `${Math.max(12, e.score * 25)}%` } }) }), n.jsx("small", { children: e.label })] });
}
function Qb({ active: e, chatUnreadCount: a, onNavigate: t, onReloadHome: i, onLogout: r }) {
  return n.jsxs("nav", { className: "nav-rail", "aria-label": "Main navigation", children: [n.jsx("div", { className: "nav-list", children: al.map((s) => {
    const f = s.icon;
    return n.jsxs("button", { className: e === s.id ? "nav-item active" : "nav-item", onClick: s.id === "home" ? i : () => t(s.id), title: s.label, "aria-label": s.label, children: [n.jsxs("i", { className: "nav-icon-wrap", children: [n.jsx(f, { size: 20 }), s.id === "chat" && a > 0 && n.jsx("em", { className: "nav-unread-badge", children: a > 99 ? "99+" : a })] }), n.jsx("span", { children: s.label })] }, s.id);
  }) }), n.jsxs("button", { className: "nav-item compact logout-nav", onClick: r, title: "Logout", "aria-label": "Logout", children: [n.jsx($l, { size: 20 }), n.jsx("span", { children: "Logout" })] })] });
}
function Jb({ active: e, onNavigate: a }) {
  return n.jsx("nav", { className: "mobile-nav", "aria-label": "Mobile navigation", children: al.slice(0, 5).map((t) => {
    const i = t.icon;
    return n.jsx("button", { className: e === t.id ? "active" : "", onClick: () => a(t.id), "aria-label": t.label, children: n.jsx(i, { size: 21 }) }, t.id);
  }) });
}
function _b({ message: e, onRetry: a }) {
  return n.jsxs("div", { className: "inline-error", children: [n.jsx("span", { children: e }), n.jsx("button", { onClick: a, children: "Retry" })] });
}
function Fb(e) {
  const [a, t] = o.useState(null), i = o.useRef(null);
  o.useEffect(() => {
    const f = i.current;
    if (!f || !e.hasMore || e.loadingMore || e.status !== "ready") return;
    const c = new IntersectionObserver((d) => {
      var u;
      (u = d[0]) != null && u.isIntersecting && e.onLoadMore();
    }, { rootMargin: "600px 0px" });
    return c.observe(f), () => c.disconnect();
  }, [e.hasMore, e.loadingMore, e.status, e.posts.length, e.onLoadMore]);
  function r(f) {
    e.setTab(f);
  }
  function s(f) {
    if (a === null) return;
    const c = a - f;
    Math.abs(c) > 56 && r(c > 0 ? "FRIENDS" : "DISCOVER"), t(null);
  }
  return n.jsxs("section", { className: "screen feed-screen", onTouchStart: (f) => {
    var c;
    return t(((c = f.touches[0]) == null ? void 0 : c.clientX) ?? null);
  }, onTouchEnd: (f) => {
    var c;
    return s(((c = f.changedTouches[0]) == null ? void 0 : c.clientX) ?? 0);
  }, children: [n.jsxs("div", { className: "home-sticky", children: [n.jsx(Hb, { userId: e.userId, items: e.stories, onCreate: e.onCreateStory, onSelect: e.onSelectStory }), n.jsxs("div", { className: "feed-tabs", role: "tablist", "aria-label": "Feed tabs", children: [n.jsx("button", { className: e.tab === "DISCOVER" ? "active" : "", onClick: () => r("DISCOVER"), role: "tab", "aria-selected": e.tab === "DISCOVER", children: "Discover" }), n.jsx("button", { className: e.tab === "FRIENDS" ? "active" : "", onClick: () => r("FRIENDS"), role: "tab", "aria-selected": e.tab === "FRIENDS", children: "Friends" })] })] }), e.status === "loading" && n.jsx(j2, {}), e.status === "error" && n.jsx(Lo, { icon: In, title: "No internet", detail: "Feed could not be loaded from the backend." }), e.status !== "loading" && e.status !== "error" && e.posts.length === 0 && n.jsx(Lo, { icon: e.tab === "FRIENDS" ? Bn : Gl, title: e.tab === "FRIENDS" ? "Empty Friends feed" : "No posts yet", detail: e.tab === "FRIENDS" ? "Mutual friends have not posted yet." : "Discovery has no posts available." }), e.status !== "loading" && e.status !== "error" && n.jsx("div", { className: "post-stack", children: e.posts.map((f, c) => n.jsx(Zb, { index: c + 1, post: f, viewerId: e.userId, onOpen: () => e.onSelectPost(f), onToggle: e.onTogglePost, onEdit: () => e.onEditPost(f), onArchive: () => e.onArchivePost(f), onOpenProfile: e.onOpenProfile }, f.id)) }), e.status === "ready" && e.posts.length > 0 && e.hasMore && n.jsx("div", { ref: i, className: "feed-load-sentinel", "aria-label": "Load more posts", children: e.loadingMore && n.jsx("span", { children: "Loading more..." }) }), e.status === "ready" && e.posts.length > 0 && !e.hasMore && n.jsx("p", { className: "end-feed", children: "End of feed" })] });
}
function Hb({ userId: e, items: a, onCreate: t, onSelect: i }) {
  const r = o.useRef(null), [s, f] = o.useState({ left: false, right: false }), c = jb(a);
  function d() {
    const h = r.current;
    if (!h) return;
    const m = h.scrollWidth - h.clientWidth;
    f({ left: h.scrollLeft > 4, right: h.scrollLeft < m - 4 });
  }
  function u(h) {
    var m;
    (m = r.current) == null || m.scrollBy({ left: h * 300, behavior: "smooth" }), window.setTimeout(d, 240);
  }
  return o.useEffect(() => {
    d();
    const h = r.current;
    if (!h) return;
    h.addEventListener("scroll", d, { passive: true }), window.addEventListener("resize", d);
    const m = new ResizeObserver(d);
    return m.observe(h), () => {
      h.removeEventListener("scroll", d), window.removeEventListener("resize", d), m.disconnect();
    };
  }, [c.length, e]), n.jsxs("div", { className: `story-row-wrap ${s.left ? "can-left" : ""} ${s.right ? "can-right" : ""}`, children: [n.jsx("button", { className: "story-scroll-button previous", onClick: () => u(-1), "aria-label": "Previous stories", hidden: !s.left, children: n.jsx(dn, { size: 16 }) }), n.jsxs("div", { ref: r, className: "story-strip", "aria-label": "Story timeline", children: [n.jsxs("button", { className: "story-item add", onClick: t, "aria-label": "Add story", children: [n.jsx("span", { className: "story-avatar", children: n.jsx(Pa, { size: 18 }) }), n.jsx("span", { children: "Your story" })] }), c.map((h) => n.jsxs("button", { className: `story-item ${h.state}`, title: h.username, onClick: () => i(h), children: [n.jsxs("span", { className: "story-avatar", children: [n.jsx(cn, { src: h.avatarUrl, label: h.username }), h.seenItems > 0 && h.seenItems < h.totalItems && n.jsx("small", { className: "story-partial-count", children: h.totalItems - h.seenItems })] }), n.jsx("span", { children: h.userId === e ? "You" : h.name })] }, h.userId))] }), n.jsx("button", { className: "story-scroll-button next", onClick: () => u(1), "aria-label": "Next stories", hidden: !s.right, children: n.jsx(Cn, { size: 16 }) })] });
}
function $b({ stories: e, index: a, currentUserId: t, onClose: i, onSelectIndex: r, onViewed: s, onOpenProfile: f }) {
  var Ee;
  const c = e[a], d = o.useRef(null), u = o.useRef(null), h = o.useRef(false), m = o.useRef(false), p = o.useRef(false), g = o.useRef(null), [C, y] = o.useState(0), [I, T] = o.useState(false), [j, E] = o.useState(false), [b, N] = o.useState(false), [k, B] = o.useState("loading"), [z, x] = o.useState({}), [w, Y] = o.useState(null), [V, P] = o.useState(false), [D, q] = o.useState(false), [ne, be] = o.useState("idle"), he = a > 0, re = a < e.length - 1, me = (c == null ? void 0 : c.status) === "DELETED" || (c == null ? void 0 : c.status) === "REMOVED", we = (c == null ? void 0 : c.status) === "EXPIRED", F = (c == null ? void 0 : c.mediaType) === "VIDEO" || !!((Ee = c == null ? void 0 : c.mediaUrl) != null && Ee.match(/\.(mp4|webm|mov|m4v)(\?|$)/i)), ze = c ? e.filter((Q) => Q.userId === c.userId) : [], Se = Math.max(0, ze.findIndex((Q) => Q.id === (c == null ? void 0 : c.id))), ye = c ? z[c.id] ?? "" : "", ue = (c == null ? void 0 : c.userId) === t, ke = (c == null ? void 0 : c.replyEnabled) !== false && !me && !we && k !== "network" && k !== "unavailable", Ne = e.reduce((Q, oe, ee) => {
    var ge;
    return (ee === 0 || ((ge = e[ee - 1]) == null ? void 0 : ge.userId) !== oe.userId) && Q.push(ee), Q;
  }, []), se = Math.max(0, Ne.findIndex((Q, oe) => a >= Q && a < (Ne[oe + 1] ?? e.length))), $e = [-2, -1, 1, 2].map((Q) => ({ offset: Q, target: Ne[se + Q] })).filter((Q) => Q.target !== void 0).map((Q) => ({ ...Q, story: e[Q.target] }));
  function xe(Q) {
    const oe = Math.min(e.length - 1, Math.max(0, a + Q));
    oe !== a && (be(Q > 0 ? "forward" : "backward"), r(oe));
  }
  function Qe(Q) {
    c && x((oe) => ({ ...oe, [c.id]: Q }));
  }
  function De(Q) {
    Q.preventDefault(), !(!ye.trim() || !ke || !c) && x((oe) => ({ ...oe, [c.id]: "" }));
  }
  function Ze(Q) {
    if (!w) return;
    const oe = w.x - Q.x, ee = w.y - Q.y;
    Math.abs(ee) > 90 && ee < 0 ? i() : Math.abs(oe) > 54 && xe(oe > 0 ? 1 : -1), Y(null);
  }
  if (o.useEffect(() => {
    const Q = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = Q;
    };
  }, []), o.useEffect(() => {
    const Q = g.current;
    return Q && window.clearTimeout(Q), g.current = window.setTimeout(() => be("idle"), 280), () => {
      g.current && window.clearTimeout(g.current);
    };
  }, [c == null ? void 0 : c.id]), o.useEffect(() => {
    p.current = false, y(0), N(false), P(false), q(false), B(me ? "deleted" : we ? "unavailable" : c != null && c.mediaUrl ? "loading" : "ready");
  }, [c == null ? void 0 : c.id, c == null ? void 0 : c.mediaUrl, me, we]), o.useEffect(() => {
    if (!(c != null && c.mediaUrl) || me || we) return;
    let Q = true;
    const oe = window.setTimeout(() => {
      Q && B("ready");
    }, F ? 1800 : 900);
    if (!F) {
      const ee = new Image();
      ee.onload = () => {
        Q && B("ready");
      }, ee.onerror = () => {
        Q && B("network");
      }, ee.src = c.mediaUrl, ee.complete && ee.naturalWidth > 0 && B("ready");
    }
    return () => {
      Q = false, window.clearTimeout(oe);
    };
  }, [c == null ? void 0 : c.id, c == null ? void 0 : c.mediaUrl, F, me, we]), o.useEffect(() => {
    h.current = I;
  }, [I]), o.useEffect(() => {
    c != null && c.id && k === "ready" && s(c.id);
  }, [c == null ? void 0 : c.id, k, s]), o.useEffect(() => {
    const Q = d.current;
    Q && (I || V ? Q.pause() : Q.play().catch(() => {
    }), Q.muted = j);
  }, [I, j, c == null ? void 0 : c.id, k, V]), o.useEffect(() => {
    var O;
    if ((O = u.current) == null || O.pause(), u.current = null, !(c != null && c.musicUrl) || me || we) return;
    const Q = new Audio(c.musicUrl);
    Q.preload = "auto", Q.loop = !c.musicEnd;
    const oe = Math.max(0, c.musicStart ?? 0), ee = () => {
      Number.isFinite(Q.duration) && (Q.currentTime = Math.min(oe, Math.max(0, Q.duration - 0.05)));
    }, ge = () => {
      c.musicEnd && Q.currentTime >= c.musicEnd && (Q.currentTime = oe, !h.current && !Q.muted && Q.play().catch(() => {
      }));
    };
    return Q.addEventListener("loadedmetadata", ee), Q.addEventListener("timeupdate", ge), u.current = Q, () => {
      Q.pause(), Q.removeEventListener("loadedmetadata", ee), Q.removeEventListener("timeupdate", ge), u.current === Q && (u.current = null);
    };
  }, [c == null ? void 0 : c.id, c == null ? void 0 : c.musicUrl, c == null ? void 0 : c.musicStart, c == null ? void 0 : c.musicEnd, me, we]), o.useEffect(() => {
    const Q = u.current;
    Q && (Q.muted = j, I || V || j || k !== "ready" ? Q.pause() : Q.play().catch(() => {
    }));
  }, [I, j, V, k, c == null ? void 0 : c.id]), o.useEffect(() => {
    var ee;
    if (!c || I || V || k !== "ready") return;
    const Q = F && ((ee = d.current) != null && ee.duration) && Number.isFinite(d.current.duration) ? d.current.duration * 1e3 : (c.durationSeconds ?? 5) * 1e3, oe = window.setInterval(() => {
      y((ge) => {
        if (ge >= 100) return ge;
        const O = Math.min(100, ge + 100 / (Q / 100));
        return O >= 100 && !p.current && (p.current = true, window.setTimeout(() => re ? xe(1) : void 0, 0)), O;
      });
    }, 100);
    return () => window.clearInterval(oe);
  }, [c == null ? void 0 : c.id, I, V, k, F, re, a]), o.useEffect(() => {
    function Q() {
      document.hidden ? (m.current = !h.current, T(true)) : m.current && (m.current = false, T(false));
    }
    function oe(ee) {
      ee.key === "Escape" && i(), ee.key === "ArrowLeft" && xe(-1), ee.key === "ArrowRight" && xe(1), (ee.key === " " || ee.key === "Spacebar") && (ee.preventDefault(), T((ge) => !ge)), ee.key.toLowerCase() === "m" && E((ge) => !ge);
    }
    return document.addEventListener("visibilitychange", Q), window.addEventListener("keydown", oe), () => {
      document.removeEventListener("visibilitychange", Q), window.removeEventListener("keydown", oe);
    };
  }, [a, i, r, e.length]), !c) return null;
  const Ge = ["story-viewer", "immersive", I ? "paused" : "", ne !== "idle" ? `transition-${ne}` : ""].filter(Boolean).join(" ");
  return n.jsxs("div", { className: "story-immersive-backdrop", role: "dialog", "aria-modal": "true", children: [n.jsx("button", { className: "story-app-mark", "aria-label": "Application home", children: n.jsx(Pb, { compact: true }) }), n.jsx("button", { className: "story-global-close", onClick: i, "aria-label": "Close story", children: n.jsx(pe, { size: 24 }) }), n.jsx("div", { className: "story-preview-rail", "aria-hidden": "false", children: $e.map((Q) => n.jsx(Vb, { story: Q.story, offset: Q.offset, onClick: () => r(Q.target) }, `${Q.story.id}-${Q.offset}`)) }), he && n.jsx("button", { className: "story-external-arrow previous", onClick: () => xe(-1), "aria-label": "Previous story", children: n.jsx(dn, { size: 22, strokeWidth: 3 }) }), re && n.jsx("button", { className: "story-external-arrow next", onClick: () => xe(1), "aria-label": "Next story", children: n.jsx(Cn, { size: 22, strokeWidth: 3 }) }), n.jsx("section", { className: Ge, onTouchStart: (Q) => {
    var oe, ee;
    return Y({ x: ((oe = Q.touches[0]) == null ? void 0 : oe.clientX) ?? 0, y: ((ee = Q.touches[0]) == null ? void 0 : ee.clientY) ?? 0 });
  }, onTouchEnd: (Q) => {
    var oe, ee;
    return Ze({ x: ((oe = Q.changedTouches[0]) == null ? void 0 : oe.clientX) ?? 0, y: ((ee = Q.changedTouches[0]) == null ? void 0 : ee.clientY) ?? 0 });
  }, children: n.jsxs("div", { className: "story-stage", children: [n.jsx("div", { className: "story-media-fill", children: c.mediaUrl && !me && k !== "network" && (F ? n.jsx("video", { src: c.mediaUrl, muted: true, playsInline: true }, `fill-${c.id}`) : n.jsx("img", { src: c.mediaUrl, alt: "" }, `fill-${c.id}`)) }), k === "loading" && n.jsxs("div", { className: "story-loading", children: [n.jsx("span", {}), n.jsx("strong", { children: "Loading story" })] }), k === "buffering" && n.jsxs("div", { className: "story-loading", children: [n.jsx("span", {}), n.jsx("strong", { children: "Buffering" })] }), k === "unavailable" && n.jsx(Yi, { title: we ? "Story expired" : "Story unavailable", detail: we ? "This story has passed its viewing window." : "This story is unavailable because of privacy or missing media." }), k === "deleted" && n.jsx(Yi, { title: "Deleted story", detail: "This story is no longer available." }), k === "network" && n.jsx(Yi, { title: "Failed media loading", detail: "The media failed to load. Retry or continue to the next story.", action: "Retry", onRetry: () => B(c.mediaUrl ? "loading" : "ready") }), c.mediaUrl && !me && k !== "network" && (F ? n.jsx("video", { ref: d, className: "story-media", src: c.mediaUrl, playsInline: true, muted: j, onWaiting: () => B("buffering"), onCanPlay: () => B("ready"), onLoadedData: () => B("ready"), onLoadedMetadata: () => B("ready"), onEnded: () => re ? xe(1) : y(100), onError: () => B("network") }, `media-${c.id}`) : n.jsx("img", { className: "story-media", src: c.mediaUrl, alt: `Story by ${c.username}`, onLoad: () => B("ready"), onError: () => B("network") }, `media-${c.id}`)), !c.mediaUrl && k === "ready" && n.jsxs("div", { className: "story-text-only", children: [n.jsx("strong", { children: c.name }), n.jsx("p", { children: "Shared a quiet text update." })] }), n.jsx("div", { className: "story-top-gradient" }), n.jsx("div", { className: "story-bottom-gradient" }), n.jsxs("div", { className: "story-chrome", children: [n.jsx("div", { className: "story-segments", "aria-label": "Story progress", children: ze.map((Q, oe) => n.jsx("span", { className: oe < Se ? "complete" : oe === Se ? "active" : "", children: n.jsx("i", { style: { width: oe === Se ? `${C}%` : void 0 } }) }, Q.id)) }), n.jsxs("header", { children: [n.jsxs("button", { className: "author-button", onClick: () => void f(c.userId), children: [n.jsx(cn, { src: c.avatarUrl, label: c.username }), n.jsxs("span", { children: [n.jsx("strong", { children: c.name }), n.jsxs("small", { children: ["@", c.username, " \xC2\xB7 ", zb(c.createdAt ?? (/* @__PURE__ */ new Date()).toISOString()), " ago", c.collectionId ? " \xC2\xB7 Featured" : ""] }), c.musicName && n.jsxs("small", { className: "story-music-name", children: [n.jsx(Oa, { size: 13 }), " ", c.musicName] })] }), ue && n.jsx(gn, { className: "verified-badge", size: 14 })] }), n.jsxs("div", { className: "story-actions", children: [(F || !!c.musicUrl) && n.jsx("button", { className: "story-control", onClick: () => E((Q) => !Q), "aria-label": j ? "B\u1EADt \xE2m thanh" : "T\u1EAFt \xE2m thanh", children: j ? n.jsx(Xt, { size: 18 }) : n.jsx(Oa, { size: 18 }) }), n.jsx("button", { className: "story-control", onClick: () => T((Q) => !Q), "aria-label": I ? "Resume story" : "Pause story", children: I ? n.jsx(ja, { size: 18 }) : n.jsx(na, { size: 18 }) }), n.jsx("button", { className: "story-control", onClick: () => P((Q) => !Q), "aria-label": "More options", children: n.jsx(ea, { size: 18 }) })] })] })] }), n.jsx("button", { className: "story-hotzone previous", disabled: !he, onClick: () => xe(-1), "aria-label": "Previous story" }), n.jsx("button", { className: "story-hotzone next", disabled: !re, onClick: () => xe(1), "aria-label": "Next story" }), n.jsx("button", { className: "story-hold-zone", onPointerDown: () => T(true), onPointerUp: () => T(false), onPointerLeave: () => T(false), "aria-label": "Hold to pause" }), ue && n.jsx("div", { className: "story-stickers own-only", children: n.jsxs("button", { onClick: () => q(true), children: [n.jsx(Bn, { size: 15 }), " ", Math.max(12, a * 7 + 28), " viewers"] }) }), k === "ready" && C >= 100 && !re && n.jsxs("div", { className: "story-end-state", children: [n.jsx("strong", { children: "End of all stories" }), n.jsx("span", { children: "No more stories to show." }), n.jsx("button", { onClick: i, children: "Close" })] }), V && n.jsxs("div", { className: "story-more-popover", children: [n.jsx("button", { children: "Copy link" }), n.jsx("button", { children: "Story information" }), n.jsx("button", { children: "Mute stories from this user" }), ue ? n.jsx("button", { className: "danger", children: "Delete story" }) : n.jsx("button", { children: "Report" })] }), n.jsxs("form", { className: ke ? "story-reply" : "story-reply disabled", onSubmit: De, children: [n.jsx("input", { value: ye, onFocus: () => T(true), onBlur: () => T(false), onChange: (Q) => Qe(Q.target.value), disabled: !ke, placeholder: ke ? `Reply to ${c.name}...` : "Reply disabled" }), n.jsx("button", { type: "button", className: b ? "active" : "", onClick: () => N((Q) => !Q), "aria-label": "Like story", children: n.jsx(Ja, { size: 19, fill: b ? "currentColor" : "none" }) }), n.jsx("button", { type: "submit", disabled: !ye.trim() || !ke, "aria-label": "Send reply", children: n.jsx(vt, { size: 19 }) })] }), ue && n.jsxs("aside", { className: "story-owner-panel", children: [n.jsx("strong", { children: "Story insights" }), n.jsx("button", { onClick: () => q(true), children: "Xem ng\u01B0\u1EDDi xem" }), n.jsx("button", { children: "Add to featured" }), n.jsx("button", { children: "Save media" })] }), D && n.jsx(lb, { storyId: c.id, ownerId: t, onClose: () => q(false), onOpenProfile: (Q) => {
    q(false), f(Q);
  } })] }) })] });
}
function Vb({ story: e, offset: a, onClick: t }) {
  const i = Math.abs(a) > 1;
  return n.jsxs("button", { className: `story-preview-card ${a < 0 ? "left" : "right"} ${i ? "distant" : "near"}`, onClick: t, "aria-label": `Open story by ${e.username}`, children: [n.jsx("span", { children: e.mediaUrl ? n.jsx("img", { src: e.mediaUrl, alt: "" }) : n.jsx(fn, { size: 22 }) }), n.jsx("small", { children: e.name })] });
}
function Yi({ title: e, detail: a, action: t, onRetry: i }) {
  return n.jsxs("div", { className: "story-unavailable", children: [n.jsx("strong", { children: e }), n.jsx("span", { children: a }), t && n.jsx("button", { onClick: i, children: t })] });
}
function Zb({ post: e, index: a, viewerId: t, onOpen: i, onToggle: r, onEdit: s, onArchive: f, onOpenProfile: c }) {
  var b, N;
  const [d, u] = o.useState(false), [h, m] = o.useState(null), [p, g] = o.useState(false), C = 180, y = e.caption.length > C, I = e.caption.slice(0, C).trim(), T = I.replace(/\s+\S*$/, "").trim(), j = d || !y ? e.caption : `${T || I}...`;
  o.useEffect(() => u(false), [e.id]);
  function E(k) {
    k.stopPropagation(), c(e.author.id);
  }
  return n.jsxs("article", { className: `post-card ${e.layoutVariant.toLowerCase()}`, children: [n.jsx("div", { className: "post-index", children: String(a).padStart(2, "0") }), n.jsxs("header", { className: "post-author", children: [n.jsxs("button", { className: "author-button", onClick: E, children: [n.jsx(cn, { src: e.author.avatarUrl, label: e.author.username }), n.jsxs("span", { children: [n.jsxs("strong", { children: [e.author.username, " ", n.jsxs("small", { className: "post-author-time", children: ["\u2022 ", Wt(e.createdAt)] })] }), e.music && n.jsxs("small", { className: "post-author-music", children: [n.jsx(t2, {}), " ", e.music.displayName] })] }), e.author.relationship === "FRIEND" && n.jsx(gn, { className: "verified-badge", size: 14 })] }), n.jsxs("span", { className: "post-menu-anchor", children: [n.jsx("button", { className: "icon-button", "aria-label": "Post menu", "aria-expanded": p, onClick: () => g((k) => !k), children: n.jsx(ea, { size: 20 }) }), p && n.jsxs("span", { className: "post-menu-popover", children: [e.author.id === t && n.jsxs(n.Fragment, { children: [n.jsxs("button", { type: "button", onClick: () => {
    g(false), s();
  }, children: [n.jsx(ha, { size: 16 }), " Ch\u1EC9nh s\u1EEDa"] }), n.jsxs("button", { type: "button", onClick: () => {
    g(false), f();
  }, children: [n.jsx(Dn, { size: 16 }), " Kho l\u01B0u tr\u1EEF"] })] }), n.jsxs("button", { type: "button", onClick: () => g(false), children: [n.jsx(pe, { size: 16 }), " \u0110\xF3ng"] })] })] })] }), n.jsx(qb, { post: e, onOpen: i }), n.jsx(cl, { post: e, onToggle: r, onComment: i, onOpenEngagement: m }), n.jsxs("div", { className: "post-content", children: [e.caption && n.jsxs("p", { className: d ? "feed-caption expanded" : "feed-caption collapsed", children: [n.jsxs("button", { onClick: E, children: ["@", e.author.username] }), " ", j, y && n.jsx("button", { className: "text-action", "aria-expanded": d, onClick: () => u((k) => !k), children: d ? "Less" : "More" })] }), !!((b = e.hashtags) != null && b.length) && n.jsx("div", { className: "hashtag-row", children: (N = e.hashtags) == null ? void 0 : N.slice(0, 5).map((k) => n.jsxs("span", { children: ["#", k] }, k)) }), e.comments[0] && n.jsxs("button", { className: "comment-preview", onClick: i, children: [n.jsxs("strong", { children: ["@", e.comments[0].author] }), " ", e.comments[0].text] }), n.jsx("div", { className: "post-meta", children: n.jsx("time", { children: Wt(e.createdAt) }) })] }), h && n.jsx(ll, { postId: e.id, kind: h, viewerId: t, onClose: () => m(null), onOpenProfile: c })] });
}
function Wb({ media: e, active: a }) {
  const t = o.useRef(null);
  return o.useEffect(() => {
    const i = t.current;
    if (!i) return;
    if (!a) {
      i.pause();
      return;
    }
    const r = new IntersectionObserver(([s]) => {
      s != null && s.isIntersecting && s.intersectionRatio >= 0.55 && document.visibilityState === "visible" ? i.play().catch(() => {
      }) : i.pause();
    }, { threshold: [0, 0.55, 1] });
    return r.observe(i), () => {
      r.disconnect(), i.pause();
    };
  }, [a, e.id, e.url]), n.jsx("video", { ref: t, src: e.url, muted: true, playsInline: true, loop: true, preload: "metadata" });
}
function vo({ media: e, className: a, interactive: t = false }) {
  return n.jsx("span", { className: a, "aria-hidden": t ? void 0 : true, children: e.type === "VIDEO" ? n.jsx(Wb, { media: e, active: t }) : n.jsx("img", { src: e.url, alt: t ? e.alt : "", draggable: false }) });
}
function qb({ post: e, onOpen: a }) {
  const [t, i] = o.useState(0), [r, s] = o.useState(null), [f, c] = o.useState("next"), [d, u] = o.useState(false), [h, m] = o.useState(tl), [p, g] = o.useState(false), C = o.useRef(null), y = o.useRef(null), I = o.useRef(null), T = o.useRef(/* @__PURE__ */ new Map()), j = o.useRef(null), E = o.useRef(false), b = e.media[t], N = r === null ? null : e.media[r], k = e.music ?? (b == null ? void 0 : b.music) ?? null, B = k ? e.music ? `post:${e.id}:${k.id}` : `item:${b == null ? void 0 : b.id}:${k.id}` : null, z = e.media.length > 1, x = !!(k && b && dl(b)), w = Yo(e.mediaRatio);
  o.useEffect(() => {
    Promise.all(e.media.map(qt));
  }, [e.id]), o.useEffect(() => {
    const P = (D) => m(D.detail);
    return window.addEventListener(rr, P), () => window.removeEventListener(rr, P);
  }, []), o.useEffect(() => {
    const P = C.current, D = (ne) => u(ne.detail === e.id);
    if (window.addEventListener(Bt, D), !P || typeof IntersectionObserver > "u") return u(true), () => window.removeEventListener(Bt, D);
    const q = new IntersectionObserver(([ne]) => {
      yo(e.id, ne != null && ne.isIntersecting ? ne.intersectionRatio : 0);
    }, { threshold: [0, 0.35, 0.6, 0.8, 1] });
    return q.observe(P), () => {
      q.disconnect(), window.removeEventListener(Bt, D), yo(e.id, 0);
    };
  }, [e.id]), o.useEffect(() => {
    const P = y.current;
    if (P) return P.loop = true, () => P.pause();
  }, []), o.useEffect(() => {
    const P = y.current;
    if (!P || I.current === B) return;
    const D = I.current;
    if (D && Number.isFinite(P.currentTime) && T.current.set(D, P.currentTime), P.pause(), I.current = B, !B || !(k != null && k.playbackUrl)) {
      P.removeAttribute("src"), P.load();
      return;
    }
    P.src = k.playbackUrl, P.load();
    const q = () => {
      const ne = T.current.get(B) ?? 0;
      P.currentTime = Number.isFinite(ne) && ne < P.duration ? ne : 0, d && !h && x && P.play().catch(() => {
      });
    };
    return P.addEventListener("loadedmetadata", q, { once: true }), () => P.removeEventListener("loadedmetadata", q);
  }, [B, k == null ? void 0 : k.playbackUrl, d, h, x]), o.useEffect(() => {
    const P = y.current;
    P && (P.muted = p);
  }, [p]), o.useEffect(() => {
    const P = y.current;
    if (!P || !B || !(k != null && k.playbackUrl) || !d || h || !x) {
      P && I.current && Number.isFinite(P.currentTime) && T.current.set(I.current, P.currentTime), P == null || P.pause();
      return;
    }
    P.play().catch(() => {
    });
  }, [d, h, x, B, k == null ? void 0 : k.playbackUrl]), o.useEffect(() => () => {
    j.current !== null && window.clearTimeout(j.current);
    const P = y.current, D = I.current;
    P && D && Number.isFinite(P.currentTime) && T.current.set(D, P.currentTime);
  }, []);
  function Y(P) {
    if (E.current) return;
    const D = Math.min(e.media.length - 1, Math.max(0, t + P));
    D !== t && (E.current = true, qt(e.media[D]).then(() => {
      c(P > 0 ? "next" : "previous"), s(t), i(D), j.current !== null && window.clearTimeout(j.current), j.current = window.setTimeout(() => {
        s(null), E.current = false;
      }, 320);
    }));
  }
  function V() {
    var P;
    g((D) => !D), (P = y.current) != null && P.paused && x && !h && y.current.play().catch(() => {
    });
  }
  return e.media.length ? n.jsxs("div", { ref: C, className: "post-media-frame", style: { aspectRatio: w }, tabIndex: 0, onKeyDown: (P) => {
    P.key === "ArrowLeft" && Y(-1), P.key === "ArrowRight" && Y(1);
  }, children: [n.jsxs("button", { className: "media-surface feed-media-stage", onClick: a, children: [N && n.jsx(vo, { media: N, className: "feed-media-content exiting slide-" + f }), n.jsx(vo, { media: b, className: N ? "feed-media-content entering slide-" + f : "feed-media-content", interactive: true }, b.id)] }), b.caption && n.jsxs("div", { className: `item-caption-thought feed-item-caption ${b.caption.length > 180 ? "long" : ""}`, tabIndex: 0, role: "button", "aria-label": `View media caption: ${b.caption}`, children: [n.jsx(fn, { className: "caption-trigger-icon", size: 18, "aria-hidden": "true" }), n.jsx("p", { children: b.caption })] }, `feed-caption-${b.id}`), x && n.jsx("button", { type: "button", className: "feed-music-mute", onClick: V, "aria-label": p ? "Unmute music" : "Mute music", "aria-pressed": p, children: p ? n.jsx(Xt, { size: 15 }) : n.jsx(Oa, { size: 15 }) }), z && n.jsxs(n.Fragment, { children: [n.jsx("button", { className: "carousel-control previous", onClick: () => Y(-1), disabled: t === 0 || r !== null, "aria-label": "Previous media", children: n.jsx(dn, { size: 19 }) }), n.jsx("button", { className: "carousel-control next", onClick: () => Y(1), disabled: t === e.media.length - 1 || r !== null, "aria-label": "Next media", children: n.jsx(Cn, { size: 19 }) }), n.jsxs("span", { className: "media-counter", children: [String(t + 1).padStart(2, "0"), " / ", String(e.media.length).padStart(2, "0")] }), n.jsx("span", { className: "media-progress", children: n.jsx("i", { style: { width: `${(t + 1) / e.media.length * 100}%` } }) })] }), n.jsx("audio", { ref: y, preload: "metadata", muted: p })] }) : n.jsx("button", { className: "media-button text-media", onClick: a, children: n.jsx("div", { className: "text-post", title: e.caption || "No caption", children: e.caption || "No caption" }) });
}
function cl({ post: e, onToggle: a, onComment: t, onOpenEngagement: i, showCounts: r = true }) {
  return n.jsxs("div", { className: "action-bar", children: [n.jsxs("div", { className: "engagement-action", children: [n.jsx("button", { className: e.viewerState.liked ? "active like-active" : "like-action", onClick: () => a(e.id, "liked"), "aria-label": "Like", children: n.jsx(Ja, { size: 21, fill: e.viewerState.liked ? "currentColor" : "none" }) }), r && n.jsx("button", { className: "engagement-count", onClick: () => i == null ? void 0 : i("LIKES"), "aria-label": `View ${e.engagement.likes} likes`, children: ua(e.engagement.likes) })] }), n.jsxs("div", { className: "engagement-action", children: [n.jsx("button", { onClick: t, "aria-label": "Comment", children: n.jsx(fn, { size: 21 }) }), r && n.jsx("button", { className: "engagement-count", onClick: t, "aria-label": `Open ${e.engagement.comments} comments`, children: ua(e.engagement.comments) })] }), n.jsxs("div", { className: "engagement-action", children: [n.jsx("button", { className: e.viewerState.reposted ? "active repost-active" : "repost-action", onClick: () => a(e.id, "reposted"), "aria-label": "Repost", children: n.jsx(xn, { size: 21 }) }), r && n.jsx("button", { className: "engagement-count", onClick: () => i == null ? void 0 : i("REPOSTS"), "aria-label": `View ${e.engagement.reposts} reposts`, children: ua(e.engagement.reposts) })] }), n.jsx("button", { className: e.viewerState.saved ? "active save-action" : "save-action", onClick: () => a(e.id, "saved"), "aria-label": "Save", children: n.jsx(Kt, { size: 21, fill: e.viewerState.saved ? "currentColor" : "none" }) })] });
}
function ll({ postId: e, kind: a, viewerId: t, onClose: i, onOpenProfile: r }) {
  const [s, f] = o.useState([]), [c, d] = o.useState("loading");
  return o.useEffect(() => {
    let u = true;
    const h = a === "LIKES" ? `/likes/targets/${encodeURIComponent(e)}/actors?targetType=POST&page=0&size=40` : `/posts/${encodeURIComponent(e)}/reposts/actors?page=0&size=40`;
    return d("loading"), fe(h).then((m) => Promise.all((m.content ?? []).map((p) => fe(`/profiles/${encodeURIComponent(p)}/summary?viewerId=${encodeURIComponent(t)}&postLimit=1`).catch(() => null)))).then((m) => {
      u && (f(m.filter((p) => !!p).map(ol)), d("ready"));
    }).catch(() => {
      u && d("error");
    }), () => {
      u = false;
    };
  }, [a, e, t]), n.jsx("div", { className: "engagement-modal-backdrop", role: "dialog", "aria-modal": "true", "aria-label": a === "LIKES" ? "People who liked this post" : "People who reposted this post", onClick: i, children: n.jsxs("section", { className: "engagement-modal", onClick: (u) => u.stopPropagation(), children: [n.jsxs("header", { children: [n.jsx("strong", { children: a === "LIKES" ? "Likes" : "Reposts" }), n.jsx("button", { className: "icon-button", onClick: i, "aria-label": "Close", children: n.jsx(pe, { size: 19 }) })] }), n.jsxs("div", { className: "engagement-people-list", children: [c === "loading" && n.jsxs("div", { className: "engagement-list-loading", children: [n.jsx("span", {}), n.jsx("span", {}), n.jsx("span", {})] }), c === "error" && n.jsxs("div", { className: "engagement-list-state", children: [n.jsx(In, { size: 20 }), n.jsx("strong", { children: "Could not load people" })] }), c === "ready" && s.length === 0 && n.jsxs("div", { className: "engagement-list-state", children: [n.jsx(Bn, { size: 20 }), n.jsx("strong", { children: "No people yet" })] }), c === "ready" && s.map((u) => n.jsxs("button", { className: "engagement-person", onClick: () => {
    i(), r(u.id);
  }, children: [n.jsx(cn, { src: u.avatarUrl, label: u.username }), n.jsxs("span", { children: [n.jsx("strong", { children: u.displayName }), n.jsxs("small", { children: ["@", u.username] })] }), n.jsx(Cn, { size: 16 })] }, u.id))] })] }) });
}
function Lo({ icon: e, title: a, detail: t }) {
  return n.jsxs("div", { className: "feed-state", children: [n.jsx(e, { size: 24 }), n.jsx("strong", { children: a }), n.jsx("span", { children: t })] });
}
function Kb({ post: e, viewerId: a, targetCommentId: t, onClose: i, onTogglePost: r, onCommentCreated: s, onEdit: f, onArchive: c, onOpenProfile: d }) {
  const [u, h] = o.useState(e), [m, p] = o.useState([]), [g, C] = o.useState("loading"), [y, I] = o.useState(false), [T, j] = o.useState(null), [E, b] = o.useState(null), [N, k] = o.useState(0), [B, z] = o.useState(0), [x, w] = o.useState(false), [Y, V] = o.useState(false), [P, D] = o.useState(0), [q, ne] = o.useState(null), [be, he] = o.useState("next"), [re, me] = o.useState(false), [we, F] = o.useState(null), [ze, Se] = o.useState(""), [ye, ue] = o.useState(false), [ke, Ne] = o.useState(""), [se, $e] = o.useState(null), [xe, Qe] = o.useState(0), [De, Ze] = o.useState([]), [Ge, Ee] = o.useState(null), [Q, oe] = o.useState(null), ee = o.useRef(null), ge = o.useRef(/* @__PURE__ */ new Map()), O = o.useRef(null), K = o.useRef(null), X = o.useRef(false), H = o.useRef(null), _ = o.useRef(null), le = o.useRef(/* @__PURE__ */ new Set()), Me = o.useRef(""), Te = false, de = u.media[P], Le = u.music ?? (de == null ? void 0 : de.music) ?? null, Ye = Le ? u.music ? "post:" + u.id + ":" + Le.id : "item:" + (de == null ? void 0 : de.id) + ":" + Le.id : null, Ve = m.map((L) => ({ ...L, replies: [] }));
  function an(L) {
    if (!u.media.length || X.current) return;
    const R = Math.min(u.media.length - 1, Math.max(0, P + L));
    R !== P && (X.current = true, qt(u.media[R]).then(() => {
      he(L > 0 ? "next" : "previous"), ne(P), D(R), K.current !== null && window.clearTimeout(K.current), K.current = window.setTimeout(() => {
        ne(null), X.current = false;
      }, 320);
    }));
  }
  o.useEffect(() => {
    let L = true;
    return h(e), D(0), ne(null), X.current = false, I(false), fe("/posts/" + encodeURIComponent(e.id) + "?mediaType=POST").then(async (R) => {
      const G = Ab(e, R);
      await Promise.all(G.media.map(qt)), L && (h(G), I(true));
    }).catch(() => {
      L && I(true);
    }), () => {
      L = false;
    };
  }, [e.id]), o.useEffect(() => {
    h((L) => ({ ...L, engagement: e.engagement, viewerState: e.viewerState }));
  }, [e.engagement.likes, e.engagement.comments, e.engagement.reposts, e.viewerState.liked, e.viewerState.saved, e.viewerState.reposted]), o.useEffect(() => {
    let L = true;
    return C("loading"), z(0), fe("/frontend/comments/post/" + encodeURIComponent(e.id) + "/page?viewerId=" + encodeURIComponent(a) + "&page=0&size=10").then((R) => {
      L && (p(R.content ?? []), w(R.pageNumber + 1 < R.totalPages), C("ready"));
    }).catch(() => {
      L && C("error");
    }), () => {
      L = false;
    };
  }, [e.id, a, xe]), o.useEffect(() => {
    if (!t || g !== "ready") return;
    const L = `${e.id}:${t}`;
    if (Me.current === L) return;
    Me.current = L;
    let R = false;
    return (async () => {
      try {
        const G = [];
        let J = await fe(`/comments/${encodeURIComponent(t)}`);
        if (J.postId !== e.id) throw new Error("Comment does not belong to this post");
        G.push(J.id);
        for (let Ue = 0; Ue < 2 && J.parentId; Ue += 1) J = await fe(`/comments/${encodeURIComponent(J.parentId)}`), G.push(J.id);
        if (R) return;
        const ae = G[G.length - 1];
        let ce = [...m], Re = B + 1, Oe = x;
        for (; !ce.some((Ue) => Ue.id === ae) && Oe; ) {
          const Ue = await fe(`/frontend/comments/post/${encodeURIComponent(e.id)}/page?viewerId=${encodeURIComponent(a)}&page=${Re}&size=10`);
          ce = [...ce, ...Ue.content ?? []].filter((tn, Yn, ia) => ia.findIndex((mn) => mn.id === tn.id) === Yn), Re = Ue.pageNumber + 1, Oe = Re < Ue.totalPages;
        }
        if (!ce.some((Ue) => Ue.id === ae)) throw new Error("Comment root is unavailable");
        if (R) return;
        p(ce), z(Math.max(B, Re - 1)), w(Oe), Ze(G);
      } catch {
        R || (Ze([]), window.dispatchEvent(new CustomEvent("app-toast", { detail: "B?nh lu?n kh?ng c?n t?n t?i" })));
      }
    })(), () => {
      R = true;
    };
  }, [x, B, g, m, e.id, t, a]), o.useEffect(() => {
    if (!t || !De.includes(t)) return;
    let L = false, R = 0, G = 0;
    const J = () => {
      if (L) return;
      const ae = document.querySelector(`[data-comment-id="${CSS.escape(t)}"]`);
      if (ae) {
        ae.scrollIntoView({ block: "center", behavior: R > 8 ? "auto" : "smooth" }), Ee(t), G = window.setTimeout(() => Ee(null), 4200);
        return;
      }
      R += 1, R < 35 && window.setTimeout(J, 100);
    };
    return J(), () => {
      L = true, G && window.clearTimeout(G);
    };
  }, [De, t]), o.useEffect(() => () => {
    se != null && se.previewUrl && URL.revokeObjectURL(se.previewUrl);
  }, [se]), o.useEffect(() => () => {
    K.current !== null && window.clearTimeout(K.current);
  }, []), o.useEffect(() => {
    function L(R) {
      const G = R.detail;
      !(G != null && G.commentId) || G.postId !== e.id || !le.current.has(G.commentId) || (le.current.delete(G.commentId), window.dispatchEvent(new CustomEvent("app-toast", { detail: G.message || (G.result === "FAILED" ? "Media comment was rejected." : "Comment published.") })), G.result !== "FAILED" && (Qe((J) => J + 1), k((J) => J + 1), s(e.id)));
    }
    return window.addEventListener("comment-media-result", L), () => window.removeEventListener("comment-media-result", L);
  }, [s, e.id]), o.useEffect(() => {
    const L = ee.current;
    if (L) return L.loop = true, () => L.pause();
  }, []), o.useEffect(() => {
    const L = ee.current;
    if (!L || O.current === Ye) return;
    const R = O.current;
    if (R && Number.isFinite(L.currentTime) && ge.current.set(R, L.currentTime), L.pause(), O.current = Ye, !Ye || !(Le != null && Le.playbackUrl)) {
      L.removeAttribute("src"), L.load();
      return;
    }
    L.src = Le.playbackUrl, L.load();
    const G = () => {
      const J = ge.current.get(Ye) ?? 0;
      L.currentTime = Number.isFinite(J) && J < L.duration ? J : 0, (de == null ? void 0 : de.type) !== "VIDEO" && L.play().catch(() => {
      });
    };
    return L.addEventListener("loadedmetadata", G, { once: true }), () => {
      L.removeEventListener("loadedmetadata", G), O.current === Ye && Number.isFinite(L.currentTime) && ge.current.set(Ye, L.currentTime);
    };
  }, [Ye, Le == null ? void 0 : Le.playbackUrl]), o.useEffect(() => {
    const L = ee.current;
    if (!(!L || !Ye || !(Le != null && Le.playbackUrl))) {
      if ((de == null ? void 0 : de.type) === "VIDEO") {
        Number.isFinite(L.currentTime) && ge.current.set(Ye, L.currentTime), L.pause();
        return;
      }
      L.play().catch(() => {
      });
    }
  }, [de == null ? void 0 : de.type, Ye, Le == null ? void 0 : Le.playbackUrl]), o.useEffect(() => {
    function L(R) {
      if (E) {
        R.key === "Escape" && b(null);
        return;
      }
      R.key === "Escape" && i(), R.key === "ArrowLeft" && an(-1), R.key === "ArrowRight" && an(1);
    }
    return window.addEventListener("keydown", L), () => window.removeEventListener("keydown", L);
  }, [P, u.media.length, E, i]);
  function Xe(L) {
    if (Q === null) return;
    const R = Q - L;
    Math.abs(R) > 52 && an(R > 0 ? 1 : -1), oe(null);
  }
  async function Ke() {
    if (Y || !x) return;
    const L = B + 1;
    V(true);
    try {
      const R = await fe(`/frontend/comments/post/${encodeURIComponent(e.id)}/page?viewerId=${encodeURIComponent(a)}&page=${L}&size=10`);
      p((G) => {
        const J = [...G, ...R.content ?? []];
        return J.filter((ae, ce) => J.findIndex((Re) => Re.id === ae.id) === ce);
      }), z(R.pageNumber), w(R.pageNumber + 1 < R.totalPages);
    } finally {
      V(false);
    }
  }
  async function We(L) {
    return (await ie(`/likes/users/${encodeURIComponent(a)}`, "POST", { targetId: L, targetType: "COMMENT" })).liked;
  }
  function Je() {
    $e(null), _.current && (_.current.value = "");
  }
  function A(L) {
    var ce;
    const R = (ce = L.target.files) == null ? void 0 : ce[0];
    if (L.target.value = "", !R) return;
    const G = R.type.startsWith("image/"), J = R.type.startsWith("video/");
    if (!G && !J) {
      Ne("Comments only support one image or video.");
      return;
    }
    const ae = J ? Tb : Eb;
    if (R.size > ae) {
      Ne(J ? "Video size must not exceed 500 MB." : "Image size must not exceed 50 MB.");
      return;
    }
    Ne(""), $e({ file: R, previewUrl: URL.createObjectURL(R), type: J ? "VIDEO" : "IMAGE" });
  }
  async function $(L) {
    L.preventDefault();
    const R = ze.trim(), G = se;
    if (!(!R && !G || ye || Te)) {
      ue(true), Ne("");
      try {
        const J = G ? await ga(G.file) : null, ae = await ie("/comments", "POST", { postId: e.id, userId: a, parentId: (we == null ? void 0 : we.id) ?? null, content: R || "", mediaList: J ? [{ secureUrl: J.secureUrl, publicId: J.publicId }] : [] });
        if (G) {
          le.current.add(ae.commentId), window.dispatchEvent(new CustomEvent("app-toast", { detail: ae.message || "Media is being reviewed." })), Se(""), Je(), F(null);
          return;
        }
        Qe((ce) => ce + 1), k((ce) => ce + 1), s(e.id), Se(""), F(null);
      } catch (J) {
        Ne(J instanceof Error ? J.message : "Failed to submit comment.");
      } finally {
        ue(false);
      }
    }
  }
  const v = n.jsx(n2, { loading: !y, post: u, activeIndex: P, previousIndex: q, transitionDirection: be, musicMuted: re, onToggleMusicMuted: () => me((L) => !L), onMove: an, onTouchStart: oe, onTouchEnd: Xe });
  return n.jsx("div", { className: "modal-backdrop post-detail-backdrop", role: "dialog", "aria-modal": "true", onMouseDown: (L) => {
    L.target === L.currentTarget && i();
  }, children: n.jsxs("section", { className: "post-detail", onMouseDown: (L) => L.stopPropagation(), children: [n.jsx("button", { className: "icon-button close detail-close", onClick: i, "aria-label": "Close", children: n.jsx(pe, { size: 22 }) }), n.jsx("div", { className: "detail-media", children: v }), n.jsxs("aside", { className: "detail-panel", children: [n.jsxs("header", { className: "detail-author", children: [n.jsx("button", { className: "detail-author-profile", onClick: () => void d(u.author.id), "aria-label": "Open profile for " + u.author.username, children: n.jsx(cn, { src: u.author.avatarUrl, label: u.author.username }) }), n.jsx("div", { className: "detail-author-copy", children: n.jsxs("button", { className: "detail-author-name", onClick: () => void d(u.author.id), children: [n.jsxs("span", { children: [n.jsx("strong", { children: u.author.displayName || u.author.username }), u.author.relationship === "FRIEND" && n.jsx(gn, { className: "verified-badge", size: 13 })] }), n.jsxs("small", { children: ["@", u.author.username] })] }) }), u.author.id === a ? n.jsxs("span", { className: "detail-owner-actions", children: [n.jsx("button", { className: "icon-button", onClick: f, "aria-label": "Ch\u1EC9nh s\u1EEDa b\xE0i vi\u1EBFt", title: "Ch\u1EC9nh s\u1EEDa", children: n.jsx(ha, { size: 18 }) }), n.jsx("button", { className: "icon-button", onClick: c, "aria-label": "Chuy\u1EC3n b\xE0i vi\u1EBFt v\xE0o Kho l\u01B0u tr\u1EEF", title: "Kho l\u01B0u tr\u1EEF", children: n.jsx(Dn, { size: 18 }) })] }) : n.jsx("button", { className: "icon-button detail-author-more", "aria-label": "Post options", children: n.jsx(ea, { size: 19 }) })] }), n.jsxs("div", { className: "detail-scroll detail-sidebar-body", children: [n.jsx(Xb, { post: u }), Te, g === "loading" && n.jsxs("div", { className: "comments-loading", children: [n.jsx("span", {}), n.jsx("span", {}), n.jsx("span", {})] }), g === "error" && n.jsx(xo, { icon: In, title: "Could not load comments", detail: "Check the backend connection and try again." }), g === "ready" && Ve.length === 0 && n.jsx(xo, { icon: fn, title: "No comments yet", detail: "Be the first to share a reply." }), g === "ready" && Ve.length > 0 && n.jsx("div", { className: "detail-comments", children: Ve.map((L) => n.jsx(ul, { item: L, depth: 0, viewerId: a, postAuthorId: u.author.id, reloadToken: N, focusChain: De, focusedCommentId: Ge, onLike: We, onReply: F, onOpenMedia: (R, G) => b({ url: R, video: G }), onOpenProfile: d }, L.id)) }), g === "ready" && x && n.jsx("button", { className: "load-more-comments", onClick: () => void Ke(), disabled: Y, children: Y ? "Loading..." : "Load more comments" })] }), n.jsxs("section", { className: "detail-engagement-footer", "aria-label": "Post engagement", children: [n.jsx(cl, { post: u, onToggle: r, onComment: () => {
    var L;
    return (L = H.current) == null ? void 0 : L.focus();
  }, onOpenEngagement: j, showCounts: false }), n.jsxs("div", { className: "detail-engagement-summary", children: [n.jsxs("strong", { children: [ua(u.engagement.likes), " l\u01B0\u1EE3t th\xEDch"] }), n.jsx("time", { children: Wt(u.createdAt) })] })] }), n.jsxs("form", { className: se ? "detail-composer has-attachment" : "detail-composer", onSubmit: $, "aria-busy": ye, children: [n.jsx("input", { ref: _, className: "comment-file-input", type: "file", accept: "image/*,video/*", onChange: A, disabled: ye }), se && n.jsxs("div", { className: "comment-attachment-preview", children: [se.type === "VIDEO" ? n.jsx("video", { src: se.previewUrl, muted: true, playsInline: true }) : n.jsx("img", { src: se.previewUrl, alt: "Selected comment attachment" }), n.jsxs("span", { children: [n.jsx("strong", { children: se.file.name }), n.jsxs("small", { children: [se.type === "VIDEO" ? "Video" : "Image", " \xB7 ", Rb(se.file.size)] })] }), n.jsx("button", { type: "button", onClick: Je, "aria-label": "Remove attachment", children: n.jsx(pe, { size: 16 }) })] }), n.jsx("button", { type: "button", className: "comment-attachment", "aria-label": "Attach an image or video", onClick: () => {
    var L;
    return (L = _.current) == null ? void 0 : L.click();
  }, disabled: ye, children: n.jsx(Ro, { size: 19 }) }), n.jsx(Gr, { textareaRef: H, value: ze, onChange: Se, disabled: ye, iconSize: 19 }), n.jsx("textarea", { ref: H, rows: 1, value: ze, onChange: (L) => Se(L.target.value), disabled: ye, "aria-label": "Add a comment", placeholder: we ? "Reply to " + (we.username || "user") + "..." : "Add a comment..." }), we && n.jsx("button", { type: "button", className: "composer-cancel", onClick: () => F(null), children: "Cancel" }), n.jsx("button", { type: "submit", disabled: !ze.trim() && !se || Te || ye, children: ye ? se ? "Uploading" : "Sending" : "Post" }), ke && n.jsx("span", { className: "composer-error", children: ke })] })] }), n.jsx("audio", { ref: ee, className: "detail-music-audio", preload: "metadata", muted: re }), T && n.jsx(ll, { postId: u.id, kind: T, viewerId: a, onClose: () => j(null), onOpenProfile: d }), E && ya.createPortal(n.jsxs("div", { className: "comment-media-lightbox", role: "dialog", "aria-modal": "true", "aria-label": "Comment media viewer", onClick: () => b(null), children: [n.jsx("button", { type: "button", className: "comment-media-lightbox-close", onClick: () => b(null), "aria-label": "Close media viewer", children: n.jsx(pe, { size: 22 }) }), n.jsx("div", { className: "comment-media-lightbox-content", onClick: (L) => L.stopPropagation(), children: E.video ? n.jsx("video", { src: E.url, controls: true, autoPlay: true, playsInline: true }) : n.jsx("img", { src: E.url, alt: "Expanded comment attachment" }) })] }), document.body)] }) });
}
function Xb({ post: e }) {
  const a = (e.hashtags ?? []).map((t) => "#" + t).join(" ");
  return !e.caption && !a ? null : n.jsx("div", { className: "post-discussion-intro", children: n.jsxs("article", { className: "discussion-caption-row common-caption-row", children: [n.jsx(cn, { src: e.author.avatarUrl, label: e.author.username }), n.jsx("div", { children: n.jsx(e2, { username: e.author.username, text: e.caption, hashtags: a, lines: 4 }) })] }) });
}
function e2({ username: e, text: a, hashtags: t, lines: i }) {
  const [r, s] = o.useState(false), f = a.length > 190;
  return n.jsxs("div", { className: "discussion-caption-copy", children: [a && n.jsxs("p", { className: r ? "expanded" : "", style: r ? void 0 : { WebkitLineClamp: i }, children: [n.jsxs("strong", { children: ["@", e] }), " ", a] }), f && n.jsx("button", { type: "button", onClick: () => s((c) => !c), "aria-expanded": r, children: r ? "Less" : "More" }), t && n.jsx("p", { className: "discussion-hashtags", children: t })] });
}
function qt(e) {
  return e != null && e.url ? e.type === "VIDEO" ? new Promise((a) => {
    const t = document.createElement("video"), i = () => {
      t.removeAttribute("src"), t.load(), a();
    };
    t.preload = "metadata", t.onloadeddata = i, t.onerror = i, t.src = e.url, t.load();
  }) : new Promise((a) => {
    const t = new Image();
    t.onload = () => a(), t.onerror = () => a(), t.src = e.url;
  }) : Promise.resolve();
}
function Co({ media: e, className: a, active: t = false }) {
  const i = o.useRef(null), r = o.useRef(null), [s, f] = o.useState(null), c = e.aspectRatio >= 1 ? "portrait" : "landscape";
  function d() {
    const m = r.current, p = i.current;
    if (!m || !p || m.width <= 0 || m.height <= 0) return;
    const g = p.clientWidth, C = p.clientHeight;
    if (g <= 0 || C <= 0) return;
    const y = Math.min(g / m.width, C / m.height);
    f({ width: Math.max(1, Math.round(m.width * y)), height: Math.max(1, Math.round(m.height * y)) });
  }
  o.useEffect(() => {
    const m = i.current;
    if (!m) return;
    const p = typeof ResizeObserver > "u" ? null : new ResizeObserver(d);
    return p == null || p.observe(m), d(), () => p == null ? void 0 : p.disconnect();
  }, [e.id]);
  function u(m, p) {
    m <= 0 || p <= 0 || (r.current = { width: m, height: p }, d());
  }
  const h = s ? { width: `${s.width}px`, height: `${s.height}px` } : void 0;
  return n.jsx("div", { ref: i, className: a + " " + c, "aria-hidden": t ? void 0 : true, children: e.type === "VIDEO" ? n.jsx("video", { src: e.url, muted: !t, controls: t, playsInline: true, preload: "metadata", style: h, onLoadedMetadata: (m) => u(m.currentTarget.videoWidth, m.currentTarget.videoHeight) }) : n.jsx("img", { src: e.url, alt: t ? e.alt : "", draggable: false, style: h, onLoad: (m) => u(m.currentTarget.naturalWidth, m.currentTarget.naturalHeight) }) });
}
function n2({ loading: e, post: a, activeIndex: t, previousIndex: i, transitionDirection: r, musicMuted: s, onToggleMusicMuted: f, onMove: c, onTouchStart: d, onTouchEnd: u }) {
  const h = a.media[t], m = i === null ? null : a.media[i];
  if (e) return n.jsx("div", { className: "detail-media-loading", "aria-label": "Loading post media", children: n.jsx("span", {}) });
  const p = a.media.length > 1, g = a.music ?? (h == null ? void 0 : h.music) ?? null, C = !!(g && h && dl(h));
  return h ? n.jsxs("div", { className: "detail-media-viewer", tabIndex: 0, onTouchStart: (y) => {
    var I;
    return d(((I = y.touches[0]) == null ? void 0 : I.clientX) ?? null);
  }, onTouchEnd: (y) => {
    var I;
    return u(((I = y.changedTouches[0]) == null ? void 0 : I.clientX) ?? 0);
  }, children: [m && n.jsx(Co, { media: m, className: "detail-media-content exiting slide-" + r }), n.jsx(Co, { media: h, className: m ? "detail-media-content entering slide-" + r : "detail-media-content", active: true }, h.id), h.caption && n.jsxs("div", { className: "item-caption-thought", tabIndex: 0, "aria-label": `View media caption: ${h.caption}`, children: [n.jsx(fn, { className: "caption-trigger-icon", size: 20, "aria-hidden": "true" }), n.jsx("p", { children: h.caption })] }, "caption-" + h.id), C && n.jsx("button", { type: "button", className: "detail-music-mute", onClick: f, "aria-label": s ? "Unmute music" : "Mute music", "aria-pressed": s, children: s ? n.jsx(Xt, { size: 20 }) : n.jsx(Oa, { size: 20 }) }), C && n.jsx("div", { className: "detail-music-attribution", children: n.jsxs("span", { children: [n.jsx("strong", { children: g == null ? void 0 : g.displayName }), (g == null ? void 0 : g.artist) && n.jsx("small", { children: g.artist })] }) }), p && n.jsxs(n.Fragment, { children: [n.jsx("button", { className: "carousel-control previous", onClick: () => c(-1), disabled: t === 0 || i !== null, "aria-label": "Previous media", children: n.jsx(dn, { size: 20 }) }), n.jsx("button", { className: "carousel-control next", onClick: () => c(1), disabled: t === a.media.length - 1 || i !== null, "aria-label": "Next media", children: n.jsx(Cn, { size: 20 }) }), n.jsxs("span", { className: "media-counter", children: [String(t + 1).padStart(2, "0"), " / ", String(a.media.length).padStart(2, "0")] }), n.jsx("span", { className: "media-progress", children: n.jsx("i", { style: { width: (t + 1) / a.media.length * 100 + "%" } }) })] })] }) : n.jsx("div", { className: "detail-empty-media text-only-media", children: n.jsx("div", { className: "text-post", title: a.caption || "Media unavailable", children: a.caption || "Media unavailable" }) });
}
function dl(e) {
  return e.type !== "VIDEO";
}
function ul({ item: e, depth: a, viewerId: t, postAuthorId: i, reloadToken: r, focusChain: s = [], focusedCommentId: f, onLike: c, onReply: d, onOpenMedia: u, onOpenProfile: h }) {
  const [m, p] = o.useState(false), [g, C] = o.useState([]), [y, I] = o.useState("idle"), T = e.replyCount ?? e.replies.length, j = a < 2;
  return o.useEffect(() => {
    j && s.includes(e.id) && f !== e.id && p(true);
  }, [j, s, f, e.id]), o.useEffect(() => {
    if (!m || !j) return;
    let E = true;
    return I("loading"), fe(`/frontend/comments/parent/${encodeURIComponent(e.id)}?viewerId=${encodeURIComponent(t)}&page=0&size=10`).then((b) => {
      E && (C(b ?? []), I("ready"));
    }).catch(() => {
      E && I("error");
    }), () => {
      E = false;
    };
  }, [m, e.id, t, j, r]), n.jsxs("div", { "data-comment-id": e.id, className: `comment-thread depth-${a}${a > 0 ? " reply" : ""}${f === e.id ? " notification-comment-highlight" : ""}`, children: [n.jsx(y2, { item: e, depth: a, viewerId: t, postAuthorId: i, liked: !!e.hasLiked, onLike: c, onReply: j ? d : void 0, onOpenMedia: u, onOpenProfile: h }), j && T > 0 && n.jsxs("button", { className: "load-replies", onClick: () => p((E) => !E), "aria-expanded": m, children: [n.jsx("span", { "aria-hidden": "true" }), m ? "Hide replies" : "View replies"] }), m && y === "loading" && n.jsx("div", { className: "reply-loading", children: "Loading replies..." }), m && y === "error" && n.jsx("button", { className: "reply-load-error", onClick: () => p(false), children: "Could not load replies \xB7 Close" }), m && y === "ready" && g.map((E) => n.jsx(ul, { item: { ...E, replies: [] }, depth: a + 1, viewerId: t, postAuthorId: i, reloadToken: r, focusChain: s, focusedCommentId: f, onLike: c, onReply: d, onOpenMedia: u, onOpenProfile: h }, E.id))] });
}
function xo({ icon: e, title: a, detail: t }) {
  return n.jsxs("div", { className: "comment-state", children: [n.jsx(e, { size: 22 }), n.jsx("strong", { children: a }), n.jsx("span", { children: t })] });
}
function a2({ userId: e, initialDraft: a, onClose: t, onDraftSaved: i, onPublished: r }) {
  return n.jsx(sp, { userId: e, initialDraft: a, onBack: t, onClose: t, onDraftSaved: i, onPublished: r });
}
function t2() {
  return n.jsx(Oa, { size: 18 });
}
function i2({ post: e }) {
  const a = [...e.media].sort((i, r) => (i.orderNumber ?? Number.MAX_SAFE_INTEGER) - (r.orderNumber ?? Number.MAX_SAFE_INTEGER)), t = a.find((i) => i.orderNumber === 1) ?? a[0];
  return t ? t.type === "VIDEO" ? n.jsxs(n.Fragment, { children: [n.jsx("video", { src: t.url, muted: true, playsInline: true, preload: "auto", "aria-label": t.alt || "Video post", onLoadedMetadata: (i) => {
    const r = i.currentTarget;
    r.pause(), r.duration > 0 && (r.currentTime = Math.min(0.05, r.duration / 10));
  }, onLoadedData: (i) => i.currentTarget.pause() }), n.jsx(Lt, { className: "profile-video-indicator", size: 17, "aria-hidden": "true" })] }) : n.jsx("img", { src: t.url, alt: t.alt }) : n.jsx("span", { children: e.caption || e.id });
}
function hl(e) {
  return e.position && e.companyName ? `${e.position} t\u1EA1i ${e.companyName}` : e.companyName ? `L\xE0m vi\u1EC7c t\u1EA1i ${e.companyName}` : e.position || "";
}
function ml(e) {
  return e.major && e.schoolName ? `${e.major} t\u1EA1i ${e.schoolName}` : e.schoolName ? `\u0110\xE3 h\u1ECDc t\u1EA1i ${e.schoolName}` : e.major || "";
}
function ss(e) {
  try {
    const t = new URL(e.startsWith("http") ? e : `https://${e}`).hostname.replace(/^www\./, "");
    return t.includes("github") ? "GitHub" : t.includes("linkedin") ? "LinkedIn" : t.includes("facebook") ? "Facebook" : t;
  } catch {
    return e.replace(/^https?:\/\//, "").split("/")[0];
  }
}
function la(e, a) {
  if (!e && !a) return "";
  const t = (i) => i ? new Date(i).getFullYear() : null;
  return `${t(e) ?? ""}${e || a ? " \u2013 " : ""}${t(a) ?? "Hi\u1EC7n t\u1EA1i"}`;
}
function r2({ viewerId: e, profile: a, onMessage: t, onOpenProfile: i, onRefresh: r }) {
  const [s, f] = o.useState(false), [c, d] = o.useState(false), u = a.friend ? "friends" : a.viewerFollows ? "following" : a.userFollowsViewer ? "follows_you" : "none", [h, m] = o.useState(u);
  o.useEffect(() => m(u), [u]);
  async function p() {
    const T = h;
    m(a.userFollowsViewer ? "friends" : "following"), d(true);
    try {
      await ie("/user-followers/follow", "POST", { followerId: e, followingId: a.id }), await r();
    } catch {
      m(T);
    } finally {
      d(false);
    }
  }
  async function g() {
    const T = h;
    m(a.userFollowsViewer ? "follows_you" : "none"), d(true);
    try {
      await ie(`/user-followers/unfollow?followerId=${encodeURIComponent(e)}&followingId=${encodeURIComponent(a.id)}`, "DELETE"), await r();
    } catch {
      m(T);
    } finally {
      d(false);
    }
  }
  async function C({ profileId: T, signal: j }) {
    return ((await fe(`/search/users/${encodeURIComponent(T)}/similar?viewerId=${encodeURIComponent(e)}&page=0&size=20`, { signal: j })).content ?? []).map((b) => ({ id: b.userId, username: b.username || b.userId, displayName: b.fullName || b.username || b.userId, avatarUrl: b.avatarUrl || null, relationship: b.friend ? "friends" : b.viewerFollowsUser ? "following" : b.userFollowsViewer ? "follows_you" : "none" }));
  }
  async function y(T) {
    await ie("/user-followers/follow", "POST", { followerId: e, followingId: T.id });
  }
  async function I(T) {
    await ie(`/user-followers/unfollow?followerId=${encodeURIComponent(e)}&followingId=${encodeURIComponent(T.id)}`, "DELETE");
  }
  return n.jsxs("div", { className: "profile-relationship-area", children: [n.jsx(Up, { relationship: h, pending: c, onFollow: p, onUnfollow: g, onMessage: () => t(a.id), onFindSimilar: () => f((T) => !T) }), n.jsx(tb, { open: s, profileId: a.id, loadUsers: C, onSelectUser: (T) => void i(T.id), onFollow: y, onUnfollow: I, onClose: () => f(false) })] });
}
function s2({ viewerId: e, profile: a, onSelectPost: t, onOpenStoryHighlight: i, onOpenArchive: r, onOpenConnections: s, onRefresh: f, onMessage: c, onOpenProfile: d }) {
  const [u, h] = o.useState("POSTS"), [m, p] = o.useState(false), [g, C] = o.useState(false);
  if (!a) return n.jsx("section", { className: "screen", children: n.jsx(Da, { icon: ur, title: "Profile not loaded", action: "Open profile again" }) });
  const y = a.id === e, I = a.jobs.filter((Y) => Y.isPublic), T = a.universities.filter((Y) => Y.isPublic), j = a.highSchools.filter((Y) => Y.isPublic), E = I[0], b = T[0], N = j[0], k = [a.currentCity ? { icon: zo, content: n.jsxs(n.Fragment, { children: ["S\u1ED1ng t\u1EA1i ", n.jsx("strong", { children: a.currentCity })] }) } : null, a.hometown ? { icon: cr, content: n.jsxs(n.Fragment, { children: ["\u0110\u1EBFn t\u1EEB ", n.jsx("strong", { children: a.hometown })] }) } : null, E ? { icon: or, content: n.jsx("strong", { children: hl(E) }) } : null, b ? { icon: fr, content: n.jsx("strong", { children: ml(b) }) } : null, !b && (N != null && N.schoolName) ? { icon: lt, content: n.jsxs(n.Fragment, { children: ["\u0110\xE3 h\u1ECDc t\u1EA1i ", n.jsx("strong", { children: N.schoolName })] }) } : null].filter(Boolean).slice(0, 4), z = [k.length > 0, a.hobbies.length > 0, a.socialLinks.length > 0].filter(Boolean).length <= 1 && k.length <= 2 ? "minimal" : I.length + T.length + j.length + a.hobbies.length + a.socialLinks.length > 8 ? "rich" : "balanced", x = I.length > 1 || T.length > 1 || j.length > (b ? 0 : 1) || a.hobbies.length > 6 || a.socialLinks.length > 3, w = u === "POSTS" ? a.posts : a.reposts;
  return n.jsxs("section", { className: "screen profile-screen", children: [n.jsxs("header", { className: `profile-header structured-profile-header ${z}`, children: [n.jsx(cn, { src: a.avatarUrl, label: a.username }), n.jsxs("div", { className: "profile-identity-column", children: [n.jsxs("div", { className: "profile-identity-row", children: [n.jsxs("div", { children: [n.jsx("h2", { children: a.displayName }), n.jsxs("p", { children: ["@", a.username] })] }), y && n.jsxs("div", { className: "profile-owner-actions", children: [n.jsxs("button", { className: "profile-edit-action", onClick: () => C(true), children: [n.jsx(ha, { size: 16 }), " Ch\u1EC9nh s\u1EEDa th\xF4ng tin"] }), n.jsxs("button", { className: "profile-edit-action", onClick: r, children: [n.jsx(Dn, { size: 16 }), " Kho l\u01B0u tr\u1EEF"] })] })] }), k.length > 0 && n.jsx("div", { className: "profile-facts", children: k.map((Y, V) => {
    const P = Y.icon;
    return n.jsxs("div", { children: [n.jsx(P, { size: 16, "aria-hidden": "true" }), n.jsx("span", { children: Y.content })] }, V);
  }) }), x && n.jsxs("button", { className: "profile-about-trigger", onClick: () => p(true), children: ["Xem th\xEAm ", n.jsx(Cn, { size: 15 })] }), a.hobbies.length > 0 && n.jsx("div", { className: "profile-hobbies", children: n.jsxs("div", { children: [a.hobbies.slice(0, 3).map((Y) => n.jsx("span", { children: Y }, Y)), a.hobbies.length > 3 && n.jsx("button", { className: "profile-more-link", onClick: () => p(true), children: "More" })] }) }), a.socialLinks.length > 0 && n.jsx("div", { className: "profile-social-links", children: a.socialLinks.slice(0, 3).map((Y) => n.jsxs("a", { href: Y.link.startsWith("http") ? Y.link : `https://${Y.link}`, target: "_blank", rel: "noreferrer", children: [n.jsx(lr, { size: 14 }), n.jsx("span", { children: ss(Y.link) }), n.jsx(Eo, { size: 12 })] }, Y.id)) }), n.jsxs("div", { className: "metrics", children: [n.jsxs("button", { className: "metric-button", onClick: () => s("FOLLOWERS"), children: [n.jsx("strong", { children: ua(a.followerCount) }), n.jsx("span", { children: "Followers" })] }), n.jsxs("button", { className: "metric-button", onClick: () => s("FOLLOWING"), children: [n.jsx("strong", { children: ua(a.followingCount) }), n.jsx("span", { children: "Following" })] }), n.jsxs("button", { className: "metric-button", onClick: () => s("FRIENDS"), children: [n.jsx("strong", { children: ua(a.friendCount) }), n.jsx("span", { children: "Friends" })] })] })] })] }), !y && n.jsx(r2, { viewerId: e, profile: a, onMessage: c, onOpenProfile: d, onRefresh: f }), n.jsx(cb, { ownerId: a.id, ownProfile: y, onOpen: i }), n.jsxs("nav", { className: "profile-tabs", "aria-label": "Profile content", children: [n.jsxs("button", { className: u === "POSTS" ? "active" : "", onClick: () => h("POSTS"), children: [n.jsx(lt, { size: 16 }), n.jsx("span", { children: "Posts" }), n.jsx("small", { children: a.posts.length })] }), n.jsxs("button", { className: u === "REPOSTS" ? "active" : "", onClick: () => h("REPOSTS"), children: [n.jsx(xn, { size: 16 }), n.jsx("span", { children: "Reposts" }), n.jsx("small", { children: a.reposts.length })] })] }), w.length ? n.jsx("div", { className: "profile-grid", children: w.map((Y) => n.jsxs("button", { onClick: () => t(Y), children: [n.jsx(i2, { post: Y }), u === "REPOSTS" && n.jsx("em", { children: "Reposted" })] }, Y.id)) }) : n.jsx(Da, { icon: Dn, title: u === "POSTS" ? "No posts" : "No reposts", action: u === "POSTS" ? "Create post" : "Open feed" }), m && n.jsx(o2, { profile: a, onClose: () => p(false) }), g && y && n.jsx(f2, { profile: a, onClose: () => C(false), onSaved: f })] });
}
function o2({ profile: e, onClose: a }) {
  const t = e.jobs.filter((s) => s.isPublic), i = e.universities.filter((s) => s.isPublic), r = e.highSchools.filter((s) => s.isPublic);
  return o.useEffect(() => {
    const s = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = s;
    };
  }, []), ya.createPortal(n.jsx("div", { className: "profile-info-backdrop", onMouseDown: (s) => {
    s.target === s.currentTarget && a();
  }, children: n.jsxs("section", { className: "profile-about-panel", role: "dialog", "aria-modal": "true", "aria-label": "Th\xF4ng tin gi\u1EDBi thi\u1EC7u", children: [n.jsxs("header", { children: [n.jsx("div", { children: n.jsx("strong", { children: "Th\xF4ng tin gi\u1EDBi thi\u1EC7u" }) }), n.jsx("button", { className: "icon-button", onClick: a, "aria-label": "\u0110\xF3ng", children: n.jsx(pe, { size: 20 }) })] }), n.jsxs("div", { className: "profile-about-body", children: [(e.currentCity || e.hometown) && n.jsxs("section", { children: [n.jsx("h3", { children: "N\u01A1i s\u1ED1ng" }), e.currentCity && n.jsxs("div", { className: "about-row", children: [n.jsx(zo, { size: 18 }), n.jsxs("span", { children: ["S\u1ED1ng t\u1EA1i ", n.jsx("strong", { children: e.currentCity })] })] }), e.hometown && n.jsxs("div", { className: "about-row", children: [n.jsx(cr, { size: 18 }), n.jsxs("span", { children: ["\u0110\u1EBFn t\u1EEB ", n.jsx("strong", { children: e.hometown })] })] })] }), t.length > 0 && n.jsxs("section", { children: [n.jsx("h3", { children: "C\xF4ng vi\u1EC7c" }), n.jsx("div", { className: "about-timeline", children: t.map((s) => n.jsxs("div", { children: [n.jsx(or, { size: 18 }), n.jsxs("span", { children: [n.jsx("strong", { children: s.position || "C\xF4ng vi\u1EC7c" }), s.companyName && n.jsx("small", { children: s.companyName }), la(s.fromDate, s.toDate) && n.jsx("small", { children: la(s.fromDate, s.toDate) })] })] }, s.id)) })] }), i.length > 0 && n.jsxs("section", { children: [n.jsx("h3", { children: "H\u1ECDc v\u1EA5n" }), n.jsx("div", { className: "about-timeline", children: i.map((s) => n.jsxs("div", { children: [n.jsx(fr, { size: 18 }), n.jsxs("span", { children: [n.jsx("strong", { children: s.schoolName || s.major }), s.major && s.schoolName && n.jsx("small", { children: s.major }), n.jsx("small", { children: [la(s.from, s.to), s.isGraduate ? "\u0110\xE3 t\u1ED1t nghi\u1EC7p" : ""].filter(Boolean).join(" \xB7 ") })] })] }, s.id)) })] }), r.length > 0 && n.jsxs("section", { children: [n.jsx("h3", { children: "Tr\u01B0\u1EDDng trung h\u1ECDc" }), n.jsx("div", { className: "about-timeline", children: r.map((s) => n.jsxs("div", { children: [n.jsx(lt, { size: 18 }), n.jsxs("span", { children: [n.jsx("strong", { children: s.schoolName }), n.jsx("small", { children: [la(s.fromDate, s.toDate), s.isGraduate ? "\u0110\xE3 t\u1ED1t nghi\u1EC7p" : ""].filter(Boolean).join(" \xB7 ") })] })] }, s.id)) })] }), e.hobbies.length > 0 && n.jsxs("section", { children: [n.jsx("h3", { children: "S\u1EDF th\xEDch" }), n.jsx("div", { className: "about-hobbies", children: e.hobbies.map((s) => n.jsx("span", { children: s }, s)) })] }), e.socialLinks.length > 0 && n.jsxs("section", { children: [n.jsx("h3", { children: "Li\xEAn k\u1EBFt" }), e.socialLinks.map((s) => n.jsxs("a", { className: "about-link-row", href: s.link.startsWith("http") ? s.link : `https://${s.link}`, target: "_blank", rel: "noreferrer", children: [n.jsx(lr, { size: 18 }), n.jsxs("span", { children: [n.jsx("strong", { children: ss(s.link) }), n.jsx("small", { children: s.link.replace(/^https?:\/\//, "") })] }), n.jsx(Eo, { size: 15 })] }, s.id))] })] })] }) }), document.body);
}
function f2({ profile: e, onClose: a, onSaved: t }) {
  const [i, r] = o.useState(e.currentCity || ""), [s, f] = o.useState(e.hometown || ""), [c, d] = o.useState(e.hobbies.join(", ")), [u, h] = o.useState(null), [m, p] = o.useState(false), [g, C] = o.useState("");
  o.useEffect(() => {
    const w = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = w;
    };
  }, []);
  async function y(w) {
    p(true), C("");
    try {
      await w(), await t(), h(null), C("\u0110\xE3 l\u01B0u thay \u0111\u1ED5i");
    } catch (Y) {
      C(Y instanceof Error ? Y.message : "Kh\xF4ng th\u1EC3 l\u01B0u thay \u0111\u1ED5i");
    } finally {
      p(false);
    }
  }
  function I(w) {
    h({ kind: w, primary: "", secondary: "", from: "", to: "", isPublic: true, graduate: false });
  }
  function T(w) {
    h({ kind: "JOB", id: w.id, primary: w.position || "", secondary: w.companyName || "", from: w.fromDate || "", to: w.toDate || "", isPublic: w.isPublic, graduate: false });
  }
  function j(w) {
    h({ kind: "UNIVERSITY", id: w.id, primary: w.schoolName || "", secondary: w.major || "", from: w.from || "", to: w.to || "", isPublic: w.isPublic, graduate: w.isGraduate });
  }
  function E(w) {
    h({ kind: "HIGH_SCHOOL", id: w.id, primary: w.schoolName || "", secondary: "", from: w.fromDate || "", to: w.toDate || "", isPublic: w.isPublic, graduate: w.isGraduate });
  }
  function b(w) {
    h({ kind: "SOCIAL", id: w.id, primary: w.link, secondary: "", from: "", to: "", isPublic: true, graduate: false });
  }
  async function N() {
    if (!u || !u.primary.trim()) return;
    const w = u.id ? "PUT" : "POST";
    u.kind === "JOB" && await y(() => ie("/user-jobs", w, { id: u.id, userId: e.id, position: u.primary.trim(), companyName: u.secondary.trim() || null, from: u.from || null, to: u.to || null, isPublic: u.isPublic })), u.kind === "UNIVERSITY" && await y(() => ie("/user-universities", w, { id: u.id, userId: e.id, schoolName: u.primary.trim(), major: u.secondary.trim() || null, from: u.from || null, to: u.to || null, isGraduate: u.graduate, isPublic: u.isPublic })), u.kind === "HIGH_SCHOOL" && await y(() => ie("/user-high-schools", w, { id: u.id, userId: e.id, schoolName: u.primary.trim(), from: u.from || null, to: u.to || null, isGraduate: u.graduate, isPublic: u.isPublic })), u.kind === "SOCIAL" && await y(() => ie("/user-social-media", w, { id: u.id, userId: e.id, link: u.primary.trim() }));
  }
  async function k(w, Y) {
    const V = w === "JOB" ? "user-jobs" : w === "UNIVERSITY" ? "user-universities" : w === "HIGH_SCHOOL" ? "user-high-schools" : "user-social-media";
    await y(() => ie(`/${V}/${encodeURIComponent(Y)}`, "DELETE"));
  }
  async function B(w) {
    await y(() => ie("/user-jobs", "PUT", { id: w.id, isPublic: !w.isPublic }));
  }
  async function z(w) {
    await y(() => ie("/user-universities", "PUT", { id: w.id, isPublic: !w.isPublic }));
  }
  async function x(w) {
    await y(() => ie("/user-high-schools", "PUT", { id: w.id, isPublic: !w.isPublic }));
  }
  return ya.createPortal(n.jsx("div", { className: "profile-info-backdrop", children: n.jsxs("section", { className: "profile-editor-panel", role: "dialog", "aria-modal": "true", "aria-label": "Ch\u1EC9nh s\u1EEDa th\xF4ng tin", children: [n.jsxs("header", { children: [n.jsx("div", { children: n.jsx("strong", { children: "Ch\u1EC9nh s\u1EEDa th\xF4ng tin" }) }), n.jsx("button", { className: "icon-button", onClick: a, "aria-label": "\u0110\xF3ng", children: n.jsx(pe, { size: 20 }) })] }), n.jsxs("div", { className: "profile-editor-body", children: [n.jsxs("section", { children: [n.jsx("h3", { children: "N\u01A1i s\u1ED1ng" }), n.jsxs("label", { children: [n.jsx("span", { children: "Th\xE0nh ph\u1ED1 hi\u1EC7n t\u1EA1i" }), n.jsx("input", { value: i, onChange: (w) => r(w.target.value), placeholder: "\u0110\xE0 N\u1EB5ng" })] }), n.jsxs("label", { children: [n.jsx("span", { children: "Qu\xEA qu\xE1n" }), n.jsx("input", { value: s, onChange: (w) => f(w.target.value), placeholder: "TP. H\u1ED3 Ch\xED Minh" })] }), n.jsxs("label", { children: [n.jsx("span", { children: "S\u1EDF th\xEDch" }), n.jsx("input", { value: c, onChange: (w) => d(w.target.value), placeholder: "Photography, Football" })] }), n.jsx("button", { className: "profile-editor-save", disabled: m, onClick: () => void y(() => ie("/user-details/update", "PUT", { userId: e.id, livingIn: i.trim(), homeTown: s.trim(), hobbieList: c.split(",").map((w) => w.trim()).filter(Boolean) })), children: "L\u01B0u th\xF4ng tin c\u01A1 b\u1EA3n" })] }), n.jsx(Dt, { title: "C\xF4ng vi\u1EC7c", onAdd: () => I("JOB"), children: e.jobs.map((w) => n.jsx(At, { icon: or, title: hl(w), detail: la(w.fromDate, w.toDate), visible: w.isPublic, onToggle: () => void B(w), onEdit: () => T(w), onDelete: () => void k("JOB", w.id) }, w.id)) }), n.jsx(Dt, { title: "\u0110\u1EA1i h\u1ECDc", onAdd: () => I("UNIVERSITY"), children: e.universities.map((w) => n.jsx(At, { icon: fr, title: ml(w), detail: la(w.from, w.to), visible: w.isPublic, onToggle: () => void z(w), onEdit: () => j(w), onDelete: () => void k("UNIVERSITY", w.id) }, w.id)) }), n.jsx(Dt, { title: "Tr\u01B0\u1EDDng trung h\u1ECDc", onAdd: () => I("HIGH_SCHOOL"), children: e.highSchools.map((w) => n.jsx(At, { icon: lt, title: w.schoolName || "Tr\u01B0\u1EDDng trung h\u1ECDc", detail: la(w.fromDate, w.toDate), visible: w.isPublic, onToggle: () => void x(w), onEdit: () => E(w), onDelete: () => void k("HIGH_SCHOOL", w.id) }, w.id)) }), n.jsx(Dt, { title: "Li\xEAn k\u1EBFt m\u1EA1ng x\xE3 h\u1ED9i", onAdd: () => I("SOCIAL"), children: e.socialLinks.map((w) => n.jsx(At, { icon: lr, title: ss(w.link), detail: w.link, onEdit: () => b(w), onDelete: () => void k("SOCIAL", w.id) }, w.id)) })] }), g && n.jsx("p", { className: "profile-editor-message", role: "status", children: g }), u && n.jsx(c2, { draft: u, busy: m, onChange: h, onCancel: () => h(null), onSave: () => void N() })] }) }), document.body);
}
function Dt({ title: e, onAdd: a, children: t }) {
  return n.jsxs("section", { className: "profile-editor-section", children: [n.jsxs("header", { children: [n.jsx("h3", { children: e }), n.jsxs("button", { onClick: a, children: [n.jsx(Pa, { size: 15 }), " Th\xEAm"] })] }), n.jsx("div", { children: t })] });
}
function At({ icon: e, title: a, detail: t, visible: i, onToggle: r, onEdit: s, onDelete: f }) {
  return n.jsxs("div", { className: "profile-editor-row", children: [n.jsx(e, { size: 18 }), n.jsxs("span", { children: [n.jsx("strong", { children: a }), t && n.jsx("small", { children: t })] }), r && n.jsx("button", { className: `visibility-toggle ${i ? "visible" : "hidden"}`, onClick: r, children: i ? "Hi\u1EC3n th\u1ECB tr\xEAn trang c\xE1 nh\xE2n" : "\u1EA8n kh\u1ECFi trang c\xE1 nh\xE2n" }), n.jsx("button", { className: "icon-button", onClick: s, "aria-label": "Ch\u1EC9nh s\u1EEDa", children: n.jsx(ha, { size: 16 }) }), n.jsx("button", { className: "icon-button danger", onClick: f, "aria-label": "X\xF3a", children: n.jsx(da, { size: 16 }) })] });
}
function c2({ draft: e, busy: a, onChange: t, onCancel: i, onSave: r }) {
  const s = e.kind === "JOB" ? "V\u1ECB tr\xED" : e.kind === "SOCIAL" ? "\u0110\u01B0\u1EDDng d\u1EABn" : "T\xEAn tr\u01B0\u1EDDng";
  return n.jsx("div", { className: "profile-entry-form-backdrop", onMouseDown: (f) => {
    f.target === f.currentTarget && i();
  }, children: n.jsxs("form", { className: "profile-entry-form", onSubmit: (f) => {
    f.preventDefault(), r();
  }, children: [n.jsxs("header", { children: [n.jsx("strong", { children: e.id ? "Ch\u1EC9nh s\u1EEDa" : "Th\xEAm th\xF4ng tin" }), n.jsx("button", { type: "button", className: "icon-button", onClick: i, children: n.jsx(pe, { size: 18 }) })] }), n.jsxs("label", { children: [n.jsx("span", { children: s }), n.jsx("input", { required: true, value: e.primary, onChange: (f) => t({ ...e, primary: f.target.value }) })] }), (e.kind === "JOB" || e.kind === "UNIVERSITY") && n.jsxs("label", { children: [n.jsx("span", { children: e.kind === "JOB" ? "C\xF4ng ty" : "Chuy\xEAn ng\xE0nh" }), n.jsx("input", { value: e.secondary, onChange: (f) => t({ ...e, secondary: f.target.value }) })] }), e.kind !== "SOCIAL" && n.jsxs("div", { className: "profile-date-fields", children: [n.jsxs("label", { children: [n.jsx("span", { children: "T\u1EEB" }), n.jsx("input", { type: "date", value: e.from, onChange: (f) => t({ ...e, from: f.target.value }) })] }), n.jsxs("label", { children: [n.jsx("span", { children: "\u0110\u1EBFn" }), n.jsx("input", { type: "date", value: e.to, onChange: (f) => t({ ...e, to: f.target.value }) })] })] }), e.kind !== "SOCIAL" && n.jsxs("label", { className: "profile-check", children: [n.jsx("input", { type: "checkbox", checked: e.isPublic, onChange: (f) => t({ ...e, isPublic: f.target.checked }) }), n.jsx("span", { children: "Hi\u1EC3n th\u1ECB tr\xEAn trang c\xE1 nh\xE2n" })] }), (e.kind === "UNIVERSITY" || e.kind === "HIGH_SCHOOL") && n.jsxs("label", { className: "profile-check", children: [n.jsx("input", { type: "checkbox", checked: e.graduate, onChange: (f) => t({ ...e, graduate: f.target.checked }) }), n.jsx("span", { children: "\u0110\xE3 t\u1ED1t nghi\u1EC7p" })] }), n.jsxs("footer", { children: [n.jsx("button", { type: "button", onClick: i, children: "H\u1EE7y" }), n.jsx("button", { disabled: a || !e.primary.trim(), children: "L\u01B0u" })] })] }) });
}
function l2({ viewerId: e, profile: a, activeTab: t, onTabChange: i, onClose: r, onOpenProfile: s, onRelationshipRemoved: f }) {
  const [c, d] = o.useState(""), [u, h] = o.useState("RECENT"), [m, p] = o.useState([]), [g, C] = o.useState("idle"), [y, I] = o.useState(""), [T, j] = o.useState(null), [E, b] = o.useState(false), N = (a == null ? void 0 : a.id) === e, k = [{ id: "FOLLOWERS", label: "Followers" }, { id: "FOLLOWING", label: "Following" }, { id: "FRIENDS", label: "Friends" }];
  async function B() {
    if (a) {
      C("loading"), I("");
      try {
        const w = await fe(`/profiles/${encodeURIComponent(a.id)}/connections?viewerId=${encodeURIComponent(e)}&tab=${t}&query=${encodeURIComponent(c)}&sort=${u}&page=0&size=40`);
        p(w.users ?? []), C("ready");
      } catch (w) {
        p([]), C("error"), I(w instanceof Error ? w.message : "Could not load connections");
      }
    }
  }
  o.useEffect(() => {
    B();
  }, [a == null ? void 0 : a.id, e, t, c, u]), o.useEffect(() => {
    const w = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = w;
    };
  }, []), o.useEffect(() => {
    function w(Y) {
      Y.key === "Escape" && (T ? j(null) : r());
    }
    return document.addEventListener("keydown", w), () => document.removeEventListener("keydown", w);
  }, [T, r]);
  async function z(w) {
    w.relationshipAction === "Follow" || w.relationshipAction === "Follow back" ? await ie("/user-followers/follow", "POST", { followerId: e, followingId: w.userId }).catch(() => {
    }) : w.relationshipAction === "Following" && await ie(`/user-followers/unfollow?followerId=${encodeURIComponent(e)}&followingId=${encodeURIComponent(w.userId)}`, "DELETE").catch(() => {
    }), B();
  }
  async function x() {
    if (!a || !T || E) return;
    const { row: w, kind: Y } = T, V = Y === "REMOVE_FOLLOWER" ? w.userId : a.id, P = Y === "REMOVE_FOLLOWER" ? a.id : w.userId;
    b(true);
    try {
      await ie(`/user-followers/unfollow?followerId=${encodeURIComponent(V)}&followingId=${encodeURIComponent(P)}`, "DELETE"), p((D) => D.filter((q) => q.userId !== w.userId)), f(t, w), j(null);
    } catch (D) {
      I(D instanceof Error ? D.message : "Could not update this relationship");
    } finally {
      b(false);
    }
  }
  return a ? n.jsxs("div", { className: "connections-modal-backdrop", onMouseDown: (w) => {
    w.target === w.currentTarget && r();
  }, children: [n.jsxs("section", { className: "connections-modal", role: "dialog", "aria-modal": "true", "aria-label": `${a.username} connections`, children: [n.jsxs("header", { className: "connections-modal-header", children: [n.jsxs("div", { children: [n.jsx("strong", { children: a.displayName }), n.jsxs("small", { children: ["@", a.username] })] }), n.jsx("button", { className: "icon-button", onClick: r, "aria-label": "Close connections", children: n.jsx(pe, { size: 20 }) })] }), n.jsx("div", { className: "connections-tabs", role: "tablist", children: k.map((w) => n.jsx("button", { role: "tab", "aria-selected": t === w.id, className: t === w.id ? "active" : "", onClick: () => i(w.id), children: w.label }, w.id)) }), n.jsxs("div", { className: "connections-tools", children: [n.jsxs("label", { children: [n.jsx(ma, { size: 18 }), n.jsx("input", { value: c, onChange: (w) => d(w.target.value), placeholder: "Search connections" })] }), n.jsxs("select", { value: u, onChange: (w) => h(w.target.value), "aria-label": "Sort connections", children: [n.jsx("option", { value: "RECENT", children: "Recent" }), n.jsx("option", { value: "NAME", children: "Name" })] })] }), g === "loading" && n.jsx(d2, {}), g === "error" && n.jsxs("div", { className: "connection-state", children: [n.jsx(In, { size: 24 }), n.jsx("strong", { children: "Failed loading state" }), n.jsx("span", { children: y }), n.jsx("button", { onClick: () => void B(), children: "Retry" })] }), g === "ready" && m.length === 0 && n.jsxs("div", { className: "connection-state", children: [n.jsx(Bn, { size: 24 }), n.jsx("strong", { children: t === "FRIENDS" ? "No mutual friends yet" : "No connections found" }), n.jsx("span", { children: c ? "Try a different search." : "This list is currently empty." })] }), g === "ready" && m.length > 0 && n.jsx("div", { className: "connections-list", children: m.map((w) => {
    const Y = N && t === "FOLLOWERS", V = N && t === "FOLLOWING";
    return n.jsxs("div", { className: "connection-row simple", children: [n.jsxs("button", { className: "connection-identity", onClick: () => void s(w.userId), children: [n.jsx(cn, { src: w.avatarUrl || "", label: w.username }), n.jsxs("span", { children: [n.jsx("strong", { children: w.displayName }), n.jsxs("small", { children: ["@", w.username] }), w.mutualContext && n.jsx("em", { children: w.mutualContext })] })] }), Y && n.jsx("button", { className: "relationship-action secondary", onClick: () => j({ row: w, kind: "REMOVE_FOLLOWER" }), children: "X\xF3a" }), V && n.jsx("button", { className: "relationship-action secondary", onClick: () => j({ row: w, kind: "UNFOLLOW" }), children: "\u0110ang theo d\xF5i" }), !Y && !V && n.jsx("button", { className: w.friend ? "relationship-action friend" : "relationship-action", onClick: () => void z(w), disabled: w.relationshipAction === "You" || w.relationshipAction === "Friend", children: w.relationshipAction })] }, `${w.userId}-${w.id}`);
  }) })] }), T && n.jsx("div", { className: "connection-confirm-backdrop", onMouseDown: (w) => {
    w.target === w.currentTarget && !E && j(null);
  }, children: n.jsxs("section", { className: "connection-confirm-dialog", role: "alertdialog", "aria-modal": "true", "aria-label": T.kind === "REMOVE_FOLLOWER" ? "Remove follower" : "Unfollow user", children: [n.jsx(cn, { src: T.row.avatarUrl || "", label: T.row.username }), n.jsx("p", { children: T.kind === "REMOVE_FOLLOWER" ? `${T.row.username} s\u1EBD kh\xF4ng bi\u1EBFt b\u1EA1n \u0111\xE3 x\xF3a h\u1ECD kh\u1ECFi danh s\xE1ch.` : `X\xE1c nh\u1EADn b\u1ECF theo d\xF5i ${T.row.username}?` }), n.jsxs("div", { className: "connection-confirm-actions", children: [n.jsx("button", { className: "confirm", onClick: () => void x(), disabled: E, children: E ? "\u0110ang x\u1EED l\xFD..." : T.kind === "REMOVE_FOLLOWER" ? "X\xF3a" : "B\u1ECF theo d\xF5i" }), n.jsx("button", { onClick: () => j(null), disabled: E, children: "H\u1EE7y" })] })] }) })] }) : null;
}
function d2() {
  return n.jsx("div", { className: "connections-list loading", "aria-label": "Loading connections", children: Array.from({ length: 6 }).map((e, a) => n.jsxs("div", { className: "connection-row skeleton", children: [n.jsx("span", {}), n.jsxs("div", { children: [n.jsx("i", {}), n.jsx("i", {})] }), n.jsx("b", {})] }, a)) });
}
function Qi() {
  return window.crypto.randomUUID();
}
function gl({ viewerId: e, onClose: a, onCreated: t }) {
  const [i, r] = o.useState(""), [s, f] = o.useState([]), [c, d] = o.useState([]), [u, h] = o.useState("loading"), [m, p] = o.useState(false), [g, C] = o.useState(false), [y, I] = o.useState(""), [T, j] = o.useState(""), E = o.useRef(null), b = o.useRef(null);
  o.useEffect(() => {
    var x;
    (x = (g ? b : E).current) == null || x.focus();
    function z(w) {
      w.key !== "Escape" || m || (g ? C(false) : a());
    }
    return window.addEventListener("keydown", z), () => window.removeEventListener("keydown", z);
  }, [m, g, a]), o.useEffect(() => {
    if (g) return;
    let z = false;
    const x = window.setTimeout(async () => {
      s.length === 0 && h("loading"), j("");
      try {
        const w = await fe(`/user-details/chat-suggestions?viewerId=${encodeURIComponent(e)}&query=${encodeURIComponent(i.trim())}&limit=30`);
        z || (f(w ?? []), h("ready"));
      } catch {
        z || (f([]), h("error"));
      }
    }, 180);
    return () => {
      z = true, window.clearTimeout(x);
    };
  }, [g, i, e]);
  function N(z) {
    var x;
    return ((x = z.fullName) == null ? void 0 : x.trim()) || z.username;
  }
  function k(z) {
    d((x) => x.some((w) => w.id === z.id) ? x.filter((w) => w.id !== z.id) : [...x, z]);
  }
  async function B() {
    var z;
    if (!(!c.length || m)) {
      if (c.length > 1 && !g) {
        C(true), j("");
        return;
      }
      if (c.length > 1 && !y.trim()) {
        j("Vui l\xF2ng nh\u1EADp t\xEAn nh\xF3m."), (z = b.current) == null || z.focus();
        return;
      }
      p(true), j("");
      try {
        const x = c.length === 1 ? await ie(`/chat/conversations/direct?actorId=${encodeURIComponent(e)}`, "POST", { targetUserId: c[0].id }) : await ie(`/chat/conversations/group?actorId=${encodeURIComponent(e)}`, "POST", { title: y.trim(), initialUserIds: c.map((w) => w.id) });
        t(x);
      } catch (x) {
        j(x instanceof Error ? x.message : "Kh\xF4ng th\u1EC3 b\u1EAFt \u0111\u1EA7u cu\u1ED9c tr\xF2 chuy\u1EC7n.");
      } finally {
        p(false);
      }
    }
  }
  return ya.createPortal(n.jsx("div", { className: "new-chat-backdrop", onMouseDown: (z) => {
    z.target === z.currentTarget && !m && a();
  }, children: n.jsxs("section", { className: `new-chat-dialog${g ? " group-setup" : ""}`, role: "dialog", "aria-modal": "true", "aria-labelledby": "new-chat-title", children: [n.jsxs("header", { children: [n.jsx("button", { type: "button", onClick: () => g ? C(false) : a(), disabled: m, "aria-label": g ? "Quay l\u1EA1i ch\u1ECDn th\xE0nh vi\xEAn" : "\u0110\xF3ng", children: g ? n.jsx(dn, { size: 20 }) : n.jsx(pe, { size: 20 }) }), n.jsx("h2", { id: "new-chat-title", children: g ? "T\u1EA1o nh\xF3m" : "Tin nh\u1EAFn m\u1EDBi" }), n.jsx("span", {})] }), g ? n.jsxs("div", { className: "new-group-setup", children: [n.jsxs("label", { children: [n.jsx("span", { children: "T\xEAn nh\xF3m" }), n.jsx("input", { ref: b, value: y, maxLength: 255, onChange: (z) => I(z.target.value), placeholder: "Nh\u1EADp t\xEAn nh\xF3m..." })] }), n.jsxs("div", { className: "new-group-members", children: [n.jsxs("p", { children: ["Th\xE0nh vi\xEAn \xB7 ", c.length + 1] }), c.map((z) => n.jsxs("article", { children: [n.jsx("span", { className: "new-chat-avatar", children: n.jsx(cn, { src: z.avatar ?? void 0, label: N(z) }) }), n.jsxs("span", { children: [n.jsx("strong", { children: N(z) }), n.jsxs("small", { children: ["@", z.username] })] })] }, z.id))] })] }) : n.jsxs(n.Fragment, { children: [n.jsxs("div", { className: "new-chat-recipient-field", children: [n.jsx("strong", { children: "T\u1EDBi:" }), n.jsxs("div", { className: "new-chat-recipient-input", children: [c.length > 0 && n.jsx("div", { className: "new-chat-selected-grid", children: c.map((z) => n.jsxs("span", { children: [n.jsx("b", { children: N(z) }), n.jsx("button", { type: "button", onClick: () => k(z), "aria-label": `B\u1ECF ch\u1ECDn ${N(z)}`, children: n.jsx(pe, { size: 13 }) })] }, z.id)) }), n.jsx("input", { ref: E, value: i, onChange: (z) => r(z.target.value), placeholder: "T\xECm ki\u1EBFm...", "aria-label": "T\xECm ki\u1EBFm theo username" })] })] }), n.jsxs("div", { className: "new-chat-results", children: [n.jsx("p", { children: i.trim() ? "K\u1EBFt qu\u1EA3" : "B\u1EA1n b\xE8" }), u === "loading" && n.jsx(Mt, {}), u === "error" && n.jsxs("div", { className: "new-chat-empty", children: [n.jsx(In, { size: 22 }), n.jsx("span", { children: "Kh\xF4ng th\u1EC3 t\u1EA3i danh s\xE1ch ng\u01B0\u1EDDi d\xF9ng." })] }), u === "ready" && s.length === 0 && n.jsxs("div", { className: "new-chat-empty", children: [n.jsx(Bn, { size: 22 }), n.jsx("span", { children: i.trim() ? "Kh\xF4ng t\xECm th\u1EA5y username ph\xF9 h\u1EE3p." : "Ch\u01B0a c\xF3 b\u1EA1n b\xE8 \u0111\u1EC3 hi\u1EC3n th\u1ECB." })] }), u === "ready" && s.map((z) => {
    const x = c.some((w) => w.id === z.id);
    return n.jsxs("button", { type: "button", className: x ? "selected" : "", onClick: () => k(z), children: [n.jsx("span", { className: "new-chat-avatar", children: n.jsx(cn, { src: z.avatar ?? void 0, label: N(z) }) }), n.jsxs("span", { children: [n.jsx("strong", { children: N(z) }), n.jsxs("small", { children: ["@", z.username] })] }), n.jsx("i", { "aria-hidden": "true", children: x && n.jsx(gn, { size: 15 }) })] }, z.id);
  })] })] }), T && n.jsx("p", { className: "new-chat-error", role: "alert", children: T }), n.jsx("footer", { children: n.jsx("button", { type: "button", onClick: () => void B(), disabled: !c.length || m || g && !y.trim(), children: m ? "\u0110ang t\u1EA1o..." : "Chat" }) })] }) }), document.body);
}
function Qa(e) {
  var t, i, r, s, f;
  if (e.deleted) return "Tin nh\u1EAFn \u0111\xE3 \u0111\u01B0\u1EE3c thu h\u1ED3i";
  const a = (t = e.content) == null ? void 0 : t.trim();
  return a || (e.messageType === "IMAGE_GROUP" || (((r = (i = e.metadata) == null ? void 0 : i.items) == null ? void 0 : r.length) ?? 0) > 1 ? `\u0110\xE3 g\u1EEDi ${((f = (s = e.metadata) == null ? void 0 : s.items) == null ? void 0 : f.length) ?? 1} \u1EA3nh` : e.messageType === "IMAGE" ? "\u0110\xE3 g\u1EEDi m\u1ED9t \u1EA3nh" : e.messageType === "VIDEO" ? "\u0110\xE3 g\u1EEDi m\u1ED9t video" : e.messageType === "AUDIO" ? "\u0110\xE3 g\u1EEDi m\u1ED9t tin nh\u1EAFn tho\u1EA1i" : "\u0110\xE3 g\u1EEDi m\u1ED9t tin nh\u1EAFn");
}
function Io(e) {
  return { messageSeq: e.messageSeq, senderId: e.senderId, senderDisplayName: e.senderDisplayName, messageType: e.messageType, content: e.content, metadata: e.metadata, deleted: e.deleted };
}
async function So(e) {
  const a = await ga(e.file);
  return { url: a.secureUrl, publicId: a.publicId, mimeType: e.file.type || a.mimeType, size: a.bytes || e.file.size, fileName: a.fileName || e.file.name, width: a.width, height: a.height, duration: e.kind === "AUDIO" ? e.duration ?? a.duration : a.duration };
}
async function pl(e) {
  const { conversationId: a, userId: t, draft: i, replyTo: r, sending: s, mediaComposer: f, optimisticPrefix: c, loadRecipientIds: d, setDraft: u, setReplyTo: h, setSending: m, setMessages: p, updateConversationPreview: g, enqueueOfflineMessage: C } = e, y = i.trim(), I = [...f.images], T = f.audioAttachment;
  if (s || f.recording || !y && I.length === 0 && !T) return;
  const j = typeof navigator > "u" || navigator.onLine, E = r;
  u(""), h(null), m(true);
  let b = [];
  if (j) try {
    b = await d();
  } catch {
    b = [];
  }
  const N = (z, x, w, Y) => ie(`/chat/conversations/${a}/messages?actorId=${encodeURIComponent(t)}`, "POST", { clientMessageId: Qi(), messageType: z, content: x, metadata: w, replyToSeq: Y, recipientId: b.length === 1 ? b[0] : null, recipientIds: b.length > 1 ? b : null });
  if (I.length > 0) {
    const z = { id: `${c}-media-${Date.now()}`, conversationId: a, messageSeq: Date.now(), clientMessageId: Qi(), senderId: t, messageType: "IMAGE_GROUP", content: y || null, metadata: { items: I.map((w) => ({ id: w.id, url: w.previewUrl, fileName: w.file.name, mimeType: w.file.type, size: w.file.size, status: "uploading", progress: 8 })) }, createdAt: (/* @__PURE__ */ new Date()).toISOString(), status: j ? "sending" : "failed", replyToSeq: (E == null ? void 0 : E.messageSeq) ?? null, reply: E ? Io(E) : null };
    if (p((w) => [...w.filter((Y) => !(Y.id.startsWith(`${c}-media-`) && Y.status === "failed")), z]), !j) {
      I.forEach((w) => f.updateImageState(w.id, { status: "failed", progress: 0, error: "Kh\xF4ng c\xF3 k\u1EBFt n\u1ED1i m\u1EA1ng" })), u(y), h(E), m(false);
      return;
    }
    const x = [];
    try {
      const w = await Promise.all(I.map(async (Y) => {
        f.updateImageState(Y.id, { status: "uploading", progress: 18, error: void 0 });
        try {
          const V = await So(Y);
          return f.updateImageState(Y.id, { status: "uploading", progress: 100, error: void 0 }), V;
        } catch (V) {
          throw f.updateImageState(Y.id, { status: "failed", progress: 0, error: "T\u1EA3i \u1EA3nh th\u1EA5t b\u1EA1i" }), V;
        }
      }));
      for (let Y = 0; Y < w.length; Y += 1) {
        const V = await N("IMAGE", null, w[Y], Y === 0 ? z.replyToSeq ?? null : null), P = { ...V, status: en.outgoingStatus(a, V.messageSeq) };
        x.push(P), en.publishLocalMessage(P);
      }
      if (y) {
        const Y = await N("TEXT", y, null, null), V = { ...Y, status: en.outgoingStatus(a, Y.messageSeq) };
        x.push(V), en.publishLocalMessage(V);
      }
      p((Y) => On(x, Y.filter((V) => V.id !== z.id), a)), g(y || `\u0110\xE3 g\u1EEDi ${I.length} \u1EA3nh`), f.clearImages();
    } catch {
      p((w) => On(x, [...w.filter((Y) => Y.id !== z.id), { ...z, status: "failed" }], a)), u(y), h(E);
    } finally {
      m(false);
    }
    return;
  }
  const k = T, B = { id: `${c}-${Date.now()}`, conversationId: a, messageSeq: Date.now(), clientMessageId: Qi(), senderId: t, messageType: k ? "AUDIO" : "TEXT", content: k ? null : y, metadata: k ? { url: k.previewUrl, mimeType: k.file.type, size: k.file.size, fileName: k.file.name, duration: k.duration } : null, createdAt: (/* @__PURE__ */ new Date()).toISOString(), status: j ? "sending" : k ? "failed" : "queued", replyToSeq: (E == null ? void 0 : E.messageSeq) ?? null, reply: E ? Io(E) : null };
  if (p((z) => [...z, B]), !j) {
    k || C(B), u(y), h(E), m(false);
    return;
  }
  try {
    const z = k ? await So(k) : null, x = await N(k ? "AUDIO" : "TEXT", k ? null : y, z, B.replyToSeq ?? null), w = [{ ...x, status: en.outgoingStatus(a, x.messageSeq) }];
    if (en.publishLocalMessage(w[0]), k && y) {
      const Y = await N("TEXT", y, null, null), V = { ...Y, status: en.outgoingStatus(a, Y.messageSeq) };
      w.push(V), en.publishLocalMessage(V);
    }
    p((Y) => On(w, Y.filter((V) => V.id !== B.id), a)), g(y || Qa(x)), k && f.clearAudio();
  } catch {
    p((z) => z.map((x) => x.id === B.id ? { ...x, status: "failed" } : x)), u(y), h(E);
  } finally {
    m(false);
  }
}
function bl(e) {
  var t, i, r, s;
  const a = ((i = (t = e.metadata) == null ? void 0 : t.items) == null ? void 0 : i.filter((f) => f.url || f.thumbnailUrl)) ?? [];
  return a.length ? a : !((r = e.metadata) != null && r.url) && !((s = e.metadata) != null && s.thumbnailUrl) ? [] : [{ ...e.metadata, url: e.metadata.url || e.metadata.thumbnailUrl }];
}
function zt(e) {
  if (!(e != null && e.createdAt)) return 0;
  const a = new Date(e.createdAt).getTime();
  return Number.isFinite(a) ? a : 0;
}
function wl(e) {
  const a = [];
  let t = 0;
  for (; t < e.length; ) {
    const i = e[t];
    if (i.messageType !== "IMAGE" || i.deleted) {
      a.push(i), t += 1;
      continue;
    }
    const r = [i];
    let s = t + 1;
    for (; s < e.length; ) {
      const h = e[s], m = r[r.length - 1], p = Math.abs(zt(h) - zt(m)) <= 8e3;
      if (h.messageType !== "IMAGE" || h.deleted || h.senderId !== i.senderId || !p) break;
      r.push(h), s += 1;
    }
    const f = e[s], d = f && f.messageType === "TEXT" && !f.deleted && f.senderId === i.senderId && !f.replyToSeq && Math.abs(zt(f) - zt(r[r.length - 1])) <= 5e3 ? f : null;
    if (r.length === 1 && !d) {
      a.push(i), t += 1;
      continue;
    }
    const u = d ?? r[r.length - 1];
    a.push({ ...i, id: `image-group:${r.map((h) => h.id).join(":")}${d ? `:${d.id}` : ""}`, messageType: "IMAGE_GROUP", content: (d == null ? void 0 : d.content) ?? null, metadata: { ...i.metadata, items: r.flatMap(bl) }, status: u.status ?? i.status, editedAt: (d == null ? void 0 : d.editedAt) ?? i.editedAt, groupMessageSeqs: [...r.map((h) => h.messageSeq), ...d ? [d.messageSeq] : []] }), t = s + (d ? 1 : 0);
  }
  return a;
}
function u2(e) {
  var a, t, i, r, s, f;
  return !e || e.deleted ? "Tin nh\u1EAFn g\u1ED1c kh\xF4ng c\xF2n t\u1ED3n t\u1EA1i" : (((t = (a = e.metadata) == null ? void 0 : a.items) == null ? void 0 : t.length) ?? 0) > 1 ? `${(r = (i = e.metadata) == null ? void 0 : i.items) == null ? void 0 : r.length} \u1EA3nh` : e.messageType === "IMAGE" || e.messageType === "IMAGE_GROUP" ? "\u1EA2nh" : e.messageType === "VIDEO" ? "Video" : e.messageType === "AUDIO" ? `Tin nh\u1EAFn tho\u1EA1i${(s = e.metadata) != null && s.duration ? ` \xB7 ${ot(e.metadata.duration)}` : ""}` : ((f = e.content) == null ? void 0 : f.trim()) || "Tin nh\u1EAFn g\u1ED1c kh\xF4ng c\xF2n t\u1ED3n t\u1EA1i";
}
function yl(e, a) {
  var i;
  if (!e.lastMessageSeq) return "Ch\u01B0a c\xF3 tin nh\u1EAFn";
  const t = ((i = e.lastMessagePreview) == null ? void 0 : i.trim()) || (e.lastMessageType === "IMAGE" ? "\u0110\xE3 g\u1EEDi m\u1ED9t \u1EA3nh" : e.lastMessageType === "VIDEO" ? "\u0110\xE3 g\u1EEDi m\u1ED9t video" : e.lastMessageType === "AUDIO" ? "\u0110\xE3 g\u1EEDi m\u1ED9t tin nh\u1EAFn tho\u1EA1i" : "Tin nh\u1EAFn m\u1EDBi");
  return e.lastMessageSenderId === a ? `B\u1EA1n: ${t}` : t;
}
function jl(e) {
  var a;
  return e.messageType === "SYSTEM" && ((a = e.content) == null ? void 0 : a.trim()) === "Nh\xF3m chat \u0111\xE3 b\u1ECB gi\u1EA3i t\xE1n";
}
function h2({ userId: e, username: a, onOpenProfile: t, initialTarget: i }) {
  var A, $;
  const [r, s] = o.useState(""), [f, c] = o.useState("ALL"), [d, u] = o.useState([]), [h, m] = o.useState({}), [p, g] = o.useState(null), [C, y] = o.useState([]), [I, T] = o.useState("idle"), [j, E] = o.useState("idle"), [b, N] = o.useState(""), [k, B] = o.useState(null), [z, x] = o.useState(null), [w, Y] = o.useState(false), V = o.useRef(null), P = o.useRef(null), D = Qo(), [q, ne] = o.useState(null), [be, he] = o.useState("INBOX"), [re, me] = o.useState([]), [we, F] = o.useState(false), [ze, Se] = o.useState(false), [ye, ue] = o.useState(false), [ke, Ne] = o.useState(null), se = o.useRef(null), $e = o.useRef(null), xe = o.useRef(true), Qe = o.useRef(null), De = o.useRef(null), [Ze, Ge] = o.useState(false), [Ee, Q] = o.useState(false), [oe, ee] = o.useState(false), ge = o.useRef(false), O = o.useRef(null), K = o.useRef("smooth"), X = o.useRef(""), H = d.find((v) => v.id === p) ?? null, _ = d.filter((v) => `${v.title} ${v.preview}`.toLowerCase().includes(r.toLowerCase()) && (f === "ALL" || v.unreadCount > 0));
  o.useEffect(() => {
    Me(i == null ? void 0 : i.conversationId);
  }, [e, i == null ? void 0 : i.conversationId]), o.useEffect(() => {
    !i || p !== i.conversationId || (he("CONVERSATION"), i.panel && ue(true));
  }, [p, i == null ? void 0 : i.conversationId, i == null ? void 0 : i.panel]), o.useEffect(() => {
    var R;
    if (!i || p !== i.conversationId || j !== "ready") return;
    const v = i.messageSeq ?? (i.messageId ? (R = C.find((G) => G.id === i.messageId)) == null ? void 0 : R.messageSeq : void 0);
    if (v === void 0) return;
    const L = `${i.conversationId}:${v}`;
    X.current !== L && (X.current = L, an(v));
  }, [p, i == null ? void 0 : i.conversationId, i == null ? void 0 : i.messageId, i == null ? void 0 : i.messageSeq, j, C.length]), o.useEffect(() => {
    if (!p) {
      y([]);
      return;
    }
    window.innerWidth < 768 && be !== "CONVERSATION" || Te(p);
  }, [p, e, be]), o.useEffect(() => {
    ue(false);
  }, [p]), o.useEffect(() => {
    Ne(null);
  }, [p]), o.useEffect(() => {
    xe.current = true, De.current = null, ge.current = false, O.current = null, Ge(false), Q(false), ee(false);
  }, [p]), o.useLayoutEffect(() => {
    const v = O.current, L = se.current;
    !v || !L || v.conversationId !== p || (L.scrollTop = v.scrollTop + (L.scrollHeight - v.scrollHeight), O.current = null);
  }, [p, C.length]), o.useEffect(() => {
    const v = se.current, L = $e.current;
    if (!v || !L || !p || j !== "ready" || !Ze) return;
    const R = new IntersectionObserver((G) => {
      var J;
      !((J = G[0]) != null && J.isIntersecting) || De.current !== p || de();
    }, { root: v, rootMargin: "180px 0px 0px", threshold: 0.01 });
    return R.observe(L), () => R.disconnect();
  }, [p, j, Ze, (A = C[0]) == null ? void 0 : A.messageSeq]), o.useEffect(() => {
    if (j !== "ready" || Qe.current !== p || !xe.current) return;
    const v = window.requestAnimationFrame(() => {
      const L = se.current;
      if (!L) return;
      if (De.current !== p) {
        L.scrollTop = L.scrollHeight, De.current = p;
        return;
      }
      L.scrollTo({ top: L.scrollHeight, behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(v);
  }, [p, j, C.length]), o.useEffect(() => {
    if (z == null) return;
    const v = window.requestAnimationFrame(() => {
      ko(se.current, z, K.current);
    }), L = window.setTimeout(() => x(null), 3e3);
    return () => {
      window.cancelAnimationFrame(v), window.clearTimeout(L);
    };
  }, [z, C.length]), o.useEffect(() => {
    window.dispatchEvent(new CustomEvent("chat-unread-count", { detail: d.reduce((v, L) => v + L.unreadCount, 0) }));
  }, [d]), o.useEffect(() => en.subscribe(e, le), [e, p, be]), o.useEffect(() => {
    if (!p) {
      Ne(null);
      return;
    }
    let v = false, L = 0;
    const R = async () => {
      const G = await Le(p);
      if (v || G.length !== 1) {
        v || Ne(null);
        return;
      }
      const J = await fe("/chat/presence/" + encodeURIComponent(G[0])).catch(() => null);
      v || Ne(J);
    };
    return R(), L = window.setInterval(() => void R(), 3e4), () => {
      v = true, window.clearInterval(L);
    };
  }, [p, e]);
  function le(v) {
    if (v.type === "GROUP_CREATED" || v.type === "MEMBER_ADDED") {
      Me();
      return;
    }
    if (v.type === "MEMBER_REMOVED" && v.targetUserId === e) {
      m((L) => {
        const R = { ...L };
        return delete R[v.conversationId], R;
      }), y((L) => L.filter((R) => R.conversationId !== v.conversationId)), u((L) => {
        var G;
        const R = L.filter((J) => J.id !== v.conversationId);
        return p === v.conversationId && (g(((G = R[0]) == null ? void 0 : G.id) ?? null), he("INBOX"), ue(false)), R;
      });
      return;
    }
    if (v.type === "MESSAGE_CREATED" && v.message) {
      const L = v.message, R = L.senderId === e, G = jl(L), J = !R && v.conversationId === p && document.visibilityState === "visible" && (window.innerWidth >= 768 || be === "CONVERSATION");
      u((ae) => {
        const ce = ae.find((Oe) => Oe.id === v.conversationId);
        if (!ce) return Me(v.conversationId), ae;
        const Re = { ...ce, preview: R ? "B\u1EA1n: " + Qa(L) : Qa(L), updatedAt: "now", isDissolved: ce.isDissolved || G, unreadCount: R ? ce.unreadCount : J ? 0 : ce.unreadCount + 1 };
        return [Re, ...ae.filter((Oe) => Oe.id !== Re.id)];
      }), v.conversationId === p && (y((ae) => ae.some((ce) => ce.id === L.id) ? ae : [...ae, L]), J && en.acknowledgeRead(v.conversationId, L.messageSeq));
      return;
    }
    if (v.type === "CURSOR_UPDATED" && v.actorId !== e) {
      const L = v.deliveredSeq ?? 0, R = v.readSeq ?? 0;
      u((G) => G.map((J) => J.id === v.conversationId ? { ...J, recipientDeliveredSeq: Math.max(J.recipientDeliveredSeq, L), recipientReadSeq: Math.max(J.recipientReadSeq, R) } : J)), v.conversationId === p && y((G) => G.map((J) => J.senderId === e ? { ...J, status: J.messageSeq <= R ? "read" : J.messageSeq <= L ? "delivered" : J.status } : J));
    }
  }
  async function Me(v) {
    T("loading");
    try {
      const R = ((await fe(`/chat/conversations?actorId=${encodeURIComponent(e)}&limit=40`)).items ?? []).map((G) => ({ id: G.id, type: G.type ?? "DIRECT", isDissolved: !!G.isDissolved, title: G.title || (G.type === "GROUP" ? "Group conversation" : "Direct message"), avatarUrl: G.avatarUrl, preview: yl(G, e), unreadCount: G.unreadCount ?? 0, updatedAt: "", recipientDeliveredSeq: G.recipientDeliveredSeq ?? 0, recipientReadSeq: G.recipientReadSeq ?? 0 }));
      R.forEach((G) => en.rememberRecipientCursor(G.id, G.recipientDeliveredSeq, G.recipientReadSeq)), u(R), g((G) => {
        var J;
        return v ?? G ?? ((J = R[0]) == null ? void 0 : J.id) ?? null;
      }), T("ready");
    } catch {
      T("error");
    }
  }
  async function Te(v) {
    Qe.current = null, E("loading");
    try {
      const L = await fe(`/chat/conversations/${v}/messages?actorId=${encodeURIComponent(e)}&limit=80`), R = d.find((ae) => ae.id === v), G = Ra(L.items ?? [], e, (R == null ? void 0 : R.recipientDeliveredSeq) ?? 0, (R == null ? void 0 : R.recipientReadSeq) ?? 0);
      y((ae) => On(G, ae, v)), Ge(!!L.hasMore), Qe.current = v, E("ready");
      const J = G[G.length - 1];
      J && (window.innerWidth >= 768 || be === "CONVERSATION") && (u((ae) => ae.map((ce) => ce.id === v ? { ...ce, unreadCount: 0 } : ce)), en.acknowledgeRead(v, J.messageSeq));
    } catch {
      E("error");
    }
  }
  async function de() {
    const v = p;
    if (!v || !Ze || ge.current || j !== "ready") return;
    const R = C.filter((J) => J.conversationId === v).reduce((J, ae) => Math.min(J, ae.messageSeq), Number.POSITIVE_INFINITY);
    if (!Number.isFinite(R)) return;
    const G = se.current;
    ge.current = true, Q(true), xe.current = false;
    try {
      const J = await fe(`/chat/conversations/${v}/messages?actorId=${encodeURIComponent(e)}&beforeSeq=${R}&limit=50`);
      if (Qe.current !== v) return;
      const ae = d.find((Re) => Re.id === v), ce = Ra(J.items ?? [], e, (ae == null ? void 0 : ae.recipientDeliveredSeq) ?? 0, (ae == null ? void 0 : ae.recipientReadSeq) ?? 0);
      ce.length && G && (O.current = { conversationId: v, scrollHeight: G.scrollHeight, scrollTop: G.scrollTop }), y((Re) => On(ce, Re, v)), Ge(!!J.hasMore);
    } finally {
      ge.current = false, Q(false);
    }
  }
  async function Le(v) {
    if (h[v]) return h[v];
    try {
      const L = await fe(`/chat/conversations/${encodeURIComponent(v)}/details?actorId=${encodeURIComponent(e)}`), R = (L.members ?? []).map((J) => J.userId).filter((J) => J && J !== e), G = L.members.find((J) => J.userId !== e);
      return u((J) => J.map((ae) => ae.id !== v ? ae : { ...ae, isDissolved: !!L.isDissolved, ...ae.type === "DIRECT" && (G != null && G.displayName) ? { title: G.displayName, avatarUrl: G.avatarUrl ?? ae.avatarUrl } : {} })), m((J) => ({ ...J, [v]: R })), R;
    } catch {
      return [];
    }
  }
  function Ye(v) {
    g(v), he("CONVERSATION");
  }
  async function Ve(v) {
    Se(false), await Me(v.id), Ye(v.id);
  }
  async function an(v) {
    const L = p;
    if (!L) return;
    xe.current = false;
    const R = C.filter((ae) => ae.conversationId === L);
    if (R.some((ae) => ae.messageSeq === v)) K.current = "smooth";
    else {
      const ae = R.reduce((Re, Oe) => Math.min(Re, Oe.messageSeq), v), ce = ae - v > 100;
      xe.current = false, ce && ee(true);
      try {
        const Re = await Ll(L, e, v, ae);
        if (!Re.some((tn) => tn.messageSeq === v)) return;
        const Oe = d.find((tn) => tn.id === L), Ue = Ra(Re, e, (Oe == null ? void 0 : Oe.recipientDeliveredSeq) ?? 0, (Oe == null ? void 0 : Oe.recipientReadSeq) ?? 0);
        y((tn) => On(Ue, tn, L)), K.current = ce ? "auto" : "smooth";
      } catch {
        return;
      } finally {
        ce && ee(false);
      }
    }
    x(v);
    let G = 0;
    const J = () => {
      window.requestAnimationFrame(() => {
        ko(se.current, v, K.current) || (G += 1, G < 8 && J());
      });
    };
    J();
  }
  async function Xe(v) {
    v.preventDefault(), !(!p || H != null && H.isDissolved) && await pl({ conversationId: p, userId: e, draft: b, replyTo: k, sending: w, mediaComposer: D, optimisticPrefix: "chat", loadRecipientIds: () => Le(p), setDraft: N, setReplyTo: B, setSending: Y, setMessages: y, updateConversationPreview: (L) => u((R) => R.map((G) => G.id === p ? { ...G, preview: `B\u1EA1n: ${L}` } : G)), enqueueOfflineMessage: (L) => me((R) => [...R, L]) });
  }
  const Ke = wl(C), We = (v, L) => sr(v, Ke[L - 1]), Je = (($ = [...Ke].reverse().find((v) => v.senderId === e)) == null ? void 0 : $.id) ?? null;
  return n.jsxs("section", { className: `screen direct-messaging-page pane-${be.toLowerCase()}`, children: [n.jsxs("aside", { className: "dm-sidebar", children: [n.jsxs("header", { className: "dm-sidebar-header", children: [n.jsx("strong", { className: "dm-inbox-identity", children: a }), n.jsx("button", { className: "dm-compose-action", onClick: () => Se(true), "aria-label": "New message", children: n.jsx(ha, { size: 19 }) })] }), n.jsxs("div", { className: "dm-inbox-controls", children: [n.jsxs("label", { className: "dm-search", children: [n.jsx(ma, { size: 17 }), n.jsx("input", { value: r, onChange: (v) => s(v.target.value), placeholder: "Search conversations" }), r && n.jsx("button", { type: "button", onClick: () => s(""), "aria-label": "Clear search", children: n.jsx(pe, { size: 15 }) })] }), n.jsxs("section", { className: "dm-utility-row", role: "tablist", "aria-label": "Inbox filters", children: [n.jsx("button", { className: f === "ALL" ? "active" : "", onClick: () => c("ALL"), role: "tab", "aria-selected": f === "ALL", children: "All" }), n.jsx("button", { className: f === "UNREAD" ? "active" : "", onClick: () => c("UNREAD"), role: "tab", "aria-selected": f === "UNREAD", children: "Unread" })] })] }), n.jsxs("div", { className: "dm-section-title", children: [n.jsx("strong", { children: "Messages" }), n.jsx("span", { children: _.length })] }), n.jsxs("div", { className: "dm-thread-list", children: [I === "loading" && n.jsx(Mt, {}), I === "error" && n.jsx(Zn, { icon: In, title: "Inbox failed loading", detail: "Conversations could not be loaded from backend.", action: "Retry", onAction: () => void Me() }), I === "ready" && _.length === 0 && n.jsx(Zn, { icon: fn, title: r || f === "UNREAD" ? "No matching conversations" : "Empty inbox", detail: r || f === "UNREAD" ? "Try another search or filter." : "New direct and group conversations will appear here.", action: r || f === "UNREAD" ? void 0 : "New message", onAction: () => Se(true) }), _.map((v) => n.jsxs("button", { className: `${v.id === p ? "active" : ""} ${v.unreadCount > 0 ? "unread" : ""}`, onClick: () => Ye(v.id), "aria-current": v.id === p ? "true" : void 0, children: [n.jsxs("span", { className: "dm-avatar", children: [n.jsx(cn, { src: v.avatarUrl ?? void 0, label: v.title }), v.id === p && (ke == null ? void 0 : ke.online) && n.jsx("i", {})] }), n.jsxs("span", { children: [n.jsx("strong", { children: v.title }), n.jsx("small", { children: v.preview })] }), v.unreadCount > 0 && n.jsx("em", { "aria-label": `${v.unreadCount} unread messages`, children: v.unreadCount })] }, v.id))] })] }), n.jsxs("main", { className: ye ? "dm-conversation-panel details-open" : "dm-conversation-panel", children: [n.jsx("section", { className: "dm-conversation-thread", children: H ? n.jsxs(n.Fragment, { children: [n.jsxs("header", { className: "dm-conversation-header", children: [n.jsx("button", { className: "dm-mobile-back", onClick: () => he("INBOX"), "aria-label": "Back to inbox", children: n.jsx(dn, { size: 19 }) }), n.jsx("span", { className: "dm-avatar large", children: n.jsx(cn, { src: H.avatarUrl ?? void 0, label: H.title }) }), n.jsxs("div", { children: [n.jsx("strong", { children: H.title }), n.jsx("small", { children: we ? "Composing message" : H.type === "DIRECT" ? vl(ke) : "Cu\u1ED9c tr\xF2 chuy\u1EC7n nh\xF3m" })] }), n.jsxs("div", { className: "dm-header-actions", children: [n.jsx("button", { "aria-label": "Audio call", children: n.jsx(Gt, { size: 19 }) }), n.jsx("button", { "aria-label": "Video call", children: n.jsx(Lt, { size: 19 }) }), n.jsx("button", { "aria-label": "Conversation info", "aria-expanded": ye, onClick: () => ue((v) => !v), children: n.jsx(ea, { size: 20 }) })] })] }), n.jsxs("div", { ref: se, className: "dm-message-history", onScroll: (v) => {
    const L = v.currentTarget;
    xe.current = xl(L), L.scrollTop <= 180 && de();
  }, children: [n.jsx("span", { ref: $e, className: "chat-history-top-sentinel", "aria-hidden": "true" }), j === "loading" && n.jsx(Mt, {}), j === "ready" && Ee && n.jsx("div", { className: "chat-history-page-loader", role: "status", children: "\u0110ang t\u1EA3i tin nh\u1EAFn c\u0169..." }), oe && n.jsxs("div", { className: "chat-history-jump-loader", role: "status", children: [n.jsx("span", {}), "\u0110ang t\u1EA3i t\u1EDBi tin nh\u1EAFn \u0111\u01B0\u1EE3c tr\u1EA3 l\u1EDDi..."] }), j === "error" && n.jsx(Zn, { icon: In, title: "Messages failed loading", detail: "Could not load this conversation.", action: "Retry", onAction: () => p && Te(p) }), j === "ready" && C.length === 0 && n.jsx(Zn, { icon: fn, title: "No messages yet", detail: "Send a first message or share a post." }), j === "ready" && Ke.map((v, L) => {
    var ae, ce, Re;
    const R = L === 0 || ((ae = Ke[L - 1]) == null ? void 0 : ae.senderId) !== v.senderId || We(v, L), G = Ke[L + 1], J = !G || G.senderId !== v.senderId || sr(G, v);
    return n.jsxs("div", { "data-message-seq": v.messageSeq, "data-message-seqs": (ce = v.groupMessageSeqs) == null ? void 0 : ce.join(" "), className: `dm-message-group ${z === v.messageSeq || (Re = v.groupMessageSeqs) != null && Re.includes(z ?? -1) ? "reply-highlight" : ""}`, children: [We(v, L) && n.jsx("time", { className: "dm-date-separator", children: os(v.createdAt) }), n.jsx(m2, { message: v, outgoing: v.senderId === e, grouped: !R, showAvatar: v.senderId !== e && J, showSender: v.senderId !== e && (H == null ? void 0 : H.type) === "GROUP" && R, directConversation: (H == null ? void 0 : H.type) === "DIRECT", onReply: () => B(v), onOpenMedia: (Oe, Ue) => ne({ items: Oe, index: Ue }), onOpenReply: (Oe) => void an(Oe), defaultStatusVisible: v.id === Je })] }, v.id);
  }), re.length > 0 && n.jsxs("button", { className: "dm-offline-queue", onClick: () => {
    var v;
    return N(((v = re[0]) == null ? void 0 : v.content) ?? "");
  }, children: ["Offline queue (", re.length, ")"] })] }), H.isDissolved ? n.jsx("div", { className: "chat-dissolved-notice", role: "status", children: "Nh\xF3m chat \u0111\xE3 b\u1ECB gi\u1EA3i t\xE1n" }) : n.jsxs("form", { className: "dm-composer", onSubmit: Xe, children: [k && n.jsx(Sl, { message: k, onCancel: () => B(null) }), (D.images.length > 0 || D.audioAttachment || D.recording || D.error) && n.jsx(kl, { composer: D, disabled: w, onAdd: () => {
    var v;
    return (v = V.current) == null ? void 0 : v.click();
  } }), n.jsx("input", { ref: V, className: "chat-media-file-input", type: "file", accept: "image/*", multiple: true, onChange: (v) => {
    D.selectImages(v.target.files), v.target.value = "";
  } }), n.jsxs("div", { className: "dm-composer-box", children: [n.jsx(Gr, { textareaRef: P, value: b, onChange: N, disabled: D.recording || w, iconSize: 19 }), n.jsx("textarea", { ref: P, value: b, disabled: D.recording || w, onFocus: () => F(true), onBlur: () => F(false), onChange: (v) => N(v.target.value), onKeyDown: (v) => {
    var L;
    v.key === "Enter" && !v.shiftKey && !v.nativeEvent.isComposing && (v.preventDefault(), (L = v.currentTarget.form) == null || L.requestSubmit());
  }, rows: 1, placeholder: "Tin nh\u1EAFn..." }), n.jsx("button", { type: "button", "aria-label": "Ch\u1ECDn \u1EA3nh", disabled: D.recording || w, onClick: () => {
    var v;
    return (v = V.current) == null ? void 0 : v.click();
  }, children: n.jsx(An, { size: 19 }) }), n.jsx("button", { type: "button", className: D.recording ? "recording" : "", "aria-label": D.recording ? "D\u1EEBng ghi \xE2m" : "Ghi \xE2m", disabled: w, onClick: () => D.recording ? D.stopRecording() : void D.startRecording(), children: D.recording ? n.jsx(na, { size: 18, fill: "currentColor" }) : n.jsx(Gt, { size: 19 }) }), n.jsx("button", { className: "dm-send-action", type: "submit", disabled: w || D.recording || !b.trim() && D.images.length === 0 && !D.audioAttachment, "aria-label": "G\u1EEDi", children: n.jsx(vt, { size: 19 }) })] })] })] }) : n.jsxs("div", { className: "dm-empty-state", children: [n.jsx("span", { className: "dm-empty-icon", children: n.jsx(fn, { size: 30 }) }), n.jsx("h2", { children: "Your messages" }), n.jsx("p", { children: "Select a conversation or start a new message." }), n.jsxs("button", { onClick: () => Se(true), children: [n.jsx(ha, { size: 18 }), " New message"] })] }) }), H && n.jsx(dd, { actorId: e, conversationId: H.id, conversationType: H.type, fallbackTitle: H.title, initialView: (i == null ? void 0 : i.panel) === "requests" ? "REQUESTS" : "MAIN", open: ye, onClose: () => ue(false), onOpenProfile: t, onNicknameUpdated: (v, L) => H.type === "DIRECT" && v !== e && u((R) => R.map((G) => G.id === H.id ? { ...G, title: L } : G)), onConversationRemoved: (v) => {
    u((L) => {
      var G;
      const R = L.filter((J) => J.id !== v);
      return g(((G = R[0]) == null ? void 0 : G.id) ?? null), R;
    }), ue(false);
  }, onConversationDissolved: (v) => {
    u((L) => L.map((R) => R.id === v ? { ...R, isDissolved: true, preview: "Nh\xF3m chat \u0111\xE3 b\u1ECB gi\u1EA3i t\xE1n" } : R)), ue(false);
  } })] }), ze && n.jsx(gl, { viewerId: e, onClose: () => Se(false), onCreated: (v) => void Ve(v) }), q && n.jsx(mr, { items: q.items, initialIndex: q.index, onClose: () => ne(null) })] });
}
function m2({ message: e, outgoing: a, grouped: t, showAvatar: i, showSender: r, directConversation: s, onReply: f, onOpenMedia: c, onOpenReply: d, defaultStatusVisible: u }) {
  var T;
  const [h, m] = o.useState(null), p = e.status === "failed" ? "G\u1EEDi th\u1EA5t b\u1EA1i" : e.status === "sending" ? "\u0110ang g\u1EEDi" : e.status === "queued" ? "\u0110ang ch\u1EDD m\u1EA1ng" : e.status === "read" ? "\u0110\xE3 xem" : e.status === "delivered" ? "\u0110\xE3 nh\u1EADn" : a ? "\u0110\xE3 g\u1EEDi" : "", g = a && !!p && (h ?? u);
  if (e.messageType === "SYSTEM") return n.jsx("p", { className: "chat-system-message", children: e.content });
  const C = ((T = e.senderDisplayName) == null ? void 0 : T.trim()) || e.senderId;
  function y() {
    !a || !p || m((j) => !(j ?? u));
  }
  const I = e.messageType === "IMAGE" || e.messageType === "IMAGE_GROUP" ? "image-message" : e.messageType === "AUDIO" ? "audio-message" : "";
  return n.jsxs("article", { className: `dm-bubble-row ${a ? "outgoing" : "incoming"} ${t ? "grouped" : ""} ${I}`, children: [!a && (i ? n.jsx("span", { className: "dm-avatar small", children: n.jsx(cn, { src: e.senderAvatarUrl ?? void 0, label: C }) }) : n.jsx("span", { className: "dm-avatar-spacer", "aria-hidden": "true" })), n.jsxs("div", { className: "dm-message-content", children: [n.jsxs("div", { className: `dm-bubble ${I}`, onClick: y, onKeyDown: (j) => {
    a && (j.key === "Enter" || j.key === " ") && (j.preventDefault(), y());
  }, role: a ? "button" : void 0, tabIndex: a ? 0 : void 0, "aria-expanded": a ? g : void 0, children: [!a && r && n.jsx("strong", { className: "dm-message-sender", children: C }), n.jsxs("div", { className: `dm-bubble-cluster ${e.replyToSeq ? "has-reply" : ""} ${e.messageType !== "TEXT" ? "has-media" : ""}`, children: [e.replyToSeq && n.jsx(Il, { message: e, currentSenderName: a ? "B\u1EA1n" : C, outgoing: a, directConversation: s, onActivate: d }), n.jsx("div", { className: "dm-bubble-main", children: e.deleted ? n.jsx("em", { children: "Tin nh\u1EAFn \u0111\xE3 \u0111\u01B0\u1EE3c thu h\u1ED3i" }) : n.jsx(Nl, { message: e, onOpenMedia: c }) })] }), g && n.jsx("small", { className: "dm-delivery-status", children: p })] }), n.jsx(Ml, { message: e, outgoing: a, onReply: f })] })] });
}
function Ml({ message: e, outgoing: a, onReply: t }) {
  const [i, r] = o.useState(false), [s, f] = o.useState(false), c = o.useRef(null);
  return o.useEffect(() => {
    if (!s) return;
    const d = (u) => {
      var h;
      (h = c.current) != null && h.contains(u.target) || f(false);
    };
    return window.addEventListener("pointerdown", d), () => window.removeEventListener("pointerdown", d);
  }, [s]), n.jsxs("div", { className: `dm-message-actions ${a ? "outgoing" : "incoming"}`, children: [n.jsx("button", { className: i ? "active" : "", onClick: () => r((d) => !d), "aria-label": "B\xE0y t\u1ECF c\u1EA3m x\xFAc", children: n.jsx(Ja, { size: 15, fill: i ? "currentColor" : "none" }) }), n.jsx("button", { onClick: t, "aria-label": "Tr\u1EA3 l\u1EDDi tin nh\u1EAFn", children: n.jsx(dr, { size: 15 }) }), n.jsxs("span", { ref: c, children: [n.jsx("button", { onClick: () => f((d) => !d), "aria-label": "Thao t\xE1c tin nh\u1EAFn", "aria-expanded": s, children: n.jsx(ea, { size: 16 }) }), s && n.jsxs("div", { className: `dm-message-menu ${a ? "outgoing" : "incoming"}`, children: [n.jsx("time", { children: os(e.createdAt) }), n.jsx("button", { onClick: () => f(false), children: "Chuy\u1EC3n ti\u1EBFp" }), n.jsx("button", { onClick: () => f(false), children: "Ghim" }), n.jsx("button", { className: a ? "destructive" : "", onClick: () => f(false), children: a ? "Thu h\u1ED3i" : "B\xE1o c\xE1o" })] })] })] });
}
function vl(e) {
  if (e != null && e.online) return "\u0110ang ho\u1EA1t \u0111\u1ED9ng";
  if (!(e != null && e.lastActiveAt)) return "Ngo\u1EA1i tuy\u1EBFn";
  const a = new Date(e.lastActiveAt), t = Math.max(0, Date.now() - a.getTime()), i = Math.max(1, Math.floor(t / 6e4));
  if (i < 60) return "Ho\u1EA1t \u0111\u1ED9ng " + i + " ph\xFAt tr\u01B0\u1EDBc";
  const r = Math.floor(i / 60);
  if (r < 24) return "Ho\u1EA1t \u0111\u1ED9ng " + r + " gi\u1EDD tr\u01B0\u1EDBc";
  const s = Math.floor(r / 24);
  return s <= 3 ? "Ho\u1EA1t \u0111\u1ED9ng " + s + " ng\xE0y tr\u01B0\u1EDBc" : "Ho\u1EA1t \u0111\u1ED9ng k\u1EC3 t\u1EEB " + a.toLocaleDateString("vi-VN");
}
function Ra(e, a, t, i) {
  return e.map((r) => r.senderId === a ? { ...r, status: r.messageSeq <= i ? "read" : r.messageSeq <= t ? "delivered" : "sent" } : r);
}
async function Ll(e, a, t, i) {
  var f;
  const r = [];
  let s = Math.max(0, t - 1);
  for (let c = 0; c < 1e3; c += 1) {
    const d = await fe(`/chat/conversations/${e}/messages?actorId=${encodeURIComponent(a)}&afterSeq=${s}&limit=100`), u = d.items ?? [];
    if (!u.length) break;
    r.push(...u);
    const h = ((f = u[u.length - 1]) == null ? void 0 : f.messageSeq) ?? s;
    if (u.some((m) => m.messageSeq >= i) || !d.hasMore || h <= s) break;
    s = h;
  }
  return r;
}
function Cl(e, a) {
  return (e == null ? void 0 : e.querySelector(`[data-message-seq="${a}"], [data-message-seqs~="${a}"]`)) ?? null;
}
function ko(e, a, t) {
  if (!e) return false;
  const i = Cl(e, a);
  if (!i) return false;
  const r = e.getBoundingClientRect(), s = i.getBoundingClientRect(), f = e.scrollTop + (s.top - r.top), c = Math.max(0, f - (e.clientHeight - s.height) / 2);
  return i.classList.remove("reply-target-active"), i.offsetWidth, i.classList.add("reply-target-active"), window.setTimeout(() => i.classList.remove("reply-target-active"), 3e3), e.scrollTo({ top: c, behavior: t }), true;
}
function On(e, a, t) {
  const i = /* @__PURE__ */ new Map();
  return e.forEach((r) => i.set(r.id, r)), a.filter((r) => r.conversationId === t).forEach((r) => i.set(r.id, r)), [...i.values()].sort((r, s) => r.messageSeq - s.messageSeq);
}
function xl(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight <= 72;
}
function sr(e, a) {
  if (!a) return true;
  const t = e.createdAt ? new Date(e.createdAt).getTime() : 0, i = a.createdAt ? new Date(a.createdAt).getTime() : 0;
  return t > 0 && i > 0 && t - i >= 10800 * 1e3;
}
function os(e) {
  return e ? new Date(e).toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" }) : "Kh\xF4ng c\xF3 th\xF4ng tin th\u1EDDi gian";
}
function g2(e) {
  return e === "failed" ? "G\u1EEDi th\u1EA5t b\u1EA1i" : e === "sending" ? "\u0110ang g\u1EEDi" : e === "queued" ? "\u0110ang ch\u1EDD m\u1EA1ng" : e === "read" ? "\u0110\xE3 xem" : e === "delivered" ? "\u0110\xE3 nh\u1EADn" : "\u0110\xE3 g\u1EEDi";
}
function p2({ message: e, outgoing: a, showSender: t, directConversation: i, onReply: r, onOpenMedia: s, onOpenReply: f, defaultStatusVisible: c }) {
  var g, C;
  const [d, u] = o.useState(null), h = a && (d ?? c);
  if (e.messageType === "SYSTEM") return n.jsx("p", { className: "chat-system-message floating", children: e.content });
  function m() {
    a && u((y) => !(y ?? c));
  }
  const p = e.messageType === "IMAGE" || e.messageType === "IMAGE_GROUP" ? "image-message" : e.messageType === "AUDIO" ? "audio-message" : "";
  return n.jsxs("div", { className: `floating-message-content ${a ? "outgoing" : "incoming"}`, children: [n.jsxs("article", { className: `floating-bubble ${a ? "outgoing" : "incoming"} ${p}`, onClick: m, onKeyDown: (y) => {
    a && (y.key === "Enter" || y.key === " ") && (y.preventDefault(), m());
  }, role: a ? "button" : void 0, tabIndex: a ? 0 : void 0, "aria-expanded": a ? h : void 0, children: [t && n.jsx("strong", { className: "dm-message-sender", children: ((g = e.senderDisplayName) == null ? void 0 : g.trim()) || e.senderId }), n.jsxs("div", { className: `floating-bubble-cluster ${e.replyToSeq ? "has-reply" : ""} ${e.messageType !== "TEXT" ? "has-media" : ""}`, children: [e.replyToSeq && n.jsx(Il, { message: e, currentSenderName: a ? "B\u1EA1n" : ((C = e.senderDisplayName) == null ? void 0 : C.trim()) || e.senderId, outgoing: a, directConversation: i, onActivate: f }), n.jsx("div", { className: "floating-bubble-main", children: e.deleted ? n.jsx("em", { children: "Tin nh\u1EAFn \u0111\xE3 \u0111\u01B0\u1EE3c thu h\u1ED3i" }) : n.jsx(Nl, { message: e, onOpenMedia: s }) })] }), h && n.jsx("small", { className: "floating-delivery-status", children: g2(e.status) })] }), n.jsx(Ml, { message: e, outgoing: a, onReply: r })] });
}
function Il({ message: e, currentSenderName: a, outgoing: t, directConversation: i, onActivate: r }) {
  var h;
  const s = e.reply ?? (e.replyToSeq ? { messageSeq: e.replyToSeq, content: "Tin nh\u1EAFn \u0111\u01B0\u1EE3c tr\u1EA3 l\u1EDDi", deleted: false } : null);
  if (!s) return null;
  const f = ((h = s.senderDisplayName) == null ? void 0 : h.trim()) || s.senderId || "ng\u01B0\u1EDDi d\xF9ng", c = !!s.deleted, d = !!(s.senderId && s.senderId === e.senderId), u = i ? t ? d ? "B\u1EA1n \u0111\xE3 tr\u1EA3 l\u1EDDi tin nh\u1EAFn c\u1EE7a ch\xEDnh m\xECnh" : `B\u1EA1n \u0111\xE3 tr\u1EA3 l\u1EDDi tin nh\u1EAFn c\u1EE7a ${f}` : d ? `${a} \u0111\xE3 tr\u1EA3 l\u1EDDi tin nh\u1EAFn c\u1EE7a ch\xEDnh h\u1ECD` : `${a} \u0111\xE3 tr\u1EA3 l\u1EDDi tin nh\u1EAFn c\u1EE7a b\u1EA1n` : t ? d ? "B\u1EA1n \u0111\xE3 tr\u1EA3 l\u1EDDi tin nh\u1EAFn c\u1EE7a ch\xEDnh m\xECnh" : `B\u1EA1n \u0111\xE3 tr\u1EA3 l\u1EDDi ${f}` : `${a} \u0111\xE3 tr\u1EA3 l\u1EDDi ${d ? "tin nh\u1EAFn c\u1EE7a ch\xEDnh h\u1ECD" : f}`;
  return n.jsxs("button", { type: "button", className: "message-reply-preview", onClick: (m) => {
    m.stopPropagation(), c || r == null || r(s.messageSeq);
  }, disabled: c || !r, children: [n.jsxs("span", { className: "message-reply-heading", children: [n.jsx(dr, { size: 14 }), n.jsx("span", { children: u })] }), n.jsxs("span", { className: "message-reply-copy", children: [s.messageType === "IMAGE" && n.jsx(An, { size: 14 }), s.messageType === "VIDEO" && n.jsx(Lt, { size: 14 }), s.messageType === "AUDIO" && n.jsx(Gt, { size: 14 }), n.jsx("span", { children: u2(s) })] })] });
}
function Sl({ message: e, onCancel: a }) {
  var i;
  const t = ((i = e.senderDisplayName) == null ? void 0 : i.trim()) || e.senderId;
  return n.jsxs("div", { className: "composer-reply-bar", children: [n.jsx(dr, { size: 16 }), n.jsxs("span", { children: [n.jsxs("strong", { children: ["Tr\u1EA3 l\u1EDDi ", t] }), n.jsx("small", { children: e.deleted ? "Tin nh\u1EAFn g\u1ED1c kh\xF4ng c\xF2n t\u1ED3n t\u1EA1i" : Qa(e) })] }), n.jsx("button", { type: "button", onClick: a, "aria-label": "H\u1EE7y tr\u1EA3 l\u1EDDi", children: n.jsx(pe, { size: 16 }) })] });
}
function kl({ composer: e, disabled: a, onAdd: t }) {
  var i, r;
  return n.jsxs(n.Fragment, { children: [n.jsx(id, { images: e.images, disabled: a, onAdd: t, onRemove: e.removeImage, onMove: e.moveImage, onRetry: (s) => e.updateImageState(s, { status: "ready", progress: 0, error: void 0 }), onClear: e.clearImages }), n.jsx(fd, { recording: e.recording, elapsed: e.recordingElapsed, audioUrl: (i = e.audioAttachment) == null ? void 0 : i.previewUrl, duration: (r = e.audioAttachment) == null ? void 0 : r.duration, onCancelRecording: e.cancelRecording, onStopRecording: e.stopRecording, onRemoveAudio: e.clearAudio }), e.images.length > 0 && (e.recording || e.audioAttachment) && n.jsx("p", { className: "chat-mixed-media-note", children: "Tin nh\u1EAFn tho\u1EA1i s\u1EBD \u0111\u01B0\u1EE3c g\u1EEDi ri\xEAng sau nh\xF3m \u1EA3nh." }), e.error && n.jsx("p", { className: "chat-media-error", role: "alert", children: e.error })] });
}
function Nl({ message: e, onOpenMedia: a }) {
  var i, r, s, f, c;
  const t = ((i = e.metadata) == null ? void 0 : i.url) || ((r = e.metadata) == null ? void 0 : r.thumbnailUrl);
  if (e.messageType === "IMAGE" || e.messageType === "IMAGE_GROUP") {
    const d = bl(e);
    return n.jsx(rd, { items: d, caption: e.content, sending: e.status === "sending", failed: e.status === "failed", onOpen: (u, h) => {
      var m;
      return a ? a(u, h) : window.open((m = u[h]) == null ? void 0 : m.url, "_blank", "noopener,noreferrer");
    } });
  }
  return e.messageType === "VIDEO" ? t ? n.jsx("video", { className: "chat-video-message", src: t, controls: true, playsInline: true, preload: "metadata", onClick: (d) => d.stopPropagation() }) : n.jsx("p", { children: "Video kh\xF4ng c\xF2n kh\u1EA3 d\u1EE5ng" }) : e.messageType === "AUDIO" ? t ? n.jsx(gr, { src: t, durationHint: (s = e.metadata) == null ? void 0 : s.duration }) : n.jsx("p", { className: "chat-audio-unavailable", children: "Tin nh\u1EAFn tho\u1EA1i kh\xF4ng c\xF2n kh\u1EA3 d\u1EE5ng." }) : (f = e.content) != null && f.startsWith("post:") ? n.jsxs("div", { className: "shared-card", children: [n.jsx(Kt, { size: 18 }), n.jsx("span", { children: "Shared post" })] }) : (c = e.content) != null && c.startsWith("profile:") ? n.jsxs("div", { className: "shared-card", children: [n.jsx(ur, { size: 18 }), n.jsx("span", { children: "Shared profile" })] }) : n.jsx("p", { className: "emoji-text", children: e.content || e.messageType });
}
function Zn({ icon: e, title: a, detail: t, action: i, onAction: r }) {
  return n.jsxs("div", { className: "chat-state", children: [n.jsx(e, { size: 24 }), n.jsx("strong", { children: a }), n.jsx("span", { children: t }), i && n.jsx("button", { onClick: r, children: i })] });
}
function Mt() {
  return n.jsxs("div", { className: "chat-skeleton", children: [n.jsx("span", {}), n.jsx("span", {}), n.jsx("span", {})] });
}
function b2({ userId: e, compactLauncher: a, onOpenFullChat: t, openConversationRequest: i }) {
  var We, Je;
  const r = o.useRef(null), [s, f] = o.useState("collapsed"), [c, d] = o.useState([]), [u, h] = o.useState([]), [m, p] = o.useState(null), [g, C] = o.useState("idle"), [y, I] = o.useState("idle"), [T, j] = o.useState(""), [E, b] = o.useState(false), [N, k] = o.useState([]), B = o.useRef(null), z = o.useRef(null), x = Qo(), [w, Y] = o.useState(null), [V, P] = o.useState(null), [D, q] = o.useState(null), [ne, be] = o.useState(""), [he, re] = o.useState(false), [me, we] = o.useState({}), [F, ze] = o.useState(false), [Se, ye] = o.useState(null), ue = o.useRef(null), ke = o.useRef(true), Ne = o.useRef(null), se = o.useRef(null), [$e, xe] = o.useState(false), [Qe, De] = o.useState(false), [Ze, Ge] = o.useState(false), Ee = o.useRef(false), Q = o.useRef(null), oe = o.useRef("smooth"), ee = c.find((A) => A.id === m) ?? null, ge = c.reduce((A, $) => A + $.unreadCount, 0), O = c.slice(0, 3), K = c.filter((A) => `${A.title} ${A.preview}`.toLowerCase().includes(ne.trim().toLowerCase())), X = ((We = [...u].reverse().find((A) => A.conversationId === m && A.senderId !== e)) == null ? void 0 : We.messageSeq) ?? 0, H = wl(u).map((A) => {
    if (A.senderId !== e || A.status === "sending" || A.status === "queued" || A.status === "failed") return A;
    const $ = Math.max(A.messageSeq, ...A.groupMessageSeqs ?? []), v = en.outgoingStatus(A.conversationId, $);
    return A.status === "read" || A.status === "delivered" && v !== "read" || v === A.status ? A : { ...A, status: v };
  }), _ = ((Je = [...H].reverse().find((A) => A.senderId === e)) == null ? void 0 : Je.id) ?? null;
  o.useEffect(() => {
    if (V == null) return;
    const A = window.requestAnimationFrame(() => {
      const v = Cl(ue.current, V);
      v == null || v.scrollIntoView({ behavior: oe.current, block: "center" });
    }), $ = window.setTimeout(() => P(null), 3e3);
    return () => {
      window.cancelAnimationFrame(A), window.clearTimeout($);
    };
  }, [V, u.length]), o.useEffect(() => {
    Me();
  }, [e]), o.useEffect(() => {
    i && (f("detail"), p(i.conversationId), Me(i.conversationId));
  }, [i == null ? void 0 : i.nonce]), o.useEffect(() => {
    s !== "detail" || !m || Te(m);
  }, [m, s, e]), o.useEffect(() => {
    ze(false), ke.current = true, se.current = null, Ee.current = false, Q.current = null, xe(false), De(false), Ge(false);
  }, [m, s]), o.useLayoutEffect(() => {
    const A = Q.current, $ = ue.current;
    !A || !$ || A.conversationId !== m || ($.scrollTop = A.scrollTop + ($.scrollHeight - A.scrollHeight), Q.current = null);
  }, [m, u.length]), o.useEffect(() => {
    if (s !== "detail" || y !== "ready" || Ne.current !== m || !ke.current) return;
    const A = window.requestAnimationFrame(() => {
      const $ = ue.current;
      if (!$) return;
      if (se.current !== m) {
        $.scrollTop = $.scrollHeight, se.current = m;
        return;
      }
      $.scrollTo({ top: $.scrollHeight, behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(A);
  }, [m, s, y, u.length]), o.useEffect(() => {
    if (ye(null), s !== "detail" || !m || (ee == null ? void 0 : ee.type) !== "DIRECT") return;
    let A = false;
    const $ = async () => {
      const L = await Le(m);
      if (A || L.length !== 1) return;
      const R = await fe("/chat/presence/" + encodeURIComponent(L[0])).catch(() => null);
      A || ye(R);
    };
    $();
    const v = window.setInterval(() => void $(), 3e4);
    return () => {
      A = true, window.clearInterval(v);
    };
  }, [m, ee == null ? void 0 : ee.type, s, e]), o.useEffect(() => {
    f("collapsed");
  }, [a]), o.useEffect(() => en.subscribe(e, le), [e, m, s, F]), o.useEffect(() => {
    !F || !m || X <= 0 || (d((A) => A.map(($) => $.id === m ? { ...$, unreadCount: 0 } : $)), en.acknowledgeRead(m, X));
  }, [F, m, X, e]), o.useEffect(() => {
    window.dispatchEvent(new CustomEvent("chat-unread-count", { detail: ge }));
  }, [ge]), o.useEffect(() => {
    function A($) {
      $.key === "Escape" && s !== "collapsed" && (f("collapsed"), window.setTimeout(() => {
        var v;
        return (v = r.current) == null ? void 0 : v.focus();
      }, 0));
    }
    return window.addEventListener("keydown", A), () => window.removeEventListener("keydown", A);
  }, [s]);
  function le(A) {
    if (A.type === "GROUP_CREATED" || A.type === "MEMBER_ADDED") {
      Me();
      return;
    }
    if (A.type === "MEMBER_REMOVED" && A.targetUserId === e) {
      we(($) => {
        const v = { ...$ };
        return delete v[A.conversationId], v;
      }), h(($) => $.filter((v) => v.conversationId !== A.conversationId)), d(($) => $.filter((v) => v.id !== A.conversationId)), m === A.conversationId && (p(null), ze(false), q(null), f("list"));
      return;
    }
    if (A.type === "MESSAGE_CREATED" && A.message) {
      const $ = A.message, v = $.senderId === e, L = jl($), R = !v && s === "detail" && m === A.conversationId && F && document.visibilityState === "visible";
      d((G) => {
        const J = G.find((ce) => ce.id === A.conversationId);
        if (!J) return Me(), G;
        const ae = { ...J, preview: v ? "B\u1EA1n: " + Qa($) : Qa($), updatedAt: "now", isDissolved: J.isDissolved || L, unreadCount: v ? J.unreadCount : R ? 0 : J.unreadCount + 1 };
        return [ae, ...G.filter((ce) => ce.id !== ae.id)];
      }), m === A.conversationId && (h((G) => G.some((J) => J.id === $.id) ? G : [...G, $]), R && en.acknowledgeRead(A.conversationId, $.messageSeq));
      return;
    }
    if (A.type === "CURSOR_UPDATED" && A.actorId !== e) {
      const $ = A.deliveredSeq ?? 0, v = A.readSeq ?? 0;
      d((L) => L.map((R) => R.id === A.conversationId ? { ...R, recipientDeliveredSeq: Math.max(R.recipientDeliveredSeq, $), recipientReadSeq: Math.max(R.recipientReadSeq, v) } : R)), m === A.conversationId && h((L) => L.map((R) => R.senderId === e ? { ...R, status: R.messageSeq <= v ? "read" : R.messageSeq <= $ ? "delivered" : R.status } : R));
    }
  }
  async function Me(A) {
    C("loading");
    try {
      const v = ((await fe(`/chat/conversations?actorId=${encodeURIComponent(e)}&limit=12`)).items ?? []).map((L) => ({ id: L.id, type: L.type ?? "DIRECT", isDissolved: !!L.isDissolved, title: L.title || (L.type === "GROUP" ? "Group conversation" : "Direct message"), avatarUrl: L.avatarUrl, preview: yl(L, e), unreadCount: L.unreadCount ?? 0, updatedAt: "", recipientDeliveredSeq: L.recipientDeliveredSeq ?? 0, recipientReadSeq: L.recipientReadSeq ?? 0 }));
      v.forEach((L) => en.rememberRecipientCursor(L.id, L.recipientDeliveredSeq, L.recipientReadSeq)), d(v), A && p(A), C("ready");
    } catch {
      d([]), C("error");
    }
  }
  async function Te(A) {
    Ne.current = null, I("loading");
    try {
      const $ = await fe(`/chat/conversations/${A}/messages?actorId=${encodeURIComponent(e)}&limit=30`), v = c.find((R) => R.id === A), L = Ra($.items ?? [], e, (v == null ? void 0 : v.recipientDeliveredSeq) ?? 0, (v == null ? void 0 : v.recipientReadSeq) ?? 0);
      h((R) => On(L, R, A)), xe(!!$.hasMore), Ne.current = A, I("ready");
    } catch {
      h([]), I("error");
    }
  }
  async function de() {
    const A = m;
    if (!A || !$e || Ee.current || y !== "ready") return;
    const v = u.filter((R) => R.conversationId === A).reduce((R, G) => Math.min(R, G.messageSeq), Number.POSITIVE_INFINITY);
    if (!Number.isFinite(v)) return;
    const L = ue.current;
    Ee.current = true, De(true), ke.current = false;
    try {
      const R = await fe(`/chat/conversations/${A}/messages?actorId=${encodeURIComponent(e)}&beforeSeq=${v}&limit=30`);
      if (Ne.current !== A) return;
      const G = c.find((ae) => ae.id === A), J = Ra(R.items ?? [], e, (G == null ? void 0 : G.recipientDeliveredSeq) ?? 0, (G == null ? void 0 : G.recipientReadSeq) ?? 0);
      J.length && L && (Q.current = { conversationId: A, scrollHeight: L.scrollHeight, scrollTop: L.scrollTop }), h((ae) => On(J, ae, A)), xe(!!R.hasMore);
    } finally {
      Ee.current = false, De(false);
    }
  }
  async function Le(A) {
    if (me[A]) return me[A];
    try {
      const $ = await fe(`/chat/conversations/${encodeURIComponent(A)}/details?actorId=${encodeURIComponent(e)}`), v = ($.members ?? []).map((R) => R.userId).filter((R) => R && R !== e), L = $.members.find((R) => R.userId !== e);
      return d((R) => R.map((G) => G.id !== A ? G : { ...G, isDissolved: !!$.isDissolved, ...G.type === "DIRECT" && (L != null && L.displayName) ? { title: L.displayName, avatarUrl: L.avatarUrl ?? G.avatarUrl } : {} })), we((R) => ({ ...R, [A]: v })), v;
    } catch {
      return [];
    }
  }
  async function Ye(A) {
    const $ = m;
    if (!$) return;
    ke.current = false;
    const v = u.filter((L) => L.conversationId === $);
    if (v.some((L) => L.messageSeq === A)) oe.current = "smooth";
    else {
      const L = v.reduce((G, J) => Math.min(G, J.messageSeq), A), R = L - A > 100;
      ke.current = false, R && Ge(true);
      try {
        const G = await Ll($, e, A, L);
        if (!G.some((ce) => ce.messageSeq === A)) return;
        const J = c.find((ce) => ce.id === $), ae = Ra(G, e, (J == null ? void 0 : J.recipientDeliveredSeq) ?? 0, (J == null ? void 0 : J.recipientReadSeq) ?? 0);
        h((ce) => On(ae, ce, $)), oe.current = R ? "auto" : "smooth";
      } catch {
        return;
      } finally {
        R && Ge(false);
      }
    }
    P(A);
  }
  async function Ve(A) {
    A.preventDefault(), !(!m || ee != null && ee.isDissolved) && await pl({ conversationId: m, userId: e, draft: T, replyTo: D, sending: E, mediaComposer: x, optimisticPrefix: "floating", loadRecipientIds: () => Le(m), setDraft: j, setReplyTo: q, setSending: b, setMessages: h, updateConversationPreview: ($) => d((v) => v.map((L) => L.id === m ? { ...L, preview: `B\u1EA1n: ${$}` } : L)), enqueueOfflineMessage: ($) => k((v) => [...v, $]) });
  }
  function an(A) {
    h([]), ze(false), q(null), p(A), f("detail"), Le(A);
  }
  function Xe() {
    !m || F || ze(true);
  }
  async function Ke(A) {
    re(false), await Me(A.id), an(A.id);
  }
  return s === "collapsed" ? a ? n.jsxs("button", { ref: r, className: "floating-message-launcher icon-only", onClick: () => f("list"), "aria-label": "Open messages", children: [n.jsx(fn, { size: 21 }), ge > 0 && n.jsx("em", { children: ge })] }) : n.jsxs("button", { ref: r, className: "floating-message-launcher", onClick: () => f("list"), "aria-label": "Open messages", children: [n.jsx(fn, { size: 19 }), n.jsxs("span", { children: [n.jsx("strong", { children: "Messages" }), n.jsx("small", { children: ge > 0 ? `${ge} unread` : "Open inbox" })] }), n.jsx("span", { className: "floating-recent-avatars", children: O.map((A) => n.jsx("i", { children: fl(A.title) }, A.id)) }), ge > 0 && n.jsx("em", { children: ge })] }) : n.jsxs("section", { className: `floating-message-panel ${s}`, role: "dialog", "aria-modal": "false", "aria-label": "Messages", children: [n.jsxs("header", { className: "floating-message-header", children: [s === "detail" && n.jsx("button", { onClick: () => f("list"), "aria-label": "Back to conversations", children: n.jsx(dn, { size: 18 }) }), s === "detail" && ee ? n.jsxs(n.Fragment, { children: [n.jsx("span", { className: "floating-thread-avatar detail-avatar", children: n.jsx(cn, { src: ee.avatarUrl ?? void 0, label: ee.title }) }), n.jsxs("div", { children: [n.jsx("strong", { children: ee.title }), n.jsx("small", { children: ee.type === "DIRECT" ? vl(Se) : "Cu\u1ED9c tr\xF2 chuy\u1EC7n nh\xF3m" })] })] }) : n.jsxs("div", { children: [n.jsx("strong", { children: "Messages" }), n.jsx("small", { children: g === "error" ? "Connection issue" : `${c.length} conversations` })] }), n.jsxs("span", { className: "floating-message-tools", children: [n.jsx("button", { onClick: t, "aria-label": "Open full messages", children: n.jsx(Vl, { size: 17 }) }), n.jsx("button", { onClick: () => f("collapsed"), "aria-label": "Close messages", children: n.jsx(pe, { size: 18 }) })] })] }), s === "list" && n.jsxs(n.Fragment, { children: [n.jsx("div", { className: "floating-inbox-toolbar", children: n.jsxs("label", { children: [n.jsx(ma, { size: 16 }), n.jsx("input", { value: ne, onChange: (A) => be(A.target.value), placeholder: "Search conversations", "aria-label": "Search conversations" }), ne && n.jsx("button", { type: "button", onClick: () => be(""), "aria-label": "Clear search", children: n.jsx(pe, { size: 15 }) })] }) }), n.jsxs("div", { className: "floating-thread-list", children: [g === "loading" && n.jsx(Mt, {}), g === "error" && n.jsx(Zn, { icon: In, title: "Messages unavailable", detail: "Could not load conversations.", action: "Retry", onAction: () => void Me() }), g === "ready" && K.length === 0 && n.jsx(Zn, { icon: fn, title: ne ? "No conversations found" : "No conversations", detail: ne ? "Try another name or message." : "Your messages will appear here." }), g === "ready" && K.map((A) => n.jsxs("button", { className: `${A.id === m ? "selected" : ""} ${A.unreadCount > 0 ? "unread" : ""}`, onClick: () => an(A.id), children: [n.jsx("span", { className: "floating-thread-avatar", children: n.jsx(cn, { src: A.avatarUrl ?? void 0, label: A.title }) }), n.jsxs("span", { children: [n.jsx("strong", { children: A.title }), n.jsx("small", { children: A.preview })] }), A.unreadCount > 0 && n.jsx("em", { "aria-label": `${A.unreadCount} unread messages`, children: A.unreadCount })] }, A.id))] }), n.jsx("button", { className: "floating-compose", onClick: () => re(true), "aria-label": "New message", children: n.jsx(ha, { size: 18 }) })] }), s === "detail" && n.jsxs(n.Fragment, { children: [n.jsxs("div", { ref: ue, className: "floating-message-stream", tabIndex: -1, onScroll: (A) => {
    const $ = A.currentTarget;
    ke.current = xl($), $.scrollTop <= 96 && de();
  }, onPointerDown: Xe, onFocusCapture: Xe, children: [y === "loading" && n.jsx(Mt, {}), y === "ready" && Qe && n.jsx("div", { className: "chat-history-page-loader compact", role: "status", children: "\u0110ang t\u1EA3i tin nh\u1EAFn c\u0169..." }), Ze && n.jsxs("div", { className: "chat-history-jump-loader compact", role: "status", children: [n.jsx("span", {}), "\u0110ang t\u1EA3i t\u1EDBi tin nh\u1EAFn \u0111\u01B0\u1EE3c tr\u1EA3 l\u1EDDi..."] }), y === "error" && n.jsx(Zn, { icon: In, title: "Could not load messages", detail: "Try opening this conversation again." }), y === "ready" && u.length === 0 && n.jsx(Zn, { icon: fn, title: "No messages yet", detail: "Send a first message." }), N.length > 0 && n.jsxs("button", { className: "dm-offline-queue", onClick: () => {
    var A;
    return j(((A = N[0]) == null ? void 0 : A.content) ?? "");
  }, children: ["Offline queue (", N.length, ")"] }), y === "ready" && H.map((A, $) => {
    var v, L;
    return n.jsxs("div", { "data-message-seq": A.messageSeq, "data-message-seqs": (v = A.groupMessageSeqs) == null ? void 0 : v.join(" "), className: `floating-message-block ${V === A.messageSeq || (L = A.groupMessageSeqs) != null && L.includes(V ?? -1) ? "reply-highlight" : ""}`, children: [$ > 0 && sr(A, H[$ - 1]) && n.jsx("time", { className: "floating-time-separator", children: os(A.createdAt) }), n.jsx(p2, { message: A, outgoing: A.senderId === e, showSender: A.senderId !== e && (ee == null ? void 0 : ee.type) === "GROUP", directConversation: (ee == null ? void 0 : ee.type) === "DIRECT", onReply: () => q(A), onOpenMedia: (R, G) => Y({ items: R, index: G }), onOpenReply: (R) => void Ye(R), defaultStatusVisible: A.id === _ })] }, A.id);
  })] }), ee != null && ee.isDissolved ? n.jsx("div", { className: "chat-dissolved-notice compact", role: "status", children: "Nh\xF3m chat \u0111\xE3 b\u1ECB gi\u1EA3i t\xE1n" }) : n.jsxs("form", { className: "floating-composer", onSubmit: Ve, onPointerDown: Xe, onFocusCapture: Xe, children: [D && n.jsx(Sl, { message: D, onCancel: () => q(null) }), (x.images.length > 0 || x.audioAttachment || x.recording || x.error) && n.jsx(kl, { composer: x, disabled: E, onAdd: () => {
    var A;
    return (A = B.current) == null ? void 0 : A.click();
  } }), n.jsx("input", { ref: B, className: "chat-media-file-input", type: "file", accept: "image/*", multiple: true, onChange: (A) => {
    x.selectImages(A.target.files), A.target.value = "";
  } }), n.jsxs("div", { className: "floating-composer-row", children: [n.jsx("button", { type: "button", "aria-label": "Ch\u1ECDn \u1EA3nh", disabled: x.recording || E, onClick: () => {
    var A;
    return (A = B.current) == null ? void 0 : A.click();
  }, children: n.jsx(Ro, { size: 16 }) }), n.jsx(Gr, { textareaRef: z, value: T, onChange: j, disabled: x.recording || E, iconSize: 16 }), n.jsx("textarea", { ref: z, value: T, disabled: x.recording || E, onChange: (A) => j(A.target.value), onKeyDown: (A) => {
    var $;
    A.key === "Enter" && !A.shiftKey && !A.nativeEvent.isComposing && (A.preventDefault(), ($ = A.currentTarget.form) == null || $.requestSubmit());
  }, rows: 1, placeholder: "Tin nh\u1EAFn...", "aria-label": "Tin nh\u1EAFn" }), n.jsx("button", { type: "button", className: x.recording ? "recording" : "", "aria-label": x.recording ? "D\u1EEBng ghi \xE2m" : "Ghi \xE2m", disabled: E, onClick: () => x.recording ? x.stopRecording() : void x.startRecording(), children: x.recording ? n.jsx(na, { size: 15, fill: "currentColor" }) : n.jsx(Gt, { size: 16 }) }), n.jsx("button", { className: "floating-send", type: "submit", disabled: E || x.recording || !T.trim() && x.images.length === 0 && !x.audioAttachment, "aria-label": "G\u1EEDi", children: n.jsx(vt, { size: 16 }) })] })] })] }), he && n.jsx(gl, { viewerId: e, onClose: () => re(false), onCreated: (A) => void Ke(A) }), w && n.jsx(mr, { items: w.items, initialIndex: w.index, onClose: () => Y(null) })] });
}
function w2() {
  return n.jsxs("section", { className: "screen states-grid", children: [n.jsx(Da, { icon: In, title: "Offline", action: "Retry" }), n.jsx(Da, { icon: Ao, title: "Permission denied", action: "Back" }), n.jsx(Da, { icon: Dn, title: "Empty saved content", action: "Open feed" }), n.jsx(Da, { icon: xn, title: "Session expired", action: "Sign in" })] });
}
function Ji(e) {
  return /\/video\/upload\/|\.(mp4|webm|mov|m4v)(?:$|\?)/i.test(e);
}
function y2({ item: e, depth: a = 0, viewerId: t, postAuthorId: i, liked: r = false, onLike: s, onReply: f, onOpenMedia: c, onOpenProfile: d }) {
  const [u, h] = o.useState(false), [m, p] = o.useState(false), [g, C] = o.useState(e.content ?? ""), [y, I] = o.useState(e.content ?? ""), [T, j] = o.useState(false), [E, b] = o.useState(r), [N, k] = o.useState(false), B = o.useRef(null), z = e.userId === t, x = e.commentType === "DELETED";
  o.useEffect(() => {
    C(e.content ?? ""), I(e.content ?? "");
  }, [e.id, e.content]), o.useEffect(() => {
    b(r);
  }, [e.id, r]), o.useEffect(() => {
    if (!u) return;
    function V(D) {
      var q;
      D.target instanceof Node && !((q = B.current) != null && q.contains(D.target)) && h(false);
    }
    function P(D) {
      D.key === "Escape" && h(false);
    }
    return document.addEventListener("pointerdown", V), document.addEventListener("keydown", P), () => {
      document.removeEventListener("pointerdown", V), document.removeEventListener("keydown", P);
    };
  }, [u]);
  async function w() {
    const V = y.trim();
    if (!(!V || T)) {
      j(true);
      try {
        const P = await ie("/comments", "PUT", { commentId: e.id, userId: t, content: V });
        C(P.content ?? V), I(P.content ?? V), p(false), h(false);
      } finally {
        j(false);
      }
    }
  }
  async function Y() {
    if (!s || N) return;
    const V = E;
    b(!V), k(true);
    try {
      b(await s(e.id));
    } catch {
      b(V);
    } finally {
      k(false);
    }
  }
  return n.jsxs("div", { className: a ? "comment-row nested" : "comment-row", children: [n.jsx("button", { type: "button", className: "comment-author-avatar", onClick: () => void d(e.userId), "aria-label": "Open profile for " + (e.username || e.userId), children: n.jsx(cn, { src: e.avatarUrl || void 0, label: e.username || e.userId }) }), n.jsxs("div", { className: "comment-content", children: [m ? n.jsxs("div", { className: "comment-edit", children: [n.jsx("textarea", { value: y, onChange: (V) => I(V.target.value), "aria-label": "Edit comment" }), n.jsxs("div", { children: [n.jsx("button", { type: "button", onClick: () => {
    p(false), I(g);
  }, children: "Cancel" }), n.jsx("button", { type: "button", onClick: () => void w(), disabled: !y.trim() || T, children: T ? "Saving" : "Save" })] })] }) : x || g ? n.jsxs("p", { className: x ? "comment-copy emoji-text deleted-comment" : "comment-copy emoji-text", children: [n.jsx("button", { type: "button", className: "comment-author-name", onClick: () => void d(e.userId), children: e.username || "Unknown user" }), e.userId === i && n.jsx("span", { className: "author-badge", children: "Author" }), " ", x ? "Deleted comment" : g] }) : null, e.mediaUrl && n.jsx("button", { type: "button", className: "comment-media-open", onClick: () => c == null ? void 0 : c(e.mediaUrl, Ji(e.mediaUrl)), "aria-label": Ji(e.mediaUrl) ? "Open comment video" : "Open comment image", children: Ji(e.mediaUrl) ? n.jsxs(n.Fragment, { children: [n.jsx("video", { className: "comment-media", src: e.mediaUrl, muted: true, playsInline: true, preload: "metadata" }), n.jsx("span", { className: "comment-media-play", "aria-hidden": "true", children: n.jsx(ja, { size: 22, fill: "currentColor" }) })] }) : n.jsx("img", { className: "comment-media", src: e.mediaUrl, alt: "Comment attachment" }) }), n.jsxs("footer", { children: [n.jsx("time", { children: Wt(e.timestamp ?? (/* @__PURE__ */ new Date()).toISOString()) }), !x && f && n.jsx("button", { onClick: () => f(e), children: "Reply" }), n.jsxs("span", { ref: B, className: "comment-options", children: [n.jsx("button", { onClick: () => h((V) => !V), "aria-label": "Comment options", "aria-expanded": u, children: n.jsx(ea, { size: 13 }) }), u && n.jsxs("span", { className: "comment-options-menu", role: "menu", children: [n.jsx("button", { type: "button", role: "menuitem", onClick: () => h(false), children: "Report" }), z && !x && n.jsx("button", { type: "button", role: "menuitem", onClick: () => {
    p(true), h(false);
  }, children: "Edit" }), n.jsx("button", { type: "button", role: "menuitem", onClick: () => h(false), children: "Close" })] })] })] })] }), !x && n.jsx("button", { className: E ? "comment-like active" : "comment-like", onClick: () => void Y(), disabled: N, "aria-label": E ? "Unlike comment" : "Like comment", children: n.jsx(Ja, { size: 15, fill: E ? "currentColor" : "none" }) })] });
}
function Da({ icon: e, title: a, action: t }) {
  return n.jsxs("div", { className: "empty-state", children: [n.jsx(e, { size: 24 }), n.jsx("strong", { children: a }), n.jsx("button", { children: t })] });
}
function j2() {
  return n.jsxs("div", { className: "skeleton-stack", children: [n.jsx("span", {}), n.jsx("span", {}), n.jsx("span", {})] });
}
export {
  L2 as default
};
