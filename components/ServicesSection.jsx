import Link from "next/link";
import ServiceCard from "./ServiceCard";
import services from "../data/services";

export default function ServicesSection() {
  return (
    <section className="services-section">

      <div className="section-heading">
        <p>WHAT WE OFFER</p>

        <h2>Our Photography Services</h2>

        <span>
          Professional photography for every special moment.
        </span>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            name={service.name}
            description={service.description}
            price={service.price}
            image={service.image}
          />
        ))}
      </div>

      <div className="services-button">
        <Link href="/services">
          View All Services →
        </Link>
      </div>

    </section>
  );
}