// Copyright 2014, Logiticks
function ModelBase() {
    var that = this;

    that.IsSelected = ko.observable(false);
    that.modelState = ko.validatedObservable();
};
ModelBase.prototype.isNew = function () {
    if (!that.Id) {
        return true;
    }
    if (!that.Id() > 0) {
        return true;
    }
    return false;
};
ModelBase.prototype.parseDate = function (date) {
    if (date) {
        return new Date(date.match(/\d+/)[0] * 1);
    } else {
        return '';
    }
};
ModelBase.prototype.isValid = function () {
    return that.modelState.isValid();
};
ModelBase.prototype.showErrors = function () {
    that.modelState.errors.showAllMessages(true);
};

function SelectCategory(category) {
    var that = this;
    that.Id = ko.observable(category.Id || 0);
    that.Name = ko.observable(category.Name || '');
}
SelectCategory.prototype = new ModelBase();
function Selectpropertylist(propertylist) {
    var that = this;
    that.Id = ko.observable(propertylist.Id || 0);
    that.BedRoomsDetail = ko.observable(propertylist.BedRoomsDetail || '');
    that.Image = ko.observable(propertylist.Image || '');
    that.PriceSqft = ko.observable(propertylist.PriceSqft || '');
    that.Place = ko.observable(propertylist.Place || '');
    that.Plot = ko.observable(propertylist.Plot || '');
    that.BedRoomsNo = ko.observable(propertylist.BedRoomsNo || 0);
    that.BathRooms = ko.observable(propertylist.BathRooms || 0);
    that.Parking = ko.observable(propertylist.Parking || 0);
    that.Description = ko.observable(propertylist.Description || '');
}
Selectpropertylist.prototype = new ModelBase();
//ADMIN PANEL
function Category(cat) {
    var self = this;
    self.Id = ko.observable(cat.Id);
    self.Name = ko.observable(cat.Name);
}
function Currency(currency) {
    var self = this;
    self.Id = ko.observable(currency.Id);
    self.Name = ko.observable(currency.Symbol);
}
function Emirate(emi) {
    var self = this;
    self.Id = ko.observable(emi.Id);
    self.Name = ko.observable(emi.Name);
}
function Location(loc) {
    var self = this;
    self.Id = ko.observable(loc.Id);
    self.Name = ko.observable(loc.Name);
}
function PropertyList(property) {
    var self = this;
    self.Id = ko.observable(property.Id);
    self.RefId = ko.observable(property.RefId);
    self.UnitNumber = ko.observable(property.UnitNumber);
    self.Category = ko.observable();
    self.StatusNow = ko.observable(property.StatusNow);
    if (property.Category) {
        self.Category(property.Category.Name);
    }
    self.Emirate = ko.observable();
    if (property.Address.Emirate)
        self.Emirate(property.Address.Emirate.Name);
    self.Location = ko.observable();
    if (property.Address.Location)
        self.Location(property.Address.Location.Name);
    self.BedRooms = ko.observable(property.BedRooms);
    self.BUA=ko.observable(property.BUA);
    self.PriceSqft=ko.observable(property.PriceSqft);
    self.AgentName=ko.observable(property.AgentName);
    self.CreatedOn = ko.observable(property.CreatedDate);
    self.IsApprove = ko.observable(property.IsApprove);
    self.IsFavourite = ko.observable(property.IsFavourite);
    self.NotFavourite = ko.observable(property.NotFavourite);
    self.IsPendingApprove = ko.observable(property.IsPendingApprove);
}
function Furnish(furnish) {
    var self = this;
    self.Id = ko.observable(furnish.Value);
    self.Name = ko.observable(furnish.Text);
}
function Status(status) {
    var self = this;
    self.Id = ko.observable(status.Value);
    self.Name = ko.observable(status.Text);
}
function ContactList(contact) {
    var self = this;
    self.Id = ko.observable(contact.Id);
    self.Name = ko.observable(contact.Name);
    self.Email = ko.observable(contact.Email);
    self.ContactNumber = ko.observable(contact.ContactNumber);
    self.Message = ko.observable(contact.Message);
}
function Image(image) {
    var self = {};
    //self.Id = ko.observable(image);
    self.ImagePath = ko.observable(image);
    return self;
} 
function NewImage(image) {
    var self = this;
    //self.Id = ko.observable(image);
    self.ImagePath = ko.observable(image.ImagePath);
}
function RentalTerm(rentalTerm) {
    var self = this;
    self.Id = ko.observable(rentalTerm.Value);
    self.Name = ko.observable(rentalTerm.Text);
}
function CommissionType(commissionType) {
    var self = this;
    self.Id = ko.observable(commissionType.Value);
    self.Name = ko.observable(commissionType.Text);
}
