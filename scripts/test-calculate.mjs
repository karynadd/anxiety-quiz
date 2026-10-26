import assert from "node:assert/strict";
import { calculateResult } from "../src/utils/calculateResult.js";

const cases = [
  {
    name: "단독 1등 (A가 유일한 최다)",
    answers: ["A", "A", "A", "B", "B", "C", "D", "A", "B", "C"],
    expected: "A",
  },
  {
    name: "2개 동점(A=4,B=4,C=1,D=1), 마지막 답이 앞 알파벳(A)",
    answers: ["B", "A", "B", "A", "C", "D", "B", "A", "B", "A"],
    expected: "A",
  },
  {
    name: "2개 동점(A=4,B=4,C=1,D=1), 마지막 답이 뒤 알파벳(B)",
    answers: ["A", "B", "A", "B", "C", "D", "A", "B", "A", "B"],
    expected: "B",
  },
  {
    name: "2+2 동점(A=3,B=3,C=2,D=2), 마지막 답(C)은 후보 아님 → A/B 중 마지막 선택(B)",
    answers: ["A", "A", "A", "B", "B", "B", "D", "D", "C", "C"],
    expected: "B",
  },
  {
    name: "3개 동점(A=3,B=3,C=3,D=1), 마지막 답(D)은 후보 아님 → A/B/C 중 마지막 선택(C)",
    answers: ["A", "A", "A", "B", "B", "B", "C", "C", "C", "D"],
    expected: "C",
  },
  {
    name: "10문제 모두 같은 답(D)",
    answers: ["D", "D", "D", "D", "D", "D", "D", "D", "D", "D"],
    expected: "D",
  },
];

let passed = 0;

for (const { name, answers, expected } of cases) {
  const actual = calculateResult(answers);
  assert.strictEqual(
    actual,
    expected,
    `[FAIL] ${name}\n  answers: ${JSON.stringify(answers)}\n  expected: ${expected}, actual: ${actual}`
  );
  console.log(`[PASS] ${name} → ${actual}`);
  passed += 1;
}

const outputsCovered = new Set(cases.map((c) => c.expected));
assert.deepStrictEqual(
  new Set(["A", "B", "C", "D"]),
  outputsCovered,
  `결과 A~D가 테스트 케이스에서 모두 한 번씩 나오지 않음 (covered: ${[...outputsCovered].join(", ")})`
);

console.log(`\n${passed}/${cases.length} 케이스 통과. 결과 A~D 전부 최소 1회 커버됨.`);
