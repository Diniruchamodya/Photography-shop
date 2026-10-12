"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import services from "../../data/services";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(
      localStorage.getItem("photographyBookings") || "[]"
    );

    setBookings(savedBookings);
  }, []);

  const getServiceName = (serviceId) => {
    const selectedService = services.find(
      (service) => service.id === Number(serviceId)
    );

    return selectedService?.name || "Unknown Service";
  };

  return (
    <>
      <Navbar />

      <main className="my-bookings-page">
        <div className="my-bookings-container">
          <h1>My Bookings</h1>

          <p className="my-bookings-description">
            View all your photography bookings.
          </p>

          {bookings.length === 0 ? (
            <div className="empty-bookings">
              <h2>No Bookings Found</h2>
              <p>
                You have not submitted any bookings yet.
              </p>
              <a href="/services" className="primary-button">
                Explore Services
              </a>
            </div>
          ) : (
            <div className="bookings-table-wrapper">
              <table className="bookings-table">
                <thead>
  <tr>
    <th>Booking ID</th>
    <th>Customer Name</th>
    <th>Phone</th>
    <th>Service</th>
    <th>Price</th>
    <th>Date</th>
    <th>Time</th>
    <th>Status</th>
  </tr>
</thead>
<tbody>
  {bookings.map((booking) => {
    const selectedService = services.find(
      (service) =>
        service.id === Number(booking.service)
    );

    return (
      <tr key={booking.bookingId}>
        <td><a href={`/my-bookings/${booking.bookingId}`}>  {booking.bookingId}</a></td>
        <td>{booking.name}</td>
        <td>{booking.phone}</td>
        <td>{selectedService?.name || "Unknown Service"}</td>
        <td>
          Rs. {(selectedService?.price ?? 0).toLocaleString()}
        </td>
        <td>{booking.date}</td>
        <td>{booking.time}</td>
        <td>
          <span
  className={`booking-status ${
    booking.status === "Cancelled"
      ? "booking-status-cancelled"
      : "booking-status-pending"
  }`}
>
  {booking.status}
</span>
        </td>
      </tr>
    );
  })}
</tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  );
}