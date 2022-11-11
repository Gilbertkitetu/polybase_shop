import React from 'react'
import { Pie, defaults, Line } from 'react-chartjs-2'

defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'

const BarChart = () => {
  return (
    <div>
      <Line
        data={{
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          datasets: [
            {
              label: 'Sales',
              data: [12, 45],
              backgroundColor: '#80ffaa',
              borderColor: '#32383E',
              borderWidth: 1,
            },
            {
              label: 'Orders',
              data: [47, 23],
              backgroundColor: '#ffb366',
              borderColor: '#ff751a',
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
  )
}

export default BarChart