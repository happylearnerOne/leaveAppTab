angular.module('ionNavBackButton', [])
.directive('ionNavBackButton', ['$ionicConfig', '$document', function($ionicConfig, $document) {
  return {
    restrict: 'E',
    require: '^ionNavBar',
    compile: function(tElement, tAttrs) {

      // clone the back button, but as a <div>
      var buttonEle = $document[0].createElement('button');
      for (var n in tAttrs.$attr) {
        buttonEle.setAttribute(tAttrs.$attr[n], tAttrs[n]);
      }

      if (!tAttrs.ngClick) {
        buttonEle.setAttribute('ng-click', '$ionicGoBack()');
      }

      buttonEle.className = 'button back-button hide buttons ' + (tElement.attr('class') || '');
      buttonEle.innerHTML = tElement.html() || '';

      var childNode;
      var hasIcon = hasIconClass(tElement[0]);
      var hasInnerText;
      var hasButtonText;
      var hasPreviousTitle;

      for (var x = 0; x < tElement[0].childNodes.length; x++) {
        childNode = tElement[0].childNodes[x];
        if (childNode.nodeType === 1) {
          if (hasIconClass(childNode)) {
            hasIcon = true;
          } else if (childNode.classList.contains('default-title')) {
            hasButtonText = true;
          } else if (childNode.classList.contains('previous-title')) {
            hasPreviousTitle = true;
          }
        } else if (!hasInnerText && childNode.nodeType === 3) {
          hasInnerText = !!childNode.nodeValue.trim();
        }
      }

      function hasIconClass(ele) {
        return /ion-|icon/.test(ele.className);
      }

      var defaultIcon = $ionicConfig.backButton.icon();
      if (!hasIcon && defaultIcon && defaultIcon !== 'none') {
        buttonEle.innerHTML = '<i class="icon ' + defaultIcon + '"></i> ' + buttonEle.innerHTML;
        buttonEle.className += ' button-clear';
      }

      if (!hasInnerText) {
        var buttonTextEle = $document[0].createElement('span');
        buttonTextEle.className = 'back-text';

        if (!hasButtonText && $ionicConfig.backButton.text()) {
          buttonTextEle.innerHTML += '<span class="default-title">' + $ionicConfig.backButton.text() + '</span>';
        }
        if (!hasPreviousTitle && $ionicConfig.backButton.previousTitleText()) {
          buttonTextEle.innerHTML += '<span class="previous-title"></span>';
        }
        buttonEle.appendChild(buttonTextEle);

      }

      tElement.attr('class', 'hide');
      tElement.empty();

      return {
        pre: function($scope, $element, $attr, navBarCtrl) {
          // only register the plain HTML, the navBarCtrl takes care of scope/compile/link
          navBarCtrl.navElement('backButton', buttonEle.outerHTML);
          buttonEle = null;
        }
      };
    }
  };
}]);