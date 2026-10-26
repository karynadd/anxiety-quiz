# 프로젝트: 불안 유형 인터랙티브 퀴즈 (모바일 전용 웹앱)

## 확정된 요구사항
- 화면: 시작 1개 / 질문 10개 / 결과 4종(결과 페이지 1개가 A~D에 따라 내용이 바뀜)
- 질문 화면: 상단에 제목 + "01 / 10" 페이지 표시, 진행도 바
- 이전 질문 기능 없음 (디자이너 결정)
- 결과 화면: 다시하기 버튼
- 결과 계산: 가장 많이 선택된 알파벳(A~D). 동점이면 동점 알파벳 중 "가장 마지막 질문에서 고른 답"이 결과. 답은 질문 순서대로 저장하는 배열로 관리한다.
- 모바일 전용 (데스크톱에서는 최대 폭만 제한, 프레임 연출 없음)
- 디자이너가 PNG 에셋과 폰트를 줄 예정 (나중에 교체만 하면 됨)
- 제출: GitHub Pages 배포 링크
- 저장소: https://github.com/karynadd/anxiety-quiz.git

## 전체 진행 순서
1. 프로젝트 세팅 (완료)
2. 데이터 파일 작성: 사용자가 질문 10개/선택지/결과 4종 문구를 줄 예정 → src/data에 분리 저장 (2단계 완료)
3. 화면 3종 뼈대 (StartScreen, QuestionScreen, ResultScreen) (3단계 완료)
4. 동작 로직 (화면 전환, 질문 번호, 진행도 바, 답 저장, 결과 계산, 다시하기)
5. 스타일링 (목업 기준 다크 톤, 글로우, 선택지 카드)
6. 에셋/폰트 적용 (PNG는 2x~3x 내보내기 기준, 업스케일 금지)
7. 테스트 (A, B, C, D 4가지 결과와 동점 규칙이 모두 맞는지 확인)
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
  App.jsx          (TEMP: URL 쿼리로 화면 전환 확인용. 4단계에서 실제 로직으로 교체)
  main.jsx
scripts/
  validate-data.mjs (questions/results 데이터 검증 스크립트)
```

## 에셋/폰트 메모
- 폰트 파일명은 디자이너 확정 폰트(제목=Bodoni 72 Smallcaps Book, 본문=Helvetica)와 정확히 일치해서 매칭에 모호함 없었음.
- `Bodoni 72 Smallcaps Book.ttf`는 원래 파일명에 공백이 있어 `bodoni-72-smallcaps-book.ttf`로 사용자 승인 하에 변경함 (git mv로 이력 보존).
- `Helvetica.ttc`는 TrueType Collection 포맷이라 브라우저 @font-face 표준 포맷(ttf/otf/woff/woff2)이 아님. 사용자 승인으로 일단 `format('truetype')`으로 등록해둔 상태. 실제 기기에서 깨지면 디자이너에게 ttf/otf/woff2로 재요청 필요 (fonts.css에 TODO 주석 있음).
- PNG 파일명(IntroPage, Q1~Q10, Button, Result1~4)은 대문자가 섞여 있지만 공백/한글은 없고 ESM import로만 참조하므로 변경하지 않음.
- PNG는 전부 1.5MB를 초과함 (1.56MB~2.35MB). 6단계(에셋/폰트 적용) 전까지는 그대로 두되, 실제 배포 전 최적화 필요 여부를 다시 검토할 것.
- A=Result1.png / B=Result2.png / C=Result3.png / D=Result4.png 매칭은 이미지 내용(눈/얽힌 실/추락하는 협곡/구체)이 각 결과 문구와 일치하는 것을 직접 확인함.

## 주의
- 요구사항에 없는 라이브러리(라우터, UI 프레임워크 등)는 설치하지 않는다.
- 화면 전환/진행도 계산/결과 계산 등 실제 동작 로직은 다음 단계(4단계)에서 진행한다.
- vite.config.js의 base는 '/anxiety-quiz/' (GitHub Pages 배포 경로)로 고정되어 있다. 저장소 이름이 바뀌면 함께 수정해야 한다.
- 디자이너가 PNG/폰트를 GitHub 웹 UI로 직접 업로드하는 경우가 있다 (로컬 폴더가 아니라 저장소에 바로 커밋됨). 이 경우 로컬에서는 `git fetch` + `git merge origin/main`으로 받아와야 보인다.
