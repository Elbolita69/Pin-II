// Simulación de estacionamiento (todos libres al inicio)
const parkingLot = {}; // Un objeto para almacenar el estado de cada lugar

// Inicializa todos los lugares como libres
parkingLot['A1'] = { status: 'Free', documentNumber: '', userName: '' };
parkingLot['A2'] = { status: 'Free', documentNumber: '', userName: '' };
parkingLot['A3'] = { status: 'Free', documentNumber: '', userName: '' };
parkingLot['A4'] = { status: 'Free', documentNumber: '', userName: '' };
parkingLot['B1'] = { status: 'Free', documentNumber: '', userName: '' };
parkingLot['B2'] = { status: 'Free', documentNumber: '', userName: '' };
parkingLot['B3'] = { status: 'Free', documentNumber: '', userName: '' };
parkingLot['B4'] = { status: 'Free', documentNumber: '', userName: '' };

// Función para registrar un vehículo
function registerCar(event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma normal

  const documentNumber = document.getElementById("documentNumber").value;
  const userName = document.getElementById("userName").value;
  const parkingSpot = document.getElementById("parkingSpot").value;

  // Validaciones
  const documentNumberError = document.getElementById("documentNumberError");
  const userNameError = document.getElementById("userNameError");
  documentNumberError.textContent = "";
  userNameError.textContent = "";

  if (!/^\d+$/.test(documentNumber)) {
    documentNumberError.textContent = "El número de documento debe contener solo números.";
    return;
  }
  if (!/^[a-zA-Z]+$/.test(userName)) {
    userNameError.textContent = "El nombre de usuario debe contener solo letras.";
    return;
  }

  if (parkingLot[parkingSpot].status === 'Free') {
    parkingLot[parkingSpot].status = 'Occupied';
    parkingLot[parkingSpot].documentNumber = documentNumber;
    parkingLot[parkingSpot].userName = userName;
    updateParkingLot(); // Actualiza la visualización
    document.getElementById("registrationForm").reset(); // Limpia el formulario
  } else {
    alert("El lugar de estacionamiento ya está ocupado.");
  }
}

// Función para actualizar la visualización del estacionamiento
function updateParkingLot() {
  const parkingLotContainer = document.getElementById("parkingLot");
  parkingLotContainer.innerHTML = ''; // Limpia la visualización anterior

  // Columna izquierda
  const leftColumn = document.createElement('div');
  leftColumn.classList.add('col-md-5', 'mb-3'); // Ajusta el ancho de la columna

  for (let i = 1; i <= 4; i++) {
    const parkingSpot = document.createElement('div');
    parkingSpot.classList.add('parking-spot');
    parkingSpot.dataset.spot = `A${i}`; 
    parkingSpot.textContent = `A${i}`;

    if (parkingLot[`A${i}`].status === 'Occupied') {
      parkingSpot.classList.add('occupied');
      parkingSpot.title = `Lugar: A${i}\nNúmero de Documento: ${parkingLot[`A${i}`].documentNumber}\nNombre: ${parkingLot[`A${i}`].userName}`;
    } else {
      parkingSpot.classList.add('free');
    }

    // Agrega el evento click para mostrar el modal
    parkingSpot.addEventListener('click', function() {
      const modal = new bootstrap.Modal(document.getElementById('parkingSpotInfoModal')); // Crea una instancia del modal
      const modalInfo = document.getElementById('modalInfo');
      const spot = this.dataset.spot; // Obtiene el lugar del cuadro

      if (parkingLot[spot].status === 'Occupied') {
        modalInfo.innerHTML = ''; // Limpia el contenido del modal
        const fila = document.createElement('li');
        fila.textContent = `Fila: ${spot}`;
        modalInfo.appendChild(fila);

        const documento = document.createElement('li');
        documento.textContent = `Número de documento: ${parkingLot[spot].documentNumber}`;
        modalInfo.appendChild(documento);

        const nombre = document.createElement('li');
        nombre.textContent = `Nombre: ${parkingLot[spot].userName}`;
        modalInfo.appendChild(nombre);

        modal.show(); // Muestra el modal
      } else {
        modalInfo.innerHTML = ''; // Limpia el contenido del modal
        const fila = document.createElement('li');
        fila.textContent = `Fila: ${spot}`;
        modalInfo.appendChild(fila);

        const estado = document.createElement('li');
        estado.textContent = `Estado: Libre`;
        modalInfo.appendChild(estado);

        modal.show(); // Muestra el modal
      }
    });

    leftColumn.appendChild(parkingSpot);
  }

  // Línea amarilla
  const yellowLine = document.createElement('div');
  yellowLine.classList.add('col-md-2', 'yellow-line'); // Ajusta el ancho de la línea amarilla
  
  // Columna derecha
  const rightColumn = document.createElement('div');
  rightColumn.classList.add('col-md-5'); // Ajusta el ancho de la columna

  for (let i = 1; i <= 4; i++) {
    const parkingSpot = document.createElement('div');
    parkingSpot.classList.add('parking-spot');
    parkingSpot.dataset.spot = `B${i}`;
    parkingSpot.textContent = `B${i}`; 

    if (parkingLot[`B${i}`].status === 'Occupied') {
      parkingSpot.classList.add('occupied');
      parkingSpot.title = `Lugar: B${i}\nNúmero de Documento: ${parkingLot[`B${i}`].documentNumber}\nNombre: ${parkingLot[`B${i}`].userName}`;
    } else {
      parkingSpot.classList.add('free');
    }

    // Agrega el evento click para mostrar el modal
    parkingSpot.addEventListener('click', function() {
      const modal = new bootstrap.Modal(document.getElementById('parkingSpotInfoModal')); // Crea una instancia del modal
      const modalInfo = document.getElementById('modalInfo');
      const spot = this.dataset.spot; // Obtiene el lugar del cuadro

      if (parkingLot[spot].status === 'Occupied') {
        modalInfo.innerHTML = ''; // Limpia el contenido del modal
        const fila = document.createElement('li');
        fila.textContent = `Fila: ${spot}`;
        modalInfo.appendChild(fila);

        const documento = document.createElement('li');
        documento.textContent = `Número de documento: ${parkingLot[spot].documentNumber}`;
        modalInfo.appendChild(documento);

        const nombre = document.createElement('li');
        nombre.textContent = `Nombre: ${parkingLot[spot].userName}`;
        modalInfo.appendChild(nombre);

        modal.show(); // Muestra el modal
      } else {
        modalInfo.innerHTML = ''; // Limpia el contenido del modal
        const fila = document.createElement('li');
        fila.textContent = `Fila: ${spot}`;
        modalInfo.appendChild(fila);

        const estado = document.createElement('li');
        estado.textContent = `Estado: Libre`;
        modalInfo.appendChild(estado);

        modal.show(); // Muestra el modal
      }
    });

    rightColumn.appendChild(parkingSpot);
  }

  parkingLotContainer.appendChild(leftColumn);
  parkingLotContainer.appendChild(yellowLine);
  parkingLotContainer.appendChild(rightColumn);
}

// Función para buscar un usuario
function searchUser(event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma normal

  const searchInput = document.getElementById("searchInput").value;
  let foundSlot = null;

  for (const slot in parkingLot) {
    if (parkingLot[slot].status === 'Occupied') {
      if (parkingLot[slot].documentNumber === searchInput || parkingLot[slot].userName.toLowerCase() === searchInput.toLowerCase()) {
        foundSlot = slot;
        break;
      }
    }
  }

  if (foundSlot) {
    alert(`El usuario se encuentra en el lugar ${foundSlot}`);
  } else {
    alert("No se encontró el usuario");
  }
}

// Añade un evento al formulario para el registro
const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener('submit', registerCar);

// Añade un evento al formulario de búsqueda
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener('submit', searchUser);

// Inicializa la visualización del estacionamiento
updateParkingLot();