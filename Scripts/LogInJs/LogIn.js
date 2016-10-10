var LogInViewModel = function ()
{
   
    var self = this;
    var url = appname+"/LogIn/LogIn";
    self.logIn = function ()
    {        
        self.errors = ko.validation.group(this, { deep: true, observable: false });
        var isvalid = self.Email.isValid() && self.Password.isValid();
        if (!isvalid)
        {
            self.errors.showAllMessages();
         
            return;
        }
        $.ajax(
            {
            url: url,
            type: 'Post',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(viewmodel),
            success: function (data)
            {
                $("#loading").button('reset');
                if (data.Admin)
                {
                    setCookie("AuthenticatedForm", true, null);
                    window.location.href = appname+'/SearchEmployee/Index';
                }
                else if (data.UserEmployee)
                {
                    window.location.href = appname+'/UserEmployee/Index';
                }
                else
                {
                    MessageAlert("errorMessage", data.FailedMessage);
                }
            
            }
        });
    };
    self.Email = ko.observable('').extend({ required: true, maxLength: 50, email: true });
    self.Password = ko.observable('').extend({ required: true, maxLength: 50, password: true });
    



};
var viewmodel;
$(document).ready(function ()
{
    CheckAuth();
    viewmodel = new LogInViewModel();
    ko.applyBindings(viewmodel);
 
});

var CheckAuth = function ()
{
    var value = getCookie("AuthenticatedForm");
    if (value)
    {
        window.location.href =appname+ '/SearchEmployee/Index';
    }
};
