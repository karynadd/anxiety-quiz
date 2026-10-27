import "./LanguageToggle.css";

// label은 "바꿀 언어"를 표시한다 (영어 화면에서는 KO, 한글 화면에서는 EN).
function LanguageToggle({ label, ariaLabel, onToggle, className = "" }) {
  return (
    <button
      type="button"
      className={`lang-toggle ${className}`.trim()}
      aria-label={ariaLabel}
      onClick={onToggle}
    >
      {label}
    </button>
  );
}

export default LanguageToggle;
