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
    "Welcome to our chatbot! Would you like to know current weather or forecasts? Please type 1 or 2. (1.current weather/ 2.forecasts): ",
    (numberAnswer) => {
      if (numberAnswer == "1") {
        rl.question(
          "Please type the city name which you want to know : ",
          (cityAnswer) => {
            let { apiKey, unit } = configuration;
            let modifyAnswer = cityAnswer.toLowerCase();
            let encodeAnswer = encodeURIComponent(modifyAnswer);
            getCurrentWeather(encodeAnswer, apiKey, unit);
            rl.close();
          }
        );
      } else if (numberAnswer == "2") {
        rl.question(
          "Would you like to know today's forecast or next five days forecasts? Please type 1 or 2. (1.today's forecast/ 2.next five days forecasts): ",
          (numberAnswer) => {
            if (numberAnswer == "1") {
              rl.question(
                "Please type the city name which you want to know : ",
                (cityAnswer) => {
                  let { apiKey, unit } = configuration;
                  let modifyAnswer = cityAnswer.toLowerCase();
                  let encodeAnswer = encodeURIComponent(modifyAnswer);
                  getHoutlyTodaysForecast(encodeAnswer, apiKey, unit);
                  rl.close();
                }
              );
            } else if (numberAnswer == "2") {
              rl.question(
                "Please type the city name which you want to know : ",
                (cityAnswer) => {
                  let { apiKey, unit } = configuration;
                  let modifyAnswer = cityAnswer.toLowerCase();
                  let encodeAnswer = encodeURIComponent(modifyAnswer);
                  getHoutlyNextFiveDaysForecast(encodeAnswer, apiKey, unit);
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
    let res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${answer}&appid=${apiKey}&units=${unit}`
    );
    const monthArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const today = new Date();
    const year = today.getUTCFullYear();
    let month = monthArray[today.getUTCMonth()];
    let splitMonth = month.toString().split("");
    let newMonth = 0;
    if (splitMonth.length < 2) {
      newMonth = `0${splitMonth}`;
    } else {
      newMonth = month;
    }
    const date = today.getUTCDate();
    let todaysDtTxt = `${year}-${newMonth}-${date}`;

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
