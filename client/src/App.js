import './App.css';
import Layout from './layout/layout.js';
import MainContent from './layout/maincontent.js';
function App() {
  const onSubmitClick=(params) => {
    alert(params);
  };
  return(
    <>
    <Layout/>
    <MainContent onSubmitClick={onSubmitClick} />
    </>
  );  
}

export default App;