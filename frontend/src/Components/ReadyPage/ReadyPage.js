import "./ReadyPage.css";
import UniButton from "../UniButton/UniButton";

function ReadyPage({ clearState }) {
  return (
    <main className="readypage">
      <div className="main__left-column" />
      <p className="readypage__text">
        Упакуйте товары и поставьте коробку на конвейер
      </p>
      <div className="main__right-column">
        <UniButton
          currentPage="readypage"
          name="Готово"
          clearState={clearState}
        />
      </div>
    </main>
  );
}

export default ReadyPage;
