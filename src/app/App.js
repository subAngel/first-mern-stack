import React, { Component } from "react";
const debug = require("debug")("app:front-app");
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

class App extends Component {
	constructor() {
		super();
		this.state = {
			title: "",
			description: "",
			tasks: [],
			_id: "",
			textButton: "Agregar",
		};
		this.addTask = this.addTask.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	addTask(e) {
		if (this.state.title !== "" || this.state.title !== "") {
			if (this.state._id) {
				fetch(`/api/tasks/${this.state._id}`, {
					method: "PUT",
					body: JSON.stringify(this.state), // * acutaliza los datos
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json", // * el tipo de contenido es un formato json
					},
				})
					.then((res) => res.json())
					.then((data) => {
						console.log(data);
						M.toast({ html: "Tarea actualizada" });
						this.setState({
							title: "",
							description: "",
							textButton: "Agregar",
						});
						this.fetchTasks();
					});
			} else {
				// * @fetch para enviar una peticion http al servidor
				fetch("/api/tasks", {
					method: "POST",
					body: JSON.stringify(this.state),
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json", // * el tipo de contenido es un formato json
					},
				})
					.then((res) => res.json)
					.then((data) => {
						console.log(data);
						M.toast({ html: "Tarea guardada" });
						this.setState({ title: "", description: "" });
						this.fetchTasks();
					})
					.catch((err) => console.log(err));
			}
			e.preventDefault();
		} else {
			alert("los campos deben ser requeridos");
		}
	}

	// * cuando la aplicacion este montada que ejecute este metodo
	componentDidMount() {
		this.fetchTasks();
	}

	// * obtener tareas desde la consulta al servidor
	fetchTasks() {
		fetch("/api/tasks")
			.then((res) => res.json())
			.then((data) => {
				this.setState({ tasks: data });
				console.log(this.state.tasks);
			});
	}

	// TODO ELIMINAR TAREA
	deleteTask(id) {
		if (confirm("Estas seguro de querer eliminar la tarea?")) {
			// * haciendo una consulta http delete
			fetch(`/api/tasks/${id}`, {
				method: "DELETE",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json", // * el tipo de contenido es un formato json
				},
			})
				.then((res) => res.json())
				.then((data) => {
					M.toast({ html: "Tarea eliminada" });
					this.fetchTasks();
				});
		}
	}
	// TODO EDITAR TAREA
	editTask(id) {
		fetch(`/api/tasks/${id}`)
			.then((res) => res.json()) // * se convierte la respuesta a formato json
			.then((data) => {
				console.log(data);
				this.setState({
					title: data.title,
					description: data.description,
					_id: data._id,
				});
			});
	}

	// * para recibir los datos de los inputs
	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	render() {
		return (
			<>
				<div>
					{/*  * NAVEGACION*/}
					<nav className="deep-purple darken-2">
						<div className="container">
							<a className="brand-logo" href="/">
								MERN Stack
							</a>
						</div>
					</nav>
					{/* FORM */}
					<div className="container">
						<div className="row">
							<div className="col s5">
								<div className="card">
									<div className="card-content">
										<form onSubmit={this.addTask}>
											<div className="row">
												<div className="input-field col s12">
													<input
														name="title"
														type="text"
														onChange={this.handleChange}
														placeholder="Titulo"
														value={this.state.title}
													/>
												</div>
											</div>
											<div className="row">
												<div className="input-field col s12">
													<textarea
														name="description"
														onChange={this.handleChange}
														placeholder="Descripcion"
														className="materialize-textarea"
														value={
															this.state.description
														}
													></textarea>
												</div>
											</div>
											<button
												type="submit"
												className="btn deep-purple darken-3 col s12"
											>
												{this.state.textButton}
											</button>
										</form>
									</div>
								</div>
							</div>
							<div className="col s7">
								<table>
									<thead>
										<tr>
											<th>Titulo</th>
											<th>Descripcion</th>
										</tr>
									</thead>
									<tbody>
										{this.state.tasks.map((task) => {
											return (
												<tr key={task._id}>
													<td>{task.title}</td>
													<td>{task.description}</td>
													<td>
														<button
															className="red lighten-1 btn-small "
															onClick={() =>
																this.deleteTask(
																	task._id
																)
															}
														>
															<AiFillDelete />
														</button>
														<button
															className=" blue lighten-1 btn-small"
															style={{
																margin: "5px",
															}}
															onClick={() => {
																this.setState({
																	textButton:
																		"Editar",
																});
																this.editTask(
																	task._id
																);
															}}
														>
															<AiFillEdit />
														</button>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				{/* <!-- Modal Structure --> */}
				{/* <div id="modal1" class="modal">
					<div class="modal-content">
						<h4>En verdad quiere eliminar esta tarea?</h4>
					</div>
					<div class="modal-footer">
						<a
							href="#!"
							class="modal-close waves-effect waves-green btn-flat"
						>
							Eliminar
						</a>
					</div>
				</div> */}
			</>
		);
	}
}

export default App;
