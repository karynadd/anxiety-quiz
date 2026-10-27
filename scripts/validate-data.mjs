import { questions } from "../src/data/questions.js";
import { results } from "../src/data/results.js";
import * as configEn from "../src/data/config.js";
import { questions as questionsKo } from "../src/data/ko/questions.js";
import { results as resultsKo } from "../src/data/ko/results.js";
import * as configKo from "../src/data/ko/config.js";

const errors = [];

if (questions.length !== 10) {
  errors.push(`questions 길이가 10이 아님 (현재 ${questions.length})`);
}

const expectedKeys = ["A", "B", "C", "D"];

questions.forEach((q) => {
  const keys = (q.options || []).map((o) => o.key);
  const sameKeys =
    keys.length === expectedKeys.length &&
    expectedKeys.every((k) => keys.includes(k));
  if (!sameKeys) {
    errors.push(
      `질문 id=${q.id}의 보기가 A, B, C, D 4개가 아님 (현재: ${keys.join(", ")})`
    );
  }
});

const requiredResultFields = [
  "key",
  "title",
  "headline1",
  "body",
  "headline2",
  "closing",
];

expectedKeys.forEach((key) => {
  const result = results[key];
  if (!result) {
    errors.push(`results에 ${key}가 없음`);
    return;
  }
  requiredResultFields.forEach((field) => {
    const value = result[field];
    const isEmpty =
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "") ||
      (Array.isArray(value) &&
        (value.length === 0 || value.some((v) => String(v).trim() === "")));
    if (isEmpty) {
      errors.push(`results.${key}.${field}가 비어 있음`);
    }
  });
});

// 한글 데이터는 영어와 구조(질문 id, 보기 key, 결과 필드, 설정 항목)가 같아야 한다.
const isBlank = (v) => typeof v !== "string" || v.trim() === "";

Object.keys(configEn).forEach((name) => {
  if (!(name in configKo)) {
    errors.push(`ko/config.js에 ${name}가 없음`);
  } else if (Array.isArray(configEn[name])) {
    if (
      !Array.isArray(configKo[name]) ||
      configKo[name].length !== configEn[name].length ||
      configKo[name].some(isBlank)
    ) {
      errors.push(`ko/config.js의 ${name} 줄 수가 영어와 다르거나 비어 있음`);
    }
  } else if (isBlank(configKo[name])) {
    errors.push(`ko/config.js의 ${name}가 비어 있음`);
  }
});

if (questionsKo.length !== questions.length) {
  errors.push(`ko 질문 개수가 영어와 다름 (${questionsKo.length})`);
}
questions.forEach((q, i) => {
  const ko = questionsKo[i];
  if (!ko || ko.id !== q.id) {
    errors.push(`ko 질문 ${i + 1}번의 id가 영어(${q.id})와 다름`);
    return;
  }
  if (isBlank(ko.text)) errors.push(`ko 질문 id=${q.id}의 문장이 비어 있음`);
  const enKeys = q.options.map((o) => o.key).join(",");
  const koKeys = (ko.options || []).map((o) => o.key).join(",");
  if (enKeys !== koKeys) {
    errors.push(`ko 질문 id=${q.id}의 보기 순서/키가 영어와 다름 (${koKeys})`);
  }
  (ko.options || []).forEach((o) => {
    if (isBlank(o.text)) errors.push(`ko 질문 id=${q.id} 보기 ${o.key}가 비어 있음`);
  });
});

expectedKeys.forEach((key) => {
  const en = results[key];
  const ko = resultsKo[key];
  if (!ko) {
    errors.push(`ko results에 ${key}가 없음`);
    return;
  }
  requiredResultFields.forEach((field) => {
    const value = ko[field];
    const blank = Array.isArray(value)
      ? value.length === 0 || value.some(isBlank)
      : isBlank(value);
    if (blank) errors.push(`ko results.${key}.${field}가 비어 있음`);
  });
  if (en && ko.key !== en.key) errors.push(`ko results.${key}.key가 다름`);
});

if (errors.length > 0) {
  console.error("데이터 검증 실패:");
  errors.forEach((e) => console.error(` - ${e}`));
  process.exit(1);
}

console.log("데이터 검증 통과: questions 10개, results A/B/C/D, 한글(ko) 데이터 모두 정상");
