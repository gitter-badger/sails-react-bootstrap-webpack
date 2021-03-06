import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            email: localStorage.getItem('email') || '',
            password: '',
            rememberMe: false
        };

        this.goBack = this.goBack.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleRememberMe = this.handleRememberMe.bind(this);
    }

    goBack() {
        // const dest = this.props.location.state.from.pathname || '/admin';
        //
        // this.props.location.history.push(dest);
    }

    handleLogin(e) {
        e.preventDefault();

        localStorage.setItem('email', this.state.email);

        // TODO: actually hit API to login, then call this function
        this.props.userLogin({email: this.state.email});

        return false;
    }

    handleEmail(e) {
        this.setState({email: e.target.value});
    }

    handlePassword(e) {
        this.setState({password: e.target.value});
    }

    handleRememberMe(val) {
        this.setState({rememberMe: val});
    }

    render() {
        return (
            <div id="main-wrapper" className="container">
                <h2>Admin</h2>
                {
                    this.state.isLoggedIn &&
                    <div>You are logged in</div>
                }
                {
                    !this.state.isLoggedIn &&
                    <div className="row justify-content-center">
                        <form onSubmit={this.handleLogin} className="col-3">
                            <h3 className="row">Login</h3>
                            <div className="row pb-2">
                                <input type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleEmail} />
                            </div>
                            <div className="row pb-4">
                                <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handlePassword} />
                            </div>
                            <div className="row pb-4 form-check">
                                <input type="checkbox" className="form-check-input" id="rememberMe" value={this.state.rememberMe} onChange={() => this.handleRememberMe(!this.state.rememberMe)} />
                                <label htmlFor="rememberMe">Remember Me</label>
                            </div>
                            <div className="row">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                }
            </div>
        );
    }
}

Login.propTypes = {
    api: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    userLogin: PropTypes.func.isRequired
};

Login.defaultProps = {};

export default Login;
