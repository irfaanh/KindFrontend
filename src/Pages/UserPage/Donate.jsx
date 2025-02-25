/* eslint-disable react/prop-types */
import React from "react";
import "./Donate.css"; 
import toast from "react-hot-toast";

import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { api } from "../../axios";
import { useSelector } from "react-redux";

const stripePromise = loadStripe("pk_test_51Ql320Jijyou81BQW4BfRuizRTzgsfU5wCS3AfE9IlviAXx8FSdzMMhmsQDornTH5SIVngmS1pDA56INWW9wNjAZ00z5ohhuwW");

const DonateSchema = Yup.object().shape({
    amount: Yup.number()
        .required("Amount is required")
        .positive("Amount must be positive")
        .min(1, "Minimum donation is $1"),
});

const DonateForm = ({ campaignId }) => {
    const {id} = useSelector(store => store.user)

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        try {
            const { token } = await stripe.createToken(cardElement);

            const response = await api.post("/donation/donate", {
                campaignId,
                amount: values.amount,
                token: token.id,
            });
            
            
            console.log(response.data);
            toast.success(response.data.message || "Donation successful")


            const currdate = new Date();
            const formattedDate = currdate.toLocaleDateString('en-GB');
            console.log(formattedDate);

             await api.post("/donation/adddonation",{
                userId:id,
                campaignId,
                amount:values.amount,
                donationDate:formattedDate
            })
            // toast.success("Donation details logged successfully!");
        } catch (error) {
            toast.error("Donation failed. Please try again.")
            console.error("Error processing donation:", error);
            alert("Error processing donation. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="center-wrapper">
            <div className="donate-form-wrapper">
                <h2 className="donate-header">Donate to Campaign</h2>
                <Formik
                    initialValues={{ amount: "" }}
                    validationSchema={DonateSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form className="space-y-4">
                            <div>
                                <label className="block text-gray-600 text-sm mb-2" htmlFor="amount">
                                    Donation Amount ($)
                                </label>
                                <Field
                                    name="amount"
                                    type="number"
                                    placeholder="Enter donation amount"
                                    className={`donate-input ${
                                        errors.amount && touched.amount
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                />
                                {errors.amount && touched.amount && (
                                    <div className="text-red-500 text-sm mt-1">{errors.amount}</div>
                                )}
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm mb-2" htmlFor="card">
                                    Card Details
                                </label>
                                <div className="card-element-wrapper">
                                    <CardElement
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: "16px",
                                                    color: "#32325d",
                                                    "::placeholder": {
                                                        color: "#a0aec0",
                                                    },
                                                },
                                                invalid: {
                                                    color: "#fa755a",
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={!stripe || isSubmitting}
                                className="donate-button mt-2"
                            >
                                {isSubmitting ? "Processing..." : "Donate"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

const DonatePage = () => {
    const { id } = useParams();

    return (
        <Elements stripe={stripePromise}>
            <DonateForm campaignId={id} />
        </Elements>
    );
};

export default DonatePage;
