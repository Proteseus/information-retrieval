import Search from "./Components/Search";
import { useState } from "react";
import Nav from "./Components/nav";
import DocumentList from "./Components/DocumentList";

function App() {
  const [document, setDocument] = useState([]);
  return (
    <div className="p-12">
      <Nav />
      <Search setDocument={setDocument} />
      <DocumentList document={document} />
    </div>
  );
}

export default App;
