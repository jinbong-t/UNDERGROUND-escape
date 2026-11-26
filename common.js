/* ===== THE UNDERGROUND 공통 모듈 (학생 앱·교사 대시보드 공용) ===== */

/* 1) Firebase 설정: 콘솔 > 프로젝트 설정 > 내 앱(웹)의 값을 붙여 넣으세요.
      apiKey가 비어 있으면 '체험 모드'로 실행됩니다(이 브라우저 안에서만 저장, 탭끼리 실시간 연동). */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAF2z9fJaR7kF1qwaPkG270pXJODWgG4DM",
  authDomain: "the-underground-9f482.firebaseapp.com",
  projectId: "the-underground-9f482",
  storageBucket: "the-underground-9f482.firebasestorage.app",
  messagingSenderId: "198200614414",
  appId: "1:198200614414:web:26a25e886b49963ccf665f"
};

const FB_VER = "10.12.2";
const APP_VER = "v1.1 · 2026.11.26";
const CREW = "WS교수학습법연구회";
const ROOM_SEC = 15 * 60;
const PIN_HASH = "2f3dea5d90e31119ea45fdb12146aef7e8ae9e3ed4ba379e80b902fc5dde3431";      // 대시보드 PIN
const TEACHER_CODE_HASH = "df8de6261d8fc1195a5d09bd180f5d5d599445a856f8f72bef83ac98c39c3e5a"; // 교사 확인 코드

const ROOM_NAMES = { 1: "국어실", 2: "영어실", 3: "과학실", 4: "기술실", 5: "가정실", 6: "역사실" };

/* 2) 기본 설정값 (정답 원문 없음, 해시만). 교사 대시보드 [설정]에서 바꿀 수 있습니다. */
const DEFAULT_CONFIG = {
  version: 4,
  introVideo: "intro.mp4",   // 웹앱과 같은 폴더의 영상 파일 또는 YouTube 링크
  endingVideo: "ending.mp4",   // 엔딩(범인 자백) 영상
  rooms: {
    1: { keypad: "num", wrongLock: 10, codes: [{ id: "main", label: "비밀번호", main: true, len: 8, hash: "ced3c0730637a131ff44cf5021a5474008add6585a75b6990586e26a5033be5d" }],
         missions: [{ name: "CH.1 · 올바른 접속어를 찾아라", h1: "", h2: "" }, { name: "CH.2 · 올바른 단어를 찾아라", h1: "", h2: "" }] },
    2: { keypad: "alpha", codes: [
           { id: "exit", label: "출구 코드", main: false, len: 4, alpha: true, hash: "61bc54ecda84e085010249d1fc3b9513b8fdcacfa13c8354a62a91e2afc59b41", okMsg: "출구 코드 해독 완료! 선생님께 다음 미션 상자를 받으세요.", reveal: "MISSION 02-2 · 지워진 유훈을 복원하라\n(유훈: 초대 교장이 세상을 떠나며 남긴 마지막 당부)\n3자리 보안 해제 번호는 앱이 아니라 <책 상자 번호키>에 직접 입력합니다.\n상자를 연 뒤, 두 미션의 답을 이어 붙여 최종 코드를 이 단말기에 입력하세요." },
           { id: "main", label: "최종 코드", main: true, len: 7, alpha: true, hash: "d7ed44fd75ddcaaae71327aad0ecf85acc553d20888ade1dee1743f94f08c480" }],
         missions: [
           { name: "단계 1 · 출구 코드를 밝혀라", h1: "범인이 음성 메모에서 또박또박 발음한 4개의 영단어를 먼저 받아적어 보세요. 포네틱 알파벳은 각 단어 전체가 아니라 ‘맨 앞 글자’에 진짜 암호가 숨겨져 있습니다.", h2: "받아적은 네 단어의 첫 알파벳만 순서대로 떼어내어 합쳐보세요. 첫 번째 단어는 LIMA.. 총 4글자의 알파벳 코드가 완성됩니다." },
           { name: "단계 2 · 지워진 유훈을 복원하라", h1: "빈칸 앞 문장에 등장하는 인물인 ‘a brave woman(한 용감한 여성)’을 받아주는 3글자 영단어를 찾아보세요. 우리말 해석의 ‘그녀의’에 해당하는 소유격 단어입니다.", h2: "복원한 영단어를 알파벳 순서(A=1, B=2 ... Z=26)로 바꾼 뒤, 두 자리 숫자가 나오면 십의 자리는 버리고 일의 자리 숫자만 남기세요. (예: 18번째 알파벳이라면 8만 입력합니다.)" },
           { name: "단계 1+2 · 최종 코드", h1: "최종 정답은 숫자가 아닌 총 7글자의 영단어입니다. [미션 1]에서 해독한 4글자 알파벳 코드와 [미션 2]에서 복원한 3글자 영단어를 순서대로 이어 붙여 보세요. (숫자가 아닌 복원한 영어 단어 자체를 사용합니다.)", h2: "[미션 1의 결과] + [미션 2의 단어]를 한 단어로 합치면 ‘가죽’이라는 뜻의 영단어가 완성됩니다." }] },
    3: { keypad: "num", codes: [{ id: "main", label: "최종 코드", main: true, len: 3, hash: "fcb94084e26980530d11af54a7fe4243e8275e1edb8d4abde66e07046a7a2633" }],
         missions: [
           { name: "단계 1 · 신발장 주변", h1: "사진만 보지 말고 벽을 보세요. 신발장 옆 안내판에 비슷한 그림이 있어요.", h2: "안내판 그림 중 사진과 같은 무늬는 파도무늬예요. 사진에서 이어진 물결선은 4줄이에요." },
           { name: "단계 2 · 받은 물품", h1: "쓸모를 모르는 종이카드가 있나요? 안내판에서 크기가 같은 곳을 찾아보세요.", h2: "카드의 잘린 모서리를 안내판 “그림 7” 왼쪽 위에 맞추면 “파도무늬는 모두 몇 개?”가 보여요. 교실의 파도무늬 스티커는 6개예요." },
           { name: "단계 3 · 수상한 흔적", h1: "다른 스티커들도 안내판 그림과 하나씩 비교해 보세요.", h2: "안내판에 없는 소용돌이무늬의 한가운데를 자세히 보세요. 숨은 숫자는 9예요. 최종 코드는 4-6-9입니다." }] },
    4: { keypad: "alpha", codes: [
           { id: "switch", label: "6구 스위치 코드", main: false, len: 6, alpha: false, ui: "4sub", hash: "3c443e92f1095a1b2df9b10fcf23c7329cee0302ffc615d0de77b961276bcf99", okMsg: "메인 서버 전원 복구! 모니터에 손상된 패킷이 떴습니다.", revealMono: true,
             reveal: "SERVER REBOOT … OK\n손상된 데이터 패킷 6줄 [순번 3bit | 데이터 8bit]\n─────────────────────\n100 | 01010010\n010 | 01000101\n110 | 01010100\n001 | 01010011\n101 | 01000101\n011 | 01000011\n─────────────────────\n순번대로 정렬하고, 벽면의 아스키코드표로 해독하라." },
           { id: "main", label: "접근 로그 암호", main: true, len: 6, alpha: true, hash: "73e6ec1a886f25f5f99dd4dbe4e058874ecaa8a46e6afd025f92f945769e57b2" }],
         missions: [
           { name: "CH.1 · 블랙아웃", h1: "교실에 붙은 자료 중 ‘6구 비상 배전반’에 해당하는 안전 수칙만 골라 모으세요. 다른 배전반 자료는 함정이에요.", h2: "PWR부터 차례로 정하세요. ISO가 1이면 전체가 차단돼요. 앞 스위치 값이 다음 스위치를 결정합니다. (1=ON, 0=OFF)" },
           { name: "CH.2 · 손상된 접근 로그", h1: "각 패킷의 앞 3비트는 ‘순번’이에요. 이진수를 10진수로 바꿔 1번(001)부터 6번(110)까지 줄을 세우세요.", h2: "뒤쪽 8비트를 10진수로 바꾼 뒤 벽면의 아스키코드표에서 글자를 찾으세요. 6글자 영단어가 나와요." }] },
    5: { keypad: "num", codes: [{ id: "main", label: "최종 코드", main: true, len: 4, hash: "dba27064f1e5e0bf0c317668f70afd0acba333d089eaabd64b3a50ffeeeccd88" }],
         note: "단계 1(얼룩)·단계 2(보존함)는 가정실 자체 웹앱에서 진행합니다. 이 앱에는 단계 3의 최종 코드만 입력하세요.",
         missions: [
           { name: "단계 3 · 침입자가 마신 음료", h1: "영양정보의 기준(100mL당, 1캔당, 1회 제공량당, 총 내용량당)을 먼저 보세요. 모두 1mL당으로 바꿔야 비교할 수 있어요.", h2: "당류 0g이면서 1mL당 카페인이 0.15mg보다 적은 표본은 2개예요. 두 카드 로고 글자에서 색이 살짝 다른 선만 이어 보세요." }] },
    6: { keypad: "num", codes: [
           { id: "order", label: "100년사 복원", main: false, len: 6, type: "order", ui: "6order", items: ["6월의 학생 기록", "학교 설립 기록", "수업 중단 기록", "4월의 학생 기록", "교육 방침 변경 기록", "학교 기념행사 기록"],
             hash: "d83941145eea6156c1fd5a387fb4cbf50457454876f64cf76c2b37347efd0e93", okMsg: "연혁표 복원 완료! 금고 비밀번호 규칙이 화면에 나타났습니다.",
             reveal: "복원된 연혁표 하단에 희미한 글씨가 떠오른다.\n「금고 비밀번호 = 2번째 사건 연도의 끝 두 자리 + 5번째 사건 연도의 끝 두 자리」" },
           { id: "box", label: "금고 비밀번호", main: false, len: 4, ui: "6sub", hash: "2454a3b23ee65a0e05950d887df7511281566eb75b1875ca402680accedd892d", okMsg: "서고 금고가 열렸다! 안에서 수상한 메모 한 장이 나왔습니다.",
             reveal: "금고 속 메모\n“학교가 세워진 날부터 지금까지 변하지 않은 글자”\n범인은 무엇을 찾고자 했던 것일까?" },
           { id: "main", label: "최종 코드", main: true, len: 4, hash: "74ad1dcb1dbb05a78f11fa7b6bc296a53b4b323cdca58822ca4f72f94e5770d7" }],
         missions: [
           { name: "CH.1 · 100년사 복원", h1: "사료는 두 개씩(4번은 세 개) 짝지어 비교해야 연도가 나와요. 졸업 앨범의 ‘회차’와 학제 기록의 ‘수업 연한’을 함께 보세요.", h2: "여섯 기록은 학교 설립 · 광복 · 6.25 전쟁 · 4.19 혁명 · 6월 민주 항쟁 · 서울 올림픽과 이어져요. 시간순으로 놓은 뒤 화면 규칙대로 끝 두 자리를 고르세요." },
           { name: "CH.2 · 글자에 봉인된 비밀", h1: "학교가 세워진 날부터 지금까지 남아 있는 네 글자를 찾아, 한자 학습표나 사전으로 각 글자의 획수를 세어 보세요.", h2: "각 글자의 획수에 그 글자의 순서(1~4번째)를 더한 뒤, 일의 자리 숫자만 이어 쓰세요." }] }
  },
  finalHash: "145b91a35d4a4bb9325a84f66b9d9408e5c2f6d2331c9feb93a46e59c537094c",
    rotation: (() => {   // 기획서 5-1: 반별 고정 경로, 한 반의 5모둠은 같은 방에서 동시 진행 (1반=A, 2반=B, 3반=C, 4반=D)
    const R = { 1: [1, 2, 3, 4, 5, 6], 2: [2, 3, 4, 5, 6, 1], 3: [4, 5, 6, 1, 2, 3], 4: [5, 6, 1, 2, 3, 4] };
    const r = {}; for (let cl = 1; cl <= 4; cl++) { r[cl] = {}; for (let g = 1; g <= 5; g++) r[cl][g] = R[cl].slice(); } return r; })()
};

const SUSPECTS = [
  { k: "A", code: "Silent K", role: "교장선생님", h: "176cm", shoe: "정장 구두 260mm", wear: "명품 가죽 서류 가방", drink: "블랙커피 (카페인 40mg, 당 0g)", pen: "블루블랙 만년필", map: "모름", motive: "학교 운영 자금의 부족을 메워야 하는 사정", locker: "4102" },
  { k: "B", code: "Static S", role: "과학 선생님", h: "180cm", shoe: "안전화 270mm", wear: "라텍스 장갑", drink: "에너지음료 (카페인 32mg, 당 11g)", pen: "검정 볼펜", map: "모름", motive: "서고 지하 환경과 자료를 직접 조사하려는 관심", locker: "5870" },
  { k: "C", code: "Iron J", role: "관리실 주무관님", h: "175cm", shoe: "작업화 270mm", wear: "면목장갑", drink: "둥글레차 (카페인 0, 당 0)", pen: "연필", map: "숙지", motive: "야간 순찰 중 이상 징후를 확인하려는 목적", locker: "2391" },
  { k: "D", code: "Phantom P", role: "행정실장님", h: "171cm", shoe: "단화 255mm", wear: "맨손", drink: "믹스커피 (카페인 40mg, 당 6g)", pen: "파란 수성펜", map: "모름", motive: "서고 기록과 회계 기록을 대조해 장부를 공개하려는 목적", locker: "6648" },
  { k: "E", code: "Mirage X", role: "공사 현장소장님", h: "178cm", shoe: "작업화 270mm", wear: "빨간 코팅 목장갑 · 빈티지 갈색 가죽 자켓", drink: "이온음료 (카페인 0, 당 6g)", pen: "빨간 유성 매직", map: "숙지", motive: "공사 자금 부족을 해결해야 하는 사정", locker: "7305" },
  { k: "F", code: "Lunar L", role: "국어 선생님", h: "175cm", shoe: "스니커즈 265mm", wear: "양가죽 장갑", drink: "녹차 (카페인 12mg, 당 0)", pen: "버건디 수성 만년필", map: "모름", motive: "개인적인 금전 사정으로 큰돈이 필요한 상황", locker: "8267" }
];

const SUSPECT_IMG = {A: "suspect_A.jpg", B: "suspect_B.jpg", C: "suspect_C.jpg", D: "suspect_D.jpg", E: "suspect_E.jpg", F: "suspect_F.jpg"};
/* ===== 유틸 ===== */
const LS = (() => { const mem = {}; const w = st => ({ getItem: k => { try { return st.getItem(k); } catch (e) { return mem[k] ?? null; } }, setItem: (k, v) => { try { st.setItem(k, v); } catch (e) { mem[k] = String(v); } }, removeItem: k => { try { st.removeItem(k); } catch (e) { delete mem[k]; } } });
  let l, s; try { l = window.localStorage; s = window.sessionStorage; } catch (e) {} return { local: w(l || {}), session: w(s || {}) }; })();
const normCode = s => String(s || "").replace(/[\s\-]/g, "").toLowerCase();
async function sha256(s) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("");
}
const hashCode = (scope, v) => sha256("UG26|" + scope + "|" + normCode(v));
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const todayKey = () => { const d = new Date(); return String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0"); };
const teamIdOf = (cls, group, leader) => `${todayKey()}_${cls}_${group}_${String(leader).replace(/\s+/g, "")}`;
const ytId = u => { const m = String(u || "").match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/); return m ? m[1] : ""; };
function mergeConfig(c) {
  if (!c || !c.rooms) return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  const out = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  const old = (c.version || 1) < DEFAULT_CONFIG.version;   // 활동지 개정 전 설정이면 코드·힌트는 새 기본값 사용
  Object.assign(out, c);
  if (!String(out.introVideo || "").trim()) out.introVideo = DEFAULT_CONFIG.introVideo;
  if (!String(out.endingVideo || "").trim()) out.endingVideo = DEFAULT_CONFIG.endingVideo;
  if (old) { out.rooms = JSON.parse(JSON.stringify(DEFAULT_CONFIG.rooms)); out.finalHash = DEFAULT_CONFIG.finalHash; out.rotation = JSON.parse(JSON.stringify(DEFAULT_CONFIG.rotation)); out.version = DEFAULT_CONFIG.version; }
  return out;
}

/* ===== 점수 계산 (events + team에서 매번 계산) ===== */
function computeScore(team, events, config) {
  const rooms = {};
  let sum = 0, unsolved = 0, done = 0, hints = 0, wrongs = 0;
  for (let r = 1; r <= 6; r++) {
    const ev = events.filter(e => e.room === r);
    const wrong = ev.filter(e => e.type === "wrong" && e.main).length;
    const h1 = ev.filter(e => e.type === "hint" && e.level === 1).length;
    const h2 = ev.filter(e => e.type === "hint" && e.level === 2).length;
    const st = (team.rooms && team.rooms[r] && team.rooms[r].status) || "";
    let score = null;
    if (st === "timeout") { score = 50; unsolved++; done++; }
    else if (st === "solved") { score = Math.max(50, 100 - Math.min(2 * wrong, 20) - 5 * h1 - 10 * h2); done++; }
    if (score != null) sum += score;
    hints += h1 + h2; wrongs += wrong;
    rooms[r] = { status: st, wrong, h1, h2, score };
  }
  const fw = events.filter(e => e.type === "wrong" && e.room === "final").length;
  let finalScore = 0, fail = false;
  if (team.finalResult === "success") finalScore = Math.max(50, 100 - 2 * fw);
  else if (team.finalResult === "fail") { finalScore = 50; fail = true; }
  const adj = Number(team.scoreAdjust || 0);
  const total = sum + finalScore - (fail ? 150 : 0) + adj;
  let grade = "";
  if (team.finalResult) grade = fail ? "수습 탐정" : (total >= 630 && unsolved === 0 ? "수석 탐정" : total >= 525 ? "정예 탐정" : "수습 탐정");
  return { rooms, sum, finalScore, fail, total, unsolved, done, hints, wrongs: wrongs + fw, grade };
}

/* ===== 데이터 계층: Firebase 또는 체험 모드 ===== */
const DB = (() => {
  const live = !!FIREBASE_CONFIG.apiKey;
  let fb = null, db = null, offset = 0, uid = "";
  const TS = { __ts: true };
  const toPlain = v => {
    if (v && typeof v === "object") {
      if (typeof v.toMillis === "function") return v.toMillis();
      if (Array.isArray(v)) return v.map(toPlain);
      const o = {}; for (const k in v) o[k] = toPlain(v[k]); return o;
    }
    return v;
  };
  const toFb = v => {
    if (v && typeof v === "object") {
      if (v.__ts) return fb.serverTimestamp();
      if (v.__del) return fb.deleteField();
      if (Array.isArray(v)) return v.map(toFb);
      const o = {}; for (const k in v) o[k] = toFb(v[k]); return o;
    }
    return v;
  };

  /* --- 체험 모드 저장소 --- */
  const KEY = "ug_demo_store_v2";
  let bc = null; try { bc = ("BroadcastChannel" in window) ? new BroadcastChannel("ug_demo") : null; } catch (e) {}
  const subs = new Set();
  const load = () => { try { return JSON.parse(LS.local.getItem(KEY) || "{}"); } catch (e) { return {}; } };
  const save = s => { LS.local.setItem(KEY, JSON.stringify(s)); bc && bc.postMessage(1); setTimeout(() => subs.forEach(f => f()), 0); };
  bc && (bc.onmessage = () => subs.forEach(f => f()));
  window.addEventListener("storage", e => { if (e.key === KEY) subs.forEach(f => f()); });
  const resolveTs = v => {
    if (v && typeof v === "object") {
      if (v.__ts) return Date.now();
      if (Array.isArray(v)) return v.map(resolveTs);
      const o = {}; for (const k in v) o[k] = resolveTs(v[k]); return o;
    }
    return v;
  };
  const setPath = (obj, dotted, val) => {
    const ks = dotted.split("."); let o = obj;
    for (let i = 0; i < ks.length - 1; i++) { if (typeof o[ks[i]] !== "object" || o[ks[i]] === null) o[ks[i]] = {}; o = o[ks[i]]; }
    if (val && val.__del) delete o[ks.at(-1)]; else o[ks.at(-1)] = val;
  };
  const deepMerge = (a, b) => { for (const k in b) { if (b[k] && typeof b[k] === "object" && !Array.isArray(b[k]) && !b[k].__del) { a[k] = deepMerge(a[k] && typeof a[k] === "object" ? a[k] : {}, b[k]); } else if (b[k] && b[k].__del) delete a[k]; else a[k] = b[k]; } return a; };
  const isChild = (p, col) => p.startsWith(col + "/") && p.slice(col.length + 1).split("/").length === 1;

  async function init() {
    if (!live) { uid = LS.local.getItem("ug_demo_uid") || ("demo-" + Math.random().toString(36).slice(2, 10)); LS.local.setItem("ug_demo_uid", uid); return "demo"; }
    const base = `https://www.gstatic.com/firebasejs/${FB_VER}/`;
    const [appM, fsM, auM] = await Promise.all([import(base + "firebase-app.js"), import(base + "firebase-firestore.js"), import(base + "firebase-auth.js")]);
    fb = { ...appM, ...fsM, ...auM };
    const app = fb.initializeApp(FIREBASE_CONFIG);
    try { db = fb.initializeFirestore(app, { localCache: fb.persistentLocalCache({ tabManager: fb.persistentMultipleTabManager() }) }); }
    catch (e) { db = fb.getFirestore(app); }
    const auth = fb.getAuth(app);
    const cred = await fb.signInAnonymously(auth);
    uid = cred.user.uid;
    try {
      const ref = fb.doc(db, "pings/" + uid);
      const t0 = Date.now();
      await fb.setDoc(ref, { t: fb.serverTimestamp() });
      const s = await fb.getDocFromServer(ref);
      const t1 = Date.now();
      offset = s.data().t.toMillis() - (t0 + t1) / 2;
    } catch (e) { offset = 0; }
    return "firebase";
  }
  const now = () => Date.now() + offset;

  async function get(path) {
    if (!live) { const s = load(); return s[path] ? JSON.parse(JSON.stringify(s[path])) : null; }
    const d = await fb.getDoc(fb.doc(db, path)); return d.exists() ? toPlain(d.data()) : null;
  }
  async function set(path, data, merge = false) {
    if (!live) { const s = load(); s[path] = merge && s[path] ? deepMerge(s[path], resolveTs(data)) : resolveTs(data); save(s); return; }
    await fb.setDoc(fb.doc(db, path), toFb(data), { merge });
  }
  async function update(path, patch) {   // patch keys may be dotted: "rooms.3.status"
    if (!live) { const s = load(); if (!s[path]) throw new Error("not-found"); for (const k in patch) setPath(s[path], k, resolveTs(patch[k])); save(s); return; }
    await fb.updateDoc(fb.doc(db, path), toFb(patch));
  }
  async function create(path, data) {    // 이미 있으면 false
    if (!live) { const s = load(); if (s[path]) return false; s[path] = resolveTs(data); save(s); return true; }
    try {
      return await fb.runTransaction(db, async tx => {
        const ref = fb.doc(db, path); const d = await tx.get(ref);
        if (d.exists()) return false; tx.set(ref, toFb(data)); return true;
      });
    } catch (e) { console.warn(e); return false; }
  }
  async function add(col, data) {
    if (!live) { const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6); const s = load(); s[col + "/" + id] = resolveTs(data); save(s); return id; }
    const r = await fb.addDoc(fb.collection(db, col), toFb(data)); return r.id;
  }
  async function del(path) {
    if (!live) { const s = load(); delete s[path]; save(s); return; }
    await fb.deleteDoc(fb.doc(db, path));
  }
  async function listCol(col) {
    if (!live) { const s = load(); return Object.keys(s).filter(p => isChild(p, col)).map(p => ({ id: p.split("/").at(-1), ...s[p] })); }
    const q = await fb.getDocs(fb.collection(db, col)); return q.docs.map(d => ({ id: d.id, ...toPlain(d.data()) }));
  }
  async function tx(path, fn) {           // fn(current) → patch(merge) | null(취소)
    if (!live) { const s = load(); const cur = s[path] ? JSON.parse(JSON.stringify(s[path])) : null; const p = await fn(cur); if (p) { s[path] = deepMerge(cur || {}, resolveTs(p)); save(s); } return p; }
    return fb.runTransaction(db, async t => {
      const ref = fb.doc(db, path); const d = await t.get(ref);
      const p = await fn(d.exists() ? toPlain(d.data()) : null);
      if (p) t.set(ref, toFb(p), { merge: true });
      return p;
    });
  }
  function watchDoc(path, cb) {
    if (!live) { const f = () => { const s = load(); cb(s[path] ? JSON.parse(JSON.stringify(s[path])) : null); }; subs.add(f); f(); return () => subs.delete(f); }
    return fb.onSnapshot(fb.doc(db, path), d => cb(d.exists() ? toPlain(d.data()) : null), e => console.warn(e));
  }
  function watchCol(col, cb) {
    if (!live) { const f = () => { const s = load(); cb(Object.keys(s).filter(p => isChild(p, col)).map(p => ({ id: p.split("/").at(-1), ...s[p] }))); }; subs.add(f); f(); return () => subs.delete(f); }
    return fb.onSnapshot(fb.collection(db, col), q => cb(q.docs.map(d => ({ id: d.id, ...toPlain(d.data()) }))), e => console.warn(e));
  }
  function watchGroup(name, cb) {         // 모든 teams/*/events
    if (!live) { const f = () => { const s = load(); cb(Object.keys(s).filter(p => { const a = p.split("/"); return a.length === 4 && a[2] === name; }).map(p => ({ id: p.split("/").at(-1), ...s[p] }))); }; subs.add(f); f(); return () => subs.delete(f); }
    return fb.onSnapshot(fb.collectionGroup(db, name), q => cb(q.docs.map(d => ({ id: d.id, ...toPlain(d.data()) }))), e => console.warn(e));
  }
  return { init, now, get, set, update, create, add, del, listCol, tx, watchDoc, watchCol, watchGroup, TS, DEL: { __del: true }, get live() { return live; }, get uid() { return uid; } };
})();
