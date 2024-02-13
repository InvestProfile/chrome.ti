const hui = async () => {
    const cookies = await chrome.cookies.getAll({domain: "www.tinkoff.ru"})
    const psid = cookies.filter(c => c.name == 'psid')[0].value
    console.log(psid);
    console.log("1 - " + new Date().toTimeString());


    fetch("http://localhost:4000/psid/"+psid)
        .then((response) => {
            response.text()
            console.log(response)
        })
        .then((result) => {
            console.log("OK:", psid);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

hui().then()

// setInterval(hui, 1000*30*60) //60 min

// setTimeout(hui, 60 * 1000 * 60); // 60 минут

// Устанавливаем аларм при загрузке расширения
chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create('hourlyAlarm', { periodInMinutes: 1 });
});

// Обработчик срабатывания аларма
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'hourlyAlarm') {
        console.log('Этот лог вызывается раз в час');
        hui().then()
    }
});


