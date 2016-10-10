var Employee = function (employee)
{
    var self = this;
    self.Id = ko.observable(employee ? employee.Id : '');
    self.SurName = ko.observable(employee ? employee.SurName : '').extend({ required: true, maxLength: 50 });
    self.ForeName = ko.observable(employee ? employee.ForeName : '').extend({ required: true, maxLength: 50 });
    self.KnownAs = ko.observable(employee ? employee.KnownAs : '').extend({ maxLength: 50 });
    self.Address = ko.observable(employee ? employee.Address : '').extend({ maxLength: 400 });
    self.Email = ko.observable(employee ? employee.Email : '').extend({ required: true, maxLength: 50, email: true });
    self.DateOfBirth = ko.observable(employee ? employee.DateOfBirth : '').extend({maxLength: 50, date: true });
    self.ImagePath = ko.observable(employee ? employee.ImagePath : '');
    self.Leave = ko.observable(employee ? employee.Leave : '');
    self.Mobile = ko.observable(employee ? employee.Mobile : '').extend({ number: true });
    self.Telephone = ko.observable(employee ? employee.Telephone : '').extend({ number: true });
    self.CreationDate = ko.observable(employee ? employee.CreationDate : '');
    self.ModifiedDate = ko.observable(employee ? employee.ModifiedDate : '');
    self.IsAdmin = ko.observable(employee ? employee.IsAdmin : '');
    self.LoginPassword = ko.observable(employee ? employee.LoginPassword : '').extend({ required: true, maxLength: 20, password: true });

    self.FKReligion = ko.observable(employee ? employee.FKReligion : '').extend({ required: true });
    self.FKTitle = ko.observable(employee ? employee.FKTitle : '').extend({ required: true });
    self.FKNationality = ko.observable(employee ? employee.FKNationality : '').extend({ required: true });
    self.FKMaritalStatus = ko.observable(employee ? employee.FKMaritalStatus : '').extend({ required: true });
    self.FKHomeStatus = ko.observable(employee ? employee.FkHomeStatus : '').extend({ required: true });

    self.Religion = ko.observable(employee ? employee.Religion : '');
    self.Title = ko.observable(employee ? employee.Title : '');
    self.Nationality = ko.observable(employee ? employee.Nationality : '');
    self.MaritalStatus = ko.observable(employee ? employee.MaritalStatus : '');
    self.HomeStatus = ko.observable(employee ? employee.HomeStatus : '');
    
    self.Gender = ko.observable(employee ? employee.Gender : '');
    self.jobinformation = ko.observable(new JobInformation());
    self.WorkingHours = ko.observable(new WorkingHours());
    self.QualificationSkills = ko.observableArray([]);
    self.Trainings = ko.observableArray([]);
    self.EmergencyContacts = ko.observableArray([]);
  
    self.CopyFrom = function (emp) {
        self.Id(emp.Id());
        self.SurName(emp.SurName());
        self.ForeName(emp.ForeName());
        self.KnownAs(emp.KnownAs());
        self.Address(emp.Address());
        self.Email(emp.Email());
        self.DateOfBirth(emp.DateOfBirth());
        self.Leave(emp.Leave());
        self.Mobile(emp.Mobile());
        self.Telephone(emp.Telephone());
        self.IsAdmin(emp.IsAdmin());
        self.LoginPassword(emp.LoginPassword());
        self.Gender(emp.Gender());
        
        self.FKReligion(emp.FKReligion());
        self.FKTitle(emp.FKTitle());
        self.FKNationality(emp.FKNationality());
        self.FKMaritalStatus(emp.FKMaritalStatus());
        self.FKHomeStatus(emp.FKHomeStatus());
        
            var match = ko.utils.arrayFirst(Religions, function (item) {
                return item.Id === emp.FKReligion();
            });
            self.Religion(match.Religion1);
        
            var match = ko.utils.arrayFirst(HomeStatus, function (item) {
                return item.Id === emp.FKHomeStatus();
            });
            self.HomeStatus(match.HomeStatus);
        
            var match = ko.utils.arrayFirst(Titles, function (item) {
                return item.Id === emp.FKTitle();
            });
            self.Title(match.Title1);
        
            var match = ko.utils.arrayFirst(Nationalities, function (item) {
                return item.Id === emp.FKNationality();
            });
            self.Nationality(match.Nationality1);

            var match = ko.utils.arrayFirst(MaritalStatus, function (item) {
                return item.Id === emp.FKMaritalStatus();
            });
            self.MaritalStatus(match.MaritalStatus);

        
        
    };
    
    
};

var JobInformation = function (Jobinformation)
{
    var self = this;
    self.Id = ko.observable(Jobinformation ? Jobinformation.Id : '');
    self.BasicSalary = ko.observable(Jobinformation ? Jobinformation.BasicSalary : '').extend({ required: true, number: true,max:20000 });
    self.holidayAnnualEntitlment = ko.observable(Jobinformation ? Jobinformation.holidayAnnualEntitlment : '').extend({ required: true, number: true, max: 31 });
    self.JobStartDate = ko.observable(Jobinformation ? Jobinformation.JobStartDate : '').extend({ required: true, maxLength: 50, date: true });
    self.FKContactType = ko.observable(Jobinformation ? Jobinformation.FKContactType : '').extend({ required: true });
    self.FKEmployeeType = ko.observable(Jobinformation ? Jobinformation.FKEmployeeType : '').extend({ required: true });
    self.FKPost = ko.observable(Jobinformation ? Jobinformation.FKPost : '').extend({ required: true });
    self.ContactType = ko.observable(Jobinformation ? Jobinformation.ContactType : '');
    self.EmployeeType = ko.observable(Jobinformation ? Jobinformation.EmployeeType : '');
    self.Post = ko.observable(Jobinformation ? Jobinformation.Post : '');
    self.CreationDate = ko.observable(Jobinformation ? Jobinformation.CreationDate : '');
    self.ModifiedDate = ko.observable(Jobinformation ? Jobinformation.ModifiedDate : '');
    self.ISDeleted = ko.observable(Jobinformation ? Jobinformation.ISDeleted : '');
    self.CopyFrom = function (job) {
        self.Id(job.Id());
        self.BasicSalary(job.BasicSalary());
        self.holidayAnnualEntitlment(job.holidayAnnualEntitlment());
        self.JobStartDate(job.JobStartDate());
        
        self.FKContactType(job.FKContactType());
        self.FKEmployeeType(job.FKEmployeeType());
        self.FKPost(job.FKPost());
        
        var match = ko.utils.arrayFirst(ContactType, function (item) {
            return item.Id === job.FKContactType();
        });
        self.ContactType(match.ContactType1);
        
        var match = ko.utils.arrayFirst(EmployeeType, function (item) {
            return item.Id === job.FKEmployeeType();
        });
        self.EmployeeType(match.EmployeeType1);

        var match = ko.utils.arrayFirst(Post, function (item) {
            return item.Id === job.FKPost();
        });
        self.Post(match.Post1);  
    };
};

var WorkingHours = function (workinghours)
{
    var self = this;
    self.Id = ko.observable(workinghours ? workinghours.Id : '');

    self.MondayDay = ko.observable(workinghours ? workinghours.MondayDay : 'true');
    self.MondayHours = ko.observable(workinghours ? workinghours.MondayHours : '7.30').extend({ required: true, number: true });

    self.TuesdayDay = ko.observable(workinghours ? workinghours.TuesdayDay : 'true');
    self.TuesdayHours = ko.observable(workinghours ? workinghours.TuesdayHours : '7.30').extend({ required: true, number: true });

    self.WednsdayDay = ko.observable(workinghours ? workinghours.WednsdayDay : 'true');
    self.WednsdayHours = ko.observable(workinghours ? workinghours.WednsdayHours : '7.30').extend({ required: true, number: true });

    self.ThursdayDay = ko.observable(workinghours ? workinghours.ThursdayDay : 'true');
    self.ThursdayHours = ko.observable(workinghours ? workinghours.ThursdayHours : '7.30').extend({ required: true, number: true });

    self.FridayDay = ko.observable(workinghours ? workinghours.FridayDay :'true');
    self.FridayHours = ko.observable(workinghours ? workinghours.FridayHours : '7.30').extend({ required: true, number: true });

    self.SaturdayDay = ko.observable(workinghours ? workinghours.SaturdayDay :'');
    self.SaturdayHours = ko.observable(workinghours ? workinghours.SaturdayHours : '0.0').extend({ required: true, number: true });

    self.SundayDay = ko.observable(workinghours ? workinghours.SundayDay : '');
    self.SundayHours = ko.observable(workinghours ? workinghours.SundayHours : '0.0').extend({ required: true, number: true });

    self.CopyFrom = function (work) {
        self.Id(work.Id());
        self.MondayDay(work.MondayDay());
        self.MondayHours(work.MondayHours());
        self.TuesdayDay(work.TuesdayDay());
        self.TuesdayHours(work.TuesdayHours());
        self.WednsdayDay(work.WednsdayDay());
        self.WednsdayHours(work.WednsdayHours());
        self.ThursdayDay(work.ThursdayDay());
        self.FridayDay(work.FridayDay());
        self.FridayHours(work.FridayHours());
        self.SaturdayDay(work.SaturdayDay());
        self.SaturdayHours(work.SaturdayHours());
        self.SundayDay(work.SundayDay());
        self.SundayHours(work.SundayHours());
    };
    
};

var QualificationSkill = function (qualificationskill)
{
    var self = this;
    self.Id = ko.observable(qualificationskill ? qualificationskill.Id : '');
    self.Notes = ko.observable(qualificationskill ? qualificationskill.Notes : '');
    self.FKQualificationType = ko.observable(qualificationskill ? qualificationskill.FKQualificationType : '');
    self.FKSubject = ko.observable(qualificationskill ? qualificationskill.FKSubject : '');
    self.FKEmployee = ko.observable(qualificationskill ? qualificationskill.FKEmployee : '');
    self.QualificationType = ko.observable(qualificationskill ? qualificationskill.QualificationType : '');
    self.Subject = ko.observable(qualificationskill ? qualificationskill.Subject : '');
    
    self.CopyFrom = function (qu, observable)
    {
        if (observable)
        {
            self.Id = qu.Id();
            self.Notes = qu.Notes();
            self.FKQualificationType = qu.FKQualificationType();
            self.FKSubject = qu.FKSubject();
            self.FKEmployee = qu.FKEmployee();
            self.QualificationType = qu.QualificationType();
            self.Subject = qu.Subject();
        }
        else
        {
            self.Id(qu.Id);
            self.Notes(qu.Notes);
            self.FKQualificationType(qu.FKQualificationType);
            self.FKSubject(qu.FKSubject);
            self.FKEmployee(qu.FKEmployee);
            self.QualificationType(qu.QualificationType);
            self.Subject(qu.Subject);
        }
    };
    self.Clear = function ()
    {
        self.Id('');
        self.Notes('');
        self.FKQualificationType('');
        self.FKSubject('');
        self.FKEmployee('');
        self.QualificationType('');
        self.Subject('');
    };
    
};

var Training = function (training) {
    var self = this;
    self.Id = ko.observable(training ? training.Id : '');
    self.Notes = ko.observable(training ? training.Notes : '');
    self.StartDate = ko.observable(training ? training.StartDate : '').extend({ required: true, maxLength: 50, date: true });
    self.EndDate = ko.observable(training ? training.EndDate : '').extend({ required: true, maxLength: 50, date: true });
    self.FKCourse = ko.observable(training ? training.FKCourse : '');
    self.FKEmployee = ko.observable(training ? training.FKEmployee : '');
    self.Course = ko.observable(training ? training.Course : '');
    
    self.CopyFrom = function (tr, observable) {
        if (observable) {
            self.Id = tr.Id();
            self.Notes = tr.Notes();
            self.StartDate = tr.StartDate();
            self.EndDate = tr.EndDate();
            self.FKCourse = tr.FKCourse();
            self.FKEmployee = tr.FKEmployee();
            self.Course = tr.Course();
        } else {
            self.Id(tr.Id);
            self.Notes(tr.Notes);
            self.StartDate(tr.StartDate);
            self.EndDate(tr.EndDate);
            self.FKCourse(tr.FKCourse);
            self.FKEmployee(tr.FKEmployee);
            self.Course(tr.Course);
        }
    };
    self.Clear = function () {
        self.Id('');
        self.Notes('');
        self.StartDate('');
        self.EndDate('');
        self.FKCourse('');
        self.FKEmployee('');
        self.Course('');
    };
};

var EmergencyContact = function (emergencycontact) {
    var self = this;
    self.Id = ko.observable(emergencycontact ? emergencycontact.Id : '');
    self.Address = ko.observable(emergencycontact ? emergencycontact.Address : '');
    self.Mobile = ko.observable(emergencycontact ? emergencycontact.Mobile : '').extend({ required: true, number: true });
    self.Name = ko.observable(emergencycontact ? emergencycontact.Name : '').extend({ required: true});
    self.LandLine = ko.observable(emergencycontact ? emergencycontact.LandLine : '').extend({ required: true, number: true });
    self.FKRelation = ko.observable(emergencycontact ? emergencycontact.FKRelation : '');
    self.FKEmployee = ko.observable(emergencycontact ? emergencycontact.FKEmployee : '');
    self.Relation = ko.observable(emergencycontact ? emergencycontact.Relation : '');
    
    self.CopyFrom = function (emerg, observable) {
        if (observable) {
            self.Id=emerg.Id();
            self.Address=emerg.Address();
            self.Mobile=emerg.Mobile();
            self.Name=emerg.Name();
            self.LandLine=emerg.LandLine();
            self.FKRelation=emerg.FKRelation();
            self.FKEmployee = emerg.FKEmployee();
            self.Relation=emerg.Relation();
        } else {
            self.Id(emerg.Id);
            self.Address(emerg.Address);
            self.Mobile(emerg.Mobile);
            self.Name(emerg.Name);
            self.LandLine(emerg.LandLine);
            self.FKRelation(emerg.FKRelation);
            self.FKEmployee(emerg.FKEmployee);
            self.Relation(emerg.Relation);  
        }
    };
    

    self.Clear = function () {
        self.Id('');
        self.Address('');
        self.Mobile('');
        self.Name('');
        self.LandLine('');
        self.FKRelation('');
        self.FKEmployee('');
        self.Relation('');
      
    };

};

var Religions;
var HomeStatus;
var Nationalities;
var Titles;
var MaritalStatus;
var ContactType;
var EmployeeType;
var Post;
var QualificationTypes;
var QualificationSubjects;
var Courses;
var Relations;