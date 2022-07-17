import React from 'react'



interface FormValuesWithId {
    contact : {    
        _id:string,
        name: string,
        email: string,
        phone: string,
        salary: string,
        doj: string,
    };
    handleEditClick : (event:any,contact : any) => void;
    handleDeleteClick: (event: string) => void;
}

const ReadOnlyRow:React.FC<FormValuesWithId> = props => {
    console.log(props);
    
    return (
      <tr>
        <td>{props.contact.name}</td>
        <td>{props.contact.email}</td>
        <td>{props.contact.phone}</td>
        <td>{props.contact.salary}</td>
        <td>{props.contact.doj}</td>
        <td>
          <button
            type="button"
            style={{backgroundColor:"black",color:"white",cursor:"pointer"}}
            onClick={(event) => props.handleEditClick(event,props.contact)}
          >
            Edit
          </button>
          <button type="button"  style={{backgroundColor:"black",color:"white",cursor:"pointer"}} onClick={()=>props.handleDeleteClick(props.contact._id)}>
            Delete
          </button>
        </td>
      </tr>
    );
  };

export default ReadOnlyRow;