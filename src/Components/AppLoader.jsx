import { useEffect, useState } from "react";

const AppLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2600);
    const hideTimer = setTimeout(() => setLoading(false), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (loading) {
    return (
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-emerald-50 overflow-hidden transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Background medical cross decorations */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#059669" strokeWidth="1.5" opacity="0.1">
            <line x1="80" y1="60" x2="80" y2="100"/><line x1="60" y1="80" x2="100" y2="80"/>
            <line x1="700" y1="120" x2="700" y2="160"/><line x1="680" y1="140" x2="720" y2="140"/>
            <line x1="120" y1="500" x2="120" y2="540"/><line x1="100" y1="520" x2="140" y2="520"/>
            <line x1="680" y1="460" x2="680" y2="500"/><line x1="660" y1="480" x2="700" y2="480"/>
            <line x1="400" y1="30" x2="400" y2="70"/><line x1="380" y1="50" x2="420" y2="50"/>
            <circle cx="200" cy="150" r="40" fill="none"/>
            <circle cx="600" cy="450" r="30" fill="none"/>
            <circle cx="100" cy="350" r="18" fill="none"/>
            <circle cx="720" cy="280" r="22" fill="none"/>
          </g>
        </svg>

        {/* Animated ring + logo */}
        <div className="relative w-28 h-28 mb-6" style={{ animation: "float 3s ease-in-out infinite" }}>
          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500"
            style={{ animation: "pulseRing 2s ease-out infinite" }} />
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500"
            style={{ animation: "pulseRing 2s ease-out infinite 0.6s" }} />
          {/* Track */}
          <div className="absolute inset-2 rounded-full border-[3px] border-emerald-100" />
          {/* Spinner */}
          <div className="absolute inset-2 rounded-full border-[3px] border-transparent border-t-emerald-600 border-r-emerald-400"
            style={{ animation: "spin 1.1s linear infinite" }} />
          {/* Center logo */}
          <div className="absolute inset-5 rounded-full bg-white border border-emerald-200 flex items-center justify-center">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"
              style={{ animation: "heartbeat 2s ease-in-out infinite" }}>
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
        </div>

        {/* Brand */}
        <div className="text-center mb-7" style={{ animation: "fadeInUp 0.7s ease 0.2s both" }}>
          <h1 className="text-3xl font-bold text-emerald-900 tracking-widest uppercase">
            Med<span className="font-normal text-emerald-400">Camp</span>
          </h1>
          <p className="text-xs text-emerald-400 tracking-[0.18em] uppercase mt-1">
            Healthcare for everyone
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-52 mb-5" style={{ animation: "fadeInUp 0.7s ease 0.4s both" }}>
          <div className="h-[3px] bg-emerald-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
              style={{ animation: "progress 2.8s ease-in-out forwards" }}
            />
          </div>
        </div>

        {/* Loading text + dots */}
        <div className="flex flex-col items-center gap-2" style={{ animation: "fadeInUp 0.7s ease 0.5s both" }}>
          <p className="text-xs text-gray-400 tracking-wide">Preparing your experience</p>
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                style={{ animation: `dotBounce 1.4s ease-in-out infinite ${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div
          className="flex items-center gap-5 mt-6"
          style={{ animation: "fadeInUp 0.7s ease 0.6s both" }}
        >
          {[
            { num: "12K+", label: "Volunteers" },
            { num: "2M+", label: "Lives touched" },
            { num: "85", label: "Countries" },
          ].map((s, i, arr) => (
            <div key={s.label} className="flex items-center gap-5">
              <div className="text-center">
                <p className="text-base font-bold text-emerald-900 leading-none">{s.num}</p>
                <p className="text-[10px] text-emerald-400 uppercase tracking-wider mt-1">{s.label}</p>
              </div>
              {i < arr.length - 1 && <div className="w-px h-8 bg-emerald-200" />}
            </div>
          ))}
        </div>

        {/* Keyframe styles */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes pulseRing {
            0% { transform: scale(1); opacity: 0.6; }
            70%, 100% { transform: scale(1.6); opacity: 0; }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            15% { transform: scale(1.2); }
            30% { transform: scale(1); }
          }
          @keyframes progress {
            from { width: 0%; }
            to { width: 100%; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes dotBounce {
            0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
            40% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return children;
};

export default AppLoader;