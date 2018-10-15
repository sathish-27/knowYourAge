angular.module('starter.controllers', []).controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    MIN_YEAR = 2003;

    function bodyobject() {
        this.run = 0;
        this.birthtime = new Object();
        this.calculatebutton = 1;
    }

    function dateobject(second, minute, hour, day, month, year) {
        this.m_second = second;
        this.m_minute = minute;
        this.m_hour = hour;
        this.m_day = day;
        this.m_month = month;
        this.m_year = year;
        this.m_internal_months = 0;
        this.m_internal_days = 0;
        for (ycount = 1582; ycount < this.m_year; ycount++) {
            if (leapyear(ycount) == 1) {
                this.m_internal_days += 366;
            }
            else {
                this.m_internal_days += 365;
            }
            this.m_internal_years++;
            this.m_internal_months += 12;
        }
        for (mcount = 1; mcount < this.m_month; mcount++) {
            this.m_internal_months++;
            this.m_internal_days += longmonth(mcount, this.m_year);
        }
        for (dcount = 1; dcount < this.m_day; dcount++) {
            this.m_internal_days++;
        }
        this.m_internal_seconds = this.m_hour * 3600 + this.m_minute * 60 + this.m_second;
    }

    function leapyear(year) {
        if (year % 4 == 0) {
            if ((year % 100 == 0) && (year % 400 != 0)) {
                return 0;
            }
            else {
                return 1;
            }
        }
        return 0;
    }

    function subtract_years(a, b) {
        if (a.m_month < b.m_month) {
            return (a.m_year - b.m_year - 1);
        }
        else {
            if (a.m_month == b.m_month) {
                if (a.m_day < b.m_day) {
                    return (a.m_year - b.m_year - 1);
                }
                else {
                    return (a.m_year - b.m_year);
                }
            }
        }
        return (a.m_year - b.m_year);
    }

    function subtract_months(a, b) {
        if (a.m_day < b.m_day) {
            return (a.m_internal_months - b.m_internal_months - 1);
        }
        return (a.m_internal_months - b.m_internal_months);
    }

    function subtract_weeks(a, b) {
        return (Math.floor((a.m_internal_days - b.m_internal_days) / 7));
    }

    function subtract_days(a, b) {
        return (a.m_internal_days - b.m_internal_days);
    }

    function subtract_hours(a, b) {
        ahours = Math.floor(a.m_internal_seconds / 3600);
        bhours = Math.floor(b.m_internal_seconds / 3600);
        if (ahours < bhours) {
            return (ahours - bhours + 25 + ((a.m_internal_days - b.m_internal_days) - 1) * 24);
        }
        return (ahours - bhours + (a.m_internal_days - b.m_internal_days) * 24);
    }

    function subtract_minutes(a, b) {
        aminutes = Math.floor(a.m_internal_seconds / 60);
        bminutes = Math.floor(b.m_internal_seconds / 60);
        if (aminutes < bminutes) {
            return (aminutes - bminutes + 1441 + ((a.m_internal_days - b.m_internal_days) - 1) * 1440);
        }
        return (aminutes - bminutes + (a.m_internal_days - b.m_internal_days) * 1440);
    }

    function subtract_seconds(a, b) {
        aseconds = Math.floor(a.m_internal_seconds);
        bseconds = Math.floor(b.m_internal_seconds);
        if (aseconds < bseconds) {
            return (aseconds - bseconds + 86401 + ((a.m_internal_days - b.m_internal_days) - 1) * 86400);
        }
        return (aseconds - bseconds + (a.m_internal_days - b.m_internal_days) * 86400);
    }

    function longmonth(month, year) {
        if ((month == 1) || (month == 3) || (month == 5) || (month == 7) || (month == 8) || (month == 10) || (month == 12)) {
            return 31;
        }
        else {
            if (month == 2) {
                if (leapyear(year) == 1) {
                    return 29;
                }
                else {
                    return 28;
                }
            }
            else {
                return 30;
            }
        }
    }
    $scope.heart = function () {
        $scope.Age.dateValue = new Date();
        $scope.Age.timeValue = new Date();
    }
    $scope.init = function () {
        flyngtdy = new Date();
        flyngyr = parseInt(flyngtdy.getFullYear());
        if (flyngyr < MIN_YEAR) {
            alert("Your computer is not updated\nActual year is:" + flyngyr + "  ??????");
        }
        true_bodyobject = new bodyobject();
    }
    $scope.Age = {};
    $scope.intro = function (Age) {
        true_bodyobject.run = 1;
        console.log(Age.dateValue.getFullYear());
        byear = parseInt(Age.dateValue.getFullYear());
        bmonth = Age.dateValue.getMonth() + 1;
        bdate = Age.dateValue.getDay();
        bsecond = 0;
        bminute = Age.timeValue.getMinutes() ? Age.timeValue.getMinutes() : 0;
        bhour = Age.timeValue.getHours() ? Age.timeValue.getHours() : 0;
        true_bodyobject.birthtime = new dateobject(bsecond, bminute, bhour, bdate, bmonth, byear);
        cal();
    }
    $scope.invalidate = function (Age) {
        true_bodyobject.run = 0;
        byear = parseInt(Age.dateValue.getFullYear());
        bmonth = Age.dateValue.getMonth() + 1;
        bdate = Age.dateValue.getDay();
        bsecond = 0;
        bminute = Age.timeValue.getMinutes() ? Age.timeValue.getMinutes() : 0;
        bhour = Age.timeValue.getHours() ? Age.timeValue.getHours() : 0;
        local_birthtime = new dateobject(bsecond, bminute, bhour, bdate, bmonth, byear);
        daynumber = local_birthtime.m_internal_days;
        day_of_week = ((daynumber + 5) % 7);
        textdayofweek = "";
        if (day_of_week == 1) {
            textdayofweek = "Monday.";
        }
        if (day_of_week == 2) {
            textdayofweek = "Tuesday.";
        }
        if (day_of_week == 3) {
            textdayofweek = "Wednesday.";
        }
        if (day_of_week == 4) {
            textdayofweek = "Thursday.";
        }
        if (day_of_week == 5) {
            textdayofweek = "Friday.";
        }
        if (day_of_week == 6) {
            textdayofweek = "Saturday.";
        }
        if (day_of_week == 0) {
            textdayofweek = "Sunday.";
        }
        $scope.dayofweek = "You were born on a " + textdayofweek;
        true_bodyobject.calculatebutton = 1;
        if (((bmonth == 2) || (bmonth == 4) || (bmonth == 6) || (bmonth == 9) || (bmonth == 11)) && (bdate == 31)) {
            $scope.dayofweek = "This month never has 31 days.";
            true_bodyobject.calculatebutton = 0;
        }
        if ((bmonth == 2) && (bdate == 30)) {
            $scope.dayofweek = "February never has 30 days.";
            true_bodyobject.calculatebutton = 0;
        }
        if (((bmonth == 2) && (bdate == 29)) && (leapyear(byear) == 0)) {
            $scope.dayofweek = "February 29 did not occur in this year.";
            true_bodyobject.calculatebutton = 0;
        }
    }

    function cal() {
        if ((true_bodyobject.run == 1) && (true_bodyobject.calculatebutton == 1)) {
            $scope.complete = true;
            $scope.result = {};
            today = new Date();
            ayear = today.getFullYear();
            amonth = today.getMonth();
            amonth++;
            amnday = today.getDate();
            amnhour = today.getHours();
            amin = today.getMinutes();
            asec = today.getSeconds();
            actualtime = new dateobject(asec, amin, amnhour, amnday, amonth, ayear);
            elapsedyears = subtract_years(actualtime, true_bodyobject.birthtime);
            elapsedmonths = subtract_months(actualtime, true_bodyobject.birthtime);
            elapsedweeks = subtract_weeks(actualtime, true_bodyobject.birthtime);
            elapseddays = subtract_days(actualtime, true_bodyobject.birthtime);
            elapsedhours = subtract_hours(actualtime, true_bodyobject.birthtime);
            elapsedminutes = subtract_minutes(actualtime, true_bodyobject.birthtime);
            elapsedseconds = subtract_seconds(actualtime, true_bodyobject.birthtime);
            if (Math.abs(elapsedyears) == 1) {
                $scope.result.Age = elapsedyears;
            }
            else {
                $scope.result.Age = commatized(elapsedyears);
            }
            if (Math.abs(elapsedmonths) == 1) {
                $scope.result.Month = commatized(elapsedmonths);
            }
            else {
                $scope.result.Month = commatized(elapsedmonths);
            }
            if (Math.abs(elapsedweeks) == 1) {
                $scope.result.Weeks = commatized(elapsedweeks);
            }
            else {
                $scope.result.Weeks = commatized(elapsedweeks);
            }
            if (Math.abs(elapseddays) == 1) {
                $scope.result.Days = commatized(elapseddays);
            }
            else {
                $scope.result.Days = commatized(elapseddays);
            }
            if (Math.abs(elapsedhours) == 1) {
                $scope.result.hours = commatized(elapsedhours);
            }
            else {
                $scope.result.hours = commatized(elapsedhours);
            }
            if (Math.abs(elapsedminutes) == 1) {
                $scope.result.Mins = commatized(elapsedminutes);
            }
            else {
                $scope.result.Mins = commatized(elapsedminutes);
            }
            if (Math.abs(elapsedseconds) == 1) {
                $scope.result.Seconds = commatized(elapsedseconds);
            }
            else {
                $scope.result.Seconds = commatized(elapsedseconds);
            }
            if ((actualtime.m_month == true_bodyobject.birthtime.m_month) && (actualtime.m_day == true_bodyobject.birthtime.m_day)) {
                $scope.result.nextbirthday = "Today is your birthday!";
            }
            else {
                $scope.result.nextbirthday = " your next birthday celebration is in:\n";
                if ((actualtime.m_month < true_bodyobject.birthtime.m_month) || ((actualtime.m_month == true_bodyobject.birthtime.m_month) && (actualtime.m_day < true_bodyobject.birthtime.m_day))) {
                    fbsec = 0;
                    fbmin = true_bodyobject.birthtime.m_minute;
                    fbhour = true_bodyobject.birthtime.m_hour;
                    fbday = true_bodyobject.birthtime.m_day;
                    fbmonth = true_bodyobject.birthtime.m_month;
                    fbyear = actualtime.m_year;
                    futurebirthday = new dateobject(fbsec, fbmin, fbhour, fbday, fbmonth, fbyear);
                    tstb = subtract_seconds(futurebirthday, actualtime);
                    daystobirthday = Math.floor(tstb / 86400);
                    hourstobirthday = Math.floor((tstb - daystobirthday * 86400) / 3600);
                    minutestobirthday = Math.floor((tstb - daystobirthday * 86400 - hourstobirthday * 3600) / 60);
                    secondstobirthday = Math.floor(tstb - daystobirthday * 86400 - hourstobirthday * 3600 - minutestobirthday * 60)
                    $scope.result.nextbirthday += daystobirthday;
                    if (daystobirthday == 1) {
                        $scope.result.nextbirthday += " day ";
                    }
                    else {
                        $scope.result.nextbirthday += " days ";
                    }
                    $scope.result.nextbirthday += hourstobirthday;
                    if (hourstobirthday == 1) {
                        $scope.result.nextbirthday += " hr ";
                    }
                    else {
                        $scope.result.nextbirthday += " hrs ";
                    }
                    $scope.result.nextbirthday += minutestobirthday;
                    if (minutestobirthday == 1) {
                        $scope.result.nextbirthday += " min ";
                    }
                    else {
                        $scope.result.nextbirthday += " mins ";
                    }
                    $scope.result.nextbirthday += secondstobirthday;
                    if (secondstobirthday == 1) {
                        $scope.result.nextbirthday += " sec. ";
                    }
                    else {
                        $scope.result.nextbirthday += " secs. ";
                    }
                }
                else {
                    fbsec = 0;
                    fbmin = true_bodyobject.birthtime.m_minute;
                    fbhour = true_bodyobject.birthtime.m_hour;
                    fbday = true_bodyobject.birthtime.m_day;
                    fbmonth = true_bodyobject.birthtime.m_month;
                    fbyear = actualtime.m_year + 1;
                    futurebirthday = new dateobject(fbsec, fbmin, fbhour, fbday, fbmonth, fbyear);
                    tstb = subtract_seconds(futurebirthday, actualtime);
                    daystobirthday = Math.floor(tstb / 86400);
                    hourstobirthday = Math.floor((tstb - daystobirthday * 86400) / 3600);
                    minutestobirthday = Math.floor((tstb - daystobirthday * 86400 - hourstobirthday * 3600) / 60);
                    secondstobirthday = Math.floor(tstb - daystobirthday * 86400 - hourstobirthday * 3600 - minutestobirthday * 60)
                    $scope.result.nextbirthday += daystobirthday;
                    if (daystobirthday == 1) {
                        $scope.result.nextbirthday += " day ";
                    }
                    else {
                        $scope.result.nextbirthday += " days ";
                    }
                    $scope.result.nextbirthday += hourstobirthday;
                    if (hourstobirthday == 1) {
                        $scope.result.nextbirthday += " hr ";
                    }
                    else {
                        $scope.result.nextbirthday += " hrs ";
                    }
                    $scope.result.nextbirthday += minutestobirthday;
                    if (minutestobirthday == 1) {
                        $scope.result.nextbirthday += " min ";
                    }
                    else {
                        $scope.result.nextbirthday += " mins ";
                    }
                    $scope.result.nextbirthday += secondstobirthday;
                    if (secondstobirthday == 1) {
                        $scope.result.nextbirthday += " sec. ";
                    }
                    else {
                        $scope.result.nextbirthday += " secs. ";
                    }
                }
            }
        }
        else {
            $scope.result = "";
        }
    }

    function commatized(numericvalue) {
        if (Math.abs(numericvalue) < 1000) {
            return ("" + numericvalue);
        }
        textstring = "" + numericvalue;
        sit = 0;
        while (textstring.charAt(sit) != "") {
            sit++
        }
        textdone = "";
        for (x = sit - 1; x >= 0; x--) {
            comingchar = textstring.charAt(x)
            if (((((sit - 1) - x) % 3) == 0) && (((sit - 1) - x) > 0)) {
                if ((comingchar == "1") || (comingchar == "2") || (comingchar == "3") || (comingchar == "4") || (comingchar == "5") || (comingchar == "6") || (comingchar == "7") || (comingchar == "8") || (comingchar == "9") || (comingchar == "0")) {
                    textdone = "," + textdone;
                }
            }
            textdone = comingchar + textdone;
        }
        return (textdone);
    }
    $scope.init();
    $scope.heart();
})