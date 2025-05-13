import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/Layouts/AuthLayout'
import { Link, useNavigate } from "react-router-dom"
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';



function SignUp() {

  const [profilePic, setProfilePic] = useState(null);
  const [fulName, setFulName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext); // Import the context to update user data

  const navigate = useNavigate();

  //Hnadle SignUP form submit
  const handleSignUP = async (e) => { 

    e.preventDefault();

    let profileImageUrl = "";

    if (!fulName) {
      setError("please enter the Full Name!");
      return;
    }

    if (!validateEmail(email)) {
      setError("please enter a valid email address!");
      return;
    }
    if (!password) {
      setError("please enter the Password!");
      return;
    }

    if (password.length < 8) {
      setError("Password must be more than 8 characters!");
      return;
    }
    setError(null)

    //signup Api call
  try{

    //upload image if present 
    if(profilePic) {
      const imgUploadRes = await uploadImage(profilePic);
      profileImageUrl = imgUploadRes.imageUrl || "";
     } // Assuming the response contains the image URL{

     const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
      fulName,
      email,
      password,
      profileImageUrl,

     
  });
  const { token, user } = response.data;

  // if (token) {
  //   localStorage.setItem("token", token);
  //   updateUser(user); // Update user context with the logged-in user data
  //   navigate("/dashboard"); 
  // }
 
if (token) {
    localStorage.setItem("token", token);
    updateUser(user); 
    setError(null); // <--- Add this line here
    navigate("/dashboard"); 
}



}
catch (error) { 
  if (error.response && error.response.data.message) {
    setError(error.response.data.message);
  } else {
    setError("someting went wrong, please try again later!"+error.message);
        }
  }


  };



  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center '>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6 '>
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUP}>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fulName}
              onChange={({ target }) => setFulName(target.value)}
              label="Full Name"
              placeholder="jhon"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="jhon@example.com"
              type="text" />


            <div className='col-span-2'>
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="min 8 characters"
              type="password" />
              </div>
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          
                  <button type='submit' className='btn-primary'>SIGN UP</button>
                 
          
                 <p className='text-[13px] text-slate-800 mt-3'> Already have an account?{" "}
                 <Link className="font-medium text-primary underline" to="/login" >Login</Link>
                 </p>
          
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp
