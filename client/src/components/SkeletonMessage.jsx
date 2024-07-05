import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonMessage = ({ isSender }) => {
  return (
    <div
      className={`flex items-end gap-1 mb-1 px-4 ${
        isSender ? "justify-end" : "justify-start"
      }`}
    >
      {!isSender && (
        <Skeleton circle height={24} width={24} className="w-6 h-6" />
      )}

      <div
        className={`flex flex-col max-w-xs ${
          isSender ? "items-end" : "items-start"
        }`}
      >
        <Skeleton
          width={60}
          height={10}
          className={`text-xs text-gray-500 mb-0.5 ${
            isSender ? "me-3" : "ms-3"
          }`}
        />

        <Skeleton
          width={150}
          height={20}
          className={`text-md rounded-2xl px-3 py-2 ${
            isSender
              ? "bg-red-300 text-gray-800 self-end"
              : "bg-gray-300 text-gray-800"
          }`}
        />

        <Skeleton
          width={50}
          height={10}
          className={`text-xs text-gray-500 hidden ${
            isSender ? "me-2" : "ms-2"
          }`}
        />
      </div>
    </div>
  );
};

export default SkeletonMessage;
