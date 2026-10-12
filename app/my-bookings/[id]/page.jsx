"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import services from "../../../data/services";

export default function BookingDetailsPage() {
  const params = useParams();
  const bookingId = params.id;

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load selected booking
  useEffect(() => {
    const savedBookings = JSON.parse(
      localStorage.getItem("photographyBookings") || "[]"
    );

    const selectedBooking = savedBookings.find(
      (item) => item.bookingId === bookingId
    );

    setBooking(selectedBooking || null);
    setLoading(false);
  }, [bookingId]);

  // Cancel booking
  const handleCancelBooking = () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) {
      return;
    }

    const savedBookings = JSON.parse(
      localStorage.getItem("photographyBookings") || "[]"
    );

    const updatedBookings = savedBookings.map((item) =>
      item.bookingId === bookingId
        ? { ...item, status: "Cancelled" }
        : item
    );

    localStorage.setItem(
      "photographyBookings",
      JSON.stringify(updatedBookings)
    );

    setBooking((previousBooking) => ({
      ...previousBooking,
      status: "Cancelled",
    }));
  };

  if (loading) {
    return <p>Loading booking details...</p>;
  }

  if (!booking) {
    return (
      <>
        <Navbar />
        <main className="booking-details-page">
          <h1>Booking Not Found</h1>
          <p>We could not find this booking.</p>
          <a href="/my-bookings">Back to My Bookings</a>
        </main>
      </>
    );
  }

  const selectedService = services.find(
    (service) => service.id === Number(booking.service)
  );

  const photographers = {
    1: "Kasun Perera",
    2: "Nimal Fernando",
    3: "Sanduni Silva",
  };

  return (
    <>
      <Navbar />

      <main className="booking-details-page">
        <div className="booking-details-card">
          <h1>Booking Details</h1>

          {updated === "true" && (<p className="booking-success">
              Booking updated successfully!
           </p>
          )}

          <p>
            <strong>Booking ID:</strong> {booking.bookingId}
          </p>

          <p>
            <strong>Status:</strong> {booking.status}
          </p>

          <p>
            <strong>Customer Name:</strong> {booking.name}
          </p>

          <p>
            <strong>Email:</strong> {booking.email}
          </p>

          <p>
            <strong>Phone:</strong> {booking.phone}
          </p>

          <p>
            <strong>Service:</strong>{" "}
            {selectedService?.name || "Unknown Service"}
          </p>

          <p>
            <strong>Price:</strong>{" "}
            Rs. {(selectedService?.price ?? 0).toLocaleString()}
          </p>

          <p>
            <strong>Photographer:</strong>{" "}
            {photographers[booking.photographer] || "No preference"}
          </p>

          <p>
            <strong>Date:</strong> {booking.date}
          </p>

          <p>
            <strong>Time:</strong> {booking.time}
          </p>

          {booking.message && (
            <p>
              <strong>Additional Message:</strong>{" "}
              {booking.message}
            </p>
          )}

          {booking.status !== "Cancelled" && (
            <button
              type="button"
              className="cancel-booking-button"
              onClick={handleCancelBooking}
            >
              Cancel Booking
            </button>
          )}

           {booking.status !== "Cancelled" && (
         <a
          href={`/my-bookings/${booking.bookingId}/edit`}
          className="edit-booking-button"
        >
        Edit / Reschedule
       </a>
         )}


          <a href="/my-bookings" className="primary-button">
            Back to My Bookings
          </a>
        </div>
      </main>
    </>
  );
}