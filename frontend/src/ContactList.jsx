import { useEffect, useState } from "react";
import axios from "axios";

export default function ContactList({ reload , onDeleteSuccess}) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get("https://contact-app-backend-xq5f.onrender.com/api/contacts")
      .then(res => {
        const sorted = res.data.sort((a, b) => b._id.localeCompare(a._id));
        setContacts(sorted);
      })
      .catch(err => console.error(err));
  }, [reload]); // reload triggers refetch

  const handleDelete = async (id) => {

    try{
      await axios.delete(`https://contact-app-backend-xq5f.onrender.com/api/contacts/${id}`);
      alert("Contact Deleted Successfully");
      onDeleteSuccess();
    }catch (err) {
        console.error("Error deleting contact:", err);
        alert("Failed to delete contact");
  }
}

  return (
    <table border={2}>
      <thead>
        <tr>
          <th>Sr No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((c, index) => (
          <tr key={c._id}>
            <td>{index + 1}</td>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.phone}</td>
            <td>{c.message}</td>
            <td><button onClick={()=>handleDelete(c._id)}>Delete
              </button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );

};