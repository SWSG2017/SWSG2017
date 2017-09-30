var app = angular.module("app", ["ngRoute"]);
var menu;
const LOW = 34;

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", { templateUrl : "/html/dashboard.html" })
    .when("/DSMenuItems", { templateUrl : "/html/menuItems.html" })
    .when("/DSAllOrders", { templateUrl : "/html/allOrders.html" })
    .when("/analytics", { templateUrl : "/html/analytics.html" })
    .when("/settings", { templateUrl : "/html/settings.html" });
    $locationProvider.html5Mode(true);
});

// Retrieve menu from server for Menu Item page
app.controller("menuCtrl", function($scope, $http) {
  $scope.getData = function() {
    $http({
      method: "GET",
      url: "/server/menus/0000"
    }).then(function mySuccess(res) {
        menu = res.data.result[0].menu;
        console.log(menu);
        if(typeof menu != "undefined") { $scope.totalQty = menu.length; }
        $scope.menu = menu;
        $scope.date = Date().substring(4,21);
      }, function myError(response) {
        $scope.menu = response.statusText;
      });
  };
  setInterval($scope.getData, 2000);
});

// Display the Settings dropdown
app.controller("settingsCtrl", function($scope) { $scope.storageID = menu; });

// Send the form data on submission to server and display response
function formController($scope, $http) {
  $scope.processForm = function(url) {
    $http.post(url, $scope.formData)
    .success(function(data) {
      $scope.formData = {};
      $("#snackbar").html(data.result);
    	var x = document.getElementById("snackbar");
    	x.className = "show";
    	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
    });
  };
}

// Filter stock based on percentage requested
var filterOnlyEqualAndBelow = function (menu, percentage) {
  if(typeof menu != "undefined") {
	   return menu.filter(function (stock) {
       return stock.percentage <= percentage;
	    });
    } else { return []; }
};

function filter() {
  var input, tableRow, tableData, i;
  input = document.getElementById("input").value.toUpperCase();
  tableRow = document.getElementById("table").getElementsByTagName("tr");

  // Loop through all table rows, and hide those which don't match the search query
  for (i = 0; i < tableRow.length; i++) {
    tableData = tableRow[i].getElementsByTagName("td")[0];
    if (tableData && tableData.innerHTML.toUpperCase().indexOf(input) > -1) {
        tableRow[i].style.display = "";
    } else if(tableData) { tableRow[i].style.display = "none"; }
  }
}
