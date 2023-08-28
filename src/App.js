import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json";

function App() {
  const [contactList, setContactList] = useState(contacts.slice(0, 5));
  const allContacts = contacts.slice(5);

  // verificar si aun hay contactos
  const addRandomContact = () => {

    if (allContacts.length === 0) {
      alert("No hay más contactos disponibles.");
      return;
    }

    // seleccion aleatoria
    const randomIndex = Math.floor(Math.random() * allContacts.length);
    const newContact = allContacts[randomIndex];

    // verificar si el nuevo contacto ya esta en la lista
    if (contactList.some((contact) => contact.id === newContact.id)) {
      addRandomContact();
      return;
      // Se utiliza para verificar si al menos un elemento del array cumple cierta condición. 
      // La función some() recibe una función de prueba como argumento y devuelve true si al menos un elemento del array pasa la prueba; de lo contrario, devuelve false.
    }

    setContactList((prevContacts) => [...prevContacts, newContact]);
  }
  const sortByName = () => {
    const sortedContacts = [...contactList].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContactList(sortedContacts);
  };

  const sortByPopularity = () => {
    const sortedContacts = [...contactList].sort((a, b) =>
      b.popularity - a.popularity
    );
    setContactList(sortedContacts);
  };

  const removeContact = (id) => {
    const updatedContacts = contactList.filter((contact) => contact.id !== id);
    setContactList(updatedContacts);
  };

  const resetContacts = () => {
    setContactList(contacts.slice(0, 5))

  };

  const contactsEmy = () => {
    let emy = [];
    const emmy = contactList.filter((contact) => {
      if (contact.wonEmmy == true) {
        emy.push(contact)

      }
    })

  }

  return <div className="App">
    <h1>IronContacts</h1>
    {/* <br></br> */}
    <button onClick={addRandomContact}>Agregar contacto aleatorio</button>
    <button onClick={sortByName}>Ordenar por Nombre</button>
    <button onClick={sortByPopularity}>Ordenar por Popularidad</button>
    <button onClick={resetContacts}>Reset</button>
    <button onClick={contactsEmy}>Contactos con Emmy</button>
    {/* <br></br> */}

    <table>
      {/* cabeza */}
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
          <th>Actions</th>
        </tr>
      </thead>

      {/* cuerpo */}
      <tbody>
        {contactList.map((contact) => (
          <tr key={contact.id}>
            <td>
              <img
                src={contact.pictureUrl}
                alt={contact.name}
                style={{ width: "50px" }}
              />
            </td>
            <td>{contact.name}</td>
            <td>{contact.popularity.toFixed(2)}</td>
            <td>
              {contact.wonOscar ? (
                <span>

                  <img
                    src='./images/oscar.png'
                    alt='icono de oscar'
                    style={{ width: "20px" }}
                  />
                </span>
              ) : null}
            </td>
            <td>
              {contact.wonEmmy ? (
                <span >
                  <img
                    src='./images/emmy.png'
                    alt='icono de oscar'
                    style={{ width: "30px" }}
                  />
                </span>
              ) : null}
            </td>
            <td>
              <button onClick={() => removeContact(contact.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  </div>;
}

export default App;
