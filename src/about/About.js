import React from "react";

import "./about.scss";

export const About = () => {
  return (
    <div className="principalAbout">
      <section className="aboutUp">
        <div className="logo">
          <img src="/images/BasketManiawhitelow.png" alt="" />
        </div>
        <div>
          <article>
            <p>Nombre del Club: </p>
            <p className="info">CLUB BALONCESTO BASKETMANIA</p>
          </article>
          <article>
            <p>Domicilio Social: </p>
            <p className="info">CL. Doctor Sainz Pardo 45. CP 29011. Málaga.</p>
          </article>
          <article>
            <p>Registro Municipal: </p>
            <p className="info">01175</p>
          </article>
          <article>
            <p>CIF: </p>
            <p className="info">G92085307</p>
          </article>
          <article>
            <p>Email: </p>
            <p className="info">basketmaniamalaga@yahoo.es</p>
          </article>
        </div>
      </section>
      <section>
        <div className="rrss">
          <a
            href="https://www.facebook.com/basketmania.lapalmilla.3"
            target="_blank"
          >
            <img src="/images/fb.png" alt="" />
          </a>
          <a href="https://www.instagram.com/Basketmanialp/" target="_blank">
            <img src="/images/in.png" alt="" />
          </a>
        </div>
      </section>
    </div>
  );
};
