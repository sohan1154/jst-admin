import React from 'react';
import * as GlobalProvider from '../../providers/globals/globals';
import Header from '../../components/elements/Header';
import Pagenation from '../../components/elements/Pagenation';
import RecordNotFound from '../../components/elements/RecordNotFound';
import * as ApisService from "../../providers/apis/apis";
import { Roller } from "react-awesome-spinners";
import SideMenuData from '../../components/elements/SideMenuData';

class Pages extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            entries: [],
            errors: {},
            loading: false,
            currentUser: GlobalProvider.getUser(),
        }
    }

    componentDidMount() {

        this.getData();
    }

    getData = (role) => {

        this.setState({
            loading: true,
            errors: {},
        });

        ApisService.getPages(role)
            .then(response => {

                if (response.status) {
                    this.setState({
                        loading: false,
                        entries: response.data,
                    });
                } else {
                    this.setState({
                        loading: false,
                    });
                    GlobalProvider.errorMessage(response.message);
                }

                GlobalProvider.loadDataTable();

            }).catch(error => {
                this.setState({
                    loading: false,
                });
                GlobalProvider.errorMessage(error);
            });
    }

    changeStatus = (id, status) => {

        let _this = this;

        // document.body.classList.add('display-loader');

        GlobalProvider.confirmBox("Are you Sure? You want to change status of this page.", (isTrue) => {
            if (isTrue) {
                ApisService.changePageStatus(id, status)
                    .then(response => {

                        if (response.status) {

                            // update item status and set updated value into state
                            const { entries } = _this.state;

                            let entriesNew = entries.filter((item) => {
                                if (item.id == id) {
                                    item.status = status;
                                }

                                return item;
                            });

                            _this.setState({
                                entries: entriesNew,
                            });

                            GlobalProvider.successMessage(response.message);

                        } else {
                            GlobalProvider.errorMessage(response.message);
                        }

                    }).catch(error => {
                        GlobalProvider.errorMessage(error.message);
                    });
            }
        });
    }

    deletePage = (id, index) => {

        let _this = this;

        GlobalProvider.confirmBox("Are you Sure? You want to delete this page.", (isTrue) => {
            if (isTrue) {
                ApisService.deletePage(id)
                    .then(response => {

                        if (response.status) {

                            // remove item from array 
                            const { entries } = _this.state;

                            let entriesNew = entries.filter((item) => {
                                if (item.id != id) {
                                    return item;
                                }
                            });

                            _this.setState({
                                entries: entriesNew,
                            });

                            GlobalProvider.successMessage(response.message);

                        } else {
                            GlobalProvider.errorMessage(response.message);
                        }

                    }).catch(error => {
                        GlobalProvider.errorMessage(error.message);
                    });
            }
        })
    }

    render() {

        const { entries, loading } = this.state;
        let count = 1;

        return (
            <>
                <SideMenuData />

                <main className="admin-main">

                    <Header />

                    <section className="admin-content">
                        <div className="bg-dark">
                            <div className="container  m-b-30">
                                <div className="row">
                                    <div className="col-12 text-white p-t-40 p-b-90">
                                        <h4 className="">Pages</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {loading && <div className="center"><Roller /></div>}

                        {entries.length == 0 && <RecordNotFound />}

                        {entries.length > 0 &&

                            <div className="container  pull-up">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">

                                            <div className="card-body">
                                                <div className="table-responsive p-t-10">
                                                    <table id="example-height" className="table   " style={{ width: "100%" }}>
                                                        <thead>
                                                            <tr>
                                                                <th>Title</th>
                                                                <th>Category</th>
                                                                <th>Page Key</th>
                                                                <th>Status</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {entries.map((item, index) =>
                                                                <tr key={item.id} id={'RecordID_' + item.id}>
                                                                    <td>{item.title}</td>
                                                                    <td>{item.category}</td>
                                                                    <td>{item.page_key}</td>
                                                                    <td className="text-align-center">
                                                                        <span className="changeStatus" onClick={() => this.changeStatus(item.id, !item.status)}>
                                                                            {item.status ? (
                                                                                <button type="button" className="btn btn-sm m-b-15 ml-2 mr-2 btn-rounded-circle btn-success" title="Disable"><i className="mdi mdi-check"></i></button>
                                                                            ) : (
                                                                                    <button type="button" className="btn btn-sm m-b-15 ml-2 mr-2 btn-rounded-circle btn-warning" title="Enable"><i className="mdi mdi-close"></i></button>
                                                                                )}
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <a href={"/pages-view/" + item.id} className="btn btn-sm m-b-15 ml-2 mr-2 btn-rounded-circle btn-info" title="Detail"><i className="mdi mdi-eye"></i></a>
                                                                        <a href={"/pages-edit/" + item.id} className="btn btn-sm m-b-15 ml-2 mr-2 btn-rounded-circle btn-warning" title="Edit"><i className="mdi mdi-square-edit-outline"></i></a>
                                                                        <button className="btn btn-sm m-b-15 ml-2 mr-2 btn-rounded-circle btn-danger" title="Delete" onClick={() => this.deletePage(item.id, index)}><i className="mdi mdi-delete"></i></button>
                                                                    </td>
                                                                </tr>
                                                            )}

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </section>

                </main>

            </>
        );

    }
}

export default Pages;