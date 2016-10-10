
var SearchEmployeeViewModel = function ()
{
    var self = this;
    var Init = function ()
    {
        $.ajax(
            {
                url: appname+"/SearchEmployee/InializePageData",
                type: 'Get',
                contentType: 'application/json; charset=utf-8',
                success: function (data)
                {
                    self.Employees(data.Employees);
                    self.PagingData(data.PagingData);
                    self.Pages([]);
                    self.FillPageData();
                    self.Positions(data.Positions);
                    self.EmployeeTypes(data.EmployeeTypes);
                    self.StartDate (data.StartDate);
                    self.EndDate(data.EndDate);
                    self.PageToggle();
                    
                }
            });
        
        self.SurName.subscribe(function ()
        {
            self.SearchClicked = false;
        });
        self.ForeName.subscribe(function ()
        {
            self.SearchClicked = false;
        });
        self.StartDate.subscribe(function ()
        {
            self.SearchClicked = false;
        });
        self.EndDate.subscribe(function ()
        {
            self.SearchClicked = false;
        });
        self.SelectedEmployeeType.subscribe(function ()
        {
            self.SearchClicked = false;
        });
        self.SelectedEmployeePosition.subscribe(function ()
        {
            self.SearchClicked = false;
        });
        self.IncludeLeaving.subscribe(function ()
        {
            self.SearchClicked = false;
        });
        
    };
    self.EmployeeSearch = function() {
        MessageAlert("loading", "Loading...");
        $.ajax(
            {
                url: appname+"/SearchEmployee/Search",
                type: 'Post',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(viewmodel),
                success: function (data)
                {
                    self.Employees(data.Employees);
                    self.PagingData(data.PagingData);
                    Disable("loading");
                    self.Pages([]);
                    self.FillPageData();
                    self.PageToggle();
                }
            });
    };
    self.Search = function ()
    {
        self.SearchClicked = true;
        self.PagingData().PageIndex = 1;
        self.EmployeeSearch();
    };
    self.SearchChanged = function () {
        self.SearchClicked = false;
    };
    self.SearchPage = function (sender,args)
    {
        if (self.PagingData().PageIndex == sender.PageIndex)
        {
            return;
        }
        self.PagingData().PageIndex = sender.PageIndex;
        self.EmployeeSearch();
    };
    self.SearchNext = function ()
    {
        
        self.PagingData().PageIndex += 1;
        self.EmployeeSearch();

    };
    self.SearchPrev = function ()
    {
        self.PagingData().PageIndex -= 1;
        self.EmployeeSearch();
    };
    self.Employees = ko.observableArray([]);
    self.ByName = ko.observable(true);
    self.ByWork = ko.observable(false);
    self.ByDate = ko.observable(false);
    self.SearchClicked = ko.observable(false);
    self.IncludeLeaving = ko.observable(false);
    self.PagingData = ko.observable(new PagingViewModel());
    self.Pages = ko.observableArray([]);
    self.SurName = ko.observable('');
    self.ForeName = ko.observable('');
    self.FillPageData = function ()
    {
        for (var i = self.PagingData().MinPageIndexForDisplaying; i <= self.PagingData().MaxPageIndexToDisplay; i++)
        {
            var pag = new Page();
            pag.PageIndex = i;
            self.Pages.push(pag);
        }
    };
    self.PageToggle = function ()
    {
        for (var i = self.PagingData().MinPageIndexForDisplaying; i <= self.PagingData().MaxPageIndexToDisplay; i++)
        {
            document.getElementById("pg" + i).style.backgroundColor = "white";
        }
        document.getElementById("pg" + self.PagingData().PageIndex).style.backgroundColor = "gainsboro";
    };
    self.SelectedEmployeeType = ko.observable(0);
    self.SelectedEmployeePosition = ko.observable(0);
    self.Positions = ko.observableArray([]);
    self.EmployeeTypes = ko.observableArray([]);
    self.StartDate = ko.observable(new Date()).extend({ date: true });
    self.EndDate = ko.observable(new Date()).extend({ date: true });
    self.SelectedEmployee = function (employee)
    {
        window.location.href = appname+'/SelectedEmployee/Index/' +employee.Id ;
    };
    Init();
};

var viewmodel;
dateFromWcf = function(input) {
    if (input == null)
        return " ";
    var pattern = "MM-DD-YYYY HH:mm A";
    var formattedDate = moment(input).format(pattern);
    return formattedDate;
};

$(document).ready(function ()
{
    viewmodel = new SearchEmployeeViewModel();
  
    ko.applyBindings(viewmodel);
});




