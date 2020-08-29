import React from "react";
import { v4 as uuidv4 } from "uuid";
import PhoneBook from "./components/Phonebook/Phonebook";
import Filter from "./components/Filter/Filter";
import PhonebookEditor from "./components/Phonebook/PhonebookEditor";
import { CSSTransition } from "react-transition-group";
import style from "./components/Phonebook/PhoneBook.module.css";
import alertSlideTransition from "./stylesTransition/AlertTransition.module.css";
import TitleSlideTransition from "./stylesTransition/TitleSlideTransition.module.css";
import AlertWindow from "./components/AlertWindow/AlertWindow";
import PhoneFilter from "./stylesTransition/PhoneFilter.module.css";
class App extends React.Component {
  state = {
    contacts: [],
    filter: "",
    alert: null,
  };

  componentDidMount() {
    const preservedContact = localStorage.getItem("contacts");
    if (preservedContact) {
      this.setState({
        contacts: JSON.parse(preservedContact),
      });
    }
  }
  componentDidUpdate(prevState) {
    if (prevState !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContacts = (name, number) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    if (
      this.state.contacts.find(
        (cont) => cont.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      this.setState({
        alert: "Номер с таким именем уже существует!",
      });
      return setTimeout(() => {
        this.setState({ alert: null });
      }, 3000);
    }
    if (contact.name === "" || contact.number === "") {
      alert("Введите имя и номер!");
    } else {
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  onRemovePersonData = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };
  changeFilter = (filter) => {
    this.setState({ filter });
  };
  render() {
    const visibleInfoPerson = this.getVisibleContacts();
    const { filter, contacts, alert } = this.state;

    return (
      <div className={style.Wrapper}>
        <CSSTransition
          in={this.state.alert !== null}
          timeout={250}
          classNames={alertSlideTransition}
          unmountOnExit
        >
          <AlertWindow alert={alert} />
        </CSSTransition>
        <CSSTransition
          in
          appear
          timeout={1000}
          classNames={TitleSlideTransition}
          unmountOnExit
        >
          <h1 className={style.title}>Phonebook</h1>
        </CSSTransition>
        <PhonebookEditor addContacts={this.addContacts} />
        {contacts.length > 0 ? (
          <CSSTransition
            in={contacts.length > 1}
            timeout={250}
            classNames={PhoneFilter}
            unmountOnExit
          >
            <Filter value={filter} onChangeFilter={this.changeFilter} />
          </CSSTransition>
        ) : (
          <h2>No contacts</h2>
        )}
        <PhoneBook
          contacts={visibleInfoPerson}
          onRemovePersonData={this.onRemovePersonData}
        />
      </div>
    );
  }
}
export default App;
