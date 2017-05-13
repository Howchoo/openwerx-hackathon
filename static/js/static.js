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
