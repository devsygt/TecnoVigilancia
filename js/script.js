//Constrution WEBSite
var TVWebsite = angular.module("TVWebsite",['ui.router']);

TVWebsite.controller("generalCtrl",function($scope) {


    // Array with the styles for clicking into menu item HTML view
    $scope.op1 = {'border-bottom':'3px solid #009FE3','color':'#009FE3','font-weight':'bolder'};
    $scope.op2 = {};
    $scope.op3 = {};
    $scope.op4 = {};
    $scope.op5 = {};
    $scope.op6 = {};
    // Click event
    $scope.selectOptionColor = function(x) {
        console.log(x);
        // Case for each item into menu
        if (x == "tecno") {
            $scope.op1 = {'border-bottom':'3px solid #009FE3','color':'#009FE3','font-weight':'bolder'};$scope.op2 = {};$scope.op3 = {};$scope.op4 = {};$scope.op5 = {};$scope.op6 = {};
        } else if (x == "nosotros") {

            $scope.op1 = {};$scope.op2 = {'border-bottom':'3px solid #009FE3','color':'#009FE3','font-weight':'bolder'};$scope.op3 = {};$scope.op4 = {};$scope.op5 = {};$scope.op6 = {};
        } else if (x == "servicios") {
            console.log('Selecciona serv');
            $scope.op1 = {};$scope.op2 = {};$scope.op3 = {'border-bottom':'3px solid #009FE3','color':'#009FE3','font-weight':'bolder'};$scope.op4 = {};$scope.op5 = {};$scope.op6 = {};
        } else if (x == "contacto") {

            $scope.op1 = {};$scope.op2 = {};$scope.op3 = {};$scope.op4 = {'border-bottom':'3px solid #009FE3','color':'#009FE3','font-weight':'bolder'};$scope.op5 = {};$scope.op6 = {};
        } else if (x == "promos") {

            $scope.op1 = {};$scope.op2 = {};$scope.op3 = {};$scope.op4 = {};$scope.op5 = {'border-bottom':'3px solid #009FE3','color':'#009FE3','font-weight':'bolder'};$scope.op6 = {};
        } else if (x == "clientes") {

            $scope.op1 = {};$scope.op2 = {};$scope.op3 = {};$scope.op4 = {};$scope.op5 = {};$scope.op6 = {'border-bottom':'3px solid #009FE3','color':'#009FE3','font-weight':'bolder'};
        }
    }

})

TVWebsite.controller("ProductCtrl", function($scope) {

    $scope.opProductSelected = {options:[{1:{'border-left': '3px solid #0399D9','color':'#009FE3 !important','font-weight':'bolder','background':'#4F5B69'},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{},11:{}}]}

    $scope.opSelect = function(value) {
        for (var i = 1; i <= 11; i++) {
            $scope.opProductSelected.options[0][i] = {};
            $scope.opProductSelected.options[0][value] = {'border-left': '3px solid #0399D9','color':'#009FE3 !important','font-weight':'bolder','background':'#4F5B69'}
        }
    }
})

TVWebsite.controller("contactCtrl",function($scope,$http) {

    $scope.result = 'hidden'
      $scope.resultMessage;
      $scope.formData; //formData is an object holding the name, email, subject, and message
      $scope.submitButtonDisabled = false;
      $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
      $scope.submit = function(contactform) {
          $scope.submitted = true;
          $scope.submitButtonDisabled = true;
          if (contactform) {
              $http({
                  method  : 'POST',
                  url     : 'js/contact-form.php',
                  data    : $.param($scope.formData),  //param method from jQuery
                  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
              }).then(function successCallback(data){
                  if (data.success) { //success comes from the return json object
                      $scope.submitButtonDisabled = true;
                      $scope.resultMessage = data.message;
                      $scope.result='bg-success';
                      $scope.formData = {};
                  } else {
                      $scope.submitButtonDisabled = false;
                      $scope.resultMessage = data.message;
                      $scope.result='bg-danger';
                      $scope.formData = {};
                  }
              });
          } else {
              $scope.submitButtonDisabled = false;
              $scope.resultMessage = 'Failed :( Please fill out all the fields.';
              $scope.result='bg-danger';
          }
      }







})


TVWebsite.config(function($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    var home = {
        name: 'home',
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'generalCtrl'
    }

    var product = {
        name: 'product',
        url: '/product',
        templateUrl: 'templates/products.html',
        controller: 'ProductCtrl'
    }

    var contact = {
        name: 'contact',
        url: '/contact',
        templateUrl: 'templates/contacts.html',
        controller: 'contactCtrl'
    }

    $stateProvider.state(home);
    $stateProvider.state(product);
    $stateProvider.state(contact);
});
