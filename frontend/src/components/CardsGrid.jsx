import React from 'react';

export default function CardsGrid() {
  const cards = [
    {
      id: 1,
      title: "Innovation through collaboration",
      subtitle: "Our Culture",
      description: "We believe great work happens when diverse minds come together. Our culture fosters creativity, open communication, and collective problem-solving to deliver exceptional results.",
      image: "image9.png",
      link: "/culture",
      alt: "Heineken collaborative culture and teamwork"
    },
    {
      id: 2,
      title: "Empowering teams to do their best work",
      subtitle: "Work Management",
      description: "We're passionate about removing barriers and creating seamless workflows. Our mission is to help teams focus on what matters most - delivering impactful work that drives business success.",
      image: "image8.png",
      link: "/work-management",
      alt: "Workfront work management and team empowerment"
    },
    {
      id: 3,
      title: "Continuous learning and growth",
      subtitle: "Professional Development",
      description: "We invest in our people's growth through mentorship, training, and hands-on experience. Every challenge is an opportunity to learn, adapt, and excel in our rapidly evolving industry.",
      image: "image7.png",
      link: "/development",
      alt: "Professional development and continuous learning at Workfront"
    }
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-14 text-emerald-700">
          Our Story
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cards.map((card) => (
            <article
              key={card.id}
              className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-emerald-500/30 transition duration-500 bg-slate-50"
            >
              <a href={card.link} className="block h-full">
                <div className="relative h-64 overflow-hidden">
                  <img
                    alt={card.alt}
                    src={card.image}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="relative z-10 text-white transition-all duration-300 group-hover:translate-y-0">
                    <span className="inline-block px-4 py-1 bg-emerald-600 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                      {card.subtitle}
                    </span>
                    <h2 className="text-2xl font-bold leading-tight mb-2 drop-shadow-md">
                      {card.title}
                    </h2>
                    <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 bg-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
