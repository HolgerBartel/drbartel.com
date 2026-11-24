/* Language selection: stored choice, else browser language, else English.
   Stored only in this browser (localStorage), no cookies, nothing is sent anywhere. */
(function () {
  var KEY = "lang";
  var root = document.documentElement;

  function pick() {
    var stored = null;
    try { stored = window.localStorage.getItem(KEY); } catch (e) { /* storage blocked */ }
    if (stored === "de" || stored === "en") return stored;
    var langs = navigator.languages || [navigator.language || ""];
    for (var i = 0; i < langs.length; i++) {
      var l = String(langs[i]).toLowerCase();
      if (l.indexOf("de") === 0) return "de";
      if (l.indexOf("en") === 0) return "en";
    }
    return "en";
  }

  function apply(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    var t = root.getAttribute("data-title-" + lang);
    if (t) document.title = t;
    var d = root.getAttribute("data-desc-" + lang);
    var m = document.querySelector('meta[name="description"]');
    if (d && m) m.setAttribute("content", d);
    var buttons = document.querySelectorAll("[data-set-lang]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-pressed", buttons[i].getAttribute("data-set-lang") === lang ? "true" : "false");
    }
  }

  apply(pick());

  document.addEventListener("DOMContentLoaded", function () {
    apply(root.getAttribute("data-lang"));
    var buttons = document.querySelectorAll("[data-set-lang]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        var lang = this.getAttribute("data-set-lang");
        try { window.localStorage.setItem(KEY, lang); } catch (e) { /* storage blocked */ }
        apply(lang);
      });
    }
  });
})();
