import React, { Component } from "react";
import style from "../Phonebook/PhoneBook.module.css";

class PhonebookEditor extends Component {
  state = { name: "", number: "" };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addContacts(this.state.name, this.state.number);
    this.setState({ name: "", number: "" });
  };

  render() {
    const { name, number } = this.state;
    return (
      <>
        <div>
          <form className={style.form} onSubmit={this.handleSubmit}>
            <label>
              Имя
              <input
                className={style.inputField}
                type="text"
                value={name}
                onChange={this.handleChange}
                name="name"
              />
            </label>
            <label>
              Номер
              <input
                className={style.inputField}
                type="text"
                value={number}
                onChange={this.handleChange}
                name="number"
              />
            </label>

            <button className={style.buttonAdd} type="submit">
              Добавить контакт
            </button>
          </form>
          <div></div>
        </div>
      </>
    );
  }
}
export default PhonebookEditor;
