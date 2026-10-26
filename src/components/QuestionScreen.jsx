import { APP_TITLE, QUESTION_FOOTER_TEXT } from "../data/config";
import { questionAssets } from "../data/assets";
import "./QuestionScreen.css";

function pad2(n) {
  return String(n).padStart(2, "0");
}

function QuestionScreen({ question, currentIndex, total, onSelect }) {
  const progressPercent = (currentIndex / total) * 100;
  const background = questionAssets[question.id]?.background;

  return (
    <div
      className="screen-bg question-screen"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="question-screen__top">
        <span className="question-screen__app-title">{APP_TITLE}</span>
        <span className="question-screen__page">
          {pad2(currentIndex)} / {pad2(total)}
        </span>
      </div>

      <div className="question-screen__progress-track">
        <div
          className="question-screen__progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="question-screen__body">
        <p className="question-screen__text">{question.text}</p>

        <div className="question-screen__options">
          {question.options.map((option) => (
            <button
              key={option.key}
              type="button"
              className="question-screen__option"
              onClick={() => onSelect(option.key)}
            >
              <span className="question-screen__option-key">
                {option.key}
              </span>
              <span className="question-screen__option-text">
                {option.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="question-screen__footer">{QUESTION_FOOTER_TEXT}</p>
    </div>
  );
}

export default QuestionScreen;
