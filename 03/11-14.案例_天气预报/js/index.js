function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // Months are zero-based
  const day = date.getDate();
  return `${month}月${day}日`;
}

/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */
function getWeather(city) {
    myAxios({
        url: 'http://hmajax.itheima.net/api/weather',
        params: {
            city
        }
    }).then(res => {
        console.log(res)
        document.querySelector('.title').innerHTML = `<span class="dateShort">${formatDate(res.data.date)}</span>
        <span class="calendar">农历&nbsp;
          <span class="dateLunar">${res.data.dateLunar}</span>
        </span>`
        document.querySelector('.area').innerHTML = res.data.area
        document.querySelector('.temperature').innerHTML = res.data.temperature
        document.querySelector('.air').innerHTML = `<span class="psPm25">${res.data.psPm25}</span>
          <span class="psPm25Level">${res.data.psPm25Level}</span>`
        document.querySelector('.weather-list').innerHTML = `<li>
            <img src="./imgs/${res.data.weather}-line.png" class="weatherImg" alt="">
            <span class="weather">${res.data.weather}</span>
          </li>
          <li class="windDirection">${res.data.windDirection}</li>
          <li class="windPower">${res.data.windPower}</li>`
        document.querySelector('.temNight').innerHTML = res.data.todayWeather.temNight
        document.querySelector('.temDay').innerHTML = res.data.todayWeather.temDay
        document.querySelector('.ultraviolet').innerHTML = res.data.todayWeather.ultraviolet
        document.querySelector('.humidity').innerHTML = res.data.todayWeather.humidity
        document.querySelector('.sunriseTime').innerHTML = res.data.todayWeather.sunriseTime
        document.querySelector('.sunsetTime').innerHTML = res.data.todayWeather.sunsetTime
        
        document.querySelector('.week-wrap').innerHTML = res.data.dayForecast.map(item => 
         `<li class="item">
            <div class="date-box">
            <span class="dateFormat">${item.dateFormat}</span>
            <span class="date">${item.date}</span>
          </div>
          <img src="./imgs/${item.weather}.png" alt="" class="weatherImg">
          <span class="weather">${item.weather}</span>
          <div class="temp">
            <span class="temNight">${item.temNight}</span>-
            <span class="temDay">${item.temDay}</span>
            <span>℃</span>
          </div>
          <div class="wind">
            <span class="windDirection">${item.windDirection}</span>
            <span class="windPower">&lt;${item.windPower}</span>
          </div>
        </li>`).join('')
    })
}

getWeather('110100')

document.querySelector('.search-city').addEventListener('input', e => {
    // console.log(e.target.value)
    myAxios({
        url: 'http://hmajax.itheima.net/api/weather/city',
        params: {
            city: e.target.value
        }
    }).then(res => {
        console.log(res)
        const ulElement = document.querySelector('.search-list')
        ulElement.innerHTML = res.data.map(item => `<li class="city-item" data-code="${item.code}">${item.name}</li>`).join('')
        ulElement.addEventListener('click', e => {
            console.dir(e.target)
            document.querySelector('.search-city').value = e.target.innerHTML
            getWeather(e.target.dataset.code)
        })
    }).catch(err => {
        console.log(err)
    })
})