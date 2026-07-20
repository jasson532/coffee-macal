import { useScrollAnimation } from 'modules/shared/hooks/useScrollAnimation';
import './AboutSection.css';

export default function AboutSection() {
  const headerRef = useScrollAnimation<HTMLDivElement>();
  const gridRef = useScrollAnimation<HTMLDivElement>(0.1);
  const quoteRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="about section" id="nosotros">
      <div className="container">
        <div ref={headerRef} className="about__header fade-in">
          <span className="about__overline">Nuestra Historia</span>
          <h2 className="about__title">
            Desde las montañas de <span className="about__highlight">Nariño</span> hasta tu taza
          </h2>
          <p className="about__subtitle">
            En las remotas y fértiles tierras de El Macal, Colón, Nariño, donde la neblina
            abraza los cafetales y la tierra guarda la herencia de las montañas andinas,
            nace este café de altura.
          </p>
        </div>

        <div ref={gridRef} className="about__grid stagger-children">
          <div className="about__card">
            <div className="about__card-icon">🌋</div>
            <h3 className="about__card-title">Tierra Volcánica</h3>
            <p className="about__card-text">
              Nuestro café crece en suelos volcánicos ricos en minerales, lo que le
              otorga un perfil de sabor único y complejo.
            </p>
          </div>

          <div className="about__card">
            <div className="about__card-icon">⛰️</div>
            <h3 className="about__card-title">Altitud 2.000+ m</h3>
            <p className="about__card-text">
              Cultivado a más de 2.000 metros sobre el nivel del mar, donde las
              condiciones climáticas permiten una maduración lenta del grano.
            </p>
          </div>

          <div className="about__card">
            <div className="about__card-icon">👨‍🌾</div>
            <h3 className="about__card-title">Tradición Familiar</h3>
            <p className="about__card-text">
              Directamente de la finca de nuestra familia. Cada grano es resultado
              de un compromiso generacional con la calidad.
            </p>
          </div>

          <div className="about__card">
            <div className="about__card-icon">🌱</div>
            <h3 className="about__card-title">Variedad Castillo</h3>
            <p className="about__card-text">
              Variedad reconocida por su resistencia y excelente calidad en taza
              con notas dulces y balanceadas.
            </p>
          </div>
        </div>

        <div ref={quoteRef} className="about__quote scale-in">
          <div className="about__quote-mark">"</div>
          <blockquote className="about__blockquote">
            Más que café, esta es la esencia de una tierra que da a nuestro compromiso
            y de un producto donde la montaña lo convierte en único.
          </blockquote>
          <p className="about__quote-source">
            — Familia Bolaños, El Macal, Nariño
          </p>
        </div>
      </div>
    </section>
  );
}
