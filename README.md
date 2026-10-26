# Anxiety, Louder Inside

불안 유형을 알아보는 모바일 전용 인터랙티브 퀴즈입니다. 시작 화면 → 질문 10개 → 결과 4종(A~D) 순서로 진행됩니다.

**플레이하기:** https://karynadd.github.io/anxiety-quiz/

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173/anxiety-quiz/` 로 접속합니다.

## 빌드

```bash
npm run build
```

`dist/` 폴더에 정적 파일이 생성됩니다.

## 기술 스택

- React + Vite
- 별도 상태관리/라우팅 라이브러리 없이 `useState` 기반 화면 전환

## 결과 계산 규칙

질문마다 A~D 중 하나를 선택하며, 가장 많이 선택된 알파벳이 결과가 됩니다. 동점일 경우 동점 알파벳 중 가장 마지막 질문에서 고른 답이 결과가 됩니다.

## 배포

`main` 브랜치에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 자동으로 빌드 후 GitHub Pages에 배포합니다.
