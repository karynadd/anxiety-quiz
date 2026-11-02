import { introAssets, resultAssets } from "../data/assets";
import LanguageToggle from "./LanguageToggle";
import "./ProfileScreen.css";

const RESULT_KEYS = ["A", "B", "C", "D"];

// 마지막 질문과 최종 결과 사이의 중간 화면. 결과 4종을 모두 보여주고 나온 결과만 빨갛게 표시한다.
function ProfileScreen({ results, resultKey, onContinue, text, onToggleLang }) {
  const { RESULT_TOP_LABEL, PROFILE_TITLE, PROFILE_SUBTITLE, PROFILE_BUTTON_TEXT } =
    text;

  return (
    <div
      className="screen-bg profile-screen"
      style={{ backgroundImage: `url(${introAssets.background})` }}
    >
      <LanguageToggle
        className="lang-toggle--corner"
        label={text.LANG_TOGGLE_TEXT}
        ariaLabel={text.LANG_TOGGLE_ARIA}
        onToggle={onToggleLang}
      />

      <p className="profile-screen__top-label">{RESULT_TOP_LABEL}</p>
      <h1 className="profile-screen__title">{PROFILE_TITLE}</h1>
      <p className="profile-screen__subtitle">{PROFILE_SUBTITLE}</p>

      <div className="profile-screen__grid">
        {RESULT_KEYS.map((key) => {
          const selected = key === resultKey;
          return (
            <div
              key={key}
              className={`profile-screen__card${selected ? " selected" : ""}`}
              aria-current={selected ? "true" : undefined}
            >
              <img
                className="profile-screen__image"
                src={resultAssets[key].thumbnail}
                alt=""
              />
              <p className="profile-screen__label">{results[key].title}</p>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="profile-screen__button"
        onClick={onContinue}
      >
        {PROFILE_BUTTON_TEXT}
      </button>
    </div>
  );
}

export default ProfileScreen;
