const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="container mx-auto text-center px-4 sm:px-12">
      <h2 className="text-gray-900 text-3xl sm:text-5xl font-bold uppercase border-y-2 py-4">
        {heading}
      </h2>
      <p className="text-gray-900 pb-4 italic text-xl">---{subHeading}---</p>
    </div>
  );
};

export default SectionTitle;
