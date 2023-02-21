const readline = require("readline");
const axios = require("axios");
require("dotenv").config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const configuration = {
  apiKey: process.env.API_KEY,
  unit: "metaric",
};

const askQuestion = async () => {
  rl.question("Welcome to our chatbot! : ", (answer) => {
    let { apiKey, unit } = configuration;
    let modifyAnswer = answer.toLowerCase();
    let encodeAnswer = encodeURIComponent(modifyAnswer);
    getHoutlyForecast(encodeAnswer, apiKey, unit);
  });
};
askQuestion();

// const getCurrentWeather = async (answer, apiKey, unit) => {
//   try {
//     const res = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?q=${answer}&appid=${apiKey}&units=${unit}`
//     );
//     console.log(`answer: ${res.data.weather[0].main}`);
//     rl.close();
//   } catch (error) {
//     console.log("Something wrong. Sorry");
//     rl.close();
//   }
// };

const getHoutlyForecast = async (answer, apiKey, unit) => {
  try {
    let res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${answer}&appid=${apiKey}&units=${unit}`
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
    console.log("Something wrong. Sorry");
  }
};
