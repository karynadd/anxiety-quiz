import bodoniFontUrl from "../assets/fonts/bodoni-72-smallcaps-book.ttf?url";
import helveticaFontUrl from "../assets/fonts/Helvetica.ttc?url";
import nanumRegularFontUrl from "../assets/fonts/NanumMyeongjo-Regular.woff2?url";
import nanumBoldFontUrl from "../assets/fonts/NanumMyeongjo-Bold.woff2?url";
import { questionAssets, resultAssets, shadowAssets } from "../data/assets";

function preloadFont(url, mimeType) {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "font";
  link.type = mimeType;
  link.href = url;
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);
}

export function preloadFonts() {
  preloadFont(bodoniFontUrl, "font/ttf");
  preloadFont(helveticaFontUrl, "font/ttf");
}

let koreanFontsPreloaded = false;

// 영어 사용자는 받을 필요가 없으므로 한글을 선택했을 때 한 번만 받는다.
export function preloadKoreanFonts() {
  if (koreanFontsPreloaded) return;
  koreanFontsPreloaded = true;
  preloadFont(nanumRegularFontUrl, "font/woff2");
  preloadFont(nanumBoldFontUrl, "font/woff2");
}

// 질문 배경 10장 + 결과 배경 4장 + 결과 카드 4장 + 그림자 4장을 미리 로드한다 (시작 화면 배경은 첫 화면에서 바로 요청되므로 제외).
export function preloadImages() {
  const urls = [
    ...Object.values(questionAssets).map((asset) => asset.background),
    ...Object.values(resultAssets).map((asset) => asset.background),
    ...Object.values(resultAssets).map((asset) => asset.thumbnail),
    ...shadowAssets,
  ];

  for (const url of urls) {
    const img = new Image();
    img.src = url;
  }
}
