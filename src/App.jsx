import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';


const Section = ({ id, title, children }) => {
  const { ref, inView } = useInView({ threshold: 0.3 });
  useEffect(() => {
    if (inView) {
      window.dispatchEvent(new CustomEvent('sectionInView', { detail: { id } }));
    }
  }, [inView, id]);
  return (
    <div ref={ref} id={id} className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState('summary');

  useEffect(() => {
    const handler = (e) => setActiveSection(e.detail.id);
    window.addEventListener('sectionInView', handler);
    return () => window.removeEventListener('sectionInView', handler);
  }, []);

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const sections = [
    { id: 'summary', title: 'Career Summary' },
    { id: 'skills', title: 'Skills' },
    { id: 'experience', title: 'Experience' },
    { id: 'projects', title: 'Projects' },
    { id: 'education', title: 'Education' },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="md:w-[30%] w-full bg-gray-800 text-white p-6 md:fixed md:h-screen md:top-0 md:left-0 flex flex-col items-center">
        <div className="text-center mb-8">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold">John Doe</h1>
          <p className="text-lg text-gray-300">Software Engineer</p>
        </div>
        <div className="mb-8 text-center">
          <p className="mb-2">Email: john.doe@example.com</p>
          <p className="mb-2">Phone: (123) 456-7890</p>
          <p>izează System: Address: 123 Main St, City, Country</p>
        </div>
        <nav className="text-center">
          <ul>
            {sections.map((section) => (
              <motion.li
                key={section.id}
                className="mb-4"
                initial={{ fontSize: '1rem' }}
                animate={{
                  fontSize: activeSection === section.id ? '1.5rem' : '1rem',
                  transition: { duration: 0.3 },
                }}
              >
                <button
                  onClick={() => handleNavClick(section.id)}
                  className="hover:text-blue-300 focus:outline-none"
                >
                  {section.title}
                </button>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Right Content */}
      <div className="md:w-[70%] w-full p-6 md:ml-[30%] md:overflow-y-auto md:h-screen">
        <Section id="summary" title="Career Summary">
          <p>
            Highly motivated Software Engineer with 5+ years of experience in developing scalable web applications.
            Proficient in modern JavaScript frameworks and passionate about delivering clean, efficient code. Skilled in
            leading cross-functional teams and implementing agile methodologies to deliver high-quality software solutions.
          </p>
        </Section>
        <Section id="skills" title="Skills">
          <ul className="list-disc pl-5">
            <li>JavaScript, React.js, Node.js, TypeScript</li>
            <li>Tailwind CSS, Bootstrap, Material-UI</li>
            <li>Python, Django, Flask</li>
            <li>Database: PostgreSQL, MongoDB, MySQL</li>
            <li>Version Control: Git, GitHub, GitLab</li>
            <li>Cloud: AWS, Azure, Docker</li>
            <li>Testing: Jest, Cypress, Mocha</li>
          </ul>
        </Section>
        <Section id="experience" title="Experience">
          <div className="mb-4">
            <h3 className="font-semibold">Senior Software Engineer - Tech Corp</h3>
            <p className="text-gray-600">Jan 2022 - Present</p>
            <p>Led a team of 5 developers to build a scalable e-commerce platform, improving performance by 30%.</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Software Engineer - Innovate Solutions</h3>
            <p className="text-gray-600">Jun 2019 - Dec 2021</p>
            <p>Developed and maintained web applications using React and Node.js, reducing load times by 20%.</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Junior Developer - StartUp Inc.</h3>
            <p className="text-gray-600">Jul 2017 - May 2019</p>
            <p>Contributed to the development of a customer-facing dashboard using Angular and Firebase.</p>
          </div>
          <div>
            <h3 className="font-semibold">Intern - CodeWorks</h3>
            <p className="text-gray-600">Jan 2017 - Jun 2017</p>
            <p>Assisted in building internal tools with Python and Django, automating data processing tasks.</p>
          </div>
        </Section>
        <Section id="projects" title="Projects">
          <div className="mb-4">
            <h3 className="font-semibold">E-Commerce Platform</h3>
            <p>
              Built a full-stack e-commerce application with React, Node.js, and MongoDB, featuring secure payment
              integration and real-time inventory updates. Implemented Stripe for payments and reduced checkout time by 15%.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Task Management App</h3>
            <p>
              Developed a task management tool using React and Firebase, enabling real-time collaboration for teams. Integrated
              drag-and-drop functionality and improved user retention by 25%.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Portfolio Website</h3>
            <p>
              Designed a personal portfolio using Next.js and Tailwind CSS, showcasing projects with a responsive design and
              optimized SEO, achieving 10,000 monthly visits.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Inventory Management System</h3>
            <p>
              Created a web-based inventory system using Django and PostgreSQL, streamlining warehouse operations for a local
              business, reducing errors by 40%.
            </p>
          </div>
        </Section>
        <Section id="education" title="Education">
          <div className="mb-4">
            <h3 className="font-semibold">B.S. in Computer Science</h3>
            <p className="text-gray-600">University of Example, 2015 - 2019</p>
            <p>Graduated with honors, focusing on software engineering and data structures. GPA: 3.8/4.0.</p>
          </div>
          <div>
            <h3 className="font-semibold">Online Certification - Full Stack Development</h3>
            <p className="text-gray-600">Coursera, 2020</p>
            <p>Completed an intensive course on full-stack development, covering React, Node.js, and MongoDB.</p>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default App;