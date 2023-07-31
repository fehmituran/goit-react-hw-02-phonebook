import React, { Component } from 'react';
import Header from './Header/Header';
import ContactForm from './ContactForm/ContactForm';
import Section from './Section/Section';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

export class App extends Component {
  state = { ...INITIAL_STATE };

  addContact = newContact => {
    if (
      this.state.contacts.some(contact => {
        return contact.name.toLowerCase() === newContact.name.toLowerCase();
      })
    ) {
      return alert(`${newContact.name} is already in your Book`);
    }

    const id = nanoid();
    const newAddContact = { id, ...newContact };

    this.setState(prevState => {
      return {
        contacts: [newAddContact, ...prevState.contacts],
      };
    });
  };

  deleteContacts = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  getFilter = e => {
    this.setState({ filter: e.currentTarget.value });
    console.log(this.state.filter);
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    return (
      <div>
        <Header />

        <Section title="Phone Book">
          <ContactForm onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.getFilter} />
          <ContactList
            contacts={this.filteredContacts()}
            onDelete={this.deleteContacts}
          />
        </Section>
      </div>
    );
  }
}
