define(['durandal/system', 'plugins/router', 'services/logger', 'services/entitymanagerprovider', 'model/modelBuilder', 'services/errorhandler'],
    function (system, router, logger, entitymanagerprovider, modelBuilder, errorhandler) {

        entitymanagerprovider.modelBuilder = modelBuilder.extendMetadata;

        var shell = {
            activate: activate,
            attached:attached,
            router: router
        };

        errorhandler.includeIn(shell);

        return shell;

        //#region Internal Methods
        function activate() {
            return entitymanagerprovider
                .prepare()
                .then(bootPrivate)
                .fail(function (e) {
                    if (e.status === 401) {
                        return bootPublic();
                    } else {
                        shell.handleError(e);
                        return false;
                    }
                });
        }

        function attached() {
            $(document).bind("mobileinit", function () {
                $.mobile.pushStateEnabled = true;
            });

            $(function () {
                var menuStatus;
                var show = function () {
                    if (menuStatus) {
                        return;
                    }
                    $('#menu').show();
                    $(".ui-page-active").animate({
                        marginLeft: "165px",
                    }, 300, function () {
                        menuStatus = true;
                    });
                };
                var hide = function () {
                    if (!menuStatus) {
                        return;
                    }
                    $(".ui-page-active").animate({
                        marginLeft: "0px",
                    }, 300, function () {
                        menuStatus = false;
                        $('#menu').hide();
                    });
                };
                var toggle = function () {
                    if (!menuStatus) {
                        show();
                    } else {
                        hide();
                    }
                    return false;
                };

                // Show/hide the menu
                $("a.showMenu").click(toggle);
                $('#menu, .pages').on("swipeleft", hide);
                $('.pages').on("swiperight", show);

                $('div[data-role="page"]').on('pagebeforeshow', function (event, ui) {
                    menuStatus = false;
                    $(".pages").css("margin-left", "0");
                });

                // Menu behaviour
                $("#menu li a").click(function () {
                    var p = $(this).parent();
                    p.siblings().removeClass('active');
                    p.addClass('active');
                });
            });
           
        }

        function bootPrivate() {
            log('TempHire Loaded!', null, true);

            return router
                .makeRelative({ moduleId: 'viewmodels' })
                .map([
                    { route: 'assessment/assessmentlist', moduleId: 'assessment/assessmentlist', title: 'Hello World', nav: true }
                    //{ route: 'home', moduleId: 'home', title: 'Home', nav: true },
                    //{ route: 'resourcemgt', moduleId: 'resourcemgt', title: 'Resource Management', nav: true }
                ])
                .mapUnknownRoutes('assessment/assessmentlist', 'not-found')
                .buildNavigationModel()
                .activate();
        }

        function bootPublic() {
            return router
                .makeRelative({ moduleId: 'viewmodels' })
                .map([
                    { route: '', moduleId: 'login', nav: true }])
                .mapUnknownRoutes('login', 'not-found')
                .activate();
        }

        function log(msg, data, showToast) {
            logger.log(msg, data, system.getModuleId(shell), showToast);
        }
        //#endregion
    });