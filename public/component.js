var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var JSCalculator = function (_React$Component) {_inherits(JSCalculator, _React$Component);function JSCalculator() {var _ref;var _temp, _this, _ret;_classCallCheck(this, JSCalculator);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = JSCalculator.__proto__ || Object.getPrototypeOf(JSCalculator)).call.apply(_ref, [this].concat(args))), _this), _this.

    state = {
      input: '',
      booklist: [],
      loading: true,
      showComments: {} }, _this.



    handleChange = function (event) {
      _this.setState({ input: event.target.value });
    }, _this.

    submitBook = function (event) {
      event.preventDefault();
      event.target.reset();
      var title = _this.state.input;
      axios.post('https://personal-library-.glitch.me/api/books', { title: title }).
      then(function (res) {
        _this.setState({ booklist: [res.data].concat(_toConsumableArray(_this.state.booklist)) });
      }).
      catch(function (err) {return console.log(err);});
    }, _this.

    submitComment = function (event, id, i) {
      event.preventDefault();
      event.target.reset();
      var comment = _this.state.input;
      axios.post('https://personal-library-.glitch.me/api/books/' + id, { comment: comment }).
      then(function (res) {
        var change = _this.state.booklist;
        change.splice(i, 1, res.data);
        _this.setState({ booklist: change });
      }).
      catch(function (err) {return console.log(err);});
    }, _this.

    deleteItem = function (item) {
      axios.delete('https://personal-library-.glitch.me/api/books/' + item).
      then(function (res) {
        item !== '' ?
        _this.setState({ booklist: _this.state.booklist.filter(function (e) {return e._id !== item;}) }) :
        _this.setState({ booklist: [] });
      }).
      catch(function (err) {return console.log(err);});
      _this.state.booklist.length === 0 ? _this.setState({ loading: false }) : null;
    }, _temp), _possibleConstructorReturn(_this, _ret);}_createClass(JSCalculator, [{ key: 'showComments', value: function showComments(

    i) {
      var toggle = this.state.showComments;
      this.state.showComments[i] ? toggle[i] = !this.state.showComments[i] : toggle[i] = true;
      this.setState({ showComments: toggle });
    } }, { key: 'componentDidMount', value: function componentDidMount()

    {var _this2 = this;
      axios.get('https://personal-library-.glitch.me/api/books').
      then(function (res) {
        _this2.setState({ booklist: res.data.reverse() });
        _this2.state.booklist.map(function (e, i) {
          axios.get('https://personal-library-.glitch.me/api/books/' + e._id).
          then(function (res) {
            var change = _this2.state.booklist;
            change.splice(i, 1, res.data[0]);
            _this2.setState({ booklist: change, loading: false });
          }).
          catch(function (err) {return console.log(err);});
        });
      }).
      catch(function (err) {return console.log(err);});
      // this.state.booklist.length===0 ? this.setState({loading:true}) : null
    } }, { key: 'render', value: function render()

    {var _this3 = this;var
      booklist = this.state.booklist;
      return (
        React.createElement('div', { className: 'container' },
          React.createElement('h4', { className: 'text-center my-4 display-4' }, 'My Personal Library'),
          React.createElement('div', { className: 'containter bg-info rounded mb-3' },
            React.createElement('form', { onSubmit: this.submitBook, className: 'form-inline d-flex justify-content-center py-4' },
              React.createElement('label', { className: '', forHtml: 'addbook' },
                React.createElement('h5', null, 'Add a book:     ')),

              React.createElement('input', { id: 'addbook', type: 'text', name: 'title', onChange: this.handleChange, className: 'form-control mx-3', placeholder: 'Some title...' }),
              React.createElement('button', { type: 'submit', className: 'btn btn-primary' }, 'Sumbit')),

            React.createElement('div', null,
              React.createElement('div', { className: 'd-flex flex-wrap justify-content-center' },
                booklist.length > 0 ?
                booklist.map(function (e, i) {return React.createElement('li', { key: i, className: 'card m-2 w-25' },
                    React.createElement('div', { className: 'card-body text-center d-flex flex-column justify-content-between' },
                      React.createElement('div', null,
                        React.createElement('h5', { className: 'card-title' },
                          e.title),

                        React.createElement('ul', { className: 'list-group list-group-flush' },
                          e.comments ?
                          React.createElement('div', { onClick: function onClick() {return _this3.showComments(i);} },
                            e.comments.length === 0 ? "" : e.comments.length === 1 ? e.comments.length + " comment" : e.comments.length + " comments") :
                          null,
                          _this3.state.showComments[i] ?
                          e.comments.map(function (comment, j) {return React.createElement('li', { key: j, className: 'list-group-item' }, comment);}) : null),


                        React.createElement('form', { onSubmit: function onSubmit(event) {return _this3.submitComment(event, e._id, i);}, className: 'form-group d-flex flex-column align-items-center mt-3' },
                          React.createElement('label', { htmlFor: e._id, className: 'mb-0' }, 'Add a comment: '),
                          React.createElement('input', { type: 'text', id: e._id, onChange: _this3.handleChange, className: 'form-control my-2' }),
                          React.createElement('button', { type: 'submit', className: 'btn btn-success w-100' }, 'Send'))),


                      React.createElement('button', { onClick: function onClick() {return _this3.deleteItem(e._id);}, className: 'btn btn-secondary' }, 'Delete Book')));}) :




                this.state.loading ?
                React.createElement('div', { className: 'py-4' }, 'Fetching data...') :


                React.createElement('div', { className: 'py-4' }, 'Add a book first')),



              booklist.length > 0 ?
              React.createElement('div', { className: 'd-flex justify-content-center py-4' },
                React.createElement('button', { onClick: function onClick() {return _this3.deleteItem('');}, className: 'btn btn-warning' }, 'Delete all books')) :



              null))));




    } }]);return JSCalculator;}(React.Component);



ReactDOM.render(React.createElement(JSCalculator, null), document.getElementById('app'));