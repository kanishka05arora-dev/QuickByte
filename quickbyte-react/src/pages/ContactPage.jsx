import "../styles.css";

export default function ContactPage() {
  return (
    <div className="contact-container">
      <h1>Let’s Taco ’Bout It 🌮</h1>
      <p className="contact-subtitle">
        Got a question, craving, or just wanna say hi? Slide into our inbox or
        drop us a DM on social — we promise we don’t bite (unless it’s pizza
        🍕). We’ll get back to you faster than your food delivery!
      </p>

      <div className="contact-wrapper">
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            window.alert("Thanks for reaching out! We’ll reply soon.");
            e.currentTarget.reset();
          }}
        >
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required />
          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <h3>QuickByte HQ</h3>
          <p>📍 123 Food Street, Dehradun, India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ support@quickbyte.com</p>
          <h4>Follow us:</h4>
          <p>🌐 Facebook | Instagram | Twitter</p>
        </div>
      </div>
    </div>
  );
}


