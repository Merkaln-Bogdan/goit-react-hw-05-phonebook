import React from "react";
import style from "./PhoneBook.module.css";
import PhonebookListItem from "../PhonebookListItem/PhoneBookListItem";
import slideTransition from "../../stylesTransition/PhonebookListSlide.module.css";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Phonebook = ({ contacts, onRemovePersonData }) => (
  <div className={style.phoneList}>
    <h2>Контакты</h2>
    <TransitionGroup component="ul" className={style.contactList}>
      {contacts.map((contact) => (
        <CSSTransition
          key={contact.id}
          timeout={300}
          classNames={slideTransition}
        >
          <PhonebookListItem
            key={contact.id}
            name={contact.name}
            number={contact.number}
            onRemovePersonData={() => onRemovePersonData(contact.id)}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  </div>
);

export default Phonebook;
Phonebook.propTypes = {
  contacts: PropTypes.array,
  onRemovePersonData: PropTypes.func,
};
