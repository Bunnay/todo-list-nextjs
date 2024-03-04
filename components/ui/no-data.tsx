import { InboxIcon } from "@heroicons/react/24/solid";

export default function NoData() {
  return (
    <div className="h-24 w-full rounded-md flex flex-col justify-center items-center text-center text-sm border border-1 border-dashed text-gray-400 my-2">
      <InboxIcon width="24" height="24" className="mb-2" />
      No result!
    </div>
  );
}
