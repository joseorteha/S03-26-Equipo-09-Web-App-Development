import React from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router'; // Importa la instancia desde la raíz de src

function App() {
  return <RouterProvider router={router} />;
}

export default App;