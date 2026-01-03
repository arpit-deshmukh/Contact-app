import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();


//POST route for add contact
router.post("/",async(req,res)=>{
    try{
        const contact = await Contact.create(req.body);
        res.status(201).json(contact);
    }catch(err){
        res.status(400).json({error: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const contacts = await Contact.find();
        const sortedContacts = contacts.toSorted(
            (a, b) => b.name.localeCompare(a.name)
        );
        res.json(sortedContacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//delete 
router.delete("/:id",async(req,res) =>{
    try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting contact" });
  }

})

export default router;