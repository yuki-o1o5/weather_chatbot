const readline = require("readline");
const axios = require("axios");
require("dotenv").config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const configuration = {
  apiKey: process.env.API_KEY,
  unit: "metric",
};

const askQuestion = async () => {
  rl.question(
    "Would you like to know the current weather or the weather forecasts? Please type 1 or 2. (1.current / 2.forecasts): ",
    (numberAnswer) => {
      if (numberAnswer == "1") {
        rl.question(
          "Please type the city name which you would like to know : ",
          async (cityAnswer) => {
            let { apiKey, unit } = configuration;
            let modifyAnswer = cityAnswer.toLowerCase();
            let encodeAnswer = encodeURIComponent(modifyAnswer);
            await getCurrentWeather(encodeAnswer, apiKey, unit);

            rl.close();
          }
        );
      } else if (numberAnswer == "2") {
        rl.question(
          "Would you like to know the weather for tomorrow or next five days? Please type 1 or 2. (1.tomorrow/ 2.next five days): ",
          (numberAnswer) => {
            if (numberAnswer == "1") {
              rl.question(
                "Please type the city name which you would like to know : ",
                async (cityAnswer) => {
                  let { apiKey, unit } = configuration;
                  let modifyAnswer = cityAnswer.toLowerCase();
                  let encodeAnswer = encodeURIComponent(modifyAnswer);
                  await getHoutlyTodaysForecast(encodeAnswer, apiKey, unit);
                  rl.close();
                }
              );
            } else if (numberAnswer == "2") {
              rl.question(
                "Please type the city name which you would like to know : ",
                async (cityAnswer) => {
                  let { apiKey, unit } = configuration;
                  let modifyAnswer = cityAnswer.toLowerCase();
                  let encodeAnswer = encodeURIComponent(modifyAnswer);
                  await getHoutlyNextFiveDaysForecast(
                    encodeAnswer,
                    apiKey,
                    unit
                  );

                  rl.close();
                }
              );
            } else {
              console.log("Something wrong. Sorry.");
            }
          }
        );
      } else {
        console.log("please type 1 or 2");
        askQuestion();
      }
    }
  );
};
askQuestion();

const getCurrentWeather = async (answer, apiKey, unit) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${answer}&appid=${apiKey}&units=${unit}`
    );
    console.log("========================");
    console.log(`weather : ${res.data.weather[0].main}`);
    console.log(`max temp: ${res.data.main.temp_max}`);
    console.log(`min temp: ${res.data.main.temp_min}`);
    console.log("========================");
  } catch (error) {
    console.log("Something wrong. Sorry");
  }
};

const getHoutlyTodaysForecast = async (answer, apiKey, unit) => {
  try {
    let today = new Date();
    today.setDate(today.getDate() + 1);
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1);
    let dayTommorow = String(today.getDate());
    month = month.length == 1 ? month.padStart("2", "0") : month;
    dayTommorow =
      dayTommorow.length == 1 ? dayTommorow.padStart("2", "0") : dayTommorow;
    let todaysDtTxt = `${year}-${month}-${dayTommorow}`;

    let res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${answer}&appid=${apiKey}&units=${unit}`
    );
    console.log("========================");
    res.data.list.forEach((element) => {
      if (element.dt_txt.includes(todaysDtTxt)) {
        console.log(element.dt_txt);
        console.log(element.weather[0].main);
        console.log(element.main.temp_max);
        console.log(element.main.temp_min);
        console.log("========================");
      }
    });
  } catch (error) {
    console.log(error);
    console.log("Something wrong. Sorry");
  }
};

const getHoutlyNextFiveDaysForecast = async (answer, apiKey, unit) => {
  try {
    let res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${answer}&appid=${apiKey}&units=${unit}`
    );
    console.log("========================");
    res.data.list.forEach((element) => {
      console.log(element.dt_txt);
      console.log(element.weather[0].main);
      console.log(element.main.temp_max);
      console.log(element.main.temp_min);
      console.log("========================");
    });
  } catch (error) {
    console.log(error);
    console.log("Something wrong. Sorry");
  }
};
