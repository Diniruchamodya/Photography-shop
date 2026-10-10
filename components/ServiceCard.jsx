import Link from "next/link";

export default function ServiceCard({
  id,
  name,
  description,
  price,
  image,
}) {
  return (
    <article className="service-card">

      <div
        className="service-card-image"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      <div className="service-card-content">
        <h3>{name}</h3>

        <p>{description}</p>

        <p className="service-price">
          From Rs. {price.toLocaleString()}
        </p>

        <Link
          href={`/services/${id}`}
          className="service-link"
        >
          View Details →
        </Link>
      </div>

    </article>
  );
}