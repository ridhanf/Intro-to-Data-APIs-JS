
async function chatIt() {
    const data = await getData();
    var ctx = document.getElementById('chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xs,
            datasets: [{
                label: "Combined Land-Surface Air and Sea-Surface Water Temperature in °C Anomalies (Land-Ocean Temperature Index, L-OTI)",
                data: data.ys,
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function(value, index, values) {
                            return value + '°';
                        }
                    }
                }]
            }
        }
    });
}

// Data from: https://data.giss.nasa.gov/gistemp/
// Mean from: https://earthobservatory.nasa.gov/world-of-change/DecadalTemp

async function getData() {
    const xs = [];
    const ys = [];
    const response = await fetch('ZonAnn.Ts+dSST.csv');
    const data = await response.text();

    const table = data.split('\n').slice(1);
    table.forEach(row => {
        const columns = row.split(',')
        const year = columns[0];
        xs.push(year)
        const temp = columns[1]
        ys.push(parseFloat(temp) + 14)
        console.log(year, temp);
    })
    return { xs, ys };
}

chatIt();
