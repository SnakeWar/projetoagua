angular.module('starter.controllers', [])

    .controller('LoginCtrl', function ($scope, $ionicPopup, $state, $ionicLoading) {

        $scope.user = {};
        var user = {};
        $scope.login = function () {
            Backendless.enablePromises();
            user.email = $scope.user.email;
            user.password = $scope.user.password;
            $ionicLoading.show({
                template: 'Carregando...',
                duration: 3000
            }).then(function(){
                console.log("The loading indicator is now displayed");
            });
            function userLoggedIn(user) {
                console.log("USER: " + $scope.user.email + " SENHA: " + $scope.user.password);
                console.log("user has logged in");
                $scope.user = {};
                $ionicLoading.hide().then(function() {
                    console.log("The loading indicator is now hidden");
                });
                $state.go('tab.sobre');

            }

            function gotError(err) // see more on error handling
            {
                console.log("error message - " + err.message);
                console.log("error code - " + err.statusCode);
                $ionicLoading.hide().then(function() {
                    console.log("The loading indicator is now hidden");
                });
                $ionicPopup.alert({
                    title: 'Login falhou!',
                    template: '' + err.message + ''
                });
            }

            Backendless.UserService.login(user.email, user.password).then(userLoggedIn).catch(gotError);
        };
        $scope.loginFacebook = function () {

            loginUserAsync();

            function handleResponse(loggedInUser){
                console.log( "User has been logged in - " + loggedInUser.objectId);
            }

            function handleFault(backendlessFault){
                console.log( "Server reported an error - ");
                console.log(backendlessFault.message);
                console.log(backendlessFault.statusCode);
            }

            function loginUserAsync() {
                var callback = new Backendless.Async(handleResponse, handleFault);
                Backendless.UserService.login("spidey@backendless.com", "greeng0blin", callback);
            }
        };
        $scope.cadastro = function () {
            $state.go('cadastrar');
        }
    })

    .controller('SobreCtrl', function($scope) {

        $scope.pessoas = {};

        var contactsCollection = Backendless.Persistence.of( Contact ).find();
        $scope.pessoas = contactsCollection.data;
    })

    .controller('PedidoCtrl', function($scope) {
        $scope.pessoa = {};
        var pessoa = {};
$scope.adicionar = function () {
    pessoa = $scope.pessoa;

    function Contact(args) {
        args = args || {};
        this.name = args.name || "";
        this.funcao = args.funcao || "";
    }
    function objectSaved( pessoa )
    {
        pessoa = $scope.pessoa;
        console.log( "object has been saved" );
    }

    function gotError( err )
    {
        console.log( "error message - " + err.message );
        console.log( "error code - " + err.statusCode );
    }

    Backendless.Persistence.of( Contact ).save( pessoa, new Backendless.Async( objectSaved, gotError ) );
}

    })

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
        };
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

.controller('CadCtrl', function($scope, $ionicPopup, $state, $ionicLoading){
    Backendless.enablePromises();
    $scope.user = {};
    $scope.cadastrar = function(){

        $ionicLoading.show({
            template: 'Carregando...',
            duration: 3000
        }).then(function(){
            console.log("The loading indicator is now displayed");
        });
        function popUp(){
            $ionicPopup.alert({
                title: 'Cadastrado!',
                template: 'Seja Bem-Vindo'
            });
        }
     function userRegistered( user )
        {
            console.log( "user has been registered" + user );
            $ionicLoading.hide().then(function() {
                console.log("The loading indicator is now hidden");
            });
            $scope.user = {};
            popUp();
        }
        function gotError( err ) // see more on error handling
        {
            console.log( "error message - " + err.message );
            console.log( "error code - " + err.statusCode );
            $ionicLoading.hide().then(function() {
                console.log("The loading indicator is now hidden");
            });
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

     }
        
})
.controller('PassCtrl', function($scope, $state, $ionicPopup, $ionicLoading){

    $scope.user = {};
    var user = {};
    /*   var user2 = {};*/

    $scope.updateName = function(){
        $ionicLoading.show({
            template: 'Carregando...',
            duration: 3000
        }).then(function(){
            console.log("The loading indicator is now displayed");
        });
        Backendless.enablePromises();
/*      user.email = $scope.user.email;
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
            ionicLoading.hide().then(function() {
                console.log("The loading indicator is now hidden");
            });
            $ionicPopup.alert({
                title: 'Alteração de senha:',
                template: '<p style="text-align: center">E-mail/Senha incorreto(s)/incompleto(s)!</p>'
            });
        }

        function gotError2( err ) // see more on error handling
        {
            ionicLoading.hide().then(function() {
                console.log("The loading indicator is now hidden");
            });
            $ionicPopup.alert({
                title: 'Senha não foi alterado!',
                template: '<p style="text-align: center">' + err.message + '</p>'
            });
        }
        
        function userUpdated( user )
        {
            $ionicLoading.hide().then(function() {
                console.log("The loading indicator is now hidden");
            });
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
