
import React from 'react';
import type { LanguageData, Theme, Language, TitledContent, Experience, Education, Skills, Personal } from '../types';

interface ResumeProps {
    data: LanguageData;
    theme: Theme;
    language: Language;
}

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
    <h2 className="section-title text-lg font-bold uppercase tracking-wider text-blue-600 border-b-2 border-blue-200 pb-2 mb-4">{title}</h2>
);

const BentoSectionTitle: React.FC<{ title: string }> = ({ title }) => (
    <h2 className="text-lg font-bold text-blue-600 mb-2">{title}</h2>
);

const ObjectiveSection: React.FC<{ data: TitledContent; isBento?: boolean }> = ({ data, isBento }) => (
    <section className="mb-6">
        {isBento ? <BentoSectionTitle title={data.title} /> : <SectionTitle title={data.title} />}
        <p className="item-text text-slate-600">{data.text}</p>
    </section>
);

const ExperienceSection: React.FC<{ data: Experience; isBento?: boolean }> = ({ data, isBento }) => (
    <section className="mb-6">
        {isBento ? <BentoSectionTitle title={data.title} /> : <SectionTitle title={data.title} />}
        {data.items.map((item, index) => (
            <div key={index} className="mb-4">
                <h3 className="item-title text-xl font-semibold text-slate-800">{item.role}</h3>
                <p className="item-subtitle font-medium text-slate-500">{item.company} &nbsp;|&nbsp; {item.date}</p>
                <ul className="list-disc list-inside mt-2 item-text text-slate-600 space-y-1">
                    {item.points.map((point, pIndex) => <li key={pIndex}>{point}</li>)}
                </ul>
            </div>
        ))}
    </section>
);

const EducationSection: React.FC<{ data: Education; isBento?: boolean }> = ({ data, isBento }) => (
    <section className="mb-6">
        {isBento ? <BentoSectionTitle title={data.title} /> : <SectionTitle title={data.title} />}
        {data.items.map((item, index) => (
            <div key={index} className="mb-3">
                <h3 className="item-title text-xl font-semibold text-slate-800">{item.degree}</h3>
                <p className="item-subtitle font-medium text-slate-500">{item.school}</p>
                <p className="item-text text-sm text-slate-500">{item.date}</p>
            </div>
        ))}
    </section>
);

const SkillsSection: React.FC<{ data: Skills; isBento?: boolean }> = ({ data, isBento }) => (
    <section>
        {isBento ? <BentoSectionTitle title={data.title} /> : <SectionTitle title={data.title} />}
        <div className="flex flex-wrap gap-2">
            {data.points.map((point, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">{point}</span>
            ))}
        </div>
    </section>
);

const PersonalSection: React.FC<{ data: Personal; isBento?: boolean }> = ({ data, isBento }) => (
    <section>
        {isBento ? <BentoSectionTitle title={data.title} /> : <SectionTitle title={data.title} />}
        <ul className="item-text text-slate-600 space-y-2">
            {data.items.map((item, index) => (
                <li key={index}><strong>{item.label}:</strong> {item.value}</li>
            ))}
        </ul>
    </section>
);

const BaseLayout: React.FC<{ data: LanguageData }> = ({ data }) => (
    <>
        <ObjectiveSection data={data.objective} />
        <ExperienceSection data={data.experience} />
        <EducationSection data={data.education} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkillsSection data={data.skills} />
            <PersonalSection data={data.personal} />
        </div>
    </>
);

const Resume = React.forwardRef<HTMLDivElement, ResumeProps>(({ data, theme, language }, ref) => {
    const langClass = language === 'gu' ? 'lang-gu' : '';

    const renderThemeContent = () => {
        switch (theme) {
            case 'theme-bento':
                return (
                    <div className={`p-4 md:p-6 ${langClass}`}>
                        <div className="bento-grid">
                            <div className="bento-item header text-center">
                                <h1 className="text-4xl md:text-5xl font-bold text-slate-800">{data.name}</h1>
                                <p className="mt-2 text-slate-600"><i className="fa-solid fa-phone fa-fw mr-2"></i>{data.contact.phone} &nbsp;|&nbsp; <i className="fa-solid fa-location-dot fa-fw mr-2"></i>{data.contact.address}</p>
                            </div>
                            <div className="bento-item objective"><ObjectiveSection data={data.objective} isBento /></div>
                            <div className="bento-item experience"><ExperienceSection data={data.experience} isBento /></div>
                            <div className="bento-item education"><EducationSection data={data.education} isBento /></div>
                            <div className="bento-item skills"><SkillsSection data={data.skills} isBento /></div>
                            <div className="bento-item personal"><PersonalSection data={data.personal} isBento /></div>
                        </div>
                    </div>
                );
            case 'theme-dark':
                return (
                    <div className={`p-8 rounded-lg ${langClass}`}>
                        <header className="text-center mb-8 pb-4 border-b border-slate-700">
                            <h1 className="text-5xl font-bold">{data.name}</h1>
                            <p className="mt-4 text-lg text-slate-400"><i className="fa-solid fa-phone fa-fw mr-2"></i>{data.contact.phone} &nbsp;|&nbsp; <i className="fa-solid fa-location-dot fa-fw mr-2"></i>{data.contact.address}</p>
                        </header>
                        <BaseLayout data={data} />
                    </div>
                );
            case 'theme-glass':
                 return (
                    <div className={`rounded-lg bg-white overflow-hidden ${langClass}`}>
                        <header className="header p-8">
                            <div className="header-content p-8 rounded-lg text-center text-white">
                                <h1 className="text-5xl font-bold">{data.name}</h1>
                                <p className="mt-4 text-lg"><i className="fa-solid fa-phone fa-fw mr-2"></i>{data.contact.phone} &nbsp;|&nbsp; <i className="fa-solid fa-location-dot fa-fw mr-2"></i>{data.contact.address}</p>
                            </div>
                        </header>
                        <div className="p-8"><BaseLayout data={data} /></div>
                    </div>
                );
            case 'theme-typographic':
                return (
                    <div className={`p-10 bg-white rounded-lg ${langClass}`}>
                        <header className="text-center mb-10">
                            <h1 className="text-6xl text-slate-800">{data.name}</h1>
                            <p className="mt-4 text-slate-500 tracking-widest"><i className="fa-solid fa-phone fa-fw mr-2"></i>{data.contact.phone} &nbsp;|&nbsp; <i className="fa-solid fa-location-dot fa-fw mr-2"></i>{data.contact.address}</p>
                        </header>
                        <BaseLayout data={data} />
                    </div>
                );
            case 'theme-aurora':
            default:
                return (
                    <div className={`p-8 rounded-lg bg-white ${langClass}`}>
                        <header className="header text-center p-8 rounded-lg mb-8">
                            <h1 className="text-5xl font-bold">{data.name}</h1>
                            <p className="mt-4 text-lg opacity-90"><i className="fa-solid fa-phone fa-fw mr-2"></i>{data.contact.phone} &nbsp;|&nbsp; <i className="fa-solid fa-location-dot fa-fw mr-2"></i>{data.contact.address}</p>
                        </header>
                        <BaseLayout data={data} />
                    </div>
                );
        }
    };

    return (
        <div id="resume-container" className="transition-all duration-300 ease-in-out">
            <div ref={ref} className={`rounded-lg shadow-2xl overflow-hidden ${theme}`}>
                {renderThemeContent()}
            </div>
        </div>
    );
});

export default Resume;
