import { Link, useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center vh-100 bg-gray-100" 
        style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
            <p className="text-lg text-gray-700 mt-2">
                You do not have permission to view this page.
            </p>
            <button 
                onClick={() => navigate(-1)} 
                className="mt-4 px-4 py-2 bg-white text-black 
                rounded-lg hover:bg-blue-700 border border-black"
            >
                Go Back
            </button>
        </div>
    );
};

export default UnauthorizedPage;
