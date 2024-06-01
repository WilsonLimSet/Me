import type { Metadata } from "next";
import CountdownTimer from "../components/CountdownTimer";
import Link from "next/link";
export const metadata: Metadata = {
  title: "25by25",
  description: "25 Things to accomplish before 25.",
};
export default function by25Page() {
  return (
    <section>
      <Link href="/">
        <h1 className="font-semibold text-2xl mb-2 tracking-tighter">
          林伟生 - 25 by 25 in 25
        </h1>
      </Link>
      <CountdownTimer />
      <div className=" prose prose-neutral dark:prose-invert ">
        Progress: 2/25
        <h3>Mind</h3>
        <ul>
          <li>1400+ Chess Elo</li>
          <li>Read/Reread 25 Books</li>
          <li>Indonesian Language Related TBD</li>
          <li>Chinese Language Related TBD</li>
          <li>Poker Related TBD</li>
        </ul>
        <h3>Body</h3>
        <ul>
          <li>Sub 2 hour half marathon</li>
          <li>Sub 14% body fat</li>
          <li>Finish Half Ironman</li>
          <li>Bench 225 lbs</li>
          <li>100 days of 85+ Sleep Score</li>
        </ul>
        <h3 id="computer-office">Soul</h3>
        <ul>
          <li>100 days of Sub 3 Hour Phone Screen </li>
          <li>Religion/Mediation TBD </li>
          <li>5 Day+ Solo Trip</li>
          <li>
            <span className="line-through">Guys Trip</span>
            <span className="text-green-500 text-xl"> ✓</span>-
            <a
              target="_blank"
              href="https://www.youtube.com/shorts/rUMpZQR4Wf4"
              className="text-blue-500 ml-2"
            >
              Hiking Volcán de Fuego in Guatemala
            </a>
          </li>
          <li>Jay Chou or Gallant concert</li>
        </ul>
        <h3 id="computer-office">Main Quest</h3>
        <ul>
          <li>
            <span className="line-through">Graduate College</span>
            <span className="text-green-500 text-xl"> ✓</span>-
            <a className="text-blue-500 hover:underline ml-2">
              Video coming soon
            </a>
          </li>
          <li>Full Time SWE Job</li>
          <li>1K MRR or 10K MAU Side Project </li>
          <li>Promoted or Raise Seed Round </li>
          <li>Do something special for Mom/Dad.</li>
        </ul>
        <h3 id="computer-office">Side Quest</h3>
        <ul>
          <li>Pilots License </li>
          <li>Learn to play 搁浅, 我的歌声里 and Stay on Piano</li>
          <li>TBD</li>
          <li>All 250 Letterboxd films watched</li>
          <li>10K+ Subs on Youtube</li>
        </ul>
      </div>
    </section>
  );
}
