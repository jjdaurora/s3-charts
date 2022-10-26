const baseUrl = "https://pulse-stockprice.s3.us-east-2.amazonaws.com"

        
const aws = fetch(baseUrl + "/" + window.location.pathname.split("/")[window.location.pathname.split("/").length - 1].split(".html")[0] + ".json")
.then((response) => response.json())
.then((data) => {
        
ctx = document.getElementById('myChart'); // node
ctx = document.getElementById('myChart').getContext('2d');

window.chartData = data
window.chartLabels = data.map(d => Object.values(d)[0]);
window.chartValues = data.map(d => parseInt(Object.values(d)[1]));

window.dataset = {
    labels: chartLabels,
    datasets: [{
        label: document.getElementById("chart-data").getAttribute("data-title"),
        data: chartValues,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: .5
    }]
};

window.config = {
type: 'line',
data: dataset,
options: {
    title: {
       text: "Data",
       display: true
    },
    responsive: false
},

};

window.s3Chart = new Chart(ctx, config)

console.log(s3Chart)
});

const filterData = (startDate, endDate) => {
    // need to input chart frequency 
    console.log(startDate, endDate)

    // if equal to startDate, splice everything before
    // if equal to endDate , splice everything after
   
   newData = chartData.filter(d => {
       return Object.values(d)[0] >= startDate.getFullYear() && Object.values(d)[0]  <= endDate.getFullYear()
     }
    )

   updateData(s3Chart, newData)
}   

//

function updateData(chart, newData) {
   
    let newDataset = {
        labels: newData.map(d => Object.values(d)[0]),
        datasets: [{
            label: document.getElementById("chart-data").getAttribute("data-title"),
            data:  newData.map(d => parseInt(Object.values(d)[1])),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: .5
        }]
    };
    
    chart.data = newDataset
    chart.update();
}

// function removeData(chart) {
//     chart.data.labels.pop();
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.pop();
//     });
//     chart.update();
// }