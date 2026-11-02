import introBackground from "../assets/backgrounds/IntroPage.webp";
import q1Background from "../assets/backgrounds/Q1.webp";
import q2Background from "../assets/backgrounds/Q2.webp";
import q3Background from "../assets/backgrounds/Q3.webp";
import q4Background from "../assets/backgrounds/Q4.webp";
import q5Background from "../assets/backgrounds/Q5.webp";
import q6Background from "../assets/backgrounds/Q6.webp";
import q7Background from "../assets/backgrounds/Q7.webp";
import q8Background from "../assets/backgrounds/Q8.webp";
import q9Background from "../assets/backgrounds/Q9.webp";
import q10Background from "../assets/backgrounds/Q10.webp";
import buttonBackground from "../assets/icons/Button.png";
import resultABackground from "../assets/results/Result1.webp";
import resultBBackground from "../assets/results/Result2.webp";
import resultCBackground from "../assets/results/Result3.webp";
import resultDBackground from "../assets/results/Result4.webp";
import resultAThumb from "../assets/results/Result1Thumb.webp";
import resultBThumb from "../assets/results/Result2Thumb.webp";
import resultCThumb from "../assets/results/Result3Thumb.webp";
import resultDThumb from "../assets/results/Result4Thumb.webp";
import shadowIntro from "../assets/shadows/ShadowIntoScreen.webp";
import shadowQuestion from "../assets/shadows/ShadowQuestion.webp";
import shadowResultHead from "../assets/shadows/ShadowResultHead.webp";
import shadowUpperBar from "../assets/shadows/ShadowUpperBar.webp";

export const introAssets = {
  background: introBackground,
};

export const questionAssets = {
  1: { background: q1Background },
  2: { background: q2Background },
  3: { background: q3Background },
  4: { background: q4Background },
  5: { background: q5Background },
  6: { background: q6Background },
  7: { background: q7Background },
  8: { background: q8Background },
  9: { background: q9Background },
  10: { background: q10Background },
};

// background: 결과 화면 배경, thumbnail: 중간 화면(ProfileScreen) 카드 이미지
export const resultAssets = {
  A: { background: resultABackground, thumbnail: resultAThumb },
  B: { background: resultBBackground, thumbnail: resultBThumb },
  C: { background: resultCBackground, thumbnail: resultCThumb },
  D: { background: resultDBackground, thumbnail: resultDThumb },
};

// 보기/시작/다시하기 버튼 공용 배경 (알약형 버튼 1종)
export const buttonAssets = {
  background: buttonBackground,
};

// 글자 뒤 그림자. 화면 표시는 styles/shadows.css가 담당하고, 여기 목록은 미리 받기 용도다.
export const shadowAssets = [
  shadowIntro,
  shadowQuestion,
  shadowResultHead,
  shadowUpperBar,
];
