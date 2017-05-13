/*
 * Set up a sample chart
 */
var data = {
    labels: [
        "Positive",
        "Neutral",
        "Negative"
    ],
    datasets: [
        {
            data: [0.274, 0.095, 0.631],
            backgroundColor: [
                "#4CAF50",
                "#FFC107",
                "#F44336"
            ],
            hoverBackgroundColor: [
                "#43A047",
                "#FFB300",
                "#E53935"
            ]
        }]
};

var ctx = document.getElementById('postSentiment');

var postSentiment = new Chart(ctx,{
    type: 'doughnut',
    data: data,
    options: {
        legend: {
            position: 'bottom'
        }
    }
});

var app = (function () {
    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Sentiment",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [0.5, 0.2, -0.5, -0.74, -0.85, -0.5, 0.1],
                spanGaps: false,
            }
        ]
    };

    var ctx = document.getElementById('sentimentTime');

    var sentimentTime = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            legend: {
                display: false
            }
        }
    });
});

app();

/*
 * Set up tabs
 */
$('.menu .item').tab();

/*
 * Network selection form
 */
$('#networkForm').on('submit', function(e) {
    e.preventDefault();

    // refresh the page to get new results
    location.reload();
});

$('[data-truncate="show"]').on('click', function(e) {
    var $t = $(this);

    // show full text
    $t.parent().find('.post__content:first').removeClass('post__content--truncated');

    // remove this button
    $t.remove();
});
