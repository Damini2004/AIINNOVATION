"use client";

import { GraduationCap, Users, Sparkles, ClipboardCheck } from "lucide-react";

export default function ProgramsPage() {
  const boxes = [
    { icon: <GraduationCap className="w-10 h-10 text-white" />, title: "AI Certificate Courses", desc: "Online and hybrid programs on AI, ML, and Data Ethics." },
    { icon: <Users className="w-10 h-10 text-white" />, title: "AI in Schools", desc: "Curriculum design and workshops for K–12 and higher education." },
    { icon: <Sparkles className="w-10 h-10 text-white" />, title: "AI & SDGs", desc: "Aligning AI projects with UN Sustainable Development Goals." },
    { icon: <GraduationCap className="w-10 h-10 text-white" />, title: "Women in AI", desc: "Empowerment programs, fellowships, and events for women in AI." },
    { icon: <ClipboardCheck className="w-10 h-10 text-white" />, title: "AI Events", desc: "Conferences and Workshops at National and International Universities." },
    { icon: <Sparkles className="w-10 h-10 text-white" />, title: "Publications", desc: "Free of charge publications to members of AIIS." },
  ];

  return (
    <section className="bg-[#f1f6fc] pt-[96px] pb-[70px]">
      <div className="max-w-[1140px] mx-auto px-6">
        {/* Section Title */}
        <div className="text-center pb-[40px]">
          <h5 className="text-[16px] text-[#f16722] mb-[10px]">Full Time Programs</h5>
          <h2 className="text-[28px] font-extrabold mb-[15px]">
            Key Aspects of our <span className="text-[#f16722]">Society Programs</span>
          </h2>
          <div className="em_bar_bg"></div>
        </div>

        {/* Service Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {boxes.map((box, idx) => (
            <div
              key={idx}
              className="bg-white text-center p-[40px_25px_35px] rounded-[8px] cursor-pointer shadow-sm border-2 border-transparent hover:border-[#f16722] transition-all duration-300"
            >
              <div>
                <div className="mx-auto mb-[25px] flex items-center justify-center rounded-full bg-[#f16722] w-[80px] h-[80px] transform transition-transform duration-300 hover:scale-110 hover:rotate-6">
                  {box.icon}
                </div>
                <h2
                  className="text-[20px] font-bold mb-[15px] text-black hover:text-[#f16722] transition-colors duration-300"
                >
                  {box.title}
                </h2>
                <p className="text-[#444] text-[15px] leading-[1.6]">{box.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
