import React, { Component } from "react";
import Chart from "chart.js";
import { render } from "@testing-library/react";
import { fakeData } from "../../Data/sharedData.js";

Chart.defaults.global.defaultFontColor = "#fff";
Chart.plugins.register({
  afterDatasetsDraw: function(chart, easing) {
    var ctx = chart.ctx;

    chart.data.datasets.forEach(function(dataset, i) {
      var meta = chart.getDatasetMeta(i);
      if (meta.type == "bubble") { //exclude scatter
        meta.data.forEach(function(element, index) {
          // Draw the text in black, with the specified font
          ctx.fillStyle = 'rgb(0, 0, 0)';
          var fontSize = 13;
          var fontStyle = 'normal';
          var fontFamily = 'Helvetica Neue';
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

          // Just naively convert to string for now
          var dataString = dataset.data[index].toString();
          // Make sure alignment settings are correct
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          var padding = 15;
          var position = element.tooltipPosition();
          ctx.fillText(dataset.title, position.x, position.y - (fontSize / 2) - padding);
        });
      } //if
    });
  }
});

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // this.getData()
    this.createChart(this.prepareData());
  }
  //  getData() {
  //    fetch('')
  //      .then(response => response.json())
  //      .then(jData => this.prepareData(jData))
  //      .then(data => this.createChart(data))
  //  }
  prepareData(type) {
    console.log(type);
    const chartData = {
      labels: ['one', 'two'],
      datasets: [{
        label: ["China"],
        backgroundColor: "rgba(255,221,50,0.2)",
        borderColor: "rgba(255,221,50,1)",
        fontSize:40,
        fontStyle:'italic',
        title: "dataTitle1",
        color: 'green',
        textsize:40,
        data: [{
          x: 21269017,
          y: 5.245,
          r: 60
          }]
      }, {
        label: ["Denmark"],
        backgroundColor: "rgba(60,186,159,0.2)",
        borderColor: "rgba(60,186,159,1)",
        title: "dataTitle2",
        fontSize:50,
        data: [{
          x: 258702,
          y: 7.526,
          r: 10
        }]
      }, {
        label: ["Germany"],
        backgroundColor: "rgba(0,0,0,0.2)",
        borderColor: "#000",
        title: "dataTitle3",
        data: [{
          x: 3979083,
          y: 6.994,
          r: 15
        }]
      }, {
        label: ["Japan"],
        backgroundColor: "rgba(193,46,120,0.2)",
        borderColor: "rgba(193,46,12,1)",
        title: "dataTitle4",
        data: [{
          x: 4931877,
          y: 5.921,
          r: 15
        }]
      }]
    };

    fakeData.forEach(d => {
      chartData.labels.push(d.name);
      chartData.datasets[0].data.push(d.amount);
    });
    console.log(chartData);
    return chartData;
  }

  createChart(data) {
    const ctx = document.querySelector("#states");
    new Chart(ctx, {
      type: this.props.type,
      data: data,

      options: {
        tooltipTemplate: "<%= value %>",

        showTooltips: true,
      
        onAnimationComplete: function() {
          this.showTooltip(this.datasets[0].points, true);
        },
        tooltipEvents: [],
        responsive: false,
        legend: {
          display: false,
          labels: {
            fontColor: "white"
          }
        },

        title: {
          display: false,
          text: "Do you plan on voting in 2020?",
          padding: 20,
          fontColor: "white",
          fontSize: 20
          // fontFamily: 'anonymous pro',
        },
        scales: {
          tooltips: {
            displayColors: false
          },
          xAxes: [
            {
              display: true,
              ticks: {
                // padding:20
              },
              gridLines: {
                drawBorder: false,
                display: false
              }
            }
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
                display: false
              },
              gridLines: {
                drawBorder: false,
                display: false
              }
            }
          ]
        }
      }
    });
    //    Chart.defaults.scale.gridLines.drawOnChartArea = false;
  }

  render() {
    console.log(this.props);
    return (
      <>
        <div className="bar-chart">
          <canvas
            id="states"
            className="chart"
            style={{ height: "85%" }}
          ></canvas>
          <section className="backdrop">
            More Non-Voters in New Hampshire plan to vote compared to the
            average for swing states.
          </section>
        </div>
      </>
    );
  }
}

export default BarChart;
