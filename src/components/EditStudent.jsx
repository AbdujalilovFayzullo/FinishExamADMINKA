import { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const EditStudent = ({
  openEdit,
  setOpenEdit,
  selectedStudent,
  fetchStudents,
}) => {
  const [editedStudent, setEditedStudent] = useState({
    name: selectedStudent.name,
    description: selectedStudent.description,
    price: selectedStudent.price,
  });

  const handleClose = () => {
    setOpenEdit(false);
  };

  const handleChange = (e) => {
    const { name, price, description, value } = e.target;
    setEditedStudent({
      ...editedStudent,
      [name]: value,
      [price]: value,
      [description]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `https://65c17151dc74300bce8da4c7.mockapi.io/products/${selectedStudent.id}`,
        editedStudent
      );
      fetchStudents();
      setOpenEdit(false);
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  return (
    <Dialog open={openEdit} onClose={handleClose}>
      <DialogTitle>Edit Student</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          name="name"
          value={editedStudent.name}
          onChange={handleChange}
        />
       
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          name="description"
          value={editedStudent.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="price"
          type="number"
          fullWidth
          name="price"
          value={editedStudent.price}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStudent;