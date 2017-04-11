var month_In = document.getElementById('monthIn');
var year_In = document.getElementById('yearIn');
var submit_btn = document.getElementById('fetchCalender');
var reset_btn = document.getElementById('reset');
var list = document.querySelector('ul.calender');
var listItem;
var infoPara1 = document.getElementById('infopara1');
var	disp_mm = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var	disp_dd = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var disp = document.querySelector('div.calender')
var months = [31,0,31,30,31,30,31,31,30,31,30,31];
var strtDay = [6,0,1,2,3,4,5]
var dayCount = 0;
var dayCount_mm = 0;
var yyyy;
var count = 0;
var count1 = 0;

submit_btn.addEventListener('click', pgm1);
reset_btn.addEventListener('click', reset_calender);

function pgm1(){
	
	yyyy = Number(year_In.value);
	if(yyyy && month_In.value){
		if(count1 === 0){
			count1++;
			disp.style.visibility = "visible";
			for(var i=0; i<7; i++){
				listItem = document.createElement('li');
				listItem.textContent = disp_dd[i];
				listItem.className = "smtwtfs";
				list.appendChild(listItem);
			}
			document.querySelector('.calender h2').style.visibility = "visible";
			document.querySelector('.calender h2').textContent = disp_mm[month_In.value] + " " + year_In.value;

			if (leapCheck(yyyy)){
				months[1] = 29;
				infoPara1.textContent = yyyy + " is a leap year"
				infoPara1.style.backgroundColor = "#e85d66";		//red
			}
			else {
				months[1] = 28;
				infoPara1.textContent = yyyy + " is NOT a leap year"
				infoPara1.style.backgroundColor = "#33ff99";		//green		
			}
			
			dayCount_mm = 0;
			for(var i=0; i<month_In.value; i++){					//i varies from 0 to 'month_In.value - 1' because we must exclude current month from calculation	
				dayCount_mm += months[i];
			}
			
			dayCount = (yyyy-1)*365 + dayCount_mm + LeapsSinceInception(yyyy - 1);			//(yyyy - 1) because days between 1 to 'n' is 'n-1'.
			
			if ((yyyy > 1582) || ((yyyy === 1582) && (month_In.value > 9))){
				dayCount = dayCount - 10;													//October 5th to 14th 1582, both included, DID NOT OCCUR.
			}
			
	//	Insert blanks before start of the month		
			for(var i=0; i<strtDay[dayCount%7]; i++){
				listItem = document.createElement('li');
				listItem.textContent = ".";
				listItem.className = "calenderDays";
				list.appendChild(listItem);
				count++
			}
			
	//	Insert calender days
			for(var i=1; i<=months[month_In.value]; i++){
				listItem = document.createElement('li');
				listItem.textContent = i;
				listItem.className = "calenderDays";
				list.appendChild(listItem);
				count++;
			}
			document.getElementById('infopara2').textContent = "Days since 1/1/0001: " + (dayCount);	
		}
		else{
			alert('Please reset previous calender');
		}
	}
	else{
		alert('Please input appropriate values');
	}
}

function leapCheck(YY){	
	if(YY%4 === 0 && (((YY%100) !== 0) || (YY%100 === 0 && YY%400 === 0))){
		return 1;		//Leap
	}
	else{
		return 0;		//Not Leap
	}	
}

function LeapsSinceInception(YY){
	
//	return(Math.floor(YY/4) - Math.floor(YY/100) + Math.floor(YY/400));

	var count = 0;
	var count1 = 0;
	var count2 = 0;
	var count3 = 0;
	
	
	for (var i=1; i<=YY; i++){
		if(i > 1582){								//Gregorian calender was adopted in 1582. Before 1582 EVERY 4th year, without exception, was a leap year
			if (i%4 === 0){
				count1++;
			}
			if (i%100 === 0){
				count2++;
			}
			if (i%400 === 0){
				count3++;
			}	
		}
		else if(i < 1582) {							
			if (i%4 === 0){
				count++;
			}	
		}
	}
	return(count1 - count2 + count3 + count);	
}

function reset_calender(){
	count1 = 0;
	yyyy = 0;
	months[1] = 0;
	for(var i=1; i<=count; i++){
		listItem = document.querySelector('li.calenderDays');
		list.removeChild(listItem);
	}
	for(var i=0; i<7; i++){
		listItem = document.querySelector('li.smtwtfs');
		list.removeChild(listItem);
	}
	count = 0;
	document.querySelector('.calender h2').style.visibility = "hidden";
	disp.style.visibility = "hidden";
}
