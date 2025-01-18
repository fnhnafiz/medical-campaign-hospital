import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { X } from "lucide-react";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const PaymentModal = ({ isModalOpen, handleCloseModal, campaign, refetch }) => {
  return (
    isModalOpen && (
      <Elements stripe={stripePromise}>
        <>
          {/* Modal Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-70 z-40"
            onClick={handleCloseModal}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Payment Details
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <CheckOutForm
                refetch={refetch}
                campaign={campaign}
                handleCloseModal={handleCloseModal}
              >
                {" "}
              </CheckOutForm>
            </div>
          </div>
        </>
      </Elements>
    )
  );
};

export default PaymentModal;
