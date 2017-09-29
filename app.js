/*global angular, $http */
(function () {

	"use strict";
	
	// ANGULAR MODULE/APP (gemStore):
	
	var app = angular.module("gemStore", ["store-products"])

		// CONTROLLERS:
	
		.controller("StoreController", ["$http", function ($http) {
			
			var store = this;
			store.products = [];


			
			//$http.get("products.json").success(function (data) {
			$http.get("http://localhost:3001/api/fgemprod").success(function (data) {	
				store.products = data.products;
				console.log(store.products);
			});

			store.deleteProduct = function (id) {
				alert("ok");
				console.log(id);
				
			   var retVal = confirm("Do you want to continue ?");
               if( retVal == true ){

                console.log("delete gem....");
				$http.delete("http://localhost:3001/api/fgemprod/"+id)
                .then(function success(response){
                    console.log(response);
                },
                function err(err){
                    console.log(err);
                })


               }
               else{
                  //document.write ("User does not want to continue!");
                  return false;
               } 




			};


		}])

		.controller("ReviewController", ["$http", function ($http) {

			this.review = {};

			this.addReview = function (product) {

				console.log(product);
				this.review.createdOn = Date.now();
				product.reviews.push(this.review);
				//this.review = {};

				$http.post("http://localhost:3001/api/fgemprod/"+product._id,this.review).success(function (data) {	
					//store.products = data.products;
					console.log(data);
				});



			};
		}])

	    .controller("NewProduct", ["$http", function ($http)  {
        
        var url = 'http://localhost:3001/api/fgemprod';



        this.product = {
			name:  '',
			description: '',
			price: 0,
			specs: {
			      faces:  0,
			      color:  '',
			      rarity: 0,
			      shine:  0,
			},
			images:[""]                
  
        };



        this.newGem = function(product) {
           
                console.log("posting data....");
                console.log(product);
                // JSON.stringify(data)

                $http.post(url, this.product)
                .then(function success(response){
                    console.log(response);
                },
                function err(err){
                    console.log(err);
                })
            
        };

		this.addImage = function(){
		  this.product.images.push("");
		};

		this.removeImage = function(){
		  if(this.product.images.length > 1){	
		  this.product.images.pop("");
		}
		};
        
    
    }])


.controller("EditProduct", [ "$scope","$http", function ($scope, $http)  {
     
    var url = 'http://localhost:3001/api/fgemprod';

     $scope.products = {
			name:  '',
			description: '',
			price: 0,
			specs: {
			      faces:  0,
			      color:  '',
			      rarity: 0,
			      shine:  0,
			},
			images:[""]                
  
        };

   
    $http.get(url).then(function success(response){
        console.log(response);
        $scope.products = response.data.products;
    });

    $scope.myproduct = $scope.products[0]; // frist
    console.log("cosa:");
    console.log($scope.myproduct);
    console.log($scope.products[0]);


    this.editGem = function() {
        console.log($scope.myproduct);
       
        var id = $scope.myproduct['_id'];
        console.log(id);
 
             
    	$http.put(url+"/"+id, $scope.myproduct)
             .then(function success(response){
                 console.log(response);
                 console.log("posting data....");
                 
             },
             function err(err){
                 console.log(err);
             })



         
    }
		this.addImage = function(){
		  $scope.myproduct.images.push("");
		};

		this.removeImage = function(){
		  if($scope.myproduct.images.length > 1){	
		  $scope.myproduct.images.pop("");
		}
		};


}])

}());