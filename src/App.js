import React, {
  Component,
} from 'react';

import { connect } from 'react-redux';

import {
  updateUserInfo,
  save,
  usrSelected
} from './redux';

let oCountrys;
let userListRowTableNodes;


export class App extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
            name: this.props.data.informacionUsuario.Name,
            surname: this.props.data.informacionUsuario.Surname,
            country: this.props.data.informacionUsuario.CountryId,
            birthDay: this.props.data.informacionUsuario.BirthDay,
			countryList: this.props.data.countryList,
			userList: this.props.data.userList,
			previousUser: this.props.data.previousUser
        }
	}

	componentDidMount() {
	  
	  fetch('https://restcountries.eu/rest/v2/all')
	  .then((resp) => resp.json())
	  .then((data) =>{
		  
		  let countrys = [];
		  
		  for(var i = 0; i < data.length ; i++){
			  countrys.push(data[i].name);		  
		  }
		  
		  this.setState({countryList: countrys});
	  })
	  
	}
	
	componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.data.informacionUsuario.name,
            surname: nextProps.data.informacionUsuario.surname,
            country: nextProps.data.informacionUsuario.country,
            birthDay: nextProps.data.informacionUsuario.birthDay,
			userList: nextProps.data.userList,
			previousUser: nextProps.data.previousUser
        });
    }

	onHandleChange(event) {
        let value = event.target.value;
        let prop = event.target.name;

        this.props.updateUserInfo({value: value , prop: prop});
        this.setState({ [prop]: value });
    }
	
	save(){
		
		if(this.state.name && this.state.surname && this.state.country && this.state.birthDay)
			this.props.save(this.state);
		else
			alert('Please complete all fields.');
	}
	
	getMonthName(monthNumber){
		
		switch(monthNumber){
			
			case 1:
			
				return 'January';
				
			case 2:
			
				return 'February';
				
			case 3:
			
				return 'March';
				
			case 4:
			
				return 'April';
				
			case 5:
			
				return 'May';
				
			case 6:
			
				return 'June';
				
			case 7:
			
				return 'July';
				
			case 8:
			
				return 'August';
				
			case 9:
			
				return 'September';
				
			case 10:
			
				return 'October';
				
			case 11:
			
				return 'November';
				
			case 12:
			
				return 'December';
		}
		
	}
	
	getYears(birthDay){
		
	  let today = new Date();
	  birthDay = new Date(birthDay);
	  
	  var ageDifMs = Date.now() - birthDay.getTime();
	  var ageDate = new Date(ageDifMs); 
	  return Math.abs(ageDate.getUTCFullYear() - 1970);
	  
	}
	
  render() {
	  
	oCountrys = this.state.countryList.map(function (country, index) {
					return <option key={"country-" + index} value={country}>{country}</option>
	});
	  
	userListRowTableNodes = this.state.userList.map((usr) => {
					return (<tr onClick={() => this.props.usrSelected(usr)}>
								<td>{usr.name} {usr.surname}</td>
								<td>{usr.country}</td>
								<td>{usr.birthDay}</td>
							</tr>)
	});
	  
	let today = new Date();  
	  
    return (
	
		<div className="container">
		
			<div className = "row text-center">
				<div className="col-md-12">
					<h4>Intive - FDV Exercise </h4>
				</div>
			</div>
		
			<div className="row">
			
				<div className="col-md-6">

					<div className="col-md-12">
						<div className="form-group">
							<label className="control-label">Name</label>
							<input className="form-control" value={this.state.name} name="name"
							onChange={(event) => this.onHandleChange(event)}/>
						</div>
					</div>

					<div className="col-md-12">
						<div className="form-group">
							<label className="control-label">Surname</label>
							<input className="form-control" value={this.state.surname} name="surname"
							onChange={(event) => this.onHandleChange(event)}/>
						</div>
					</div>
				
					<div className=" col-md-12">
						<label className="label-primary">Country</label>
						<select className="form-control default-input"
							value={this.state.country} name="country"
							onChange={(event) => this.onHandleChange(event)}>
							
							<option value="0">Select</option>
							{oCountrys}
						</select>
					</div>
				
					<div className="col-md-12">
						<div className="form-group">
							<label className="control-label">Birthday</label>
							<input className="form-control" type="date" value={this.state.birthDay} name="birthDay"
							onChange={(event) => this.onHandleChange(event)}/>
						</div>
					</div>
				
					<div className="col-md-12">
						<div className="btn-group">
							<button className="btn btn-cta" onClick={() => this.save()}>Save</button>
						</div>
					</div>

				</div>

				{(this.state.userList.length > 0) &&
					(<div className="col-md-6">

						<table className="table table-bordered table-striped table-hover">
							<thead>
								<tr>
									<th>Name</th>
									<th>Country</th>
									<th>BirthDay</th>
								</tr>
							</thead>
							<tbody>
								{userListRowTableNodes}
							</tbody>
						</table>

					</div>)
				}
				
			</div>
			
			{(this.state.previousUser.name) &&
			
				(<div className="row">
					<div className="col-md-8">
						<div className="col-md-12">
							<label className="control-label">
							<br/>
								<p>Hello {this.state.previousUser.name} {this.state.previousUser.surname} from {this.state.previousUser.country} on 	   {today.getDate()} of {this.getMonthName(today.getMonth() + 1)} you will have {this.getYears(this.state.previousUser.birthDay)} years.</p>
							</label>
						</div>
						
					</div>
				</div>)
		
			}
			
			<div className="row">
				<div className="col-md-12">
					<div className="col-md-12">
						<p className="text-right">Mariano Marchetta</p>
					</div>
					
				</div>
			</div>
			
		</div>
	
    );
  }

}

// AppContainer.js
const mapStateToProps = (state) => {
	return{
	  data: state.users
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return{
	  updateUserInfo:(obj) =>{
		dispatch(updateUserInfo(obj));  
	  },
	  save:(user) =>{
		  dispatch(save(user));
	  },
	  usrSelected:(usr) => {
		  dispatch(usrSelected(usr));
	  }
	}
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
