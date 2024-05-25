import Chart from 'chart.js/auto';
import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { getAllWeights } from '../api/weightData';

export default function WeightChart({ petId }) {
  const [weights, setWeights] = useState([]);

  const getAllPetWeights = () => {
    getAllWeights(petId).then((array) => setWeights(array));
  };

  useEffect(() => {
    getAllPetWeights();
  }, []);

  const renderChart = () => {
    console.warn(weights);
    const sortByDate = weights.sort((a, b) => parseInt(b.date, 10) - parseInt(a.date, 10)).reverse();
    console.warn(sortByDate);
    const weightNum = sortByDate.map((weight) => parseInt(weight.date, 10));
    console.warn(weightNum);
    const weightData = sortByDate.map((obj) => obj.weight);
    console.warn(weightData);

    const formattedDates = weightNum.map((timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString(); // Adjust format as needed
    });

    console.warn(formattedDates);

    const ctx = document.getElementById('myChart');

    if (ctx) {
      // eslint-disable-next-line
      new Chart(ctx, {
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
              suggestedMax: parseInt(weightData[0], 10) + 10,
            },
          },
        },
      });
    }
  };

  useEffect(() => {
    if (weights.length > 0) {
      renderChart();
    }
  }, [weights]);

  return (
    <div>
      {weights.length > 0 ? (
        <canvas id="myChart" />
      ) : (
        <div>No Weights Recorded</div>
      )}
    </div>
  );
}

WeightChart.propTypes = {
  petId: PropTypes.string.isRequired,
};
