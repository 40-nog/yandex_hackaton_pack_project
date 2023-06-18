import "./Progressbar.css";

function Progressbar({ count, amount }) {
  const progressPercentage = Math.round((count / amount) * 100);

  return (
    <div>
      <div className="progress-bar">
        <div
          className="progress-bar-inner"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}

export default Progressbar;
