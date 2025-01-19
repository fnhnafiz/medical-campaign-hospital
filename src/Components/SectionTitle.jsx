const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="container mx-auto text-center px-4 sm:px-12 my-8 sm:my-12">
      <div className="relative">
        {/* Decorative elements */}
        <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />

        {/* Main heading container */}
        <div className="relative inline-block">
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-emerald-50 to-teal-50 transform -rotate-1" />

            {/* Heading text */}
            <h2 className="relative uppercase text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 px-6 py-3">
              {heading}
            </h2>

            {/* Bottom border with gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />
          </div>
        </div>
      </div>

      {/* Subheading with animated gradient background */}
      {subHeading && (
        <div className="mt-4 relative">
          <p className="inline-block text-base sm:text-lg md:text-xl text-gray-600 font-medium px-4 py-2 relative">
            <span className="relative z-10">{subHeading}</span>
            {/* Subtle background decoration */}
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 opacity-50 rounded-lg" />
          </p>
        </div>
      )}

      {/* Additional decorative elements */}
      <div className="flex justify-center gap-2 mt-2">
        <div className="h-1 w-3 rounded-full bg-emerald-400" />
        <div className="h-1 w-20 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
        <div className="h-1 w-3 rounded-full bg-teal-400" />
      </div>
    </div>
  );
};

export default SectionTitle;
