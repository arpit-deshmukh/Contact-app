import { useState } from "react";
import api from "./api/axios";

export default function ContactForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/contacts", formData);

      if (res.status === 201) {
        setMessage("Contact saved successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });

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
