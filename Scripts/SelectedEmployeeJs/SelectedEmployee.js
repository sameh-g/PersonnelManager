var url = window.location.pathname;
var employeeid = url.substring(url.lastIndexOf('/') + 1);

var SelectedEmployeeViewModel = function ()
{
    var self = this;
    self.btnPersonalData = ko.observable(true);
    self.btnJobInformation = ko.observable(true);
    self.removeprob = ko.observable(true);
    self.Male = ko.observable(true); 
    self.Female = ko.observable(true);
    
    self.btnQualificationSkills = ko.observable(true);
    self.btnTrainings = ko.observable(true);
    self.btnEmergencyContacts = ko.observable(true);
    self.editeprob = ko.observable(true);
    self.editeprobed = ko.observable(false);
    self.pass = ko.observable(false);
    self.employee = ko.observable(new Employee());
    self.training = ko.observable(new Training());
    self.emergencycontact = ko.observable(new EmergencyContact());
    self.emergencycontacttemp = ko.observable(new EmergencyContact());
    self.qualification = ko.observable(new QualificationSkill());
   
    self.FileToUpload = ko.observable();
    self.emptmp = ko.observable(new Employee());
    
    var Init = function () {
        $.ajax(
 {
     url: appname+'/SelectedEmployee/InializePageData',
     type: 'Post',
     async: false,
     contentType: 'application/json; charset=utf-8',
     data: '{ "employeeid": "' + employeeid + '"}',
     success: function (data) {
         
         self.employee = ko.observable(new Employee(data.Employee));
         self.employee().jobinformation = ko.observable(new JobInformation(data.Employee.JobInformation));
         self.employee().WorkingHours = ko.observable(new WorkingHours(data.Employee.WorkingHours));
         
         self.emptmp = ko.observable(new Employee(data.Employee));
         self.emptmp().jobinformation = ko.observable(new JobInformation(data.Employee.JobInformation));
         self.emptmp().WorkingHours = ko.observable(new WorkingHours(data.Employee.WorkingHours));

         self.employee().EmergencyContacts = ko.observableArray(data.Employee.EmergencyContacts);
         self.employee().QualificationSkills = ko.observableArray(data.Employee.QualificationSkills);
         self.employee().Trainings = ko.observableArray(data.Employee.Trainings);
         
         Religions = data.Religions;
         HomeStatus = data.HomeStatus;
         Nationalities = data.Nationalities;
         Titles = data.Titles;
         MaritalStatus = data.MaritalStatus;
         EmployeeType = data.EmployeeType;
         ContactType = data.ContactType;
         Post = data.Post;

         QualificationTypes = data.QualificationTypes;
         QualificationSubjects = data.QualificationSubjects;
         Courses = data.Courses;
         Relations = data.Relations;

         self.Male(self.employee().Gender());
         self.Female(!self.employee().Gender());
         self.SortQualification();
         self.SortEmergencyContact();
         self.SortTraining();
         
        

     }
 }
);
    };
    
    self.UploadImage = function ()
    {
        var fd = new FormData();
        var ext = $('#file').val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
            alert('Invalid Extension!');
            return;
        }
        fd.append("file", $("#file")[0].files[0]);
        fd.append("employeeid", employeeid);
        $.ajax({
            url: appname+'/SelectedEmployee/EditeImage',
            type: 'POST',
            cache: false,
            timeout: 50000,
            data:  fd, 
            processData: false,
            contentType: false,
            beforeSend: function ()
            {
                ToggleLoading("#editeimage", true);
            },
            success: function (data)
            {

                ToggleLoading("#editeimage", false);
                self.employee().ImagePath(data);
            },
            complete: function ()
            {
            },
            error: function ()
            {
                alert("ERROR in upload");
                ToggleLoading("#editeimage", false);
            }
        });
    };
    
    self.EditeEmployee = function ()
    {
            Disable("errorMessage");
            Disable("successMessage");
            self.EmployeeErrors = ko.validation.group(self.employee(), { deep: true });
            var isValid = true;
            if (self.EmployeeErrors().length != 0) {
                self.EmployeeErrors.showAllMessages();
                isValid = false;
            }
            if (isValid) {
                ToggleLoading("#editeemployee", true);
                $.ajax(
                    {
                        url: appname+'/SelectedEmployee/UpdateEmployeeData',
                        type: 'Post',
                        contentType: 'application/json; charset=utf-8',
                        data: ko.toJSON(viewmodel),
                        success: function (data)
                        {
                            self.Male(self.employee().Gender());
                            self.Female(!self.employee().Gender());
                            
                            ToggleLoading("#editeemployee", false);
                            self.emptmp().CopyFrom(self.employee());
                            self.emptmp().jobinformation().CopyFrom(self.employee().jobinformation());
                            self.Edit();
                        }
                    });
            }
    };
    
    self.LeaveEmployee = function ()
    {
        ShowConfirmationMessage("Do You Want To Leave This Employee From Our Company?");
    };

    self.EditWorkingHour = function ()
    {
        $.ajax(
         {
             url:appname+ '/SelectedEmployee/EditWorkingHours',
             type: 'Post',
             contentType: 'application/json; charset=utf-8',
             data:  ko.toJSON(self.employee().WorkingHours()),
             success: function ()
             {
                 self.emptmp().WorkingHours().CopyFrom(self.employee().WorkingHours());
                 self.CloseModalWorkingHours();
             }
         });
    };

    self.CloseConf = function() {
        $('#myModal').modal('hide');
    };
    
    self.CloseModalEmployeeData = function ()
    {
        $('#myModalEditEmData').modal('hide');
        self.employee().CopyFrom(self.emptmp());
        self.employee().jobinformation().CopyFrom(self.emptmp().jobinformation());

    };

    self.CloseModalWorkingHours = function () {
        $('#myModalWorkingHours').modal('hide');
        self.employee().WorkingHours().CopyFrom(self.emptmp().WorkingHours());
    };
    
    self.Leave = function () {
        $.ajax(
                     {
                         url: appname+'/SelectedEmployee/LeaveEmployee',
                         type: 'Post',
                         contentType: 'application/json; charset=utf-8',
                         data: '{ "employeeid": "' + employeeid + '"}',
                         success: function (data)
                         {
                             window.location.href = '/SearchEmployee/Index';
                         }
                     });
    };
    
    self.Edit = function () {
        
        if (self.editeprob()==true)
        {
            self.editeprob(false);
            self.editeprobed(true);
        } else {
            self.editeprob(true);
            self.editeprobed(false);
        }
        self.employee().CopyFrom(self.emptmp());
        self.employee().jobinformation().CopyFrom(self.emptmp().jobinformation());
        
    };

    self.WorkingHours = function () {
        $('#myModalWorkingHours').modal('show');
    };
    
    self.UploadEmployeeImage = function () {
        $('#myModalUploadImage').modal('show');
    };

    self.AddEditeNewEmergecny = function () {
        var update = false;
        self.EmergencyErrors = ko.validation.group(self.emergencycontact(), { deep: true });
        if (self.EmergencyErrors().length != 0)
        {
            self.EmergencyErrors.showAllMessages();
            return;
        }
        if (self.emergencycontact().Id() > 0)
        {
            update = true;
        }
        self.emergencycontact().FKEmployee(employeeid);
        $.ajax(
                 {
                     url: appname+'/SelectedEmployee/AddEditeNewEmergecny',
                     type: 'Post',
                     contentType: 'application/json; charset=utf-8',
                     data: ko.toJSON(self.emergencycontact) ,
                     success: function (data)
                     {
                         var emergency = new EmergencyContact();
                         emergency.CopyFrom(self.emergencycontact(), true);
                         
                         var match = ko.utils.arrayFirst(Relations, function (item) {
                             return item.Id === emergency.FKRelation;
                         });
                         emergency.Relation = match.Relation1;
                         
                         if (!update) {

                             emergency.Id = data;
                         }
                         else
                         {
                             var match = ko.utils.arrayFirst(self.employee().EmergencyContacts(), function (item) {
                                 return item.Id === emergency.Id;
                             });
                             self.employee().EmergencyContacts.remove(match);
                         }
                         self.employee().EmergencyContacts.push(emergency);
                         self.SortEmergencyContact();
                       
                         self.CloseEmergencyContact();
                     }
                 });
    };

    self.RemoveEmergencyContact = function (emergency) {
       
        var r = confirm("Are you sure to Remove This Emergency Contact !");
        if (r == true) {
        $.ajax(
            {
                url: appname+'/SelectedEmployee/RemoveEmergencyContact',
                type: 'Post',
                contentType: 'application/json; charset=utf-8',
                data: '{ "emergencyid": "' + emergency.Id + '"}',
                success: function(data) {
                    self.employee().EmergencyContacts.pop(emergency);


                }
            });
    }
};

    self.AddOrEditemergency = function ()
    {
        self.emergencycontact().Clear();
        self.EmErrors = ko.validation.group(self.emergencycontact(), { deep: true });
        self.EmErrors.showAllMessages(false);
        $('#myModalEmergencyContact').modal('show');
    };

    self.EditeEmergency = function (sender, args)
    {

    self.emergencycontact().CopyFrom(sender,false);
   $('#myModalEmergencyContact').modal('show');
    };

    self.CloseEmergencyContact = function () {
        $('#myModalEmergencyContact').modal('hide');
    };
    
    self.AddEditeNewTraining = function () {

        var update = false;
        self.TrainingErrors = ko.validation.group(self.training(), { deep: true });
        if (self.TrainingErrors().length != 0) {
            self.TrainingErrors.showAllMessages();
            return;
        }
        if (self.training().Id() > 0) {
            update = true;
        }
        self.training().FKEmployee(employeeid);
        $.ajax(
                 {
                     url: appname+'/SelectedEmployee/AddEditeNewTraining',
                     type: 'Post',
                     contentType: 'application/json; charset=utf-8',
                     data: ko.toJSON(self.training),
                     success: function (data) {
                         
                         var training = new Training();
                         training.CopyFrom(self.training(), true);
                         
                         var match = ko.utils.arrayFirst(Courses, function (item) {
                             return item.Id === training.FKCourse;
                         });
                         training.Course = match.Course;
                         
                         if (!update)
                         {
                             training.Id = data;
                         }

                         else
                         {
                             var match = ko.utils.arrayFirst(self.employee().Trainings(), function (item) {
                                 return item.Id === training.Id;
                             });
                             self.employee().Trainings.remove(match);
                             
                         }
                         self.employee().Trainings.push(training);
                       
                         self.SortTraining();
                         self.CloseTraining();
                     }
                 });
    };
    
    self.AddOrEditTraining = function () {
        self.training().Clear();
        self.trErrors = ko.validation.group(self.training(), { deep: true });
        self.trErrors.showAllMessages(false);
        
        $('#myModaltraining').modal('show');
    };

    self.EditeTraining = function (sender, args) {
        self.training().CopyFrom(sender, false);
        $('#myModaltraining').modal('show');
    };
    
    self.RemoveTraining = function (training) {
        var r = confirm("Are you sure to Remove This Training!");
        if (r == true) {
            $.ajax(
                {
                    url: appname+'/SelectedEmployee/RemoveTraining',
                    type: 'Post',
                    contentType: 'application/json; charset=utf-8',
                    data: '{ "trainingid": "' + training.Id + '"}',
                    success: function(data) {
                        self.employee().Trainings.pop(training);
                    }
                });
        }
    };
    
    self.CloseTraining = function () {
        $('#myModaltraining').modal('hide');
    };
    
    self.AddEditeNewQuallification = function () {

        var update = false;
        self.QualificationErrors = ko.validation.group(self.qualification(), { deep: true });
        if (self.QualificationErrors().length != 0) {
            self.QualificationErrors.showAllMessages();
            return;
        }
        if (self.qualification().Id() > 0) {
            update = true;
        }
        
        self.qualification().FKEmployee(employeeid);
        $.ajax(
                 {
                    
                     url: appname+'/SelectedEmployee/AddEditeNewQualification',
                     type: 'Post',
                     contentType: 'application/json; charset=utf-8',
                     data: ko.toJSON(self.qualification),
                     success: function (data) {
                         
                         var qualification = new QualificationSkill();
                         qualification.CopyFrom(self.qualification(), true);
                         
                         var match = ko.utils.arrayFirst(QualificationTypes, function (item) {
                             return item.Id === qualification.FKQualificationType;
                         });
                         qualification.QualificationType = match.TypeOfQualification1;

                         var match = ko.utils.arrayFirst(QualificationSubjects, function (item) {
                             return item.Id === qualification.FKSubject;
                         });
                         qualification.Subject = match.Subject;
                         
                         if (!update)
                         {
                             qualification.Id = data;
                         }
                         else
                         {
                             var match = ko.utils.arrayFirst(self.employee().QualificationSkills(), function (item) {
                                 return item.Id === qualification.Id;
                             });
                             
                             self.employee().QualificationSkills.remove(match);
                         }
                         self.employee().QualificationSkills.push(qualification);
                         self.SortQualification();
                         self.CloseQualification();
                     }
                 });
    };
    
    self.AddOrEditQualification = function () {
        self.qualification().Clear();
        self.quErrors = ko.validation.group(self.qualification(), { deep: true });
        self.quErrors.showAllMessages(false);
        $('#myModalQualification').modal('show');
    };
    
    self.EditeQualification = function (sender, args) {
        self.qualification().CopyFrom(sender, false);
        $('#myModalQualification').modal('show');
    };

    self.RemoveQualification = function (Qualification) {
        var r = confirm("Are you sure to Remove This Qulification Skill !");
        if (r == true) {
            $.ajax(
                {
                    url: appname+'/SelectedEmployee/RemoveQualification',
                    type: 'Post',
                    contentType: 'application/json; charset=utf-8',
                    data: '{ "qualificationid": "' + Qualification.Id + '"}',
                    success: function(data) {
                        self.employee().QualificationSkills.pop(Qualification);
                    }
                });
        }
    };
    
    self.CloseQualification = function () {
        $('#myModalQualification').modal('hide');
    };

    self.SortQualification = function ()
    {
        self.employee().QualificationSkills().sort(function (a, b) {
            return a.Subject.toLowerCase() < b.Subject.toLowerCase() ? -1 : 1;
        });
    };
    self.SortEmergencyContact = function () {
        self.employee().EmergencyContacts().sort(function (a, b) {
            return a.Name.toLowerCase() < b.Name.toLowerCase() ? -1 : 1;
        });
    };
    self.SortTraining = function () {
        self.employee().Trainings().sort(function (a, b) {
            return a.Course.toLowerCase() < b.Course.toLowerCase() ? -1 : 1;
        });
    };
    
    Init();
};

var viewmodel;
$(document).ready(function ()
{
    viewmodel = new SelectedEmployeeViewModel();
    ko.applyBindings(viewmodel);
});

