"use client";
import { Suspense } from "react";
import React, { useEffect, useState } from "react";

// Define an interface for your sleep data
interface SleepData {
  date: string;
  total_sleep_duration: number;
}

const formatSleepDuration = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours} hours and ${minutes} minutes`;
};

function Badge(props) {
  return (
    <a
      {...props}
      target="_blank"
      className=" p-1 text-sm inline-flex 
       items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline hover:bg-neutral-100"
    />
  );
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

async function BlogLink({ slug, name, description, stats }) {
  return (
    <a
      href={`${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="border no-underline leading-1 
      border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded flex items-center justify-between 
      px-3 pb-4 w-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-200"
    >
      <div className=" flex-grow">
        {" "}
        {/* To allow the text to take up the available space */}
        <p className="font-semibold text-neutral-900 dark:text-neutral-100">
          {name}
        </p>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          {description}
        </p>
        <div className="text-sm text-neutral-500 dark:text-neutral-200">
          {stats}
        </div>
      </div>
      <div className="ml-4">
        <ArrowIcon />
      </div>
    </a>
  );
}

export default function Page() {
  const [sleepData, setSleepData] = useState<SleepData | null>(null);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Now we are in the client, we can safely check the preference
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDarkMode);

    // Add event listener to react to changes in the preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const changeHandler = () => setDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", changeHandler);

    // Cleanup function to remove the event listener
    return () => mediaQuery.removeEventListener("change", changeHandler);
  }, []);

  useEffect(() => {
    async function fetchSleepData() {
      try {
        const response = await fetch("/Oura"); // Adjust the URL to your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSleepData(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
    fetchSleepData();
  }, []);
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-2 tracking-tighter">林伟生</h1>
      <div className="prose prose-neutral dark:prose-invert">
        I'm Wilson Lim Setiawan, born/raised in Singapore, currently a senior
        studying Computer Science at University of Southern California.
        {` My experience includes SWE internships at  `}
        <span className="not-prose">
          <Badge href="https://www.gsam.com/content/gsam/global/en/homepage.html">
            <img
              alt="GS logomark"
              src="/images/GS.png"
              className="!mr-1"
              width="57"
            />
          </Badge>
          and {` `}
          <Badge href="https://www.lafayettesquare.com/">
            <img
              alt="LS logomark"
              src={darkMode ? "/images/LSLOGO.png" : "/images/LS.png"}
              className="!mr-1"
              width="53"
            />
          </Badge>
          {`, product at  `}
          <Badge href="https://www.wallex.asia/">
            <img
              alt="Wallex logomark"
              src="/images/Wallex.png"
              className="!mr-1"
              width="75"
            />
          </Badge>
          {`, and business intelligence at  `}
          <Badge href="https://www.homage.sg/">
            <img
              alt="Homage logomark"
              src="/images/Homage.png"
              className="!mr-1"
              width="81"
            />
          </Badge>
          {`.`}
          {` Here are some projects I've built:`}
        </span>
        <div className="my-0 flex flex-wrap justify-between w-full items-start">
          <Suspense>
            <div className="w-full md:w-1/2 p-3">
              {" "}
              <BlogLink
                name="Sleep Ranking"
                slug="https://www.sleepranking.com/"
                description="Competitive social accountability with sleep."
                stats="Currently Building."
              />
            </div>
            <div className="w-full md:w-1/2 p-3">
              {" "}
              <BlogLink
                name="Coffee Chat AI"
                slug="https://www.coffeechatai.com/"
                description="Podcast and coffee chat question generator."
                stats="1K+ Coffee Chats Aided."
              />
            </div>
            <div className="w-full md:w-1/2 p-3">
              {" "}
              <BlogLink
                name="Atomic Flow"
                slug="https://chrome.google.com/webstore/detail/atomic-flow/gbeiphffnlkmgoclacceflphonplpigi"
                description="Chrome extension to block distracting social media websites."
                stats="40+ Weekly Users."
              />
            </div>
            <div className="w-full md:w-1/2 p-3">
              {" "}
              <BlogLink
                name="Youtube Title Views Updater"
                slug="https://www.youtube.com/watch?v=PA2GKru3GT8"
                description="Cron job to automatically update video title based on views."
                stats="600+ Views."
              />
            </div>
          </Suspense>
          <div className="mt-4 ">
            Elsewhere: WilsonLimSet on{" "}
            <a
              target="_blank"
              href="https://twitter.com/WilsonLimSet"
              className="text-gray-500 hover:text-gray-700  "
            >
              X
            </a>
            {"/"}
            <a
              target="_blank"
              href="https://github.com/WilsonLimSet"
              className="text-gray-500 hover:text-gray-700 "
            >
              GitHub
            </a>
            , wilsonlimsetiawan@gmail.com and my{" "}
            <a
              target="_blank"
              href="https://drive.google.com/file/d/1Hp2b_oOYwa674r18THchnOGRMZOheAxa/view?usp=sharing"
              className="text-gray-500 hover:text-gray-700"
            >
              resume
            </a>
            {"."}
          </div>
        </div>
        <h3 id="involved">Things I'm involved with and areas of interest:</h3>
        <ul>
        <li>
            Completing my {" "}
            <a
              href="/25by25"
              target="_blank"
              rel="noopener noreferrer"
            >
              25 by 25 in 25
            </a>
            .
          </li>
          <li>
            Creating{" "}
            <a
              href="https://open.spotify.com/show/7jDxgVTztsskpDLGuyORNJ?si=f6eaf639f0894aed&nd=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              audio
            </a>{" "}
            and{" "}
            <a
              href="https://www.youtube.com/channel/UCH59qgZdA_fA5lTlmiQzNBQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              video
            </a>{" "}
            content that makes me content.
          </li>
          <li>
            Optimising sleep, Oura ring tracked{" "}
            {sleepData ? (
              <span className="font-semibold">
                {formatSleepDuration(sleepData.total_sleep_duration)}
              </span>
            ) : (
              "loading..."
            )}{" "}
            last night.
          </li>
       
          <li>
            Currently reading Foundation,{" "}
            <a
              href="https://www.goodreads.com/review/list/93017514-wilson?shelf=most-impactful&view=covers"
              target="_blank"
              rel="noopener noreferrer"
            >
              these
            </a>{" "}
            have had the biggest impact on my worldview.
          </li>
        </ul>
      </div>
    </section>
  );
}
