export const createOptions = (index, title) => ({
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: `${index} - ${title}`,
    },
  },
});

export const createGraphData = (arrData, labels) => {
  return {
    labels,
    datasets: [
      {
        label: "Total",
        data: arrData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
};
