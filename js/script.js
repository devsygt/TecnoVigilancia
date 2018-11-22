// Firebase Data Configuration
var config = {
    apiKey: "AIzaSyAH7FaytGFhNW8uyDzUVVdqsxvpmScGZVw",
    authDomain: "tvigilancia-619d6.firebaseapp.com",
    databaseURL: "https://tvigilancia-619d6.firebaseio.com",
    projectId: "tvigilancia-619d6",
    storageBucket: "tvigilancia-619d6.appspot.com",
    messagingSenderId: "319645346853"
};
firebase.initializeApp(config);
var database = firebase.database();
// Firebase Reference to Productos Entity
var referencia=database.ref("ourProducts");
//Constrution WEBSite
var TVWebsite = angular.module("TVWebsite",['ui.router']);

TVWebsite.controller("generalCtrl",function($scope) {
    console.log('general Ctrl');

    var pathname = window.location;


    // Array with the styles for clicking into menu item HTML view
    $scope.op1 = {'border-bottom':'3px solid #009FE3','color':'#009FE3','font-weight':'bolder'};
    $scope.op2 = {};
    $scope.op3 = {};
    $scope.op4 = {};
    $scope.op5 = {};
    $scope.op6 = {};
    // Click event
    $scope.selectOptionColor = function(x) {
        // Case for each item into menu
        if (x == "tecno") {
            $scope.op1 = {'border-bottom':'3px solid #009FE3','color':'#009FE3','font-weight':'bolder'};$scope.op2 = {};$scope.op3 = {};$scope.op4 = {};$scope.op5 = {};$scope.op6 = {};
        } else if (x == "nosotros") {
            $scope.op1 = {};$scope.op2 = {'border-bottom':'3px solid #009FE3','color':'#009FE3','font-weight':'bolder'};$scope.op3 = {};$scope.op4 = {};$scope.op5 = {};$scope.op6 = {};
        } else if (x == "servicios") {
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

TVWebsite.controller("ProductCtrl", function($scope, $interval) {
    console.log('Product Ctrl');
    $scope.prodStatus = false;

    $scope.ourProductsObject=[];

    $scope.filterProducts = "";

    // $scope.ourProductsObject = totalProductsObject;

    $scope.opProductSelected = {options:[{1:{'border-left': '3px solid #0399D9','color':'#009FE3 !important','font-weight':'bolder','background':'#4F5B69'},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{},11:{}}]}

    $scope.opSelect = function(value,getValueFilter) {
        $scope.filterProducts = getValueFilter;
        for (var i = 1; i <= 11; i++) {
            $scope.opProductSelected.options[0][i] = {};
            $scope.opProductSelected.options[0][value] = {'border-left': '3px solid #0399D9','color':'#009FE3 !important','font-weight':'bolder','background':'#4F5B69'}
        }
    }

    $scope.readProducts = function() {
        $scope.ourProductsObject = []
        referencia.on('value',function(datos){
            productos={}
            // ourProductsObject=[]
            productos=datos.val();

            $.each(productos, function(indice,valor){
                $scope.ourProductsObject.push(valor);
                if ($scope.ourProductsObject.length>1) {
                    $scope.prodStatus = true;
                }
            })

            for (var i = 0; i < $scope.ourProductsObject.length; i++) {
                if ($scope.ourProductsObject[i].category == 'Videovigilancia') {
                    $scope.ourProductsObject[i]['Icon'] = "../images/iconsCategory/security-camera.png"
                }else if ($scope.ourProductsObject[i].category == 'Alarmas de Intrusión, Incendio y Evacuación') {
                    $scope.ourProductsObject[i]['Icon'] = "../images/iconsCategory/006-alert.png"
                }else if ($scope.ourProductsObject[i].category == 'Control de Acceso, Tiempo y Asistencia') {
                    $scope.ourProductsObject[i]['Icon'] = "../images/iconsCategory/009-mobile-phone.png"
                }else if ($scope.ourProductsObject[i].category == 'Seguridad Perimetral') {
                    $scope.ourProductsObject[i]['Icon'] = "../images/iconsCategory/010-furniture-and-household.png"
                }else if ($scope.ourProductsObject[i].category == 'Varios') {
                    $scope.ourProductsObject[i]['Icon'] = "../images/iconsCategory/001-shield.png"
                }else if ($scope.ourProductsObject[i].category == 'Especiales y Marketing') {
                    $scope.ourProductsObject[i]['Icon'] = "../images/iconsCategory/gift-card.png"
                }
            }
        })
    }
    var promise = $interval(function() {
        //Aqui es cuando llama tu función
        $scope.readProducts();
    }, 5000);

    $scope.$on('$destroy', function () {
        $interval.cancel(promise);
    });
})

TVWebsite.controller("contactCtrl",function($scope,$http) {
    console.log('Contact Ctrl');
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
                      swal('Muy pronto estaremos en contacto')
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


    // if (window.performance) {
    //   console.info("window.performance works fine on this browser");
    //   $stateProvider.state(home);
    // }
    //   if (performance.navigation.type == 1) {
    //     $stateProvider.state(home);
    //   } else {
    //     console.info( "This page is not reloaded");
    //   }

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

    var our = {
        name: 'our',
        url: '/our',
        templateUrl: 'templates/our.html'
        // controller: 'ourCtrl'
    }

    var promos = {
        name: 'promos',
        url: '/promos',
        templateUrl: 'templates/promos.html'
        // controller: 'promosCtrl'
    }

    var customer = {
        name: 'customer',
        url: '/customer',
        templateUrl: 'templates/customer.html'
        // controller: 'customerCtrl'
    }

    $stateProvider.state(home);
    $stateProvider.state(product);
    $stateProvider.state(contact);
    $stateProvider.state(our);
    $stateProvider.state(promos);
    $stateProvider.state(customer);


    // if (window.performance) {
    //   console.info("window.performance works fine on this browser");
    //   // $stateProvider.state(home);
    //   // window.location.assign("http://tecno-vigilancia.com")
    // }
    //   if (performance.navigation.type == 1) {
    //     // $stateProvider.state(home);
    //     window.location.assign("index.html")
    //   } else {
    //
    //   }

});
