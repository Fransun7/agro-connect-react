import image3 from "../assets/hero-section-image-3.jpg";

const overview = [
  {
    label: "Total Listing",
  },

  {
    label: "Total Orders",
  },

  {
    label: "Pending Orders",
  },

  {
    label: "Total Earnings",
  },
];

function Overview() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="text-xl font-bold text-[#1A5C2A]">Overview</h2>

      <h3 className="text-[#1A5C2A] font-semibold">Farmer Dashboard</h3>
      {/* image + text section */}
      <div className="flex flex-col object-cover overflow-hidden items-center   p-2 relative">
        <img className="rounded-lg" src={image3} alt="" />
        <div className="absolute top-10 md:top-20  text-white ">
          <h1 className="text-center text-xl  md:text-3xl font-bold mb-5">
            Welcome to your Dashboard
          </h1>
          <p className="text-center">
            Manage your listings and track incoming orders
          </p>
        </div>
      </div>
    </div>
  );
}

export default Overview;
