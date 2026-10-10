export default function Hero() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: "url('/images/hero1.jpeg')",
      }}
    >
      <div className="hero-overlay">

        <p className="hero-label">
          CAPTURE YOUR MOMENTS
        </p>

        <h1>
          Every Moment
          <br />
          Deserves to be Remembered
        </h1>

        <p className="hero-description">
          Professional photography for weddings,
          events, portraits and special moments.
        </p>

        <button className="primary-button">
          <a href="booking">Book a Session</a>
        </button>

      </div>
    </section>
  );
}