import { useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import "./App.css"
export default function App() {
  const [reload, setReload] = useState(false);

  // called after contact is saved
  const handleSuccess = () => {
    setReload(prev => !prev); // toggle reload to refetch list
  };
  const handleDeleteSuccess = () => setReload(prev => !prev);
 

  return (
    <div style={{ padding: "20px" }}>
      <h1>Contact Management</h1>
      <ContactForm onSuccess={handleSuccess} />
      <hr />
      <ContactList reload={reload} 
      onDeleteSuccess={handleDeleteSuccess}/>
    </div>
  );
}
