import Link from "next/link";
import Navbar from "../../../components/Navbar";
import services from "../../../data/services";


export default async function ServiceDetailsPage({ params }) {
  const { id } = await params;

  const service = services.find(
    (item) => item.id === Number(id)
  );

  if (!service) {
    return (
      <>
        <Navbar />

        <main>
          <h1>Service Not Found</h1>

          <Link href="/services">
            Back to Services
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main>
        <h1>{service.name}</h1>

        <p>{service.description}</p>

        <p>
          Starting Price: Rs. {service.price}
        </p>

        <Link href={`/booking?service=${service.id}`}>
          Book This Service
        </Link>

        <br />

        <Link href="/services">
          ← Back to Services
        </Link>
      </main>
    </>
  );
}