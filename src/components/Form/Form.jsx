import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Form.module.css';

// Definicja komponentu Form
const Form = ({ addContact }) => {
  // Stan lokalny komponentu dla przechowywania danych formularza
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });



  // Funkcja obsługująca zmianę danych w polach formularza
  const onChangeInput = event => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Funkcja obsługująca wysłanie formularza
  const handleSubmit = event => {
    event.preventDefault(); // Zapobieganie domyślnej akcji formularza (przeładowanie strony)
    addContact(formData); // Wywołanie przekazanej funkcji addContact z danymi formularza jako argumentem
    resetForm(); // Resetowanie formularza po dodaniu kontaktu
  };
    // Funkcja resetująca formularz
    const resetForm = () => {
      setFormData({ name: '', number: '' });
    };

  // Renderowanie formularza
  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        {/* Pole tekstowe */}
        <label className={css.label}>
          Name
          <br />
          <input
            className={css.input}
            onChange={onChangeInput}
            value={formData.name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+((['\s\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <br />
        {/* Pole tekstowe */}
        <label htmlFor="">
          Number
          <br />
          <input
            className={css.input}
            onChange={onChangeInput}
            value={formData.number}
            type="tel"
            name="number"
            pattern="^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <br />
        {/* Przycisk do dodawania kontaktu */}
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
};


Form.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default Form;
