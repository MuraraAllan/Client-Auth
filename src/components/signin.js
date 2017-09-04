import React, { Component } from 'react';
//import { reduxForm, Field } from 'redux-form';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { signIn } from '../actions';
import { connect } from 'react-redux';
import './css/signin.css'

const FormItem = Form.Item;

class SignIn extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    //this.props.signIn(email, password, this.props.history);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    );
  }
}
SignIn = Form.create()(SignIn);
const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    authenticated: state.auth.authenticated,
  };
};

SignIn = connect(mapStateToProps, { signIn })(SignIn);

export default SignIn
// class SignIn extends Component {
//   handleFormSubmit({email, password}) {
//     this.props.signIn(email, password, this.props.history);
//   }

//   renderAlert() {
//     if (!this.props.error) return null;
//     return (
//       <h3>{this.props.error}</h3>
//     );
//   }

//   render() {
//     const { handleSubmit } = this.props;

//     return (
//       <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
//         <fieldset>
//           <label>Email:</label>
//           <Field name="email" component="input" type="text" />
//         </fieldset>
//         <fieldset>
//           <label>Password:</label>
//           <Field name="password" component="input" type="password" />
//         </fieldset>
//         <button action="submit">Sign In</button>
//         {this.renderAlert()}
//       </form>
//     );
//   }
// }



