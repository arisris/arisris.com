import Image from 'next/image';
import Layout from '@/components/Layout';
import {
	FaDesktop,
	FaHome,
	FaUsers,
	FaLinux,
	FaFacebook,
	FaGithub,
	FaLinkedin
} from 'react-icons/fa';
import { TypedText } from '@/components/TypedText';

const Tags = ({ data }) => (
	<div className="inline-flex flex-wrap">
		{data.map((i, index) => (
			<span
				className="text-sm px-2 py-[1px] ring-1 ring-gray-200 dark:ring-gray-800 dark:text-gray-300 rounded mr-2 mb-2"
				key={index}
			>
				{i}
			</span>
		))}
	</div>
);

export default function PageAboutMe() {
	return (
		<Layout title="About Me">
			<div className="flex flex-col justify-center items-center my-16">
				<h1 className="text-4xl font-bold mb-10">About Me</h1>
				<div className="mb-10 relative">
					<Image
						width="200"
						height="200"
						alt="arisris"
						className="rounded-full"
						src="/documents/avatar.png"
					/>
					<div className="flex justify-start absolute bottom-2 left-10">
						<a
							title="Github"
							className="flex items-center p-2"
							href="https://github.com/arisris"
						>
							<FaGithub className="text-white w-6 h-6" />
						</a>
						<a
							title="Facebook"
							className="flex items-center p-2"
							href="https://facebook.com/arisfungratis"
						>
							<FaFacebook className="text-white w-6 h-6" />
						</a>
						<a
							title="LinkedIn"
							className="flex items-center p-2"
							href="https://linkedin.com/in/arisris"
						>
							<FaLinkedin className="text-white w-6 h-6" />
						</a>
					</div>
				</div>
				<div className="mb-10 text-center text-xl font-bold">
					Hello, My name is <span className="underline">Aris Riswanto</span>
					<br /> And i'm work as a <br />
					<TypedText
						className="inline-block dark:text-blue-500"
						options={{
							strings: [
								'Fullstack Web developer',
								'React Developer',
								'Next.js Developer',
								'Jamstack Developer',
								'Nodejs Developer',
								'PHP Developer',
								'Laravel Developer',
								'Web Scraper'
							]
						}}
					/>
					<br />I love web programing since 2009
				</div>
				<div className="mb-10 text-center leading-relaxed">
					I am a father of one kids, I started learning programming languages
					since <span className="underline">2009</span>. Actually I don't have
					an IT education background but I was very enthusiastic about learning
					programming languages from that time until now. I was born 30 years
					ago in Majalengka, And now I live with my family in Ciamis.
				</div>
				{/* Comments */}
				<h2 className="text-3xl mb-10">About</h2>
				<div className="mb-10">
					<div>
						{[
							[<FaDesktop />, 'Works fulltime as a fullstack web developer'],
							[<FaHome />, 'Work From Home'],
							[<FaUsers />, 'Was married and having one children'],
							[<FaLinux />, 'Coding with linux']
						].map((i, index) => (
							<div
								key={index}
								className="flex items-center italic font-bold text-sm m-1 p-1"
							>
								<div className="w-6 h-6">{i[0]}</div> <span>&nbsp;{i[1]}</span>
							</div>
						))}
					</div>
				</div>
				<div className="mb-10">
					<h3 className="text-2xl my-4">Knowledgebase:</h3>
					<p>
						I'm Experience with{' '}
						<strong>
							"Cloud Server, PWA, Jamstack, Rest Api, GraphQL, Web
							Scraper / Data Mining"
						</strong>{' '}
						technology
					</p>
					{/* Comments */}
					<h3 className="text-xl my-4">Backend:</h3>
					{<Tags data={['Node', 'PHP', 'SQL', 'NoSQL', '?']} />}
					{/* Comments */}
					<h3 className="text-xl my-4">Backend framework:</h3>
					{
						<Tags
							data={[
								'Laravel',
								'CI',
								'Totaljs',
								'Express',
								'GraphQL',
								'Crawler.js',
								'?'
							]}
						/>
					}
					<h3 className="text-xl my-4">Frontend:</h3>
					{
						<Tags
							data={['React.js', 'Next.js', "Redux+RTK", 'jQuery', 'Tailwind', 'Bootstrap', '?']}
						/>
					}
					{/* Comments */}
					<h3 className="text-xl my-4">Cloud Infrastructure such as:</h3>
					{
						<Tags
							data={[
								'AWS',
								'Google Cloud',
								'IBM Cloud',
								'Vercel',
								'Netlify',
								'Cloudflare',
								'Firebase',
								'Planetscale',
								'?'
							]}
						/>
					}
				</div>
			</div>
		</Layout>
	);
}
