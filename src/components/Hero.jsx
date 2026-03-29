import { useState, useEffect, useRef } from "react";
import "./Hero.css";

function Hero() {
  const slides = [
    {
      image: "/images/1.png",
      tag: "Superfood Collection",
      title: "Amanttra Organic Superfoods",
      highlight: "Organic Superfoods",
      text: "Pure, natural & chemical-free nutrition for a healthy life.",
      badge: "🌿 100% Organic",
    },
    {
      image: "/images/2.png",
      tag: "Immunity Boosters",
      title: "Boost Your Immunity Naturally",
      highlight: "Immunity",
      text: "Packed with nutrients from real organic ingredients.",
      badge: "💚 Chemical Free",
    },
    {
      image: "/images/3.png",
      tag: "Nature's Best",
      title: "Feel the Power of Nature",
      highlight: "Power of Nature",
      text: "Fresh, clean, and made with love for your wellness.",
      badge: "🌱 Farm to Table",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      goNext();
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const goNext = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setAnimating(false);
    }, 500);
  };

  const goPrev = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setAnimating(false);
    }, 500);
  };

  const goToSlide = (i) => {
    if (animating || i === currentIndex) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(i);
      setAnimating(false);
    }, 500);
    startTimer();
  };

  const slide = slides[currentIndex];

  const renderTitle = (title, highlight) => {
    const parts = title.split(highlight);
    return parts.map((part, i) =>
      i < parts.length - 1 ? (
        <span key={i}>
          {part}
          <em className="hero-highlight">{highlight}</em>
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <section className="hero">
      {/* Backgrounds */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`hero-bg ${i === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${s.image})` }}
        />
      ))}

      {/* Overlays */}
      <div className="hero-overlay" />
      <div className="hero-grain" />

      {/* Decorative corner accents */}
      <div className="corner corner-tl" />
      <div className="corner corner-br" />

      {/* Content */}
      <div className={`hero-content ${animating ? "fade-out" : "fade-in"}`}>
        <span className="hero-tag">{slide.tag}</span>

        <h1 className="hero-title">
          {renderTitle(slide.title, slide.highlight)}
        </h1>

        <p className="hero-text">{slide.text}</p>

        <div className="hero-actions">
          <button className="btn-primary">
            Shop Now
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="btn-secondary">Learn More</button>
        </div>

        <div className="hero-badge">{slide.badge}</div>
      </div>

      {/* Arrows */}
      <button className="arrow arrow-left" onClick={() => { goPrev(); startTimer(); }} aria-label="Previous">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
          <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button className="arrow arrow-right" onClick={() => { goNext(); startTimer(); }} aria-label="Next">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Footer: counter + dots + progress */}
      <div className="hero-footer">
        <span className="slide-counter">
          <strong>{String(currentIndex + 1).padStart(2, "0")}</strong>
          <span className="divider">/</span>
          {String(slides.length).padStart(2, "0")}
        </span>

        <div className="dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="hero-progress">
        <div className="hero-progress-fill" key={currentIndex} />
      </div>
    </section>
  );
}

export default Hero;