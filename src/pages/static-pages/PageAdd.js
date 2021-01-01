import React from 'react';
import * as GlobalProvider from '../../providers/globals/globals';
import Header from '../../components/elements/Header';
import Pagenation from '../../components/elements/Pagenation';
import * as ApisService from "../../providers/apis/apis";
import { Roller } from "react-awesome-spinners";
import SideMenuData from '../../components/elements/SideMenuData';
import * as CustomValidators from '../../providers/shared/validator';
var moment = require('moment');

class PageAdd extends React.Component {

    constructor(props) {
        super(props);

        let currentUser = GlobalProvider.getUser();

        this.state = {
            formData: {
                category: 'Normal',
                title: '',
                page_key: '',
                description: '',
                meta_key: '',
                meta_description: '',
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

        if (CustomValidators.isEmpty(formData.title)) {
            errors.title = "Title can't be blank";
        }

        if (CustomValidators.isEmpty(formData.page_key)) {
            errors.page_key = "Page Key can't be blank";
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

            ApisService.createPage(formData)
                .then(response => {

                    if (response.status) {
                        this.setState({
                            formSubmitted: false,
                            loading: false,
                        });
                        GlobalProvider.successMessage(response.message);
                        this.props.history.push('/pages');
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
                                        <h3>Page Form </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section className="pull-up">
                            <div className="container">
                                <div className="row ">
                                    <div className="col-lg-12 mx-auto  mt-2">
                                        <div className="card py-3 m-b-30">
                                            <div className="card-body">

                                                <form className="needs-validation" onSubmit={this.create}>

                                                    <h3 className="">Add Information</h3>

                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label for="inputEmail4">Category</label>
                                                            <select className="form-control" name="category" value={formData.category} onChange={this.handleChange}>
                                                                <option value={'Normal'}>Normal</option>
                                                                <option value={'Featured'}>Featured</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label for="inputEmail6">Title*</label>
                                                            <input type="text" className="form-control" name="title" defaultValue={formData.title} onKeyUp={this.handleChange} />
                                                            {errors.title && <span className="error">{errors.title}</span>}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label for="inputEmail4">Page Key*</label>
                                                            <input type="page_key" className="form-control" name="page_key" defaultValue={formData.page_key} onKeyUp={this.handleChange} />
                                                            {errors.page_key && <span className="error">{errors.page_key}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <label for="inputDOB4">Description</label>
                                                            <textarea type="text" className="form-control" name="description" value={formData.description} onChange={this.handleChange} rows="50"></textarea>
                                                            {errors.description && <span className="error">{errors.description}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <label for="inputDOB4">Meta Key</label>
                                                            <textarea type="text" className="form-control" name="meta_key" value={formData.meta_key} onChange={this.handleChange} rows="2"></textarea>
                                                            {errors.meta_key && <span className="error">{errors.meta_key}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <label for="inputDOB4">Meta Description</label>
                                                            <textarea type="text" className="form-control" name="meta_description" value={formData.meta_description} onChange={this.handleChange} rows="5"></textarea>
                                                            {errors.meta_description && <span className="error">{errors.meta_description}</span>}
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
                                                    <a href={"/pages"} className="btn btn-dark btn-cta">Cancel</a>

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

export default PageAdd;