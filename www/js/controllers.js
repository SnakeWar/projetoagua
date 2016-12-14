angular.module('starter.controllers', [])

    .controller('LoginCtrl', function ($scope, $ionicPopup, $state) {
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

        $scope.login = function () {

            Backendless.UserService.login($scope.user.email, $scope.user.password, new Backendless.Async(userLoggedIn, gotError))
        };
        $scope.cadastro = function () {
            $state.go('cadastrar');
        }
    })

    .controller('SobreCtrl', function($scope) {})

    .controller('PedidoCtrl', function($scope) {})

    .controller('ContaCtrl', function($scope, $state) {
        $scope.logout = function () {
            try
            {
// now log out:
                Backendless.UserService.logout();
                console.log('user logged out');
                $state.go('login');
            }
            catch( err ) // see more on error handling
            {
// logout failed, to get the error code, call err.statusCode
                console.log( "error message - " + err.message );
                console.log( "error code - " + err.statusCode );
                 var alertPopup = $ionicPopup.alert({
                title: 'Logout falhou!',
                template: '' + err.message + ''
            });

            }
        }
        $scope.trocarsenha = function(){
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
     $scope.user = {};
     $scope.cadastrar = function(){
     function userRegistered( user )
        {
            console.log( "user has been registered" );
            var alertPopup = $ionicPopup.alert({
                title: 'Cadastrado!',
                template: 'Seja Bem-Vindo'
            });
        }
        function gotError( err ) // see more on error handling
        {
            console.log( "error message - " + err.message );
            console.log( "error code - " + err.statusCode );
            var alertPopup = $ionicPopup.alert({
                title: 'Cadastro Falhou!',
                template: '' + err.message + ''
            });
        }
        console.log($scope.user.email);
        user = new Backendless.User();
        user.email = $scope.user.email;
        user.password = $scope.user.password;
        user.name = $scope.user.name;

        Backendless.UserService.register( user, new Backendless.Async
        ( userRegistered, gotError ) );
        $scope.user = '';
     }
     $scope.voltar = function(){
        $state.go('login');
     }
        
})
.controller('PassCtrl', function($scope, $state, $ionicPopup){
    $scope.user = {};
    var user = {};
    console.log($scope.user.oldpasssword);
    $scope.updatesenha = function(){
        try
        {
        console.log($scope.user.email);
        console.log($scope.user.password);
        user = Backendless.UserService.login( $scope.user.email, $scope.user.password );
        }
        catch( err )
        {
        // login failed
        console.log( "error message - " + err.message );
        console.log( "error code - " + err.statusCode );
        $ionicPopup.alert({
                title: 'Senha não foi alterada!',
                template: '' + err.message + ''
            });
        }
        try
        {
            
            user.password = $scope.user.newpassword;
            console.log(user.password);
            Backendless.UserService.update(user);
            $ionicPopup.alert({
                    title: 'Senha Alterada!',
                    template: 'Troca de senha bem sucedida.'
            });
        $scope.user = "";
        }
        catch( err )
        {
        // update failed
            console.log( "error message - " + err.message );
            console.log( "error code - " + err.statusCode );
            $ionicPopup.alert({
                title: 'Senha não foi alterada!',
                template: '' + err.message + ''
            });
        }

    }
    $scope.voltarconta = function(){
        $state.go('tab.conta');
    }
});
