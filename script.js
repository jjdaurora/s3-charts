const baseUrl = "https://pulse-stockprice.s3.us-east-2.amazonaws.com"

        
        const aws = fetch(baseUrl + "/" + window.location.pathname.split("/")[window.location.pathname.split("/").length - 1].split(".html")[0] + ".json")
        .then((response) => response.json())
        .then((data) => {
                
        ctx = document.getElementById('myChart'); // node
        ctx = document.getElementById('myChart').getContext('2d');

        const dataset = {
            labels: data.map(d => Object.values(d)[0]),
            datasets: [{
                label: document.getElementById("chart-data").getAttribute("data-title"),
                data: data.map(d => parseInt(Object.values(d)[1])),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: .5
            }]
        };

        const config = {
        type: 'line',
        data: dataset,
        options: {
            responsive: false
        },

        };

        new Chart(ctx, {
            type: 'line',
            options: config,
            data: dataset
        });

        console.log(dataset)
        });