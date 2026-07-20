import { useState } from 'react';
import { WHATSAPP_CONFIG } from 'modules/shared/constants';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <div className="container header__container">
        <a href="#" className="header__logo">
          <span className="header__logo-icon">☕</span>
          <span className="header__logo-text">El Macal</span>
        </a>

        <button
          className="header__menu-toggle"
          onClick={toggleMenu}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span className={`header__hamburger ${menuOpen ? 'header__hamburger--open' : ''}`} />
        </button>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <a href="#inicio" className="header__link" onClick={() => setMenuOpen(false)}>
            Inicio
          </a>
          <a href="#nosotros" className="header__link" onClick={() => setMenuOpen(false)}>
            Nosotros
          </a>
          <a href="#producto" className="header__link" onClick={() => setMenuOpen(false)}>
            Producto
          </a>
          <a href="#contacto" className="header__link" onClick={() => setMenuOpen(false)}>
            Contacto
          </a>
          <a
            href={WHATSAPP_CONFIG.getUrl('order')}
            target="_blank"
            rel="noopener noreferrer"
            className="header__cta"
            onClick={() => setMenuOpen(false)}
          >
            Pedir Ahora
          </a>
        </nav>
      </div>
    </header>
  );
}
