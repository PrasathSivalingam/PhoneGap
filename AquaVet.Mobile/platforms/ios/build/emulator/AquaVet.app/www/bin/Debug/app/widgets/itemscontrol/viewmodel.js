/// <reference path="../../_typings.ts" />
define(["require", "exports"], function (require, exports) {
    var ItemsControl = (function () {
        function ItemsControl() {
        }
        ItemsControl.prototype.activate = function (settings) {
            this.headerProperty = settings.headerProperty;
            this.items = settings.items;
        };

        ItemsControl.prototype.getHeaderText = function (item) {
            if (this.headerProperty) {
                return item[this.headerProperty];
            }

            return item.toString();
        };
        ItemsControl.prototype.attached = function () {
        };
        return ItemsControl;
    })();
    exports.ItemsControl = ItemsControl;

    exports.ic = new ItemsControl();

    exports.activate = function (settings) {
        return exports.ic.activate(settings);
    };
    exports.attached = function () {
        exports.ic.attached();
    };
});
//# sourceMappingURL=viewmodel.js.map
