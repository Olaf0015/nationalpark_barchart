d3.csv('https://raw.githubusercontent.com/Olaf0015/nationalpark_barchart/refs/heads/main/國家公園總人次(全).csv').then(
    res => {
        drawLineChart(res);
    }
);

function unpack(rows, key) {
    return rows.map(function (row) {
        return row[key];
    });
}

function drawLineChart(res) {
    res.forEach(d => {
        d['總人次'] = Number(d['總人次']);
    });

    res.sort((a, b) => b['總人次'] - a['總人次']);

    const totalVisitors = unpack(res, '總人次');
    const nationalParks = unpack(res, '國家公園');
    const maxTotalVisitors = Math.max(...totalVisitors);

    let trace1 = {
        type: "bar",
        x: totalVisitors,
        y: nationalParks,
        text: totalVisitors,
        orientation: 'h',
        textfont: {
            family: "sans serif",
            size: 30, // 放大字體
            color: "black"
        },
        textangle: 0,
        textposition: 'outside',
        marker: {
            color: "blue"
        }
    };

    let data = [trace1];

let layout = {
    margin: { t: 150, l: 300, b: 100, r: 0 },
    title: { 
        text: "各國家公園總人次",
        font: { size: 50, color: "black" },
    },
    barmode: "stack",
    xaxis: {
        title: {
            text: "總人次",
            font: { size: 40, color: "black" },
            standoff: 20
        },
        range: [0, maxTotalVisitors * 1.1],
        tickformat: ",.0s",
        tickangle: 0
    },
    yaxis: {
        title: {
            text: "國家公園",
            font: { size: 40, color: "black" },
            standoff: 50   // ★★★ 這裡加大間距
        },
        tickfont: {
            size: 30,
            color: "black"
        },
        automargin: true,
        autorange: 'reversed'
    }
};


    Plotly.newPlot("myGraph", data, layout);
}
