define(['exports', 'babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/core-js/promise', 'babel-runtime/core-js/object/assign', 'babel-runtime/core-js/get-iterator', 'i18next', 'babel-runtime/helpers/interop-require-default', './utils'], function (exports, _babelRuntimeHelpersCreateClass, _babelRuntimeHelpersClassCallCheck, _babelRuntimeCoreJsPromise, _babelRuntimeCoreJsObjectAssign, _babelRuntimeCoreJsGetIterator, _i18next, _babelRuntimeHelpersInteropRequireDefault, _utils) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _i18n = (0, _babelRuntimeHelpersInteropRequireDefault['default'])(_i18next);

  var I18N = (function () {
    function I18N(ea) {
      (0, _babelRuntimeHelpersClassCallCheck['default'])(this, I18N);
      this.globalVars = {};

      this.i18next = _i18n['default'];
      this.ea = ea;
      this.Intl = window.Intl;

      if (window.Intl === undefined) {
        System['import']('Intl').then(function (poly) {
          window.Intl = poly;
        });
      }
    }

    (0, _babelRuntimeHelpersCreateClass['default'])(I18N, [{
      key: 'setup',
      value: function setup(options) {
        var defaultOptions = {
          resGetPath: 'locale/__lng__/__ns__.json',
          lng: 'en',
          getAsync: false,
          sendMissing: false,
          attributes: ['t', 'i18n'],
          fallbackLng: 'en',
          debug: false
        };

        _i18n['default'].init(options || defaultOptions);

        if (_i18n['default'].options.attributes instanceof String) {
          _i18n['default'].options.attributes = [_i18n['default'].options.attributes];
        }
      }
    }, {
      key: 'setLocale',
      value: function setLocale(locale) {
        var _this = this;

        return new _babelRuntimeCoreJsPromise['default'](function (resolve) {
          var oldLocale = _this.getLocale();
          _this.i18next.setLng(locale, function (tr) {
            _this.ea.publish("i18n:locale:changed", { oldValue: oldLocale, newValue: locale });
            resolve(tr);
          });
        });
      }
    }, {
      key: 'getLocale',
      value: function getLocale() {
        return this.i18next.lng();
      }
    }, {
      key: 'nf',
      value: function nf(options, locales) {
        return new this.Intl.NumberFormat(locales || this.getLocale(), options);
      }
    }, {
      key: 'df',
      value: function df(options, locales) {
        return new this.Intl.DateTimeFormat(locales || this.getLocale(), options);
      }
    }, {
      key: 'tr',
      value: function tr(key, options) {
        var fullOptions = this.globalVars;

        if (options !== undefined) {
          fullOptions = (0, _babelRuntimeCoreJsObjectAssign['default'])((0, _babelRuntimeCoreJsObjectAssign['default'])({}, this.globalVars), options);
        }

        return this.i18next.t(key, (0, _utils.assignObjectToKeys)('', fullOptions));
      }
    }, {
      key: 'registerGlobalVariable',
      value: function registerGlobalVariable(key, value) {
        this.globalVars[key] = value;
      }
    }, {
      key: 'unregisterGlobalVariable',
      value: function unregisterGlobalVariable(key) {
        delete this.globalVars[key];
      }
    }, {
      key: 'updateTranslations',
      value: function updateTranslations(el) {

        var i, l;

        var selector = [].concat(this.i18next.options.attributes);
        for (i = 0, l = selector.length; i < l; i++) selector[i] = "[" + selector[i] + "]";
        selector = selector.join(",");

        var nodes = el.querySelectorAll(selector);
        for (i = 0, l = nodes.length; i < l; i++) {
          var node = nodes[i];
          var keys;

          for (var i2 = 0, l2 = this.i18next.options.attributes.length; i2 < l2; i2++) {
            keys = node.getAttribute(this.i18next.options.attributes[i2]);
            if (keys) break;
          }

          if (!keys) continue;

          keys = keys.split(";");
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _babelRuntimeCoreJsGetIterator['default'])(keys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var key = _step.value;

              var re = /\[([a-z]*)\]/g;

              var m;
              var attr = "text";

              if (node.nodeName == "IMG") attr = "src";

              while ((m = re.exec(key)) !== null) {
                if (m.index === re.lastIndex) {
                  re.lastIndex++;
                }
                if (m) {
                  key = key.replace(m[0], '');
                  attr = m[1];
                }
              }

              if (!node._textContent) node._textContent = node.textContent;
              if (!node._innerHTML) node._innerHTML = node.innerHTML;

              switch (attr) {
                case 'text':
                  node.textContent = this.tr(key);
                  break;
                case 'prepend':
                  node.innerHTML = this.tr(key) + node._innerHTML.trim();
                  break;
                case 'append':
                  node.innerHTML = node._innerHTML.trim() + this.tr(key);
                  break;
                case 'html':
                  node.innerHTML = this.tr(key);
                  break;
                default:
                  node.setAttribute(attr, this.tr(key));
                  break;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }
    }]);
    return I18N;
  })();

  exports.I18N = I18N;
});