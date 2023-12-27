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
        <h1 className="font-semibold text-2xl mb-2 tracking-tighter">林伟生</h1>
      </Link>
      <CountdownTimer />
      <div className="prose prose-neutral dark:prose-invert">
        Thesis: To avoid feelings of regret at 25 of me not working hard enough
        or doing xyz, will complete all 25 of these goals creating both
        short/long form videos for each.
      
         <h3 >Mind</h3>
        <ul>
          <li>1400+ Chess Elo</li>
          <li>Read/ReRead 25 Books</li>
          <li>Indonesian Language Related TBD</li>
          <li>Chinese Language Related TBD</li>
          <li>Poker Related TBD</li>
        </ul>
        <h3 >Body</h3>
        <ul>
          <li>Sub 2 hour half marathon</li>
          <li>Sub 15% body fat</li>
          <li>Finish Half Ironman</li>
          <li>Bench 225 lbs</li>
          <li>100 days of 85+ Sleep Score</li>
        </ul>
        <h3 id="computer-office">Soul</h3>
        <ul>
          <li>100 days of Sub 3 Hour Phone Screen </li>
          <li>Religion/Mediation TBD </li>
          <li>5 Day+ Solo Trip</li>
          <li>Full Send Guys Trip</li>
          <li>Jay Chou or Gallant concert</li>
        </ul>
        <h3 id="computer-office">Main Quest</h3>
        <ul>
          <li>Graduate College</li>
          <li>Full Time SWE Job</li>
          <li>1K MRR or 10K MAU Side Project </li>
          <li>Promoted or Raise Seed Round </li>
          <li>Do something special for Mom/Dad.</li>
        </ul>
        <h3 id="computer-office">Side Quest</h3>
        <ul>
          <li>Pilots License </li>
          <li>Learn to play 搁浅 and Stay on Piano</li>
          <li>TBD</li>
          <li>All 250 Letterboxd films watched</li>
          <li>10K+ Subs on Youtube</li>
        </ul>
      </div>
    </section>
  );
}