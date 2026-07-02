export default function SectionTitle({ title }: { title: string }) {
    return (
        <div className="w-full flex justify-start lg:mt-14 mt-20">
            <div className="w-39.25 px-8 py-2.5 bg-[var(--color-primary)] rounded-xl">
                <span className="text-white text-[15px] font-medium text-center">{title}</span>
            </div>
        </div>
    )
}