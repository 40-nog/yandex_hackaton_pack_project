function ProblempageOptionButton({ handleButtonClick, name }) {
  return (
    <button
      className="problempage__button"
      type="button"
      aria-label="button"
      onClick={handleButtonClick}
    >
      {name}
    </button>
  );
}

export default ProblempageOptionButton;
