import React from 'react';
import * as SiteSettings from '../../providers/settings/settings';
import * as Permissions from '../../providers/settings/permissions';
import * as GlobalProvider from '../../providers/globals/globals';

// handle the side-menu section
class SideMenuData extends React.Component {

    constructor(props) {
        super(props);

        let pathname = window.location.pathname;
        let activePath = '';

        SiteSettings.definedMenus.forEach((item) => {
            if (pathname.indexOf(item) !== -1) {
                activePath = item;
            }
        })

        console.log('activePath:', activePath)

        this.state = {
            activePath: activePath,
            currentUser: GlobalProvider.getUser(),
        }
    }

    render() {

        const { activePath, currentUser } = this.state;

        return (

            <aside className="admin-sidebar">
                <div className="admin-sidebar-brand">
                    {/* <!-- begin sidebar branding--> */}
                    <img className="admin-brand-logo" src="/assets/logos/logo.jpeg" width="80" alt={SiteSettings.appName} />
                    <span className="admin-brand-content font-secondary"><a href="/dashboard">{SiteSettings.appName}</a></span>
                    {/* <!-- end sidebar branding--> */}
                    <div className="ml-auto">
                        {/* <!-- sidebar pin--> */}
                        <a href="#" className="admin-pin-sidebar btn-ghost btn btn-rounded-circle"></a>
                        {/* <!-- sidebar close for mobile device--> */}
                        <a href="#" className="admin-close-sidebar"></a>
                    </div>
                </div>
                <div className="admin-sidebar-wrapper js-scrollbar">
                    <ul className="menu">

                        <li className={activePath == '/dashboard' ? 'menu-item active opened' : 'menu-item'}>
                            <a href="/dashboard" className=" menu-link">
                                <span className="menu-label">
                                    <span className="menu-name">Dashboard</span>
                                </span>
                                <span className="menu-icon">
                                    <i className="icon-placeholder mdi mdi-shape-outline "></i>
                                </span>
                            </a>
                        </li>

                        {currentUser.role == 'Admin' &&
                            <>
                                <li className={activePath == '/users' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="#" className="open-dropdown menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Users
                                            <span className="menu-arrow"></span>
                                            </span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-account"></i>
                                        </span>
                                    </a>

                                    <ul className="sub-menu" style={activePath == '/users' ? { display: 'block' } : { display: 'none' }}>
                                        <li className="menu-item">
                                            <a href="/users" className=" menu-link">
                                                <span className="menu-label">
                                                    <span className="menu-name">List</span>
                                                </span>
                                                <span className="menu-icon">
                                                    <i className="icon-placeholder mdi mdi-format-list-bulleted"></i>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="/users-add" className=" menu-link">
                                                <span className="menu-label">
                                                    <span className="menu-name">Add</span>
                                                </span>
                                                <span className="menu-icon">
                                                    <i className="icon-placeholder mdi mdi-format-annotation-plus"></i>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="/users-archive" className=" menu-link">
                                                <span className="menu-label">
                                                    <span className="menu-name">Archived</span>
                                                </span>
                                                <span className="menu-icon">
                                                    <i className="icon-placeholder mdi mdi-delete-sweep"></i>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li className={activePath == '/plans' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="#" className="open-dropdown menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Plans
                                            <span className="menu-arrow"></span>
                                            </span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-credit-card"></i>
                                        </span>
                                    </a>

                                    <ul className="sub-menu" style={activePath == '/plans' ? { display: 'block' } : { display: 'none' }}>
                                        <li className="menu-item">
                                            <a href="/plans" className=" menu-link">
                                                <span className="menu-label">
                                                    <span className="menu-name">List</span>
                                                </span>
                                                <span className="menu-icon">
                                                    <i className="icon-placeholder mdi mdi-format-list-bulleted"></i>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="/plans-add" className=" menu-link">
                                                <span className="menu-label">
                                                    <span className="menu-name">Add</span>
                                                </span>
                                                <span className="menu-icon">
                                                    <i className="icon-placeholder mdi mdi-format-annotation-plus"></i>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="/plans-archive" className=" menu-link">
                                                <span className="menu-label">
                                                    <span className="menu-name">Archived</span>
                                                </span>
                                                <span className="menu-icon">
                                                    <i className="icon-placeholder mdi mdi-delete-sweep"></i>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li className={activePath == '/pages' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="#" className="open-dropdown menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Pages
                                            <span className="menu-arrow"></span>
                                            </span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-file"></i>
                                        </span>
                                    </a>

                                    <ul className="sub-menu" style={activePath == '/pages' ? { display: 'block' } : { display: 'none' }}>
                                        <li className="menu-item">
                                            <a href="/pages" className=" menu-link">
                                                <span className="menu-label">
                                                    <span className="menu-name">List</span>
                                                </span>
                                                <span className="menu-icon">
                                                    <i className="icon-placeholder mdi mdi-format-list-bulleted"></i>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="/pages-add" className=" menu-link">
                                                <span className="menu-label">
                                                    <span className="menu-name">Add</span>
                                                </span>
                                                <span className="menu-icon">
                                                    <i className="icon-placeholder mdi mdi-format-annotation-plus"></i>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="/pages-archive" className=" menu-link">
                                                <span className="menu-label">
                                                    <span className="menu-name">Archived</span>
                                                </span>
                                                <span className="menu-icon">
                                                    <i className="icon-placeholder mdi mdi-delete-sweep"></i>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li className={activePath == '/contact-us' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="/contact-us" className=" menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Contact US</span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-email"></i>
                                        </span>
                                    </a>
                                </li>
                                
                            </>
                        }

                    </ul>
                </div>

            </aside>

        );
    }
}

export default SideMenuData;