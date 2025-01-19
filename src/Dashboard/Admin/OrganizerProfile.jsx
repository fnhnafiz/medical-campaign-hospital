import useAuth from "../../Hooks/useAuth";
import coverImg from "../../../public/Banner/ProfileBanner.jpg";
import useAdmin from "../../Hooks/useAdmin";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { IoCloseOutline } from "react-icons/io5";
const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;

const imaage_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const OrganizerProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, updateUserProfile } = useAuth();
  const isAdmin = useAdmin();

  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const onSubmit = async (data) => {
    console.log(data);
    const name = data?.name;
    const imageFile = { image: data.image[0] };

    const res = await axiosPublic.post(imaage_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const photo = res.data.data.display_url;
      updateUserProfile(name, photo).then(() => {
        toast.success("updated profile successfully");
        setIsOpen(false);
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-[70%]">
        <img
          alt="cover photo"
          src={coverImg}
          className="w-full mb-4 rounded-t-lg "
        />
        <div className="flex flex-col items-center gap-5 justify-center p-4 -mt-16">
          <div className="relative block">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24 ring ring-green-500 border-2 border-white "
            />
          </div>

          <p className="p-2 px-4 text-xs text-white bg-green-500 rounded-full">
            {isAdmin && "Organizer"}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800 ">
            User Id: {user?.uid}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black ">
                  {user?.displayName}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black ">{user?.email}</span>
              </p>

              <div>
                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-green-500 px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-green-800 hover:text-white  block mb-1"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="bg-white rounded-xl shadow-xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-800">
                  Update Profile
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <IoCloseOutline className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4">
                <div className="mt-12">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      name="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <input
                      {...register("image", { required: true })}
                      type="file"
                      name="image"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <input
                      type="submit"
                      value="Submit"
                      className="w-full px-4 py-2 text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg hover:shadow-lg hover:shadow-emerald-200 transition-all cursor-pointer"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrganizerProfile;
