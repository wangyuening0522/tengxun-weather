/* import { getWeather } from "./src/api";

getWeather().then((res) => {
    console.log("data", res);
  }); */
// const axios = require('axios');
/* import axios from './node_modules/axios'
axios.get('https://www.yiketianqi.com/free/day?appid=88344344&appsecret=fAh2sBq8')
.then(response => {
    console.log(response.data);
  }) */
/*   import request from "./src/utils/request";
  function getWeather(){
    request('',{
        method:"get",
    }).then((data)=>{
        console.log(data);
      })
  } */
// import {bian} from "./src/api/index"
/* bian=2;
console.log(bian); */
// import echarts from "./node_modules/echarts";
//首页温度
fetch("https://www.yiketianqi.com/free/day?appid=88344344&appsecret=fAh2sBq8")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let { tem, wea, humidity } = data;
    let temDiv = document.createElement("div");
    let temLiObj = {};
    let temLi;
    for (let i = 0; i < 4; i++) {
      temLi = document.createElement("li");
      temLiObj[i] = temLi;
      temLi.classList.add("temLi");
      temLi.classList.add(`temLi${i}`);
    }
    temLiObj[0].innerHTML = tem;
    temLiObj[1].innerHTML = wea;
    temLiObj[2].innerHTML = `湿度  ${humidity}`;
    temLiObj[3].innerHTML = "光芒透过云缝，洒向大地";
    for (let i = 0; i < 4; i++) {
      temDiv.appendChild(temLiObj[i]);
    }
    let page1 = document.querySelector(".page1");
    page1.appendChild(temDiv);
    temDiv.classList.add("tem");
  });
//获取逐时天气
fetch(
  "https://devapi.qweather.com/v7/weather/24h?location=101040100&key=33f8567845a84f458bc0d1b6e286328e"
)
  .then((response) => response.json())
  .then((data) => {
    let hourly = data.hourly;
    hourly.forEach((item) => {
      let { fxTime, temp } = item;
      // console.log(fxTime, temp);
      let hourlyDiv = document.createElement("div");
      hourlyDiv.classList.add("hourly");
      // 原始时间戳
      const timestamp = fxTime;
      // 将字符串解析为Date对象
      const date = new Date(timestamp);
      // 获取小时和分钟
      const hours = date.getHours();
      const minutes = date.getMinutes();
      // 将小时和分钟拼接为指定格式的时间字符串
      const timeStr = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      // console.log(timeStr); // 输出: "16:00"
      //时间
      let timeStrDiv = document.createElement("div");
      timeStrDiv.classList.add("timeStr");
      timeStrDiv.innerHTML = timeStr;
      hourlyDiv.appendChild(timeStrDiv);
      // hourlyDiv.innerHTML = `${timeStr} ${temp}`;
      //图片
      let img = document.createElement("img");
      img.src = "./src/images/day/yun.png";
      img.classList.add("p3-img");
      hourlyDiv.appendChild(img);
      //温度
      let tempDiv = document.createElement("div");
      tempDiv.classList.add("tempDiv");
      tempDiv.innerHTML = temp;
      hourlyDiv.appendChild(tempDiv);
      let page3 = document.querySelector(".page3");
      page3.appendChild(hourlyDiv);
    });
    console.log(data);
  });
//七天天气
fetch(
  "https://www.yiketianqi.com/free/week?unescape=1&appid=88344344&appsecret=fAh2sBq8"
)
  .then((response) => response.json())
  .then((data2) => {
    let data = data2.data;
    console.log("七天", data);
    let weekDay = document.createElement("div");
    weekDay.classList.add("weekDay");
    let weekNight = document.createElement("div");
    weekNight.classList.add("weekNight");
    data.forEach((item) => {
      let { date, wea, wea_img, tem_day, tem_night, win_speed, win } = item;

      let day = document.createElement("div");
      day.classList.add("day");
      let night = document.createElement("div");
      let dateDiv = document.createElement("div");
      // 使用Date构造函数将日期字符串转换成日期对象
      const dateObj = new Date(date);
      // 获取月份和日期，并用"/"连接起来
      const month = dateObj.getMonth() + 1; // 月份从0开始，需要加1
      const day1 = dateObj.getDate();
      const formattedDate = `${month}/${day1}`;
      console.log(formattedDate); // 输出：6/24
      dateDiv.classList.add("dateDiv");
      dateDiv.innerHTML = formattedDate;
      let weaDiv = document.createElement("div");
      weaDiv.classList.add("weaDiv");
      weaDiv.innerHTML = wea;
      let weaImg = document.createElement("img");
      console.log(wea_img);
      weaImg.src = `./src/images/day/${wea_img}.png`;
      weaImg.classList.add("weaImg");
      day.appendChild(weaImg);
      day.appendChild(weaDiv);
      day.appendChild(dateDiv);
      weekDay.appendChild(day);
      let page4 = document.querySelector(".page4");
      page4.appendChild(weekDay);
      let weaImgNight = document.createElement("img");
      weaImgNight.src = `./src/images/night/${wea_img}.png`;
      weaImgNight.classList.add("weaImg");
      let weaDivNight = document.createElement("div");
      weaDivNight.classList.add("weaDiv");
      weaDivNight.innerHTML = wea;
      let winDiv = document.createElement("div");
      winDiv.classList.add("winDiv");

      night.classList.add("night");
      winDiv.innerHTML = `${win}</br>${win_speed}`;
      night.appendChild(weaImgNight);
      night.appendChild(weaDivNight);
      night.appendChild(winDiv);
      weekNight.appendChild(night);
      page4.appendChild(weekNight);
    });
  });
//获取生活指数
fetch(
  "https://devapi.qweather.com/v7/indices/1d?location=101040100&key=33f8567845a84f458bc0d1b6e286328e&type=0"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let page5 = document.querySelector(".page5");
    let daily = data.daily;
    for (let i = 0; i < 8; i++) {
      let { type, name, category } = daily[i];
      let dailyDiv = document.createElement("div");
      dailyDiv.classList.add("dailyDiv");
      // dailyDiv.innerHTML = `${type} ${name} ${category}`;
      page5.appendChild(dailyDiv);
      //图片
      let img = document.createElement("img");
      img.src = "./src/images/day/yun.png";
      img.classList.add("p4-img");
      dailyDiv.appendChild(img);
      //程度
      let categoryDiv = document.createElement("div");
      categoryDiv.classList.add("category");
      categoryDiv.innerHTML = category;
      dailyDiv.appendChild(categoryDiv);
      //类型
      let nameDiv = document.createElement("div");
      nameDiv.classList.add("name");
      nameDiv.innerHTML = name;
      dailyDiv.appendChild(nameDiv);
    }
  });
//搜索
let inputClick = document.querySelector("span");
inputClick.addEventListener("click", () => {
  let all = document.querySelector(".all");
  let searchPage = document.querySelector(".searchPage");
  all.style.display = "none";
  searchPage.style.display = "block";
});
let searchPage = document.querySelector(".searchPage");
let btn = document.querySelector("button");
btn.addEventListener("click", () => {
  let search = document.querySelector("input").value;
  console.log(search);
  fetch(
    `https://geoapi.qweather.com/v2/city/lookup?location=${search}&key=33f8567845a84f458bc0d1b6e286328e`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let location = data.location;
      location.forEach((item) => {
        let { name, id } = item;
        let searchTip = document.createElement("div");
        searchTip.classList.add("searchTip");
        searchTip.innerHTML = `${search} ${name}`;
        searchPage.appendChild(searchTip);
        searchTip.addEventListener("click", (name) => {
          let all = document.querySelector(".all");
          let searchPage = document.querySelector(".searchPage");
          searchTip.style.display = "none";
          all.style.display = "block";
          searchPage.style.display = "none";
          fetch(
            `https://www.yiketianqi.com/free/day?appid=88344344&appsecret=fAh2sBq8&cityid=${id}`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log("确定的id", data);
              let { tem, wea, humidity } = data;
              let temLi0 = document.querySelector(".temLi0");
              let temLi1 = document.querySelector(".temLi1");
              let temLi2 = document.querySelector(".temLi2");
              let temLi3 = document.querySelector(".temLi3");
              temLi0.innerHTML = tem;
              temLi1.innerHTML = wea;
              temLi2.innerHTML = `湿度  ${humidity}`;
              temLi3.innerHTML = "光芒透过了他，撒吃了他";
            });
          fetch(
            `https://devapi.qweather.com/v7/weather/24h?location=${id}&key=33f8567845a84f458bc0d1b6e286328e`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log("搜索后", data);
              let hourly = data.hourly;
              hourly.forEach((item) => {
                let { fxTime, temp } = item;
                console.log(fxTime, temp);
                let hourlyDiv = document.createElement("div");
                hourlyDiv.classList.add("hourly");
                // 原始时间戳
                const timestamp = fxTime;
                // 将字符串解析为Date对象
                const date = new Date(timestamp);
                // 获取小时和分钟
                const hours = date.getHours();
                const minutes = date.getMinutes();
                // 将小时和分钟拼接为指定格式的时间字符串
                const timeStr = `${hours.toString().padStart(2, "0")}:${minutes
                  .toString()
                  .padStart(2, "0")}`;
                //时间
                let timeStrDiv = document.querySelector(".timeStr");
                timeStrDiv.innerHTML = timeStr;
                //图片
                let img = document.querySelector(".p3-img");
                img.src = "./src/images/day/yun.png";
                img.src = "./src/images/day/yun.png";
                //温度
                let temDiv = document.querySelector(".tempDiv");
                temDiv.innerHTML = temp;
              });
            });
          fetch(
            `https://www.yiketianqi.com/free/week?unescape=1&appid=88344344&appsecret=fAh2sBq8&cityid=${id}`
          )
            .then((response) => response.json())
            .then((data2) => {
              console.log(data2);
              let data = data2.data;
              data.forEach((item) => {});
            });
          //获取生活指数
          fetch(
            `https://devapi.qweather.com/v7/indices/1d?location=${id}&key=33f8567845a84f458bc0d1b6e286328e&type=0`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log("获取生活", data);
              let daily = data.daily;
              for (let i = 0; i < 8; i++) {
                let { type, name, category } = daily[i];
                //图片
                let img = document.querySelector(".p4-img");
                img.src = "./src/images/day/yun.png";
                //程度
                let categoryDiv = document.querySelector(".category");
                categoryDiv.innerHTML = category;
                //类型
                let nameDiv = document.querySelector(".name");
                nameDiv.innerHTML = name;
              }
            });
        });
      });
    });
});
//热门城市
fetch(
  "https://geoapi.qweather.com/v2/city/top?key=33f8567845a84f458bc0d1b6e286328e&number=12"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let topCityList = data.topCityList;

    topCityList.forEach((item) => {
      let id = item.id;
      // console.log("id", id);
      let city = document.querySelector(".city");
      let hotCity = document.createElement("div");
      hotCity.classList.add("hotCity");
      hotCity.innerHTML = item.name;
      city.appendChild(hotCity);
      hotCity.addEventListener("click", () => {
        let all = document.querySelector(".all");
        let searchPage = document.querySelector(".searchPage");
        // searchTip.style.display = "none";
        all.style.display = "block";
        searchPage.style.display = "none";
        fetch(
          `https://www.yiketianqi.com/free/day?appid=88344344&appsecret=fAh2sBq8&cityid=${id}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("确定的id", data);
            let { tem, wea, humidity } = data;
            let temLi0 = document.querySelector(".temLi0");
            let temLi1 = document.querySelector(".temLi1");
            let temLi2 = document.querySelector(".temLi2");
            let temLi3 = document.querySelector(".temLi3");
            temLi0.innerHTML = tem;
            temLi1.innerHTML = wea;
            temLi2.innerHTML = `湿度  ${humidity}`;
            temLi3.innerHTML = "光芒透过了他，撒吃了他";
          });
      });
    });
  });
