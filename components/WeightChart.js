import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js/auto';

export default function WeightChart({ weights }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (weights.length === 0) {
      // Clear the canvas if no weights are available
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      }
      return;
    }

    // Render the chart
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      const sortByDate = weights.sort((a, b) => parseInt(b.date, 10) - parseInt(a.date, 10)).reverse();
      const weightNum = sortByDate.map((weight) => parseInt(weight.date, 10));
      const weightData = sortByDate.map((obj) => obj.weight);
      const formattedDates = weightNum.map((timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
      });
      // console.warn(formattedDates);
      // console.warn(weightNum);
      // const weightNumDates = weightNum.map((timestamp) => {
      //   const date = new Date(timestamp);
      //   return date;
      // });

      // Returns an array of dates between the two dates
      // const getDatesBetween = (startDate, endDate) => {
      //   const dates = [];
      //   const dateFormat = new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

      //   const currentDate = new Date(startDate);

      //   while (currentDate <= endDate) {
      //     dates.push(dateFormat.format(currentDate));

      //     currentDate.setDate(currentDate.getDate() + 1);
      //   }

      //   return dates;
      // };

      // console.warn(getDatesBetween(weightNumDates[0], weightNumDates[weightNumDates.length - 1]));

      if (chartRef.current.chartInstance) {
        // If chart instance exists, update its data
        chartRef.current.chartInstance.data.labels = formattedDates;
        chartRef.current.chartInstance.data.datasets[0].data = weightData;
        chartRef.current.chartInstance.options.scales.y.suggestedMax = parseInt(weightData[0], 10) + 10;
        chartRef.current.chartInstance.update();
      } else {
        // If chart instance doesn't exist, create new chart
        chartRef.current.chartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: formattedDates,
            datasets: [{
              label: 'Weight',
              data: weightData,
              fill: false,
              borderColor: 'rgba(0, 0, 0, 1)',
              borderWidth: 2,
            }],
          },
          options: {
            scales: {
              y: {
                suggestedMin: 0,
                suggestedMax: weightData[0].weight + 10,
              },
            },
          },
        });
      }
    }
  }, [weights]);

  return (
    <div>
      {weights.length > 0 ? (
        <canvas ref={chartRef} id="myChart" />
      ) : (
        <div>No Weights Recorded</div>
      )}
    </div>
  );
}

WeightChart.propTypes = {
  weights: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.number.isRequired,
      weight: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
