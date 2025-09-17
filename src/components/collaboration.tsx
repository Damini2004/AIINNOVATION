"use client";

export default function CollaborationPage() {
  return (
    <section
      className="process-area py-[100px] pb-[90px]"
      style={{
        background: "inherit",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "inherit",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto max-w-5xl px-6">
        {/* Section Title */}
        <div className="text-center pb-[40px]">
          <h5
            className="text-[16px] font-semibold mb-[10px]"
            style={{ color: "#f16722" }}
          >
            HOW TO COLLABORATE
          </h5>
          <h2 className="text-[32px] font-bold m-0">
            Research Made Easy
            <span style={{ color: "#f16722" }}> through Collaborations</span>
          </h2>
          <div className="em_bar_bg"></div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Step 1 */}
          <div className="text-center group">
            <div className="relative z-10 mb-[26px]">
              <span
                className="inline-block font-semibold text-white text-center rounded-full w-[45px] h-[45px] leading-[45px] transition-all duration-300 group-hover:bg-black"
                style={{
                  background: "#f16722",
                }}
              >
                01
              </span>
            </div>
            <h2
              className="text-[20px] mb-[10px] font-bold"
            >
              Get Connected
            </h2>
            <p className="text-[14px] text-[#444] m-0">
              Become a member and setup your profile
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center group">
            <div className="relative z-10 mb-[26px]">
              <span
                className="inline-block font-semibold text-white text-center rounded-full w-[45px] h-[45px] leading-[45px] transition-all duration-300 group-hover:bg-black"
                style={{
                  background: "#f16722",
                }}
              >
                02
              </span>
            </div>
            <h2
              className="text-[20px] mb-[10px] font-bold"
            >
              Find Collaborators
            </h2>
            <p className="text-[14px] text-[#444] m-0">
              Connect to hundreds of collaborators in society
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center group">
            <div className="relative z-10 mb-[26px]">
              <span
                className="inline-block font-semibold text-white text-center rounded-full w-[45px] h-[45px] leading-[45px] transition-all duration-300 group-hover:bg-black"
                style={{
                  background: "#f16722",
                }}
              >
                03
              </span>
            </div>
            <h2
              className="text-[20px] mb-[10px] font-bold"
            >
              Initiate Or Contribute
            </h2>
            <p className="text-[14px] text-[#444] m-0">
              Contribute to existing research projects or initiate a new one
            </p>
          </div>

          {/* Step 4 */}
          <div className="text-center group">
            <div className="relative z-10 mb-[26px]">
              <span
                className="inline-block font-semibold text-white text-center rounded-full w-[45px] h-[45px] leading-[45px] transition-all duration-300 group-hover:bg-black"
                style={{
                  background: "#f16722",
                }}
              >
                04
              </span>
            </div>
            <h2
              className="text-[20px] mb-[10px] font-bold"
            >
              Publish and Promote
            </h2>
            <p className="text-[14px] text-[#444] m-0">
              Publish in AIIS journals for free and promote your research
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
