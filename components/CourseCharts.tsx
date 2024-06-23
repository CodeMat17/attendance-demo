"use client";

import React, { useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


type Props = {
  index: number;
  serviceTab: {
    title: string;
    value: number;
    // icon: any;
  }[];
};

const CourseChart: React.FC<Props> = ({ serviceTab, index }) => {
  const [percentage, setPercentage] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPercentage(serviceTab[index].value);
          }
        });
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [serviceTab, index]);

  return (
    <div ref={containerRef} className=' shrink-0 w-[100px] h-[100px]'>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textSize: "16px",
          trailColor: "#d6d6d6",
        })}
      />
    </div>
  );
};

export default CourseChart;
