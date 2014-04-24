define(["require", "exports", 'durandal/app', 'services/unitofwork'], function (require, exports, app, unitofwork) {
    var AssessmentList = (function () {
        function AssessmentList() {
            //assessments
            this.assessments = ko.observableArray();
            var ref = unitofwork.get(1);
            this.unitOfWork = ref.value();
           }
        

        AssessmentList.prototype.attached = function () {
        };
        AssessmentList.prototype.compositionComplete = function () {
        };
        AssessmentList.prototype.activate = function (settings) {
            return this.loadAssessments().then(function () {
                alert("success");
            }).fail(function(error) { alert("faild"+error); });
        };

        AssessmentList.prototype.deactivate = function () {
        };

        AssessmentList.prototype.canDeactivate = function () {
            return true;
        };

        AssessmentList.prototype.loadAssessments = function () {
            var _this = this;
            this.assessments.removeAll();
            return this.unitOfWork.assessmentList.all()
                    .then(_this.assessments).fail(function(error) { throw error; });
        };


        return AssessmentList;
    })();
    exports.AssessmentList = AssessmentList;

    exports.al = new AssessmentList();

    exports.activate = function (settings) {
        return exports.al.activate(settings);
    };
    exports.deactivate = function () {
        return exports.al.deactivate();
    };
    exports.canDeactivate = function () {
        return exports.al.canDeactivate();
    };
    exports.attached = function () {
        return exports.al.attached();
    };
    exports.compositionComplete = function () {
        return exports.al.compositionComplete();
    };
});