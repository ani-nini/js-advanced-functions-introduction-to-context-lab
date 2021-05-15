// Your code here
function createEmployeeRecord(array){
    const employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents:[],
        timeOutEvents:[]
    }
return employeeRecord;
}

function createEmployeeRecords(mapArray){
    return mapArray.map(data => createEmployeeRecord(data));
}

function createTimeInEvent(employeeRecord, dateStamp){
    employeeRecord.timeInEvents.push ({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp){
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateStamp){
    const timeIn = employeeRecord.timeInEvents.find(data => data.date === dateStamp)
    const timeOut = employeeRecord.timeOutEvents.find(data => data.date === dateStamp)
    return (timeOut.hour - timeIn.hour)/100;

}

function wagesEarnedOnDate(employeeRecord, dateStamp){
    const wage = employeeRecord.payPerHour;
return (hoursWorkedOnDate(employeeRecord, dateStamp) * wage);
}

function allWagesFor(employeeRecord){
    const dates = employeeRecord.timeInEvents.map(data => data.date); 
    const totalPayPerDay = dates.map(date => wagesEarnedOnDate(employeeRecord, date))
    const totalPay = totalPayPerDay.reduce((accum, current) => accum += current);

    return totalPay;
}

function calculatePayroll(employeeRecord){
    const payroll = employeeRecord.map(employee => allWagesFor(employee)); 

    return payroll.reduce((accum, current) => accum += current)
}



function findEmployeeByFirstName(employeeRecords, firstName){
    return( employeeRecords.find(element => element.firstName === firstName));
}