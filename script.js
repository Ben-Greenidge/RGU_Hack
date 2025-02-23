console.log("This loaded");

function togglePanelVisibility() {
  var globeSettings = document.getElementById('globeSettings');
  var visibleButton = document.getElementById('visible');
  var hiddenButton = document.getElementById('hidden');

  if (globeSettings.classList.contains("hidden")) {
    globeSettings.classList.remove("hidden");
    globeSettings.classList.add("block");
    visibleButton.classList.add("hidden");
    hiddenButton.classList.remove("hidden");
    console.log('showing settings');
  } else {
    globeSettings.classList.remove("block");
    globeSettings.classList.add("hidden");
    visibleButton.classList.remove("hidden");
    hiddenButton.classList.add("hidden");
    console.log('hiding settings');
  }
}