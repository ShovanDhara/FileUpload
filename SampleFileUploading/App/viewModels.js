SampleFileUploading = {};
SampleFileUploading.dataManager = new DataManager();

function ViewModelBase() {
    var self = this;
   
    self.IsLoaded = ko.observable(false);
    
    self.editMode = ko.observable(false);

    self.isBusy = ko.observable(false);

    // Preload should return a promise, so that rapid and wait and continue   
};

function FileUploadViewModel() {
    var self = this;
    self.id = ko.observable();

};

FileUploadViewModel.prototype.init = function () {
    var self = this;
    var uploadObj = $("#fileuploader").uploadFile({
        dataType: 'json',
        multiple: true,
        allowedTypes: "jpg,jpeg,png,gif",
        showDone: false,
        showDelete: true,
        url: "/FileUpload/UploadImageFiles",
        fileName: "myfile",
        uploadButtonClass: "ajax-file-upload-green",
        onSuccess: function (files, data, xhr) {
            self.imagePaths.push(data.Name);
        }
    });

};
