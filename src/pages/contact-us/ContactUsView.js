import React from 'react';
import * as GlobalProvider from '../../providers/globals/globals';
import Header from '../../components/elements/Header';
import Pagenation from '../../components/elements/Pagenation';
import * as ApisService from "../../providers/apis/apis";
import { Roller } from "react-awesome-spinners";
import SideMenuData from '../../components/elements/SideMenuData';

class PageView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            detail: {},
            errors: {},
            loading: false,
            currentUser: GlobalProvider.getUser(),
        }
    }

    componentDidMount() {

        let id = this.props.match.params.id;

        this.getDetail(id);
    }

    getDetail = (id) => {

        this.setState({
            loading: true,
            errors: {},
        });

        ApisService.getContactUsDetail(id)
            .then(response => {

                if (response.status) {
                    this.setState({
                        loading: false,
                        detail: response.data,
                    });
                } else {
                    GlobalProvider.errorMessage(response.message);
                }

            }).catch(error => {
                GlobalProvider.errorMessage(error);
            });
    }

    render() {

        const { detail, loading } = this.state;
        let count = 1;

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
                                        <h3>Contact US</h3>
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
                                        
                                                <form>
                                                    <h3 className="">Information</h3>
                                                    
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label>User Name</label>
                                                            <input type="text" value={detail.user_name} className="form-control" readOnly />
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <label>Subject</label>
                                                            <input type="text" value={detail.subject} className="form-control" readOnly />
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <label>Message</label>
                                                            <textarea value={detail.message} className="form-control" rows='15' readOnly></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label>Created At</label>
                                                            <input type="text" value={detail.created_at} className="form-control" readOnly />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label>Updated At</label>
                                                            <input type="text" value={detail.updated_at} className="form-control" readOnly />
                                                        </div>
                                                    </div>
                                                    
                                                    &nbsp;&nbsp;
                                                    <a href={"/contact-us"} className="btn btn-dark btn-cta">Back</a>

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

export default PageView;