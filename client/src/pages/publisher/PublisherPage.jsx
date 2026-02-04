const PublisherPage = () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
      <h1>Publisher Dashboard</h1>
      <button style={{ width: "300px" }}>Add New Ad</button>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px", border: "1px solid #ddd" }}>
        <thead >
          <tr style={{ margin: "10px",padding: "10px", borderBottom: "1px solid #ddd" }}>
            <th>Ad Title</th>
            <th>Status</th>
            <th>Clicks</th>
            </tr>
        </thead>
        <tbody>
          {/* // ad data rows */}
          </tbody>
      </table>
    </div>
  )
};

export default PublisherPage;