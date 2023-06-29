import type { NextPage } from "next";
import { Inter, Raleway } from "next/font/google";
import Head from "next/head";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>EmpathAttic</title>
        <meta name="description" content="VoidFnc's crowdfunding platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${inter.variable} ${raleway.variable} font-heading mx-auto px-10 pb-10 md:container`}
      >
        <div className="flex min-h-[65vh] flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center justify-center ">
            <p className="max-w-4xl text-4xl font-extrabold  md:text-6xl">
              Empathizing and taking action.{" "}
              <span className="text-[#0431e2]">EmpathAttic.</span>
            </p>
            <p className="text-md mt-5 font-sans md:text-2xl">
              A passion project turned social project.
              <br />
              An attic to gather those who want to lend a helping hand.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center font-sans">
          <p className="text-lg font-bold">Currently only available on Expo.</p>
          <div className="mt-4 flex flex-col items-center">
            <p>Scan the QR Code to access the app through Expo Go</p>
            <Image
              src="/empathattic-expo-qr.svg"
              alt="expo-qr"
              width={350}
              height={350}
            />
            <a
              className="font-semibold text-blue-500 underline"
              href="exp://u.expo.dev/53c6b0e7-66db-42bc-a385-a42b4f178190?channel-name=main&runtime-version=exposdk%3A48.0.0"
            >
              or tap on this link
            </a>
          </div>
          {/* <p className="text-lg font-bold">Available on both platforms</p>
              <div className="mt-4 grid grid-cols-2 gap-4 font-sans">
                <a
                  href="google.com"
                  className="rounded-md bg-teal-700 px-4 py-2 text-white transition-all hover:bg-zinc-600"
                >
                  Android
                </a>
                <a
                  href="google.com"
                  className="rounded-md bg-zinc-700 px-4 py-2 text-white transition-all hover:bg-zinc-600"
                >
                  iOS
                </a>
              </div> */}
        </div>
        <div className="flex min-h-[115vh] flex-col items-center justify-center">
          <p className="font-heading pt-12 text-center text-3xl font-extrabold md:text-5xl">
            A short message from me
          </p>
          <p className="col-span-1 mt-10 flex flex-col justify-center text-center font-medium md:max-w-4xl md:text-2xl">
            &quot;Hi, thanks for visiting! EmpathAttic is a crowdfunding
            application that I developed as a way to give back to the community.
            Besides 60% of my livestream donations being given to charities I
            support, I also made this platform to those who want to support the
            community even more.
            <span className="mt-4" />
            Although it is not an official crowdfunding platform, hopefully this
            can still be a place to remind all of us to give each other a
            helping hand especially to those who are less fortunate.&quot;
            <span className="mt-6" />
            <a
              target="_blank"
              href="https://github.com/theodevoid"
              className="font-bold text-[#0431e2] underline underline-offset-4"
            >
              - theodevoid
            </a>
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
