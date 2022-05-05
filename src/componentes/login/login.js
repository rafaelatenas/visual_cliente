import React from 'react';
import './login.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { TextField, FormControl, InputLabel, OutlinedInput} from '@mui/material';
import { Visibility, VisibilityOff} from '@material-ui/icons';
import { IconButton, Button} from '@mui/material';

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      Email: '',
      Password: '',
      formErrors: {Email: '', Password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    
    switch(fieldName) {
      case 'Email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.Email = emailValid ? '' : ' es invalido';
        break;
      case 'Password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.Password = passwordValid ? '': ' es demasiado corto';
        break;
      default:
        break;
    }
    this.setState(
      {formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid
      }, 
      this.validateForm);
    }
    errorClass(error) {
      return(error.length === 0 ? '' : 'has-error');
    }
    validateForm() {
      this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }
    handleUserInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value},() => { this.validateField(name, value) });
    } 

    handleClickShowPassword = () => {
      this.setState({showPassword: !this.state.showPassword}) 
    };
            
    handleMouseDownPassword = () => {
      this.setState({showPassword: this.state.showPassword})
    };
       
    enviarDatos=(e)=>{ 
      const MySwal = withReactContent(Swal)
      const toast = MySwal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 10000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
      e.preventDefault();
      const {Email,Password}=this.state;
      var datosEnviar={email:Email,password:Password} 
               
      axios.post(process.env.REACT_APP_API_ENDPOINT+"login",datosEnviar).then(result => {
        var nombre=result.data.NombresUsuarios;
        var apellidos=result.data.ApellidosUsuarios;  
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('Login', result.data.Login);
        localStorage.setItem('nombres', result.data.NombresUsuarios);
        localStorage.setItem('apellidos', result.data.ApellidosUsuarios);
      toast.fire({
          icon: 'success',
          title: ''+result.data.message+' '+nombre+' '+apellidos+'',
          confirmButtonText: `Ok`,
      })    
      var cliente = result.data.Cliente;
        if (cliente === 'ATENAS') {
          window.location.href = 'management/panel'
        } else {
          console.log('no')
        }  
      }).catch(err => {
          console.log(err)
          if(err.response) {
            console.log(err.response.data.message);
            console.log(err.response.status);
            console.log(err.response.headers);        
          }       
          toast.fire({
            icon:'error',
            title:''+err.response.data.message+'',
            confirmButtonText: `Ok`,
          })    
        })
    }

	render() {
    return (
      <section className='contenedorActivacion'>
        <div className='activarUs'>
          <FormControl>
            <TextField style={{top:'15%',overflow:'visible', borderRadius:'2em', background:'#fff'}} id="input-textfield1" label="Correo" type='text' name='Email' value={this.state.Email} onChange={this.handleUserInput}/>
            <FormControl style={{height:'auto',overflow:'visible',width: '100%',top:'35%'}}>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput id="outlined-adornment-password" type={this.state.showPassword ? 'text' : 'password'} name='Password' value={this.state.Password} onChange={this.handleUserInput}
                endAdornment={
                  <IconButton aria-label="toggle password visibility" onClick={this.handleClickShowPassword} onMouseDown={this.handleMouseDownPassword} edge="end">
                    {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                  </IconButton>
                }
              />
            </FormControl>
            <Button variant="outlined" disabled={!this.state.formValid} onClick={this.enviarDatos}>Confirmar</Button>
          </FormControl>
        </div>
      </section>
    )
  };
}
export default Login;
