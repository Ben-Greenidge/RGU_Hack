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
