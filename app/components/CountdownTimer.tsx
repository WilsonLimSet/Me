"use client";
import React, { useState, useEffect } from "react";
import { differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";



const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const targetDate = new Date("2026-02-19");
    const currentDate = new Date();

    if (currentDate >= targetDate) {
      return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    let months = differenceInMonths(targetDate, currentDate);
    let days = differenceInDays(targetDate, currentDate);
    let hours = differenceInHours(targetDate, currentDate) % 24;
    let minutes = differenceInMinutes(targetDate, currentDate) % 60;
    let seconds = differenceInSeconds(targetDate, currentDate) % 60;

    // Adjust days to be within the last month's frame
    currentDate.setMonth(currentDate.getMonth() + months);
    days = differenceInDays(targetDate, currentDate);

    return { months, days, hours, minutes, seconds };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Clear interval on component unmount
  }, []);




  return (
    <div>
      <div className="flex items-center">
        <h3 className="font-bold mr-1">Countdown to 25:</h3>
        <div>
          {timeLeft.months || 0} Months, {timeLeft.days || 0} Days,{" "}
          {timeLeft.hours || 0} Hours, {timeLeft.minutes || 0} Minutes,{" "}
          {timeLeft.seconds || 0} Seconds
        </div>
      </div>
      Thesis: Regret Minimization through completing all 25 of these goals while
      creating both short/long form videos for each.
    </div>
  );
};

export default CountdownTimer;