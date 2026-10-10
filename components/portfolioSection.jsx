import PortfolioCard from "./portfolioCard";
import portfolio from "../data/portfolio";

export default function PortfolioSection() {
  return (
    <section className="portfolio-section">

      <div className="section-heading">
        <p>OUR WORK</p>

        <h2>Recent Photography</h2>

        <span>
          A collection of our recent photography work.
        </span>
      </div>

      <div className="portfolio-grid">

        {portfolio.map((item) => (
          <PortfolioCard
            key={item.id}
            title={item.title}
            category={item.category}
            image={item.image}
          />
        ))}

      </div>

    </section>
  );
}