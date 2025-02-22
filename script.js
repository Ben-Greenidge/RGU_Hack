
let pipelinesData = [];
      let pointsOfInterestData = [];

      const globe = Globe()
          .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
          .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
          .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
          .width(window.innerWidth)
          .height(window.innerHeight);

      globe(document.getElementById('globeViz'));

      function togglePanelVisibility() {
          var globeSettings = document.getElementById('globeSettings');
          var visibleButton = document.getElementById('viewButton');
          var hiddenButton = document.getElementById('viewButton');

          if (globeSettings.style.display == "none") {
              globeSettings.style.display == "block";
              visibleButton.className == "block";
              hiddenButton.className == "hidden";
          } else { //hide
              globeSettings.style.display == "none";
              visibleButton.className == "hidden";
              hiddenButton.className == "block";
          }
      }

      function loadSubseaPipelines() {
          return fetch('../data/subseaPipelines.json')
              .then(response => {
                  if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  return response.json();
              })
              .then(data => {
                  pipelinesData = data.map(pipeline => ({
                      coords: [
                          [pipeline.start_coordinates.coordinates.longitude, pipeline.start_coordinates.coordinates.latitude],
                          [pipeline.end_coordinates.coordinates.longitude, pipeline.end_coordinates.coordinates.latitude]
                      ],
                      properties: {
                          name: pipeline.name,
                          color: pipeline.health === "Degraded" ? "#ff0000" : "#00ff00"
                      }
                  }));
              })
              .catch(error => console.error('Error loading pipeline data:', error));
      }

      function loadPointsOfInterest() {
          return fetch('../data/pointsOfInterest.json')
              .then(response => {
                  if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  return response.json();
              })
              .then(data => {
                  pointsOfInterestData = data.map(point => ({
                      lat: point.coordinates.latitude,
                      lng: point.coordinates.longitude,
                      name: point.name,
                      description: point.description
                  }));
              })
              .catch(error => console.error('Error loading points of interest data:', error));
      }

      function initializeGlobe() {
          globe
              .pathsData(pipelinesData)
              .pathPoints('coords')
              .pathPointLat(p => p[1])
              .pathPointLng(p => p[0])
              .pathColor(path => path.properties.color)
              .pathLabel(path => path.properties.name)
              .pathDashLength(0.1)
              .pathDashGap(0.008)
              .pathDashAnimateTime(12000)
              .pointsData(pointsOfInterestData)
              .pointLat(d => d.lat)
              .pointLng(d => d.lng)
              .pointColor(() => '#ff6600')
              .pointRadius(0.05)
              .pointAltitude(() => 0.001)
              .labelText('name')
              .labelSize(1.7)
              .labelDotRadius(0.4)
              .labelDotOrientation(() => 'top')
              .labelColor(() => '#ff6600')
              .labelLabel(d => `
                  <div><b>${d.name}</b></div>
                  <div>${d.description}</div>
              `);
      }

      Promise.all([loadSubseaPipelines(), loadPointsOfInterest()])
          .then(() => initializeGlobe())
          //.then(() => globe.pointOfView({ lat: 54.0, lng: -2.0, altitude: 0.3 }, 1000));
          .then(() => {
              globe.pointOfView({ lat: 0, lng: -30, altitude: 3.0 }, 0);

              setTimeout(() => {
                  globe.pointOfView({ lat: 54.0, lng: -2.0, altitude: 0.3 }, 3000);
              }, 1000);
          })
  



      //Fariha stuff below
      const body = document.body;
      const themeToggle = document.getElementById('themeToggle');
      const settingsVisibilityToggle = document.getElementById('settingsVisibilityToggle');
      const settingsContainer = document.getElementById('settingsContainer');
      const settingsToggle = document.getElementById('settingsToggle');
      const settingsDropdown = document.getElementById('settingsDropdown');

      // Theme toggle
      themeToggle.addEventListener('click', () => {
          body.classList.toggle('dark-mode');
          body.classList.toggle('light-mode');
          themeToggle.textContent = body.classList.contains('dark-mode') ? 'Dark Mode' : 'Light Mode';
      });

      // Settings visibility toggle
      settingsVisibilityToggle.addEventListener('click', () => {
          settingsContainer.style.display = settingsContainer.style.display === 'none' ? 'block' : 'none';
          settingsVisibilityToggle.textContent = settingsContainer.style.display === 'none' ? 'Show Settings' : 'Hide Settings';
      });

      // Settings dropdown toggle
      settingsToggle.addEventListener('click', () => {
          settingsDropdown.classList.toggle('show');
          settingsToggle.textContent = settingsDropdown.classList.contains('show') ? 'Settings ▲' : 'Settings ▼';
      });

      // Close settings dropdown when clicking outside
      document.addEventListener('click', (event) => {
          if (!settingsContainer.contains(event.target)) {
              settingsDropdown.classList.remove('show');
              settingsToggle.textContent = 'Settings ▼';
          }
      });
      //Fariha stuff above