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
        phoneNo: '',
        CustName: '',
        Employee_id: '',
        Access_code: '',
        access_granted: false,
        dataloaded: false,
        Test5Total: null,
        resetMessage: '',
        submitted: false,
        Customer_id: null,
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

        ym1: null,
        ym2: null,
        ym3: null,
        ym4: null,
        ym5: null,
        ym6: null,
        ym7: null,
        ym8: null,
        ym9: null,
        ym10: null,
        ym11: null,
        ym12: null,

        zm1: null,
        zm2: null,
        zm3: null,
        zm4: null,
        zm5: null,
        zm6: null,
        zm7: null,
        zm8: null,
        zm9: null,
        zm10: null,
        zm11: null,
        zm12: null,

        RepaytKonstant: 40000,

        CoverG: null,
        ABal: null,
        DownPC: null,
        // CScore: null,
        MinVal: null,
        TotVal: null,
        RemP: null,
        DownP: null,
        Score: null,
        Deci: null,
        Newdata: {
            fname: '',
            mname: '',
        },
        showGuaForm: false,
        computed: false,

    },

    mounted: function () {
        console.log('mounted');
    },

    computed: {

    },

    ready: function () { },
    methods: {
        GainAccess: function () {
            app.submitted = true;
            var emp = app.Employee_id;
            
            if (!isNaN(emp.charAt(4))){
                emp.slice(4);
                emp.slice(0,-3)
            }
            else if ((!isNaN(emp.charAt(5))))  {
                emp.slice(5);
                emp.slice(0,-3)
            }
            else {
                
            }
            console.log(emp);
            var dat = {
                Employee_id: emp,
                Access_code: app.Access_code
            }
            var formData = app.toFormData(dat);
            console.log()
            axios.post("https://altara-api.herokuapp.com/api.php?action=aknowledge", formData)
                .then(function (response) {
                    app.submitted = false;
                    console.log(response);
                    if (response.data.error) {
                        app.errorMessage = response.data.message;

                        setTimeout(function () {
                            app.errorMessage = '';
                        }, 2000);

                    } else {
                        if (response.data.data.length != 0) {

                            if (response.data.data[0].Employee_Role_id == 10 || response.data.data[0].Employee_Role_id == 5 || response.data.data[0].Employee_Role_id == 1) {
                                app.access_granted = true;
                                app.successMessage = "Access Granted!, Enter Customer ID below";

                                setTimeout(function () {
                                    app.successMessage = '';
                                }, 2000);
                            } else {
                                app.errorMessage = "Access Denied, Wrong Login Details";

                                setTimeout(function () {
                                    app.errorMessage = '';
                                }, 2000);
                            }
                        }

                        else {

                            app.errorMessage = "Access Denied, Wrong Login Details";

                            setTimeout(function () {
                                app.errorMessage = '';
                            }, 2000);
                        }

                    }
                });
        },


        ApproveCustomer: function (name, telnumber) {
            var approveData = {
                customer_id: app.Customer_id,
                m1a: app.m1a,
                m1b: app.m1b,
                m2a: app.m2a,
                m2b: app.m2b,
                m3a: app.m3a,
                m3b: app.m3b,
                m4a: app.m4a,
                m4b: app.m4b,
                m5a: app.m5a,
                m5b: app.m5b,
                m6a: app.m6a,
                m6b: app.m6b,
                Deci: app.Deci
            }
            var formData = app.toFormData(approveData);
            console.log(app.Customer_id)
            if (app.checKiD.length == 1) {

                axios.post("https://altara-api.herokuapp.com/api.php?action=approve",formData)
                    .then(function (response) {
                        console.log(response);

                        if (response.data.error) {
                            app.submitted = false;
                            app.errorMessage = response.data.message;

                            setTimeout(function () {
                                app.errorMessage = '';
                            }, 1000);

                        } else {
                            
                            app.successMessage = response.data.message;
                            app.computed = true;
                            app.submitted = false;
                            setTimeout(function () {
                                app.successMessage = '';
                            }, 1000);

                            if (app.Deci == 'Approve') {
                                // app.sendNotification(name, telnumber)
                            }

                        }
                    });
            } else {
                app.errorMessage = "Customer ID Doesnt Exist";
                setTimeout(function () {
                    app.errorMessage = '';
                }, 1000);

            }
        },

        toFormData: function (obj) {
            var form_data = new FormData();
            for (var key in obj) {
                form_data.append(key, obj[key]);
            }
            return form_data;
        },


        checkCust: function () {
            if (app.Customer_id == '' || app.Customer_id == null) {
                app.errorMessage = "Customer ID Field can't be empty";
                setTimeout(function () {
                    app.errorMessage = '';
                }, 1000);
            }
            else {
                app.submitted = true;
                axios.post("https://altara-api.herokuapp.com/api.php?action=checkId", {
                    Customer_id: app.Customer_id
                })
                    .then(function (response) {
                        app.submitted = false;
                        if (response.data.error) {
                            app.errorMessage = response.data.message;
                            setTimeout(function () {
                                app.errorMessage = '';
                            }, 1000);

                        } else {
                            app.checKiD = response.data.checklist;
                            if (app.checKiD.length != 0) {
                                app.CustName = response.data.checklist[0].first_name
                                app.phoneNo = response.data.checklist[0].telephone
                                app.Test1();
                                console.log(app.phoneNo);
                                app.ApproveCustomer(app.CustName, app.phoneNo);
                            } else {
                                app.errorMessage = "Customer ID doesnt exist!";
                                setTimeout(function () {
                                    app.errorMessage = '';
                                }, 1000);
                            }

                        }
                    });
            }
        },

        getMax() {
            console.log(this.m1a);
            var arr = [this.m1a, this.m1b, this.m2a, this.m2b, this.m3a, this.m3b, this.m4a, this.m4b, this.m5a, this.m5b, this.m6a, this.m6b];
            var max = arr.reduce(function (a, b) {
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
            app.Test2();
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

            this.km1 = this.sm1 == 0 ? (this.m1a > (app.Average * 12) ? 1 : 0) : 1;
            this.km2 = this.sm2 == 0 ? (this.m1b > (app.Average * 11) ? 1 : 0) : 1;
            this.km3 = this.sm3 == 0 ? (this.m2a > (app.Average * 10) ? 1 : 0) : 1;
            this.km4 = this.sm4 == 0 ? (this.m2b > (app.Average * 9) ? 1 : 0) : 1;
            this.km5 = this.sm5 == 0 ? (this.m3a > (app.Average * 8) ? 1 : 0) : 1;
            this.km6 = this.sm6 == 0 ? (this.m3b > (app.Average * 7) ? 1 : 0) : 1;
            this.km7 = this.sm7 == 0 ? (this.m4a > (app.Average * 6) ? 1 : 0) : 1;
            this.km8 = this.sm8 == 0 ? (this.m4b > (app.Average * 5) ? 1 : 0) : 1;
            this.km9 = this.sm9 == 0 ? (this.m5a > (app.Average * 4) ? 1 : 0) : 1;
            this.km10 = this.sm10 == 0 ? (this.m5b > (app.Average * 3) ? 1 : 0) : 1;
            this.km11 = this.sm11 == 0 ? (this.m6a > (app.Average * 2) ? 1 : 0) : 1;
            this.km12 = this.sm12 == 0 ? (this.m6b > (app.Average) ? 1 : 0) : 1;

            console.log(this.km1 + ' ' + this.km2 + ' ' + this.km3 + ' ' + this.km4 + ' ' + this.km5 + ' ' + this.km6 + ' ' + this.km7 + ' ' + this.km8 + ' ' + this.km9 + ' ' + this.km10 + ' ' + this.km11 + ' ' + this.km12);
            this.Test3Total = this.km1 + this.km2 + this.km3 + this.km4 + this.km5 + this.km6 + this.km7 + this.km8 + this.km9 + this.km10 + this.km11 + this.km12;
            console.log(this.Test3Total)
            this.RemPaymt();
            this.Test4()
        },

        Test4() {

            this.ym1 = (this.m1b - this.m1a) > (app.RemP / 12) ? 1 : 0;
            this.ym2 = (this.m2a - this.m1b) > (app.RemP / 12) ? 1 : 0;
            this.ym3 = (this.m2b - this.m2a) > (app.RemP / 12) ? 1 : 0;
            this.ym4 = (this.m3a - this.m2b) > (app.RemP / 12) ? 1 : 0;
            this.ym5 = (this.m3b - this.m3a) > (app.RemP / 12) ? 1 : 0;
            this.ym6 = (this.m4a - this.m3b) > (app.RemP / 12) ? 1 : 0;
            this.ym7 = (this.m4b - this.m4a) > (app.RemP / 12) ? 1 : 0;
            this.ym8 = (this.m5a - this.m4b) > (app.RemP / 12) ? 1 : 0;
            this.ym9 = (this.m5b - this.m5a) > (app.RemP / 12) ? 1 : 0;
            this.ym10 = (this.m6a - this.m5b) > (app.RemP / 12) ? 1 : 0;
            this.ym11 = (this.m6b - this.m6a) > (app.RemP / 12) ? 1 : 0;
            this.ym12 = (0 - this.m6b) > (app.RemP / 12) ? 1 : 0;

            console.log(this.ym1 + ' ' + this.ym2 + ' ' + this.ym3 + ' ' + this.ym4 + ' ' + this.ym5 + ' ' + this.ym6 + ' ' + this.ym7 + ' ' + this.ym8 + ' ' + this.ym9 + ' ' + this.ym10 + ' ' + this.ym11 + ' ' + this.ym12);

            this.Test5();
        },
        Test5() {
            this.zm1 = this.ym1 == 0 ? (this.m1a > ((app.RemP / 12) * 6) ? 1 : 0) : 1;
            this.zm2 = this.ym2 == 0 ? (this.m1b > ((app.RemP / 12) * 6) ? 1 : 0) : 1;
            this.zm3 = this.ym3 == 0 ? (this.m2a > ((app.RemP / 12) * 6) ? 1 : 0) : 1;
            this.zm4 = this.ym4 == 0 ? (this.m2b > ((app.RemP / 12) * 6) ? 1 : 0) : 1;
            this.zm5 = this.ym5 == 0 ? (this.m3a > ((app.RemP / 12) * 6) ? 1 : 0) : 1;
            this.zm6 = this.ym6 == 0 ? (this.m3b > ((app.RemP / 12) * 6) ? 1 : 0) : 1;
            this.zm7 = this.ym7 == 0 ? (this.m4a > ((app.RemP / 12) * 6) ? 1 : 0) : 1;
            this.zm8 = this.ym8 == 0 ? (this.m4b > ((app.RemP / 12) * 6) ? 1 : 0) : 1;
            this.zm9 = this.ym9 == 0 ? (this.m5a > ((app.RemP / 12) * 6) ? 1 : 0) : 1;
            this.zm10 = this.ym10 == 0 ? (this.m5b > ((app.RemP / 12) * 6) ? 1 : 0) : 1;
            this.zm11 = this.ym11 == 0 ? (this.m6a > ((app.RemP / 12) * 6) ? 1 : 0) : 1;
            this.zm12 = this.ym12 == 0 ? (this.m6b > ((app.RemP / 12) * 6) ? 1 : 0) : 1;

            console.log(this.zm1 + ' ' + this.zm2 + ' ' + this.zm3 + ' ' + this.zm4 + ' ' + this.zm5 + ' ' + this.zm6 + ' ' + this.zm7 + ' ' + this.zm8 + ' ' + this.zm9 + ' ' + this.zm10 + ' ' + this.zm11 + ' ' + this.zm12);
            app.Test5Total = this.zm1 + this.zm2 + this.zm3 + this.zm4 + this.zm5 + this.zm6 + this.zm7 + this.zm8 + this.zm9 + this.zm10 + this.zm11 + this.zm12;
            console.log(app.Test5Total);
            this.DownPaymt()
            this.Totalval()
            this.Coverage()
            this.Minvalue()
            // this.Creditscore()
            this.Avebalance()
            this.DownPaymtCheck()
            this.Decision();
        },

        RemPaymt() {
            app.RemP = app.Average * 12 > app.RepaytKonstant ? app.RepaytKonstant : app.Average * 12
            console.log(app.RemP)
        },

        DownPaymt() {
            app.DownP = app.RemP * (40 / 60)
            console.log(app.DownP)
        },

        Totalval() {
            app.TotVal = app.RemP + app.DownP;
            console.log(app.TotVal);
        },

        Coverage() {
            app.CoverG = app.Test5Total < 11 ? "No" : "Yes";
            console.log(app.Test5Total)
            console.log(this.Test5Total)
            console.log(this.CoverG)
            console.log(app.CoverG)
        },

        Minvalue() {
            app.MinVal = app.TotVal < 30000 ? "No" : "Yes";
            console.log(app.MinVal)
        },

        // Creditscore() {
        //     app.CScore = app.Score < 500 ? "No" : "Yes";
        //     console.log(app.CScore)
        // },

        Avebalance() {
            this.ABal = ((this.m1a + this.m1b + this.m2a + this.m2b + this.m3a + this.m3b + this.m4a + this.m4b + this.m5a + this.m5b + this.m6a + this.m6b) / 12) > 20000 ? "Yes" : "No";
            console.log(app.ABal)
        },

        DownPaymtCheck() {
            app.DownPC = app.m1a < app.DownP ? "No" : "Yes";
            console.log(app.DownPC)
        },

        Decision() {
            app.Deci = app.ABal === app.MinVal === app.CoverG ? "Approve" : "Layby";
            console.log(app.Deci)
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

                var countDecimals = function (value) {
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
