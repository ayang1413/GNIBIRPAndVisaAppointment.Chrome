var autoForm = {
    completes: [],

    onComplete: function (callback) {
        autoForm.completes.push(callback);
    },

    complete: function () {
        var callback;
        while(callback = autoForm.completes.shift()) {
            callback();
        }
    }
}

$(document).ready(function () {
    if (typeof btSrch4Apps != 'undefined') {
        formAssistant.run(function () {
            $(btSrch4Apps).click(function () {
                if (selectedTime) {
                    var interval = setInterval(function () {
                        if ($(dvAppOptions).css('display') == 'block') {
                            selectedTime && $("td:contains(" + selectedTime + ")").parent().find("button").click();
                            clearInterval(interval);
                        }
                    });
                }
            });
        });
    } else if (selectedTime && typeof Appdate != 'undefined') {
        //Click 'Find Appointment Slot'
        autoForm.onComplete(function () {
            formAssistant.run(function () {
                if (AppointType.value) {
                    //Select date
                    var selectedDate = selectedTime.substring(0, 10);
                    Appdate.value = selectedDate;
                    $(Appdate).change();
                    //Click search
                    $('button[onclick*=getAvailApps]').click();
                    var interval = setInterval(function () {
                        if ($(dvAppOptions).css('display') == 'block') {
                            selectedTime && $("td:contains(" + selectedTime + ")").parent().find("button").click();
                            clearInterval(interval);
                        }
                    });
                }
            });
        });
    }
});