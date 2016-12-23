angular.module('starter.controllers', [])

    .controller('LoginCtrl', function ($scope, $ionicPopup, $state) {
        Backendless.enablePromises();
        function userLoggedIn(user) {
            console.log("USER: " + $scope.user.email + " SENHA: " + $scope.user.password);
            console.log("user has logged in");
            delete $scope.user;
            $state.go('tab.sobre');

        }

        function gotError(err) // see more on error handling
        {
            console.log("error message - " + err.message);
            console.log("error code - " + err.statusCode);
            var alertPopup = $ionicPopup.alert({
                title: 'Login falhou!',
                template: '' + err.message + ''
            });
        }

        $scope.user = {};
        var user = {};
        $scope.login = function () {
        user.email = $scope.user.email;
        user.password = $scope.user.password;
            Backendless.UserService.login(user.email, user.password).then(userLoggedIn).catch(gotError);
        };
        $scope.cadastro = function () {
            $state.go('cadastrar');
        }
    })

    .controller('SobreCtrl', function($scope) {})

    .controller('PedidoCtrl', function($scope) {})

    .controller('ContaCtrl', function($scope, $state, $ionicPopup) {
        $scope.logout = function () {

            function gotError( err ) // see more on error handling
            {
                console.log( "error message - " + err.message );
                console.log( "error code - " + err.statusCode );
            }

            function userLoggedout()
            {
                console.log( "user has been logged out" );
                $state.go('login');
            }


            Backendless.UserService.logout( new Backendless.Async( userLoggedout, gotError ) );
        }
        $scope.trocarNome = function(){
            $state.go('senha');
        }       


    })

    .controller('AppCtrl', function($scope, $state) {
        $scope.sobre = function () {
            $state.go('tab.sobre');
        }
        $scope.pedido = function () {
            $state.go('tab.pedido');
        }
        $scope.conta = function () {
            $state.go('tab.conta');
        }
    })

.controller('CadCtrl', function($scope, $ionicPopup, $state){
    Backendless.enablePromises();
    $scope.user = {};
    $scope.cadastrar = function(){
     function userRegistered( user )
        {
            console.log( "user has been registered" );
            $ionicPopup.alert({
                title: 'Cadastrado!',
                template: 'Seja Bem-Vindo'
            });
        }
        function gotError( err ) // see more on error handling
        {
            console.log( "error message - " + err.message );
            console.log( "error code - " + err.statusCode );
            $ionicPopup.alert({
                title: 'Cadastro Falhou!',
                template: '' + err.message + ''
            });
        }
        console.log($scope.user.email);
        user = new Backendless.User();
        user.email = $scope.user.email;
        user.password = $scope.user.password;
        user.name = $scope.user.name;
        Backendless.UserService.register(user).then(userRegistered).catch(gotError);
        $scope.user = '';
     }
     $scope.voltar = function(){
        $state.go('login');
     }
        
})
.controller('PassCtrl', function($scope, $state, $ionicPopup){
    $scope.user = {};


    $scope.updateName = function(){

        var user;

        try
        {
            user = Backendless.UserService.login( $scope.user.email, $scope.user.password );
        }
        catch( err )
        {
            // login failed
            console.log( "error message - " + err.message );
            console.log( "error code - " + err.statusCode );
        }

        try
        {
            user.name = $scope.user.name;
            user = Backendless.UserService.update( user );
            $ionicPopup.alert({
                title: 'Dado Alterado!',
                template: '<p style="text-align: center">Atualização bem sucedida.</p>'
            });
            $scope.user = '';
        }
        catch( err )
        {
            // update failed
            console.log( "error message - " + err.message );
            console.log( "error code - " + err.statusCode );
            $ionicPopup.alert({
                title: 'Dado não foi alterado!',
                template: '<p style="text-align: center">' + err.message + '</p>'
            });
            $scope.user = '';
        }
    }
    $scope.voltarConta = function(){
        $state.go('tab.conta');
    }
});
