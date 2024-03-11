import logo from "./logo.svg";
import "./App.css";
import FirebaseDataComponent from "./FirebaseDataComponent";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <FirebaseDataComponent />
      </header>
    </div>
  );
}

export default App;
