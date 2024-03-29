import React from 'react';
import * as GlobalProvider from '../../providers/globals/globals';
import Header from '../../components/elements/Header';
import Pagenation from '../../components/elements/Pagenation';
import * as ApisService from "../../providers/apis/apis";
import { Roller } from "react-awesome-spinners";
import SideMenuData from '../../components/elements/SideMenuData';
import * as CustomValidators from '../../providers/shared/validator';

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);

        let currentUser = GlobalProvider.getUser();

        this.state = {
            formData: {
                user_id: currentUser.id,
            }, // Contains form data
            errors: {}, // Contains field errors
            formSubmitted: false, // Indicates submit status of form
            loading: false, // Indicates in progress state of form
            currentUser: currentUser.id,
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

        if (CustomValidators.isEmpty(formData.old_password)) {
            errors.old_password = "Old Password can't be blank";
        }

        if (CustomValidators.isEmpty(formData.password)) {
            errors.password = "New Password can't be blank";
        }
        else if (CustomValidators.isContainWhiteSpace(formData.password)) {
            errors.password = "New Password should not contain white spaces";
        }
        else if (!CustomValidators.isLength(formData.password, { gte: 4, lte: 8, trim: true })) {
            errors.password = "New Password's length must between 4 to 8";
        }

        if (CustomValidators.isEmpty(formData.conf_password)) {
            errors.conf_password = "Confirm Password can't be blank";
        }
        else if (formData.password !== formData.conf_password) {
            errors.conf_password = "New Password and Confirm Password should be same";
        }

        if (CustomValidators.isEmpty(errors)) {
            return null;
        } else {
            return errors;
        }
    }

    resetPassword = (e) => {

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

            ApisService.changePassword(formData)
                .then(response => {

                    if (response.status) {
                        this.setState({
                            formSubmitted: false,
                            loading: false,
                        });
                        GlobalProvider.successMessage(response.message);
                        this.props.history.push('/dashboard');
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
                                        <h3>Change Password Form </h3>
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

                                                <form className="needs-validation" onSubmit={this.resetPassword}>

                                                    <h3 className="">Update Information</h3>

                                                    <div className="form-group">
                                                        <label for="inputPassword4">Old Password*</label>
                                                        <input type="password" className="form-control" name="old_password" onKeyUp={this.handleChange} />
                                                        {errors.old_password && <span className="error">{errors.old_password}</span>}
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="inputPassword4">New Password*</label>
                                                        <input type="password" className="form-control" name="password" onKeyUp={this.handleChange} />
                                                        {errors.password && <span className="error">{errors.password}</span>}
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="inputPassword4">Confirm Password*</label>
                                                        <input type="password" className="form-control" name="conf_password" onKeyUp={this.handleChange} />
                                                        {errors.conf_password && <span className="error">{errors.conf_password}</span>}
                                                    </div>

                                                    <button type="submit" className="btn btn-primary btn-cta" disabled={loading}>{loading ? 'Waiting...' : 'Submit'}</button>
                                                    &nbsp;&nbsp;
                                                    <a href={"/dashboard"} className="btn btn-dark btn-cta">Cancel</a>

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

export default ChangePassword;