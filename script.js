// بسم الله الرحمن الرحیم

const updateDomWithId = function (a, b) {
  return (document.getElementById(a).innerHTML = b);
};
let time = new Date();
let today = [time.getFullYear(), time.getMonth() + 1, time.getDate()];
updateDomWithId("AD-year", today[0]);
updateDomWithId("AD-month", today[1]);
updateDomWithId("AD-day", today[2]);
const normalMonthesAD = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const leapMonthesAD = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const normalMonthesSolar = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
const leapMonthesSolar = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30];

function sum(index, oneArray) {
  let sumOfElements = 0;
  for (let i = 0; i <= index; i++) {
    sumOfElements = sumOfElements + oneArray[i];
  }
  return sumOfElements;
}

const isNaturalNumber = function (number) {
  if (number - Math.floor(number) === 0) {
    return true;
  } else {
    return false;
  }
};
//AD to solar function-set
const isLeapYearAD = function (year) {
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    return true;
  } else {
    return false;
  }
};
const daySumAD = function (year, month, day) {
  if (month < 1 || month > 12) {
    console.log("please enter a valid month");
    return;
  }
  if ((isLeapYearAD(year) && day < 0) || day > leapMonthesAD[month - 1]) {
    console.log("please enter a valid day, this year is a leap year");
    return;
  } else if (
    !isLeapYearAD(year) &&
    (day < 0 || day > normalMonthesAD[month - 1])
  ) {
    console.log("please enter a valid day");
    return;
  }
  let allDays = day;
  for (let i = 0; i < month - 1; i++) {
    allDays += normalMonthesAD[i];
  }
  if (isLeapYearAD(year) && allDays >= 60) {
    allDays++;
  }

  return allDays;
};

const ADToSolar = function (year, month, day) {
 if(daySumAD(year,month,day)===undefined){
  return undefined
 }

  if (!isNaturalNumber(year)||!isNaturalNumber(month)||!isNaturalNumber(day)){
    return;
  }
  let solarYear = year - 622;
  let solarMonth;
  let solarDay;
  let solarDays;
  if (daySumAD(year, month, day) > 79) {
    solarDays = daySumAD(year, month, day) - 79;
    solarYear++;
  } else {
    solarDays = 365 - 79 + daySumAD(year, month, day);
  }
  if (solarDays > 6 * 31) {
    solarMonth = 6 + Math.ceil((solarDays - 186) / 30);
    solarDay = (solarDays - 6 * 31) % 30;
  } else {
    solarMonth = Math.ceil(solarDays / 31);
    solarDay = solarDays % 31;
  }

  return [solarYear, solarMonth, solarDay];
};
//solar to AD function-set
const isLeapYearSolar = function (year) {
  let solarLeapRemains = [1, 5, 9, 13, 17, 22, 26, 30];
  for (let i = 0; i < solarLeapRemains.length; i++) {
    if (year % 33 === solarLeapRemains[i]) {
      return true;
    }
  }
  return false;
};
const daySumSolar = function (year, month, day) {
  if (month < 1 || month > 12) {
    console.log("please enter a valid month");
    return;
  }
  if ((isLeapYearSolar(year) && day < 0) || day > leapMonthesSolar[month - 1]) {
    console.log("please enter a valid day, this year is a leap year");
    return;
  } else if (
    !isLeapYearSolar(year) &&
    (day < 0 || day > normalMonthesSolar[month - 1])
  ) {
    console.log("please enter a valid day");
    return;
  }
  let allDays = day;
  for (let i = 0; i < month - 1; i++) {
    allDays += normalMonthesSolar[i];
  }
  if (isLeapYearSolar(year) && day === 30 && month === 12) {
    allDays++;
  }
  return allDays;
};

const solarToAD = function (year, month, day) {

  if (!isNaturalNumber(year)||!isNaturalNumber(month)||!isNaturalNumber(day)){
    return;
  }
  let ADYear = year + 621;
  if (daySumSolar(year, month, day) > 286) {
    ADYear++;
  }
  let ADDays;
  let ADMonth;
  let ADDay;
  if (daySumSolar(year, month, day) < 287) {
    ADDays = daySumSolar(year, month, day) + 79;
  } else {
    ADDays = daySumSolar(year, month, day) - 286;
  }
  for (let i = 0; i < 12; i++) {
    if (isLeapYearAD(ADYear)) {
      if (ADDays < sum(i, leapMonthesAD)) {
        ADMonth = i + 1;
        ADDay = ADDays - sum(i, leapMonthesAD);
        return [ADYear, ADMonth, ADDay];
      }
    } else {
      if (ADDays < sum(i, normalMonthesAD)) {
        ADMonth = i + 1;
        ADDay = ADDays - sum(i - 1, normalMonthesAD);
        if (ADDays <= 31) {
          ADDay = ADDays;
        }
        return [ADYear, ADMonth, ADDay];
      }
    }
  }
};
const solarToday = ADToSolar(...today);
updateDomWithId("solar-year", solarToday[0]);
updateDomWithId("solar-month", solarToday[1]);
updateDomWithId("solar-day", solarToday[2]);

document.getElementById("convert").addEventListener("click", () => {
  let data = {};
  data.yearType = document.getElementById("convertion-types").value;
  data.year = +document.getElementById("yaer-input").value;
  data.month = +document.getElementById("month-input").value;
  data.day = +document.getElementById("day-input").value;
  let convertedDate;
  if (data.yearType === "AD-to-solar") {
    convertedDate = ADToSolar(data.year, data.month, data.day);
  } else if (data.yearType === "solar-to-AD") {
    convertedDate = solarToAD(data.year, data.month, data.day);
  }
  let viewInDOM;
  console.log(convertedDate)
  if (convertedDate === undefined) {
    viewInDOM = `<div class="solar-monitor monitor">
  <div>لطفا تاریخ مد نظرتان را به درستی وارد کنید</div>

</div>`;
  } else
    viewInDOM = `<div class="solar-monitor monitor">
  <div>تاریخ تبدیل شده برابر است با:</div>
  <div class="date-container">
    <div class="year" >${convertedDate[0]}</div>
    <div class="month" >${convertedDate[1]}</div>
    <div class="day" >${convertedDate[2]}</div>
  </div>
</div>`;
  updateDomWithId("converted", viewInDOM);
});
