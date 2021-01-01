import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from '../pages/login/Login';
import Signup from '../pages/signup/Signup';
import Contact from '../pages/contact/Contact';
import Dashboard from '../pages/dashboard/Dashboard';
import Home from '../pages/home/Home';

// settings 
import EditProfile from '../pages/settings/EditProfile';
import ChangePassword from '../pages/settings/ChangePassword';

// users 
import Users from '../pages/users/Users';
import UserAdd from '../pages/users/UserAdd';
import UserView from '../pages/users/UserView';
import UserEdit from '../pages/users/UserEdit';
import UserResetPassword from '../pages/users/UserResetPassword';
import UsersArchive from '../pages/users/UsersArchive';

// static-pages 
import Pages from '../pages/static-pages/Pages';
import PageAdd from '../pages/static-pages/PageAdd';
import PageView from '../pages/static-pages/PageView';
import PageEdit from '../pages/static-pages/PageEdit';
import PagesArchive from '../pages/static-pages/PagesArchive';

// contact-us
import ContactUs from '../pages/contact-us/ContactUs';
import ContactUsView from '../pages/contact-us/ContactUsView';

// plans 
import Plans from '../pages/plans/Plans';
import PlanAdd from '../pages/plans/PlanAdd';
import PlanView from '../pages/plans/PlanView';
import PlanEdit from '../pages/plans/PlanEdit';
import PlansArchive from '../pages/plans/PlansArchive';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// handle the all routes
class RoutesList extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <PublicRoute path="/signup" component={Signup} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/contact" component={Contact} />
          <PrivateRoute path="/dashboard" component={Dashboard} />

          {/* settings */}
          <PrivateRoute path="/edit-profile" component={EditProfile} />
          <PrivateRoute path="/change-password" component={ChangePassword} />

          {/* users */}
          <PrivateRoute path="/users" component={Users} />
          <PrivateRoute path="/users-view/:id" component={UserView} />
          <PrivateRoute path="/users-add" component={UserAdd} />
          <PrivateRoute path="/users-edit/:id" component={UserEdit} />
          <PrivateRoute path="/users-reset-password/:id" component={UserResetPassword} />
          <PrivateRoute path="/users-archive" component={UsersArchive} />
          
          {/* plans */}
          <PrivateRoute path="/plans" component={Plans} />
          <PrivateRoute path="/plans-view/:id" component={PlanView} />
          <PrivateRoute path="/plans-add" component={PlanAdd} />
          <PrivateRoute path="/plans-edit/:id" component={PlanEdit} />
          <PrivateRoute path="/plans-archive" component={PlansArchive} />
          
          {/* pages */}
          <PrivateRoute path="/pages" component={Pages} />
          <PrivateRoute path="/pages-view/:id" component={PageView} />
          <PrivateRoute path="/pages-add" component={PageAdd} />
          <PrivateRoute path="/pages-edit/:id" component={PageEdit} />
          <PrivateRoute path="/pages-archive" component={PagesArchive} />
          
          {/* contact-us */}
          <PrivateRoute path="/contact-us" component={ContactUs} />
          <PrivateRoute path="/contact-us-view/:id" component={ContactUsView} />
          
        </Switch>
      </BrowserRouter>
    )
  }
}

export default RoutesList;