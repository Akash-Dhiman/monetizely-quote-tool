interface Props {
    title: string;
    description?: string;
}

export default function Header({
    title,
    description
}: Props) {

    return (

        <div className="mb-8">

            <h1 className="text-4xl font-bold text-slate-900">
                {title}
            </h1>

            {description && (
                <p className="text-slate-500 mt-2">
                    {description}
                </p>
            )}

        </div>

    );
}