import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";
import SectionTitle from "../../Components/SectionTitle";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;

const imaage_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCamp = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const axiosPublic = useAxiosPublic();

  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    const imageFile = { image: data.image[0] };
    // console.log(imageFile);
    // upload image to database
    const res = await axiosPublic.post(imaage_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // send to the data in database
      const newCamp = {
        campName: data.campName,
        imageUrl: res.data.data.display_url,
        campFees: parseInt(data.campFees),
        dateTime: data.dateTime,
        location: data.location,
        healthcareProfessional: data.healthcareProfessional,
        participantCount: parseInt(0),
        description: data.description,
      };
      console.log(newCamp);
      const addNewCamp = await axiosSecure.post("/add-camp", newCamp);
      console.log(addNewCamp.data);
      if (addNewCamp.data.insertedId) {
        setLoading(false);
        toast.success("Camp added");
        reset();
      }
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <SectionTitle
        heading="Add new campaign"
        subHeading="Compellingly whiteboard enterprise leadership skills and client-centric imperatives. Seamlessly aggregate cooperative e-business via wireless intellectual."
      ></SectionTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12"
      >
        <div>
          <label htmlFor="campName" className="block text-sm font-medium mb-1">
            Camp Name <span className="text-red-500">**</span>
          </label>
          <input
            placeholder="Camp Name"
            id="campName"
            type="text"
            {...register("campName", { required: "Camp Name is required" })}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none p-2"
          />
          {errors.campName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.campName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            Image URL<span className="text-red-500">**</span>
          </label>
          <input
            type="file"
            {...register("image", { required: "Image URL is required" })}
            className=" w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none p-2"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="campFees" className="block text-sm font-medium mb-1">
            Camp Fees<span className="text-red-500">**</span>
          </label>
          <input
            placeholder="Camp Fees"
            id="campFees"
            type="number"
            min="0" // Prevents negative input in the UI
            {...register("campFees", {
              required: "Camp Fees are required",
              min: {
                value: 0,
                message: "Camp Fees cannot be negative", // Custom error message
              },
            })}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none p-2"
          />
          {errors.campFees && (
            <p className="text-red-500 text-sm mt-1">
              {errors.campFees.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="dateTime" className="block text-sm font-medium mb-1">
            Date & Time<span className="text-red-500">**</span>
          </label>
          <input
            id="dateTime"
            type="datetime-local"
            {...register("dateTime", { required: "Date & Time are required" })}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none p-2"
          />
          {errors.dateTime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dateTime.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Location<span className="text-red-500">**</span>
          </label>
          <input
            placeholder="Location"
            id="location"
            type="text"
            {...register("location", { required: "Location is required" })}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none p-2"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="healthcareProfessional"
            className="block text-sm font-medium mb-1"
          >
            Healthcare Professional Name<span className="text-red-500">**</span>
          </label>
          <input
            placeholder="Healthcare Professional Name"
            id="healthcareProfessional"
            type="text"
            {...register("healthcareProfessional", {
              required: "Healthcare Professional Name is required",
            })}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none p-2"
          />
          {errors.healthcareProfessional && (
            <p className="text-red-500 text-sm mt-1">
              {errors.healthcareProfessional.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description<span className="text-red-500">**</span>
          </label>
          <textarea
            placeholder="Write Here Your Description"
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none p-2"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="btn w-full bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 transition"
          >
            {loading ? (
              <img className="w-[30px]" src="/loading-gif.gif" />
            ) : (
              "Add Camp"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCamp;
