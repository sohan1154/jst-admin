import React from 'react';
import * as GlobalProvider from '../../providers/globals/globals';
import Header from '../../components/elements/Header';
import Pagenation from '../../components/elements/Pagenation';
import * as ApisService from "../../providers/apis/apis";
import { Roller } from "react-awesome-spinners";
import SideMenuData from '../../components/elements/SideMenuData';
import * as CustomValidators from '../../providers/shared/validator';
var moment = require('moment');

class UserEdit extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {}, // Contains form data
            errors: {}, // Contains field errors
            formSubmitted: false, // Indicates submit status of form
            loading: false, // Indicates in progress state of form
            currentUser: GlobalProvider.getUser(),
            minDate: moment().subtract(90, 'years').format('YYYY-MM-DD'),
            maxDate: moment().subtract(18, 'years').format('YYYY-MM-DD'),
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id;

        this.getAccountDetail(id);
    }

    getAccountDetail = (id) => {

        this.setState({
            loading: true,
            errors: {},
        });

        ApisService.getUserAccountDetail(id)
            .then(response => {

                if (response.status) {
                    this.setState({
                        loading: false,
                        formData: response.data,
                    });
                } else {
                    GlobalProvider.errorMessage(response.message);
                }

            }).catch(error => {
                GlobalProvider.errorMessage(error);
            });
    }

    handleChange = (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    validateForm = (e) => {

        let errors = {};
        const { formData } = this.state;

        if (CustomValidators.isEmpty(formData.name)) {
            errors.name = "Name can't be blank";
        }

        if (CustomValidators.isEmpty(formData.email)) {
            errors.email = "Email can't be blank";
        }
        else if (!CustomValidators.isEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }

        if (CustomValidators.isEmpty(formData.mobile)) {
            errors.mobile = "Mobile can't be blank";
        }
        else if (!CustomValidators.isPhoneNumber(formData.mobile)) {
            errors.mobile = "Please inter valid mobile number.";
        }

        if (CustomValidators.isEmpty(formData.dob)) {
            errors.dob = "DOB can't be blank";
        }

        if (CustomValidators.isEmpty(errors)) {
            return null;
        } else {
            return errors;
        }
    }

    update = (e) => {

        e.preventDefault();

        const { formData } = this.state;
        console.log('formData::::::', formData)

        this.setState({
            loading: true,
            formSubmitted: true,
            errors: {},
        });

        let errors = this.validateForm();
        console.log('errors::::::', errors)

        if (!errors) {

            ApisService.updateUserAccount(formData)
                .then(response => {

                    if (response.status) {
                        this.setState({
                            formSubmitted: false,
                            loading: false,
                        });
                        GlobalProvider.successMessage(response.message);
                        this.props.history.push('/users');
                    } else {
                        this.setState({
                            formSubmitted: false,
                            loading: false,
                        });
                        GlobalProvider.errorMessage(response.message);
                    }

                }).catch(error => {
                    this.setState({
                        formSubmitted: false,
                        loading: false,
                    });
                    GlobalProvider.errorMessage(error);
                });

        } else {
            this.setState({
                errors: errors,
                formSubmitted: false,
                loading: false,
            });
        }
    }

    render() {

        const { formData, loading, errors, minDate, maxDate } = this.state;

        return (
            <>
                <SideMenuData />

                <main className="admin-main">

                    <Header />

                    <section className="admin-content ">
                        <div className="bg-dark bg-dots m-b-30">
                            <div className="container">
                                <div className="row p-b-60 p-t-60">
                                    <div className="col-lg-8 mx-auto text-white p-b-30">
                                        <h3>User Form </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section className="pull-up">
                            <div className="container">
                                <div className="row ">
                                    <div className="col-lg-8 mx-auto  mt-2">
                                        <div className="card py-3 m-b-30">
                                            <div className="card-body">

                                                <form className="needs-validation" onSubmit={this.update}>

                                                    <h3 className="">Update Information</h3>

                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label for="inputEmail6">Name*</label>
                                                            <input type="text" className="form-control" name="name" defaultValue={formData.name} onKeyUp={this.handleChange} />
                                                            {errors.name && <span className="error">{errors.name}</span>}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label for="inputEmail4">Email*</label>
                                                            <input type="email" className="form-control" name="email" defaultValue={formData.email} onKeyUp={this.handleChange} />
                                                            {errors.email && <span className="error">{errors.email}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label for="inputPassword4">Mobile*</label>
                                                            <input type="phone" className="form-control" name="mobile" defaultValue={formData.mobile} onKeyUp={this.handleChange} />
                                                            {errors.mobile && <span className="error">{errors.mobile}</span>}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label for="inputGender4">Gender*</label>
                                                            <select className="form-control" name="gender" value={formData.gender} onChange={this.handleChange}>
                                                                <option value={'Male'}>Male</option>
                                                                <option value={'Female'}>Female</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label for="inputDOB4">DOB*</label>
                                                            <input type="date" className="form-control" name="dob" value={formData.dob} min={minDate} max={maxDate} onChange={this.handleChange} />
                                                            {errors.dob && <span className="error">{errors.dob}</span>}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label for="inputEmail4">Account Status</label>
                                                            <select className="form-control" name="status" value={formData.status} onChange={this.handleChange}>
                                                                <option value={1}>Active</option>
                                                                <option value={0}>In-Active</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <button type="submit" className="btn btn-primary btn-cta" disabled={loading}>{loading ? 'Waiting...' : 'Submit'}</button>
                                                    &nbsp;&nbsp;
                                                    <a href={"/users"} className="btn btn-dark btn-cta">Cancel</a>

                                                </form>

                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </section>
                    </section>
                </main>

            </>
        );

    }
}

export default UserEdit;