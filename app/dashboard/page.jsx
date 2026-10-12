"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";


export default function DashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const services = [];

  useEffect(() => {
    const savedBookings = JSON.parse(
      localStorage.getItem("photographyBookings") || "[]"
    );

    setBookings(savedBookings);
  }, []);

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "Cancelled"
  ).length;




  const getServicePrice = (booking) => {
  const selectedService = services.find(
    (service) => service.id === Number(booking.service)
  );

  return selectedService?.price ?? 0;
};

const totalBookingValue = bookings.reduce(
  (total, booking) => total + getServicePrice(booking),
  0
);

const pendingRevenue = bookings
  .filter((booking) => booking.status === "Pending")
  .reduce(
    (total, booking) => total + getServicePrice(booking),
    0
  );

const cancelledBookingValue = bookings
  .filter((booking) => booking.status === "Cancelled")
  .reduce(
    (total, booking) => total + getServicePrice(booking),
    0
  );



  const filteredBookings = bookings.filter((booking) => {
  const selectedService = services.find(
    (service) => service.id === Number(booking.service)
  );

  const searchValue = searchTerm.toLowerCase();

  const matchesSearch =
    (booking.bookingId || "").toLowerCase().includes(searchValue) ||
    (booking.name || "").toLowerCase().includes(searchValue) ||
    (selectedService?.name || "").toLowerCase().includes(searchValue);

  const matchesStatus =
    statusFilter === "All" || booking.status === statusFilter;

  return matchesSearch && matchesStatus;
});




  return (
    <>
      <Navbar />

      <main className="dashboard-page">
        <div className="dashboard-container">
          <h1>Booking Dashboard</h1>

          <p className="dashboard-description">
            Overview of photography bookings.
          </p>

          <div className="dashboard-stats">
            <div className="dashboard-stat-card">
              <h2>Total Bookings</h2>
              <p>{totalBookings}</p>
            </div>

            <div className="dashboard-stat-card pending">
              <h2>Pending Bookings</h2>
              <p>{pendingBookings}</p>
            </div>

            <div className="dashboard-stat-card cancelled">
              <h2>Cancelled Bookings</h2>
              <p>{cancelledBookings}</p>
            </div>

            <div className="dashboard-stat-card revenue">
  <h2>Total Booking Value</h2>
  <p>Rs. {totalBookingValue.toLocaleString()}</p>
</div>

<div className="dashboard-stat-card pending">
  <h2>Pending Booking Value</h2>
  <p>Rs. {pendingRevenue.toLocaleString()}</p>
</div>

<div className="dashboard-stat-card cancelled">
  <h2>Cancelled Booking Value</h2>
  <p>Rs. {cancelledBookingValue.toLocaleString()}</p>
</div>
          </div>

          {/* section */}
          <section className="dashboard-bookings">
          <h2>All Bookings</h2>

             {bookings.length === 0 ? (
            <p>No bookings available.</p>
           ) : (
             <div className="bookings-table-wrapper">

                <div className="dashboard-filters">
  <input
    type="text"
    placeholder="Search booking ID, customer or service..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="All">All Statuses</option>
    <option value="Pending">Pending</option>
    <option value="Cancelled">Cancelled</option>
  </select>
</div>

            <table className="bookings-table">
           <thead>
              <tr>
            <th>Booking ID</th>
            <th>Customer</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredBookings.map((booking) => {
            const selectedService = services.find(
              (service) => service.id === Number(booking.service)
            );

            return (
              <tr key={booking.bookingId}>
                <td>
                  <a href={`/my-bookings/${booking.bookingId}`}>
                    {booking.bookingId}
                  </a>
                </td>
                <td>{booking.name}</td>
                <td>{selectedService?.name || "Unknown Service"}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )}
</section>
        </div>
      </main>
    </>
  );
}