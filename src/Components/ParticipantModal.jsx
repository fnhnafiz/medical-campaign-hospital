import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import useAuth from "../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const ParticipantModal = ({ isOpen, closeModal, campDetails, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { _id, campFees, campName, healthcareProfessional, location } =
    campDetails;
  const [gender, setGender] = useState("");
  console.log(campDetails);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const joinCamp = {
      joinCampId: _id,
      campName: data.campName,
      campFees: parseInt(data?.campFees),
      location: data.location,
      healthcareProfessional: data.healthcareProfessional,
      participantName: data.participantName,
      participantEmail: data.participantEmail,
      participantAge: data.participantAge,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      emergencyNumber: data.emergencyNumber,
      paymentStatus: "unpaid",
      confirmationStatus: "pending",
    };
    const newJoinCamp = await axiosPublic.post("/register-campaign", joinCamp);
    // console.log(newJoinCamp.data);
    if (newJoinCamp.data.insertedId) {
      toast.success("Join with campaign");
      closeModal();
      reset();
      await axiosPublic.patch(`/participant-count/${_id}`).then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
        }
      });
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Join Camp
                </Dialog.Title>
                <div className="mt-4">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Camp Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Camp Name
                        </label>
                        <input
                          {...register("campName")}
                          readOnly
                          defaultValue={campName}
                          type="text"
                          placeholder="Enter camp name"
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>

                      {/* Camp Fees */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Camp Fees
                        </label>
                        <input
                          {...register("campFees")}
                          readOnly
                          defaultValue={campFees}
                          type="text"
                          placeholder="Enter camp fees"
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Location
                        </label>
                        <input
                          {...register("location")}
                          readOnly
                          defaultValue={location}
                          type="text"
                          placeholder="Enter location"
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>

                      {/* Healthcare Professional */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Healthcare Professional
                        </label>
                        <input
                          {...register("healthcareProfessional")}
                          readOnly
                          defaultValue={healthcareProfessional}
                          type="text"
                          placeholder="Enter professional name"
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>

                      {/* Participant Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Participant Name
                        </label>
                        <input
                          {...register("participantName")}
                          readOnly
                          defaultValue={user?.displayName}
                          type="text"
                          placeholder="Enter your name"
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>

                      {/* Participant Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Participant Email
                        </label>
                        <input
                          {...register("participantEmail")}
                          readOnly
                          defaultValue={user?.email}
                          type="email"
                          placeholder="Enter your email"
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>

                      {/* Age */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Age
                        </label>
                        <input
                          {...register("participantAge", { required: true })}
                          type="text"
                          placeholder="Enter your age"
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          {...register("phoneNumber", { required: true })}
                          type="number"
                          placeholder="Enter phone number"
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Gender
                        </label>
                        <select
                          defaultValue={""}
                          onChange={(e) => setGender(e.target.value)}
                          {...register("gender", { required: true })}
                          name="gender"
                          className="w-full border border-gray-300 rounded-md p-2"
                        >
                          <option value="" disabled>
                            Select Gender
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Emergency Contact */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Emergency Contact
                        </label>
                        <input
                          {...register("emergencyNumber", { required: true })}
                          type="number"
                          placeholder="Enter emergency contact"
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex justify-end space-x-4">
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 rounded-md text-white hover:bg-green-700"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ParticipantModal;
