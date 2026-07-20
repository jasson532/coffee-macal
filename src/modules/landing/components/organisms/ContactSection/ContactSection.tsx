import { WHATSAPP_CONFIG, SITE_INFO } from 'modules/shared/constants';
import { useScrollAnimation } from 'modules/shared/hooks/useScrollAnimation';
import './ContactSection.css';

export default function ContactSection() {
  const headerRef = useScrollAnimation<HTMLDivElement>();
  const gridRef = useScrollAnimation<HTMLDivElement>(0.1);
  const infoRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="contact section" id="contacto">
      <div className="container">
        <div ref={headerRef} className="contact__header fade-in">
          <span className="contact__overline">Contáctanos</span>
          <h2 className="contact__title">¿Listo para probar el mejor café de Nariño?</h2>
          <p className="contact__subtitle">
            Pide tu Café El Macal directamente por WhatsApp. Envíos a toda Colombia.
          </p>
        </div>

        <div ref={gridRef} className="contact__grid stagger-children">
          <a
            href={WHATSAPP_CONFIG.getUrl('order')}
            target="_blank"
            rel="noopener noreferrer"
            className="contact__card contact__card--primary"
          >
            <span className="contact__card-icon">🛒</span>
            <h3 className="contact__card-title">Hacer Pedido</h3>
            <p className="contact__card-text">
              Pide tu café directamente. Envíos a toda Colombia.
            </p>
            <span className="contact__card-action">Escribir por WhatsApp →</span>
          </a>

          <a
            href={WHATSAPP_CONFIG.getUrl('wholesale')}
            target="_blank"
            rel="noopener noreferrer"
            className="contact__card"
          >
            <span className="contact__card-icon">📦</span>
            <h3 className="contact__card-title">Compra al por Mayor</h3>
            <p className="contact__card-text">
              Precios especiales para tiendas, restaurantes y cafés.
            </p>
            <span className="contact__card-action">Consultar precios →</span>
          </a>

          <a
            href={WHATSAPP_CONFIG.getUrl('info')}
            target="_blank"
            rel="noopener noreferrer"
            className="contact__card"
          >
            <span className="contact__card-icon">🌱</span>
            <h3 className="contact__card-title">Más Información</h3>
            <p className="contact__card-text">
              Conoce sobre nuestro proceso, origen y certificaciones.
            </p>
            <span className="contact__card-action">Saber más →</span>
          </a>
        </div>

        <div ref={infoRef} className="contact__info scale-in">
          <div className="contact__info-item">
            <span className="contact__info-icon">📍</span>
            <div className="contact__info-text">
              <span className="contact__info-label">Origen</span>
              <span className="contact__info-value">{SITE_INFO.origin}</span>
            </div>
          </div>
          <div className="contact__info-divider" />
          <div className="contact__info-item">
            <span className="contact__info-icon">📞</span>
            <div className="contact__info-text">
              <span className="contact__info-label">Teléfono</span>
              <span className="contact__info-value">{SITE_INFO.contact.phone}</span>
            </div>
          </div>
          <div className="contact__info-divider" />
          <div className="contact__info-item">
            <span className="contact__info-icon">👤</span>
            <div className="contact__info-text">
              <span className="contact__info-label">Contacto</span>
              <span className="contact__info-value">{SITE_INFO.contact.name}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
