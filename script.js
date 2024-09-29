document.addEventListener('DOMContentLoaded', function () {
    let totalChiSquare = 0;

    const upperLimitsInput = document.getElementById('upperLimits');
    const observedFreqsInput = document.getElementById('observedFreqs');
    const expectedFreqsInput = document.getElementById('expectedFreqs');
    const alphaInput = document.getElementById('alpha');
    const tableBody = document.getElementById('table-body');
    const chiSquareResult = document.getElementById('chi-square-result');
    const finalDecision = document.getElementById('final-decision');

    document.getElementById('calculateBtn').addEventListener('click', function () {
        const upperLimits = upperLimitsInput.value.split(',').map(parseFloat);
        const observedFreqs = observedFreqsInput.value.split(',').map(parseFloat);
        const expectedFreqs = expectedFreqsInput.value.split(',').map(parseFloat);
        const alpha = parseFloat(alphaInput.value);
        
        if (upperLimits.length !== observedFreqs.length || observedFreqs.length !== expectedFreqs.length || isNaN(alpha)) {
            alert('Please enter valid comma-separated numbers for all inputs and a valid alpha.');
            return;
        }

        let data = [];
        totalChiSquare = 0;
        tableBody.innerHTML = '';

        for (let i = 0; i < upperLimits.length; i++) {
            const interval = `${i === 0 ? 0.0 : upperLimits[i - 1]} - ${upperLimits[i]}`;
            const observed = observedFreqs[i];
            const expected = expectedFreqs[i];

            const chiSquareContrib = ((observed - expected) ** 2) / expected;
            totalChiSquare += chiSquareContrib;

            data.push({
                interval,
                upperLimit: upperLimits[i],
                observed,
                expected,
                chiSquareContrib: chiSquareContrib.toFixed(2)
            });

            const row = `
                <tr>
                    <td>${interval}</td>
                    <td>${upperLimits[i].toFixed(1)}</td>
                    <td>${observed}</td>
                    <td>${expected}</td>
                    <td>${chiSquareContrib.toFixed(2)}</td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        }

        updateResults(alpha);
        updateBarChart(data);
    });

    function updateResults(alpha) {
        const degreesOfFreedom = document.getElementById('upperLimits').value.split(',').length - 1;
        const criticalValue = jStat.chisquare.inv(1 - alpha, degreesOfFreedom); // Using a chi-square table based on the given alpha

        chiSquareResult.textContent = `Chi-Square Statistic: χ² = ${totalChiSquare.toFixed(2)}`;

        const decision = totalChiSquare < criticalValue
            ? 'Fail to reject the null hypothesis (Uniform distribution).'
            : 'Reject the null hypothesis (Non-uniform distribution).';

        finalDecision.textContent = `Conclusion: ${decision}`;
    }

    function updateBarChart(data) {
        const ctx = document.getElementById('barChart').getContext('2d');

        const observedFrequencies = data.map(item => item.observed);
        const expectedFrequencies = data.map(item => item.expected);
        const intervals = data.map(item => item.interval);

        if (window.myChart) {
            window.myChart.destroy(); // Destroy previous chart instance before creating a new one
        }

        window.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: intervals,
                datasets: [
                    {
                        label: 'Observed Frequency',
                        data: observedFrequencies,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        borderColor: 'rgba(0, 0, 0, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Expected Frequency',
                        data: expectedFrequencies,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderColor: 'rgba(0, 0, 0, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            color: 'black'
                        }
                    },
                    x: {
                        ticks: {
                            color: 'black'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'black'
                        }
                    }
                }
            }
        });
    }
});
