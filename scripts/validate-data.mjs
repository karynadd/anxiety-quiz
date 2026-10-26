import { questions } from "../src/data/questions.js";
import { results } from "../src/data/results.js";

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

if (errors.length > 0) {
  console.error("데이터 검증 실패:");
  errors.forEach((e) => console.error(` - ${e}`));
  process.exit(1);
}

console.log("데이터 검증 통과: questions 10개, results A/B/C/D 모두 정상");
