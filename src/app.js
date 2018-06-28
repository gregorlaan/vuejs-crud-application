var app = new Vue({
  el: '#app',
  data: {
    name: 'Webware Frontend Challenge',
    occupationData: {},
    form: {
      firstName: '',
      lastName: '',
      occupation: '',
      application: null
    },
    file: null,
    formHasSubmittingError: false,
    submittedData: {},
    alert: {
      type: 'primary',
      text: '',
      display: false
    }
  },
  methods: {
    onLoad: function () {
      console.log('App loaded!');
      this.getOccupation();
    },
    submitForm: function (e) {
      e.preventDefault();
      if (e.target.innerHTML.match(/is-invalid/g)) {
        this.alert.display = true;
        this.alert.type = 'danger';
        this.alert.text = 'The form is invalid. Please check and correct the fields.'
      } else {
        this.alert.display = false;
        if (this.form.id) {
          this.updateApplication(e);
        } else {
          this.postApplication(e);
        }
      }
    },
    getOccupation: function () {
      console.log('getOccupation');
      // GET /someUrl
      this.$http.get('/request/getOccupation.php').then(response => {
        console.log('Get success.');
        // get body data
        this.occupationData = response.body;
      }, response => {
        // error callback
        console.log('Get error.')
      });
    },
    postApplication: function (e) {
      e.preventDefault();
      console.log('postApplication');
      this.fileName = this.form.firstName + '_' + this.form.lastName + '_application.pdf';
      this.form.application = this.fileName;
      // POST data to Database
      this.$http.post('/request/postApplication.php', this.form, { emulateJSON: true }).then(response => {

        if (response.status === 200) {
          console.log('Post success.');
          // Refill the form using stored data
          this.submittedData = response.body;
          this.form.firstName = this.submittedData.first_name;
          this.form.lastName = this.submittedData.last_name;
          this.form.occupation = this.submittedData.occupation;
          // Store current application ID
          this.form.id = this.submittedData.id;
          // Display success alert
          this.alert.display = true;
          this.alert.type = 'success';
          this.alert.text = 'Thank You! The form has been submitted.'
        } else {
          // display error alert
          this.alert.display = true;
          this.alert.type = 'danger';
          this.alert.text = 'There was an error while sending the data. Please try later again.'
          console.log('Post failed.');
        }

      }, response => {
        // error callback
        console.log('Post error.');
      });

      // Sending files using a FormData object
      var formData = new FormData();
      formData.append('pdf', this.file);
      formData.append('fileName', this.fileName);

      // Upload the file using POST request
      this.$http.post('/request/uploadFile.php', formData).then(response => {

        if (response.status === 200) {
          console.log('Upload success.');
        } else {
          console.log('Upload failed.');
        }

      }, response => {
        // error callback
        console.log('Upload error.');
      });

    },
    fileSelected: function (e) {
      this.file = e.target.files[0];
    },
    updateApplication: function (e) {
      e.preventDefault();
      console.log('updateApplication');
      // POST /someUrl
      this.$http.post('/request/updateApplication.php', this.form, { emulateJSON: true }).then(response => {

        if (response.status === 200) {
          console.log('Update success.');
          // Refill the form using stored data
          this.submittedData = response.body;
          this.form.firstName = this.submittedData.first_name;
          this.form.lastName = this.submittedData.last_name;
          this.form.occupation = this.submittedData.occupation;
          // Display success alert
          this.alert.display = true;
          this.alert.type = 'success';
          this.alert.text = 'Thank You! The form has been updated.'
        } else {
          this.alert.display = true;
          this.alert.type = 'danger';
          this.alert.text = 'There was an error while updating the data. Please try later again.'
          console.log('Update failed.');
        }

      }, response => {
        // error callback
        console.log('Update error.');
      });
    },
    deleteApplication: function (e) {
      e.preventDefault();
      console.log('deleteApplication');
      this.$http.post('/request/deleteApplication.php', this.form, { emulateJSON: true }).then(response => {

        if (response.status === 200) {
          console.log('delete success.');
          // Refill the form using stored data
          this.submittedData = {};
          this.form.firstName = '';
          this.form.lastName = '';
          this.form.occupation = '';
          this.form.application = '';
          this.form.id = false;
          // Display success alert
          this.alert.display = true;
          this.alert.type = 'success';
          this.alert.text = 'Thank You! The form has been deleted.'
        } else {
          this.alert.display = true;
          this.alert.type = 'danger';
          this.alert.text = 'There was an error while deleting the data. Please try later again.'
          console.log('Delete failed.');
        }

      }, response => {
        // error callback
        console.log('Delete error.');
      });
    },
    inputState: function (field) {
      return field.length >= 2 ? true : false;
    },
    inputInvalidFeedback: function (field) {
      if (field.length > 2) {
        return '';
      } else if (field.length < 2) {
        return 'Enter at least 2 characters';
      }
    },
    selectState: function (field) {
      return field.length > 0 ? true : false;
    },
    selectInvalidFeedback: function (field) {
      if (field.length > 0) {
        return '';
      } else if (field.length <= 0) {
        return 'Please select an Occupation';
      }
    },
    resetForm: function (e) {
      e.preventDefault();
      this.form.firstName = '';
      this.form.lastName = '';
      this.form.occupation = '';
      this.form.application = '';
      this.$refs.fileinput.reset();
    }
  },
  mounted: function () {
    this.onLoad();
  }
});