import axios from "axios";
import { useState } from "react";

export default function ContactForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [message, setMessage] = useState(""); // temporary success/error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://contact-app-backend-xq5f.onrender.com/api/contacts",
        formData
      );

      if (res.status === 201) {
        // show message on page instead of alert
        setMessage("Contact saved successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });

        // reload the list
        onSuccess();
      }
    } catch (err) {
      console.error("Error saving contact:", err);
      setMessage("Error saving contact");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
}
