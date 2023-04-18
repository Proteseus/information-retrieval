import Search from "./Components/Search";
import { useState, useEffect } from "react";
import Nav from "./Components/nav";
import DocumentList from "./Components/DocumentList";

const sortNews = (document, sortByDate) => {
  if (sortByDate) return document;
  var sortedDocument = document.sort((a, b) => {
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    if (dateA.getTime() > dateB.getTime()) return 1;
    else return -1;
  });
  return sortedDocument;
};
function App() {
  const [document, setDocument] = useState([]);
  const [sortByDate, SetSortbyDate] = useState(false);
  return (
    <div className="p-12">
      <Nav />
      <Search setDocument={setDocument} SetSortbyDate={SetSortbyDate} />
      {useEffect(() => {
        setDocument(sortNews(document, sortByDate));
      }, [document, sortByDate])}
      <DocumentList document={document} />
    </div>
  );
}

export default App;
