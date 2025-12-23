const Contact = () => {
  return (
    <section
      id="contact"
      className="snap-section min-h-screen grid grid-rows-[1fr_auto]"
    >
      {/* Perfectly centered content (true viewport center) */}
      <div className="grid place-items-center">
        <div className="container">
          <div className="max-w-lg">
            <h2 className="text-2xl mb-6">get in touch</h2>

            <p className="text-muted-foreground mb-6">
              interested in working together, have a question, or just want to say
              hello? shoot a message and i'll get back to you.
            </p>

            <a
              href="mailto:iamdanishverma@gmail.com"
              className="inline-flex items-center gap-2 text-accent hover:underline"
            >
              iamdanishverma@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Footer (normal flow, bottom of page) */}
      <footer className="bg-background relative isolate">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 pb-20 sm:pb-12 lg:px-8">
          <p className="mt-4 flex items-center justify-center text-center text-xs leading-5 text-muted-foreground gap-1">
            made with
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 fill-cyan-400"
              aria-hidden="true"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.18 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
            by danish. check out the
            <a
              href="https://github.com/danishistired/teamfiwebsite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              source code
            </a>
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
