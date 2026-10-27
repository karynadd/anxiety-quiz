import * as configEn from "./config.js";
import { questions as questionsEn } from "./questions.js";
import { results as resultsEn } from "./results.js";
import * as configKo from "./ko/config.js";
import { questions as questionsKo } from "./ko/questions.js";
import { results as resultsKo } from "./ko/results.js";

// 언어별 문구 묶음. 질문 id / 보기 key / 결과 key는 두 언어가 동일해야 한다
// (scripts/validate-data.mjs에서 검증).
export const content = {
  en: { config: configEn, questions: questionsEn, results: resultsEn },
  ko: { config: configKo, questions: questionsKo, results: resultsKo },
};

export const DEFAULT_LANG = "en";
