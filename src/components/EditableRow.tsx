import React from 'react';
import axios from "axios";


interface FormValuesWithId {
    editFormData : {    
        _id:string,
        name: string,
        email: string,
        phone: string,
        salary: string,
        doj: string,
    },
    handleEditFormChange :(event:any) => void;
       
    handleCancelClick : () => void;
}

const EditableRow:React.FC<FormValuesWithId> = props => {
  
    const handleUpdate = () => {
       axios.put(`http://localhost:3000/employee/${props.editFormData._id}`,props.editFormData).then(() => {
        window.location.reload()
       })
    }
  
  
    return (
      <tr>
        <td>
          <input
            type="text"
            // required="required"
            placeholder="Enter a name..."
            name="name"
            value={props.editFormData.name}
            onChange={() => props.handleEditFormChange}
          ></input>
        </td>
        <td>
          <input
            type="email"
            // required="required"
            placeholder="Enter email..."
            name="email"
            value={props.editFormData.email}
            onChange={()=>props.handleEditFormChange}
          ></input>
        </td>
        <td>
          <input
            type="text"
            // required="required"
            placeholder="Enter a phone number..."
            name="phone"
            value={props.editFormData.phone}
            onChange={() => props.handleEditFormChange}
          ></input>
        </td>
        <td>
          <input
            type="text"
            // required="required"
            placeholder="Enter salary..."
            name="salary"
            value={props.editFormData.salary}
            onChange={() => props.handleEditFormChange}
          ></input>
        </td>
        <td>
          <input
            type="text"
            // required="required"
            placeholder="Enter date of joining..."
            name="doj"
            value={props.editFormData.doj}
            onChange={() => props.handleEditFormChange}
          ></input>
        </td>
        
        <td>
          <button type="submit" onClick={() => handleUpdate}>Save</button>
          <button type="button" onClick={() => props.handleCancelClick}>
            Cancel
          </button>
        </td>
      </tr>
    );
  };

export default EditableRow