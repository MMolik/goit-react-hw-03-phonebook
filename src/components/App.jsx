import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import Form from './Form/Form';
import { Contacts } from './Contacts/contacs';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    // Wczytanie kontaktów z lokalnego magazynu przy załadowaniu aplikacji
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    this.setState({ contacts: storedContacts });
  }

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
      const newContact = { id: nanoid(), name: name, number: number };
      const updatedContacts = [...this.state.contacts, newContact];
      this.setState({ contacts: updatedContacts }, () => {
        // Zapisanie kontaktów w lokalnym magazynie po dodaniu nowego kontaktu
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      });
    }
  };

  // Usuwanie kontaktu
  deleteContact = id => {
    const filteredContacts = this.state.contacts.filter(contact => contact.id !== id);
    this.setState({ contacts: filteredContacts }, () => {
      // Zapisanie kontaktów w lokalnym magazynie po usunięciu kontaktu
      localStorage.setItem('contacts', JSON.stringify(filteredContacts));
    });
  };

  // Filtracja kontaktów
  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
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
