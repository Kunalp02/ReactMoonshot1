import { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import BarChart from './BarChart';
import LineChart from './LineChart';
import './App.css';
import FilterComponent from './FilterComponent';


const App = () => {

  const [accessToken, setAccessToken] = useState('xyz')
  
  const handleLogout = () => {
    setAccessToken('');
    window.location.reload();
  }


  return (
    <div>
      <h1>Data Vizualization Project</h1>  
      {accessToken ? (
      <div>
        <nav>
          <h3 onClick={handleLogout}>Logout</h3>  
        </nav>

        <br/>
        <FilterComponent />

        <div className='chart-div'>
          <BarChart />
          <LineChart />
        </div>
      </div>
    ) : (

      <GoogleOAuthProvider clientId="">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse.credential);
            alert('Login Successful');
            setAccessToken(credentialResponse.credential);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
    )}

    </div>
  )
}

export default App
