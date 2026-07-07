(function () {
  // Kit (formerly ConvertKit) public API key — safe to expose client-side,
  // it only grants access to the forms/subscribe endpoint.
  var KIT_API_KEY = "oUdAYSfgFJFKJNPbMQDVQw";
  var KIT_FORM_ID = "9585142";

  function init() {
    var form = document.getElementById("newsletter-form");
    if (!form) return;

    var input = document.getElementById("newsletter-email");
    var button = form.querySelector(".newsletter__submit");
    var message = document.getElementById("newsletter-message");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var email = input.value.trim();
      if (!email) return;

      button.disabled = true;
      message.textContent = "Subscribing...";
      message.dataset.state = "";

      fetch("https://api.convertkit.com/v3/forms/" + KIT_FORM_ID + "/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ api_key: KIT_API_KEY, email: email }),
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Request failed");
          return response.json();
        })
        .then(function () {
          message.textContent = "Thanks! Check your inbox to confirm your subscription.";
          message.dataset.state = "success";
          form.reset();
        })
        .catch(function () {
          message.textContent = "Something went wrong. Please try again.";
          message.dataset.state = "error";
        })
        .finally(function () {
          button.disabled = false;
        });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // mkdocs-material navigates via instant loading; re-init after each page swap.
  if (typeof document$ !== "undefined") {
    document$.subscribe(init);
  }
})();
