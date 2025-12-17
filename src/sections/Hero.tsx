// src/sections/Hero.tsx
import React from "react";
import { HERO_IMAGE, STATS } from "../data/content";
import { formatMoney } from "../utils/format";
import { scrollToId } from "../utils/scroll";

export function Hero({
  onBook,
  onBookFade,
}: {
  onBook: () => void;
  onBookFade: () => void;
}) {
  return (
    <section className="hero hero--light">
      <div className="container hero__grid">
        <div className="hero__left">
          <div className="hero__badgeRow">
            <span className="pill">NYC barbershop</span>
            <span className="pill">Walk-ins welcome</span>
            <span className="pill">Clean finish</span>
          </div>

          <h1 className="hero__h1 hero__h1--light">
            Look sharp in NYC.
            <span className="hero__accent hero__accent--light">
              {" "}
              Book in seconds.
            </span>
          </h1>

          <p className="hero__p">
            Premium cuts, fades, and beard sculpting—built for busy New Yorkers.
            Clean booking, clear pricing, and a calm experience.
          </p>

          <div className="hero__ctaRow">
            <button className="btn btn--primary btn--lg" onClick={onBook}>
              Book your appointment
            </button>
            <button
              className="btn btn--lg"
              onClick={() => scrollToId("services")}
            >
              Explore services
            </button>
          </div>

          <div className="hero__trust hero__trust--light">
            {STATS.map((s) => (
              <div className="trust trust--light" key={s.label}>
                <div className="trust__value">{s.value}</div>
                <div className="trust__label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="hero__micro">
            <span className="muted">Address:</span> 123 Lafayette St, New York,
            NY ·{" "}
            <a
              className="inlineLink"
              href="https://www.google.com/maps/search/?api=1&query=123+Lafayette+St+New+York+NY"
              target="_blank"
              rel="noreferrer noopener"
            >
              Open in Maps
            </a>
          </div>
        </div>

        <div className="hero__right">
          <div className="heroMediaCard">
            <img
              className="heroMediaCard__img"
              src={HERO_IMAGE}
              alt="Fresh skin fade"
            />
            <div className="heroMediaCard__info">
              <div className="strong">Most booked today</div>
              <div className="muted">Skin Fade · from {formatMoney(55)}</div>
              <button className="btn btn--primary btn--sm" onClick={onBookFade}>
                Book a fade
              </button>
            </div>
          </div>

          <div className="heroMiniGrid">
            <div className="miniCard">
              <div className="miniCard__title">Fast booking</div>
              <div className="muted">Choose service · pick time · done</div>
            </div>
            <div className="miniCard">
              <div className="miniCard__title">Real barbers</div>
              <div className="muted">Specialists for fades & beards</div>
            </div>
            <div className="miniCard">
              <div className="miniCard__title">Clear pricing</div>
              <div className="muted">No surprises at checkout</div>
            </div>
            <div className="miniCard">
              <div className="miniCard__title">Mobile-first</div>
              <div className="muted">Simple, thumb-friendly UI</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
