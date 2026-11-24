
document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('[data-toggle="sidebar"]');
  if (toggle && sidebar) {
    toggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
    });
  }

  document.querySelectorAll('[data-password-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const input = document.getElementById(btn.dataset.passwordToggle);
      if (!input) return;
      const showing = input.type === 'text';
      input.type = showing ? 'password' : 'text';
      btn.textContent = showing ? 'Show' : 'Hide';
    });
  });

  if (typeof Chart !== 'undefined') {
    const charts = document.querySelectorAll('[data-chart]');
    charts.forEach(function (canvas) {
      const labels = JSON.parse(canvas.dataset.labels || '[]');
      const values = JSON.parse(canvas.dataset.values || '[]');
      const cfg = {
        type: canvas.dataset.chartType || 'line',
        data: {
          labels: labels,
          datasets: [{
            label: canvas.dataset.label || 'Activity',
            data: values,
            borderColor: canvas.dataset.border || '#14b8a6',
            backgroundColor: canvas.dataset.fill || 'rgba(20,184,166,0.12)',
            borderWidth: 2.5,
            tension: 0.4,
            fill: canvas.dataset.fillbool === 'true',
            pointBackgroundColor: '#f8fafc'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148,163,184,.07)' } },
            y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148,163,184,.07)' } }
          }
        }
      };
      new Chart(canvas, cfg);
    });
  }

  if (document.getElementById('map') && typeof L !== 'undefined') {
    const map = L.map('map').setView([40.7128, -74.0060], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const points = [
      { lat: 40.7142, lng: -74.0061, title: 'Damaged Road Near Central Park', status: 'Open', color: '#14b8a6' },
      { lat: 40.7042, lng: -73.9958, title: 'Broken Streetlights on Oak Avenue', status: 'Pending', color: '#fbbf24' },
      { lat: 40.7242, lng: -73.9986, title: 'Waste Accumulation Near Riverside', status: 'In Progress', color: '#22d3ee' },
      { lat: 40.6945, lng: -74.0175, title: 'Water Leakage on Main Street', status: 'Resolved', color: '#34d399' }
    ];

    points.forEach(function (point) {
      const marker = L.circleMarker([point.lat, point.lng], {
        radius: 9,
        color: point.color,
        fillColor: point.color,
        fillOpacity: 0.95,
        weight: 2
      });
      marker.bindPopup('<strong>' + point.title + '</strong><br>Status: ' + point.status);
      marker.addTo(map);
    });
  }
});
