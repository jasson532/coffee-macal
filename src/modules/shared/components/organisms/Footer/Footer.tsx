import { SITE_INFO, WHATSAPP_CONFIG } from 'modules/shared/constants';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <h3 className="footer__brand-name">☕ {SITE_INFO.name}</h3>
            <p className="footer__brand-description">
              {SITE_INFO.description}
            </p>
          </div>

          <div className="footer__section">
            <h4 className="footer__heading">Navegación</h4>
            <nav className="footer__links">
              <a href="#inicio" className="footer__link">Inicio</a>
              <a href="#nosotros" className="footer__link">Nosotros</a>
              <a href="#producto" className="footer__link">Producto</a>
              <a href="#contacto" className="footer__link">Contacto</a>
            </nav>
          </div>

          <div className="footer__section">
            <h4 className="footer__heading">Contacto</h4>
            <div className="footer__contact-item">
              <span>📍</span>
              <span>{SITE_INFO.origin}</span>
            </div>
            <div className="footer__contact-item">
              <span>📞</span>
              <span>{SITE_INFO.contact.phone}</span>
            </div>
            <div className="footer__contact-item">
              <span>👤</span>
              <span>{SITE_INFO.contact.name}</span>
            </div>
          </div>
        </div>

        <hr className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} {SITE_INFO.name}. Todos los derechos reservados.
          </p>
          <div className="footer__social">
            <a
              href={WHATSAPP_CONFIG.getUrl('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="WhatsApp"
            >
              💬
            </a>
            <a
              href={SITE_INFO.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Instagram"
            >
              📷
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
