const base_url = "/gha-repair/"

angular.module('gha-repair-website', ['ngRoute', 'ui.bootstrap', 'anguFixedHeaderTable', 'chart.js'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/bug/:benchmark/:id', {
                controller: 'bugController'
            })
            .when('/', {
                controller: 'mainController'
            });
        // configure html5 to get links working on jsfiddle
        $locationProvider.html5Mode(false);
    })
    .directive('keypressEvents', [
        '$document',
        '$rootScope',
        function ($document, $rootScope) {
            return {
                restrict: 'A',
                link: function () {
                    $document.bind('keydown', function (e) {
                        $rootScope.$broadcast('keypress', e);
                        $rootScope.$broadcast('keypress:' + e.which, e);
                    });
                }
            };
        }
    ]).directive('diff', ['$http', function ($http) {
        return {
            restrict: 'A',
            scope: {
                patch: '=diff'
            },
            link: function (scope, elem, attrs) {
                function prepareDiff(diff) {
                    if (diff != null && diff != '') {
                        var regex_origin = /--- ([^ ]+).*/.exec(diff)
                        if (regex_origin) {
                            origin = regex_origin[1]
                            dest = /\+\+\+ ([^ ]+).*/.exec(diff)[1]
                            if (dest.indexOf(origin) > 0) {
                                diff = diff.replace(dest, origin)
                            }
                            diff = diff.replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\t/g, "\t")
                        }
                        var diff2htmlUi = new Diff2HtmlUI($(elem)[0], diff, {
                            showFiles: false,
                            matching: 'none'
                        });
                        diff2htmlUi.draw();
                        diff2htmlUi.highlightCode();
                    }
                }

                function printDiff(patch) {
                    $(elem).text('')
                    if (patch.metrics.patchSize > 10000) {
                        return $(elem).text('The diff is too big to be displayed')
                    }
                    var diff = patch.diff;
                    if (diff == null) {
                        diff = patch.patch;
                    }
                    if (diff == null) {
                        diff = patch.PATCH_DIFF_ORIG;
                    }
                    if (diff == null) {
                        $http.get(base_url + "bugs/" + patch.benchmark + "/" + patch.bugId + "/" + "patch.diff").then(response => {
                            patch.diff = response.data
                            prepareDiff(response.data)
                        }, error => {
                            return $(elem).text('The diff is not available')
                        })
                    } else {
                        prepareDiff(diff)
                    }
                }
                scope.$watch('patch', function () {
                    printDiff(scope.patch);
                })
                printDiff(scope.patch);
            }
        }
    }]).directive('testdiff', ['$http', function ($http) {
        return {
            restrict: 'A',
            scope: {
                patch: '=testdiff'
            },
            link: function (scope, elem, attrs) {
                function prepareDiff(diff) {
                    if (diff != null && diff != '') {
                        var regex_origin = /--- ([^ ]+).*/.exec(diff)
                        if (regex_origin) {
                            origin = regex_origin[1]
                            dest = /\+\+\+ ([^ ]+).*/.exec(diff)[1]
                            if (dest.indexOf(origin) > 0) {
                                diff = diff.replace(dest, origin)
                            }
                            diff = diff.replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\t/g, "\t")
                        }
                        var diff2htmlUi = new Diff2HtmlUI($(elem)[0], diff, {
                            showFiles: false,
                            matching: 'none'
                        });
                        diff2htmlUi.draw();
                        diff2htmlUi.highlightCode();
                    }
                }

                function printDiff(patch) {
                    $(elem).text('')
                    if (patch.metrics.patchSize > 10000) {
                        return $(elem).text('The diff is too big to be displayed')
                    }
                    var diff = patch.testdiff;
                    if (diff == null) {
                        diff = patch.patch;
                    }
                    if (diff == null) {
                        diff = patch.PATCH_DIFF_ORIG;
                    }
                    if (diff == null) {
                        $http.get(base_url + "bugs/" + patch.benchmark + "/" + patch.bugId + "/" + "test_patch.diff").then(response => {
                            patch.testdiff = response.data
                            prepareDiff(response.data)
                        }, error => {
                            return $(elem).text('The diff is not available')
                        })
                    } else {
                        prepareDiff(diff)
                    }
                }
                scope.$watch('patch', function () {
                    printDiff(scope.patch);
                })
                printDiff(scope.patch);
            }
        }
    }])
    .controller('welcomeController', function ($uibModalInstance) {
        this.ok = function () {
            $uibModalInstance.close();
        };
    })
    .controller('statController', function ($scope, $uibModalInstance, bugs, languages) {
        var $ctrl = this;
        $ctrl.bugs = bugs;
        $scope.languages = languages;

        $ctrl.options = {
            title: {
                display: true,
                text: 'The time between the failing commit and the passing commit.'
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
        $ctrl.optionsHunks = {
            title: {
                display: true,
                text: 'Number of Hunks'
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
        $ctrl.fixTimeLabels = ['<1h', '<6h', '<12h', '<24h', '<36h', '<48h', '<1w', '<1m', '>1m'];
        $ctrl.hunksLabels = ['1', '2', '3', '4', '5', '>5'];
        $ctrl.series = languages;

        $ctrl.hunksStats = {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '>5': 0
        }

        $ctrl.fixTimeStat = {
            3600: 0,
            21600: 0,
            43200: 0,
            86400: 0,
            129600: 0,
            172800: 0,
            604800: 0,
            2592000: 0,
            99999999999999: 0
        }
        $ctrl.fileStat = {}
        $ctrl.patchSizeStat = {}

        for (var i = 0; i < languages.length; i++) {
            $ctrl.fileStat[languages[i]] = {
                "modified": 0,
                "added": 0,
                "deleted": 0
            }
            $ctrl.patchSizeStat[languages[i]] = {
                "added": 0,
                "deleted": 0
            }
        }

        for (var bug of $ctrl.bugs) {
            if (bug.metrics.hunks > 5) {
                $ctrl.hunksStats['>5']++
            } else {
                $ctrl.hunksStats[bug.metrics.hunks]++
            }

            $ctrl.fileStat[bug.language].added += bug.files.added.length
            $ctrl.fileStat[bug.language].modified += bug.files.modified.length
            $ctrl.fileStat[bug.language].deleted += bug.files.deleted.length
            if (bug.size) {
                $ctrl.sizeStat[bug.language] += bug.size
            }
            $ctrl.patchSizeStat[bug.language].added += bug.metrics.addedLines
            $ctrl.patchSizeStat[bug.language].deleted += bug.metrics.removedLines

            var failingCommitDate = Date.parse(bug.previous_commit_at)
            var passedCommitDate = Date.parse(bug.committed_at)
            if (!failingCommitDate || !passedCommitDate) {
                continue
            }
            var diff = (passedCommitDate - failingCommitDate) / 1000
            for (var t in $ctrl.fixTimeStat) {
                if (diff < t) {
                    $ctrl.fixTimeStat[t]++
                    break
                }
            }
        }

        $ctrl.fixTimeDate = (function () {
            return Object.values($ctrl.fixTimeStat);
        })()

        $ctrl.hunks = (function () {
            return Object.values($ctrl.hunksStats);
        })()

        this.ok = function () {
            $uibModalInstance.close();
        };
    })
    .controller('bugModal', function ($scope, $http, $rootScope, $uibModalInstance, bug) {
        var $ctrl = this;
        $ctrl.bug = bug;
        $ctrl.size = 0

        $rootScope.$on('new_bug', function (e, bug) {
            $ctrl.bug = bug;
            $ctrl.size = 0

            for (var t of document.querySelectorAll('.log')) {
                t.innerText = 'Click here to download the log...'
            }
        });

        function cleanLog(log) {
            const pattern = [
                '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
                '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
            ].join('|');
            return log.trim().replace(new RegExp(pattern, 'g'), '')
        }

        $ctrl.show_prev_commit_log = function (e, bug) {
            if (e.target.innerText == 'Loading...') {
                return
            }
            e.target.innerText = 'Loading...'
            $http.get(base_url + "bugs/" + $ctrl.bug.benchmark + "/" + $ctrl.bug.bugId + "/" + "prev_commit.log").then(response => {
                e.target.innerText = ''
                console.log(response.data)
                var term = new Terminal({
                    cols: 140,
                    convertEol: true,
                    theme: {
                        background: '#FFFFFF',
                        foreground: '#333'
                    }
                });
                term.open(e.target);
                term.write(response.data)
            })
        }

        $ctrl.show_prev_commit_w_diff_log = function (e, bug) {
            if (e.target.innerText == 'Loading...') {
                return
            }
            e.target.innerText = 'Loading...'
            $http.get(base_url + "bugs/" + $ctrl.bug.benchmark + "/" + $ctrl.bug.bugId + "/" + "prev_commit_w_diff.log").then(response => {
                e.target.innerText = ''
                var term = new Terminal({
                    cols: 140,
                    convertEol: true,
                    theme: {
                        background: '#FFFFFF',
                        foreground: '#333'
                    }
                });
                term.open(e.target);
                term.write(response.data)
            })
        }

        $ctrl.show_current_commit_log = function (e, bug) {
            if (e.target.innerText == 'Loading...') {
                return
            }
            e.target.innerText = 'Loading...'
            $http.get(base_url + "bugs/" + $ctrl.bug.benchmark + "/" + $ctrl.bug.bugId + "/" + "current_commit.log").then(response => {
                e.target.innerText = ''
                var term = new Terminal({
                    cols: 140,
                    convertEol: true,
                    theme: {
                        background: '#FFFFFF',
                        foreground: '#333'
                    }
                });
                term.open(e.target);
                term.write(response.data)
            })
        }

        $ctrl.ok = function () {
            $uibModalInstance.close();
        };
        $ctrl.nextPatch = function () {
            $rootScope.$emit('next_bug', 'next');
        };
        $ctrl.previousPatch = function () {
            $rootScope.$emit('previous_bug', 'next');
        };
        $ctrl.randomPatch = function () {
            $rootScope.$emit('random_bug', 'next');
        };
    })
    .controller('bugController', function ($scope, $http, $location, $rootScope, $routeParams, $uibModal) {
        var $ctrl = $scope;
        $ctrl.bugs = $scope.$parent.filteredBugs;
        $ctrl.index = -1;
        $ctrl.bug = null;

        $scope.$watch("$parent.filteredBugs", function () {
            $ctrl.bugs = $scope.$parent.filteredBugs;
            $ctrl.index = getIndex($routeParams.benchmark, $routeParams.id);
        });

        var getIndex = function (benchmark, bugId) {
            if ($ctrl.bugs == null) {
                return -1;
            }
            for (var i = 0; i < $ctrl.bugs.length; i++) {
                if ($ctrl.bugs[i].benchmark == benchmark &&
                    ($ctrl.bugs[i].bugId == bugId || bugId == null)) {
                    return i;
                }
            }
            return -1;
        };

        $scope.$on('$routeChangeStart', function (next, current) {
            $ctrl.index = getIndex(current.params.benchmark, current.params.id);
        });

        var modalInstance = null;
        $scope.$watch("index", function () {
            if ($scope.index != -1) {
                if (modalInstance == null) {
                    modalInstance = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'modelPatch.html',
                        controller: 'bugModal',
                        controllerAs: '$ctrl',
                        size: "lg",
                        resolve: {
                            bug: function () {
                                return $scope.bugs[$scope.index];
                            }
                        }
                    });
                    modalInstance.result.then(function () {
                        modalInstance = null;
                        $location.path("/");
                    }, function () {
                        modalInstance = null;
                        $location.path("/");
                    })
                } else {
                    $rootScope.$emit('new_bug', $scope.bugs[$scope.index]);
                }
            }
        });
        var nextPatch = function () {
            var index = $scope.index + 1;
            if (index == $ctrl.bugs.length) {
                index = 0;
            }
            $location.path("/bug/" + $ctrl.bugs[index].benchmark + "/" + $ctrl.bugs[index].bugId);
            return false;
        };
        var previousPatch = function () {
            var index = $scope.index - 1;
            if (index < 0) {
                index = $ctrl.bugs.length - 1;
            }
            $location.path("/bug/" + $ctrl.bugs[index].benchmark + "/" + $ctrl.bugs[index].bugId);
            return false;
        };
        var randomPatch = function () {
            var index = Math.floor(Math.random() * $ctrl.bugs.length);
            $location.path("/bug/" + $ctrl.bugs[index].benchmark + "/" + $ctrl.bugs[index].bugId);
            return false;
        }

        $scope.$on('keypress:39', function () {
            $scope.$apply(function () {
                nextPatch();
            });
        });
        $scope.$on('keypress:37', function () {
            $scope.$apply(function () {
                previousPatch();
            });
        });
        $rootScope.$on('next_bug', nextPatch);
        $rootScope.$on('previous_bug', previousPatch);
        $rootScope.$on('random_bug', randomPatch);
    })
    .controller('mainController', async function ($scope, $location, $rootScope, $http, $timeout, $uibModal) {
        $scope.sortType = ['bugId']; // set the default sort type
        $scope.sortReverse = false;
        $scope.match = "all";
        $scope.search = "";
        $scope.filters = {
        };
        $scope.benchmarks = ["gha-repair"];
        $scope.tools = [];

        $scope.bugs = [];
        $scope.languages = [];

        async function downloadPatches() {
            for (var bench of $scope.benchmarks) {
                await $http.get(base_url + bench.toLowerCase() + ".json").then(function (response) {
                    var bugs = response.data
                    for (var key in bugs) {
                        $scope.bugs.push(bugs[key]);
                    }

                    var element = angular.element(document.querySelector('#menu'));
                    var height = element[0].offsetHeight;

                    angular.element(document.querySelector('#mainTable')).css('height', (height - 120) + 'px');
                });
            }
        }
        await downloadPatches();

        for (var i = 0; i < $scope.bugs.length; i++) {
            if (!$scope.languages.includes($scope.bugs[i].language)) {
                $scope.languages.push($scope.bugs[i].language)
                $scope.filters[$scope.bugs[i].language] = true
            }
        }

        var statModal = null;
        $scope.openStat = function () {
            statModal = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'stat.html',
                controller: 'statController',
                controllerAs: '$ctrl',
                size: "lg",
                resolve: {
                    bugs: function () {
                        return $scope.filteredBugs;
                    },
                    languages: function () {
                        return $scope.languages;
                    }
                }
            });
            statModal.result.then(function () {
                statModal = null;
            }, function () {
                statModal = null;
            })
        };


        $scope.openBug = function (bug) {
            $location.path("/bug/" + bug.benchmark + "/" + bug.bugId);
        };

        $scope.sort = function (sort) {
            if (sort == $scope.sortType) {
                $scope.sortReverse = !$scope.sortReverse;
            } else {
                $scope.sortType = sort;
                $scope.sortReverse = false;
            }
            return false;
        }

        $scope.countBugs = function (key, filter) {
            if (filter == null) {
                filter = {}
            }
            if (filter.count) {
                return filter.count;
            }
            var count = 0;
            for (var i = 0; i < $scope.bugs.length; i++) {
                if ($scope.bugs[i].benchmark.toLowerCase() === key.toLowerCase()) {
                    count++;
                } else if ($scope.bugs[i].benchmark === key) {
                    count++;
                } else if ($scope.bugs[i].repairActions && $scope.bugs[i].repairActions[key] != null && $scope.bugs[i].repairActions[key] > 0) {
                    count++;
                } else if ($scope.bugs[i].repairPatterns && $scope.bugs[i].repairPatterns[key] != null && $scope.bugs[i].repairPatterns[key] > 0) {
                    count++;
                }
            }
            filter.count = count;
            return count;
        };

        $scope.naturalCompare = function (a, b) {
            if (a.type === "number") {
                return a.value - b.value;
            }
            return naturalSort(a.value, b.value);
        }

        document.getElementById("deselect-all").addEventListener("click", function () {
            document.getElementById("loader").style.display = "block";
            $timeout(function () {
                $scope.$apply(function () {
                    for (var i = 0; i < $scope.languages.length; i++) {
                        $scope.filters[$scope.languages[i]] = false
                    }
                })
            })
        });

        document.getElementById("select-all").addEventListener("click", function () {
            document.getElementById("loader").style.display = "block";
            $timeout(function () {
                $scope.$apply(function () {
                    for (var i = 0; i < $scope.languages.length; i++) {
                        $scope.filters[$scope.languages[i]] = true
                    }
                })
            })
        });

        document.getElementById("search-button").addEventListener("click", function () {
            document.getElementById("loader").style.display = "block";
            $timeout(function () {
                $scope.$apply(function () {
                    $scope.search = document.getElementById('search').value;
                })
            })
        });

        $scope.$watch('filteredBugs', function () {
            document.getElementById("loader").style.display = "none";
            const path = $location.$$path;
            $location.path("/");
            $timeout(function () {
                $location.path(path);
            });
        })

        $scope.bugsFilter = function (bug, index, array) {
            if ($scope.search) {
                var matchSearch =
                    bug.commit_message.indexOf($scope.search) != -1 ||
                    bug.repo.indexOf($scope.search) != -1 ||
                    bug.bugId.indexOf($scope.search) != -1
                if (matchSearch === false) {
                    return false
                }
            }

            for (var key in $scope.filters) {
                if ($scope.filters[key] === false) {
                    if (bug.language === key) {
                        return false
                    }
                }
            }

            return true
        };
    });