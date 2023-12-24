import type { Metadata } from 'next';
import CountdownTimer from '../components/CountdownTimer';

export const metadata: Metadata = {
  title: '25by25',
  description:
    "25 Things I aim to accomplish before 25.",
};

export default function by25Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        25 Goals/Milestones/Achievements by 25 in 25 months
      </h1>
      <CountdownTimer />

      <div className="prose prose-neutral dark:prose-invert">
        <h3 id="computer-office">Body</h3>
        
        <ul>
          <li>Sub 2 hour half marathon</li>
          <li>Sub 15% body fat</li>
          <li>Complete Half Ironman</li>
          <li>Bench 225 lbs</li>
          <li>8 Weeks of 85+ Sleep Score</li>
        </ul>
       
        
       
      </div>
    </section>
  );
}
