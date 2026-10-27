# 프로젝트: 불안 유형 인터랙티브 퀴즈 (모바일 전용 웹앱)

## 확정된 요구사항
- 화면: 시작 1개 / 질문 10개 / 결과 4종(결과 페이지 1개가 A~D에 따라 내용이 바뀜)
- 질문 화면: 상단에 제목 + "01 / 10" 페이지 표시, 진행도 바
- 이전 질문 기능 없음 (디자이너 결정)
- 결과 화면: 다시하기 버튼 (문구: "BACK TO THE START", 디자이너 확정). 상단 라벨(RESULT_TOP_LABEL=APP_TITLE)과 사전 문구(RESULT_PRETITLE="YOUR ANXIETY TAKES THE SHAPE OF...") 추가
- 결과 계산: 가장 많이 선택된 알파벳(A~D). 동점이면 동점 알파벳 중 "가장 마지막 질문에서 고른 답"이 결과. 답은 질문 순서대로 저장하는 배열로 관리한다.
- 모바일 전용 (데스크톱에서는 최대 폭만 제한, 프레임 연출 없음)
- 디자이너가 PNG 에셋과 폰트를 줄 예정 (나중에 교체만 하면 됨)
- 제출: GitHub Pages 배포 링크
- 저장소: https://github.com/karynadd/anxiety-quiz.git

## 전체 진행 순서
1. 프로젝트 세팅 (완료)
2. 데이터 파일 작성: 사용자가 질문 10개/선택지/결과 4종 문구를 줄 예정 → src/data에 분리 저장 (2단계 완료)
3. 화면 3종 뼈대 (StartScreen, QuestionScreen, ResultScreen) (3단계 완료)
4. 동작 로직 (화면 전환, 질문 번호, 진행도 바, 답 저장, 결과 계산, 다시하기) (4단계 완료)
5. 스타일링 (목업 기준 다크 톤, 글로우, 선택지 카드) (5단계 완료)
6. 에셋/폰트 적용 (PNG는 2x~3x 내보내기 기준, 업스케일 금지) (6단계 완료)
7. 테스트 (A, B, C, D 4가지 결과와 동점 규칙이 모두 맞는지 확인) (7단계 완료)
8. GitHub 제출: README 작성, git remote 연결과 push, Settings → Pages 설정 안내
   - 사용자는 GitHub 사용이 처음이다. 8단계에서는 명령어와 클릭 위치를 하나씩 쉽게 안내할 것.

## 폴더 구조
```
src/
  assets/
    backgrounds/   IntroPage.png, Q1.png~Q10.png (시작/질문 배경, 디자이너 제공)
    icons/         Button.png (보기/시작/다시하기 공용 버튼 배경)
    results/       Result1.png~Result4.png (결과 A~D 배경, A=1/B=2/C=3/D=4)
    fonts/         bodoni-72-smallcaps-book.ttf (제목), Helvetica.ttc (본문)
  components/
    StartScreen.jsx / .css   (3단계 완료)
    QuestionScreen.jsx / .css (3단계 완료)
    ResultScreen.jsx / .css  (3단계 완료)
  data/
    questions.js   (질문 10개 + 보기, 2단계에서 작성 완료)
    results.js     (결과 A~D 문구, 2단계에서 작성 완료)
    config.js      (앱 제목/버튼 문구 등, 2단계에서 작성 완료)
    assets.js      (화면별 에셋 경로 ESM import 모음, 3단계에서 작성 완료)
  styles/
    fonts.css      (@font-face 등록 완료: Bodoni 72 Smallcaps Book, Helvetica)
    global.css     (모바일 전용 기본 스타일, --font-title / --font-body 변수, .screen-bg 공통 배경 클래스)
  App.jsx          (실제 퀴즈 흐름: start → question(0~9) → result → retry, 4단계 완료)
  utils/
    calculateResult.js (결과 계산 순수 함수, 4단계에서 작성 완료)
    preloadAssets.js   (폰트 preload 링크 삽입 + 질문/결과 배경 Image 프리로드, 5단계에서 작성 완료)
  main.jsx
scripts/
  validate-data.mjs   (questions/results 데이터 검증 스크립트)
  test-calculate.mjs  (calculateResult 동점 규칙 테스트, 4단계에서 작성 완료)
```

## 에셋/폰트 메모
- 폰트 파일명은 디자이너 확정 폰트(제목=Bodoni 72 Smallcaps Book, 본문=Helvetica)와 정확히 일치해서 매칭에 모호함 없었음.
- `Bodoni 72 Smallcaps Book.ttf`는 원래 파일명에 공백이 있어 `bodoni-72-smallcaps-book.ttf`로 사용자 승인 하에 변경함 (git mv로 이력 보존).
- `Helvetica.ttc`는 TrueType Collection 포맷이라 브라우저 @font-face 표준 포맷(ttf/otf/woff/woff2)이 아님. 사용자 승인으로 일단 `format('truetype')`으로 등록해둔 상태. 실제 기기에서 깨지면 디자이너에게 ttf/otf/woff2로 재요청 필요 (fonts.css에 TODO 주석 있음).
- PNG 파일명(IntroPage, Q1~Q10, Button, Result1~4)은 대문자가 섞여 있지만 공백/한글은 없고 ESM import로만 참조하므로 변경하지 않음.
- PNG는 전부 1.5MB를 초과함 (1.56MB~2.35MB, 16개 합계 약 27MB). 6단계에서 사용자에게 확인 후 "일단 그대로 두고 배포 후 체감 속도 보고 판단"으로 결정함. 나중에 로딩이 느리다고 느껴지면 압축 고려.
- 해상도 검증(6단계): 배경/결과 PNG는 전부 941x1672, 앱 렌더 최대 폭이 430px로 고정이라 약 2.19배 — 2x 기기에서는 선명하고, 극히 일부 430px 근처 3x 기기에서만 아주 약간 늘어날 수 있는 정도. 업스케일 없음, 기준 충족.
- `src/assets/icons/Button.png`는 assets.js에 import만 되어 있고 실제 화면에는 전혀 쓰이지 않음 (버튼은 전부 CSS 그라디언트). 6단계에서 사용자 확인 후 "그대로 두기"로 결정 — 나중에 이미지 기반 버튼으로 바꿀 수도 있어서 카탈로그 용도로 남겨둠.
- A=Result1.png / B=Result2.png / C=Result3.png / D=Result4.png 매칭은 이미지 내용(눈/얽힌 실/추락하는 협곡/구체)이 각 결과 문구와 일치하는 것을 직접 확인함.

## 동작 로직 메모 (4단계)
- App.jsx의 currentIndex는 0-based (0~9). QuestionScreen에는 그대로 전달하고, 컴포넌트 내부에서 +1 해서 페이지 번호/진행도("01/10", 채움 비율)를 계산한다.
- 더블 탭 방지는 QuestionScreen 내부 useRef 플래그로 처리한다. App이 질문마다 `key={currentIndex}`로 QuestionScreen을 새로 마운트하므로, 질문이 바뀔 때마다 플래그가 자동으로 초기화된다.
- handleSelect는 setState의 비동기 특성을 피하기 위해 `nextAnswers = [...answers, key]`를 먼저 만들고, 마지막 질문이면 이 배열로 바로 calculateResult를 호출한다 (answers state를 바로 읽지 않음).
- 화면/질문이 바뀔 때마다 useEffect로 window.scrollTo(0, 0) 실행.
- 시각 디자인(글로우, 카드 스타일 등)은 아직 적용 안 함 — 5단계에서 진행.

## 스타일링 메모 (5단계)
- design/ 폴더에 실제 시안 이미지가 없어서, 5단계 지시문에 적힌 수치(px/퍼센트/색상)만으로 구현함. 나중에 실제 시안 이미지가 생기면 나란히 비교해서 다듬어야 한다.
- 크기 체계: `--u: calc(min(100vw, 430px) / 330)` (global.css). 모든 컴포넌트 CSS는 "시안 px * var(--u)" 형태로 작성되어 있다.
- 시작/질문 화면은 absolute 포지셔닝(제목 42%, 푸터 88% 등 지시문 퍼센트 그대로) 대신, 질문 화면은 **flex 레이아웃**을 썼다 — 보기 문구 길이가 질문마다 달라서 absolute % 위치로는 겹침이 생길 수 있어 flex column + justify-content:center로 바꿔 퍼센트 위치를 "근사"시켰다 (요구사항 5.4의 "가변 길이 대응"을 우선함). 시작 화면은 텍스트 길이가 고정이라 absolute %를 그대로 사용.
- 결과 화면 카드 묶음도 flex column이고, 다시하기 버튼은 `margin-top: auto`로 내용이 짧으면 하단에 붙고(A/D), 내용이 길면(B/C) 카드 바로 아래 최소 간격(16u)만 두고 자연스럽게 이어진다 → 작은 화면에서는 페이지 자체가 세로 스크롤됨.
- body 배열(B의 2문단)은 지시문대로 문단 margin 없이 공백 한 칸으로 join해서 한 덩어리 텍스트로 렌더링함 (ResultScreen.jsx `result.body.join(" ")`).
- 폰트/이미지 프리로드는 `src/utils/preloadAssets.js`에서 처리 (App.jsx 마운트 시 1회 실행). JS에서 `.ttc`/`.ttf`를 import할 때는 `?url` 접미사가 필요했다 (안 붙이면 Vite가 바이너리를 텍스트로 읽으려다 빌드 에러 남 — UTF-8 아니라서 실패).
- 화면 전환 fade-in은 `.screen-bg`에 CSS keyframes로 적용, `prefers-reduced-motion: reduce`면 꺼짐 (global.css).
- 브라우저 자동화 환경에서 `backdrop-filter`가 걸린 화면은 스크린샷 캡처가 간헐적으로 멎는 현상이 있었다 (새 탭에서는 정상 캡처됨 — 실제 렌더링 문제가 아니라 이 환경의 CDP 스크린샷 도구 이슈로 보임). 실제 결과물에는 영향 없음.

## 테스트 메모 (7단계)
- `node scripts/validate-data.mjs`, `node scripts/test-calculate.mjs` 전부 통과 (6/6 동점 케이스 포함).
- 브라우저 실클릭(JS 자동화)으로 전체 플레이 5회 확인: 전부 A→Watching Eyes, 전부 B→Tangled Threads, 전부 C→Falling Void, 전부 D→Silent Bubble, 동점(A,A,A,A,B,B,B,B,C,D)→Tangled Threads(B). 콘솔 에러 없음.
- 질문 화면 레이아웃 버그(질문 길이에 따라 페이지 높이/배경 확대율이 들쭉날쭉하던 문제)를 고정 margin-top 대신 flex 스페이서(`::before`)로 교체해서 해결함 — 10개 질문 전부 페이지 높이가 뷰포트와 정확히 일치하는 것 확인.

## 다국어(EN ↔ KO) 메모 (추가 작업)
- 영어 문구는 기존 `src/data/config.js / questions.js / results.js` 그대로, 한글은 `src/data/ko/`에 같은 구조로 분리. `src/data/content.js`가 `content.en / content.ko`로 묶는다.
- 한글 문구는 Claude가 작성한 초안 → 사용자/디자이너 검수 후 `src/data/ko/` 파일만 고치면 됨.
- App.jsx가 `lang` 상태를 갖고 각 화면에 `text`(해당 언어 config)와 `onToggleLang`을 넘긴다. 선택 언어는 localStorage(`anxiety-quiz-lang`)에 저장되고 다시하기 후에도 유지된다.
- 토글 버튼(`LanguageToggle`)은 시작/결과 화면에서는 우측 상단 모서리, 질문 화면에서는 "01 / 10" 옆에 둔다 (페이지 번호와 겹치지 않게).
- `<html lang>`을 언어에 맞춰 바꾸고, `:lang(ko)`에서 `word-break: keep-all`(어절 단위 줄바꿈) 적용.
- Bodoni/Helvetica에는 한글 글리프가 없어서 한글은 기기 기본 폰트로 표시된다. 디자이너가 한글 폰트를 주면 fonts.css에 추가하면 됨.
- `validate-data.mjs`가 ko 데이터가 영어와 같은 구조인지(질문 id, 보기 key, 결과 필드, config 항목)도 검사한다.

## 주의
- 요구사항에 없는 라이브러리(라우터, UI 프레임워크 등)는 설치하지 않는다.
- vite.config.js의 base는 '/anxiety-quiz/' (GitHub Pages 배포 경로)로 고정되어 있다. 저장소 이름이 바뀌면 함께 수정해야 한다.
- 디자이너가 PNG/폰트를 GitHub 웹 UI로 직접 업로드하는 경우가 있다 (로컬 폴더가 아니라 저장소에 바로 커밋됨). 이 경우 로컬에서는 `git fetch` + `git merge origin/main`으로 받아와야 보인다.
