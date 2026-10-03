let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2481cc";

console.log("app.js загружен");

let selectedCountry = null;
let selectedCountryName = "";

const buttons = document.querySelectorAll(".btn");

buttons.forEach(function (btn) {

    btn.addEventListener("click", function () {

        const countryId = this.getAttribute("data-id");
        const countryName = this.textContent.trim();

        console.log("Выбрана страна:", countryId, countryName);

        // Если нажали на уже выбранную страну —
        // скрываем MainButton
        if (selectedCountry === countryId && tg.MainButton.isVisible) {

            tg.MainButton.hide();

            selectedCountry = null;
            selectedCountryName = "";

            console.log("Выбор отменён");

            return;
        }

        // Запоминаем выбранную страну
        selectedCountry = countryId;
        selectedCountryName = countryName;

        // Показываем MainButton
        tg.MainButton.setText(
            `🌍 Показать: ${countryName}`
        );

        tg.MainButton.show();

        console.log(
            "MainButton показана. ID страны:",
            selectedCountry
        );
    });
});


// ============================================================
// НАЖАТИЕ MAIN BUTTON
// ============================================================

tg.onEvent("mainButtonClicked", function () {

    console.log(
        "Клик по MainButton. Отправляю ID:",
        selectedCountry
    );

    if (selectedCountry === null) {

        console.log("Страна не выбрана");

        return;
    }

    // Отправляем ID страны в Telegram-бот
    tg.sendData(selectedCountry);

    console.log(
        "Данные отправлены в бот:",
        selectedCountry
    );
});
