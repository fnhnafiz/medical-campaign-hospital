import React from "react";

const blogs = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&q=80&auto=format&fit=crop",
    category: "Heart Health",
    date: "Apr 12, 2025",
    title: "5 Daily Habits for a Stronger, Healthier Heart",
    desc: "Small lifestyle changes can have a big impact on your cardiovascular health. Learn the five science-backed habits that cardiologists recommend every day.",
    readTime: "4 min read",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80&auto=format&fit=crop",
    category: "Nutrition",
    date: "Apr 8, 2025",
    title: "Managing Diabetes Through a Balanced Diet",
    desc: "Diet plays a crucial role in managing blood sugar levels. Discover which foods to embrace and which to avoid for better diabetes control and energy.",
    readTime: "5 min read",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&auto=format&fit=crop",
    category: "Fitness",
    date: "Apr 3, 2025",
    title: "Why 30 Minutes of Exercise Changes Everything",
    desc: "Even a short daily workout can dramatically improve mental clarity, immune function, and longevity. Here's what happens to your body when you stay consistent.",
    readTime: "3 min read",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80&auto=format&fit=crop",
    category: "Mental Health",
    date: "Mar 28, 2025",
    title: "How Sleep Deprivation Affects Your Brain and Body",
    desc: "Chronic sleep loss is linked to serious health risks. Explore the science of sleep and simple strategies to improve the quality of your rest tonight.",
    readTime: "6 min read",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&auto=format&fit=crop",
    category: "Preventive Care",
    date: "Mar 20, 2025",
    title: "Essential Health Screenings You Shouldn't Skip",
    desc: "Preventive screenings catch problems before symptoms appear. Find out which tests are recommended at every age and why early detection saves lives.",
    readTime: "5 min read",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80&auto=format&fit=crop",
    category: "Nutrition",
    date: "Mar 15, 2025",
    title: "Superfoods That Naturally Boost Your Immunity",
    desc: "Your diet is your first line of defense. These nutrient-dense foods have been shown to strengthen immune response and reduce inflammation effectively.",
    readTime: "4 min read",
  },
];

const categoryColors = {
  "Heart Health":    { bg: "bg-red-50",     text: "text-red-700" },
  "Nutrition":       { bg: "bg-emerald-50", text: "text-emerald-700" },
  "Fitness":         { bg: "bg-blue-50",    text: "text-blue-700" },
  "Mental Health":   { bg: "bg-purple-50",  text: "text-purple-700" },
  "Preventive Care": { bg: "bg-amber-50",   text: "text-amber-700" },
};

const BlogCard = ({ blog }) => {
  const { image, category, date, title, desc, readTime } = blog;
  const color = categoryColors[category] || { bg: "bg-gray-50", text: "text-gray-700" };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col hover:border-emerald-200 hover:-translate-y-1 hover:shadow-md hover:shadow-emerald-50 transition-all duration-200">

      {/* Image */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <span className={`absolute top-3 left-3 ${color.bg} ${color.text} text-[11px] font-medium px-3 py-1 rounded-full`}>
          {category}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">

        {/* Meta */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-[11px] text-gray-400">{date}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="text-[11px] text-gray-400">{readTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-[14px] font-semibold text-gray-900 leading-snug mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {desc}
        </p>

        {/* Read more */}
        <div className="border-t border-gray-100 mt-4 pt-3">
          <button className="flex items-center gap-1.5 text-[12px] font-medium text-emerald-600 hover:text-emerald-800 transition-colors group">
            Read article
            <svg
              className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-150"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

function HealthBlog() {
  return (
    <section className="py-16 px-4 ">
      <div className="container mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-medium px-4 py-1.5 rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Latest articles
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Health Tips & Articles
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-md leading-relaxed">
              Expert-written guides to help you live healthier, feel better, and stay informed.
            </p>
          </div>
          <button className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 border border-emerald-200 text-emerald-700 text-sm font-medium rounded-lg hover:bg-emerald-50 transition-colors flex-shrink-0">
            View all articles →
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default HealthBlog;