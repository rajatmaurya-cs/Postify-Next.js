import Image from "next/image";

const Hero = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center px-6 py-20 bg-white">
      
    
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
        AI Powered <span className="text-black">Blogging Platform</span>
      </h1>

     
      <p className="mt-4 text-gray-600 text-lg max-w-2xl">
        Summarize any blog in under 1 minute using AI. Read faster, learn smarter, and save time with intelligent content extraction.
      </p>

     
      <div className="mt-6 flex gap-4">
        <button className="px-6 py-3 bg-black text-white rounded-full hover:opacity-80 transition">
          Try Summarizer
        </button>

        <button className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-100 transition">
          Explore Blogs
        </button>
      </div>

   
      {/* <div className="mt-12">
        <Image
          src="/hero-ai.png"
          alt="AI Blogging"
          width={700}
          height={450}
          priority
        />
      </div> */}

    </section>
  );
};

export default Hero;