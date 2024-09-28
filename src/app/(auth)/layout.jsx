import Image from "next/image";
import circularTools from "../../../public/images/png/auth_image.png";
import curve from "../../../public/images/png/curve.png";

export const viewport = {
  themeColor: "#2e69ff",
};

export default function Layout({ children }) {
  return (
    <section className=" flex flex-col bg-secondary  lg:h-screen overflow-hidden  items-center">
      {/* <Image className=" absolute w-full bottom-0" src={curve} alt="curve" /> */}
      <div className="w-full lg:flex-row-reverse flex-col-reverse flex  justify-center items-center  h-full ">
        <div className=" lg:flex-1  w-full xl:rounded-none rounded-3xl  hideScroll top-[25%] h-fit xl:h-full xl:top-0  bg-secondary  lg:overflow-y-scroll  absolute  flex  lg:relative z-[2000] flex-col items-start justify-start">
          {children}
          <div className=" lg:hidden px-5 mt-10 text-xs self-center text-center pb-4 lg:pb-5 ">
            <p>
              Kindly read our{" "}
              <a
                href="/terms"
                className=" cursor-pointer  hover:underline font-normal  text-primary"
              >
                terms of service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className=" cursor-pointer  hover:underline font-normal  text-primary"
              >
                privacy policy
              </a>
            </p>
            <p className=" mt-1.5 text-xs  text-[#D5D7DC]">
              Geek.tools &copy; 2024 All Rights Reserved
            </p>
          </div>
        </div>
        <div className="lg:p-10 h-full lg:w-[50%]">
          <div className=" lg:relative lg:rounded-[4rem] top-0  w-full overflow-hidden flex   flex-col items-center  h-[30%]  lg:h-full bg-glassBorder/10">
            <div className=" flex-1 relative flex flex-col justify-center  items-center ">
              <div
                className=" lg:h-[10rem] rounded-full  bg-gradient-to-r  w-[6rem] h-[6rem] lg:w-[10rem] absolute  from-primary to-[#0AD9BE] blur-3xl lg:blur-[150px]
      "
              ></div>

              <Image
                alt="circle"
                className="xl:w-[36rem] relative mt-5 lg:mt-0 z-[1000] w-[80%]"
                src={circularTools}
              />
            </div>

            <div className="hidden lg:block text-base text-center pb-10 ">
              <p>
                Kindly read our{" "}
                <a
                  href="/terms"
                  className=" cursor-pointer  hover:underline font-normal  text-primary underline"
                >
                  terms of service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className=" cursor-pointer  hover:underline underline font-normal  text-primary"
                >
                  privacy policy
                </a>
              </p>
              <p className=" mt-1.5 text-xs  text-[#D5D7DC]">
                Geek.tools &copy; 2024 All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
