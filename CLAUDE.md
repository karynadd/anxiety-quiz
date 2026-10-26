# 프로젝트: 불안 유형 인터랙티브 퀴즈 (모바일 전용 웹앱)

## 확정된 요구사항
- 화면: 시작 1개 / 질문 10개 / 결과 4종(결과 페이지 1개가 A~D에 따라 내용이 바뀜)
- 질문 화면: 상단에 제목 + "01 / 10" 페이지 표시, 진행도 바, 이전 질문 버튼 (1번 질문의 이전 버튼은 시작 화면으로)
- 결과 화면: 다시하기 버튼
- 결과 계산: 가장 많이 선택된 알파벳(A~D). 동점이면 동점 알파벳 중 "가장 마지막 질문에서 고른 답"이 결과. 답은 질문 순서대로 저장하는 배열로 관리하고, 이전으로 돌아가 답을 바꾸면 해당 칸만 덮어쓴다.
- 모바일 전용 (데스크톱에서는 최대 폭만 제한, 프레임 연출 없음)
- 디자이너가 PNG 에셋과 폰트를 줄 예정 (나중에 교체만 하면 됨)
- 제출: GitHub Pages 배포 링크
- 저장소: https://github.com/karynadd/anxiety-quiz.git

## 전체 진행 순서
1. 프로젝트 세팅 (완료)
2. 데이터 파일 작성: 사용자가 질문 10개/선택지/결과 4종 문구를 줄 예정 → src/data에 분리 저장 (2단계 완료)
3. 화면 3종 뼈대 (StartScreen, QuestionScreen, ResultScreen)
4. 동작 로직 (화면 전환, 질문 번호, 진행도 바, 답 저장, 이전 질문, 결과 계산, 다시하기)
5. 스타일링 (목업 기준 다크 톤, 글로우, 선택지 카드)
6. 에셋/폰트 적용 (PNG는 2x~3x 내보내기 기준, 업스케일 금지)
7. 테스트 (A, B, C, D 4가지 결과와 동점 규칙이 모두 맞는지, 이전 질문 후 답 변경 동작 확인)
8. GitHub 제출: README 작성, git remote 연결과 push, Settings → Pages 설정 안내
   - 사용자는 GitHub 사용이 처음이다. 8단계에서는 명령어와 클릭 위치를 하나씩 쉽게 안내할 것.

## 폴더 구조
```
src/
  assets/
    backgrounds/   (시작, 질문, 결과 배경 PNG)
    icons/         (버튼, 아이콘 PNG)
    results/       (결과 4종 이미지 PNG)
    fonts/         (디자이너 제공 폰트)
  components/      (StartScreen, QuestionScreen, ResultScreen 자리 - 아직 미구현)
  data/
    questions.js   (질문 10개 + 보기, 2단계에서 작성 완료)
    results.js     (결과 A~D 문구, 2단계에서 작성 완료)
    config.js      (앱 제목/버튼 문구 등, 2단계에서 작성 완료)
  styles/
    fonts.css      (@font-face 등록 자리. 폰트 파일이 오면 채움)
    global.css     (모바일 전용 기본 스타일, --font-title / --font-body 변수)
  App.jsx
  main.jsx
```

## 주의
- 요구사항에 없는 라이브러리(라우터, UI 프레임워크 등)는 설치하지 않는다.
- 화면 컴포넌트의 실제 구현은 다음 단계(3단계)에서 진행한다.
- vite.config.js의 base는 '/anxiety-quiz/' (GitHub Pages 배포 경로)로 고정되어 있다. 저장소 이름이 바뀌면 함께 수정해야 한다.
