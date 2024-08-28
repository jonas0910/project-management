import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
export default function TableHeading({ bySort, children, queryParams }) {
    return (
        <div className="px-3 py-3 flex items-center justify-between gap-1">
            {children}
            <div>
                <ChevronUpIcon className={
                    "w-4" + 
                    (queryParams.sort === bySort && queryParams.direction === 'asc' ? '' : ' text-gray-400')
                }/>
                <ChevronDownIcon className={
                    "w-4 -mt-2" + 
                    (queryParams.sort === bySort && queryParams.direction === 'desc' ? '' : ' text-gray-400')
                } />
            </div>
        </div>
    );
} 