function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    webhook: document.querySelector("#webhook").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#webhook").value = result.webhook || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("webhook");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);