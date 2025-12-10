const Contact = () => {
  return (
    <section id="contact" className="snap-section flex items-center py-20">
      <div className="container">
        <div className="max-w-lg">
          <h2 className="text-2xl mb-6">get in touch</h2>
          
          <p className="text-muted-foreground mb-6">
            interested in working together, have a question, or just want to say hello? 
            drop a message and we'll get back to you.
          </p>
          
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 text-accent hover:underline"
          >
            hello@example.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
