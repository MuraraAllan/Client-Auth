import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

export default (ComposedComponent) => {
  class RequireAuthentication extends Component {
    componentWillMount() {
      console.log(this.props.authenticated);
      if (!this.props.authenticated) return ( <Redirect to="/signin"/> )
    }

    render() {
      if (!this.props.authenticated) return ( <Redirect to="/signin"/> )
        return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    return { 
      authenticated: state.auth.authenticated
    };
  };

  return connect(mapStateToProps)(RequireAuthentication);
};
