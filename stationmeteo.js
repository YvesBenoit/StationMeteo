

// Describe what to do when user click on 1st menu item.
document.getElementById('lastMeasureMenu').addEventListener(`click`, function (event) {
    event.preventDefault();
    // clean screen (body part) 
    cleanOldResults();
    //
    showStatistics("https://distorted-louse-3971.dataplicity.io/last-measure", "Dernière mesure du ");
})

// Describe what to do when user click on 2nd menu item.
document.getElementById('topMeasuresMenu').addEventListener(`click`, function (event) {
    event.preventDefault();
    cleanOldResults();
    showStatistics("https://distorted-louse-3971.dataplicity.io/top-measure/temperature", "Top température le ");
    showStatistics("https://distorted-louse-3971.dataplicity.io/top-measure/humidity", "Top humidité le ");
    showStatistics("https://distorted-louse-3971.dataplicity.io/top-measure/pressure", "Top pression le ");
})

// Describe what to do when user click on 3rd menu item.
document.getElementById('measuresTableMenu').addEventListener(`click`, function (event) {
    event.preventDefault();
    cleanOldResults();
    showMeasuresTable("https://distorted-louse-3971.dataplicity.io/measure/date?endDate=" + moment().format("YYYY-MM-DD") + "&startDate=" + moment().format("YYYY-MM-DD"));
})

// Describe what to do when user click on 4th menu item.
document.getElementById('graphicMenu').addEventListener(`click`, function (event) {
    event.preventDefault();
    cleanOldResults();
    showGraphic();
})



function cleanOldResults() {
    const results = document.getElementById('resultats');
    // loop on all children of the results section and remove them so the results section is empty
    while (results.hasChildNodes()) {
        results.removeChild(results.firstChild);
    }
}

// arg1 : url to the statistics ; arg2 text used in the first li of the ul (used as a title)  
function showStatistics(url, titleText) {

    const request = new XMLHttpRequest();
    console.log(request.status);

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', url, true);

    // describes what to do when the request's response is loaded (rem : asynchrone)
        // create a div containing an ul containing (1 li used as title + 1 br + 3 li (one for temperature one for humidity and the last for pressure))
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            const json = JSON.parse(this.response)
            
            const newResult = document.createElement('div');
                const newUL = document.createElement('ul');
                    const resDate = document.createElement('li');
                    resDate.className = "strong";
                    resDate.innerText = titleText + moment(json.measureDate).format("DD/MM/YYYY");
                    newUL.appendChild(resDate);

                    newUL.appendChild(document.createElement('br'));
            
                    const resTemperature = document.createElement('li');
                    resTemperature.innerText = "Temperature : " + json.temperature + " °C";
                    newUL.appendChild(resTemperature);
            
                    const resHumidity = document.createElement('li');
                    resHumidity.innerText = "Humidité : " + json.humidity + " %hum";
                    newUL.appendChild(resHumidity);
            
                    const resPressure = document.createElement('li');
                    resPressure.innerText = "Pression : " + json.pressure + " hPa";
                    newUL.appendChild(resPressure);

                newResult.appendChild(newUL);

            document.getElementById(`resultats`).appendChild(newResult);

        } else {
            console.log('Erreur ...')
        }
    }

    // describes what to do when the server is unreachable (rem : asynchrone)
    // create html elements displaying fake datas   --  useful when the server is unreachable
    request.onerror = function () {
        const newResult = document.createElement('div');
            const newUL = document.createElement('ul');
                const resDate = document.createElement('li');
                resDate.className = "strong";
                resDate.innerText = titleText + "19" + "/" + "08" + "/" + "2019";
                newUL.appendChild(resDate);
                
                newUL.appendChild(document.createElement('br'));

                const resTemperature = document.createElement('li');
                resTemperature.innerText = "Temperature : " + "26.32" + " °C";
                newUL.appendChild(resTemperature);
        
                const resHumidity = document.createElement('li');
                resHumidity.innerText = "Humidité : " + "45,65" + " %hum";
                newUL.appendChild(resHumidity);
            
                const resPressure = document.createElement('li');
                resPressure.innerText = "Pression : " + "76,445" + " hPa";
                newUL.appendChild(resPressure);

            newResult.appendChild(newUL);

        document.getElementById(`resultats`).appendChild(newResult);
    }

    // Send request
    request.send();
}

// arg : url to the statistics   
function showMeasuresTable(url) {

    const request = new XMLHttpRequest();
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', url, true);

    // describes what to do when the request's response is loaded (rem : asynchrone)
        // create a table containing a thead and a tbody (4 columns in table : (date, temperature, humidity, pressure))
        request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            const jsonTab = JSON.parse(this.response)
        
            const newTable = document.createElement('table');
                const newThead = document.createElement('thead');
                    const newTrTh = document.createElement('tr');
                        const newThDate = document.createElement('th');
                        newThDate.innerText = "Date";
                        newTrTh.appendChild(newThDate);

                        const newThTemperature = document.createElement('th');
                        newThTemperature.innerText = "Temperature (°C)";
                        newTrTh.appendChild(newThTemperature);
                        
                        const newThHumidity = document.createElement('th');
                        newThHumidity.innerText = "Humidité (%hum)";
                        newTrTh.appendChild(newThHumidity);
                        
                        const newThPressure = document.createElement('th');
                        newThPressure.innerText = "Pression (hPa)";
                        newTrTh.appendChild(newThPressure);

                    newThead.appendChild(newTrTh);
                newTable.appendChild(newThead);
            
                // the tbody is build itering on each 
                const newBody= document.createElement('tbody');
                for (const json in jsonTab) {
                    if (jsonTab.hasOwnProperty(json)) {
                        const element = jsonTab[json];
                        
                        const newTrTd = document.createElement('tr');
                            const resDate = document.createElement('td');
                            resDate.innerText = moment(element.measureDate).format("DD-MM-YYYY h:mm:ss");
                            newTrTd.appendChild(resDate);
            
                            const resTemperature = document.createElement('td');
                            resTemperature.innerText = element.temperature;
                            newTrTd.appendChild(resTemperature);
            
                            const resHumidity = document.createElement('td');
                            resHumidity.innerText = element.humidity ;
                            newTrTd.appendChild(resHumidity);
            
                            const resPressure = document.createElement('td');
                            resPressure.innerText = element.pressure;
                            newTrTd.appendChild(resPressure);

                        newBody.appendChild(newTrTd);
                    }
                }
                newTable.appendChild(newBody);
            document.getElementById(`resultats`).appendChild(newTable);


        } else {
            console.log('Erreur ...')
        }
    }

    // describes what to do when the server is unreachable (rem : asynchrone)
    // create html elements displaying fake datas   --  useful when the server is unreachable
    request.onerror = function () {
        const newResult = document.createElement('div');
        const newP = document.createElement('p');
        newP.className = "strong";
        newP.innerText = "This message is send from the 'onerror' function <br> Raspeberry is may be unplugged !!!<br>Please ask Jules to put it on.";
        document.getElementById(`resultats`).appendChild(newP);
    } 
    // Send request
    request.send();
}


function showGraphic() {
    const newResult = document.createElement('div');
    const newP = document.createElement('p');
    newP.className = "strong";
    newP.innerText = "Thoses graphic statistics are not yet ready......";
    document.getElementById(`resultats`).appendChild(newP);
    }