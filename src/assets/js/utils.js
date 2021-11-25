// 选择时间
export function dateColumns() {
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth();

    // 昨日
    var yesterday = myDate.getTime() - 24*60*60*1000;

    // 上月
    var proMonth;
    var proYear
    if(month == 0){
        proMonth = 12;
        proYear = year - 1;
    }else{
        proYear = year
    }
    if(month < 10){
        proMonth = '0' + month;
    }else{
        proMonth = month
    }
    var Start = proYear + "-" + proMonth + "-" + "01"
    var nowdays = new Date(proYear,proMonth,0);
    var endDate = proYear + '-' + proMonth + '-' + nowdays.getDate();  

    var dateColumns = [
        {
            text: '今日',
            date: [formatTimeStamp(myDate.getTime()), formatTimeStamp(myDate.getTime())]
        },
        {
            text: '昨日',
            date: [formatTimeStamp(yesterday), formatTimeStamp(yesterday)]
        },
        {
            text: '本月',
            date: [year + "-" + ((month + 1) < 10 ? "0" + (month + 1) : month + 1) + "-" + "01", formatTimeStamp(myDate.getTime())]
        },
        {
            text: '上月',
            date: [Start, endDate]
        },
    ]
    return dateColumns
}

// 时间戳转yy-mm-dd格式
export function formatTimeStamp(time) {
    var myDate = new Date(time);
    var year = myDate.getFullYear();
    var month = (myDate.getMonth() + 1) < 10 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
    var day = myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate();
    return year + "-" + month + "-" + day;
}

// 日期格式化
export function getDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1) }-${date.getDate() > 10 ? date.getDate() : '0' + (date.getDate()) }`
}
