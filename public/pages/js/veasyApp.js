
angular.module('app', [
  'veasyTable',
  'ui.sortable'
])

.controller('appController', ['$scope', '$http', '$timeout', 'peopleService', function ($scope, $http, $timeout, peopleService) {

/***********************************************************/

      $scope.getDentalCode = function(val) {
        
        return $http.get('//localhost:3000/srchDentalByArg', {
          params: {
            name: val
          }
        }).then(function(response){
          return response.data.map(function(item){
            //$scope.testMemcode = response;
            var obj = {};
            obj.dentName = item.dentName;
            obj.mobile = item.mobile;
            return obj;
            //return item.name;
          });
        });
      };

      $scope.onSelect = function ($item, $model, $label) {

          if($item.dentName){
             $scope.activeName = $item.dentName        
             $scope.activeCode = $item.mobile        
          }

        $scope.test_string = $item.dentName;

            
            $http.get('//localhost:3000/srchDentalInfo',{
              params: {
                dentname: $item.dentName,
                mobile: $item.mobile,
                //dentname: '김정호',
                //mobile: '01012341234',
                }
            }).success(function(data){
              // With the data succesfully returned, call our callback
              //$scope.test_string = data;
              $scope.test_string = data;
              $scope.objects = data;

              $scope.totalItems = $scope.objects.length;
              $scope.currentPage = 1;
              $scope.numPerPage = 5;

              $scope.paginate = function(value) {
                  var begin, end, index;
                  begin = ($scope.currentPage - 1) * $scope.numPerPage;
                  end = begin + $scope.numPerPage;
                  index = $scope.objects.indexOf(value);
                  return (begin <= index && index < end);
              };
              //alert("error");
            }).error(function(){
              //alert("error");
            });

      };

/***********************************************************/


  $scope.people = [];
  $scope.selecteds = [];

  var init = function () {
    $scope.config = {
      id: 'veasy-table',
      columns: [
        { header: 'Id',         value: 'memIdx',          size: 5, show: true },
        { header: 'Name', value: 'name',  size: 10, show: true },
        { header: 'Birth',  value: 'birth',   size: 10, show: true },
        { header: 'Address',      value: 'address',       size: 20, show: true },
        { header: 'Mobile',    value: 'mobile',     size: 10, show: true }
      ],
      /*
      columns: [
        { header: 'Id',         value: 'id',          size: 5, show: true },
        { header: 'First Name', value: 'first_name',  size: 40, show: true },
        { header: 'Last Name',  value: 'last_name',   size: 40, show: true },
        { header: 'Email',      value: 'email',       size: 0, show: false },
        { header: 'Country',    value: 'country',     size: 0, show: false },
        { header: 'IP',         value: 'ip_address',  size: 15, show: true }
      ],
      */
      /*
      checkbox: {
        enable: true,
        size: 20
      },
      */
      pagination: {
        enable: true,
        currentPage: 0,
        itemsPerPage: 10,
      },
      filter: {
        enable: true,
        conditional: false,
        delay: 500
      },
      /*
      columnFilter: {
        enable: true,
        autoOpen: true,
        modalSize: 'md'
      },
      sort: {
        enable: true
      },
      */
      resizable: {
        enable: true,
        minimumSize: 5
      },
      events: {
        onClickRow: function (row) {
          alert('Row Clicked: ' + JSON.stringify(row.memIdx) + '. More details in your console.');
          console.log(JSON.stringify(row, null, 2));
          console.log('---------------------------------');
          console.log('');
        },
        onApplyColumnFilter: function (columns) {
          alert('Applied Columns! More details in your console.');
          console.log(JSON.stringify(columns, null, 2));
          console.log('---------------------------------');
          console.log('');
        },
        onTableStateChange: function (columns) {
          alert('State changed! More details in your console.');
          console.log(JSON.stringify(columns, null, 2));
          console.log('---------------------------------');
          console.log('');
        }
      }
    };

    peopleService.findAll().then(function (data) {
      $scope.people = data;
    });

  };

  $scope.addPerson = function (person) {
    person.id = ($scope.people.length + 1);
    $scope.people.push(person);
    $scope.person = {};
  };

  init();


}])

.factory('peopleService', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {

  return {
    findAll: function (callback) {
      var deferred = $q.defer();

      $timeout(function () {
        //$http.get('/pages/js/people.json').success(function (data) {
        $http.get('//localhost:3000/srchMemberInfoNasgn').success(function (data) {
          deferred.resolve(data);
        });
      }, 2500);

      return deferred.promise;
    }
  };

}]);
