import bodoniFontUrl from "../assets/fonts/bodoni-72-smallcaps-book.ttf?url";
import helveticaFontUrl from "../assets/fonts/Helvetica.ttc?url";
import { questionAssets, resultAssets } from "../data/assets";

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

// 질문 배경 10장 + 결과 배경 4장을 미리 로드한다 (시작 화면 배경은 첫 화면에서 바로 요청되므로 제외).
export function preloadImages() {
  const urls = [
    ...Object.values(questionAssets).map((asset) => asset.background),
    ...Object.values(resultAssets).map((asset) => asset.background),
  ];

  for (const url of urls) {
    const img = new Image();
    img.src = url;
  }
}
