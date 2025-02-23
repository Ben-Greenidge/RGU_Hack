import { createUser, loginUser, logoutUser } from "./userAccounts.js";

console.log("This loaded");

function togglePanelVisibility() {
 //console.log("function reached")
 var globeSettings = document.getElementById("globeSettings");
 console.log(globeSettings);
 var visibleButton = document.getElementById("visible");
 var hiddenButton = document.getElementById("hidden");

 if (globeSettings.className == "none") {
  globeSettings.className = "block";
  visibleButton.className = "block";
  hiddenButton.className = "hidden";
  console.log("showing settings");
 } else {
  //hide
  globeSettings.className = "hidden";
  visibleButton.className = "hidden";
  hiddenButton.className = "block";
  console.log("hiding settings");
 }
}

document
 .getElementById("loginForm")
 .addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = event.target.username.value;
  const password = event.target.password.value;
  try {
   await loginUser(username, password);
   alert("Login successful");
   document.getElementById("loginContainer").style.display = "none";
  } catch (error) {
   alert(error.message);
  }
 });

document
 .getElementById("registerForm")
 .addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = event.target.username.value;
  const password = event.target.password.value;
  try {
   await createUser(username, password);
   alert("Registration successful");
   document.getElementById("registerContainer").style.display = "none";
   document.getElementById("loginContainer").style.display = "block";
  } catch (error) {
   alert(error.message);
  }
 });

document.getElementById("showLoginBtn").addEventListener("click", () => {
 document.getElementById("loginContainer").style.display = "block";
});

document.getElementById("closeLoginBtn").addEventListener("click", () => {
 document.getElementById("loginContainer").style.display = "none";
});

document.getElementById("showRegisterBtn").addEventListener("click", () => {
 document.getElementById("loginContainer").style.display = "none";
 document.getElementById("registerContainer").style.display = "block";
});

document.getElementById("closeRegisterBtn").addEventListener("click", () => {
 document.getElementById("registerContainer").style.display = "none";
 document.getElementById("loginContainer").style.display = "block";
});

document.getElementById("toggleView").addEventListener("change", function () {
 const settings = document.getElementById("globeSettings");
 if (this.checked) {
  settings.classList.remove("translate-x-full");
  settings.classList.add("translate-x-0");
 } else {
  settings.classList.remove("translate-x-0");
  settings.classList.add("translate-x-full");
 }
});

function handlePointClick(point) {
 const username = document.getElementById("username").value;
 saveElement(username, point);
 alert("Element saved");
}
