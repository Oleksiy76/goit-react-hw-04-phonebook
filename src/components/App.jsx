import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContactData = data => {
    const isContact = contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );

    if (isContact) {
      alert(`${data.name} is already in contacts.`);
      return;
    }

    const newContacts = {
      id: nanoid(),
      ...data,
    };

    setContacts(() => {
      return [...contacts, newContacts];
    });
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const getFilterContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const onRemoveContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div>
      React homework template
      <h1>Phonebook</h1>
      <ContactForm addContactData={addContactData} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contactsList={getFilterContacts()}
        onRemoveContact={onRemoveContact}
      />
    </div>
  );
};

export default App;
