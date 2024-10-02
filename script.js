document.addEventListener('DOMContentLoaded', function () {
    let totalChiSquare = 0;

    const upperLimitsInput = document.getElementById('upperLimits');
    const observedFreqsInput = document.getElementById('observedFreqs');
    const expectedFreqsInput = document.getElementById('expectedFreqs');
    const alphaInput = document.getElementById('alpha');
    const tableBody = document.getElementById('table-body');
    const chiSquareResult = document.getElementById('chi-square-result');
    const finalDecision = document.getElementById('final-decision');

    const chiSquareTable = {
        1: { 0.995: 0.000, 0.99: 0.000, 0.975: 0.001, 0.95: 0.004, 0.9: 0.016, 0.1: 2.706, 0.05: 3.841, 0.025: 5.024, 0.01: 6.635, 0.005: 7.879 },
        2: { 0.995: 0.010, 0.99: 0.020, 0.975: 0.051, 0.95: 0.103, 0.9: 0.211, 0.1: 4.605, 0.05: 5.991, 0.025: 7.378, 0.01: 9.210, 0.005: 10.597 },
        3: { 0.995: 0.072, 0.99: 0.115, 0.975: 0.216, 0.95: 0.352, 0.9: 0.584, 0.1: 6.251, 0.05: 7.815, 0.025: 9.348, 0.01: 11.345, 0.005: 12.838 },
        4: { 0.995: 0.207, 0.99: 0.297, 0.975: 0.484, 0.95: 0.711, 0.9: 1.064, 0.1: 7.779, 0.05: 9.488, 0.025: 11.143, 0.01: 13.277, 0.005: 14.860 },
        5: { 0.995: 0.412, 0.99: 0.554, 0.975: 0.831, 0.95: 1.145, 0.9: 1.610, 0.1: 9.236, 0.05: 11.070, 0.025: 12.833, 0.01: 15.086, 0.005: 16.750 },
        6: { 0.995: 0.676, 0.99: 0.872, 0.975: 1.237, 0.95: 1.635, 0.9: 2.204, 0.1: 10.645, 0.05: 12.592, 0.025: 14.449, 0.01: 16.812, 0.005: 18.548 },
        7: { 0.995: 0.989, 0.99: 1.239, 0.975: 1.690, 0.95: 2.167, 0.9: 2.833, 0.1: 12.017, 0.05: 14.067, 0.025: 16.013, 0.01: 18.475, 0.005: 20.278 },
        8: { 0.995: 1.344, 0.99: 1.646, 0.975: 2.180, 0.95: 2.733, 0.9: 3.490, 0.1: 13.362, 0.05: 15.507, 0.025: 17.535, 0.01: 20.090, 0.005: 21.955 },
        9: { 0.995: 1.735, 0.99: 2.088, 0.975: 2.700, 0.95: 3.325, 0.9: 4.168, 0.1: 14.684, 0.05: 16.919, 0.025: 19.023, 0.01: 21.666, 0.005: 23.589 },
        10: { 0.995: 2.156, 0.99: 2.558, 0.975: 3.247, 0.95: 3.940, 0.9: 4.865, 0.1: 15.987, 0.05: 18.307, 0.025: 20.483, 0.01: 23.209, 0.005: 25.188 },
        11: { 0.995: 2.603, 0.99: 3.053, 0.975: 3.816, 0.95: 4.575, 0.9: 5.578, 0.1: 17.275, 0.05: 19.675, 0.025: 21.920, 0.01: 24.725, 0.005: 26.757 },
        12: { 0.995: 3.074, 0.99: 3.571, 0.975: 4.404, 0.95: 5.226, 0.9: 6.304, 0.1: 18.549, 0.05: 21.026, 0.025: 23.337, 0.01: 26.217, 0.005: 28.300 },
        13: { 0.995: 3.565, 0.99: 4.107, 0.975: 5.009, 0.95: 5.892, 0.9: 7.042, 0.1: 19.812, 0.05: 22.362, 0.025: 24.736, 0.01: 27.688, 0.005: 29.819 },
        14: { 0.995: 4.075, 0.99: 4.660, 0.975: 5.629, 0.95: 6.571, 0.9: 7.790, 0.1: 21.064, 0.05: 23.685, 0.025: 26.119, 0.01: 29.141, 0.005: 31.319 },
        15: { 0.995: 4.601, 0.99: 5.229, 0.975: 6.262, 0.95: 7.261, 0.9: 8.547, 0.1: 22.307, 0.05: 24.996, 0.025: 27.488, 0.01: 30.578, 0.005: 32.801 },
        16: { 0.995: 5.142, 0.99: 5.812, 0.975: 6.908, 0.95: 7.962, 0.9: 9.312, 0.1: 23.542, 0.05: 26.296, 0.025: 28.845, 0.01: 32.000, 0.005: 34.267 },
        17: { 0.995: 5.697, 0.99: 6.408, 0.975: 7.564, 0.95: 8.672, 0.9: 10.085, 0.1: 24.769, 0.05: 27.587, 0.025: 30.191, 0.01: 33.409, 0.005: 35.718 },
        18: { 0.995: 6.265, 0.99: 7.015, 0.975: 8.231, 0.95: 9.390, 0.9: 10.865, 0.1: 25.989, 0.05: 28.869, 0.025: 31.526, 0.01: 34.805, 0.005: 37.156 },
        19: { 0.995: 6.844, 0.99: 7.633, 0.975: 8.907, 0.95: 10.117, 0.9: 11.651, 0.1: 27.204, 0.05: 30.144, 0.025: 32.852, 0.01: 36.191, 0.005: 38.582 },
        20: { 0.995: 7.434, 0.99: 8.260, 0.975: 9.591, 0.95: 10.851, 0.9: 12.443, 0.1: 28.412, 0.05: 31.410, 0.025: 34.170, 0.01: 37.566, 0.005: 39.997 },
        21: { 0.995: 8.034, 0.99: 8.897, 0.975: 10.283, 0.95: 11.591, 0.9: 13.240, 0.1: 29.615, 0.05: 32.671, 0.025: 35.479, 0.01: 38.932, 0.005: 41.401 },
        22: { 0.995: 8.643, 0.99: 9.542, 0.975: 10.982, 0.95: 12.338, 0.9: 14.041, 0.1: 30.813, 0.05: 33.924, 0.025: 36.781, 0.01: 40.289, 0.005: 42.796 },
        23: { 0.995: 9.260, 0.99: 10.196, 0.975: 11.689, 0.95: 13.091, 0.9: 14.848, 0.1: 32.007, 0.05: 35.172, 0.025: 38.076, 0.01: 41.638, 0.005: 44.181 },
        24: { 0.995: 9.886, 0.99: 10.856, 0.975: 12.401, 0.95: 13.848, 0.9: 15.659, 0.1: 33.196, 0.05: 36.415, 0.025: 39.364, 0.01: 42.980, 0.005: 45.559 },
        25: { 0.995: 10.520, 0.99: 11.524, 0.975: 13.120, 0.95: 14.611, 0.9: 16.473, 0.1: 34.382, 0.05: 37.652, 0.025: 40.646, 0.01: 44.314, 0.005: 46.928 },
        26: { 0.995: 11.160, 0.99: 12.198, 0.975: 13.844, 0.95: 15.379, 0.9: 17.292, 0.1: 35.563, 0.05: 38.885, 0.025: 41.923, 0.01: 45.642, 0.005: 48.290 },
        27: { 0.995: 11.808, 0.99: 12.879, 0.975: 14.573, 0.95: 16.151, 0.9: 18.114, 0.1: 36.741, 0.05: 40.113, 0.025: 43.195, 0.01: 46.963, 0.005: 49.645 },
        28: { 0.995: 12.461, 0.99: 13.565, 0.975: 15.308, 0.95: 16.928, 0.9: 18.939, 0.1: 37.916, 0.05: 41.337, 0.025: 44.461, 0.01: 48.278, 0.005: 50.993 },
        29: { 0.995: 13.121, 0.99: 14.256, 0.975: 16.047, 0.95: 17.708, 0.9: 19.768, 0.1: 39.087, 0.05: 42.557, 0.025: 45.722, 0.01: 49.588, 0.005: 52.336 },
        30: { 0.995: 13.787, 0.99: 14.953, 0.975: 16.791, 0.95: 18.493, 0.9: 20.599, 0.1: 40.256, 0.05: 43.773, 0.025: 46.979, 0.01: 50.892, 0.005: 53.672 },
        40: { 0.995: 20.707, 0.99: 22.164, 0.975: 24.433, 0.95: 26.509, 0.9: 29.051, 0.1: 51.805, 0.05: 55.758, 0.025: 59.342, 0.01: 63.691, 0.005: 66.766 },
        50: { 0.995: 27.991, 0.99: 29.707, 0.975: 32.357, 0.95: 34.764, 0.9: 37.689, 0.1: 63.167, 0.05: 67.505, 0.025: 71.420, 0.01: 76.154, 0.005: 79.490 },
        60: { 0.995: 35.534, 0.99: 37.485, 0.975: 40.482, 0.95: 43.188, 0.9: 46.459, 0.1: 74.397, 0.05: 79.082, 0.025: 83.298, 0.01: 88.379, 0.005: 91.952 },
        70: { 0.995: 43.275, 0.99: 45.442, 0.975: 48.758, 0.95: 51.739, 0.9: 55.329, 0.1: 85.527, 0.05: 90.531, 0.025: 95.023, 0.01: 100.425, 0.005: 104.215 },
        80: { 0.995: 51.172, 0.99: 53.540, 0.975: 57.153, 0.95: 60.391, 0.9: 64.278, 0.1: 96.578, 0.05: 101.879, 0.025: 106.629, 0.01: 112.329, 0.005: 116.321 },
        90: { 0.995: 59.196, 0.99: 61.754, 0.975: 65.647, 0.95: 69.126, 0.9: 73.291, 0.1: 107.565, 0.05: 113.145, 0.025: 118.136, 0.01: 124.116, 0.005: 128.299 },
        100: { 0.995: 67.328, 0.99: 70.065, 0.975: 74.222, 0.95: 77.929, 0.9: 82.358, 0.1: 118.498, 0.05: 124.342, 0.025: 129.561, 0.01: 135.807, 0.005: 140.169 }
    };

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

        updateResults(alpha, upperLimits.length - 1);
        updateBarChart(data);
    });

    function updateResults(alpha, degreesOfFreedom) {
        const criticalValue = chiSquareTable[degreesOfFreedom]?.[alpha] || 0; // Get critical value based on alpha and df
        chiSquareResult.textContent = `Chi-Square Statistic: χ² = ${totalChiSquare.toFixed(2)}`;

        const decision = totalChiSquare < criticalValue
            ? 'Accept the null hypothesis (Uniform distribution).'
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
