// this is our main app component
// it is the parent component for all our react components

// we need to import react, obvy
import React from 'react';

// we need jquery, too, for our ajax calls
import $ from 'jquery';

// here, we define our component (class)
class App extends React.Component {

	constructor() {
		super();
		this.state = {

			destinations: [],
			newDestination: {
				destinationName: "",
				destinationImageUrl: "",
				destinationLat: "",
				destinationLong: "",
			},
			modalOpen: false,
			errorMessage: "",
		}

		this.updateNewInput = this.updateNewInput.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.addNewDestination = this.addNewDestination.bind(this);
	}

	openModal() {
		this.setState({modalOpen: true});
		document.body.className += " no-scroll";
	}

	closeModal() {
		this.setState({modalOpen: false});
		document.body.className = document.body.className.replace("no-scroll","");
	}

	updateNewInput(evt) {

		var stateProperty = evt.target.id;
		var stateValue = evt.target.value;

		// make a copy of the newContact object in state
		var newDestinationCopy = Object.assign(this.state.newDestination);

		// set the corresponding key of that object to our input's value
		newDestinationCopy[stateProperty] = stateValue;
		
		// replace the newContact object in state with our altered copy
		this.setState({ newDestination: newDestinationCopy});
	}

	addNewDestination() {

		// here is our ajax call for posting a new destination
		// we post the new destination to the database
		// then we clear out the newDestination property in state
		// and refresh our destinations
	   $.ajax({
		    method: 'POST',
		    url: '/api/destinations/',
		    data: JSON.stringify({ 
	      		destinationName: this.state.newDestination.destinationName,
				destinationImageUrl: this.state.newDestination.destinationImageUrl,
				destinationLat: this.state.newDestination.destinationLat,
				destinationLong: this.state.newDestination.destinationLong,
	      	}),
	      	contentType: 'application/json'
	   	})
	   	.then((destination) => {
	      	this.setState({ 
	      		newDestination: {				
		      		destinationName: "",
					destinationImageUrl: "",
					destinationLat: "",
					destinationLong: "",
				} 
			});
	      	this.refresh();
	   });

	   this.closeModal();
	}

	// delete a destination
	deleteDestination(destinationId) {

		// here is our ajax call for deleting a destination
		// we send up the specific id to delete
		// and then we refresh our destinations
		$.ajax({
		   method: 'DELETE',
		   url: '/api/destinations/' + destinationId,
		})
		.then(() => {
		   this.refresh();
		});
	}

	// this function refreshes the list of destinations we see
	refresh() {
		
		// we get the destinations
		// set the new destinations array to state
		// and send an error message in case it fails
		$.get('/api/destinations')
		.then((destinations) => { this.setState({ destinations: destinations }) 
		})
		.catch((err) => {this.setState({ errorMessage: err.message }) 
		});

	}

	// when the component mounts, we refresh the destinations
	componentDidMount() {

		this.refresh();
	}

	// this render method contains everything we want to render to the DOM
	render() {

		let modalClass = this.state.modalOpen === false ? "" : " modal-active";

		return (

			<div className={"page-wrapper" + modalClass}>

				<div className="add-destination-icon" onClick={(evt) => this.openModal(evt)}>
					<i className="fa fa-plus" aria-hidden="true"></i>
				</div>

				<div className='content-container'>

					<div className="header">
						<h1>My Travel Bucket</h1>
					</div>

				  	<div className='destinations'>

					{
						// here, we map over the list of destinations in state and return JSX for each destination
						this.state.destinations.map((destination, i) => {

							let divStyle = {
			       				backgroundImage: 'url(' + destination.destinationImageUrl + ')'
			   				};

							return (
								<div className='destination-box' key={i}>

									<div className="exit-box" onClick={(evt) => this.deleteDestination(destination._id)}>
										<i className="fa fa-times" aria-hidden="true"></i>
									</div>

									<div className="destination-image-bg" style={divStyle}>

									</div>

									<h2 className="destination-name">{destination.destinationName}</h2>
						
								</div>
							);
						})
				   }
				  	</div>


				</div>

			   	<div className="add-destination">
			   		<div className="add-exit-box" onClick={(evt)=> this.closeModal(evt)}>
			   			<i className="fa fa-times" aria-hidden="true"></i>
			   		</div>
			   		<span className="title-wrapper"><h3>Add a destination</h3></span>
			   		<input className="form-input" type="text" id="destinationName" placeholder="Type the destination name here" value={this.state.newDestination.destinationName} onChange={(evt)=> this.updateNewInput(evt)} />
			   		<input className="form-input" type="text" id="destinationImageUrl" placeholder="Add your destination image URL here" value={this.state.newDestination.destinationImageUrl} onChange={(evt) => this.updateNewInput(evt)}/>
			   		<div className="short-input-container">
				   		<input className="form-input short-input" type="text" id="destinationLat" placeholder="Add the latitude of your destination" value={this.state.newDestination.destinationLat} onChange={(evt) => this.updateNewInput(evt)}/>
				   		<input className="form-input short-input" type="text" id="destinationLong" placeholder="Add the longitude of your destination" value={this.state.newDestination.destinationLong} onChange={(evt) => this.updateNewInput(evt)}/>  
			   		</div>
			   		<button className="add-destination-button" onClick={(evt) => this.addNewDestination(evt)}>Add this destination</button>
			   </div>

			</div>

		)
	}
}

// we have to export our component 
export default App;
