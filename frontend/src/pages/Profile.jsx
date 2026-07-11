import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  removeProfileImage,
} from "../services/authService";
import AccountSection from "../components/AccountSection";
import SettingsDrawer from "../components/SettingsDrawer";
import toast from "react-hot-toast";


function Profile() {
//state variables
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const defaultImage =
"https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
const [activeDrawer, setActiveDrawer] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    department: "",
    year: "",
    collegeName: "",
  });


  useEffect(() => {
    fetchProfile();
  }, []);


const fetchProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await getProfile(token);

    const user = response.data.user;

    setFormData(user);

    // load saved profile image
    setPreview(user.profileImage || null);

  } catch (error) {
    console.log(error);
  }
};

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // image selection
  const handleImageChange = (e) => {

    const file = e.target.files[0];


    if(file){

      setProfileImage(file);


      setPreview(
        URL.createObjectURL(file)
      );

    }

  };

  //create remove handler 
const handleRemoveImage = async () => {
  try {

    const token = localStorage.getItem("token");

    await removeProfileImage(token);

    await fetchProfile();
    setPreview(null);
    setProfileImage(null);

    toast.success("profile image updated successfully!");

  } catch(error) {

    console.log(error);
    toast.error("Update failed");

  }
};
  // submit profile
  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      const token = localStorage.getItem("token");


      const data = new FormData();


      data.append(
        "name",
        formData.name
      );


      data.append(
        "phoneNumber",
        formData.phoneNumber
      );


      data.append(
        "department",
        formData.department
      );


      data.append(
        "year",
        formData.year
      );


      data.append(
        "collegeName",
        formData.collegeName
      );


      if(profileImage){

        data.append(
          "profileImage",
          profileImage
        );

      }


      const response = await updateProfile(data, token);

setPreview(response.user.profileImage);

setProfileImage(null);

toast.success("Profile updated successfully!");


    } catch(error){

      console.log(error);

      toast.error("Update failed");

    }

  };


  return (

    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-6">


      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl space-y-5"
      >


        <h1 className="text-3xl font-bold text-center text-indigo-700">
          My Profile
        </h1>



        {/* Profile Image */}

        <div className="flex flex-col items-center gap-3">


<label className="cursor-pointer relative">

<img
src={preview || defaultImage}
alt="profile"
className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
/>


<div className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">

✎

</div>


<input
type="file"
accept="image/*"
className="hidden"
onChange={handleImageChange}
/>


</label>


{
preview && (

<button
type="button"
onClick={handleRemoveImage}
className="text-red-500 text-sm"
>
Remove photo
</button>
)
}


</div>



        <div>
          <label className="font-semibold">
            Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />

        </div>




        <div>

          <label className="font-semibold">
            Email
          </label>


          <input
            type="email"
            value={formData.email}
            readOnly
            className="w-full border rounded-lg p-3 mt-1 bg-gray-100"
          />

        </div>





        <div>

          <label className="font-semibold">
            Phone Number
          </label>


          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />

        </div>





        <div>

          <label className="font-semibold">
            College Name
          </label>


          <input
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />

        </div>





        <div>

          <label className="font-semibold">
            Department
          </label>


          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />

        </div>





        <div>

          <label className="font-semibold">
            Year
          </label>


          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />

        </div>





        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
        >
          Save Changes
        </button>



        <AccountSection
        setActiveDrawer={setActiveDrawer}
        />
 </form>
         <SettingsDrawer
          activeDrawer={activeDrawer}
          setActiveDrawer={setActiveDrawer}
        />
     

    </div>

  );

}


export default Profile;