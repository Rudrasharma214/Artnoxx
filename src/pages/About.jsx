import React from "react";


const About = () => {
  const skills = [
    { name: "Sketching", desc: "Creating detailed sketches that form the foundation of expressive artworks." },
    { name: "Wall Painting / Murals", desc: "Designing large-scale wall paintings that transform spaces into immersive art." },
    { name: "Watercolor", desc: "Crafting delicate and vibrant watercolor pieces with layered textures." },
    { name: "Oil Painting", desc: "Bringing rich, timeless oil paintings to life with depth and color." },
    { name: "Fabric / Cloth Painting", desc: "Designing custom-painted clothing and fabric art that stands out." },
    { name: "Shoes / Custom Footwear Painting", desc: "Creating personalized hand-painted designs on shoes and sneakers." },
    { name: "Illustration & Mixed Media", desc: "Combining traditional and modern techniques to produce unique artworks." },
  ];

  return (
    <div className="bg-transparent py-16 lg:py-24 px-4 sm:px-8">
      
      {/* Section 1 */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12 mb-20">
        {/* Text */}
        <div className="order-1 md:order-none">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <p className="text-gray-700 leading-relaxed">
            Hi, I am Harsh Singh, a 21-year-old artist from Bhopal, India. Art has always been more than just a passion for me it is my way of expressing stories, emotions, and perspectives that words often can not capture. From sketching on paper to experimenting with digital art, I love exploring new ways to bring imagination to life. Each piece I create reflects a part of my journey, my thoughts, and the world as I see it.
          </p>
        </div>
        {/* Photo */}
        <div className="order-2 md:order-none flex justify-center">
          <img
            src="https://res.cloudinary.com/dqqnqq7xh/image/upload/v1761752328/Jahawar_kala_kendraa_art_exhibition_jaipur_......._art_artwork_artist_artgallery_panting_h3v000.webp"
            alt="Rudra Sharma - Digital Artist"
            className="rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg md:w-96 h-80 sm:h-96 md:h-[28rem] object-cover"
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12 mb-20">
        {/* Photo */}
        <div className="order-2 md:order-none flex justify-center">
          <img
            src="https://res.cloudinary.com/dqqnqq7xh/image/upload/v1761752328/Jahawar_kala_kendraa_art_exhibition_jaipur_......._art_artwork_artist_artgallery_panting_h3v000.webp"
            alt="Rudra Sharma - NFT Art Creation"
            className="rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg md:w-96 h-80 sm:h-96 md:h-112 object-cover"
          />
        </div>
        {/* Text */}
        <div className="order-1 md:order-none">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">My Creative Journey</h2>
          <p className="text-gray-700 leading-relaxed">
            My journey as an artist began when I was a child fascinated by colors and shapes. Over the years, that simple curiosity turned into a deep creative pursuit. I have explored various art styles from traditional sketches and watercolor paintings to modern digital illustrations and mixed media. With every artwork, I try to evolve, learn, and challenge myself to create something unique that connects with people. Art has taught me patience, observation, and the beauty of continuous growth.
          </p>
        </div>
      </div>

      {/* Section 3 */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12 mb-20">
        {/* Text */}
        <div className="order-1 md:order-none">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Vision & Inspiration</h2>
          <p className="text-gray-700 leading-relaxed">
            My vision is to create art that inspires emotions, sparks imagination, and brings positivity to others. I draw inspiration from nature, people, and everyday life the unnoticed beauty in simple moments. My goal is to keep experimenting, learning, and sharing my creativity with the world, while inspiring others to find their own artistic voice.
          </p>
        </div>
        {/* Photo */}
        <div className="order-2 md:order-none flex justify-center">
          <img
            src="https://res.cloudinary.com/dqqnqq7xh/image/upload/v1761752328/Jahawar_kala_kendraa_art_exhibition_jaipur_......._art_artwork_artist_artgallery_panting_h3v000.webp"
            alt="Rudra Sharma - Art Vision"
            className="rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg md:w-96 h-80 sm:h-96 md:h-112 object-cover"
          />
        </div>
      </div>

      {/* Skills Section */}
      <div className="max-w-6xl mx-auto text-center">
  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">Skills & Expertise</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
    {skills.map((skill, index) => (
      <div
        key={index}
        className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center text-center"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{skill.name}</h3>
        <p className="text-gray-600 text-sm">{skill.desc}</p>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default About;
