
interface Prop {
  _id: string;
  eventType: string;
  from: string;
  fromName: string;
  transaction_hash: string;
  to: string;
  toName: string;
  amount: number;
  time: number;
}

export const InfoBar = ({ fromName, toName, transaction_hash, amount, eventType, time }: Prop) => {
  return (
    <article className="flex justify-between z-10 items-center my-2 mx-4 rounded-lg shadow-lg p-4 border-b border-gray-200 bg-gray-50 hover:bg-gray-100 transition duration-200 ease-in-out">
      <div>
        <p className="text-sm text-gray-600">
          From: <span className="font-medium text-[#FF8C00]">{fromName}</span>
        </p>
        <p className="text-sm text-gray-600">
          To: <span className="font-medium text-[#FF8C00]">{toName}</span>
        </p>
        <p className="text-xs text-gray-600 mt-1">
          Time: <span className="text-blue-600">{new Date(time).toLocaleString()}</span>
        </p>
        <p className="text-xs text-gray-500">
          Hash: <span className="text-[#FF8C00]">{transaction_hash}</span>
        </p>
      </div>

      <div className="text-right">
        <p className="text-sm font-semibold text-gray-700">{eventType}</p>
        <p className="text-lg font-bold text-black mt-1">{(amount / 1e16).toFixed(1)} EST</p>
      </div>
    </article>
  );
};
