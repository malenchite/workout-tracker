function generatePalette() {
  const arr = [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
  ];

  return arr;
}

function populateChart(data) {
  const durations = data.map(({ totalDuration }) => totalDuration);
  const totalWeight = calculateTotalWeight(data);
  const { durationTypes, durationsByType } = getDurationByType(data);
  const { weightTypes, weightsByType } = getWeightByType(data);
  const colors = generatePalette();

  let line = document.querySelector('#canvas').getContext('2d');
  let bar = document.querySelector('#canvas2').getContext('2d');
  let pie = document.querySelector('#canvas3').getContext('2d');
  let pie2 = document.querySelector('#canvas4').getContext('2d');

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const labels = data.map(({ day }) => {
    const date = new Date(day);
    return daysOfWeek[date.getDay()];
  });

  let lineChart = new Chart(line, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Workout Duration In Minutes',
          backgroundColor: 'red',
          borderColor: 'red',
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Pounds',
          data: totalWeight,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Pounds Lifted',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: 'pie',
    data: {
      labels: durationTypes,
      datasets: [
        {
          label: 'Exercises Performed',
          backgroundColor: colors,
          data: durationsByType,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Duration by Exercise Performed (minutes)',
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return `${data.labels[tooltipItem.index]}: ${data.datasets[0].data[tooltipItem.index]} minutes`;
          }
        }
      }
    },
  });

  let donutChart = new Chart(pie2, {
    type: 'doughnut',
    data: {
      labels: weightTypes,
      datasets: [
        {
          label: 'Exercises Performed',
          backgroundColor: colors,
          data: weightsByType,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Weight by Exercise Performed (pounds)',
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return `${data.labels[tooltipItem.index]}: ${data.datasets[0].data[tooltipItem.index]} pounds`;
          }
        }
      }
    },
  });
}

function calculateTotalWeight(data) {
  let totals = [];

  data.forEach((workout) => {
    const workoutTotal = workout.exercises.reduce((total, { type, weight }) => {
      if (type === 'resistance') {
        return total + weight;
      } else {
        return total;
      }
    }, 0);

    totals.push(workoutTotal);
  });

  return totals;
}

// Get durations for each exercise type, return list of types and associated durations
function getDurationByType(data) {
  let durationTypes = [];
  let durationsByType = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      if (durationTypes.includes(exercise.name)) {
        durationsByType[durationTypes.indexOf(exercise.name)] += exercise.duration;
      } else {
        durationTypes.push(exercise.name);
        durationsByType.push(exercise.duration);
      }
    });
  });

  return { durationTypes, durationsByType };
}

// Get weights for each exercise type, return list of types and associated weights
function getWeightByType(data) {
  let weightTypes = [];
  let weightsByType = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      if (exercise.type === 'resistance') {
        if (weightTypes.includes(exercise.name)) {
          weightsByType[weightTypes.indexOf(exercise.name)] += exercise.weight;
        } else {
          weightTypes.push(exercise.name);
          weightsByType.push(exercise.weight);
        }
      }
    });
  });

  return { weightTypes, weightsByType };
}

// get all workout data from back-end
API.getWorkoutsInRange().then(populateChart);
