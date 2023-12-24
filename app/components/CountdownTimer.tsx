"use client";
import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState<{ months: number; days: number; hours: number; minutes: number; seconds: number; }>({
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const calculateTimeLeft = (): { months: number; days: number; hours: number; minutes: number; seconds: number; } => {
        const difference = +new Date('2026-02-19') - +new Date();
        let timeLeft: { months: number; days: number; hours: number; minutes: number; seconds: number; } = {
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (difference > 0) {
            timeLeft = {
                months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30)),
                days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 30),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    return (
        <div className="flex items-center">
            <h3 className="font-bold mr-2">Countdown to 25 -</h3>
            <div>
                {timeLeft.months || 0} Months, {timeLeft.days || 0} Days, {timeLeft.hours || 0} Hours, {timeLeft.minutes || 0} Minutes, {timeLeft.seconds || 0} Seconds
            </div>
        </div>
    );
};

export default CountdownTimer;
