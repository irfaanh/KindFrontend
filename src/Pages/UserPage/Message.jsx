import { useFormik } from "formik";
import "./Message.css";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { api } from "../../axios";
import { Link, useNavigate } from "react-router";

const Message = () => {
    const { id } = useSelector(store => store.user)
    const navigate = useNavigate()
    const message = useFormik({
      initialValues: {
        userid:id,
        full_name:"",
        email:"",
        message:"",
        from:"user"
      },
      onSubmit: async (values) => {
        const trimValues = {
          ...values,
        full_name: values.full_name.trim(),
        email: values.email.trim(),
        message: values.message.trim()
        };
        
        try{
          await api.post("/user/message",trimValues)
          
          return toast.success("Message Sended")
         
        }catch(err){
          console.log(err);
          if(!id){
            return toast.error("You Are Not LoggegIn")
          }
          return toast.error("Enter All Details");
        }
      }
    })

    return (
      <section id="contact" style={{ backgroundColor: "#1995AD" }}>
        <div className="container py-3">
          <div className="row py-5">
            <div className="col text-lg-center d-flex flex-column align-items-center">
              <h2 className="message_h2">Have any questions? Let us know.</h2>
              <p className="message_p">
                We would love to hear from you! Contact us and<br /> share any feedback or questions you may have.
              </p>
              <form onSubmit={message.handleSubmit} className="d-flex flex-column gap-2 w-75 ">

                <input onChange={message.handleChange}
                value={message.values.full_name}
                name="full_name"
                className="message_input" type="text" placeholder="Full Name" />

                <input onChange={message.handleChange}
                value={message.values.email}
                name="email"
                className="message_input" type="email" placeholder="Email" />

                <textarea onChange={message.handleChange}
                value={message.values.message}
                name="message"
                className="message_textarea"
                  rows="4"
                  cols="5"
                  placeholder="Your Message"
                ></textarea>
                {id ? <button className="message_button">Submit</button> :
                <Link to={'/login'} >
                <button className="message_button w-100">Submit</button>
                </Link>
                }
                
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Message ;