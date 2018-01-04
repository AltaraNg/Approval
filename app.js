const masks = {
    currency: {
        mask(value) {
            return '₦' + value.toLocaleString()
        },
        unmask(value) {
            value = parseFloat(value.replace(/[^\d\.]/g, ""))
            return isNaN(value) ?
                0 :
                value
        },
    },
}
var app = new Vue({
    el: '#root',

    data: {
        Average: null,
        Max2: null,
        Max3: null,
        Max4: null,
        submitted: false,
        errorMessage: "",
        successMessage: "",
        m1a: null,
        m1b: null,
        m2a: null,
        m2b: null,
        m3a: null,
        m3b: null,
        m4a: null,
        m4b: null,
        m5a: null,
        m5b: null,
        m6a: null,
        m6b: null,

        tm1: null,
        tm2: null,
        tm3: null,
        tm4: null,
        tm5: null,
        tm6: null,
        tm7: null,
        tm8: null,
        tm9: null,
        tm10: null,
        tm11: null,
        tm12: null,

        sm1: null,
        sm2: null,
        sm3: null,
        sm4: null,
        sm5: null,
        sm6: null,
        sm7: null,
        sm8: null,
        sm9: null,
        sm10: null,
        sm11: null,
        sm12: null,

        km1: null,
        km2: null,
        km3: null,
        km4: null,
        km5: null,
        km6: null,
        km7: null,
        km8: null,
        km9: null,
        km10: null,
        km11: null,
        km12: null,

        Newdata: {
            fname: '',
            mname: '',
        },
        showGuaForm: false,

    },
    // data: {


    // },

    mounted: function() {
        console.log('mounted');
    },

    computed: {

    },

    ready: function() {},
    methods: {
        getMax() {
            console.log(this.m1a);
            var arr = [this.m1a, this.m1b, this.m2a, this.m2b, this.m3a, this.m3b, this.m4a, this.m4b, this.m5a, this.m5b, this.m6a, this.m6b];
            var max = arr.reduce(function(a, b) {
                app.Max = Math.max(a, b);
                console.log(app.Max);
            });
            // return 1;
        },
        Test1() {
            this.Average = ((this.m1b - this.m1a > 0 ? this.m1b - this.m1a : 0) + (this.m2a - this.m1b > 0 ? this.m2a - this.m1b : 0) + (this.m2b - this.m2a > 0 ? this.m2b - this.m2a : 0) + (this.m3a - this.m2b > 0 ? this.m3a - this.m2b : 0) + (this.m3b - this.m3a > 0 ? this.m3b - this.m3a : 0) + (this.m4a - this.m3b > 0 ? this.m4a - this.m3b : 0) + (this.m4b - this.m4a > 0 ? this.m4b - this.m4a : 0) + (this.m5a - this.m4b > 0 ? this.m5a - this.m4b : 0) +
                (this.m5b - this.m5a > 0 ? this.m5b - this.m5a : 0) + (this.m6a - this.m5b > 0 ? this.m6a - this.m5b : 0) + (this.m6b - this.m6a > 0 ? this.m6b - this.m6a : 0)) / 11
            console.log(this.Average);
            this.tm1 = this.Average > this.m1a ? 0 : 1;
            this.tm2 = this.Average > this.m1b ? 0 : 1;
            this.tm3 = this.Average > this.m2a ? 0 : 1;
            this.tm4 = this.Average > this.m2b ? 0 : 1;
            this.tm5 = this.Average > this.m3a ? 0 : 1;
            this.tm6 = this.Average > this.m3b ? 0 : 1;
            this.tm7 = this.Average > this.m4a ? 0 : 1;
            this.tm8 = this.Average > this.m4b ? 0 : 1;
            this.tm9 = this.Average > this.m5a ? 0 : 1;
            this.tm10 = this.Average > this.m5b ? 0 : 1;
            this.tm11 = this.Average > this.m6a ? 0 : 1;
            this.tm12 = this.Average > this.m6b ? 0 : 1;

            console.log(this.tm1 + ' ' + this.tm2 + ' ' + this.tm3 + ' ' + this.tm4 + ' ' + this.tm5 + ' ' + this.tm6 + ' ' + this.tm7 + ' ' + this.tm8 + ' ' + this.tm9 + ' ' + this.tm10 + ' ' + this.tm11 + ' ' + this.tm12);
            this.Test2();
        },


        Test2() {
            console.log(app.Average);

            this.sm1 = (this.m1b - this.m1a) > app.Average ? 1 : 0;
            this.sm2 = (this.m2a - this.m1b) > app.Average ? 1 : 0;
            this.sm3 = (this.m2b - this.m2a) > app.Average ? 1 : 0;
            this.sm4 = (this.m3a - this.m2b) > app.Average ? 1 : 0;
            this.sm5 = (this.m3b - this.m3a) > app.Average ? 1 : 0;
            this.sm6 = (this.m4a - this.m3b) > app.Average ? 1 : 0;
            this.sm7 = (this.m4b - this.m4a) > app.Average ? 1 : 0;
            this.sm8 = (this.m5a - this.m4b) > app.Average ? 1 : 0;
            this.sm9 = (this.m5b - this.m5a) > app.Average ? 1 : 0;
            this.sm10 = (this.m6a - this.m5b) > app.Average ? 1 : 0;
            this.sm11 = (this.m6b - this.m6a) > app.Average ? 1 : 0;
            this.sm12 = this.m6b > app.Average ? 1 : 0;

            console.log(this.sm1 + this.sm2 + this.sm3 + this.sm4 + this.sm5 + this.sm6 + this.sm7 + this.sm8 + this.sm9 + this.sm10 + this.sm11 + this.sm12);
            this.Test3();
        },


        Test3() {
            console.log(app.Average);

            this.km1 = this.sm1 == 0 ? (this.m1a > (app.Average * 12) ? 1 : 0) : 1;
            this.km2 = this.sm2 == 0 ? (this.m1b > (app.Average * 12) ? 1 : 0) : 1;
            this.km3 = this.sm3 == 0 ? (this.m2a > (app.Average * 12) ? 1 : 0) : 1;
            this.km4 = this.sm4 == 0 ? (this.m2b > (app.Average * 12) ? 1 : 0) : 1;
            this.km5 = this.sm5 == 0 ? (this.m3a > (app.Average * 12) ? 1 : 0) : 1;
            this.km6 = this.sm6 == 0 ? (this.m3b > (app.Average * 12) ? 1 : 0) : 1;
            this.km7 = this.sm7 == 0 ? (this.m4a > (app.Average * 12) ? 1 : 0) : 1;
            this.km8 = this.sm8 == 0 ? (this.m4b > (app.Average * 12) ? 1 : 0) : 1;
            this.km9 = this.sm9 == 0 ? (this.m5a > (app.Average * 12) ? 1 : 0) : 1;
            this.km10 = this.sm10 == 0 ? (this.m5b > (app.Average * 12) ? 1 : 0) : 1;
            this.km11 = this.sm11 == 0 ? (this.m6a > (app.Average * 12) ? 1 : 0) : 1;
            this.km12 = this.sm12 == 0 ? (this.m6b > (app.Average * 12) ? 1 : 0) : 1;

            console.log(this.km1 + this.km2 + this.km3 + this.km4 + this.km5 + this.km6 + this.km7 + this.km8 + this.km9 + this.km10 + this.km11 + this.km12);
        },


        stripTheGarbage(e) {
            if (e.keyCode < 48 && e.keyCode !== 46 || e.keyCode > 59) {
                e.preventDefault()
            }
        },
        formatNaira(price) {
            console.log(price)
            if (price != '') {
                var num = price;

                num = Number(num);

                var countDecimals = function(value) {
                    if (Math.floor(value) === value) return 0;
                    return value.toString().split(".")[1].length || 0;
                }

                var decimal = countDecimals(num);

                if (decimal < 2) {
                    num = num.toFixed(2)
                }

                if (decimal > 2) {
                    num = num.toFixed(decimal)
                }

                if (parseInt(num) < 1) {
                    num = "." + String(num).split(".")[1];
                }

                price = num;
                console.log(num);
            }
        },



    }
});