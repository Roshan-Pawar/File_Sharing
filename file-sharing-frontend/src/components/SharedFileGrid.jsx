import SharedFileCard from "./SharedFileCard";

const SharedFileGrid = ({ files }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {files.map(file => (
        <SharedFileCard key={file.id} file={file} />
      ))}
    </div>
  );
};

export default SharedFileGrid;
