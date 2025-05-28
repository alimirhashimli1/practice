import { useState } from 'react';

const sections = [
  {
    value: 'html',
    title: 'HTML',
    contents:
      'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
  },
  {
    value: 'css',
    title: 'CSS',
    contents:
      'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
  },
  {
    value: 'javascript',
    title: 'JavaScript',
    contents:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
  },
];


export default function Accordion() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  
  return (
    <div className="accordion">
      {sections.map(({ value, title, contents }) => {
        const isExpanded = openSections.has(value);
    console.log(isExpanded)

        return (
          <div className="accordion-item" key={value}>
            <button
              className="accordion-item-title"
              type="button"
              onClick={() => {
  const newOpenSections = new Set(openSections);
  if (newOpenSections.has(value)) {
    newOpenSections.delete(value);
  } else {
    newOpenSections.add(value);
  }
  setOpenSections(newOpenSections);
}}
            >
              {title}
              <span
                aria-hidden={true}
                className={[
                  'accordion-icon',
                  isExpanded && 'accordion-icon--rotated',
                ]
                  .filter(Boolean)
                  .join(' ')}
              />
            </button>
            <div
              className="accordion-item-contents"
              hidden={!isExpanded}
            >
              {contents}
            </div>
          </div>
        );
      })}
    </div>
  );
}
