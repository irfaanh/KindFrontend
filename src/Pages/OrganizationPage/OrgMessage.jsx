import { useFormik } from "formik";
import "./OrgMessage.css";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { api } from "../../axios";
import { Link, useNavigate } from "react-router";

const OrgMessage = () => {
    const { id } = useSelector(store => store.user)
    const navigate = useNavigate()
    const message = useFormik({
      initialValues: {
        userid:id,
        full_name:"",
        email:"",
        message:"",
        from:"organization"
      },
      onSubmit: async (values) => {
        const trimedValue = {
          ...values,
          full_name: values.full_name.trim(),
          email:values.email.trim(),
          message: values.message.trim()
        }
        try{
          await api.post("/user/message",trimedValue)
          return toast.success("Message Sended")
        }catch(err){
          console.log(err)
          if(!id){
            return toast.error("Please LogIn")
          }
          return toast.error("Complete Details");

        }
      }
    })

    return (
      <section id="contact" style={{ backgroundColor: "white" }}>
        <div className="container py-3">
          <div className="row py-5">
            <div className="col text-lg-center d-flex flex-column align-items-center">
              <h2 className="message_h2" style={{color:'black'}} >
                Have any questions? Let us know.</h2>
              <p className="message_p" style={{color:'black'}}>
                We would love to hear from you! Contact us and<br />
                 share any feedback or questions you may have.
              </p>
              <form onSubmit={message.handleSubmit} className="d-flex flex-column  gap-2 w-75 ">

                <input onChange={message.handleChange}
                value={message.values.full_name}
                name="full_name"
                className="message_input" 
                style={{border:'1px solid #1995AD'}} type="text" placeholder="Full Name" />

                <input onChange={message.handleChange}
                style={{border:'1px solid #1995AD'}}
                value={message.values.email}
                name="email"
                className="message_input" type="email" placeholder="Email" />

                <textarea onChange={message.handleChange}
                style={{border:'1px solid #1995AD'}}
                value={message.values.message}
                name="message"
                className="message_textarea"
                  rows="4"
                  cols="5"
                  placeholder="Your Message"
                ></textarea>
                {id ? 
                <button className="message_button">Submit</button> :
                <Link to={'/organization/organizationlogin'} >
                <button className="message_button_noid w-100">Submit</button>
                </Link>
                }              
                </form>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default OrgMessage ;