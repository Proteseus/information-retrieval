export default function DocumentList({ document }) {
  return (
    <div className="flex justify-center ">
      <div className="w-2/4 p-5 mt-5 space-y-8 border rounded-lg">
        {document.map((doc) => (
          <div className="p-1 rounded-lg bg-slate-50" key={doc.title}>
            <a href={doc.link} target="_blank">
              <p className="font-bold ">{doc.title}</p>
              <p className="text-xs">{`${doc.story}...`}</p>
              <div className="flex justify-between mx-2 text-sm font-bold">
                <p>{doc.author}</p>
                <p>{doc.date}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
