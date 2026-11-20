// Example only: there's no case study behind this lock, so submitting just explains that.
// Nothing typed here is sent anywhere or stored. On a real site the password is checked on
// the server, never in the browser.
const form = document.getElementById("unlock");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.reset();
  document.getElementById("note").hidden = false;
});
