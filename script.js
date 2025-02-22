document.addEventListener("DOMContentLoaded", function () {
 console.log("This loaded");

 function togglePanelVisibility() {
  //console.log("function reached")
  var globeSettings = document.getElementById("globeSettings");
  console.log(globeSettings);
  var visibleButton = document.getElementById("visible");
  var hiddenButton = document.getElementById("hidden");

  if (globeSettings.className == "none") {
   globeSettings.className = "block"; // Fix comparison operator
   visibleButton.className = "block"; // Fix comparison operator
   hiddenButton.className = "hidden"; // Fix comparison operator
   console.log("showing settings");
  } else {
   //hide
   globeSettings.className = "hidden"; // Fix comparison operator
   visibleButton.className = "hidden"; // Fix comparison operator
   hiddenButton.className = "block"; // Fix comparison operator
   console.log("hiding settings");
  }
 }

 let pipelinesData = [];
 let pointsOfInterestData = [];
 let subseaAssets = [];

 const globe = Globe()
  .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-dark.jpg")
  .bumpImageUrl("https://unpkg.com/three-globe/example/img/earth-topology.png")
  .backgroundImageUrl("https://unpkg.com/three-globe/example/img/night-sky.png")
  .width(window.innerWidth)
  .height(window.innerHeight);

 globe(document.getElementById("globeViz"));

 const toggleView = document.querySelector("#toggleView");

 toggleView.addEventListener("click", function () {
  console.log("clicked toggle view", toggleView.value);
  if (toggleView.value == "on") {
   toggleView.value = "off";
   document.getElementById("globeSettings").classList.add("hidden");
  } else {
   toggleView.value = "on";
   document.getElementById("globeSettings").classList.remove("hidden");
  }
 });

 function loadSubseaPipelines() {
  return fetch("../data/subseaPipelines.json")
   .then((response) => {
    if (!response.ok) {
     throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
   })
   .then((data) => {
    pipelinesData = data.map((pipeline) => ({
     coords: [
      [
       pipeline.start_coordinates.coordinates.longitude,
       pipeline.start_coordinates.coordinates.latitude,
      ],
      [
       pipeline.end_coordinates.coordinates.longitude,
       pipeline.end_coordinates.coordinates.latitude,
      ],
     ],
     properties: {
      name: pipeline.name,
      color: pipeline.health === "Degraded" ? "#ff0000" : "#00ff00",
     },
    }));
   })
   .catch((error) => console.error("Error loading pipeline data:", error));
 }

 function loadSubseaAssets() {
  return fetch("../data/subseaAssets.json")
   .then((response) => {
    if (!response.ok) {
     throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
   })
   .then((data) => {
    subseaAssets = data.map((point) => ({
     lat: point.coordinates.coordinates.latitude,
     lng: point.coordinates.coordinates.longitude,
     name: point.name,
     type: "subseaAsset",
    }));
   })
   .catch((error) =>
    console.error("Error loading points of interest data:", error)
   );
 }

 function loadPointsOfInterest() {
  return fetch("../data/pointsOfInterest.json")
   .then((response) => {
    if (!response.ok) {
     throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
   })
   .then((data) => {
    pointsOfInterestData = data.map((point) => ({
     lat: point.coordinates.latitude,
     lng: point.coordinates.longitude,
     name: point.name,
     description: point.description,
     type: "pointOfInterest",
    }));
   })
   .catch((error) =>
    console.error("Error loading points of interest data:", error)
   );
 }

 function initializeGlobe() {
  console.log(pointsOfInterestData.concat(subseaAssets));
  globe
   .pathsData(pipelinesData)
   .pathPoints("coords")
   .pathPointLat((p) => p[1])
   .pathPointLng((p) => p[0])
   .pathColor((path) => path.properties.color)
   .pathLabel((path) => path.properties.name)
   .pathDashLength(0.1)
   .pathDashGap(0.008)
   .pathDashAnimateTime(12000)
   .pointsData(pointsOfInterestData.concat(subseaAssets))
   .pointLat((d) => d.lat)
   .pointLng((d) => d.lng)

   .pointRadius(0.05)
   .pointAltitude(() => 0)

   .labelColor(() => "#ff6600")
   .pointColor((d) => {
    if (d.type == "pointOfInterest") {
     return "#0349fc";
    } else {
     return "#ff6600";
    }
   })
   .labelLabel(
    (d) => `
                    <div><b>${d.name}</b></div>
                    <div>${d.description}</div>
                `
   )
   .onPointClick(handlePointClick)
   .onPathClick(handlePipelineClick)
   .labelText("label")
   .labelSize(1.7)
   .labelDotRadius(0.4)
   .labelDotOrientation((d) =>
    labelsTopOrientation.has(d.label) ? "top" : "bottom"
   )

   .onLabelClick((d) => window.open(d.url, "_blank"));
 }

 function handlePointClick(point) {
  console.log("Point clicked:", point);
  //alert(`You clicked on: ${point.name}\nDescription: ${point.description}`);
  document.getElementById("popup-title").textContent = point;
  my_modal_5.showModal();
 }

 // Function to handle pipeline clicks
 function handlePipelineClick(path) {
  console.log("Pipeline clicked:", path);
  //alert(`Pipeline: ${path.properties.name}\nStatus: ${path.properties.color === "#ff0000" ? "Degraded" : "Healthy"}`);
  my_modal_5.showModal();
 }

 Promise.all([
  loadSubseaPipelines(),
  loadPointsOfInterest(),
  loadSubseaAssets(),
 ])
  .then(() => initializeGlobe())
  //.then(() => globe.pointOfView({ lat: 54.0, lng: -2.0, altitude: 0.3 }, 1000));
  .then(() => {
   globe.pointOfView({ lat: 0, lng: -30, altitude: 3.0 }, 0);

   setTimeout(() => {
    globe.pointOfView({ lat: 54.0, lng: -2.0, altitude: 0.3 }, 3000);
   }, 1000);
  });
});
