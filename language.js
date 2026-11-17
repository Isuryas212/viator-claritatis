/* Language access for Viator Claritatis.
   Uses Google's website translation route; translations are machine-generated. */
(() => {
  const picker = document.querySelector("[data-language-picker]");
  if (!picker) return;
  picker.addEventListener("change", () => {
    const language = picker.value;
    if (!language) return;
    if (language === "id") {
      picker.value = "";
      return;
    }
    const page = window.location.href;
    const translated = "https://translate.google.com/translate?sl=id&tl="
      + encodeURIComponent(language) + "&u=" + encodeURIComponent(page);
    window.location.assign(translated);
  });
})();
