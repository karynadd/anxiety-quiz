const ALPHABET = ["A", "B", "C", "D"];

export function calculateResult(answers) {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  for (const answer of answers) {
    counts[answer] += 1;
  }

  const maxCount = Math.max(...ALPHABET.map((key) => counts[key]));
  const topKeys = ALPHABET.filter((key) => counts[key] === maxCount);

  if (topKeys.length === 1) {
    return topKeys[0];
  }

  for (let i = answers.length - 1; i >= 0; i -= 1) {
    if (topKeys.includes(answers[i])) {
      return answers[i];
    }
  }

  return topKeys[0];
}
