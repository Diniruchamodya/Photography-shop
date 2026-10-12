"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useSearchParams } from "next/navigation";
import services from "../../data/services";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service");

 const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  service: "",
  date: "",
  time: "",
  message: "",
});

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedBooking, setSubmittedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Automatically select service from URL
  useEffect(() => {
    if (serviceId) {
      setFormData((previousData) => ({
        ...previousData,
        service: serviceId,
      }));
    }
  }, [serviceId]);


const handleInputChange = (e) => {
  setFormData({
    ...formData,
    [e.target.id]: e.target.value,
  });

  setErrorMessage("");
};

  // Submit booking
  const handleSubmit = (e) => {
    e.preventDefault();

    
    // Validation
if (
  !formData.name ||
  !formData.email ||
  !formData.service ||
  !formData.date ||
  !formData.time
) {
  setErrorMessage("Please fill in all required fields.");
  setSuccessMessage("");
  setIsSubmitting(false);
  return;
}

// Prevent past time when booking for today
const today = new Date();
const selectedDate = new Date(formData.date);

const todayDate = today.toISOString().split("T")[0];

if (
  formData.date === todayDate &&
  formData.time <=
    today.toTimeString().slice(0, 5)
) {
  setErrorMessage("Please select a future time.");
  setSuccessMessage("");
  setIsSubmitting(false);
  return;
}
    


// Validate email format
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(formData.email)) {
  setErrorMessage("Please enter a valid email address.");
  setSuccessMessage("");
  setIsSubmitting(false);
  return;
}

// Validate name
const namePattern = /^[A-Za-z\s]+$/;

if (!namePattern.test(formData.name)) {
  setErrorMessage("Please enter a valid name.");
  setSuccessMessage("");
  setIsSubmitting(false);
  return;
}


// Validate phone number
const phonePattern = /^(07\d{8}|7\d{8})$/;

if (!phonePattern.test(formData.phone)) {
  setErrorMessage("Please enter a valid Sri Lankan mobile number.");
  setSuccessMessage("");
  setIsSubmitting(false);
  return;
}


    // Create booking ID
    const booking = {
  ...formData,
  bookingId: `BK-${Date.now()}`,
  status: "Pending",
};

// Show submitted booking
setSubmittedBooking(booking);

// Console
console.log("Booking Submitted:");
console.log(booking);

    // Show submitted booking
    setSubmittedBooking(booking);

    // Get existing bookings
const existingBookings = JSON.parse(
  localStorage.getItem("photographyBookings") || "[]"
);

// Add the new booking
const updatedBookings = [
  ...existingBookings,
  booking,
];

// Save all bookings
localStorage.setItem(
  "photographyBookings",
  JSON.stringify(updatedBookings)
);

    // Console
    console.log("Booking Submitted:");
    console.log(booking);

    // Clear form
    setFormData({
      name: "",
      email: "",
      service: "",
      date: "",
      time: "",
      message: "",
    });

    // Messages
    setErrorMessage("");
    setSuccessMessage("Booking submitted successfully!");
    setIsSubmitting(false);
  };

  const selectedService = services.find(
  (service) =>
    service.id === Number(submittedBooking?.service)
);


const totalPrice = selectedService?.price ?? 0;

const advancePayment = totalPrice * 0.5;
const remainingBalance = totalPrice - advancePayment;


  return (
    <>
      <Navbar />

      <main className="booking-page">

        <div className="booking-card">

          <div className="booking-heading">
            <p>BOOK YOUR SESSION</p>

            <h1>Photography Booking</h1>

            <span>
              Choose your service and preferred date for your session.
            </span>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="name">
                Full Name
              </label>

              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Phone */}
           <div className="form-group">
          <label htmlFor="phone">
              Phone Number
           </label>

           <input type="tel" id="phone"
           placeholder="Enter your phone number"
           value={formData.phone}
           onChange={handleInputChange}
           required
          />
         </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                Email
              </label>

              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Photography Service */}
            <div className="form-group">
              <label htmlFor="service">
                Photography Service
              </label>

              <select
                id="service"
                value={formData.service}
               onChange={handleInputChange}
               required
              >
                <option value="">
                  Select a service
                </option>

                {services.map((service) => (
                  <option
                    key={service.id}
                    value={service.id}
                  >
                    {service.name}
                  </option>
                ))}
              </select>
            </div>


            {/* Photographer */}
  <div className="form-group">
  <label htmlFor="photographer">
    Preferred Photographer
  </label>

  <select
    id="photographer"
    value={formData.photographer}
    onChange={handleInputChange}
  >
    <option value="">
      Select a photographer
    </option>

    <option value="1">
      Kasun Perera
    </option>

    <option value="2">
      Nimal Fernando
    </option>

    <option value="3">
      Sanduni Silva
    </option>
  </select>
</div>

            {/* Date */}
            <div className="form-group">
              <label htmlFor="date">
                Preferred Date
              </label>

              <input
                type="date"
                id="date"
                min={new Date().toISOString().split("T")[0]}
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Time */}
            <div className="form-group">
              <label htmlFor="time">
                Preferred Time
              </label>

              <input
                type="time"
                id="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="message">
                Additional Message
              </label>

              <textarea
                id="message"
                placeholder="Tell us anything we should know..."
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                
              />
            </div>

            {/* Submit Button */}
            <button type="submit"
            className="primary-button booking-button"
            disabled={isSubmitting}
           >
          {isSubmitting ? "Submitting..." : "Submit Booking"}
          </button>

          </form>

          {/* Error Message */}
          {errorMessage && (
            <p className="booking-error">
              {errorMessage}
            </p>
          )}

          {/* Success Message */}
          {successMessage && (
            <p className="booking-success">
              {successMessage}
            </p>
          )}

          {/* Booking Summary */}
          {submittedBooking && (
            <div className="booking-summary">

              <h2>Booking Summary</h2>

              <p>
                <strong>Booking ID:</strong>{" "}
                {submittedBooking.bookingId}
              </p>

               <p>
              <strong>Status:</strong>{" "}
              {submittedBooking.status}
              </p>

              <p>
                <strong>Name:</strong>{" "}
                {submittedBooking.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {submittedBooking.email}
              </p>

              <p>
             <strong>Phone:</strong>{" "}
             {submittedBooking.phone}
              </p>

              <p>
                <strong>Service:</strong>{" "}
                {
                  services.find(
                    (service) =>
                      service.id ===
                      Number(submittedBooking.service)
                  )?.name
                }
              </p>

             <p>
            <strong>Service Price:</strong>{" "}
         Rs. {selectedService?.price.toLocaleString() ?? "0"}
          </p>

         <p>
        <strong>Total:</strong>{" "}
       Rs. {selectedService?.price.toLocaleString() ?? "0"}
        </p>


        <p>
  <strong>Advance Payment (50%):</strong>{" "}
  Rs. {advancePayment.toLocaleString()}
</p>

<p>
  <strong>Remaining Balance:</strong>{" "}
  Rs. {remainingBalance.toLocaleString()}
</p>

              <p>
            <strong>Photographer:</strong>{" "}
             {
              submittedBooking.photographer
              ? {
               1: "Kasun Perera",
               2: "Nimal Fernando",
               3: "Sanduni Silva",
               }[submittedBooking.photographer]
              : "No preference"
             }
            </p>

              <p>
                <strong>Date:</strong>{" "}
                {submittedBooking.date}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {submittedBooking.time}
              </p>

              {submittedBooking.message && (
                <p>
                  <strong>Message:</strong>{" "}
                  {submittedBooking.message}
                </p>
              )}

            </div>
          )}

        </div>

      </main>
    </>
  );
}