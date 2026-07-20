import { WHATSAPP_CONFIG, SITE_INFO } from 'modules/shared/constants';
import { useScrollAnimation } from 'modules/shared/hooks/useScrollAnimation';
import CoffeeParticles from 'modules/shared/components/atoms/CoffeeParticles';
import productFront from '../../../../../assets/image/product-front.jpeg';
import productBack from '../../../../../assets/image/product-back.jpeg';
import './ProductSection.css';

export default function ProductSection() {
  const headerRef = useScrollAnimation<HTMLDivElement>();
  const layoutRef = useScrollAnimation<HTMLDivElement>(0.1);

  return (
    <section className="product section" id="producto">
      <CoffeeParticles variant="ambient" density={0.5} />
      <div className="container">
        <div ref={headerRef} className="product__header fade-in">
          <span className="product__overline">Nuestro Producto</span>
          <h2 className="product__title">Café El Macal — {SITE_INFO.weight}</h2>
          <p className="product__subtitle">Cada bolsa es una experiencia directa desde la montaña</p>
        </div>

        <div ref={layoutRef} className="product__layout fade-in">
          <div className="product__image-wrapper">
            <div className="product__flip-card">
              <div className="product__flip-inner">
                <div className="product__flip-front">
                  <img src={productFront} alt="Café El Macal - Frente" className="product__flip-img" />
                </div>
                <div className="product__flip-back">
                  <img src={productBack} alt="Café El Macal - Información" className="product__flip-img" />
                </div>
              </div>
            </div>
          </div>

          <div className="product__info">
            <div className="product__features">
              <div className="product__feature">
                <span className="product__feature-icon">🏔️</span>
                <div className="product__feature-text">
                  <span className="product__feature-title">Origen único</span>
                  <span className="product__feature-desc">
                    Finca familiar en El Macal, Colón, Nariño
                  </span>
                </div>
              </div>
              <div className="product__feature">
                <span className="product__feature-icon">☕</span>
                <div className="product__feature-text">
                  <span className="product__feature-title">Café de especialidad</span>
                  <span className="product__feature-desc">
                    100% colombiano, cosecha selecta manual
                  </span>
                </div>
              </div>
              <div className="product__feature">
                <span className="product__feature-icon">🌿</span>
                <div className="product__feature-text">
                  <span className="product__feature-title">Proceso artesanal</span>
                  <span className="product__feature-desc">
                    Secado al sol, tostión media-alta para resaltar notas
                  </span>
                </div>
              </div>
              <div className="product__feature">
                <span className="product__feature-icon">📦</span>
                <div className="product__feature-text">
                  <span className="product__feature-title">Empaque sellado</span>
                  <span className="product__feature-desc">
                    {SITE_INFO.weight} con válvula de aroma y sellado hermético
                  </span>
                </div>
              </div>
            </div>

            <div className="product__price-card">
              <div className="product__price-top">
                <p className="product__price-label">Precio por unidad</p>
                <p className="product__price-value">$38<span className="product__price-cents">.000</span></p>
                <p className="product__price-unit">COP / {SITE_INFO.weight}</p>
              </div>
              <a
                href={WHATSAPP_CONFIG.getUrl('order')}
                target="_blank"
                rel="noopener noreferrer"
                className="product__price-btn"
              >
                <span>🛒</span>
                Pedir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
