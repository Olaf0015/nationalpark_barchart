d3.csv('https://raw.githubusercontent.com/Olaf0015/nationalpark_barchart/refs/heads/main/全台景點總人次(前十).csv').then(
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
    // ★ 過濾掉總人次為 0 或沒有景點名稱的資料
    res = res.filter(d => Number(d['總人次']) > 0 && d['景點名稱']);

    res.forEach(d => {
        d['總人次'] = Number(d['總人次']);
    });

    res.sort((a, b) => b['總人次'] - a['總人次']);

    const totalVisitors = unpack(res, '總人次');
    const nationalParks = unpack(res, '景點名稱');
    const maxTotalVisitors = Math.max(...totalVisitors);

    let trace1 = {
        type: "bar",
        x: totalVisitors,
        y: nationalParks,
        text: totalVisitors,
        orientation: 'h',
        textfont: {
            family: "sans serif",
            size: 30,
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
            text: "全台景點總人次(前十名)",
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
                text: "景點名稱",
                font: { size: 40, color: "black" },
                standoff: 50
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
