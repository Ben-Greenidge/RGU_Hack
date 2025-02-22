console.log("This loaded")

      function togglePanelVisibility() {
        //console.log("function reached")
          var globeSettings = document.getElementById('globeSettings');
          console.log(globeSettings);
          var visibleButton = document.getElementById('visible');
          var hiddenButton = document.getElementById('hidden');

          if (globeSettings.className == "none") {
              globeSettings.className == "block";
              visibleButton.className == "block";
              hiddenButton.className == "hidden";
              console.log('showing settings')
          } else { //hide
              globeSettings.className == "hidden";
              visibleButton.className == "hidden";
              hiddenButton.className == "block";
              console.log('hiding settings')
          }
      }