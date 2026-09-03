import React from 'react';
import { Link } from 'react-router-dom';
function NotFound() {
    return (
      <>
        <div className="container mt-5 pt-5">
          <div className="row">
            <div className="col text-center mt-5">
              <h4>404 Not Found</h4>
              <h2>Couldn’t find that page</h2>
              <p     className="mt-3 ">
                We couldn’t find the page you were looking for. Visit <Link to="/">Zerodha’s
                home page</Link> 
              </p>
            </div>
          </div>
        </div>
      </>
    );
}

export default NotFound;