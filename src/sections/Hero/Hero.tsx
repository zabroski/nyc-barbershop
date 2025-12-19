// import React from "react";
import { HERO_IMAGE } from "../../data/content";
import { formatMoney } from "../../utils/format";
import { scrollToId } from "../../utils/scroll";
import "./Hero.css";

export function Hero({
  onBook,
  onBookFade,
}: {
  onBook: () => void;
  onBookFade: () => void;
}) {
  return (
    <section className="heroV2" aria-label="Hero">
      <div className="heroV2__bg" aria-hidden="true" />
      <div className="heroV2__gridlines" aria-hidden="true" />

      <div className="container heroV2__container">
        <div className="heroV2__grid">
          {/* LEFT */}
          <div className="heroV2__left">
            <div className="heroV2__badges">
              <span className="pill">Harlem barbershop</span>
              <span className="pill">Walk-ins welcome</span>
              <span className="pill">Clean finish</span>
            </div>

            <h1 className="heroV2__h1">
              Look sharp in <span className="heroV2__accent">NYC</span>.
              <br />
              <span className="heroV2__subhead">Book in seconds.</span>
            </h1>

            {/* <p className="heroV2__p">
              Premium cuts, fades, and beard sculpting—built for busy New
              Yorkers. Clear pricing, clean results, calm experience.
            </p> */}

            <div className="heroV2__ctaRow">
              <button className="btn btn--primary btn--lg" onClick={onBook}>
                Book your appointment
              </button>

              <button
                className="btn btn--lg"
                onClick={() => scrollToId("services")}
              >
                View services
              </button>

              <a className="heroV2__call" href="tel:+12125550123">
                <span className="heroV2__callDot" aria-hidden="true" />
                Call now
              </a>
            </div>

            {/* <div className="heroV2__stats" aria-label="Shop stats">
              {STATS.map((s) => (
                <div className="heroV2__stat" key={s.label}>
                  <div className="heroV2__statValue">{s.value}</div>
                  <div className="heroV2__statLabel">{s.label}</div>
                </div>
              ))}
            </div> */}

            <div className="heroV2__micro">
              <span className="muted">Address:</span> 2273 7th AVE, New York, NY{" "}
              ·{" "}
              <a
                className="inlineLink"
                href="https://www.google.com/maps/@40.814454,-73.9442016,3a,75y,119.22h,90t/data=!3m7!1e1!3m5!1sgGnZYbfTibTJz7zUxpVy4w!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DgGnZYbfTibTJz7zUxpVy4w%26yaw%3D119.22!7i16384!8i8192?entry=ttu"
                target="_blank"
                rel="noreferrer noopener"
              >
                Open in Maps
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="heroV2__right">
            <div className="heroV2__media">
              <img
                src={HERO_IMAGE}
                alt="Fresh skin fade"
                className="heroV2__img"
                loading="eager"
              />

              <div className="heroV2__glass">
                <div className="heroV2__glassTop">
                  <div>
                    <div className="heroV2__glassKicker">Most booked today</div>
                    <div className="heroV2__glassTitle">Skin Fade</div>
                    <div className="heroV2__glassMeta">
                      from {formatMoney(30)} · 30–40 min
                    </div>
                  </div>

                  <button
                    className="btn btn--primary btn--sm"
                    onClick={onBookFade}
                  >
                    Book a fade
                  </button>
                </div>

                <div className="heroV2__quick">
                  <div className="heroV2__quickItem">
                    <span className="heroV2__check" aria-hidden="true">
                      ✓
                    </span>
                    Same-day slots
                  </div>
                  <div className="heroV2__quickItem">
                    <span className="heroV2__check" aria-hidden="true">
                      ✓
                    </span>
                    All hair types
                  </div>
                  <div className="heroV2__quickItem">
                    <span className="heroV2__check" aria-hidden="true">
                      ✓
                    </span>
                    Clean finish
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="heroV2__fade" aria-hidden="true" />
    </section>
  );
}
