import React from 'react';

const DeleteComponent = ({ match }) => {
  const itemId = match.params.id;

  // Lógica para obtener y mostrar los detalles del registro a eliminar

  return (
    <div>
      <h1>Eliminar Elemento</h1>
      <p>¿Estás seguro de que deseas eliminar este elemento?</p>
      {/* Agrega un botón de confirmación para eliminar */}
    </div>
  );
};

export default DeleteComponent;