angular.module('starter.controllers', [])

    .controller('LoginCtrl', function ($scope, $ionicPopup, $state) {

        $scope.user = {};
        var user = {};
        $scope.login = function () {
            Backendless.enablePromises();
            user.email = $scope.user.email;
            user.password = $scope.user.password;

            function userLoggedIn(user) {
                console.log("USER: " + $scope.user.email + " SENHA: " + $scope.user.password);
                console.log("user has logged in");
                $scope.user = {};
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

            try {
                // now log out:
                var userLogged = Backendless.UserService.getCurrentUser();
                if( userLogged == null )
                {
                    $state.go('login');
                }
                else {
                    if (Backendless.UserService.logout())
                    {
                        $ionicPopup.alert({
                            title: 'Você saiu!',
                            template: '<p style="text-align: center">Você saiu com sucesso!</p>'
                        });
                        $state.go('login');
                    }
                }

            }
            catch (err) // see more on error handling
            {
                // logout failed, to get the error code, call err.statusCode
                console.log("error message - " + err.message);
                console.log("error code - " + err.statusCode);
            }
        }
        $scope.trocarNome = function () {
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
        $scope.user = {};
     }
     $scope.voltar = function(){
        $state.go('login');
     }
        
})
.controller('PassCtrl', function($scope, $state, $ionicPopup){

    $scope.user = {};
   var user = {};
    /*   var user2 = {};*/

    $scope.updateName = function(){
        Backendless.enablePromises();
/*        user.email = $scope.user.email;
        user.password = $scope.user.password;
        user2.password = $scope.user.newpassword;
        console.log($scope.user.email + ' ' + $scope.user.password);*/
        var loggedInUser = {};

        function userLoggedIn( user )
        {
            loggedInUser = user;
            updateUser(user);
            console.log(user);
        }

        function gotError( err ) // see more on error handling
        {
            $ionicPopup.alert({
                title: 'Alteração de senha:',
                template: '<p style="text-align: center">E-mail/Senha incorreto(s)/incompleto(s)!</p>'
            });
        }

        function gotError2( err ) // see more on error handling
        {
            $ionicPopup.alert({
                title: 'Senha não foi alterado!',
                template: '<p style="text-align: center">' + err.message + '</p>'
            });
        }
        
        function userUpdated( user )
        {
            $ionicPopup.alert({
                title: 'Alteração de senha:',
                template: '<p style="text-align: center">Senha alterada com sucesso!</p>'
            });
            this.loggedInUser = user;
            $scope.user = {};
            
        }

        function updateUser(user)
        {
            user.password = $scope.user.newpassword;
            console.log('Senha nova: ' + user.password);
            Backendless.UserService.update( user, new Backendless.Async( userUpdated, gotError2 ) );

        }

        Backendless.UserService.login( $scope.user.email, $scope.user.password ).then( userLoggedIn ).catch( gotError );
    }
    $scope.voltarConta = function(){
        $state.go('tab.conta');
    }
});
