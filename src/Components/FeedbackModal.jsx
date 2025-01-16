import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const FeedbackModal = ({
  closeModal,
  isOpen,
  handleSubmit,
  register,
  onSubmit,
}) => {
  return (
    // <Transition appear show={isOpen} as={Fragment}>
    //   <Dialog as="div" className="relative z-50" onClose={closeModal}>
    //     <Transition.Child
    //       as={Fragment}
    //       enter="ease-out duration-300"
    //       enterFrom="opacity-0"
    //       enterTo="opacity-100"
    //       leave="ease-in duration-200"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0"
    //     >
    //       <div className="fixed inset-0 bg-black/25" />
    //     </Transition.Child>

    //     <div className="fixed inset-0 overflow-y-auto">
    //       <div className="flex min-h-full items-center justify-center p-4">
    //         <Transition.Child
    //           as={Fragment}
    //           enter="ease-out duration-300"
    //           enterFrom="opacity-0 scale-95"
    //           enterTo="opacity-100 scale-100"
    //           leave="ease-in duration-200"
    //           leaveFrom="opacity-100 scale-100"
    //           leaveTo="opacity-0 scale-95"
    //         >
    //           <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
    //             <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
    //               Provide Your Feedback
    //             </Dialog.Title>

    //             <form onSubmit={handleSubmit(onSubmit)} action="">
    //               {/* Rating Section */}
    //               <div className="mb-4">
    //                 <label className="block text-sm font-medium text-gray-700 mb-2">
    //                   Rating
    //                 </label>
    //                 <input
    //                   {...register("rating", { required: true })}
    //                   name="name"
    //                   type="number"
    //                   className="w-full p-3 border rounded-lg"
    //                 />
    //               </div>

    //               {/* Feedback Text Area */}
    //               <div className="mb-4">
    //                 <label className="block text-sm font-medium text-gray-700 mb-2">
    //                   Your Feedback
    //                 </label>
    //                 <textarea
    //                   {...register("comment", { required: true })}
    //                   name="comment"
    //                   // value={feedback}
    //                   // onChange={(e) => setFeedback(e.target.value)}
    //                   className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
    //                   rows="4"
    //                   placeholder="Please share your experience..."
    //                 />
    //               </div>

    //               {/* Action Buttons */}
    //               <div className="flex justify-end gap-3 mt-6">
    //                 <button
    //                   type="submit"
    //                   className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
    //                   onClick={closeModal}
    //                 >
    //                   Cancel
    //                 </button>
    //                 <button
    //                   type="button"
    //                   className="px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
    //                   // onClick={handleSubmit}
    //                 >
    //                   Submit Feedback
    //                 </button>
    //               </div>
    //             </form>
    //           </Dialog.Panel>
    //         </Transition.Child>
    //       </div>
    //     </div>
    //   </Dialog>
    // </Transition>
  );
};

export default FeedbackModal;
