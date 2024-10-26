// src/components/AppCard.tsx

interface AppCardProps {
    name: string;
    url: string;
    type: string;
    onDelete: (name: string) => void;
  }
  
  const AppCard: React.FC<AppCardProps> = ({ name, url, type, onDelete }) => {
    return (
      <div className="bg-[#191430] h-[46vh] w-100 shadow-md rounded-lg p-4 flex flex-col justify-between shrink-0">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-white">
          <strong>URL:</strong> {url}
        </p>
        <p className="text-white">
          <strong>Type:</strong> {type}
        </p>
        <div className="mt-auto flex justify-between">
          <button
            onClick={() => onDelete(name)}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };
  
  export default AppCard;
  