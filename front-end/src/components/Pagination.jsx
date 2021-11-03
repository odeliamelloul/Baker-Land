import React from 'react'
import { Link } from 'react-router-dom';

const Pagination = ({ productsPerPage, totalProducts, paginate,currentPage }) => {


  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i)
  }
  let nextBtn=totalProducts>(currentPage*productsPerPage)?true:false

  return (
    <nav className={window.location.pathname==="Pantry"?"nav-pagination-pantry":"nav-pagination"}>
      {
       pageNumbers.length>1 && currentPage>1 &&currentPage<pageNumbers.length  &&
        <div className="d-flex ">
          <Link onClick={() => paginate(currentPage-1)} to={{pathnane:`Catalog/page/${currentPage-1}`}} className='page-link'>
          &#8656; prev
          </Link>
          {nextBtn &&
          <Link onClick={() => paginate(currentPage+1)} to={{pathnane:`Catalog/page/${currentPage+1}`}} className='page-link'>
              next	&#8658;
          </Link>}
        </div>
        }{
        currentPage>1 &&currentPage===pageNumbers.length  &&
        <div>        
        <Link onClick={() => paginate(currentPage-1)} to={{pathnane:`Catalog/page/${currentPage+1}`}} className='page-link'>
        &#8656; prev 
        </Link>     
      </div>}
        { currentPage===1 && totalProducts>productsPerPage &&
        <div>
         {nextBtn &&      
        <Link onClick={() => paginate(currentPage+1)} to={{pathnane:`Catalog/page/${currentPage+1}`}} className='page-link'>
              next &#8658;
        </Link>}  
      </div>
      }
    </nav>
  );
};

export default Pagination
