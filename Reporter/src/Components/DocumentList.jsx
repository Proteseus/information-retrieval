export default function DocumentList({ document }) {
  return (
    <div className="flex justify-center ">
      <div className="w-2/4 min-h-full p-5 mt-5 space-y-8 border rounded-lg">
        {document.map((doc) => (
          <div className="p-1 rounded-lg bg-slate-50">
            <a href={doc.link}>
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
