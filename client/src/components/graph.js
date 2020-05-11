import React, {Component} from 'react';
import Chart from 'react-apexcharts'

class Graph extends Component {
    // Props:
    // dates, volume
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: 'volumechart'
                },
                xaxis: {
                    categories: this.props.dates
                },
                stroke: {
                    width: 7,
                    curve: 'smooth'
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        gradientToColors: [ '#24fda9'],
                        shadeIntensity: 1,
                        type: 'horizontal',
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100, 100, 100]
                    },
                },
                title: {
                    text: 'Volume',
                    align: 'left',
                    style: {
                        fontSize: "16px",
                        color: '#666'
                    }
                }
            },
            series: [{
                name: 'volume',
                data: this.props.volume
            }]
        }
    }

    render() {
        return (
            <div>
                <Chart options={this.state.options} series={this.state.series} type="line"  />
            </div>
        );
    }
}

export default Graph;