import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");

const exts = new Set([".js", ".jsx", ".ts", ".tsx"]);
const files = [];

// 1) src 재귀 탐색
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (exts.has(path.extname(p))) files.push(p);
  }
}
walk(SRC);

// 2) 라우트/링크 경로 추출(React Router 흔한 패턴)
const routeRegexes = [
  /path\s*=\s*["'`](\/[^"'` >]*)["'`]/g,           // <Route path="/...">
  /{?\s*path\s*:\s*["'`](\/[^"'` ]*)["'`]/g,      // { path: "/..." }
  /to\s*=\s*["'`](\/[^"'` >]*)["'`]/g,            // <Link to="/...">
];

const paths = new Set(["/"]); // 루트는 기본 포함
for (const f of files) {
  const txt = fs.readFileSync(f, "utf8");
  for (const re of routeRegexes) {
    let m;
    while ((m = re.exec(txt))) {
      const v = m[1].trim();
      if (!v) continue;
      // 동적 세그먼트(:id/*)는 대표 경로로 치환하지 않고 그대로 보존
      paths.add(v);
    }
  }
}

// 3) package.json의 reactSnap.include에 반영
const pkgPath = path.join(ROOT, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

pkg.reactSnap = pkg.reactSnap || {};
// Vite일 가능성: vite가 있으면 source=dist 보장
const isVite = !!(pkg.devDependencies?.vite || pkg.dependencies?.vite);
if (isVite) pkg.reactSnap.source = pkg.reactSnap.source || "dist";

const include = Array.from(paths)
  .filter(p => p.startsWith("/"))
  .sort((a, b) => a.localeCompare(b))
  .slice(0, 30); // 과도한 프리렌더 방지

pkg.reactSnap.include = include;

// CRA/Vite 공통 최적 옵션 보강
pkg.reactSnap.inlineCss = true;
pkg.reactSnap.puppeteerArgs = ["--no-sandbox"];
pkg.reactSnap.skipThirdPartyRequests = true;
pkg.reactSnap.minifyHtml = { collapseWhitespace: true };

// scripts 보강
pkg.scripts = pkg.scripts || {};
if (!pkg.scripts.build) {
  // 기본값 가드
  pkg.scripts.build = isVite ? "vite build" : "react-scripts build";
}
pkg.scripts.postbuild = "react-snap";

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log("✔ routes extracted:", include);
console.log("✔ package.json updated (reactSnap.include)."); 