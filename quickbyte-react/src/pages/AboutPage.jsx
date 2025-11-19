import "../styles.css";

export default function AboutPage() {
  return (
    <div className="about-container">
      <section className="aboutparallax-hero">
        <div className="parallax-overlay">
          <h1>Who We Are 🍔</h1>
          <p>Food isn’t just fuel — it’s happiness in a box 😋</p>
        </div>
      </section>

      <section className="about-section">
        <h2>Our Story 📖</h2>
        <p>
          QuickByte was born out of one late-night hunger crisis. What started
          with a pizza rescue mission has grown into India’s go-to app for
          cravings of all kinds — from momos to milkshakes.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Promise 🤝</h2>
        <p>
          We don’t just deliver food; we deliver joy. Every order comes with
          lightning-fast service, top-notch quality, and menus so tempting
          they’ll make you want to lick the screen (please don’t 😅).
        </p>
      </section>

      <section className="parallax-divider">
        <div className="parallax-overlay">
          <h2>Delivering smiles, one byte at a time 😋</h2>
        </div>
      </section>

      <section className="about-section">
        <h2>The Cravings Journey 🚀</h2>
        <ul className="fun-timeline">
          <li>2019 → One hungry night, one big idea 🍕</li>
          <li>2020 → First 1,000 happy tummies 🎂</li>
          <li>2023 → Became India’s #1 snack savior 🥡</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>What’s Cooking Next? 🔮</h2>
        <p>
          Drone deliveries? Maybe 🚁 <br />
          Teleporting your food? We’re working on it 😉 <br />
          One thing’s for sure — your cravings will always be our top priority!
        </p>
      </section>

      <section className="about-section">
        <h2>Love from Our Foodies ❤️</h2>
        <blockquote>“QuickByte saved my midnight exam prep 🍜💻”</blockquote>
        <blockquote>“Best fries ever. Period. 🍟✨”</blockquote>
      </section>
    </div>
  );
}


