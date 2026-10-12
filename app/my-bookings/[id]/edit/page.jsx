"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../../../components/Navbar";

export default function EditBookingPage() {
  const { id } = useParams();
  const router = useRouter();

  const [booking, setBooking] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedBookings = JSON.parse(
      localStorage.getItem("photographyBookings") || "[]"
    );

    const selectedBooking = savedBookings.find(
      (item) => item.bookingId === id
    );

    if (selectedBooking) {
      setBooking(selectedBooking);
      setDate(selectedBooking.date);
      setTime(selectedBooking.time);
    }
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!date || !time) {
      setMessage("Please select a date and time.");
      return;
    }

    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();

    if (selectedDateTime <= now) {
      setMessage("Please select a future date and time.");
      return;
    }

    const savedBookings = JSON.parse(
      localStorage.getItem("photographyBookings") || "[]"
    );

    const updatedBookings = savedBookings.map((item) =>
      item.bookingId === id
        ? { ...item, date, time }
        : item
    );

    localStorage.setItem(
      "photographyBookings",
      JSON.stringify(updatedBookings)
    );

    router.push(`/my-bookings/${id}`);
  };

  if (!booking) {
    return (
      <>
        <Navbar />
        <main className="booking-details-page">
          <h1>Booking Not Found</h1>
          <a href="/my-bookings">Back to My Bookings</a>
        </main>
      </>
    );
  }

  if (booking.status === "Cancelled") {
    return (
      <>
        <Navbar />
        <main className="booking-details-page">
          <h1>Cannot Edit Booking</h1>
          <p>Cancelled bookings cannot be rescheduled.</p>
          <a href="/my-bookings">Back to My Bookings</a>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="booking-details-page">
        <div className="booking-details-card">
          <h1>Edit / Reschedule Booking</h1>

          <p>
            <strong>Booking ID:</strong> {booking.bookingId}
          </p>

          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="date">New Date</label>
              <input
                id="date"
                type="date"
                min={new Date().toLocaleDateString("en-CA")}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">New Time</label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            {message && <p className="booking-error">{message}</p>}

            <button type="submit" className="primary-button">
              Save Changes
            </button>
          </form>

          <p>
            <a href={`/my-bookings/${id}`}>
              Back to Booking Details
            </a>
          </p>
        </div>
      </main>
    </>
  );
}