import Navbar from "../../components/Navbar";
import ServiceCard from "../../components/ServiceCard";
import services from "../../data/services";


export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main>
        <h1>Our Photography Services</h1>

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
      </main>
    </>
  );
}