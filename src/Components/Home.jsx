import image1 from "../assets/hero-section-image-1.jpg";

function Home() {
  return (
    <section className="w-full h-screen relative">
      {/* image container */}
      <img
        src={image1}
        className="absolute inset-0 w-full h-full object-cover"
        alt="agro-connect"
      />
    </section>
  );
}

export default Home;
