import { useNavigate } from "react-router-dom";
import { createAd } from "../../services/ad.service";
import { useState } from "react";

const CreateAd = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createAd(formData);
      console.log("Ad created successfully");
      navigate("/publisher/my-ads"); // adjust if your route is different
    } catch (error) {
      console.error("Error creating ad:", error);
    }
  };
  return (
    <div>
      <h2>Create Ad</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Create Ad</button>
      </form>
    </div>
  );
};

export default CreateAd;
