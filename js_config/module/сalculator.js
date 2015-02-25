define(function () {
    "use strict";

    function Calculator(name) {
        if (!(this instanceof Calculator)) {
            throw new TypeError("Calculator constructor cannot be called as a function.");
        }
        this.init();
    }

    Calculator.options = {
        buffer: '',
        operator: '',
        result: '0',
        operators: ['+','-','*','/'],
        lastOperator: null,
    };

    Calculator.prototype = {

        constructor: Calculator,

        init: function() {
            this.options = Calculator.options;
            this.initEvents();
        },

        initEvents: function() {
            var $fn = this;

            // Digits
            $('.js-digit').click(function(e) {
                e.preventDefault();
                var key = $(this).text();

                if ($fn.options.lastOperator==='=') {
                    $fn.reset();
                }

                if ((key==='.') && $fn.options.result.length && $fn.options.result.indexOf(".")>0){
                    return;
                }

                if ($fn.options.buffer.length && $fn.isOperator($fn.options.buffer.slice(-1))) {
                    $fn.options.result = '';
                }

                $fn.options.buffer+=key;
                $fn.options.result+=key;

                $fn.showResult();
            });

            // + - * /
            $('.js-operator').click(function(e) {
                var operator = $(this).text();

                switch(operator) {
                    case '÷': operator = '/'; break;
                    case '×': operator = '*'; break;
                }

                $fn.clearLastOperator();

                if ($fn.options.operator) {
                    $fn.options.result = eval($fn.options.buffer);
                    $fn.options.buffer = $fn.options.result;
                    $fn.showResult();
                }

                $fn.options.buffer += operator;

                $fn.options.operator = operator;
                $fn.options.lastOperator = operator;
            });

            // =
            $('.js-enter').click(function(e) {
                $fn.clearLastOperator();
                $fn.options.result = eval($fn.options.buffer);
                $fn.options.lastOperator = '=';
                $fn.showResult();
            });

            //Reset
            $('.js-clear').click(function(e) {
                $fn.reset();
            });
        },

        isOperator: function(operator) {
            var result = false;
            $.each(this.options.operators,function(index,value){
                if (value===operator) {
                    result = true;
                    return false;
                }
            });
            return result;
        },

        showResult: function() {
            while (this.options.result.length && (this.options.result.slice(0,1)==='0')) {
                this.options.result = this.options.result.slice(1);
            }
            if (!this.options.result || (this.options.result.length && (this.options.result.slice(0,1)==='.'))) {
                this.options.result = 0+this.options.result;
            }
            //console.log(this.options.buffer);
            //The maximum number of decimals is 17, but floating point arithmetic is not always 100% accurate
            //var x = 0.2 + 0.1;  // x will be 0.30000000000000004
            //Make maximum decimals 12 for 100% accurate
            $('.js-result').text(parseFloat(parseFloat(this.options.result).toPrecision(12)));
        },

        clearLastOperator: function() {
            if (this.options.buffer.length && this.isOperator(this.options.buffer.slice(-1))) {
                this.options.buffer=this.options.buffer.slice(0,-1);
                this.options.operator='';
            }
        },

        reset: function() {
            this.options.buffer = '';
            this.options.operator = '';
            this.options.result = 0;
            this.options.lastOperator = null;
            this.showResult();
        }
    };

    return Calculator;
});