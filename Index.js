var days=["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];
var month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var latitude=0,longitude=0;

$(document).ready(function(){
	setInterval(function(){
		var date=new Date;
		$(".HM").text(date.getHours()+":"+(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()));
		$(".pm").text(date.getHours()>12? "PM":"AM");
		$(".day").text(days[date.getDay()]+", "+date.getDate()+" "+month[date.getMonth()]);
	},1000);
	
	navigator.geolocation.getCurrentPosition(function(position){
		latitude=position.coords.latitude;
		longitude=position.coords.longitude;
		fun();
	});

	function fun(){
		var req=$.ajax({
		// event.preventDefault();
		url:"https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&exclude=minutely,hourly&units=metric&appid=a232ceaf9b55076b8ea92e56a96a217c",
		type:"GET",
		// dataType:"json",
		
		// success:"console.log("Hello")";
		
		});

		req.done(function(response)
		{
			console.log(response);
			$(".container").html(`<div class="c_item">
				<div>Huminity</div>
				<div class="info">`+response.current.humidity+`%</div>
			</div>
			<div class="c_item">
				<div>Pressure</div>
				<div class="info">`+response.current.pressure+` hPa</div>
			</div>
			<div class="c_item">
				<div>Wind Speed</div>
				<div class="info">`+response.current.wind_speed+` m/sec</div>

			</div>
			<div class="c_item">
				<div>Sunrise</div>
				<div class="info">`+window.moment(response.current.sunrise*1000).format("HH:MM")+`</div>
			</div>
			<div class="c_item">
				<div>Sunset</div>
				<div class="info">`+window.moment(response.current.sunset*1000).format("HH:MM")+`</div>
			</div>`);


			var con="";
			response.daily.forEach(function(data,idx)
			{
				if(idx==0)
				{
					$(".current").html(`<img src="http://openweathermap.org/img/wn/`+data.weather[0].icon+`@2x.png">
						<div>
							<h2 class="currentday">`+window.moment(data.dt*1000).format("dddd")+`</h2>
							<p class="current_night">Day-`+data.temp.day+`<sup>o</sup>C</p>
							<p class="current_day">Night-`+data.temp.night+`<sup>o</sup>C</p>
						</div>`);
				}
				else
				if(idx<=6)
				{
					// $(".daily_info1").html();
					con+=`<div class="daily_item">
						<h2 class="dailydays">`+window.moment(data.dt*1000).format("ddd")+`</h2>
						<img class="img" src="http://openweathermap.org/img/wn/`+data.weather[0].icon+`@2x.png">
						<p class="day_night">Day-`+data.temp.day+`<sup>o</sup>C</p>
						<p class="day_night">Night-`+data.temp.night+`<sup>o</sup>C</p>
				</div>`;
				}
			});
			$(".daily_info1").html(con);

		});
	}
	
});


