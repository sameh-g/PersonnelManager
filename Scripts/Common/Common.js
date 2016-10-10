function ToggleLoading (buttonname,show) 
{
    if (show) 
    {
        $(buttonname).button('loading');
    }
    else
    {
        $(buttonname).button('reset');
    }
}

function MessageAlert(divid, msg)
{
    document.getElementById(divid).style.display = "block";
    document.getElementById(divid).innerHTML = msg;
}

function Disable(id)
{
    document.getElementById(id).style.display = "none";
}

function SetActiveTabe(tabeid)
{
    $('#basenavbar li').each(function (i)
    {
        $(this).removeClass('active');
        
    });

    $(tabeid).addClass('active');
}

var PagingViewModel = function ()
{
    var self = this;
    self.PageIndex = ko.observable(0);
    self.PageSize = ko.observable(0);
    self.TotalCount = ko.observable(0);
    self.PageActionLink = ko.observable(0);
    self.PagesToDisplay = ko.observable(0);
};

var Page = function ()
{
    var self = this;
    self.PageIndex = ko.observable(1);
};

function ShowConfirmationMessage(msg)
{
        $('#myModal').modal('show');
        document.getElementById('Message').innerHTML = msg;
}

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

;
function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

;

var appname="/PersonnelManager";
