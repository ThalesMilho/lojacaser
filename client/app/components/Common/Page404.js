import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className='page-404'>
      <h1>404 - Página não encontrada</h1>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <Link to='/'>Voltar para a página inicial</Link>
    </div>
  );
};

export default Page404;
