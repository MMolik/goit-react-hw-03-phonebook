import PropTypes from 'prop-types';
import css from './contacs.module.css';

// Definicja komponentu Contacts
export const Contacts = ({ contacts, deleteContact }) => {
  // Funkcja obsługująca usuwanie kontaktu
  const handleDelete = id => {
    deleteContact(id); // Wywołanie funkcji deleteContact 
  };

  // Renderowanie listy kontaktów
  return (
    <ul className={css.contacts}>
      {/* Mapowanie kontaktów na elementy listy */}
      {contacts.map(({ id, name, number }) => (
        <li className={css.item} key={id}>
          {/* Wyświetlenie nazwy i numeru kontaktu */}
          <span>{name}:</span>
          <span>{number}</span>
          {/* Przycisk do usuwania kontaktu */}
          <button
            className={css.btn}
            type="button"
            onClick={() => handleDelete(id)} // Obsługa kliknięcia przycisku usuwania kontaktu
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

Contacts.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};
