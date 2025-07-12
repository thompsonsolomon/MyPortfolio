import { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import Img from "../assets/github-contribution-grid-snake-dark.svg";
import ReactCalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import axios from 'axios';


function WakaHeatmap() {


  return (
    <div className='w-full flex justify-center items-center'>
      <div
        className='w-[80%] max-md:w-[95%]'
        style={{ background: '#0d1117', padding: '20px', borderRadius: '8px' }}
      >
        <h2 style={{ color: '#fff', marginBottom: '16px' }}>
          My Work Time Heatmap
        </h2>
        <img src={Img} alt="Snake animation" />
      </div>
    </div>
  );
}

export default WakaHeatmap;





