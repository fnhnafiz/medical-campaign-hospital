import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const CheckOutForm = ({ handleCloseModal, campaign, refetch }) => {
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState();
  const [transactionId, setTransactionId] = useState("");
  // console.log(camp);
  const { campFees, confirmationStatus, paymentStatus, campName, _id } =
    campaign;
  console.log(campaign);
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const price = campFees;

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    // handlePayment();

    // Add payment processing logic here
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
      console.log("payment error from checkout form", error);
    } else {
      console.log("payment method ok", paymentMethod);
      setError("");
    }
    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email,
          },
        },
      });
    if (confirmError) {
      console.log("confirm error payment", confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        toast.success("payment successfully");

        // when successfully payment then save to the payment info in the database
        const payment = {
          paymentId: _id,
          email: user?.email,
          name: user?.displayName,
          campName: campName,
          price: price,
          date: new Date(),
          confirmationStatus: confirmationStatus,
          paymentStatus: "paid",
          transactionId: paymentIntent?.id,
        };
        await axiosSecure.post("/payment", payment).then(async () => {
          await axiosSecure.patch(`/payment-history/${_id}`, {
            paymentStatus: "paid",
          });
          refetch();
        });
      }
    }
    // handleCloseModal();
  };

  return (
    <form onSubmit={handlePaymentSubmit} className="p-4 space-y-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div>
        <p className="text-red-500">{error}</p>
        {transactionId && (
          <p className="text-green-500">Your transactionId : {transactionId}</p>
        )}
        {/* Modal Footer */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="submit"
            onClick={handleCloseModal}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            disabled={!stripe || !clientSecret}
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Pay Now
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckOutForm;
