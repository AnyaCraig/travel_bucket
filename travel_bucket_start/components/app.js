// THIS IS OUR MAIN APP COMPONENT

// we need to import react, obviously
import React from 'react';

// import jquery to communicate with our api
// import $ from 'jquery';

// here, we define our component
class App extends React.Component {

	constructor() {
		super();
		this.state = {

			// a list of dummy destinations
			// to show before we hook up the database
			destinations: [
				{
					destinationName: "Nakhchivan",
					destinationImageUrl: "http://foreignpolicynews.org/wp-content/uploads/2015/04/Alinjagala-Nakhchivan.jpg",
				},
				{
					destinationName: "Slovenia",
					destinationImageUrl: "https://www.slovenia.info/uploads/turisticna/Alpine-Slovenia-bled.jpg",
				},
				{
					destinationName: "Tromsø, Norway",
					destinationImageUrl: "https://res.cloudinary.com/simpleview/image/upload/c_limit,f_auto,h_1200,q_75,w_1200/v1/clients/norway/northern-lights-tromso-norway_2-1_a8b03e36-f1cd-46be-939e-ebf6d70c41e2.jpg",
				},
				{
					destinationName: "Uzbekistan",
					destinationImageUrl: "https://s3-eu-west-1.amazonaws.com/originaltravel.assets.d3r.com/images/gallery/246558-lake-uzbekistan.jpg",
				},
				{
					destinationName: "Himachal Pradesh",
					destinationImageUrl: "http://www.caleidoscope.in/wp-content/uploads/2014/12/Himachal-Pradesh-Lahaul-Spiti.jpg",
				},
				{
					destinationName: "Pridnestrovie",
					destinationImageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/03/Pridnestrovie_military_parade.jpg",
				},

			],
			// a place to store our new destination before we add it
			newDestination: {
				destinationName: "",
				destinationImageUrl: "",
				destinationLat: "",
				destinationLong: "",
			},
			// whether the modal is open or not
			modalOpen: false,

			// an error message in case the API call fails or something
			// errorMessage: "",

		}

		this.updateNewInput = this.updateNewInput.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.addNewDestination = this.addNewDestination.bind(this);

		// we can uncomment the two functions below 
		// when we're ready to hook this up to the database
		
		// this.deleteImage = this.deleteImage.bind(this);
		// this.refresh = this.refresh.bind(this);
	}

	// open the modal
	openModal() {
		this.setState({modalOpen: true});
		document.body.className += " no-scroll";
	}

	// close the modal 
	closeModal() {
		this.setState({modalOpen: false});
		document.body.className = document.body.className.replace("no-scroll","");
	}

	// save the destination being entered to an object in state
	// this is just temporary - later, we'll add it to the 
	// destinations array in state
	updateNewInput(evt) {

		var stateProperty = evt.target.id;
		var stateValue = evt.target.value;

		// make a copy of the newDestination object in state
		var newDestinationCopy = Object.assign(this.state.newDestination);

		// set the corresponding key of that object to our input's value
		newDestinationCopy[stateProperty] = stateValue;
		
		// replace the newDestination object in state with our altered copy
		this.setState({ newDestination: newDestinationCopy});
	}

	// add the new destination 
	// to the destinations array in state
	addNewDestination() {

		// make a copy of the destinations array in state
		var destinations = Array.from(this.state.destinations);

		// push our newly-entered destination (which is stored in an object)
		// into the array copy
		destinations.push(this.state.newDestination);

		// replace the destinations array in state
		// with our altered copy array 
		// then clear out the newDestination object 
		this.setState({
			destinations: destinations,
			newDestination: {
				destinationName: "",
				destinationImageUrl: "",
				destinationLat: "",
				destinationLong: "",
			},
		});

		// close the modal once the destination has been added
		this.closeModal();
	}

	// here, make a function to refresh the list of destinations 
	// we see by making a get request to the api
	// we can use this after we add or delete a destination

	// here, make a function to add a destination 
	// by making a post request via ajax to our api
	// after we add, the destination, call the refresh function
	// to refresh our list

	// here, make a function to delete a destination 
	// by making a delete request via ajax to our api
	// after we delete the destination, call the refresh function
	// to refresh our list

	componentDidMount() {

		// call the refresh function here to update the list of destinations we see

	}

	// this render method contains everything we want to render to the DOM
	render() {

		// the class of the modal when open/shut
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
						// here, we map over the list of destinations in state and return JSX for each image
						this.state.destinations.map((destination, i) => {

							//set the image as a background
							let divStyle = {
			       				backgroundImage: 'url(' + destination.destinationImageUrl + ')'
			   				};

							return (
								<div className='destination-box' key={i}>


								{/* 
									uncomment this when you're ready to hook up your "delete destination" function

									<div className="exit-box" onClick={(evt) => this.deleteDestination(destination._id)}>
										<i className="fa fa-times" aria-hidden="true"></i>
									</div>
								*/}
								

									<div className="destination-image-bg" style={divStyle}></div>

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
