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
    const dates = weights.map((date) => new Date(date).toLocaleDateString());
    console.warn(dates);
    const weightData = weights.map((obj) => obj.weight);
    console.warn(weights);
    console.warn(weightData[0]);

    const ctx = document.getElementById('myChart');

    if (ctx) {
      // eslint-disable-next-line
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
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
