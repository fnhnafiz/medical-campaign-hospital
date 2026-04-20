function EmergencyHotline() {
  return (
    <section className="relative bg-red-600 py-14 px-4 overflow-hidden container mx-auto rounded-2xl">
      {/* Decorative background circles */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-red-500/40 pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-red-500/40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-500/20 pointer-events-none" />

      <div className="relative z-10 px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left — Text content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 flex-1">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-red-500/50 border border-red-400/40 text-red-100 text-xs font-medium px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-200 animate-pulse" />
              Always available
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              24/7 Emergency <br className="hidden sm:block" />
              <span className="text-red-200">Service Available</span>
            </h2>

            <p className="text-red-100/80 text-sm md:text-base leading-relaxed max-w-md">
              Our emergency response team is available around the clock. Don't
              wait — if you or someone you know needs urgent medical attention,
              contact us immediately.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-1">
              {[
                "Rapid Response",
                "Trained Paramedics",
                "Free First Aid Advice",
              ].map((f) => (
                <span
                  key={f}
                  className="flex items-center gap-1.5 bg-red-500/40 border border-red-400/30 text-red-100 text-xs px-3 py-1.5 rounded-full"
                >
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Call card */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 flex flex-col items-center gap-5 w-full max-w-sm flex-shrink-0">
            {/* Animated phone icon */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
              <div className="relative w-16 h-16 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.82 19.79 19.79 0 01.07 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
                </svg>
              </div>
            </div>

            {/* Number */}
            <div className="text-center">
              <p className="text-red-200 text-xs font-medium uppercase tracking-widest mb-1">
                Emergency Hotline
              </p>
              <p className="text-white text-3xl font-bold tracking-wide">
                +880 1234-567890
              </p>
            </div>

            {/* Call Now button */}

            <a
              href="tel:+8801234567890"
              className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-red-50 text-red-600 font-bold text-base py-3.5 rounded-xl transition-colors duration-150 group"
            >
              <svg
                className="w-5 h-5 group-hover:animate-bounce"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.82 19.79 19.79 0 01.07 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
              </svg>
              Call Now
            </a>

            {/* Secondary action */}
            <p className="text-red-200/70 text-xs text-center">
              Or chat with our team on{" "}
              <a
                href="#"
                className="text-red-100 underline underline-offset-2 hover:text-white transition-colors"
              >
                WhatsApp
              </a>
            </p>
          </div>
        </div>

        {/* Bottom info strip */}
        <div className="mt-10 pt-6 border-t border-red-500/40 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🕐", label: "Response Time", value: "< 5 Minutes" },
            { icon: "🚑", label: "Ambulances", value: "24 Active Units" },
            { icon: "🏥", label: "Partner Hospitals", value: "18 Centers" },
            { icon: "👨‍⚕️", label: "On-Call Doctors", value: "Always Ready" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-red-200 text-[10px] uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="text-white text-sm font-semibold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EmergencyHotline;
