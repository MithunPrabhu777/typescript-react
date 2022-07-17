import React, { useState, Fragment, useEffect, FormEventHandler } from "react";
import logo from './logo.svg';
import axios from "axios";
import './App.css';
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import { isNullishCoalesce } from "typescript";

interface FormData {
    name: string,
    email: string,
    phone: string,
    salary: string,
    doj: string,
}


interface FormValuesWithId  {
  _id:string,
  name: string,
  email: string,
  phone: string,
  salary: string,
  doj: string,
}

interface FormDataArrayService extends Array<FormData>{}

const  App:React.FC = () => {

  const [editContactId, setEditContactId] = useState(null);
  const [employeeData,setEmplooyeData] = useState([]);
  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    phone: "",
    salary: "",
    doj: "",
  });

  const [editFormData, setEditFormData] = useState({
    _id:"",
    name: "",
    email: "",
    phone: "",
    salary: "",
    doj: "",
  });

  const [editEmployeeId, setEditEmployeeId] = useState(null);

  useEffect(() => {
    ListEmployees();
  },[]);

  async function  ListEmployees(){
    const data = await axios.get("http://localhost:3000/employee");
    
    setEmplooyeData(data.data.employee);
  }

  const handleAddFormChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    
    const fieldName = (event.target as HTMLInputElement).getAttribute("name");
    const fieldValue = (event.target as HTMLInputElement).value;

    const newFormData:any = { ...addFormData };
    newFormData[fieldName]  = fieldValue;

    setAddFormData(newFormData);

  };

  const  handleEditFormChange = (event:any) => {
    event.preventDefault();

    const fieldName = (event.target as HTMLInputElement).getAttribute("name");;
    const fieldValue = (event.target as HTMLInputElement).value;
console.log("edit entering");

    const newFormData:any = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    
    const newEmployee = {
      name: addFormData.name,
      email: addFormData.email,
      phone: addFormData.phone,
      salary: addFormData.salary,
      doj: addFormData.doj,
    };

    axios.post("http://localhost:3000/employee",newEmployee).then((res) => {
        if(res.status === 201){
          const newEmployees: string[] = [...employeeData, newEmployee];
          setEmplooyeData(newEmployees);
          window. location.reload();
        }
    }).catch((er) => {
        return er;
    });
  };

  const handleEditFormSubmit = (event:React.FormEventHandler<HTMLInputElement>) => {
    // event.preventDefault();

    const editedContact = {
      id: editContactId,
      name: editFormData.name,
      phone: editFormData.phone,
      email:editFormData.email,
      salary: editFormData.salary,
      doj: editFormData.doj,
    };

    const newContacts = [...employeeData];

    const index = employeeData.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setEmplooyeData(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event:any,contact:any) => {
    event.preventDefault();
    setEditContactId(contact._id);

    const formValues = {
      _id : contact._id,
       name: contact.name,
       email:contact.email,
      phone: contact.phone,
      salary: contact.salary,
      doj: contact.doj,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = ()  => {
    console.log("loggingCancel");
    
    setEditContactId(null);
  };

  const handleDeleteClick = (event: string) => {
    // console.log(id);
    console.log(event);
    
    
    const newContacts = [...employeeData];
    axios.delete(`http://localhost:3000/employee/${event}`);
    const index = employeeData.findIndex((contact) => contact._id === event);

    newContacts.splice(index, 1);

    setEmplooyeData(newContacts);
  };
  

  return (
    <div className="app-container" style={{backgroundColor:"#34568b",minHeight:"94.5vh"}}>
       <h1 style={{color:"white"}}><img src="https://www.freecodecamp.org/news/content/images/2022/06/crud.png" style={{"height":"45px",borderRadius:"6px"}}/></h1>
      <form onSubmit={() => handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th className="color-tr">Name</th>
              <th className="color-tr">Email</th>
              <th className="color-tr">Phone Number</th>
              <th className="color-tr">Salary</th>
              <th className="color-tr">DOJ</th>
              <th className="color-tr">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((contact) => (
              
              <Fragment>
                {editContactId === contact._id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={() => handleEditFormChange}
                    handleCancelClick={() => handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <hr style={{width:"75rem"}}/>
      <h2 className="color-tr">Add an Employee</h2>
      <form onSubmit={handleAddFormSubmit} className="formi">
        <input
          type="text"
          name="name"
          // required="required"
          placeholder="Enter name..."
          onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleAddFormChange(event)}
         className="outline"
        />
        <input
          type="email"
          name="email"
          // required="required"
          placeholder="Enter email..."
          onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleAddFormChange(event)}
          className="outline"
        />
        <input
          type="text"
          name="phone"
          // required="required"
          placeholder="Enter phone number..."
          onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleAddFormChange(event)}
          className="outline"
        />
        <input
          type="salary"
          name="salary"
          // required="required"
          placeholder="Enter salary..."
          onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleAddFormChange(event)}
          className="outline"
        />
         <input
          type="doj"
          name="doj"
          // required="required"
          placeholder="Enter date of joining..."
          onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleAddFormChange(event)}
          className="outline"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
