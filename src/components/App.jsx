import React, { Component } from 'react';
import { nanoid } from 'nanoid'; // libka do generowania kluczy
import css from './App.module.css';
import Form from './Form/Form';
import { Contacts } from './Contacts/contacs';
import { Filter } from './Filter/Filter';

//dane podane w zadaniu
export class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  // Obsługa zmiany danych wejściowych
  onChangeInput = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  // Dodawanie nowego kontaktu
  addContact = ({ name, number }) => {
    if (
      this.state.contacts.some(
        value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState(oldState => {
        const list = [...oldState.contacts];
        list.push({
          id: nanoid(),
          name: name,
          number: number,
        });
        return { contacts: list };
      });
    }
  };

  // Filtracja kontaktów
  filterContacts = () => {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };

  // Usuwanie kontaktu
  deleteContact = id => {
    const { contacts } = this.state;
    const filtered = contacts.filter(item => item.id !== id);
    this.setState({ contacts: filtered });
  };

  render() {
    return (
      <div className={css.main}>
        <h1>Phonebook</h1>
        <Form addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onChangeInput={this.onChangeInput} />
        <Contacts
          deleteContact={this.deleteContact}
          contacts={this.filterContacts()}
        />
      </div>
    );
  }
}
