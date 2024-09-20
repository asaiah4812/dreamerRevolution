import Image from "next/image";
import { DM_Sans } from "next/font/google";
import prof from "/public/prof.jpg";
import img from "/public/image.jpg";

// Initialize the font
const dmSans = DM_Sans({ subsets: ["latin"] });

const Contact: React.FC = () => {
  return (
    <div
      className={`w-[95%] sm:w-[90%] md:w-[80%] xl:w-[70%] bg-white lg:w-[80%] mx-auto ${dmSans.className}`}
    >
      <div className="flex items-center text-gray-900 justify-center py-8">
        <div className="font-extrabold text-5xl sm:text-7xl md:text-9xl">
          PASSI
        </div>
        <div>
          <Image
            src={prof}
            width={120}
            height={150}
            className="w-[100px]"
            alt="profile"
          />
        </div>
        <div className="font-extrabold text-5xl sm:text-7xl md:text-9xl">
          ONATE
        </div>
      </div>
      <div className="font-extrabold text-center text-5xl sm:text-7xl md:text-9xl">
        SOFTWARE ENGINEER
      </div>
      <div className="flex justify-between items-center flex-wrap md:flex-nowrap mx-auto">
        <div className="md:w-[45%] mx-auto text-2xl md:text-start tracking-wider space-y-2 py-4 text-center md:text-3xl lg:text-4xl text-black">
          IN <span className="font-bold">DEVELOPMENT</span> WITH OVER THREE
          YEARS OF EXPERIENCE I TURN{" "}
          <span className="font-bold">IDEAS NTO AMAZING</span> PROJECTS THROUGH
          THE WORLD OF <span className="font-bold">CREATIVE</span> AND{" "}
          <span className="font-bold">INTERACTIVE</span> WEBAPPLICATIONS
        </div>
        <div className="relative mx-auto md:w-[45%] h-[400px] ">
          <Image src={img} width={300} height={300} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
