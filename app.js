let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2481cc";

let selectedCountry = null;
let selectedCountryName = "";

// Находим все кнопки
const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {
    btn.addEventListener("click", function () {
        const countryId = this.getAttribute("data-id");
        const countryName = this.textContent.trim();

        // Если это та же страна — прячем кнопку
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

// Обработка нажатия главной кнопки
tg.MainButton.onClick(function () {
    if (selectedCountry !== null) {
        tg.sendData(selectedCountry);  // отправляем id страны в бота
    }
});