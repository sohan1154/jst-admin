import React from 'react';
import * as GlobalProvider from '../../providers/globals/globals';
import Header from '../../components/elements/Header';
import Pagenation from '../../components/elements/Pagenation';
import * as ApisService from "../../providers/apis/apis";
import { Roller } from "react-awesome-spinners";
import SideMenuData from '../../components/elements/SideMenuData';
import * as CustomValidators from '../../providers/shared/validator';
var moment = require('moment');

class PlanAdd extends React.Component {

    constructor(props) {
        super(props);

        let currentUser = GlobalProvider.getUser();

        this.state = {
            formData: {
                name: '',
                amount: null,
                validity: 30,
                allowed_members: null,
                description: '',
                status: 1,
            }, // Contains form data
            errors: {}, // Contains field errors
            formSubmitted: false, // Indicates submit status of form
            loading: false, // Indicates in progress state of form
            currentUser: currentUser,
        }
    }

    componentDidMount() {

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

        if (CustomValidators.isEmpty(formData.amount)) {
            errors.amount = "Amount can't be blank";
        }
        else if (!CustomValidators.numberOnly(formData.amount)) {
            errors.amount = "Please inter valid amount.";
        }

        if (CustomValidators.isEmpty(formData.allowed_members)) {
            errors.allowed_members = "Allowed Members can't be blank";
        }
        else if (!CustomValidators.numberOnly(formData.allowed_members)) {
            errors.allowed_members = "Please inter valid Allowed Members.";
        }

        if (CustomValidators.isEmpty(formData.description)) {
            errors.description = "Description can't be blank";
        }

        if (CustomValidators.isEmpty(errors)) {
            return null;
        } else {
            return errors;
        }
    }

    create = (e) => {

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

            ApisService.createPlan(formData)
                .then(response => {

                    if (response.status) {
                        this.setState({
                            formSubmitted: false,
                            loading: false,
                        });
                        GlobalProvider.successMessage(response.message);
                        this.props.history.push('/plans');
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

        const { formData, loading, errors } = this.state;

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
                                        <h3>Plan Form </h3>
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

                                                <form className="needs-validation" onSubmit={this.create}>

                                                    <h3 className="">Add Information</h3>

                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label for="inputEmail6">Name*</label>
                                                            <input type="text" className="form-control" name="name" defaultValue={formData.name} onKeyUp={this.handleChange} />
                                                            {errors.name && <span className="error">{errors.name}</span>}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label for="inputEmail4">Amount* (INR only)</label>
                                                            <input type="text" className="form-control" name="amount" defaultValue={formData.amount} onKeyUp={this.handleChange} />
                                                            {errors.amount && <span className="error">{errors.amount}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label for="inputGender4">Validity*</label>
                                                            <select className="form-control" name="validity" value={formData.validity} onChange={this.handleChange}>
                                                                <option value={30}>1 Month (30 Days)</option>
                                                                <option value={60}>2 Months (60 Days)</option>
                                                                <option value={90}>3 Months (90 Days)</option>
                                                                <option value={180}>6 Months (180 Days)</option>
                                                                <option value={365}>1 Year (365 Days)</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label for="inputEmail4">Allowed Members*</label>
                                                            <input type="text" className="form-control" name="allowed_members" defaultValue={formData.allowed_members} onKeyUp={this.handleChange} />
                                                            {errors.allowed_members && <span className="error">{errors.allowed_members}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <label for="inputEmail4">Description*</label>
                                                            <textarea className="form-control" name="description" value={formData.description} onChange={this.handleChange} rows='10'></textarea>
                                                            {errors.description && <span className="error">{errors.description}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label for="inputEmail4">Status</label>
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

export default PlanAdd;