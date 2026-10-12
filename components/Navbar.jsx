import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">

        <Link href="/" className="logo">
          LensCraft
        </Link>

        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
         <Link href="/portfolio">Portfolio</Link>
          <Link href="/booking">Booking</Link>
          <Link href="/my-bookings">My Bookings</Link>
          <Link href="/login">Login</Link>
          
        </div>

      </div>
    </nav>
  );
}