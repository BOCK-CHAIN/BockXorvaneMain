
interface Legacy {
    sections: {

        title: string
        subsections: {
            subtitle: string
            content: string
            bullets?: string[]
        }[]
    }[]
}

const LegacyMapping = ({ legacy }: { legacy: Legacy }) => {

    return (legacy.sections.map((section, index) => (
        <section key={index} className="mb-8 ml-4">
            <h2 className="text-3xl font-bold text-indigo-300 mb-4">
                {index + 1}. {section.title}
            </h2>
            {section.subsections.map((sub, subIndex) => (
                <div key={subIndex} className="mb-4 ml-6">
                    <h3 className="text-xl font-semibold text-indigo-200 mb-2 ">
                        {index + 1}.{subIndex + 1} {sub.subtitle}
                    </h3>
                    <p className="leading-relaxed ml-6">{sub.content}</p>
                    {sub.bullets && sub.bullets.length > 0 && (
                        <ul className="list-disc pl-6 mt-2 space-y-1 ml-6">
                            {sub.bullets.map((bullet, bulletIndex) => (
                                <li key={bulletIndex} className="text-gray-300">
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </section>
    )))

}

export default LegacyMapping