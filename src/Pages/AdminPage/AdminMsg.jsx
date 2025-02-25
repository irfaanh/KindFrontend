import  { useEffect, useState } from 'react'
import { api } from '../../axios'

const AdminMsg =  () => {
    const [viewMessage,setViewMessage] = useState([])

    useEffect(() => {
        const fetchMessage = async () => {
        try {
                const {data} = await api.get("/admin/viewmessage")
                console.log(data.msg)
                setViewMessage(data?.msg)
            }catch(err){
                console.log("Error on Fetching Msg :",err);
        }
            
        }
        fetchMessage()
    },[])
    
    const userMessage = viewMessage.filter((msg) =>msg.from === "user")
    const orgMessage = viewMessage.filter((msg) =>msg.from === "organization")
    
    return (
        <section
            id="campaigns"
            className="py-5 d-flex justify-content-center align-items-center"
            style={{
                backgroundColor: "#1995AD",
                minHeight: "100vh",
            }}
            >
            <div className="container py-4">
                {userMessage.length > 0 && (
                    <>
                        <h1 className="text-center mb-4 text-white">Messages from Users</h1>
                        {userMessage.map((message, index) => (
                            <div
                                key={index}
                                className="row text-center align-items-center py-3 bg-white border rounded-3 mb-4 shadow-sm"
                                style={{
                                    minHeight: "150px",
                                }}
                            >
                                <div className="col text-start">
                                    <h3 className="text-success">Message {index + 1}</h3>
                                    <ul className="list-unstyled mb-0">
                                        <li>
                                            <strong>Full Name :</strong> {message.full_name}
                                        </li>
                                        <li>
                                            <strong>Email :</strong> {message.email}
                                        </li>
                                        <li>
                                            <strong>Message :</strong> {message.message}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {orgMessage.length > 0 && (
                    <>
                        <h1 className="text-center mb-4 text-white">Messages from Organizations</h1>
                        {orgMessage.map((message, index) => (
                            <div
                                key={index}
                                className="row text-center align-items-center py-3 bg-white border rounded-3 mb-4 shadow-sm"
                                style={{
                                    minHeight: "150px",
                                }}
                            >
                                <div className="col text-start">
                                    <h3 className="text-success">Message {index + 1}</h3>
                                    <ul className="list-unstyled mb-0">
                                        <li>
                                            <strong>Full Name :</strong> {message.full_name}
                                        </li>
                                        <li>
                                            <strong>Email :</strong> {message.email}
                                        </li>
                                        <li>
                                            <strong>Message :</strong> {message.message}
                                        </li>
                                        <li>
                                            <strong>From :</strong> {message.from}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {viewMessage.length === 0 && (
                    <div className="text-center">
                        <p className="text-white fs-4">No messages found.</p>
                    </div>
                )}
            </div>
        </section>  
        )
}

export default AdminMsg