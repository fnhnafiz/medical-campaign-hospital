import { useState } from "react";
import toast from "react-hot-toast";
import { FaHandHoldingHeart, FaPeopleCarry, FaShareAlt, FaTimes } from "react-icons/fa";

// ─── Donate Modal ───────────────────────────────────────────
const DonateModal = ({ onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", amount: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thanks for your donation! 🙏");
    onClose();
  };

  return (
    <ModalWrapper onClose={onClose} title="Make a Donation" icon={<FaHandHoldingHeart className="text-emerald-500 text-2xl" />}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Full Name" placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <Field label="Email Address" type="email" placeholder="john@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Donation Amount</label>
          <div className="flex gap-2 mb-2">
            {["10", "25", "50", "100"].map(amt => (
              <button key={amt} type="button"
                onClick={() => setForm({ ...form, amount: amt })}
                className={`flex-1 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${
                  form.amount === amt
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>
          <input
            type="number" placeholder="Or enter custom amount ($)"
            value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400"
          />
        </div>
        <Field label="Message (Optional)" placeholder="Leave a kind message..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} textarea />
        <SubmitBtn label="Donate Now 💚" />
      </form>
    </ModalWrapper>
  );
};

// ─── Volunteer Modal ─────────────────────────────────────────
const VolunteerModal = ({ onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", skills: "", availability: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Welcome to the team! 🎉");
    onClose();
  };

  return (
    <ModalWrapper onClose={onClose} title="Join as Volunteer" icon={<FaPeopleCarry className="text-emerald-500 text-2xl" />}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Full Name" placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <Field label="Email Address" type="email" placeholder="john@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        <Field label="Phone Number" type="tel" placeholder="+880 1XXX-XXXXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Availability</label>
          <select
            value={form.availability}
            onChange={e => setForm({ ...form, availability: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-emerald-400"
            required
          >
            <option value="">Select availability</option>
            <option>Weekdays</option>
            <option>Weekends</option>
            <option>Full Time</option>
            <option>Flexible</option>
          </select>
        </div>
        <Field label="Skills / Experience" placeholder="e.g. First aid, Nursing, Admin..." value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} textarea />
        <SubmitBtn label="Join as Volunteer 🤝" />
      </form>
    </ModalWrapper>
  );
};

// ─── Share Modal ─────────────────────────────────────────────
const ShareModal = ({ onClose }) => {
  const shareUrl ="https://fnhnaf.netlify.app/";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  const platforms = [
    { label: "Facebook", color: "bg-blue-600 hover:bg-blue-700", url: `https://facebook.com/sharer/sharer.php?u=${shareUrl}` },
    { label: "Twitter / X", color: "bg-gray-900 hover:bg-black", url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=Support+MedCamp+Mission!` },
    { label: "WhatsApp", color: "bg-green-500 hover:bg-green-600", url: `https://wa.me/?text=Support+MedCamp+Mission!+${shareUrl}` },
    { label: "LinkedIn", color: "bg-blue-700 hover:bg-blue-800", url: `https://linkedin.com/shareArticle?mini=true&url=${shareUrl}` },
  ];

  return (
    <ModalWrapper onClose={onClose} title="Spread the Word" icon={<FaShareAlt className="text-emerald-500 text-2xl" />}>
      <p className="text-sm text-gray-500 mb-5 text-center">Share our mission and help us reach more people in need.</p>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {platforms.map(({ label, color, url }) => (
          <a key={label} href={url} target="_blank" rel="noreferrer"
            className={`${color} text-white text-sm font-semibold py-2.5 rounded-lg text-center transition-colors`}
          >
            {label}
          </a>
        ))}
      </div>
      <div className="border border-gray-200 rounded-lg flex overflow-hidden">
        <span className="flex-1 px-3 py-2.5 text-xs text-gray-500 truncate bg-gray-50">{shareUrl}</span>
        <button onClick={handleCopy} className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors">
          Copy
        </button>
      </div>
    </ModalWrapper>
  );
};

// ─── Reusable helpers ────────────────────────────────────────
const ModalWrapper = ({ onClose, title, icon, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
      {/* Modal Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
          <FaTimes className="text-sm" />
        </button>
      </div>
      {/* Modal Body */}
      <div className="px-6 py-5">{children}</div>
    </div>
  </div>
);

const Field = ({ label, textarea, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
    {textarea ? (
      <textarea rows={3} {...props} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400 resize-none" />
    ) : (
      <input {...props} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400" />
    )}
  </div>
);

const SubmitBtn = ({ label }) => (
  <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors text-sm mt-2">
    {label}
  </button>
);

// ─── Main Component ──────────────────────────────────────────
const SupportOurMission = () => {
  const [activeModal, setActiveModal] = useState(null);

  const cards = [
    {
      icon: <FaHandHoldingHeart className="text-emerald-500 text-3xl" />,
      title: "Donate",
      desc: "Your contribution helps us reach more people and host impactful medical camps.",
      btnLabel: "Donate Now",
      modal: "donate",
    },
    {
      icon: <FaPeopleCarry className="text-emerald-500 text-3xl" />,
      title: "Volunteer",
      desc: "Join our team of dedicated volunteers and make a hands-on difference.",
      btnLabel: "Join as Volunteer",
      modal: "volunteer",
    },
    {
      icon: <FaShareAlt className="text-emerald-500 text-3xl" />,
      title: "Spread the Word",
      desc: "Share our mission with your friends and family to amplify our impact.",
      btnLabel: "Share Our Mission",
      modal: "share",
    },
  ];

  return (
    <section className="relative  py-16 px-6 overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-emerald-50 pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-60 h-60 rounded-full bg-emerald-50 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-widest mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Get Involved
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          Support Our <span className="text-emerald-600">Mission</span>
        </h2>
        <div className="w-10 h-[3px] bg-emerald-500 rounded-full mx-auto mt-3 mb-4" />
        <p className="text-gray-500 text-[15px] leading-relaxed">
          Together, we can make a difference in healthcare accessibility and awareness.
        </p>
      </div>

      {/* Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 container mx-auto">
        {cards.map(({ icon, title, desc, btnLabel, modal }) => (
          <div key={title}
            className="bg-white border border-emerald-100 rounded-2xl p-8 text-center
              hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-50
              hover:-translate-y-1 transition-all duration-200"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-5">
              {icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed min-h-[60px]">{desc}</p>
            <button
              onClick={() => setActiveModal(modal)}
              className="mt-6 w-full px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors duration-200"
            >
              {btnLabel}
            </button>
          </div>
        ))}
      </div>

      {/* Modals */}
      {activeModal === "donate"    && <DonateModal    onClose={() => setActiveModal(null)} />}
      {activeModal === "volunteer" && <VolunteerModal onClose={() => setActiveModal(null)} />}
      {activeModal === "share"     && <ShareModal     onClose={() => setActiveModal(null)} />}
    </section>
  );
};

export default SupportOurMission;