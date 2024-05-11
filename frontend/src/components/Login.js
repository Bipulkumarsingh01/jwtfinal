import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import axios from 'axios';
const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    /*const authenticateUser = async () => {
      console.log("ppppppppp");
        try {
          const response = await axios.get('http://localhost:5002/login', { params: loginState });

          console.log(response.data); // Response from the server
          // Handle successful login here (e.g., update UI, set tokens, etc.)
        } catch (error) {
          console.error('Error logging in:', error);
          // Handle login error here (e.g., display error message)
        }
      };*/
      const authenticateUser = async () => {
        try {
          console.log("vvvvv");
          const response = await axios.get('http://localhost:3000/', {
            params: {
              email: loginState.email,  // Use 'email' instead of 'username'
              password: loginState.password,
            },
          });
      
          if (response.status === 200) {
            // User is authenticated successfully
            // Do something here, such as updating the UI or setting tokens
            console.log("bipul");
          } else {
            // User is not authenticated
            // Do something here, such as displaying an error message
            console.log("bipul chor");
          }
        } catch (error) {
          console.log("bipul chorrrrr");
        }
      };
      

      

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
    )
}