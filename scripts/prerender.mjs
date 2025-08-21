import fs from "fs";
import path from "path";
import { chromium } from "playwright";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "snapshot");              // 결과물 출력 폴더
const LOCAL_PORT = process.env.SNAPSHOT_PORT || 5000;     // 로컬 프리뷰 포트
const BASE = `http://localhost:${LOCAL_PORT}`;            // 스냅샷 대상 베이스 URL
const PROD_ORIGIN = process.env.PROD_ORIGIN || "https://momo-alpha-pink.vercel.app"; // 정적 파일/이미지 절대경로로 치환할 기준

// build/dist 중 존재하는 폴더 자동 탐색 (정보용 출력)
const buildDir = fs.existsSync(path.join(ROOT, "dist"))
  ? "dist"
  : fs.existsSync(path.join(ROOT, "build"))
  ? "build"
  : null;
console.log(">> detected output dir:", buildDir ?? "(none)");

// 라우트 파일 로드
const routesFile = path.join(ROOT, "snapshots", "routes.txt");
if (!fs.existsSync(routesFile)) {
  console.error("routes.txt not found:", routesFile);
  process.exit(1);
}
const routes = fs
  .readFileSync(routesFile, "utf8")
  .split(/\r?\n/)
  .map((v) => v.trim())
  .filter(Boolean);

// 유틸
const ensureDir = (p) => fs.mkdirSync(p, { recursive: true });
const saveHtml = (route, html) => {
  const safe = route.replace(/[:*?<>|\\"]/g, "").replace(/\/+$/g, "");
  const dir =
    safe === "/" || safe === "" ? OUT_DIR : path.join(OUT_DIR, safe);
  ensureDir(dir);
  const file = path.join(dir, "index.html");
  fs.writeFileSync(file, html, "utf8");
  console.log("✔ saved", file);
};

(async () => {
  ensureDir(OUT_DIR);
  const browser = await chromium.launch();
  const ctx = await browser.newContext();

  for (const r of routes) {
    const route = r.startsWith("/") ? r : `/${r}`;
    const url = `${BASE}${route}`;
    const page = await ctx.newPage();
    console.log("→ snapshot", url);

    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

      // 렌더 안정화 대기(필요 시 조정)
      await page.waitForTimeout(500);

      // 렌더된 HTML 가져오기
      let html = await page.content();

      // 절대경로( /... ) 정적 자산을 배포 도메인으로 바꿔 CSS/이미지 로딩되게 함
      html = html
        .replace(/(href|src)=["']\/(?!\/)/g, `$1="${PROD_ORIGIN}/`)
        .replace(/content=["']\/(?!\/)/g, `content="${PROD_ORIGIN}/`);

      saveHtml(route, html);
    } catch (e) {
      console.error("✖ failed", url, e?.message);
    }
  }

  await browser.close();

  // 기본 robots & 404(옵션)
  fs.writeFileSync(
    path.join(OUT_DIR, "robots.txt"),
    "User-agent: *\nAllow: /\n",
    "utf8"
  );
  console.log("✅ snapshot done.");
})(); 