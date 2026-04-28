import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import actions from './actions';
import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import Checkbox from '../../components/Common/Checkbox';
import { signUp } from '../../actions/authentication';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      isSubscribed: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, firstName, lastName, password, isSubscribed } = this.state;
    this.props.signUp({ email, firstName, lastName, password, isSubscribed });
  }

  render() {
    const { email, firstName, lastName, password, isSubscribed } = this.state;

    return (
      <div className='signup-form'>
        <h2>Sign Up</h2>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <Row>
            <Col xs='12' md='6'>
              <Input
                type={'text'}
                label={'First Name'}
                name={'firstName'}
                value={firstName}
                onInputChange={(name, value) => {
                  this.setState({ [name]: value });
                }}
              />
            </Col>
            <Col xs='12' md='6'>
              <Input
                type={'text'}
                label={'Last Name'}
                name={'lastName'}
                value={lastName}
                onInputChange={(name, value) => {
                  this.setState({ [name]: value });
                }}
              />
            </Col>
            <Col xs='12' md='6'>
              <Input
                type={'text'}
                label={'Email Address'}
                name={'email'}
                value={email}
                onInputChange={(name, value) => {
                  this.setState({ [name]: value });
                }}
              />
            </Col>
            <Col xs='12' md='6'>
              <Input
                type={'password'}
                label={'Password'}
                name={'password'}
                value={password}
                onInputChange={(name, value) => {
                  this.setState({ [name]: value });
                }}
              />
            </Col>
            <Col xs='12' md='12'>
              <Checkbox
                id={'checkbox-1'}
                label={'Subscribe to newsletter'}
                name={'isSubscribed'}
                checked={isSubscribed}
                onCheckboxChange={(name, value) => {
                  this.setState({ [name]: value });
                }}
              />
            </Col>
          </Row>
          <hr />
          <div className='d-flex flex-column flex-md-row align-items-md-center justify-content-between'>
            <Button type='submit' text='Sign Up' />
            <Link className='mt-3 mt-md-0 text-center' to='/login'>
              Back to login
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { signUp })(Signup);
