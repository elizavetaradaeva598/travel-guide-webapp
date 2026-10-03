let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2481cc";

console.log("app.js загружен");  // <-- для отладки

let selectedCountry = null;
let selectedCountryName = "";

const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {
    btn.addEventListener("click", function () {
        const countryId = this.getAttribute("data-id");
        const countryName = this.textContent.trim();

        if (selectedCountry === countryId && tg.MainButton.isVisible) {
            tg.MainButton.hide();
            selectedCountry = null;
            return;
        }

        selectedCountry = countryId;
        selectedCountryName = countryName;

        tg.MainButton.setText(`🌍 Показать: ${countryName}`);
        tg.MainButton.show();
    });
});

tg.onEvent("mainButtonClicked", function () {
    console.log("Клик по MainButton, отправляю:", selectedCountry);  // <-- для отладки
    if (selectedCountry !== null) {
        tg.sendData(selectedCountry);
    }
});
