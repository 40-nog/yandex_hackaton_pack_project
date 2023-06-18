import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__container_burger-logo">
        <button
          className="button header__burger"
          type="button"
          aria-label="button"
        />
        <div className="header__logo" />
      </div>
      <p className="header__text">Упаковка</p>
      <div className="header__container_profile-button">
        <div className="header__profile" />
        <button
          className=" button header__button"
          type="button"
          aria-label="button"
        />
      </div>
    </header>
  );
}

export default Header;
