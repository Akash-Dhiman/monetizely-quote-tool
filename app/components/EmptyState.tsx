interface Props {
    title: string;
}

export default function EmptyState({
    title
}: Props) {

    return (

        <div className="bg-white border rounded-xl p-10 text-center">

            <h3 className="text-lg font-semibold">
                {title}
            </h3>

            <p className="text-slate-500 mt-2">
                No records found
            </p>

        </div>

    );
}