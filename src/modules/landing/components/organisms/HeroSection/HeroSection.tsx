import { useState, useRef, useCallback, useEffect } from 'react';
import { WHATSAPP_CONFIG, SITE_INFO } from 'modules/shared/constants';
import CoffeeParticles from 'modules/shared/components/atoms/CoffeeParticles';
import './HeroSection.css';

interface MediaSlide {
  type: 'video' | 'image';
  src: string;
}

const SLIDES: MediaSlide[] = [
  { type: 'video', src: '/video/hero-bg-1.mp4' },
  { type: 'video', src: '/video/hero-bg-2.mp4' },
  { type: 'video', src: '/video/hero-bg-3.mp4' },
];

const IMAGE_DURATION = 4000; // 4s para la imagen
const VIDEO_DURATION = 4000; // 4s para cada video

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToNext = useCallback(() => {
    const next = (activeIndex + 1) % SLIDES.length;
    setNextIndex(next);

    // Crossfade: after transition completes, swap
    setTimeout(() => {
      setActiveIndex(next);
      setNextIndex(null);
    }, 800); // match CSS transition duration
  }, [activeIndex]);

  const handleVideoEnd = useCallback(() => {
    // Videos now controlled by timer, not by end event
  }, []);

  // When active slide is an image OR video, auto-advance after duration
  useEffect(() => {
    const slide = SLIDES[activeIndex];
    const duration = slide.type === 'image' ? IMAGE_DURATION : VIDEO_DURATION;
    timeoutRef.current = setTimeout(goToNext, duration);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeIndex, goToNext]);

  // Play the active video when it becomes active
  useEffect(() => {
    const slide = SLIDES[activeIndex];
    if (slide.type === 'video') {
      const video = videoRefs.current[activeIndex];
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {/* autoplay blocked */});
      }
    }
  }, [activeIndex]);

  return (
    <section className="hero" id="inicio">
      {/* Background media slides */}
      <div className="hero__media-slider">
        {SLIDES.map((slide, index) => {
          const isActive = index === activeIndex;
          const isNext = index === nextIndex;
          const isVisible = isActive || isNext;

          return (
            <div
              key={index}
              className={`hero__slide ${isActive ? 'hero__slide--active' : ''} ${isNext ? 'hero__slide--next' : ''}`}
            >
              {slide.type === 'video' ? (
                <video
                  ref={el => { videoRefs.current[index] = el; }}
                  className="hero__media"
                  muted
                  playsInline
                  onEnded={isActive ? handleVideoEnd : undefined}
                  preload={isVisible ? 'auto' : 'none'}
                >
                  <source src={slide.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  className="hero__media"
                  src={slide.src}
                  alt="Cafetales de Nariño"
                  loading="eager"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Overlay */}
      <div className="hero__overlay" />

      {/* Partículas */}
      <CoffeeParticles variant="hero" density={0.7} />

      {/* Slide indicators */}
      <div className="hero__indicators">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            className={`hero__indicator ${index === activeIndex ? 'hero__indicator--active' : ''}`}
            aria-label={`Slide ${index + 1}`}
            onClick={() => {
              setNextIndex(index);
              setTimeout(() => {
                setActiveIndex(index);
                setNextIndex(null);
              }, 800);
            }}
          />
        ))}
      </div>

      <div className="container hero__container">
        <div className="hero__content">
          <h1 className="hero__title">
            Café <span className="hero__title-highlight">El Macal</span>
          </h1>
          <p className="hero__tagline">{SITE_INFO.tagline}</p>
          <p className="hero__description">
            Directamente de nuestra finca familiar en las montañas de Nariño.
            Cultivado a más de 2.000 metros, donde el suelo volcánico y la
            tradición andina se unen para crear un café excepcional.
          </p>
          <div className="hero__actions">
            <a
              href={WHATSAPP_CONFIG.getUrl('order')}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__btn hero__btn--primary"
            >
              <span className="hero__btn-icon">🛒</span>
              Pedir Ahora — {SITE_INFO.price}
            </a>
            <a href="#nosotros" className="hero__btn hero__btn--secondary">
              Conoce Nuestra Historia ↓
            </a>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-value">2.000+</span>
              <span className="hero__stat-label">m.s.n.m.</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">Castillo</span>
              <span className="hero__stat-label">Variedad</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">425g</span>
              <span className="hero__stat-label">Peso neto</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">Nariño</span>
              <span className="hero__stat-label">Origen</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span>Descubre más</span>
        <div className="hero__scroll-arrow" />
      </div>
    </section>
  );
}
