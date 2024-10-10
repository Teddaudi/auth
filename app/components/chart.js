"use client"
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const Charts = () => {
    const [pieOptions, setPieOptions] = useState({
        chart: {
            height: 350,
            type: "pie",
        },
        colors: ["#FF1654", "#247BA0"],
        series: [44, 55, 13, 33],
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
    });

    const [candleOptions, setCandleOptions] = useState({
        chart: {
            height: 350,
            type: "candlestick",
        },
        colors: ["#FF1654", "#247BA0"],
        series: [{
            data: [
                [1538856000000, [6593.34, 6600, 6582.63, 6600]],
                [1538856900000, [6595.16, 6604.76, 6590.73, 6593.86]]
            ]
        }]
    });

    const [heatmapOptions, setHeatmapOptions] = useState({
        chart: {
            height: 350,
            type: "heatmap",
        },
        colors: ["#FF1654", "#247BA0"],
        series: [
            {
                name: "Series 1",
                data: [
                    { x: 'W1', y: 22 },
                    { x: 'W2', y: 29 },
                    { x: 'W3', y: 13 },
                    { x: 'W4', y: 32 }
                ]
            },
            {
                name: "Series 2",
                data: [
                    { x: 'W1', y: 43 },
                    { x: 'W2', y: 43 },
                    { x: 'W3', y: 43 },
                    { x: 'W4', y: 43 }
                ]
            }
        ]
    });

    return (
        <div>
            <div id="pie_chart">
                <Chart options={pieOptions} series={pieOptions.series} type="pie" height={350} />
            </div>
            <div id="candle_chart">
                <Chart options={candleOptions} series={candleOptions.series} type="candlestick" height={350} />
            </div>
            <div id="heatmap_chart">
                <Chart options={heatmapOptions} series={heatmapOptions.series} type="heatmap" height={350} />
            </div>
        </div>
    );
};

export default Charts;
