import React, {useState} from 'react'
import XYPlot from 'reactochart/XYPlot';
import XAxis from 'reactochart/XAxis';
import YAxis from 'reactochart/YAxis';
import LineChart from 'reactochart/LineChart';
import 'reactochart/styles.css';



function Charts(){
    const data = [
        {x: 0, y: 20},
        {x: 5, y: 30},
        {x: 10, y: 35},
        {x: 15, y: 30},
      ];
   
    return (
        <XYPlot>
    <XAxis title="Phase" />
    <YAxis title="Intensity" />
    <LineChart
      data={Array(100)
        .fill()
        .map((e, i) => i + 1)}
      x={d => d}
      y={d => Math.sin(d * 0.1)}
    />
  </XYPlot>
    //     <div>
    //         hhh
    //   </div>//Natujenge2022#OYF
    )

}

export default Charts;