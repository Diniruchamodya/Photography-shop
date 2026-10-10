export default function portfolioCard({
  title,
  category,
  image,
}) {
  return (
    <article className="portfolio-card">

      <div
        className="portfolio-card-image"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      <div className="portfolio-card-content">
        <p>{category}</p>

        <h3>{title}</h3>
      </div>

    </article>
  );
}