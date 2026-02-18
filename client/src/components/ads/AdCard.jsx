const AdCard = ({ title, description, impressions, clicks, onView }) => {
  return (
    <div
      style={{
        border: "1px solid #cc4",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "8px",
      }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <div style={{ marginTop: "10px" }}>
        <span>👁️{impressions}</span>
        <span style={{ marginLeft: "15px" }}>👆{clicks}</span>
      </div>

      <button onClick={onView} style={{ marginTop: "10px" }}>
        View
      </button>
    </div>
  );
};

export default AdCard;
