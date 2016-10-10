
var NewEmployeeViewModel = function ()
{
    
    var self = this;
    var url = appname+"/NewEmployee/Save";
    
    self.editeprob = ko.observable(false);
    self.editeprobed = ko.observable(true);
    self.Male = ko.observable(false);
    self.Female = ko.observable(false);
    self.pass = ko.observable(true);
    
    self.Save = function ()
    {
        
        ToggleLoading("#loading", true);
        Disable("errorMessage");
        Disable("successMessage");
        self.EmployeeErrors = ko.validation.group(self.employee(), { deep: true });
        var isValid = true;
        if (self.EmployeeErrors().length != 0)
        {
            self.EmployeeErrors.showAllMessages();
            isValid = false;
            ToggleLoading("#loading", false);
        }
        if (isValid)
        {
            $.ajax(
                {
                    url: url,
                    type: 'Post',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(self.employee),
                    success: function (data)
                    {
                        ToggleLoading("#loading", false);
                        if (data.SuccessMessage)
                        {
                            MessageAlert("successMessage", data.SuccessMessage);
                        }
                        else if (data.FailedMessage)
                        {
                            MessageAlert("errorMessage", data.FailedMessage);
                        }
                    }
                });
        }
    };
    
    self.Cancel = function ()
    {
        window.location.href =appname+ '/SearchEmployee/Index';
    };

    $.ajax(
        {
        url: appname+'/NewEmployee/InializePageData',
        async: false,
        dataType: 'json',
        success: function (json)
        {
            Religions = json.Religions;
            HomeStatus = json.HomeStatus;
            Nationalities = json.Nationalities;
            Titles = json.Titles;
            MaritalStatus = json.MaritalStatus;
            EmployeeType = json.EmployeeType;
            ContactType = json.ContactType;
            Post = json.Post;
            
        }
        }
    );
   
    self.employee = ko.observable(new Employee());
    
    self.WorkingHours = function () {
        $('#myModalWorkingHours').modal('show');
    };
};

var viewmodel;

$(document).ready(function ()
{
    viewmodel = new NewEmployeeViewModel();
    ko.applyBindings(viewmodel);
    SetActiveTabe("#newemployeenavbar");
});


