export const newUsersChartOptions = {
    chart: {
        type: 'line',
        height: '100%',
        toolbar: {
            show: true,
        },
        foreColor: '#c7d2fe',
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
            style: {
                colors: '#c7d2fe',
            },
        },
    },
    yaxis: {
        labels: {
            style: {
                colors: '#c7d2fe',
            },
        },
    },
    stroke: {
        curve: 'smooth',
    },
    colors: ['#4CAF50'],
    tooltip: {
        theme: 'dark',
        style: {
            fontSize: '12px',
        },
        x: {
            show: true,
        },
        y: {
            title: {
                formatter: (seriesName) => seriesName,
            },
        },
        marker: {
            show: true,
        },
    },
};

export const ageDistributionChartOptions = {
    chart: {
        type: 'bar',
        height: '100%',
        toolbar: {
            show: true,
        },
        foreColor: '#c7d2fe',
    },
    xaxis: {
        categories: ['10-19', '20-29', '30-39', '40-49', '50-59', '60-69'],
        labels: {
            style: {
                colors: '#c7d2fe',
            },
        },
    },
    yaxis: {
        labels: {
            style: {
                colors: '#c7d2fe',
            },
        },
    },
    colors: ['#FF9800'],
    tooltip: {
        theme: 'dark',
        style: {
            fontSize: '12px',
        },
        x: {
            show: true,
        },
        y: {
            title: {
                formatter: (seriesName) => seriesName,
            },
        },
        marker: {
            show: true,
        },
    },
};

export const activeInactiveChartOptions = {
    chart: {
        type: 'pie',
        height: '100%',
        foreColor: '#c7d2fe',
    },
    labels: ['Ativos', 'Inativos'],
    colors: ['#2196F3', '#F44336'],
    tooltip: {
        theme: 'dark',
        style: {
            fontSize: '12px',
        },
        x: {
            show: true,
        },
        y: {
            title: {
                formatter: (seriesName) => seriesName,
            },
        },
        marker: {
            show: true,
        },
    },
};
